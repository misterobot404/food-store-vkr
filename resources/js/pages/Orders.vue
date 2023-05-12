<template>
    <template v-if="orders">
        <template v-if="!orders.length">
            <div class="text-center q-mt-xl">
                <q-img src="/images/basket_empty.svg" height="500px" fit="contain"/>
                <div class="text-subtitle1 q-mt-sm">Заказы не найдены</div>
            </div>
        </template>
        <template v-else>
            <div class="q-gutter-y-sm q-mt-md">
                <div v-for="order in orders">
                    <div class="text-title">Заказ # {{ order.id }}</div>
                    <q-separator class="q-my-md"/>
                    <div class="q-gutter-y-sm q-mt-md">
                        <q-card v-for="product in order.products" flat bordered class="rounded-borders-lg">
                            <q-card-section horizontal>
                                <q-img :src="product.image_url" width="220px" height="120px"/>
                                <q-card-section>
                                    <div class="text-h6 ellipsis">
                                        {{ product.title }}
                                    </div>
                                    <div class="text-caption text-grey">
                                        {{ product.description }}
                                    </div>
                                </q-card-section>

                                <q-card-section class="q-ml-auto column justify-between items-end">
                                    <div class="text-subtitle2" style="font-weight: 400">
                                        {{ 'Куплено: ' + product.BUY_COUNT_KG + ' кг.' }} ・ {{ product.price }} ₽ за кг
                                    </div>
                                </q-card-section>
                            </q-card-section>
                        </q-card>
                    </div>
                    <div class="text-right q-mt-sm">
                        Общая стоимость заказа: {{ order.price }} ₽ ・ Дата заказа: {{order.create_date }}
                    </div>
                </div>
            </div>
        </template>
    </template>
    <template v-else>
        <div class="text-center q-mt-xl">
            <q-spinner color="red-5" size="5em" :thickness="2"/>
        </div>
    </template>
</template>

<script>
import {useProductsStore} from "@/stores/products";
import axios from "axios";

export default {
    name: "Orders",
    data() {
        return {
            orders: null
        }
    },
    beforeMount() {
        axios.get("/api/orders")
            .then((response) => {
                this.orders = response.data.orders.map(order => {
                    order.products = JSON.parse(order.products);
                    return order;
                }).reverse();
            });
    }
}
</script>

<style scoped>

</style>
