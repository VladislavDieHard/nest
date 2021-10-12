import coockie from './cookie';

async function userLogin(credentials) {
    const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(credentials)
    })
    if (!response.ok) {
        let result = await response.json()
        return {
            status: 404,
            message: result.message
        };
    } else {
        const result = await response.json();
        return result;
    }
}

export default {
    state: {
        urls: {
            static: 'http://localhost:5000/',
            api: 'http://localhost:5000/api'
        },
        login: false,
        user: coockie.getCookie('user', true),
        token: coockie.getCookie('token', false),
        authorized: coockie.getCookie('authorized', true),
    },
    getters: {
        getDialogs(state) {
            return state.login;
        },
        getAuthorized(state) {
            return state.authorized;
        },
        getUser(state) {
            return state.user;
        },
        getUrls(state) {
            return state.urls;
        }
    },
    mutations: {
        SET_LOGIN_STATE(state) {
            state.login = !state.login;
        },
        SET_USER(state, data) {
            coockie.setCookie('user', JSON.stringify(data.user));
            coockie.setCookie('token', data.access_token);
            coockie.setCookie('authorized', JSON.stringify(true));
            state.authorized = true;
            state.user = data.user;
            state.token = data.access_token;
        },
        EXIT(state) {
            coockie.deleteCookie('authorized');
            coockie.deleteCookie('user');
            coockie.deleteCookie('token');
            state.authorized = false;
            state.user = null;
            state.token = null;
        }
    },
    actions: {
        async userLogin({ commit }, credentials) {
            const result = await userLogin(credentials);
            if (result.status === 404) {
                return result;
            } else {
                commit('SET_USER', result);
                return result;
            }
        }
    }
}