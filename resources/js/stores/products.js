import {defineStore} from 'pinia'
import axios from "axios";

export const useProductsStore = defineStore('products', {
    state: () => {
        return {
            products: null,
            product_categories: null,
        }
    },
    actions: {
        get() {
            return axios.get('/api/products')
                .then((response) => {
                    this.product_categories = [{name: "Все", logo_url: "/images/product_categories/Всё.png"}, ...response.data.product_categories];
                    this.products = response.data.products.reverse();
                })
        },
        updateAllProducts(products) {
            return axios.put('/api/products/updateAll', {products: JSON.stringify(products)})
                .then((response) => this.products = response.data.products)
        },
    }
})
