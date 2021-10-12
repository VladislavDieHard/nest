async function downloadPosts(state) {
    const response = await fetch(process.env.VUE_APP_REST_API + `/posts?limit=${state.limit}&offset=${state.offset}`,{
        method: 'GET',
    });
    console.log(response)
    if (!response.ok) {
        let result = await response.json()
        return {
            status: 404,
            message: result.message
        };
    } else {
        return await response.json();
    }
}

export default {
    state: {
        posts: {},
        count: null,
        limit: 10,
        offset: 0
    },
    getters: {
        getPosts(state) {
            return state.posts
        },
        getLimit(state) {
            return state.limit
        },
        getOffset(state) {
            return state.offset;
        },
        getCount(state) {
            return state.count;
        }
    },
    mutations: {
        SET_POSTS_AND_DATA(state, data) {
            state.posts = data.posts;
            state.count = data.count;
        },
        SET_LIMIT_AND_OFFSET(state, data) {
            state.limit = data.limit;
            state.offset = data.offset;
        }
    },
    actions: {
        async downloadPosts(context) {
            const result = await downloadPosts(context.state);
            if (result.status === 404) {
                return result;
            } else {
                context.commit('SET_POSTS_AND_DATA', result);
                return result.posts;
            }
        },
    }
}