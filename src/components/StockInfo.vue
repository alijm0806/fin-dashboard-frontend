<script>
import axios from 'axios'


export default {
  name: 'StockInfo',
  props: {
    msg: String
  },
  data: function () {
    setTimeout(this.getInfo, 1000);
    setTimeout(this.getCompanyValue, 1000);

    return {
      api_key: '6581d61260bde88fb3f91cd2af06dfcb',
      stock: '',
      theStock: "",
      beta: "",
      infoCompany: "",
      ceo: "",
      sector: "",
      companyName: "",
      description: "",
      price: "",
      marketCap: "",
      ROA: "",
      ROE: "",
      priceBookValueRatio: "",
      grossProfitMargin: "",
      priceToSales: "",
      priceEarnings: "",
      image: ""

    }
  },
  methods: {
    submit(stock) {
      console.log(this.api_key);
      this.stock = this.stock
      this.getInfo(stock);
      this.getCompanyValue(stock)
    },
    getCompanyValue(stock) {
      axios.get(`https://financialmodelingprep.com/api/v3/financial-ratios/${this.stock}?apikey=${this.api_key}`).then(res => {
        console.log(this.res)
        this.ROA = parseFloat(res.data.ratios[0].profitabilityIndicatorRatios.returnOnAssets * 100).toFixed(2)
        this.ROE = parseFloat(res.data.ratios[0].profitabilityIndicatorRatios.returnOnEquity * 100).toFixed(2)
        this.grossProfitMargin = parseFloat(res.data.ratios[0].profitabilityIndicatorRatios.grossProfitMargin * 100).toFixed(2)
        this.priceBookValueRatio = parseFloat(res.data.ratios[0].investmentValuationRatios.priceBookValueRatio).toFixed(2)
        this.priceToSales = parseFloat(res.data.ratios[0].investmentValuationRatios.priceSalesRatio).toFixed(2)
        this.priceEarningsRatio = parseFloat(res.data.ratios[0].investmentValuationRatios.priceEarningsRatio).toFixed(2)
      })
    },
    getInfo(stock) {
      // const api_key = process.env.API_KEY;
      // console.log(api_key);
      axios.get(`https://financialmodelingprep.com/api/v3/company/profile/${this.stock}?apikey=${this.api_key}`).then(res => {
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
      })
      console.log(this.stock);
      console.log(this.infoCompany)
      // console.log(this.beta)
    }
  }
}
</script>
<template>
  <div calss="hello">
    <div class="container">
      <form class="navbar-form m-2" v-on:submit.prevent="submit()">
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
              <h4 class="card-title">{{this.beta}}</h4>
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
              <h4 class="card-title">{{this.ceo}}</h4>
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
              <h4 class="card-title">{{this.companyName}}</h4>
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
              <h4 class="card-title">{{this.sector}}</h4>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">

          <div class="md-list mt-5">
            <b-list-group horizontal class="col-md-3 mr-4">
              <i class="material-icons">query_stats</i>
              <span class="left">Price {{this.price}}</span>
              <span class="right">P/B {{this.priceBookValueRatio}}</span>
            </b-list-group>

            <b-list-group horizontal class="col-md-3 mr-4">
              <i class="material-icons">attach_money</i>
              <span class="left">ROA {{this.ROA}}%</span>
              <span class="right">P/S {{this.priceToSales}}</span>
            </b-list-group>

            <b-list-group horizontal class="col-md-3 mr-4">
              <i class="material-icons">attach_money</i>
              <span class="left">ROE {{this.ROE}}%</span>
              <span class="right">P/E {{this.priceEarningsRatio}}</span>
            </b-list-group>

            <b-list-group horizontal class="col-md-3 mr-4">
              <i class="material-icons">equalizer</i>
              <span class="">Gross Profit Mar {{this.grossProfitMargin}}%</span>
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
              <h4>{{this.companyName}}</h4>
              <p>{{this.description}}</p>
            </div>
          </div>
        </div>
        <div class="col-md-8">

        </div>

      </div>
    </div>
    <!-- <h1>{{this.infoCompany}}</h1> -->
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
</style>
