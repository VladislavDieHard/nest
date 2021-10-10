<template>
    <md-app md-waterfall >
        <md-app-toolbar class="toolbar ">
            <div class="home">
                <router-link
                        :to="{ name: 'main' }"
                        class="logo"
                >
                    <i class="fas fa-home"></i>
                </router-link>
            </div>
            <div class="auth">
                <div class="user-auth" v-if="authorized">
                    <md-button class="md-icon-button md-raised md-primary">
                        <i class="fas fa-plus"></i>
                    </md-button>
                    <router-link
                            :to="{ name: 'userPage', params: { id: user._id} }"
                            class="user"
                    >
                        <md-avatar>
                            <img :src="urls.static + user.avatarUrl" alt="user.username">
                        </md-avatar>
                    </router-link>
                    <md-button class="md-accent" @click="exit">Выйти</md-button>
                </div>
                <div class="not-authorized" v-else>
                    <dialog-login></dialog-login>
                    <dialog-register></dialog-register>
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
            }
        },
        computed: {
            ...mapGetters(['getUser','getAuthorized','getUrls']),
            authorized() {
                return this.getAuthorized;
            },
            user() {
                console.log(this.getUser)
                return this.getUser;
            },
            urls() {
                return this.getUrls;
            }
        },
        methods: {
            ...mapMutations(['EXIT']),
            exit() {
                this.EXIT()
            },
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

    .auth {
        display: flex;
    }

    .user-auth {
        display: flex;
        align-items: center;
    }
</style>
