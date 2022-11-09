<script>
import axios from "axios";
export default {
  data: function () {
    return {
      newSessionParams: {},
      errors: [],
      fieldType: "password"
    };
  },
  methods: {
    submit: function () {
      axios
        .post("/sessions", this.newSessionParams)
        .then((response) => {
          axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          this.$router.push("/home");
        })
        .catch((error) => {
          console.log(error.response);
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    },
    switchField() {
      this.fieldType === "password" ? "text" : "password";
    }
  },
};
</script>
<template>
  <div class="container-fluid">
    <section class="signup">
      <div class="contentBx">
        <div class="formBx">
          <h2>LOG IN</h2>
          <form v-on:submit.prevent="submit()">
            <div class="inputBx">
              <span>Email :</span>
              <input type="email" placeholder="Email" class="form-control" v-model="newSessionParams.email">
            </div>
            <div class="inputBx">
              <span>Password :</span>
              <input type="password" placeholder="Password" class="form-control" minlength="6"
                v-model="newSessionParams.password">
            </div>
            <div class="remember">
              <label><input type="checkbox" name=""> Remember me</label>
            </div>
            <div class="inputBx">
              <input type="submit" value="Submit">
            </div>
            <div class="inputBx">
              <p>Don't have an account? <a href="/signup">Register here</a></p>
            </div>
          </form>
          <h3>Login with social media</h3>
          <ul class="sci">
            <li class="facebook"><i class="fa-brands fa-facebook-f"></i></li>
            <li class="twitter"><i class="fa-brands fa-twitter"></i></li>
            <li class="instagram"><i class="fa-brands fa-instagram"></i></li>
          </ul>
        </div>
      </div>

    </section>
  </div>
</template>

<style>

</style>