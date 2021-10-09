import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";

Vue.config.productionTip = false
Vue.use(VueRouter)

new Vue({
  render: h => h(App),
  el: '#app',
  router
}).$mount('#app')
