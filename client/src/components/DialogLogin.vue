<template>
    <div>
        <md-dialog :md-active.sync="openDialog">
            <auth-form></auth-form>
        </md-dialog>
        <md-button class="md-primary" @click="toggleState">Войти</md-button>
    </div>
</template>

<script>
    import AuthForm from "./AuthForm";
    import { mapGetters, mapMutations } from  'vuex';

    export default {
        name: 'DialogLogin',
        components: { AuthForm },
        data() {
            return {
            }
        },
        computed: {
            ...mapGetters(['getDialogs']),
            openDialog() {
                return this.getDialogs;
            }
        },
        methods: {
            ...mapMutations(['SET_LOGIN_STATE']),
            toggleState() {
                this.SET_LOGIN_STATE()
            }
        }
    }
</script>

<style scoped>
    .md-dialog /deep/.md-dialog-container {
        width: 400px;
        height: 350px;
    }
</style>
