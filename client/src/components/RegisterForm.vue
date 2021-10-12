<template>
    <div class="form-container">
        <form novalidate class="md-layout" @submit.prevent="validateUser">
                <md-card class="md-layout-item md-small-size-100">

                    <div class="form-inputs">
                        <div class="register-avatar">
                            <h3>Аватар</h3>
                            <div class="register-avatar-input">
                                <picture-input
                                        ref="pictureInput"
                                        width="600"
                                        height="600"
                                        radius="50"
                                        margin="16"
                                        buttonClass="change-avatar-btn md-button md-primary md-theme-default"
                                        accept="image/jpeg,image/png"
                                        size="10"
                                        :removable="false"
                                        :customStrings="{
                                drag: dragAvatar.icon,
                                aspect: 'Portrait',
                                change: dragAvatar.change,
                                buttonClass: dragAvatar.buttonClass
                            }"
                                        @change="onChange"
                                >
                                </picture-input>
                            </div>
                        </div>


                        <md-card-content>
                            <h3>Имя пользователя и пароль</h3>
                            <div class="md-layout md-gutter">
                                <div class="md-layout-item md-size-80">
                                    <md-field :class="getValidationClass('username')">
                                        <label for="username">Имя пользователя</label>
                                        <md-input name="username" id="username" autocomplete="given-name" v-model="username" :disabled="sending" />
                                        <span class="md-error" v-if="!$v.username.required">Имя пользователя обязательно!</span>
                                        <span class="md-error" v-else-if="!$v.username.minlength">Слишком короткое имя пользователя!</span>
                                    </md-field>
                                    <md-field :class="getValidationClass('password')">
                                        <label for="password">Пароль</label>
                                        <md-input id="password" type="password" v-model="password" :disabled="sending"></md-input>
                                        <span class="md-error" v-if="!$v.password.required">Пароль обязателен!</span>
                                        <span class="md-error" v-else-if="!$v.password.minlength">Слишком короткий пароль!</span>
                                    </md-field>
                                    <md-field :class="getValidationClass('repeatPassword')">
                                        <label for="repeatPassword">Повторите пароль</label>
                                        <md-input id="repeatPassword" type="password" v-model="repeatPassword" :disabled="sending"></md-input>
                                        <span class="md-error" v-if="!$v.repeatPassword.sameAsPassword">Пароли не совпадают!</span>
                                    </md-field>
                                </div>
                            </div>
                        </md-card-content>
                        <span v-if="postErr.bool">{{postErr.message}}</span>
                    </div>

                    <md-progress-bar md-mode="indeterminate" v-if="sending" />

                    <md-card-actions>
                        <md-button type="submit" class="md-primary md-raised" :disabled="sending">Регистрация</md-button>
                    </md-card-actions>
                </md-card>
        </form>
    </div>
</template>

<script>
    import PictureInput from 'vue-picture-input';
    import { validationMixin } from 'vuelidate';
    import {
        required,
        minLength,
        sameAs,
    } from 'vuelidate/lib/validators';
    import {mapActions, mapGetters, mapMutations} from "vuex";

    export default {
        components: { PictureInput },
        mixins: [validationMixin],
        name: 'FormValidation',
        data() {
            return {
                avatar: null,
                dragAvatar: {
                    icon: '<i class="far fa-user-circle"></i>',
                    remove: 'Убрать фото',
                    change: 'Выбрать другой аватар',
                    buttonClass: 'md-button'
                },
                username: '',
                password: '',
                repeatPassword: '',
                sending: false,
                postErr: {
                    bool: false,
                    message: '',
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
                minLength: minLength(6)
            },
            repeatPassword: {
                sameAsPassword: sameAs('password')
            }
        },
        computed: {
            ...mapGetters(['getAuthorized']),
            authorized() {
                return this.getAuthorized;
            }
        },
        methods: {
            ...mapActions(['createUser']),
            onChange(avatar) {
                if (avatar) {
                    this.avatar = avatar;
                }
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
                this.repeatPassword = null;
            },
            validateUser () {
                this.$v.$touch()

                if (!this.$v.$invalid) {
                    this.registerUser()
                }
            },
            async registerUser () {
                this.sending = true;
                const credentials = {
                    avatar: this.avatar,
                    username: this.username,
                    password: this.password
                }
                const result = await this.createUser(credentials);
                if (result.status === 404) {
                    this.sending = false;
                    this.postErr.bool = true;
                    this.postErr.message = result.message;
                } else {
                    this.userSaved = true;
                    this.sending = false
                    this.postErr.bool = false;
                    this.postErr.message = '';
                    this.clearForm()
                }
            }
        }
    }
</script>

<style>
    .form-container {
        width: 100%;
        margin: 50px;
    }

    .form-container form {
        width: 100%;
        height: 100%;
    }

    .form-inputs {
        display: flex;
    }

    .register-avatar {
        width: 35%;
        padding: 16px 16px 25px 16px;
    }

    .register-avatar h3 {
        height: 20px;
        font-size: 20px;
        font-weight: bold;
        font-style: oblique;
    }

    .register-avatar-input {
        width: 100%;
        height: calc(100% - 20px);
    }

    .md-card-content {
        width: 65%;
    }

    .md-card-content h3 {
        height: 20px;
        font-size: 20px;
        font-weight: bold;
        font-style: oblique;
    }

    .md-gutter {
        height: 100%;
        display: flex;
        justify-content: center;
    }

    .md-layout-item {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
    }
</style>
