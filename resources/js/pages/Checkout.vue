<template>
    <div class="text-center q-mt-xl">
        <q-img src="/images/done.svg" height="400px" fit="contain"/>
        <div class="text-body1 q-mt-md text-grey-8">
            Забрать товар можно по адресу: г. {{ market_location }}.
            <br>
            Время работы: <span style="font-weight: 500">{{ work_time }}</span>. Срок ожидания получения: <span style="font-weight: 500">3 дня</span>.
            <br>
            Все сделанные заказы отображаются на странице "<router-link to="/orders" style="text-decoration: underline">Мои заказы</router-link>".
        </div>
        <q-btn to="/" class="bg-red-5 text-white q-mt-md">Вернуться на главную</q-btn>
    </div>
</template>

<script>
import {useUserStore} from "../stores/user";
import {mapState} from "pinia";

export default {
    name: "Checkout",
    computed: {
        ...mapState(useUserStore, ["market_location", "work_time"])
    },
    beforeMount() {
        this.$q.notify({type: "positive", message: "Заказ товара был выполнен успешно!"});
    }
}
</script>

<style scoped>

</style>
