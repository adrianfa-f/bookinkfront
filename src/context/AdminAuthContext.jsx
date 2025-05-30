import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    const navigate = useNavigate();

    const fetchAdmin = async () => {
        try {
            const { data } = await api.get('/auth/me');
            setAdmin(data.admin);
        } catch (error) {
            logout();
        }
    };

    const login = async (credentials) => {
        try {
            const { data } = await api.post('/auth/login', credentials);
            localStorage.setItem('adminToken', data.token);
            await fetchAdmin();
            navigate('/admin/dashboard');
        } catch (error) {
            throw new Error('Credenciales inválidas');
        }
    };

    const logout = () => {
        localStorage.removeItem('adminToken');
        setAdmin(null);
        navigate('/admin/login');
    };

    return (
        <AdminAuthContext.Provider value={{ admin, login, logout }}>
            {children}
        </AdminAuthContext.Provider>
    );
};

export const useAdminAuth = () => useContext(AdminAuthContext);