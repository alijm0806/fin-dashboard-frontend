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
    setTimeout(this.getIncome, 1000);

    return {
      stock: '',
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
      cash: "",
      revenue: [],
      COGS: [],
      GrossProfit: [],
      Opinc: [],
      Opexp: [],
      CostExp: [],
      Netinc: [],
      IntInc: [],
      IntExp: [],
      OtherIncExp: [],
      R_D_expenses: [],
      incTaxExp: [],
      ISdate: [],
      IStemp: '',


    }

  },

  methods: {
    submit(stock) {
      this.stock = this.stock;
      this.getIncome(stock);
      this.getInfo(stock);
      this.getCompanyValue(stock);
      this.getCandleStick(stock);
      this.getChartPie(stock);
    },

    async getIncome(stock) {
      this.revenue = [],
        this.COGS = [],
        this.GrossProfit = [],
        this.Opinc = [],
        this.Netinc = [],
        this.ISdate = [],
        this.IStemp = '',
        this.G_marg = [],
        this.Ebitda_marg = [],
        this.Profit_marg = [],
        this.Net_prof_marg = [],

        await axios.get(`https://financialmodelingprep.com/api/v3/financials/income-statement/${this.stock}?limit=120&apikey=${process.env.VUE_APP_API_KEY2}`).then(res => {
          this.IStemp = res.data.financials
          this.IStemp = this.IStemp.slice(0, 3)
          for (this.xi of this.IStemp) {
            this.revenue.push(this.xi.Revenue / 1000000)
            this.COGS.push(this.xi["Cost of Revenue"] / 1000000)
            this.GrossProfit.push(this.xi["Gross Profit"] / 1000000)
            this.Opinc.push(this.xi["Operating Income"] / 1000000)
            this.Opexp.push(this.xi["Operating Expenses"] / 1000000)
            this.R_D_expenses.push(this.xi["R&D Expenses"] / 1000000)
            this.IntExp.push(this.xi["Interest Expense"] / 1000000)
            this.incTaxExp.push(this.xi["Income Tax Expense"] / 1000000)
            this.Netinc.push(this.xi["Net Income"] / 1000000)
            this.ISdate.push(this.xi["date"])

            this.G_marg.push(parseFloat(this.xi["Gross Margin"] * 100).toFixed(2))
            this.Ebitda_marg.push(parseFloat(this.xi["EBITDA Margin"] * 100).toFixed(2))
            this.Profit_marg.push(parseFloat(this.xi["Profit Margin"] * 100).toFixed(2))
            this.Net_prof_marg.push(parseFloat(this.xi["Net Profit Margin"] * 100).toFixed(2))
          }

          console.log(this.Revenue)
        }).catch(err => console.log(err))
    },

    async getChartPie(stock) {
      await axios.get(`https://financialmodelingprep.com/api/v3/financials/balance-sheet-statement/${this.stock}?limit=120&apikey=${process.env.VUE_APP_API_KEY2}`).then(res => {
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
        this.equity = res.data.financials[0]['Total shareholders equity']

      }).catch(err => console.log(err))

      var data = [{
        type: "pie",
        values: [this.cash, this.receivables, this.inventories, this.ppe, this.goodwill, this.LTInvestments, this.equity],
        labels: ["cash", "receivables", "Inventories", "PPE", "Goodwill", "LT Inv"],
        textinfo: "label+percent",
        insidetextorientation: "radial",
        title: "",
        automargin: true
      }]

      var dataLiab = [{
        type: "pie",
        values: [this.payables, this.STDebt, this.LTDebt, this.defRevenue, this.taxLiab, this.equity],
        labels: ["Payables", "STDebt", "LTDebt", "defRevenue", "taxLiab", "Total shareholders equity"],
        textinfo: "label+percent",
        insidetextorientation: "radial",
        title: "",
        automargin: true
      }]

      var dataBalance = [{
        type: "pie",
        values: [this.cash, this.receivables, this.inventories, this.ppe, this.goodwill, this.LTInvestments, this.payables, this.STDebt, this.LTDebt, this.defRevenue, this.taxLiab, this.equity],
        labels: ["cash", "receivables", "Inventories", "PPE", "Goodwill", "LT Inv", "Payables", "STDebt", "LTDebt", "defRevenue", "taxLiab", "Total shareholders equity"],
        textinfo: "label+percent",
        insidetextorientation: "radial",
        title: "",
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
      Plotly.newPlot('Balance', dataBalance, layout)

    },

    async getCandleStick(stock) {
      await axios.get(`https://financialmodelingprep.com/api/v3/historical-price-full/${this.stock}?timeseries=400&apikey=${process.env.VUE_APP_API_KEY2}`).then(res => {
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
          title: 'Historical Data',
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
      await axios.get(`https://financialmodelingprep.com/api/v3/financial-ratios/${this.stock}?apikey=${process.env.VUE_APP_API_KEY2}`).then(res => {
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
      await axios.get(`https://financialmodelingprep.com/api/v3/company/profile/${this.stock}?apikey=${process.env.VUE_APP_API_KEY2}`).then(res => {
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
      <form class="navbar-form m-2 mt-5 mb-5" v-on:click.prevent="submit()">
        <div class="input-group no-border">
          <input type="text" class="form-control" placeholder="Search..." v-model="stock">
          <button type="submit" value="Submit" class="btn btn-white btn-round btn-just-icon">
            <span class="material-icons">
              search
            </span>
          </button>
        </div>
      </form>

      <!-- Basic Information -->
      <div class="div" v-if="price !== ''">
        <div class="row pt-5 pb-5">
          <div class="col-md-3">
            <div class="card card-stats card-background">
              <div class="card-header card-header-icon">
                <div class="card-icon">
                  <i class="material-icons">content_copy</i>
                </div>
                <p class="card-category">Beta</p>
                <h3 class="card-title">{{ this.beta }}</h3>
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
                <h3 class="card-title">{{ this.ceo }}</h3>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card card-stats card-background">
              <div class="card-header card-header-icon">
                <div class="card-icon">
                  <i class="material-icons">info</i>
                </div>
                <p class="card-category">Company Name</p>
                <h3 class="card-title">{{ this.companyName }}</h3>
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
                <h3 class="card-title">{{ this.sector }}</h3>
              </div>
            </div>
          </div>
        </div>

        <div class=" card card-body">
          <div class="row bg-info mr-1 text-dark rounded-4">
            <div class="row mb-5">
              <div class="col-md-12">
                <div class="md-list mt-5">
                  <b-list-group horizontal class="col-md-3 mr-4">
                    <i class="material-icons">query_stats</i>
                    <span class="left">Price <b>{{ this.price }}</b></span>
                    <span class="right">P/B <b>{{ this.priceBookValueRatio }}</b></span>
                  </b-list-group>

                  <b-list-group horizontal class="col-md-3 mr-4">
                    <i class="material-icons">attach_money</i>
                    <span class="left">ROA <b>{{ this.ROA }}%</b></span>
                    <span class="right">P/S <b>{{ this.priceToSales }}</b></span>
                  </b-list-group>

                  <b-list-group horizontal class="col-md-3 mr-4">
                    <i class="material-icons">attach_money</i>
                    <span class="left">ROE <b>{{ this.ROE }}%</b></span>
                    <span class="right">P/E <b>{{ this.priceEarningsRatio }}</b></span>
                  </b-list-group>

                  <b-list-group horizontal class="col-md-3 mr-4">
                    <i class="material-icons">equalizer</i>
                    <span class="">Gross Profit Mar <b>{{ this.grossProfitMargin }}%</b></span>
                  </b-list-group>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row pt-5 pb-5">
          <div class="col-md-4">
            <div class="card card-profile border-0">
              <div class="card-avatar">
                <img class="img" :src="image" alt="">
              </div>
              <div class="card border-0">
                <h4>{{ this.companyName }}</h4>
                <p class="scrollable">{{ this.description }}</p>
              </div>
            </div>
          </div>
          <div class="col-md-8">
            <div class="card mb-3">
              <div class="card card-body p-3">
                <div>
                  <div id="candleStick" height="400px"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h1 class="p-relative pt-5 mt-5 mb-5 align-center">Balance Sheet :</h1>
        <div class="card card-body">
          <div class="row">
            <div class="col-md-6">
              <p class="pie-title">ASSETS</p>
              <div id="Assets" height="400px"></div>
            </div>
            <div class="col-md-6">
              <p class="pie-title">LIABILITIES + EQUITY</p>
              <div id="Liabilities" height="400px"></div>
            </div>
          </div>
          <div class="row mt-5">
            <p class="pie-title">BALANCE</p>
            <div class="balance">
              <div id="Balance"></div>
            </div>
          </div>
        </div>
        <h1 class="p-relative pt-5 mt-5 mb-5 align-center">Income Statement :</h1>
        <div class="card card-body table-responsive">
          <div class="row">
            <table class="table table-hover">
              <thead class="headingcostumable">
                <th>In Millions</th>
                <th>{{ ISdate[0].slice(0, 4) }}</th>
                <th>{{ ISdate[1].slice(0, 4) }}</th>
                <th>{{ ISdate[2].slice(0, 4) }}</th>
              </thead>

              <tbody>
                <tr>
                  <td>Revenue</td>
                  <td>$ {{ Intl.NumberFormat('fr-FR').format(revenue[0]) }}</td>
                  <td>$ {{ Intl.NumberFormat('fr-FR').format(revenue[1]) }}</td>
                  <td>$ {{ Intl.NumberFormat('fr-FR').format(revenue[2]) }}</td>
                </tr>
                <tr>
                  <td>Cost of Revenue </td>
                  <td>$ {{ Intl.NumberFormat('fr-FR').format(COGS[0]) }}</td>
                  <td>$ {{ Intl.NumberFormat('fr-FR').format(COGS[1]) }}</td>
                  <td>$ {{ Intl.NumberFormat('fr-FR').format(COGS[2]) }}</td>
                </tr>
                <tr>
                  <td>GrossProfit</td>
                  <td>$ {{ Intl.NumberFormat('fr-FR').format(GrossProfit[0]) }}</td>
                  <td>$ {{ Intl.NumberFormat('fr-FR').format(GrossProfit[1]) }}</td>
                  <td>$ {{ Intl.NumberFormat('fr-FR').format(GrossProfit[2]) }}</td>
                </tr>
                <tr>
                  <td>Operating Income </td>
                  <td>$ {{ Intl.NumberFormat('fr-FR').format(Opinc[0]) }}</td>
                  <td>$ {{ Intl.NumberFormat('fr-FR').format(Opinc[1]) }}</td>
                  <td>$ {{ Intl.NumberFormat('fr-FR').format(Opinc[2]) }}</td>
                </tr>
                <tr>
                  <td>Operating Expenses </td>
                  <td>$ {{ Intl.NumberFormat('fr-FR').format(Opexp[0]) }}</td>
                  <td>$ {{ Intl.NumberFormat('fr-FR').format(Opexp[1]) }}</td>
                  <td>$ {{ Intl.NumberFormat('fr-FR').format(Opexp[2]) }}</td>
                </tr>
                <tr>
                  <td>Interest Expense </td>
                  <td>$ {{ Intl.NumberFormat('fr-FR').format(IntExp[0]) }}</td>
                  <td>$ {{ Intl.NumberFormat('fr-FR').format(IntExp[1]) }}</td>
                  <td>$ {{ Intl.NumberFormat('fr-FR').format(IntExp[2]) }}</td>
                </tr>
                <tr>
                  <td>Recherche and Development Expenses</td>
                  <td>$ {{ Intl.NumberFormat('fr-FR').format(R_D_expenses[0]) }}</td>
                  <td>$ {{ Intl.NumberFormat('fr-FR').format(R_D_expenses[1]) }}</td>
                  <td>$ {{ Intl.NumberFormat('fr-FR').format(R_D_expenses[2]) }}</td>
                </tr>
                <tr>
                  <td>Income Tax Expense </td>
                  <td>$ {{ Intl.NumberFormat('fr-FR').format(incTaxExp[0]) }}</td>
                  <td>$ {{ Intl.NumberFormat('fr-FR').format(incTaxExp[1]) }}</td>
                  <td>$ {{ Intl.NumberFormat('fr-FR').format(incTaxExp[2]) }}</td>
                </tr>
                <tr>
                  <td>Net Income </td>
                  <td>$ {{ Intl.NumberFormat('fr-FR').format(Netinc[0]) }}</td>
                  <td>$ {{ Intl.NumberFormat('fr-FR').format(Netinc[1]) }}</td>
                  <td>$ {{ Intl.NumberFormat('fr-FR').format(Netinc[2]) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <h1 class="p-relative pt-5">Ratios :</h1>
        <div class="row pt-5 pb-5">
          <div class="ratios">
            <div class="card card-stats card-ratios">
              <div class="card-header card-header-icon">
                <p class="card-category">Gross Margin</p>
                <h3 class="card-title"><span>{{ this.ISdate[0].slice(0, 4) }} :</span> {{ this.G_marg[0] }} %
                </h3>
                <h3 class="card-title"><span>{{ this.ISdate[1].slice(0, 4) }} :</span> {{ this.G_marg[1] }} %</h3>
                <h3 class="card-title"><span>{{ this.ISdate[2].slice(0, 4) }} :</span> {{ this.G_marg[2] }} %</h3>
              </div>
            </div>
          </div>
          <div class="ratios">
            <div class="card card-stats card-ratios">
              <div class="card-header card-header-icon">
                <p class="card-category">EBITDA Margin</p>
                <h3 class="card-title"><span>{{ this.ISdate[0].slice(0, 4) }} :</span> {{ this.Ebitda_marg[0] }} %</h3>
                <h3 class="card-title"><span>{{ this.ISdate[1].slice(0, 4) }} :</span> {{ this.Ebitda_marg[1] }} %</h3>
                <h3 class="card-title"><span>{{ this.ISdate[2].slice(0, 4) }} :</span> {{ this.Ebitda_marg[2] }} %</h3>
              </div>
            </div>
          </div>
          <div class="ratios">
            <div class="card card-stats card-ratios">
              <div class="card-header card-header-icon">
                <p class="card-category">Profit Margin</p>
                <h3 class="card-title"><span>{{ this.ISdate[0].slice(0, 4) }} :</span> {{ this.Profit_marg[0] }} %</h3>
                <h3 class="card-title"><span>{{ this.ISdate[1].slice(0, 4) }} :</span> {{ this.Profit_marg[1] }} %</h3>
                <h3 class="card-title"><span>{{ this.ISdate[2].slice(0, 4) }} :</span> {{ this.Profit_marg[2] }} %</h3>
              </div>
            </div>
          </div>
          <div class="ratios">
            <div class="card card-stats card-ratios">
              <div class="card-header card-header-icon">
                <p class="card-category">Net Profit Margin</p>
                <h3 class="card-title"><span>{{ this.ISdate[0].slice(0, 4) }} :</span> {{ this.Net_prof_marg[0] }} %
                </h3>
                <h3 class="card-title"><span>{{ this.ISdate[1].slice(0, 4) }} :</span> {{ this.Net_prof_marg[1] }} %
                </h3>
                <h3 class="card-title"><span>{{ this.ISdate[2].slice(0, 4) }} :</span> {{ this.Net_prof_marg[2]
                }} %</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br>
      <br>
      <br>
    </div>
  </div>
</template>



<style scoped>
form {
  position: sticky;
}

form button {
  border: solid 2px;
  border-bottom-right-radius: 25px;
  background: #4d5bf9;
}

form button:hover {
  border: solid #4d5bf9 4px;
  border-bottom-right-radius: 25px;
  background: #ff4d89;
}

form button span {
  color: white;
}

form button:hover span {
  color: #4d5bf9;
}

h3 {
  margin: 40px 0 0;
  color: #a42fad;
}

h4 {
  color: red;
  text-decoration: underline;
  margin-left: 1.5rem;
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
  background-image: linear-gradient(to bottom right, #24D484, #116432);
  box-shadow: 5px 5px 5px 5px;
}

.card-background:hover {
  background-image: linear-gradient(to bottom right, #24D484, #116432);
  box-shadow: #a42fad 5px 5px 5px 5px;
  pointer-events: auto;
  top: -10px;
}

.row .ratios {
  width: 25%;
}

.card-ratios {
  background-image: linear-gradient(to bottom right, #08e4f4, #e4f3f3);
  box-shadow: 5px 5px 5px 5px;
}

.card-ratios .card-title {
  color: magneta;
}

.card-ratios .card-title span {
  color: black;
}

.card-ratios:hover {
  background-image: linear-gradient(to bottom right, #08e4f4, #e4f3f3);
  box-shadow: #1d10d5 5px 5px 5px 5px;
  pointer-events: auto;
  top: -10px;
}

.card-ratios p {
  display: flex;
  align-items: center;
  justify-items: center;
  justify-content: center;
  font-size: x-large;
  font-weight: 600;
  color: red;
}

.card-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  max-height: 150px;
  margin-top: 5px;
}

.card-profile {
  box-shadow: 5px 5px 5px 5px;
}

.card-profile:hover {
  box-shadow: 5px 5px 5px 5px;
  pointer-events: auto;
  top: -10px;
}

.card-body {
  box-shadow: 5px 5px 5px 5px;
}

.card-body:hover {
  box-shadow: 5px 5px 5px 5px;
  pointer-events: auto;
  top: -10px;
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
  overflow: scroll;
  max-height: 300px;
  margin-left: 1rem;
  margin-right: 1rem;
  font-size: larger;
}

#Balance {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

.pie-title {
  font-size: 30px;
  color: #a42fad;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ratios {
  width: 20%;
}
</style>
