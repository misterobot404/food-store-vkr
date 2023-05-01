<template>
    <h1>Самый лучший сайт</h1>
    <div>
        <router-link to="/">Домой</router-link>
    </div>
    <div>
        <router-link to="/account">Профиль</router-link>
    </div>

    <div style="margin-top: 24px">
        <slot/>
    </div>

</template>

<script>

export default {
    name: "Layout",
    data() {
        return {
            active: 'guide'
        }
    }
}
</script>

<style scoped>

</style>
