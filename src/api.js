import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:4000/api',
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('adminToken');
    
    // Configuración simplificada de headers
    config.headers['Content-Type'] = 'application/json';
    
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Convertir FormData a objeto simple si es necesario
    if (config.data instanceof FormData) {
        config.data = Object.fromEntries(config.data.entries());
    }
    
    return config;
});

export default api;