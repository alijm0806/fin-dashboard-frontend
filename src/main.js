import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios";
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
axios.defaults.baseURL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://mighty-plateau-71758.herokuapp.com";

var jwt = localStorage.getItem("jwt");
if (jwt) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
}

// import Vue3Material from 'vue3-material';
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { faHatWizard } from '@fortawesome/free-solid-svg-icons'
// import { fas } from '@fortawesome/free-solid-svg-icons'
// import { fab } from '@fortawesome/free-brands-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

createApp(App).use(router).mount('#app')
