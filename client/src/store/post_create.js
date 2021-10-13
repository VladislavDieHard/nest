export default {
    state: {
        images: []
    },
    getters: {
    },
    mutations: {
        PUSH_IMAGE(state, image) {
            state.images.push(image);
        }
    },
    actions: {
    }
}