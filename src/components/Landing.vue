<script>
import axios from 'axios'

export default {
  name: 'StockInfo',
  props: {
    msg: String
  },
  data: function () {
    setTimeout(this.getAppleInfos, 1000);
    setTimeout(this.getAmazonInfos, 1000);
    setTimeout(this.getMetaInfos, 1000);
    setTimeout(this.getNetflixInfos, 1000);
    setTimeout(this.getGoogleInfos, 1000);
    setTimeout(this.getMicrosoftInfos, 1000);

    return {
      api_key: '6581d61260bde88fb3f91cd2af06dfcb',
      AAPLcompanyInfo: "",
      AAPLcompanyName: "",
      AAPLimage: "",
      AAPLprice: "",
      AAPLsymbol: "",
      AAPLchangeValue: "",
      AAPLchangePercentage: "",
      GOOGcompanyInfo: "",
      GOOGcompanyName: "",
      GOOGimage: "",
      GOOGprice: "",
      GOOGsymbol: "",
      GOOGchangeValue: "",
      GOOGchangePercentage: "",
      METAcompanyInfo: "",
      METAcompanyName: "",
      METAimage: "",
      METAprice: "",
      METAsymbol: "",
      METAchangeValue: "",
      METAchangePercentage: "",
      AMZNcompanyInfo: "",
      AMZNcompanyName: "",
      AMZNimage: "",
      AMZNprice: "",
      AMZNsymbol: "",
      AMZNchangeValue: "",
      AMZNchangePercentage: "",
      TSLAcompanyInfo: "",
      TSLAcompanyName: "",
      TSLAimage: "",
      TSLAprice: "",
      TSLAsymbol: "",
      TSLAchangeValue: "",
      TSLAchangePercentage: "",
      NFLXcompanyInfo: "",
      NFLXcompanyName: "",
      NFLXimage: "",
      NFLXprice: "",
      NFLXsymbol: "",
      NFLXchangeValue: "",
      NFLXchangePercentage: "",
      MSFTcompanyInfo: "",
      MSFTcompanyName: "",
      MSFTimage: "",
      MSFTprice: "",
      MSFTsymbol: "",
      MSFTchangeValue: "",
      MSFTchangePercentage: "",
    }
  },
  mounted: function () {
    this.getAppleInfos(), this.getGoogleInfos(), this.getMetaInfos(), this.getAmazonInfos(), this.getTeslaInfos(), this.getNetflixInfos(), this.getMicrosoftInfos()
  },
  methods: {
    getAppleInfos() {
      axios.get(`https://financialmodelingprep.com/api/v3/company/profile/AAPL?apikey=${this.api_key}`).then(res => {
        // console.log(this.res.data)
        this.AAPLcompanyInfo = res.data
        this.AAPLcompanyName = this.AAPLcompanyInfo.profile.companyName
        this.AAPLimage = this.AAPLcompanyInfo.profile.image
        this.AAPLprice = this.AAPLcompanyInfo.profile.price
        this.AAPLsymbol = this.AAPLcompanyInfo.symbol
        this.AAPLchangeValue = this.AAPLcompanyInfo.profile.changes
        this.AAPLchangePercentage = this.AAPLcompanyInfo.profile.changesPercentage
      }).catch(err => console.log(err))
      // console.log(this.companyName);
      console.log(this.AAPLprice)
      // console.log(this.beta)
    },
    getGoogleInfos() {
      axios.get(`https://financialmodelingprep.com/api/v3/company/profile/GOOG?apikey=${this.api_key}`).then(res => {
        // console.log(this.res.data)
        this.GOOGcompanyInfo = res.data
        this.GOOGcompanyName = this.GOOGcompanyInfo.profile.companyName
        this.GOOGimage = this.GOOGcompanyInfo.profile.image
        this.GOOGprice = this.GOOGcompanyInfo.profile.price
        this.GOOGsymbol = this.GOOGcompanyInfo.symbol
        this.GOOGchangeValue = this.GOOGcompanyInfo.profile.changes
        this.GOOGchangePercentage = this.GOOGcompanyInfo.profile.changesPercentage
      }).catch(err => console.log(err))
      // console.log(this.companyName);
      console.log(this.GOOGprice)
      // console.log(this.beta)
    },
    getMetaInfos() {
      axios.get(`https://financialmodelingprep.com/api/v3/company/profile/META?apikey=${this.api_key}`).then(res => {
        // console.log(this.res.data)
        this.METAcompanyInfo = res.data
        this.METAcompanyName = this.METAcompanyInfo.profile.companyName
        this.METAimage = this.METAcompanyInfo.profile.image
        this.METAprice = this.METAcompanyInfo.profile.price
        this.METAsymbol = this.METAcompanyInfo.symbol
        this.METAchangeValue = this.METAcompanyInfo.profile.changes
        this.METAchangePercentage = this.METAcompanyInfo.profile.changesPercentage
      }).catch(err => console.log(err))
      // console.log(this.companyName);
      console.log(this.METAprice)
      // console.log(this.beta)
    },
    getAmazonInfos() {
      axios.get(`https://financialmodelingprep.com/api/v3/company/profile/AMZN?apikey=${this.api_key}`).then(res => {
        // console.log(this.res.data)
        this.AMZNcompanyInfo = res.data
        this.AMZNcompanyName = this.AMZNcompanyInfo.profile.companyName
        this.AMZNimage = this.AMZNcompanyInfo.profile.image
        this.AMZNprice = this.AMZNcompanyInfo.profile.price
        this.AMZNsymbol = this.AMZNcompanyInfo.symbol
        this.AMZNchangeValue = this.AMZNcompanyInfo.profile.changes
        this.AMZNchangePercentage = this.AMZNcompanyInfo.profile.changesPercentage
      }).catch(err => console.log(err))
      // console.log(this.companyName);
      console.log(this.METAprice)
      // console.log(this.beta)
    },
    getTeslaInfos() {
      axios.get(`https://financialmodelingprep.com/api/v3/company/profile/TSLA?apikey=${this.api_key}`).then(res => {
        // console.log(this.res.data)
        this.TSLAcompanyInfo = res.data
        this.TSLAcompanyName = this.TSLAcompanyInfo.profile.companyName
        this.TSLAimage = this.TSLAcompanyInfo.profile.image
        this.TSLAprice = this.TSLAcompanyInfo.profile.price
        this.TSLAsymbol = this.TSLAcompanyInfo.symbol
        this.TSLAchangeValue = this.TSLAcompanyInfo.profile.changes
        this.TSLAchangePercentage = this.TSLAcompanyInfo.profile.changesPercentage
      }).catch(err => console.log(err))
      // console.log(this.companyName);
      console.log(this.METAprice)
      // console.log(this.beta)
    },
    getNetflixInfos() {
      axios.get(`https://financialmodelingprep.com/api/v3/company/profile/NFLX?apikey=${this.api_key}`).then(res => {
        // console.log(this.res.data)
        this.NFLXcompanyInfo = res.data
        this.NFLXcompanyName = this.NFLXcompanyInfo.profile.companyName
        this.NFLXimage = this.NFLXcompanyInfo.profile.image
        this.NFLXprice = this.NFLXcompanyInfo.profile.price
        this.NFLXsymbol = this.NFLXcompanyInfo.symbol
        this.NFLXchangeValue = this.NFLXcompanyInfo.profile.changes
        this.NFLXchangePercentage = this.NFLXcompanyInfo.profile.changesPercentage
      }).catch(err => console.log(err))
      // console.log(this.companyName);
      console.log(this.METAprice)
      // console.log(this.beta)
    },
    getMicrosoftInfos() {
      axios.get(`https://financialmodelingprep.com/api/v3/company/profile/MSFT?apikey=${this.api_key}`).then(res => {
        // console.log(this.res.data)
        this.MSFTcompanyInfo = res.data
        this.MSFTcompanyName = this.MSFTcompanyInfo.profile.companyName
        this.MSFTimage = this.MSFTcompanyInfo.profile.image
        this.MSFTprice = this.MSFTcompanyInfo.profile.price
        this.MSFTsymbol = this.MSFTcompanyInfo.symbol
        this.MSFTchangeValue = this.MSFTcompanyInfo.profile.changes
        this.MSFTchangePercentage = this.MSFTcompanyInfo.profile.changesPercentage
      }).catch(err => console.log(err))
      // console.log(this.companyName);
      console.log(this.METAprice)
      // console.log(this.beta)
    },
  }
}
</script>
<template>
  <div class="container">
    <div class="navigation">
      <Sidebar />

    </div>

    <div class="Table">
      <table class="table">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Ticker</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Change</th>
            <th scope="col">Change(%)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row"><img class="logo" :src="MSFTimage" alt=""></th>
            <td>{{ this.MSFTsymbol }}</td>
            <td>{{ this.MSFTcompanyName }}</td>
            <td>{{ parseFloat(this.MSFTprice).toFixed(2) }}
            </td>
            <td :class="`${this.MSFTchangeValue > 0 ? 'positive' : 'negative'}`">{{
                parseFloat(this.MSFTchangeValue).toFixed(2)
            }}</td>
            <td :class="`${this.MSFTchangePercentage > 0 ? 'positive' : 'negative'}`">{{
                parseFloat(this.MSFTchangePercentage).toFixed(2)
            }} %</td>
          </tr>
          <tr>
            <th scope="row"><img class="logo" :src="NFLXimage" alt=""></th>
            <td>{{ this.NFLXsymbol }}</td>
            <td>{{ this.NFLXcompanyName }}</td>
            <td>{{ parseFloat(this.NFLXprice).toFixed(2) }}
            </td>
            <td :class="`${this.NFLXchangeValue > 0 ? 'positive' : 'negative'}`">{{
                parseFloat(this.NFLXchangeValue).toFixed(2)
            }}</td>
            <td :class="`${this.NFLXchangePercentage > 0 ? 'positive' : 'negative'}`">{{
                parseFloat(this.NFLXchangePercentage).toFixed(2)
            }} %</td>
          </tr>
          <tr>
            <th scope="row"><img class="logo" :src="TSLAimage" alt=""></th>
            <td>{{ this.TSLAsymbol }}</td>
            <td>{{ this.TSLAcompanyName }}</td>
            <td>{{ parseFloat(this.TSLAprice).toFixed(2) }}
            </td>
            <td :class="`${this.TSLAchangeValue > 0 ? 'positive' : 'negative'}`">{{
                parseFloat(this.TSLAchangeValue).toFixed(2)
            }}</td>
            <td :class="`${this.TSLAchangePercentage > 0 ? 'positive' : 'negative'}`">{{
                parseFloat(this.TSLAchangePercentage).toFixed(2)
            }} %</td>
          </tr>
          <tr>
            <th scope="row"><img class="logo" :src="GOOGimage" alt=""></th>
            <td>{{ this.GOOGsymbol }}</td>
            <td>{{ this.GOOGcompanyName }}</td>
            <td>{{ parseFloat(this.GOOGprice).toFixed(2) }}
            </td>
            <td :class="`${this.GOOGchangeValue > 0 ? 'positive' : 'negative'}`">{{
                parseFloat(this.GOOGchangeValue).toFixed(2)
            }}</td>
            <td :class="`${this.GOOGchangePercentage > 0 ? 'positive' : 'negative'}`">{{
                parseFloat(this.GOOGchangePercentage).toFixed(2)
            }} %</td>
          </tr>
          <tr>
            <th scope="row"><img class="logo" :src="METAimage" alt=""></th>
            <td>{{ this.METAsymbol }}</td>
            <td>{{ this.METAcompanyName }}</td>
            <td>{{
                parseFloat(this.METAprice).toFixed(2)
            }}</td>
            <td :class="`${this.METAchangeValue > 0 ? 'positive' : 'negative'}`">{{
                parseFloat(this.METAchangeValue).toFixed(2)
            }}</td>
            <td :class="`${this.METAchangePercentage > 0 ? 'positive' : 'negative'}`">{{
                parseFloat(this.METAchangePercentage).toFixed(2)
            }} %</td>
          </tr>
          <tr>
            <th scope="row"><img class="logo" :src="AMZNimage" alt=""></th>
            <td>{{ this.AMZNsymbol }}</td>
            <td>{{ this.AMZNcompanyName }}</td>
            <td>{{ parseFloat(this.AMZNprice).toFixed(2) }}
            </td>
            <td :class="`${this.AMZNchangeValue > 0 ? 'positive' : 'negative'}`">{{
                parseFloat(this.AMZNchangeValue).toFixed(2)
            }}</td>
            <td :class="`${this.AMZNchangePercentage > 0 ? 'positive' : 'negative'}`">{{
                parseFloat(this.AMZNchangePercentage).toFixed(2)
            }} %</td>
          </tr>
        </tbody>
      </table>
    </div>
    <h1 class="p-relative mt-5">Plans</h1>
    <div class="row mt-5">
      <div class="col-md-4 bg-light">
        <div class="plans-page d-grid m-20 gap-20">
          <div class="plan green bg-white p-20">
            <div class="top bg-success txt-c p-20">
              <h2 class="m-0 text-white">FREE</h2>
              <div class="price text-white"><span>$</span>0.00</div>
            </div>
            <ul style="list-style: none;">
              <li>
                <i class="fa-solid fa-check fa-fw yes text-success"></i>
                <span>Access All text Lessons</span>
                <i class="fa-solid fa-circle-info help"></i>
              </li>
              <li>
                <i class="fa-solid fa-check fa-fw yes text-success"></i>
                <span>Access All text Lessons</span>
                <i class="fa-solid fa-circle-info help"></i>
              </li>
              <li>
                <i class="fa-solid fa-check fa-fw yes text-success"></i>
                <span>Access All text Lessons</span>
                <i class="fa-solid fa-circle-info help"></i>
              </li>
              <li>
                <i class="fa-solid fa-xmark fa-fw no text-danger"></i>
                <span>Access All text Lessons</span>
                <i class="fa-solid fa-circle-info help"></i>
              </li>
              <li>
                <i class="fa-solid fa-xmark fa-fw no text-danger"></i>
                <span>Access All text Lessons</span>
                <i class="fa-solid fa-circle-info help"></i>
              </li>
              <li>
                <i class="fa-solid fa-xmark fa-fw no text-danger"></i>
                <span>Access All text Lessons</span>
                <i class="fa-solid fa-circle-info help"></i>
              </li>
            </ul>
            <button class="btn btn-primary">
              <a href="/login" class="btn btn-primary bg-green c-white d-block w-fit">Join</a>
            </button>
          </div>
        </div>
      </div>

      <div class="col-md-4 bg-light">
        <div class="plans-page d-grid m-20 gap-20">
          <div class="plan silver bg-white p-20">
            <div class="top bg-secondary txt-c p-20">
              <h2 class="m-0 text-white">SILVER</h2>
              <div class="price text-white"><span>$</span>0.00</div>
            </div>
            <ul style="list-style: none;">
              <li>
                <i class="fa-solid fa-check fa-fw yes text-success"></i>
                <span>Access All text Lessons</span>
                <i class="fa-solid fa-circle-info help"></i>
              </li>
              <li>
                <i class="fa-solid fa-check fa-fw yes text-success"></i>
                <span>Access All text Lessons</span>
                <i class="fa-solid fa-circle-info help"></i>
              </li>
              <li>
                <i class="fa-solid fa-check fa-fw yes text-success"></i>
                <span>Access All text Lessons</span>
                <i class="fa-solid fa-circle-info help"></i>
              </li>
              <li>
                <i class="fa-solid fa-xmark fa-fw no text-danger"></i>
                <span>Access All text Lessons</span>
                <i class="fa-solid fa-circle-info help"></i>
              </li>
              <li>
                <i class="fa-solid fa-xmark fa-fw no text-danger"></i>
                <span>Access All text Lessons</span>
                <i class="fa-solid fa-circle-info help"></i>
              </li>
              <li>
                <i class="fa-solid fa-xmark fa-fw no text-danger"></i>
                <span>Access All text Lessons</span>
                <i class="fa-solid fa-circle-info help"></i>
              </li>
            </ul>
            <button class="btn btn-primary">
              <a href="/login" class="btn btn-primary bg-green c-white d-block w-fit">Join</a>
            </button>
          </div>
        </div>
      </div>

      <div class="col-md-4 bg-light">
        <div class="plans-page d-grid m-20 gap-20">
          <div class="plan orange bg-white p-20">
            <div class="top bg-warning txt-c p-20">
              <h2 class="m-0 text-white">GOLD</h2>
              <div class="price text-white"><span>$</span>0.00</div>
            </div>
            <ul style="list-style: none;">
              <li>
                <i class="fa-solid fa-check fa-fw yes text-success"></i>
                <span>Access All text Lessons</span>
                <i class="fa-solid fa-circle-info help"></i>
              </li>
              <li>
                <i class="fa-solid fa-check fa-fw yes text-success"></i>
                <span>Access All text Lessons</span>
                <i class="fa-solid fa-circle-info help"></i>
              </li>
              <li>
                <i class="fa-solid fa-check fa-fw yes text-success"></i>
                <span>Access All text Lessons</span>
                <i class="fa-solid fa-circle-info help"></i>
              </li>
              <li>
                <i class="fa-solid fa-xmark fa-fw no text-danger"></i>
                <span>Access All text Lessons</span>
                <i class="fa-solid fa-circle-info help"></i>
              </li>
              <li>
                <i class="fa-solid fa-xmark fa-fw no text-danger"></i>
                <span>Access All text Lessons</span>
                <i class="fa-solid fa-circle-info help"></i>
              </li>
              <li>
                <i class="fa-solid fa-xmark fa-fw no text-danger"></i>
                <span>Access All text Lessons</span>
                <i class="fa-solid fa-circle-info help"></i>
              </li>
            </ul>
            <button class="btn btn-primary">
              <a href="/login" class="btn btn-primary bg-green c-white d-block w-fit">Join</a>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.logo {
  width: 3rem;
  height: 3rem;
}

