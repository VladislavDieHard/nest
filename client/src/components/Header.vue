<template>
    <md-app md-waterfall md-mode="fixed ">
        <md-app-toolbar class="toolbar ">
            <div class="home">
                <router-link
                        :to="{ name: 'main' }"
                        class="logo"
                >
                    <i class="fas fa-home"></i>
                </router-link>
            </div>
            <div class="links">
                <div class="not-authorized" v-if="authorized === false">
                    <dialog-login></dialog-login>
                    <dialog-register></dialog-register>
                </div>
                <div class="authorized" v-if="authorized === true">
                    <md-button class="md-accent" @click="exit">Выйти</md-button>
                </div>
            </div>
        </md-app-toolbar>
    </md-app>
</template>

<script>
    import DialogLogin from "../components/DialogLogin";
    import DialogRegister from "./DialogRegister";
    import { mapActions, mapGetters, mapMutations } from 'vuex';

    export default {
        components: {DialogLogin, DialogRegister},
        data() {
            return {
                auth: false
            }
        },
        created() {
            this.auth = localStorage.getItem('auth') !== null
        },
        computed: {
            ...mapGetters(['getDialogs', 'getAuthorized']),
            authorized() {
                return this.getAuthorized;
            },
        },
        methods: {
            ...mapMutations(['EXIT']),
            exit() {
                this.EXIT()
            },
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
    .toolbar {
        display: flex;
        justify-content: space-between;
    }

    .home {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 3vw;
        height: 3vw;
        font-size: 2.6vw;
    }

    .not-authorized {
        display: flex;
    }
</style>
