import axios from 'axios'
import{useAuthStore} from '@/store/authStore'

const apiClient = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json'
    },
});

apiClient.interceptors.request.use((config) => {
        const authStore = useAuthStore();
        const token = authStore.token;
        console.log("Token being sent:", token);

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }else {
            console.warn("No token found, please check auth state.");
        } 
        return config;
        },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;
