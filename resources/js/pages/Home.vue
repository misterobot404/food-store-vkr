<template>
    Это мой дом!
    <q-btn label="Hello"/>
    <YandexMap
        :coordinates="[55.75, 37.57]"
        :zoom="11"
        :detailed-controls="map_detailed_controls"
        :controls="map_controls"
        style="height: 600px"
    >
        <YandexMarker :coordinates="[55.684381, 37.339849]"/>
    </YandexMap>
</template>

<script>
import {YandexMap, YandexMarker} from 'vue-yandex-maps'

export default {
    name: "Home",
    components: {YandexMarker, YandexMap},
    data() {
        return {
            map: null,
            map_controls: ['typeSelector', 'trafficControl', 'fullscreenControl'],
            map_detailed_controls: {zoomControl: {position: {right: 10, top: 50}}},
        }
    },

}
</script>

<style scoped>

</style>
