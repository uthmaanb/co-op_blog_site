<template>
  <nav class="navbar navbar-expand-lg navbar-light top_nav">
    <div class="container-fluid" v-if="user">
      <div class="first_row">
        <a class="navbar_brand" href="/posts/">The Blog Cultivaters</a>
        <form class="d-flex">
          <input
            v-model="searchQuery"
            class="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <!-- <button class="btn" type="submit">
            <i class="fas fa-search"></i>
          </button> -->
          <router-link
            :to="{ name: 'Search', params: { search: searchQuery } }"
            tag="button"
            class="btn"
            type="submit"
          >
            <i class="fas fa-search"></i>
          </router-link>
          <!-- <p>{{ searchQuery }}</p> -->
        </form>
      </div>
      <div class="second_row">
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">
                <router-link :to="{ name: 'ViewPost' }" class="nav_link"
                  >All</router-link
                >
              </a>
            </li>

            <!-- Category filters -->
            <a
              v-for="category in categories"
              :key="category"
              class="nav-item nav-link"
              @click="reload"
            >
              <router-link
                :to="{ name: 'Category', params: { category: category } }"
              >
                {{ category }}
              </router-link>
            </a>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Info
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a class="dropdown-item style" href="#"
                    ><p>
                      hey there <b>{{ user.displayName }}</b>
                    </p></a
                  >
                </li>
                <li>
                  <a class="dropdown-item style" href="#"
                    ><p class="email">
                      Currently logged in as <b>{{ user.email }}</b>
                    </p></a
                  >
                </li>
                <li><hr class="dropdown-divider" /></li>
                <li>
                  <a class="dropdown_item style" href="#"
                    ><button class="logout_btn" @click="handleClick">
                      Logout
                    </button></a
                  >
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div
          class="collapse navbar-collapse social_links"
          id="navbarSupportedContent"
        >
          <span class="icon">
            <i class="fab fa-facebook-f social_icon"></i>
          </span>
          <span class="icon">
            <i class="fab fa-instagram social_icon"></i>
          </span>
          <span class="icon">
            <i class="fab fa-linkedin-in social_icon"></i>
          </span>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import useLogout from "../composables/useLogout"
import getUsers from "../composables/getUsers"
import { useRouter } from "vue-router"
import { computed, ref } from "@vue/reactivity"

export default {
  setup() {
    const searchQuery = ref("Search")

    const categories = {
      1: "Lifestyle",
      2: "Health",
      3: "Travel",
      4: "Music",
    }
    const { user } = getUsers()
    const { logout, error } = useLogout()
    const router = useRouter()

    const handleClick = async () => {
      await logout()
      if (!error.value) {
        console.log("user logged out")
        router.push("/")
      }
    }

    const reload = () => {
      window.location.reload()
    }

    return {
      handleClick,
      user,
      categories,
      reload,
      searchQuery,
    }
  },
}
</script>

<style>
.post_page_container {
  display: flex;
  justify-content: center;

  margin: 156px 0 0 0;
  background: #f8f8f8;
}
.container-fluid {
  display: flex;
  flex-direction: column;
}
.first_row {
  display: flex;
  width: 85%;
  justify-content: space-between;
}
.second_row {
  display: flex;
  box-sizing: border-box;
  width: 85%;
  justify-content: space-between;
}
.d-flex {
  display: flex !important;
  flex-direction: row;
  justify-content: flex-end;
  background: transparent;
}
.social_links {
  display: flex;
  justify-content: flex-end;
}
.navbar {
  background-color: #f8f8f8;
  position: fixed;
  width: 100%;
  top: 0;
  height: 25vh;
}
.form-control {
  border: none;
  border-bottom: solid 1px black;
  border-radius: 0;
  width: 44%;
  background: transparent;
  padding: 28px 0 0 0;
}
.form-control:focus {
  outline: none;
  -webkit-appearance: none;
  box-shadow: none;
  -moz-box-shadow: none;
  -webkit-box-shadow: none;
  border-bottom: solid 1px black;
  background: transparent;
}
.btn {
  border: none;
}
.btn:hover {
  background: none;
  color: black;
}
.fas {
  color: black;
}
.form-control::placeholder {
  color: black;
  -webkit-text-stroke: 0.1px black;
  -webkit-font-smoothing: antialiased;
  font-family: "Barlow", sans-serif;
}
.navbar_brand {
  font-size: 30px;
  font-family: "Mukta", sans-serif;
  color: #517fff;
}
.navbar_brand:hover {
  color: #517fff;
}
.social_icon {
  font-size: 16px;
  margin: 0 0 0 5px;
  height: 30px;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.social_icon:hover {
  background: #e3ad1b;
  margin: 0 0 0 5px;
  border-radius: 15px;
  transform: translateX(0);
  transition: 1s 0.2s ease;
}
.nav_link {
  color: #7c7c7c;
}
.nav_link:hover {
  color: #515050;
}
.dropdown-menu {
  background: black;
  border: solid 1px;
}
.dropdown-item:active {
  color: #fff;
  text-decoration: none;
  background-color: black;
}
.dropdown_item {
  display: block;
  width: 100%;
  padding: 0.25rem 1.5rem;
  clear: both;
  font-weight: 400;
  color: #212529;
  text-align: inherit;
  white-space: nowrap;
  background-color: transparent;
  border: 0;
}
.logout_btn {
  background: #f7f5f0;
  border: none;
  width: 35%;
  padding: 9px 0 9px 0;
  border-radius: 15px;
  font-size: 14px;
  font-weight: 600;
  color: #7c7c7c;
}
</style>
