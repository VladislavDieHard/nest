import Vue from 'vue';
import App from './App.vue';
import VueRouter from "vue-router";
import router from './router'
import store from './store'
import axios from "axios";
import VueAxios from "vue-axios";
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(VueAxios, axios);
Vue.use(VueMaterial);

new Vue({
  render: h => h(App),
  el: '#app',
  router,
  store
}).$mount('#app')
