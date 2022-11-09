import { createRouter, createWebHistory } from 'vue-router'
import StockInfoView from '../views/StockInfoView.vue'
import LandingView from '../views/LandingView.vue'
import CurrenciesView from '../views/CurrenciesView.vue'
import SignupView from "../views/SignupView.vue";
import LoginView from "../views/LoginView.vue";
import LogoutView from "../views/LogoutView.vue";
const routes = [
  {
    path: '/home',
    name: 'home',
    component: StockInfoView
  },
  {
    path: "/signup",
    name: "signup",
    component: SignupView
  },
  {
    path: "/login",
    name: "login",
    component: LoginView
  },
  {
    path: "/logout",
    name: "logout",
    component: LogoutView
  },
  {
    path: '/',
    name: 'Landing',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/LandingView.vue')
  },
  {
    path: '/currencies',
    name: 'currencies',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/CurrenciesView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
