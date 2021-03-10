<template>
  <div id="app">
    <nav>
      <div class="nav-wrapper">
        <a
          href="#"
          class="brand-logo"
        >Blog</a>
        <ul
          id="nav-mobile"
          class="right hide-on-med-and-down"
        >
          <li>
            <router-link :to="{path: '/'}">Home</router-link>
          </li>
          <li>
            <router-link
              :to="{path: '/Logout'}"
              v-if="login.token"
            >Logout</router-link>
            <router-link
              :to="{path: '/login'}"
              v-else
            >Login</router-link>
          </li>
          <li>
            <router-link :to="{path: '/addPost'}">AddPost</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <br />
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Auth from "./Auth"
export default {
  name: 'app',
  data () {
    return {
      login: Auth.getLogin()
    }
  }
}
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
}
</style>
