import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
import router from './router'
import axios from "axios";
import VueAxios from "vue-axios";

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueAxios, axios);

new Vue({
  render: h => h(App),
  el: '#app',
  router
}).$mount('#app')
