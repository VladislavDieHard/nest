<template>
    <div class="form-block">
        <form @submit.prevent="auth">
            <h4>Введите логин и пароль</h4>
            <label for="username-input"><input id="username-input" type="text" v-model="credentials.username"></label>
            <label for="password-input"><input id="password-input" type="text" v-model="credentials.password"></label>
            <button type="submit">Войти</button>
            <div v-if="error">{{error}}</div>
            <select>
                <option v-for="user in users" v-bind:value="user.value">{{user.text}}</option>
            </select>
        </form>
    </div>
</template>

<script>
    export default {
        name: 'Auth',
        data() {
            return {
                credentials: {
                    username: '',
                    password: '',
                },
                error: '',
                users: [
                    {text: 'a', value: 1},
                    {text: 'б', value: 2},
                    {text: 'в', value: 3},
                    {text: 'г', value: 4},
                    {text: 'д', value: 5}
                ]
            }
        },
        methods: {
            async auth() {
                let response = await fetch('http://localhost:5000/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(this.credentials)
                });
                let result = await response.json();
                if (!response.ok) {
                    this.error = result.message;
                    return null;
                }
                this.error = '';
                return result;
            }
        }
    }
</script>

<style scoped>
    .form-block {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
    }

    form {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        width: 30vw;
        height: 30vw;
    }

    label {
        width: 65%;
    }

    input {
        width: 100%;
        height: 1.5vw;
    }

    button {
        width: 30%;
        height: 15%;
        font-size: 1em;
    }
</style>
