import {defineStore} from 'pinia'
import {LocalStorage} from 'quasar';

export const useBasketStore = defineStore('basket', {
    state: () => {
        return {
            basket: LocalStorage.getItem("basket") ?? [],
        }
    },
    actions: {
        add(product_id) {
            this.basket.push(product_id);

            this.updateLocalStorage();
        },
        removeByProductId(id) {
            this.basket = this.basket.filter((el) => el !== id);

            this.updateLocalStorage();
        },
        removeAll() {
            this.basket = [];

            this.updateLocalStorage();
        },
        updateLocalStorage() {
            LocalStorage.set("basket", this.basket);
        }
    }
})
