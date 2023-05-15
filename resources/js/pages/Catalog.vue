<template>
    <template v-if="products">
        <div class="text-title q-mb-lg">Каталог</div>
        <div class="flex q-col-gutter-x-lg">
            <!-- Категории -->
            <div class="col-auto">
                <q-card style="min-width: 220px; height: fit-content">
                    <q-tabs v-model="selected_category_index" vertical active-color="red-4">
                        <template v-for="(category, index) in product_categories">
                            <q-tab no-caps :name="index" style="height: 62px;">
                                <div class="flex no-wrap items-center justify-start" style="width: 180px">
                                    <q-img :src="category.logo_url" width="38px" no-spinner/>
                                    <div class="q-ml-md">{{ category.name }}</div>
                                </div>
                            </q-tab>
                            <q-separator/>
                        </template>
                    </q-tabs>
                </q-card>
            </div>
            <!-- Содержимое категории -->
            <div class="col row q-col-gutter-md">
                <template v-for="product in products_by_selected_category">
                    <div class="col-4">
                        <q-card class="my-card overflow-hidden" flat bordered>
                            <q-img :src="product.image_url" width="300px" height="200px"/>

                            <q-card-section>
                                <q-btn
                                    v-if="product.count_kg"
                                    @click="productInBasket(product) ? removeProductFromBasket(product.id) : addProductToBasket(product.id)"
                                    fab
                                    color="red"
                                    :icon="productInBasket(product) ? 'done' : 'add'"
                                    class="absolute"
                                    style="top: 0; right: 14px; transform: translateY(-50%);"
                                />
                                <div class="text-h6 ellipsis">
                                    {{ product.title }}
                                </div>
                                <div class="text-caption text-grey">
                                    {{ product.description }}
                                </div>
                            </q-card-section>

                            <q-card-section class="q-pt-none">
                                <div class="text-subtitle2" style="font-weight: 400">
                                    {{ !product.count_kg ? "Нет в наличии" : `Осталось: ${product.count_kg} кг.` }} ・ {{ product.price }} ₽ за кг
                                </div>
                            </q-card-section>
                        </q-card>
                    </div>
                </template>
            </div>
        </div>
    </template>
    <template v-else>
        <div class="text-center q-mt-xl">
            <q-spinner
                color="red-5"
                size="5em"
                :thickness="2"
            />
        </div>
    </template>
</template>

<script>
import {mapActions, mapState} from "pinia";
import {useBasketStore } from '../stores/basket';
import {useProductsStore} from "../stores/products";

export default {
    name: "Catalog",
    data() {
        return {
            selected_category_index: 0,
        }
    },
    computed: {
        ...mapState(useBasketStore, ['basket']),
        ...mapState(useProductsStore, ['products', 'product_categories']),
        products_by_selected_category() {
            return !this.selected_category_index ? this.products : this.products.filter(product => product.category_id === this.product_categories[this.selected_category_index].id)
        }
    },
    methods: {
        ...mapActions(useBasketStore, {addProductToBasket: 'add'}),
        ...mapActions(useBasketStore, {removeProductFromBasket: 'removeByProductId'}),
        ...mapActions(useProductsStore, {getProducts: 'get'}),
        productInBasket(product) {
            return this.basket.includes(product.id);
        }
    },
    beforeMount() {
        this.getProducts();
    }
}
</script>

<style scoped>

</style>
