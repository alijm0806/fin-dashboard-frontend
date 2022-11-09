<template>
  <div class="app">
    <aside>
      <div :class="`${active ? 'aside active' : 'aside'}`">
        <ul>

          <li class="list active">

            <router-link to="/" class="button">
              <b></b>
              <b></b>
              <a href="#">
                <span class="icon">
                  <ion-icon name="home-outline"></ion-icon>
                </span>
                <span class="title">Home</span>
              </a>
            </router-link>
          </li>

          <li class="list">
            <router-link to="/home" class="button">
              <b></b>
              <b></b>
              <a href="#">
                <span v-if="isLoggedIn" class="icon">
                  <ion-icon name="stats-chart-outline"></ion-icon>
                </span>
                <span v-if="isLoggedIn" class="title">Stocks</span>
              </a>
            </router-link>
          </li>

          <li class="list">
            <router-link to="/login" class="button">
              <b></b>
              <b></b>
              <a href="#">
                <span v-if="!isLoggedIn" class="icon">
                  <ion-icon name="log-in-outline"></ion-icon>
                </span>
                <span v-if="!isLoggedIn" class="title">Login</span>
              </a>
            </router-link>
          </li>

          <li class="list">
            <router-link to="/currencies" class="button">
              <b></b>
              <b></b>
              <a href="#">
                <span v-if="isLoggedIn" class="icon">
                  <ion-icon name="logo-usd"></ion-icon>
                </span>
                <span v-if="isLoggedIn" class="title">Currencies</span>
              </a>
            </router-link>
          </li>

          <li class="list">
            <router-link to="/logout" class="button">
              <b></b>
              <b></b>
              <a href="#">
                <span v-if="isLoggedIn" class="icon">
                  <ion-icon name="log-out-outline"></ion-icon>
                </span>
                <span v-if="isLoggedIn" class="title">Log out</span>
              </a>
            </router-link>
          </li>
        </ul>
      </div>
    </aside>
    <div class="header">
      <div :class="`${active ? 'toggle active' : 'toggle'}`" v-on:click="active = !active">
        <ion-icon name="menu-outline" class="open"></ion-icon>
        <ion-icon name="close-outline" class="close"></ion-icon>
      </div>
    </div>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>

import { ref } from 'vue';
const active = ref(localStorage.getItem("active") === "false");
const ToggleMenu = () => {
  active.value = !active.value
  localStorage.setItem("active", active.value)
}
export default {
  data: function () {
    return {
      active: true
    }
  },
  watch: {
    $route: function () {
      this.isLoggedIn = !!localStorage.jwt
    }
  },
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;

}

.app {
  display: flex;
  flex: 1 1 0;
  max-width: 100%;
  background-size: cover;
  background-blend-mode: darken;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  min-height: 100vh;
  background: rgb(240, 237, 237);
  font-family: "Eina";
}

.container {
  position: sticky;
  overflow: scroll;
  height: calc(100vh - 80px);
  max-height: 100%;
  scroll-behavior: smooth;
  margin-top: 100px;
  flex: 1 1 0;
  transition: none;
  box-sizing: border-box;
}

::-webkit-scrollbar {
  width: 0px;
  background: transparent;
  /* make scrollbar transparent */
}


nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.aside {
  display: flex;
  position: relative;
  width: 70px;
  top: 20px;
  left: 20px;
  bottom: 20px;
  height: 100vh;
  transition: width 0.5s;
  z-index: 99;
  box-sizing: initial;
  border-left: 5px solid #4d5bf9;
  background: #4d5bf9;
  overflow: hidden;
  border-radius: 25px;
}

.aside.active {
  width: 250px;
  margin-right: 10px;
}

.aside ul {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding-left: 5px;
  padding-top: 40px;
}

.aside ul li {
  position: relative;
  list-style: none;
  width: 100%;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px
}

.aside ul li .router-link-exact-active {
  background: #fff;
  width: 100%;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
}

.aside ul li b:nth-child(1) {
  position: absolute;
  top: -20px;
  height: 20px;
  width: 100%;
  background: #fff;
  display: none;
}

.aside ul li b:nth-child(1)::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  border-bottom-right-radius: 20px;
  background: #4d5bf9;
}

.aside ul li b:nth-child(2) {
  position: absolute;
  bottom: -20px;
  height: 20px;
  width: 100%;
  background: #fff;
  display: none;

}

.aside ul li b:nth-child(2)::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  border-top-right-radius: 20px;
  background: #4d5bf9;
}

.aside ul .router-link-exact-active b:nth-child(1) {
  display: block;
}

.aside ul .router-link-exact-active b:nth-child(2) {
  display: block;
}

.aside ul li a {
  position: relative;
  display: flex;
  width: 100%;
  text-decoration: none;
  color: #fff;
}

.aside ul li .router-link-exact-active a {
  color: #333;
}

.aside ul li a .icon {
  position: relative;
  display: block;
  min-width: 60px;
  height: 60px;
  line-height: 70px;
  text-align: center;
}

.aside ul li a .icon ion-icon {
  font-size: 1.5em;
}

.aside ul li a .title {
  position: relative;
  display: block;
  padding-left: 10px;
  height: 60px;
  line-height: 60px;
  letter-spacing: 3PX;
}

.header {
  position: sticky;
}

.toggle {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  background: #4d5bf9;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

}

.toggle.active {
  background: #ff4d89;
}

.toggle ion-icon {
  position: absolute;
  color: #fff;
  font-size: 34px;
  display: none;
}

.toggle ion-icon.open,
.toggle.active ion-icon.close {
  display: block;
}

.toggle ion-icon.close,
.toggle.active ion-icon.open {
  display: none;
}

.content {
  background-color: white;
  border-radius: 10px;
  margin: 6px 6px 6px 0px;
}

h1 {
  color: #2c3e50;
  text-decoration: underline;
}
</style>
