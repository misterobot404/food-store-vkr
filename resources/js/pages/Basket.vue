<template>
    <div>
        <template v-if="products">
            <template v-if="!basket.length">
                <div class="text-center q-mt-xl">
                    <q-img src="/images/basket_empty.svg" height="500px" fit="contain"/>
                    <div class="text-subtitle1 q-mt-sm">Корзина пуста</div>
                </div>
            </template>
            <template v-else>
                <div class="flex">
                    <div class="text-title q-mr-auto">Корзина</div>
                    <q-btn @click="removeAllBasketItems()" icon="block" label="Очистить" outline no-caps class="q-mr-sm"/>
                    <q-btn @click="confirmation()" icon="fact_check" label="Подтвердить заказ" no-caps color="red-5"/>
                </div>

                <div class="q-gutter-y-sm q-mt-md">
                    <q-card v-for="(basket_id) in basket" flat bordered class="rounded-borders-lg">
                        <q-card-section horizontal v-if="getProductById(basket_id)">
                            <q-img :src="getProductById(basket_id).image_url" width="220px" height="120px"/>

                            <q-card-section >
                                <div class="text-h6 ellipsis">
                                    {{ getProductById(basket_id).title }}
                                </div>
                                <div class="text-caption text-grey">
                                    {{ getProductById(basket_id).description }}
                                </div>
                            </q-card-section>

                            <q-card-section class="q-ml-auto column justify-between items-end">
                                <div class="flex">
                                    <q-input v-model.number="getProductById(basket_id).BUY_COUNT_KG" type="number" style="width: 80px" outlined placeholder="кг" dense :max="getProductById(basket_id).count_kg" min="1"/>
                                    <q-btn @click="removeBasketByProductId(getProductById(basket_id).id)" icon="close" flat round class="q-ml-sm"/>
                                </div>

                                <div class="text-subtitle2">
                                    {{ !getProductById(basket_id).count_kg ? "Нет в наличии" : `Доступно для заказа: ${getProductById(basket_id).count_kg} кг` }} ・ {{ getProductById(basket_id).price }} ₽ за кг
                                </div>
                            </q-card-section>
                        </q-card-section>
                    </q-card>
                </div>
            </template>
        </template>
    </div>
</template>

<script>
import {useUserStore} from "../stores/user";
import {useBasketStore} from "../stores/basket";
import {useProductsStore} from "../stores/products";
import {mapActions, mapState} from "pinia";

export default {
    name: "Basket",
    data() {
        return {
            is_ready: false,
        }
    },
    computed: {
        ...mapState(useUserStore, ["market_location", "work_time"]),
        ...mapState(useBasketStore, ["basket"]),
        ...mapState(useProductsStore, ["products"]),
    },
    methods: {
        ...mapActions(useBasketStore, {removeBasketByProductId: 'removeByProductId'}),
        ...mapActions(useBasketStore, {removeAllBasketItems: 'removeAll'}),
        ...mapActions(useProductsStore, {getProducts: 'get'}),
        getProductById(id) {
            return this.products.find(product => product.id === id)
        },
        confirmation() {
            let buy_products = [];
            this.basket.forEach(el => buy_products.push(this.getProductById(el)));

            if (buy_products.find(el => !el.BUY_COUNT_KG)) {
                this.$q.notify({icon: "warning", message: "Не для всех товаров введены киллограммы"});
                return;
            }

            let price = 0;
            buy_products.forEach(el => price+= (el.price * el.BUY_COUNT_KG));
            if (!confirm(`Сумма покупки составит ${price} р. Забрать товар можно по адресу ${this.market_location}. Время работы ${this.work_time}. Подтвердить?`)) {
                return;
            }

            this.$router.push("checkout");
        }
    },
    beforeMount() {
        this.getProducts();
    }
}
</script>

<style>
.on-left {
    margin-right: 8px;
}
</style>
