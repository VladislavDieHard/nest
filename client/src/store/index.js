import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import urls from "./urls";
import posts from "./posts";

Vue.use(Vuex)

export default new Vuex.Store({
    modules: { auth, urls, posts }
})