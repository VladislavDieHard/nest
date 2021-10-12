import Coockies from './cookie';

async function userLogin(credentials) {
    const response = await fetch(process.env.VUE_APP_LOGIN_REST, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(credentials)
    });
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

async function createUser(credentials) {
    const base64Response = await fetch(credentials.avatar);
    const blob = await base64Response.blob();
    const imageType = blob.type.split('/');
    const data = new FormData();
    data.append('username', credentials.username);
    data.append('password', credentials.password);
    data.append('image', blob, imageType[1]);

    const response = await fetch(process.env.VUE_APP_REGISTER_REST, {
        method: 'POST',
        // headers:{
        //     // 'Origin': 'http://localhost:8081',
        //     // 'Accept': '*/*',
        //     // 'Content-Type': 'multipart/form-data; boundary=text/plain',
        // },
        body: data
    });
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
        login: false,
        user: Coockies.getCookie('user', true),
        token: Coockies.getCookie('token', false),
        authorized: Coockies.getCookie('authorized', true),
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
        }
    },
    mutations: {
        SET_LOGIN_STATE(state) {
            state.login = !state.login;
        },
        SET_USER(state, data) {
            Coockies.setCookie('user', JSON.stringify(data.user));
            Coockies.setCookie('token', data.access_token);
            Coockies.setCookie('authorized', JSON.stringify(true));
            state.authorized = true;
            state.user = data.user;
            state.token = data.access_token;
        },
        EXIT(state) {
            Coockies.deleteCookie('authorized');
            Coockies.deleteCookie('user');
            Coockies.deleteCookie('token');
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
        },
        async createUser({ commit }, credentials) {
            const result = await createUser(credentials);
            if (result.status === 404) {
                return result;
            } else {
                commit('SET_USER', result);
                return result;
            }
        }
    }
}