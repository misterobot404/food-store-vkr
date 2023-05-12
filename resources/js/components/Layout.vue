<template>
    <header>
        <div class="base-width">
            <!-- Верхняя строка. Скрывающаяся -->
            <div class="header__top">
                <!-- Локация -->
                <div class="flex items-center">
                    <q-icon name="o_place" class="q-mr-sm"/>
                    {{ market_location }}
                </div>
                <!-- Контакты -->
                <div>{{ phonenumber }} ({{ work_time }})</div>
            </div>
            <!-- Нижняя строка. Не скрывающаяся -->
            <div class="header__bottom q-gutter-x-lg text-size-sm no-wrap">
                <!-- Логотип -->
                <router-link to="/">
                    <q-img src="/images/text-logo.png" no-spinner fit="contain" width="330px"/>
                </router-link>
                <!-- Поиск -->
                <div class="col-grow">
                    <q-input filled placeholder="Поиск по названию..." autogrow>
                        <template v-slot:append>
                            <q-icon name="search"/>
                        </template>
                    </q-input>
                </div>
                <!-- Навигация -->
                <div class="flex q-gutter-x-lg no-wrap q-ml-xs">
                    <!-- Каталог -->
                    <router-link to="/" class="column items-center">
                        <q-icon name="format_list_bulleted" size="24px" class="block"/>
                        <div style="margin-top: 2px">Каталог</div>
                    </router-link>
                    <!-- Корзина -->
                    <router-link to="/basket" class="column items-center relative-position">
                        <q-icon name="o_shopping_cart" size="24px" class="block"/>
                        <div style="margin-top: 2px">Корзина</div>
                        <template v-if="basket.length ?? false">
                            <q-badge color="red" floating transparent rounded>
                                {{ basket.length }}
                            </q-badge>
                        </template>
                    </router-link>
                    <!-- Мои заказы -->
                    <router-link to="/orders" class="column items-center relative-position">
                        <q-icon name="o_fact_check" size="24px" class="block"/>
                        <div style="margin-top: 2px">Мои заказы</div>
                    </router-link>
                    <!-- Пользователь -->
                    <template v-if="user">
                        <a class="column items-center">
                            <q-icon name="o_account_circle" size="24px" class="block"/>
                            <div style="margin-top: 2px">{{ user.name }}</div>
                            <q-menu auto-close>
                                <q-list>
                                    <template v-if="user.is_admin">
                                        <q-item clickable @click="$router.push('/admin_panel')">
                                            <q-item-section avatar style="min-width: 28px; padding-right: 8px">
                                                <q-icon name="history_edu"/>
                                            </q-item-section>
                                            <q-item-section class="text-size-sm">Управление товаром</q-item-section>
                                        </q-item>
                                    </template>
                                    <q-item clickable @click="logout()">
                                        <q-item-section avatar style="min-width: 28px; padding-right: 8px">
                                            <q-icon name="logout"/>
                                        </q-item-section>
                                        <q-item-section class="text-size-sm">Выйти</q-item-section>
                                    </q-item>
                                </q-list>
                            </q-menu>
                        </a>
                    </template>
                    <template v-else>
                        <a class="column items-center" @click="show_signin = true">
                            <q-icon name="o_account_circle" size="24px" class="block"/>
                            <div style="margin-top: 2px">Войти</div>
                        </a>
                    </template>
                </div>
            </div>
        </div>
    </header>

    <main>
        <div class="base-width">
            <slot/>
        </div>
    </main>

    <q-dialog v-model="show_signin" persistent>
        <q-card>
            <form @submit.prevent="signin()">
                <q-card-section class="row items-center">
                    <div class="text-h6">Авторизация</div>
                    <q-space/>
                    <q-btn icon="close" flat round dense v-close-popup/>
                </q-card-section>

                <q-separator/>

                <q-card-section class="q-gutter-y-md">
                    <q-input v-model="signin_email" label="Введите электронную почту" filled type="email" required>
                        <template v-slot:prepend>
                            <q-icon name="email"/>
                        </template>
                    </q-input>
                    <q-input v-model="signin_password" label="Введите пароль" filled type="password" required>
                        <template v-slot:prepend>
                            <q-icon name="password"/>
                        </template>
                    </q-input>
                </q-card-section>

                <q-separator/>
                <q-card-section class="flex justify-end q-gutter-x-xs">
                    <q-btn @click="show_signup = true" flat label="Регистрация" color="primary" v-close-popup/>
                    <q-btn label="Подтвердить" color="primary" type="submit" :loading="signin_loading"/>
                </q-card-section>
            </form>
        </q-card>
    </q-dialog>
    <q-dialog v-model="show_signup" persistent>
        <q-card>
            <form @submit.prevent="signup()">
                <q-card-section class="row items-center">
                    <div class="text-h6">Регистрация</div>
                    <q-space/>
                    <q-btn icon="close" flat round dense v-close-popup/>
                </q-card-section>

                <q-separator/>

                <q-card-section class="q-gutter-y-md">
                    <q-input v-model="signup_name" label="Введите имя" filled required>
                        <template v-slot:prepend>
                            <q-icon name="face"/>
                        </template>
                    </q-input>
                    <q-input v-model="signup_email" label="Введите электронную почту" filled type="email" required>
                        <template v-slot:prepend>
                            <q-icon name="email"/>
                        </template>
                    </q-input>
                    <q-input v-model="signup_password" label="Введите пароль" filled type="password" required
                             minlength="6">
                        <template v-slot:prepend>
                            <q-icon name="password"/>
                        </template>
                    </q-input>
                    <q-input v-model="signup_confirm_password" label="Повторите пароль" filled type="password" required
                             minlength="6">
                        <template v-slot:prepend>
                            <q-icon name="password"/>
                        </template>
                    </q-input>
                </q-card-section>

                <q-separator/>
                <q-card-section class="flex justify-end q-gutter-x-xs">
                    <q-btn @click="show_signin = true" flat label="Авторизация" color="primary" v-close-popup/>
                    <q-btn label="Подтвердить" color="primary" type="submit" :loading="signup_loading"/>
                </q-card-section>
            </form>
        </q-card>
    </q-dialog>
