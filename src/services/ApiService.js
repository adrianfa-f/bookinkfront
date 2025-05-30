import api from '../api'; // Tu instancia de axios configurada


    // Operaciones CRUD genéricas
    export const getAll = async (endpoint) => {
        try {
            const { data } = await api.get(`/${endpoint}`);
            return data;
        } catch (error) {
            throw handleError(error);
        }
    };

    export const getById = async (endpoint, id) => {
        try {
            const { data } = await api.get(`/${endpoint}/${id}`);
            return data;
        } catch (error) {
            throw handleError(error);
        }
    };

    export const getByCategory = async (endpoint, category) => {
        try {
            const { data } = await api.get(`/${endpoint}/${category}`);
            return data;
        } catch (error) {
            throw handleError(error);
        }
    };

    export const create = async (endpoint, itemData) => {
        try {
            const { data } = await api.post(`/${endpoint}`, itemData);
            return data;
        } catch (error) {
            throw handleError(error);
        }
    };

    export const update = async (endpoint, id, itemData) => {
        try {
            const { data } = await api.put(`/${endpoint}/${id}`, itemData);
            return data;
        } catch (error) {
            throw handleError(error);
        }
    };

    export const deleteById = async (endpoint, id) => {
        try {
            await api.delete(`/${endpoint}/${id}`);
            return true;
        } catch (error) {
            throw handleError(error);
        }
    };

    // Manejo centralizado de errores
    export const handleError = (error) => {
        const errorMessage = error.response?.data?.message || 'Error de conexión';
        console.error(`API Error: ${errorMessage}`);
        return new Error(errorMessage);
    }

