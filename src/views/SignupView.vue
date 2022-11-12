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
      <div class="contentBx">
        <div class="formBx">
          <h2>Sign Up</h2>
          <form v-on:submit.prevent="submit()">
            <div class="inputBx">
              <span>Email :</span>
              <input type="email" placeholder="Email" class="form-control" v-model="newSessionParams.email">
            </div>
            <div class="inputBx">
              <span>Password :</span>
              <input type="password" placeholder="Password" class="form-control" minlength="6"
                v-model="newSessionParams.password">
              <span>Password Confirmation :</span>
              <input type="password" placeholder="Password Confirmation" class="form-control" minlength="6"
                v-model="newSessionParams.password">
            </div>
            <div class="inputBx">
              <input type="submit" value="Submit">
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
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

.signup {
  position: absolute;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-repeat: no-repeat;
  background-size: cover;

}

.signup .contentBx {
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  width: 60%;
  height: 100%;
}

.signup .contentBx .formBx {
  width: 100%;
  background: rgba(214, 224, 230, 0.8);
}

.signup .contentBx .formBx h2 {
  color: #272b2c;
  font-weight: 600;
  font-size: 1.5em;
  text-transform: uppercase;
  margin: 20px 20px 20px;
  border-bottom: 4px solid #ff4584;
  letter-spacing: 1px
}

.signup .contentBx .formBx .inputBx {
  margin-bottom: 20px;
}

.signup .contentBx .formBx .inputBx span {
  font-size: 16px;
  margin: 20px 20px 5px;
  color: #0c0d0d;
  font-weight: 300;
  font-size: 16px;
  letter-spacing: 1px;
  display: flex;
}

.signup .contentBx .formBx .inputBx input {
  font-size: 16px;
  font-weight: 400;
  padding: 10px 20px;
  margin: 20px 20px 5px;
  outline: none;
  border: 1px solid #272b2c;
  letter-spacing: 1px;
  color: #272b2c;
  background: transparent;
  border-radius: 30px;
  max-width: 90%;
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
  color: #272b2c;
  font-weight: 400;
  font-size: 14px;
  margin: 20px 20px 5px;
}

.signup .contentBx .formBx .inputBx p {
  color: #272b2c;
  margin: 20px 20px 5px;
}

.signup .contentBx .formBx .inputBx p a {
  color: #ff4584;
  margin: 20px 20px 5px;
}

.signup .contentBx .formBx h3 {
  color: #272b2c;
  margin: 80px 0 10px;
  font-weight: 500;
  margin: 20px 20px 5px;
}

.signup .contentBx .formBx .sci {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 20px 20px 20px;
}

.signup .contentBx .formBx .sci .facebook {
  list-style: none;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #3B5999;
  border-radius: 50%;
  margin: 0 7px;
  cursor: pointer;
}

.signup .contentBx .formBx .sci .twitter {
  list-style: none;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #46C1F6;
  border-radius: 50%;
  margin: 0 7px;
  cursor: pointer;
}

.signup .contentBx .formBx .sci .instagram {
  list-style: none;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(224, 49, 136);
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
    background: rgb(255, 255, 255);
    margin: 50px;
  }

  .signup .contentBx .formBx h3 {
    color: #272b2c;
    text-align: center;
    margin: 30px 0 10px;
    font-weight: 500;
  }
}
</style>