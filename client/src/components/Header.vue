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
                    <div class="add-btn">
                        <md-button class="md-icon-button md-raised md-primary">
                            <i class="fas fa-plus"></i>
                        </md-button>
                        <md-tooltip md-direction="bottom">Создать пост</md-tooltip>
                    </div>
                    <router-link
                            :to="{ name: 'userPage', params: { id: user._id} }"
                            class="user"
                    >
                        <md-avatar>
                            <img :src="urls.static + user.avatarUrl" alt="user.username">
                            <md-tooltip md-direction="bottom">{{user.username}}</md-tooltip>
                        </md-avatar>
                    </router-link>
                    <md-button class="md-accent" @click="exit">Выйти</md-button>
                </div>
                <div class="not-authorized" v-else>
                    <dialog-login></dialog-login>
                    <router-link
                            :to="{ name: 'register' }"
                    >
                        <md-button class="md-accent">Регистрация</md-button>
                    </router-link>
                </div>
            </div>
        </md-app-toolbar>
    </md-app>
</template>

<script>
    import DialogLogin from "../components/DialogLogin";
    import { mapGetters, mapMutations } from 'vuex';

    export default {
        components: {DialogLogin},
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
        height: 100%;
        font-size: 25px;
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

    .add-btn {
        padding: 6px;
    }
</style>
