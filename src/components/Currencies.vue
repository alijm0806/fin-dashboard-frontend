<script>
import axios from 'axios'
import getSymbolFromCurrency from 'currency-symbol-map'
import currencyToSymbolMap from 'currency-symbol-map/map'

export default {

  name: 'currencies',
  props: {
    msg: String
  },
  data: function () {

    return {

      CurrenciesInfo: [],
      startUsds: [],
      endUsds: [],
      tickerInfos: [],
      USDS: [],
      symbols: [currencyToSymbolMap],
      searchTerm: "",
      lowerSearchTerm: "",
    }

  },
  mounted: function () {
    this.getCurrenciesInfos(), getSymbolFromCurrency()
  },
  methods: {
    async getCurrenciesInfos() {
      await axios.get(`https://financialmodelingprep.com/api/v3/fx?apikey=${process.env.VUE_APP_API_KEY3}`).then(res => {
        this.CurrenciesInfo = res.data
        this.startUsds = this.CurrenciesInfo.filter(function (USDInfo) {
          if (USDInfo.ticker.length < 8)
            return USDInfo.ticker.startsWith("USD");
        })
        this.endUsds = this.CurrenciesInfo.filter(function (USDInfo) {
          if (USDInfo.ticker.length < 8)
            return USDInfo.ticker.endsWith("/USD");
        });

        console.log(this.USDs)
        console.log(this.endUsds);
        this.tickerInfos = this.endUsds.map(function (item) {

          var itemData = {
            ticker: `USD/${item.ticker.substring(0, 3)}`,
            ask: 1 / item.ask,
            bid: 1 / item.bid,
            open: 1 / item.open,
            changes: item.changes,
            date: item.date
          }
          return itemData;
        });
        this.USDS = this.startUsds.concat(this.tickerInfos)
        console.log("tickerInfos", USDS);
        console.log(symbols)
      }).catch(err => console.log(err));
    },
    filterCurrencies: function () {
      return this.USDS.filter(USD => {
        var lowerSearchTerm = this.searchTerm.toLowerCase();
        var lowerCurrencyName = USD.ticker.toLowerCase();
        return lowerCurrencyName.includes(this.searchTerm);
      })
    },
  }
}
</script>
<template>
  <div class="container">
    <div class="navigation">
      <Sidebar />
    </div>

    <h1 class="p-relative mt-5 mb-5"> LIVE US Dollar Exchange Rates (FX):</h1>
    <div class="search-currencies">
      <input placeholder="Search currency..." v-model="searchTerm" type="text" class="cur-input" maxlength="3">
    </div>

    <div class="row">
      <div class="col">
        <div class="card card-currencies" v-for="USD in filterCurrencies()" v-bind:key="USD.id">
          <div class="card-header-currencies">
            <h1 class="ticker">{{ (USD.ticker) }}</h1>
            <div class="symbols">{{ symbols[0][`${USD.ticker.substring(4, 7)}`] }}</div>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item"><b>PRICE : </b> {{ parseFloat(USD.ask).toFixed(4) }}
            </li>
            <li class="list-group-item"><b>Open : </b> {{ parseFloat(USD.open).toFixed(4) }}
            </li>
            <li class="list-group-item"><b>Change : </b> {{ parseFloat(USD.ask - USD.open).toFixed(4) }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.col {
  display: contents;
  background: #0791e6;
}

.cur-input {
  font-feature-settings: "tnum", "tnum";
  background-color: #fff;
  background-image: none;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  box-sizing: border-box;
  color: rgba(0, 0, 0, .85);
  font-size: 25px;
  font-variant: tabular-nums;
  line-height: 1;
  list-style: none;
  margin: 0;
  min-width: 0;
  padding: 4px 11px;
  position: relative;
  transition: all .3s;
  width: 50%;
  text-transform: uppercase;
}

.search-currencies {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
}

.card-header-currencies {
  display: inline-flex;
  align-content: center;
  height: 60px;
  vertical-align: middle;
  text-align: center;
  font-size: larger;
  margin-top: 10px;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
  background-image: linear-gradient(to bottom right, #6ea3db, #8d19d1);
}

.card-header-currencies .ticker {
  color: #902f73;
  margin-left: 7px;
}

.symbols {
  display: grid;
  color: goldenrod;
  font-weight: bold;
  background-color: white;
  width: 55px;
  height: 55px;
  justify-items: center;
  align-content: center;
  border-radius: 50%;
  vertical-align: middle;
  margin-top: 3px;
  margin-left: auto;
  /* margin-right: 5px; */
  font-size: 24px;
}

.card-currencies {
  display: flex;
  padding-left: 16px;
  padding-right: 16px;
  margin: 16px 16px 16px;
  width: 18rem;
  height: 500px;
  row-gap: 60px;
  border-radius: 40px;
  background: #e2f4ef;
  background-image: linear-gradient(to bottom right, #598ad2, #aa6fa8);
}

.list-group {
  vertical-align: middle;
  height: 160px;
}

.card-currencies li {
  height: 45px;
  vertical-align: middle;
  font-size: 20px;
  background-image: linear-gradient(to bottom right, #d6e0e6, #5464dc);
  margin-bottom: 5px;
}

.card-currencies:hover {
  box-shadow: 4px 4px 4px #8d19d1;
}


li:hover {
  -webkit-animation: animation 1000ms linear both;
  animation: animation 1000ms linear both;
  box-shadow: 0px 0px 6px #00c3ffd4;
}
</style>