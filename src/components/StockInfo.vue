<script>
import axios from 'axios'
import Plotly from 'plotly.js-dist'

export default {
  name: 'StockInfo',

  data: function () {
    setTimeout(this.getCandleStick, 1000);
    setTimeout(this.getCompanyValue, 1000);
    setTimeout(this.getChartPie, 1000);
    setTimeout(this.getInfo, 1000);

    return {
      api_key: '6581d61260bde88fb3f91cd2af06dfcb',
      stock: 'AAPL',
      beta: "",
      infoCompany: "",
      ceo: "",
      sector: "",
      companysName: "",
      description: "",
      price: "",
      marketCap: "",
      ROA: "",
      ROE: "",
      priceBookValueRatio: "",
      grossProfitMargin: "",
      priceToSales: "",
      priceEarnings: "",
      image: "",
      open: [],
      close: [],
      high: [],
      low: [],
      x: [],
      openTemp: "",
      xi: "",
      trace1: {},
      statement: [],
      cash: ""
    }

  },

  methods: {
    submit(stock) {
      this.stock = this.stock;
      this.getInfo(stock);
      this.getCompanyValue(stock);
      this.getCandleStick(stock);
      this.getChartPie(stock);
    },

    async getChartPie(stock) {
      await axios.get(`https://financialmodelingprep.com/api/v3/financials/balance-sheet-statement/${this.stock}?limit=120&apikey=${this.api_key}`).then(res => {
        this.cash = res.data.financials[0]['Cash and cash equivalents']
        this.receivables = res.data.financials[0]['Receivables']
        this.inventories = res.data.financials[0]['Inventories']
        this.ppe = res.data.financials[0]['Property, Plant & Equipment Net']
        this.goodwill = res.data.financials[0]['Goodwill and Intangible Assets']
        this.LTInvestments = res.data.financials[0]['Long-term investments']
        this.payables = res.data.financials[0]['Payables']
        this.STDebt = res.data.financials[0]['Short-term debt']
        this.defRevenue = res.data.financials[0]['Deferred revenue']
        this.taxLiab = res.data.financials[0]['Tax Liabilities']

      }).catch(err => console.log(err))

      var data = [{
        type: "pie",
        values: [this.cash, this.receivables, this.inventories, this.ppe, this.goodwill, this.LTInvestments],
        labels: ["cash", "receivables", "Inventories", "PPE", "Goodwill", "LT Inv"],
        textinfo: "label+percent",
        textposition: "outside",
        title: "Assets",
        automargin: true
      }]

      var dataLiab = [{
        type: "pie",
        values: [this.payables, this.STDebt, this.LTDebt, this.defRevenue, this.taxLiab],
        labels: ["Payables", "STDebt", "LTDebt", "defRevenue", "taxLiab"],
        textinfo: "label+percent",
        textposition: "outside",
        title: "Liabilities",
        automargin: true
      }]

      var layout = {
        height: 400,
        width: 400,
        margin: { "t": 20, "b": 20, "l": 20, "r": 20 },
        showlegend: false
      }

      Plotly.newPlot('Assets', data, layout);
      Plotly.newPlot('Liabilities', dataLiab, layout)
    },

    async getCandleStick(stock) {
      await axios.get(`https://financialmodelingprep.com/api/v3/historical-price-full/${this.stock}?timeseries=400&apikey=${this.api_key}`).then(res => {
        this.open = []
        this.close = []
        this.high = []
        this.low = []
        this.x = []
        this.xi = ""
        this.openTemp = res.data.historical
        for (this.xi of this.openTemp) {
          this.open.push(this.xi.open)
          this.close.push(this.xi.close)
          this.high.push(this.xi.high)
          this.low.push(this.xi.low)
          this.x.push(this.xi.date)
        }
        console.log(this.x)
      }).catch(err => console.log(err))

      var trace1 = {
        x: this.x,
        close: this.close,
        decreasing: { line: { color: '#FF000' } },
        high: this.high,
        increasing: { line: { color: 'green' } },
        line: { color: 'rgba(31,119,180,1)' },
        low: this.low,
        open: this.open,
        type: 'candlestick',
        xaxis: 'x',
        yaxis: 'y'
      }

      var data = [trace1];

      var layout = {
        dragmode: 'zoom',
        margin: {
          r: 10,
          t: 20,
          b: 20,
          l: 30
        },
        showlegend: false,
        xaxis: {
          autorange: true,
          rangeslider: { range: [this.x[0], this.x[1000]] },
          title: 'Date',
          type: 'date'
        },
        yaxis: {
          autorange: true,
          range: [Math.min(...this.close) - 10, Math.max(...this.close) + 20],
          type: 'linear'
        },
      }

      Plotly.newPlot('candleStick', data, layout)
    },

    async getCompanyValue(stock) {
      await axios.get(`https://financialmodelingprep.com/api/v3/financial-ratios/${this.stock}?apikey=${this.api_key}`).then(res => {
        console.log(this.res)
        this.ROA = parseFloat(res.data.ratios[0].profitabilityIndicatorRatios.returnOnAssets * 100).toFixed(2)
        this.ROE = parseFloat(res.data.ratios[0].profitabilityIndicatorRatios.returnOnEquity * 100).toFixed(2)
        this.grossProfitMargin = parseFloat(res.data.ratios[0].profitabilityIndicatorRatios.grossProfitMargin * 100).toFixed(2)
        this.priceBookValueRatio = parseFloat(res.data.ratios[0].investmentValuationRatios.priceBookValueRatio).toFixed(2)
        this.priceToSales = parseFloat(res.data.ratios[0].investmentValuationRatios.priceSalesRatio).toFixed(2)
        this.priceEarningsRatio = parseFloat(res.data.ratios[0].investmentValuationRatios.priceEarningsRatio).toFixed(2)
      }).catch(err => console.log(err))
    },
    async getInfo(stock) {
      // const api_key = process.env.API_KEY;
      // console.log(api_key);
      await axios.get(`https://financialmodelingprep.com/api/v3/company/profile/${this.stock}?apikey=${this.api_key}`).then(res => {
        console.log(this.res)
        this.infoCompany = res.data.profile
        this.beta = parseFloat(this.infoCompany.beta).toFixed(2)
        this.ceo = this.infoCompany.ceo
        this.sector = this.infoCompany.sector
        this.companyName = this.infoCompany.companyName
        this.price = this.infoCompany.price
        this.marketCap = this.infoCompany.marketCap
        this.image = this.infoCompany.image
        this.description = this.infoCompany.description
      }).catch(err => console.log(err))
      console.log(this.stock);
      console.log(this.infoCompany)
    }
  }
}
</script>
<template>
  <div calss="hello">
    <div class="container">
      <form class="navbar-form m-2" v-on:click.prevent="submit()">
        <div class="input-group nno-border">
          <input type="text" class="form-control" placeholder="Search..." v-model="stock">
          <button type="submit" value="Submit" class="btn btn-white btn-round btn-just-icon">
            <span class="material-icons">
              search
            </span>
          </button>
        </div>
      </form>

      <!-- Basic Information -->
      <div class="row ">
        <div class="col-md-3">
          <div class="card card-stats card-background">
            <div class="card-header card-header-icon">
              <div class="card-icon">
                <i class="material-icons">content_copy</i>
              </div>
              <p class="card-category">Beta</p>
              <h4 class="card-title">{{ this.beta }}</h4>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card card-stats card-background">
            <div class="card-header card-header-icon">
              <div class="card-icon">
                <i class="material-icons">store</i>
              </div>
              <p class="card-category">CEO</p>
              <h4 class="card-title">{{ this.ceo }}</h4>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card card-stats card-background">
            <div class="card-header card-header-icon">
              <div class="card-icon">
                <i class="material-icons">info</i>
              </div>
              <p class="card-category">Comp. NAme</p>
              <h4 class="card-title">{{ this.companyName }}</h4>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card card-stats card-background">
            <div class="card-header card-header-icon">
              <div class="card-icon">
                <i class="material-icons">storage</i>
              </div>
              <p class="card-category">Sector</p>
              <h4 class="card-title">{{ this.sector }}</h4>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">

          <div class="md-list mt-5">
            <b-list-group horizontal class="col-md-3 mr-4">
              <i class="material-icons">query_stats</i>
              <span class="left">Price {{ this.price }}</span>
              <span class="right">P/B {{ this.priceBookValueRatio }}</span>
            </b-list-group>

            <b-list-group horizontal class="col-md-3 mr-4">
              <i class="material-icons">attach_money</i>
              <span class="left">ROA {{ this.ROA }}%</span>
              <span class="right">P/S {{ this.priceToSales }}</span>
            </b-list-group>

            <b-list-group horizontal class="col-md-3 mr-4">
              <i class="material-icons">attach_money</i>
              <span class="left">ROE {{ this.ROE }}%</span>
              <span class="right">P/E {{ this.priceEarningsRatio }}</span>
            </b-list-group>

            <b-list-group horizontal class="col-md-3 mr-4">
              <i class="material-icons">equalizer</i>
              <span class="">Gross Profit Mar {{ this.grossProfitMargin }}%</span>
            </b-list-group>
          </div>
        </div>
      </div>


      <div class="row mt-5">
        <div class="col-md-4">
          <div class="card card-profile border-0">
            <div class="card-avatar">
              <img class="img" :src="image" alt="">
            </div>
            <div class="card-body">
              <h4 style="color:red">{{ this.companyName }}</h4>
              <p class="scrollable">{{ this.description }}</p>
            </div>
          </div>
        </div>
        <div class="col-md-8">
          <div class="card mb-3">
            <div class="card-body p-3">
              <div>
                <div id="candleStick" height="300px"></div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div class="row">
        <div class="col-md-4">
          <div id="Assets"></div>
        </div>
        <div class="col-md-4">
          <div id="Liabilities"></div>
        </div>
      </div>
    </div>
  </div>

</template>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.card-background {
  background-color: #42b983;
}

.card-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  max-height: 120px;
  margin-top: 5px;
}

.md-list {
  max-width: 100%;
  display: inline-block;
  vertical-align: top;
  border: 1px solid rgba(#000, .12);
}

.left {
  margin-right: 12px;
  margin-top: 0px;
}

.right {
  margin-right: 12px;
  margin-top: 0px;
}


.scrollable {
  overflow-y: auto;
  max-height: 300px;

}

::-webkit-scrollbar {
  width: 20px;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 7px;
}

::-webkit-scrollbar-thumb {
  background: #4d5bf9;
  border-radius: 7px;
}
</style>
