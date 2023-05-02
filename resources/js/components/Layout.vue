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
                            <div style="margin-top: 2px">{{ user.login }}</div>
                            <q-menu auto-close>
                                <q-list>
                                    <q-item clickable>
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
                        <a class="column items-center" @click="singin_dialog = true">
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

    <q-dialog v-model="singin_dialog">
        <q-card>
            <q-card-section>
                <div class="text-h6">Авторизация</div>
            </q-card-section>

            <q-separator />

            <q-card-section>
            </q-card-section>

            <q-separator />
            <q-card-actions align="right">
                <q-btn @click="singup_dialog = true" flat label="Регистрация" color="primary" v-close-popup />
                <q-btn flat label="Закрыть" color="primary" v-close-popup />
            </q-card-actions>
        </q-card>
    </q-dialog>

    <q-dialog v-model="singup_dialog">
        <q-card>
            <q-card-section>
                <div class="text-h6">Регистрация</div>
            </q-card-section>

            <q-separator />

            <q-card-section>
            </q-card-section>

            <q-separator />
            <q-card-actions align="right">
                <q-btn @click="singin_dialog = true" flat label="Авторизация" color="primary" v-close-popup />
                <q-btn flat label="Закрыть" color="primary" v-close-popup />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
import {mapState} from "pinia";
import {useBasketStore} from '@/stores/basket';
import {useUserStore} from "@/stores/user";

export default {
    name: "Layout",
    data() {
        return {
            singin_dialog: false,
            singup_dialog: false,
        }
    },
    computed: {
        ...mapState(useUserStore, ["market_location", "work_time", "phonenumber", "user"]),
        ...mapState(useBasketStore, ['basket'])
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
