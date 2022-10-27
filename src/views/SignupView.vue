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
          this.$router.push("/stadiums");
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
      <!-- <div class="imgBx">
        <img src="../assets/logo.png">
      </div> -->
      <div class="contentBx">
        <div class="formBx">
          <h2>Sign Up</h2>
          <form v-on:submit.prevent="submit()">
            <div class="inputBx">
              <span>Email</span>
              <input type="email" placeholder="Email" class="form-control" v-model="newSessionParams.email">
            </div>
            <div class="inputBx">
              <span>Password</span>
              <input type="password" placeholder="Password" class="form-control" minlength="6"
                v-model="newSessionParams.password">
            </div>
            <div class="inputBx">
              <input type="submit" value="Submit">
            </div>
          </form>
          <h3>Login with social media</h3>
          <ul class="sci">
            <li><i class="fa-brands fa-facebook-f"></i></li>
            <li><i class="fa-brands fa-twitter"></i></li>
            <li><i class="fa-brands fa-instagram"></i></li>
          </ul>
        </div>
      </div>

    </section>
  </div>
</template>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

.signup {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(0, 0, 0, .1)url("../assets/logo.png");
  background-repeat: no-repeat;
  background-size: cover;
}

.signup .contentBx {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;
}

.signup .contentBx .formBx {
  width: 100%;
}

.signup .contentBx .formBx h2 {
  color: #607d8b;
  font-weight: 600;
  font-size: 1.5em;
  text-transform: uppercase;
  margin-bottom: 20px;
  border-bottom: 4px solid #ff4584;
  letter-spacing: 1px
}

.signup .contentBx .formBx .inputBx {
  margin-bottom: 20px;
}

.signup .contentBx .formBx .inputBx span {
  font-size: 16px;
  margin-bottom: 5px;
  color: #607d8b;
  font-weight: 300;
  font-size: 16px;
  letter-spacing: 1px;
  display: flex;
}

.signup .contentBx .formBx .inputBx input {
  font-size: 16px;
  font-weight: 400;
  padding: 10px 20px;
  outline: none;
  border: 1px solid #607d8b;
  letter-spacing: 1px;
  color: #607d8b;
  background: transparent;
  border-radius: 30px;
}

.signup .contentBx .formBx .inputBx input[type="submit"] {
  background: #ff4584;
  color: #fff;
  outline: none;
  border: none;
  font-weight: 500;
  cursor: pointer;
}

.signup .contentBx .formBx .inputBx input[type="submit"]:hover {
  background: #f53677;
}

.remember {
  display: flex;
  margin-bottom: 10px;
  color: #607d8b;
  font-weight: 400;
  font-size: 14px;
}

.signup .contentBx .formBx .inputBx p {
  color: #607d8b;
}

.signup .contentBx .formBx .inputBx p a {
  color: #ff4584;
}

.signup .contentBx .formBx h3 {
  color: #607d8b;
  margin: 80px 0 10px;
  font-weight: 500;
}

.signup .contentBx .formBx .sci {
  display: flex;
  justify-content: center;
  align-items: center;
}

.signup .contentBx .formBx .sci li {
  list-style: none;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #607d8b;
  border-radius: 50%;
  margin: 0 7px;
  cursor: pointer;
}

.signup .contentBx .formBx .sci li:hover {
  background: #ff4584;
}

.signup .contentBx .formBx .sci li i {
  transform: scale(2);
  /* filter: invert(1) */
}

@media (max-width: 768px) {
  .signup .imgBx {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .signup .contentBx {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  .signup .contentBx .formBx {
    width: 100%;
    padding: 40px;
    background: rgba(255 255 255 / 0.9);
    margin: 50px;
  }

  .signup .contentBx .formBx h3 {
    color: #607d8b;
    text-align: center;
    margin: 30px 0 10px;
    font-weight: 500;
  }
}
</style>