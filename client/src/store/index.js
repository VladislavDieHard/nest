import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import urls from "./urls";
import posts from "./posts";
import postCreate from "./post_create";

Vue.use(Vuex)

export default new Vuex.Store({
    modules: { auth, urls, posts, postCreate }
})