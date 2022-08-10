<template>
  <div class="home_content">
    <div class="home">
      <div class="form_container" v-if="showLogin">
        <div class="form_image"></div>
        <div class="form_content">
          <h1 class="title">The Blog Cultivaters</h1>
          <div>
            <h2 class="subtitle">Login</h2>
            <Login />
            <p class="signup_hover_content">
              no account yet?
              <span class="signup_hover" @click="showLogin = false"
                >Signup instead</span
              >
            </p>
          </div>
        </div>
      </div>
      <div class="form_container" v-else>
        <div class="form_image"></div>
        <div class="form_content">
          <h1 class="title">The Blog Cultivaters</h1>
          <div>
            <h2 class="signup_subtitle">Sign up</h2>
            <Signup />
            <p class="login_hover_content">
              already registered?
              <span class="login_hover" @click="showLogin = true"
                >Login instead</span
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Signup from "../components/Signup.vue";
import Login from "../components/Login.vue";
import getCollection from "@/composables/getCollection";
import { ref } from "@vue/reactivity";

import Navbar from "../components/Navbar.vue";

export default {
  name: "Home",
  components: { Signup, Login, Navbar },
  setup() {
    const { documents } = getCollection("posts");

    const showLogin = ref(true);

    return { showLogin };
  },
};
</script>
