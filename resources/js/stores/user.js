import {defineStore} from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            market_location: "Комсомольск-на-Амуре, ул. Ленина 74",
            phonenumber: "8-800-55-35-355 ",
            work_time: "с 09:00 до 17:00",
            user: null,
        }
    },
    actions: {
        signup() {
        },
        signin() {
        },
        logout() {
        }
    }
})
