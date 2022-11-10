<script>
import axios from 'axios'

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
      USDInfos: []
    }
  },
  mounted: function () {
    this.getCurrenciesInfos()
  },
  methods: {
    async getCurrenciesInfos() {
      await axios.get(`https://financialmodelingprep.com/api/v3/fx?apikey=${process.env.VUE_APP_API_KEY4}`).then(res => {
        this.CurrenciesInfo = res.data
        this.startUsds = this.CurrenciesInfo.filter(function (USDInfo) {
          if (USDInfo.ticker.length < 8)
            return USDInfo.ticker.startsWith("USD");
        })
        this.endUsds = this.CurrenciesInfo.filter(function (USDInfo) {
          if (USDInfo.ticker.length < 8)
            return USDInfo.ticker.endsWith("/USD");
        });

        console.log(this.startUsds)
        console.log(this.endUsds)
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
        console.log("tickerInfos", tickerInfos)
      }).catch(err => console.log(err));
    }
  }
}
</script>
<template>
  <div class="container">
    <div class="navigation">
      <Sidebar />
    </div>

    <h1 class="p-relative mt-5 mb-5"> US Dollar Exchange Rates :</h1>
    <div class="search-currencies">
      <input placeholder="Search currency..." type="text" class="cur-input" maxlength="3">
    </div>
    <div>{{ startUsds[0] }}</div>
    <div class="row">
      <div class="col">
        <div class="card card-currencies" v-for="startUsd in startUsds" v-bind:key="startUsd.id">
          <div class="card-header">
            {{ startUsd.ticker }}
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">PRICE : {{ parseFloat(startUsd.ask).toFixed(4) }}</li>
            <li class="list-group-item">Change : {{ parseFloat(startUsd.changes).toFixed(4) }}</li>
            <li class="list-group-item">Change(%) :
              {{ parseFloat(((startUsd.ask - startUsd.open) / startUsd.open) * 100).toFixed(4) }} %</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="card card-currencies" v-for="tickerInfo in tickerInfos" v-bind:key="tickerInfo.id">
          <div class="card-header">
            {{ tickerInfo.ticker }}
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">PRICE : {{ parseFloat(tickerInfo.ask).toFixed(5) }}</li>
            <li class="list-group-item">Change : {{ parseFloat(tickerInfo.ask - tickerInfo.open).toFixed(5) }}</li>
            <li class="list-group-item">Change(%) :
              {{ parseFloat((tickerInfo.changes / tickerInfo.open) * 100).toFixed(5) }} %</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.col {
  display: contents;
}

.card-currencies {
  display: flex;
  padding-left: 16px;
  padding-right: 16px;
  margin: 16px 16px;
  width: 18rem;
  height: 20rem;
  min-width: 290px;
  min-height: 200px;
  row-gap: 32px;
  cursor: pointer;
  border-radius: 20px;
  /* background-image: linear-gradient(to bottom right, #24D484, #116432); */

}

.card-currencies li {
  /* background-image: linear-gradient(to bottom right, #d61af3, #e9131a); */
}

.card-currencies:hover {
  box-shadow: rgb(41, 39, 39) 4px 4px 4px 4px;
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
  margin-bottom: 20px;
}
</style>