.table td {
  vertical-align: middle;
  text-align: center;
}

.table th {
  vertical-align: middle;
  text-align: center;
}

.positive {
  color: green;
  text-align: center;
  vertical-align: middle;
}

.negative {
  color: red;
  text-align: center;
  vertical-align: middle;
}

/* Start Plans Page */
.plans-page .plan .top {
  border: 3px solid white;
  outline: 3px solid transparent;
}

.plans-page .plan.green .top {
  outline-color: green;
}

.plans-page .plan.silver .top {
  outline-color: rgb(114, 111, 111);
}

.plans-page .plan.orange .top {
  outline-color: orange;
}

.plans-page .plan .price {
  position: relative;
  font-size: 40px;
  width: fit-content;
  margin: auto;
}

.plans-page .plan .price span {
  position: absolute;
  left: -20px;
  top: 0;
  font-size: 25px;
}

.plan ul {
  padding: 15px 0;
  margin: 0 10px;
  align-items: center;
  font-size: 15px;
  border-bottom: 1px solid #eee;
}

.plan li {
  display: flex;
  padding: 15px 0;
  align-items: center;
  font-size: 15px;
  border-bottom: 1px solid #eee;
}

.yes {
  font-size: 18px;
  margin-right: 5px;
  margin-left: 5px;
}

.no {
  font-size: 18px;
  margin-right: 5px;
  margin-left: 5px;
}

.help {
  color: grey;
  margin-left: auto;
  cursor: pointer;
}

.btn-primary {
  align-items: center;
}
</style>