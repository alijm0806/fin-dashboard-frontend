<script>
import axios from 'axios'


export default {
  name: 'StockInfo',
  props: {
    msg: String
  },
  data: function () {
    setTimeout(this.getInfo, 2000);

    return {
      api_key: '6581d61260bde88fb3f91cd2af06dfcb',
      stock: '',
      theStock: "",
      beta: "",
      infoCompany: "",
      ceo: "",
      sector: "",
      companyName: "",

    }
  },
  methods: {
    submit(stock) {
      console.log(this.api_key);
      this.stock = this.stock
      this.getInfo(stock);

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
      <div class="row">
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

    </div>
    <h1>{{this.infoCompany}}</h1>
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
</style>
