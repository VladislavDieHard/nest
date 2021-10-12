<template>
    <div class="login-form">
        <form novalidate class="md-layout" @submit.prevent="validateUser">
            <md-card class="md-layout-item md-small-size-100">
                <md-card-header>
                    <div class="md-title">Авторизация</div>
                </md-card-header>

                <md-card-content>
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item md-size-80">
                            <md-field :class="getValidationClass('username')">
                                <label for="username-login">Имя пользователя</label>
                                <md-input name="username" id="username-login" autocomplete="given-name" v-model="username" :disabled="sending" />
                                <span class="md-error" v-if="!$v.username.required">Имя пользователя обязательно!</span>
                                <span class="md-error" v-else-if="!$v.username.minlength">Неподходящее имя пользователя!</span>
                            </md-field>
                            <md-field :class="getValidationClass('password')">
                                <label for="password-login">Пароль</label>
                                <md-input id="password-login" type="password" v-model="password" :disabled="sending"></md-input>
                                <span class="md-error" v-if="!$v.password.required">Пароль обязателен!</span>
                                <span class="md-error" v-else-if="!$v.password.minlength">Неподходящий пароль!</span>
                            </md-field>
                        </div>
                        <span v-if="loginErr.bool">{{loginErr.message}}</span>
                    </div>
                </md-card-content>

                <md-progress-bar md-mode="indeterminate" v-if="sending" />

                <md-card-actions>
                    <md-button type="submit" class="md-primary" :disabled="sending">Войти</md-button>
                    <md-button  class="md-primary" @click="toggleState">Отмена</md-button>
                </md-card-actions>
            </md-card>

            <md-snackbar :md-active.sync="userSaved">Вы вошли!</md-snackbar>
        </form>
    </div>
</template>

<script>
    import { validationMixin } from 'vuelidate';
    import {
        required,
        minLength,
    } from 'vuelidate/lib/validators';
    import {mapActions, mapGetters, mapMutations} from 'vuex';

    export default {
        name: 'AuthForm',
        mixins: [validationMixin],
        data() {
            return {
                username: '',
                password: '',
                sending: false,
                userSaved: false,
                loginErr: {
                    message: '',
                    bool: false
                }
            }
        },
        validations: {
                username: {
                    required,
                    minLength: minLength(3)
                },
                password: {
                    required,
                    minLength: minLength(3)
                }
        },
        computed: {
            ...mapGetters(['getAuthorized']),
            authorized() {
                return this.getAuthorized;
            }
        },
        methods: {
            ...mapActions(['userLogin']),
            ...mapMutations(['SET_LOGIN_STATE']),
            toggleState() {
                this.SET_LOGIN_STATE()
            },
            getValidationClass (fieldName) {
                const field = this.$v[fieldName];

                if (field) {
                    return {
                        'md-invalid': field.$invalid && field.$dirty
                    }
                }
            },
            clearForm () {
                this.$v.$reset();
                this.username = null;
                this.password = null;
            },
            async loginUser () {
                this.sending = true;
                const credentials = {
                    username: this.username,
                    password: this.password
                }
                let result = await this.userLogin(credentials)
                if (result.status === 404) {
                    this.sending = false;
                    this.loginErr.bool = true;
                    this.loginErr.message = result.message;
                } else {
                    this.userSaved = true
                    this.sending = false
                    this.loginErr.bool = false;
                    this.loginErr.message = '';
                    this.SET_LOGIN_STATE()
                    this.clearForm()
                }
            },
            validateUser () {
                this.$v.$touch()

                if (!this.$v.$invalid) {
                    this.loginUser()
                }
            }
        }
    }
</script>

<style scoped>
    .login-form {
        width: 100%;
        height: 100%;
    }

    .login-form form {
        width: 100%;
        height: 100%;
    }

    .md-card {
        width: 100%;
        padding: 1.5vw;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .md-card-header {
        padding: 16px;
        display: flex;
        align-items: center;
    }

    .md-card-content {
        padding: 17px;
        font-size: 14px;
        line-height: 22px;
    }

    .md-title {
        margin: 0;
    }

    .md-progress-bar {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
    }

    .md-layout {
        display: flex;
        align-items: center;
        flex-direction: column;
    }
</style>
