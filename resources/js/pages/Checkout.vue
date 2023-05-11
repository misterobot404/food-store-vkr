<template>

</template>

<script>
import {mapActions} from "pinia";
import {useBasketStore} from "../stores/basket";

export default {
    name: "Checkout",
    methods: {
        ...mapActions(useBasketStore, {removeAllBasketItems: 'removeAll'}),
    },
    beforeMount() {
        this.$q.notify({type: "positive", message: "Оформление заказа завершено. Заказ ожидает Вас в пункте выдачи!"});
        this.removeAllBasketItems();
    }
}
</script>

<style scoped>

</style>
