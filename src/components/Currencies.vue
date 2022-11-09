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
      startsUsd: [],
      endsUsd: [],
      tickerInfo: []
    }
  },
  mounted: function () {
    this.getCurrenciesInfos()
  },
  methods: {
    async getCurrenciesInfos() {
      await axios.get(`https://financialmodelingprep.com/api/v3/fx?apikey=${process.env.VUE_APP_API_KEY1}`).then(res => {
        this.CurrenciesInfo = res.data
        this.startsUsd = this.CurrenciesInfo.filter(function (USDInfo) {
          if (USDInfo.ticker.length < 8)
            return USDInfo.ticker.startsWith("USD");
        });
        this.endsUsd = this.CurrenciesInfo.filter(function (USDInfo) {
          if (USDInfo.ticker.length < 8)
            return USDInfo.ticker.endsWith("/USD");
        });
        console.log(this.startsUsd)
        console.log(this.endsUsd)
        var tickerInfo = this.endsUsd.map(function (item) {
          console.log(item.ticker)

          var itemData = {
            ticker: `USD/${item.ticker.substring(0, 3)}`,
            ask: 1 / item.ask,
            bid: 1 / item.bid,
          }
          return itemData
        });
        console.log("tickerInfo", tickerInfo)
      }).catch(err => console.log(err))
    }
  }
}
</script>
<template>
  <div class="container">
    <div class="navigation">
      <Sidebar />

    </div>


  </div>
</template>

<style>

</style>

usd/jpy = 146.144

jpy/usd = 1 /146.144