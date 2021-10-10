<template>
    <div>
        <md-dialog :md-active.sync="this.$store">
            <auth-form></auth-form>
        </md-dialog>
        <md-button class="md-primary" @click="this.$store.dialogs.login = !this.$store.dialogs.login">Войти</md-button>
    </div>
</template>

<script>
    import AuthForm from "./AuthForm";

    export default {
        name: 'DialogLogin',
        components: { AuthForm },
        data() {
            return {
                showDialog: this.$store.dialogs.login
            }
        }
    }
</script>

<style scoped>
    .md-dialog /deep/.md-dialog-container {
        width: 30vw;
        height: 30vw;
    }
</style>
