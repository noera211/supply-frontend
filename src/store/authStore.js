import {defineStore} from 'pinia';

export const useAuthStore = defineStore('authStore', {
    state:() => ({
        token: localStorage.getItem('token') || '',
        role: localStorage.getItem('role') || '',
    }),
    actions: {
        setToken(token) {
            this.token = token;
            localStorage.setItem('token', token)
        },
        setRole(role) {
            this.role = role;
            localStorage.setItem('role', role )
        },

        logout() {
            this.token = '';
            this.role = '';
            localStorage.removeItem('token');
            localStorage.removeItem('role');
        }
    }
})