import axios from 'axios';
import coockie from './cookie';

const userLogin = async (credentials) => {
    return await axios({
        method: 'post',
        url: 'http://localhost:5000/api/auth/login',
        data: credentials
    })
        .then((response) => {return response.data})
        .catch((err) => {return err.message})
}

export default {
    state: {
        urls: {
            static: 'http://192.168.0.243:5000/',
            api: 'http://192.168.0.243:5000/api'
        },
        dialogs: {
            login: false
        },
        user: coockie.getCookie('user'),
        authorized: false
    },
    getters: {
        getDialogs(state) {
            return state.dialogs;
        },
        getAuthorized(state) {
            return state.authorized;
        }
    },
    mutations: {
        SET_DIALOG_STATE() {

        },
        SET_USER(state, data) {
            if (data !== null || undefined) {
                coockie.setCookie('user', data)
                state.user = data;
                state.dialogs.login = false;
                state.authorized = true;
            }
        },
        EXIT(state) {
            state.authorized = false
        }
    },
    actions: {
        async userLogin({ commit }, credentials) {
            try {
                const user = await userLogin(credentials);
                commit('SET_USER', user);
            } catch (err) {
                console.error(err)
            }
        }
    }
}