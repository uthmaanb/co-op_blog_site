<template>
  <form @submit.prevent="handleSubmit">
    <!-- <div class="form_img"></div> -->
    <input
      class="inputs"
      type="email"
      required
      placeholder="email"
      v-model="email"
    />
    <input
      class="inputs"
      type="password"
      required
      placeholder="password"
      v-model="password"
    />
    <div class="error">{{ error }}</div>
    <button class="login_btn">Login</button>
  </form>
</template>

<script>
import { ref } from "@vue/reactivity";
import useLogin from "../composables/useLogin";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    // refs
    const email = ref("");
    const password = ref("");

    const { error, login } = useLogin();

    const handleSubmit = async () => {
      await login(email.value, password.value);
      if (!error.value) {
        console.log("user logged in");
        router.push("/posts");
      }
    };

    return { email, password, handleSubmit, error };
  },
};
</script>

<style>
/* @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@300&display=swap'); */
@import url("https://fonts.googleapis.com/css2?family=Barlow:wght@300;700&display=swap");
.home {
  background: #fefefe;
  width: 70vw;
  height: 80vh;
  margin: 20px 40px 0 0;
  border-radius: 20px;
}
.home_content {
	display: flex;
	justify-content: flex-end;
	width: 100vw;
	height: 100vh;
  overflow: hidden;
  background: #327a77;
  position: fixed;
}
form {
  background: none;
}
.title {
  color: #f8d6d6;
  color: #517fff;
  display: flex;
  font-family: "Barlow", sans-serif;
}
.subtitle {
  color: #e3ad1b;
  /* -webkit-text-stroke: 0.5px black; */
  /* -webkit-font-smoothing: antialiased; */
  /* font-size: 28px; */
  font-family: "Barlow", sans-serif;
}
form {
  background: #fff;
}
.inputs {
  width: 25vw;
  border: none;
  border-bottom: solid 1.9px #6b82ae;
  margin: 0 0 25px 0;
  font-size: 17px;
  font-weight: 600;
}
.inputs::placeholder {
  color: #a8b5cf;
  /* color: #C9D6FF; */
  /* color: #a1f2ee; */
  -webkit-text-stroke: 0.1px black;
  -webkit-font-smoothing: antialiased;
  font-family: "Barlow", sans-serif;
}
.inputs:focus {
  outline: none;
}
.form_container {
  display: flex;
  height: 100%;
  z-index: 2;
}
.form_image {
  position: relative;
  width: 45%;
  background: lightblue;
  border-radius: 20px 0 0 20px;
  background-image: url(/img/login_image.dcc7e3bf.jpg);
  background-size: cover;
  /* z-index: 1; */
}
.form_image::before {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -6%;
    z-index: 0;
    right: 102%;
    content: "";
    background-color: transparent;
    background-image: radial-gradient(#fff 10%, transparent 11%), radial-gradient(#fff 10%, transparent 11%);
    background-size: 60px 60px;
    background-position: 0 0, 30px 30px;
    background-repeat: repeat;
}
.form_content {
    background: white;
    display: flex;
    position: relative;
    flex-direction: column;
    width: 55%;
    align-items: center;
    border-radius: 0 20px 20px 0;
    /* z-index: 1; */
}
.form_content::before {
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: -18%;
  z-index: -1;
  left: 12%;
  content: "";
  background-color: transparent;
  background-image: radial-gradient(#fff 10%, transparent 11%),
    radial-gradient(#fff 10%, transparent 11%);
  background-size: 60px 60px;
  background-position: 0 0, 30px 30px;
  background-repeat: repeat;
}
.form_image {
  background-image: url(../assets/login_image.jpg);
}
.login_btn {
  background: #e3ad1b;
  border: none;
  width: 35%;
  padding: 9px 0 9px 0;
  border-radius: 15px;
  font-family: "Barlow", sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: white;
}
.login_btn:hover {
  cursor: pointer;
}
.signup_hover {
  color: #7c8ebf;
  cursor: pointer;
  font-family: "Barlow", sans-serif;
  font-weight: 600;
  font-size: 19px;
}
.signup_hover_content {
  font-family: "Barlow", sans-serif;
  font-weight: 500;
  font-size: 19px;
}
</style>
