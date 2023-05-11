import {defineStore} from 'pinia'
import axios from "axios";

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            market_location: "Комсомольск-на-Амуре, ул. Ленина 74",
            phonenumber: "8-800-55-35-355 ",
            work_time: "с 09:00 до 17:00",
            user: JSON.parse(window.localStorage.getItem('user')),
            token: window.localStorage.getItem('token'),
            show_signin: false,
            show_signup: false,
        }
    },
    actions: {
        signup(name, email, password) {
            return axios.post('/api/register', {
                name: name,
                email: email,
                password: password
            })
        },
        signin(email, password) {
            return axios.post('/api/login', {email: email, password: password})
                .then(response => this.setAuth(response.data.data.token, response.data.data.user))
        },
        logout() {
            return axios.post('/api/logout')
                .then(() => this.removeAuth())
        },
        setAuth(token, user) {
            this.user = user;
            this.token = token;
            // add token to axios header
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            // saving auth token between sessions
            window.localStorage.setItem('token', token);
            window.localStorage.setItem('user', JSON.stringify(user));
        },
        removeAuth() {
            this.token = null;
            this.user = null;

            window.localStorage.removeItem('token');
            window.localStorage.removeItem('user');

            // remove token to axios header
            delete axios.defaults.headers.common['Authorization'];
        }
    }
})