</template>

<script>
import {mapState} from "pinia";
import {useBasketStore} from '../stores/basket';
import {useUserStore} from "../stores/user";
import axios from "axios";

export default {
    name: "Layout",
    data() {
        return {
            // signin
            signin_email: null,
            signin_password: null,
            signin_loading: false,

            // signup
            signup_name: null,
            signup_email: null,
            signup_password: null,
            signup_confirm_password: null,
            signup_loading: false
        }
    },
    computed: {
        ...mapState(useUserStore, ["market_location", "work_time", "phonenumber", "user", "token"]),
        ...mapState(useBasketStore, ['basket']),
        show_signin: {
            get() {
                return useUserStore().show_signin;
            },
            set(newValue) {
                useUserStore().show_signin = newValue;
            }
        },
        show_signup: {
            get() {
                return useUserStore().show_signup;
            },
            set(newValue) {
                useUserStore().show_signup = newValue;
            }
        }
    },
    methods: {
        async signin() {
            this.signin_loading = true;
            return useUserStore().signin(this.signin_email, this.signin_password)
                .then(() => {
                    this.$q.notify({type: "positive", message: "Авторизация выполнена"});
                    useUserStore().show_signin = false;
                })
                .catch((response) => {
                    if (response.status = 403) {
                        this.$q.notify({type: "negative", message: "Неверные данные авторизации"});
                    } else {
                        this.$q.notify({type: "negative", message: "Ошибка сервера"});
                    }
                })
                .finally(() => this.signin_loading = false)
        },
        signup() {
            if (this.signup_password.length < 6) {
                this.$q.notify({type: "negative", message: "Длина пароля менее 6 символов"});
                return;
            }

            if (this.signup_password !== this.signup_confirm_password) {
                this.$q.notify({type: "negative", message: "Пароли не совпадают"});
                return;
            }

            this.signup_loading = true;
            useUserStore().signup(this.signup_name, this.signup_email, this.signup_password)
                .then(() => {
                    this.signin_email = this.signup_email;
                    this.signin_password = this.signup_password;
                    this.signin().then(() => {
                        this.$q.notify({type: "positive", message: "Регистрация выполнена"});
                        useUserStore().show_signup = false;
                    })
                })
                .catch((response) => {
                    if (response.status = 422) {
                        this.$q.notify({type: "negative", message: "Такая почта уже зарегистрирована"});
                    } else {
                        this.$q.notify({type: "negative", message: "Ошибка сервера"});
                    }
                })
                .finally(() => this.signup_loading = false)
        },
        logout() {
            useUserStore().logout()
                .then(() => {
                    this.$q.notify({type: "positive", message: "Вы вышли из своей учётной записи"});
                    if (this.$route.meta.requiresAuth) {
                        this.$router.push("/");
                    }
                });
        }
    },
    beforeMount() {
        if (this.token) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
        }
    }
}
</script>

<style scoped>
header {
    background: #fff;
    min-height: 145px;
    display: flex;
    justify-content: center;
    box-shadow: 0 1px 2px rgba(0, 0, 0, .1);
    color: #4e4e4e;
}

main {
    display: flex;
    justify-content: center;
    margin-top: 32px;
}

.header__top {
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding: 20px 0 4px;
}

.header__bottom {
    display: flex;
    align-items: center;
    height: 96px;
}
</style>
