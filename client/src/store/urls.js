export default {
    state: {
        urls: {
            static: process.env.VUE_APP_REST_STATIC,
            api: process.env.VUE_APP_REST_API
        },
    },
    getters: {
        getUrls(state) {
            return state.urls;
        }
    }
}