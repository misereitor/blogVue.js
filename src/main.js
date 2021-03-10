import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import Routers from './routers.js'

Vue.use(VueResource)
Vue.use(VueRouter)

const router = new VueRouter({
  linkActiveClass: 'active',
  routes: Routers,

})


new Vue({
  router,
  VueRouter,
  template: '<App/>',
  components: { App }
}).$mount('#app');

