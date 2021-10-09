<template>
    <header>
        <div class="container">
            <router-link
                    :to="{ name: 'main' }"
                    class="logo"
            >
                <img src="" alt="">
            </router-link>
            <div class="links">
                <button
                        type="button"
                        class="btn btn-outline-light btn-lg"
                        @click="changeUserState"
                >
                    {{ auth ? 'Выйти' : 'Войти' }}
                </button>
            </div>
        </div>
    </header>
</template>

<script>
    export default {
        data() {
            return {
                auth: false
            }
        },
        created() {
            this.auth = localStorage.getItem('auth') !== null
        },
        methods: {
            changeUserState() {
                if (this.auth) {
                    localStorage.removeItem('auth')
                    this.$router.push({ name: 'main'})
                } else {
                    localStorage.setItem('auth', true)
                    this.auth = true
                }
            }
        }
    }
</script>

<style scoped>
    header {
        background-color: #d7ca70;
        padding: 20px;
    }
    .container {
        margin-top: 0;
        display: flex;
        align-items: baseline;
    }
    a {
        text-decoration: none;
        font-weight: 700;
        color: #ffffff;
        font-size: 25px;
    }
    .logo {
        color: #EB5804;
        font-size: 30px;
    }
    .links {
        margin-left: 75px;
        display: flex;
        flex-grow: 1;
    }
    button {
        margin-left: auto;
    }
</style>
