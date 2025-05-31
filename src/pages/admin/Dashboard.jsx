import { Outlet, Navigate, useLocation } from 'react-router-dom';
import Sidebar from '../../componentes/admin/Sidebar';
import { useAdminAuth } from '../../context/AdminAuthContext';

const Dashboard = () => {
    const { admin } = useAdminAuth();
    const location = useLocation();

    if (!admin) {
        return <Navigate to="/admin/login" replace />;
    }

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            
            {/* Contenido principal con ajustes */}
            <div className={`flex-1 min-h-screen transition-all duration-300 ml-12`}>
                <div className="p-2 md:p-8">
                    <Outlet context={{ sidebarCollapsed: false }} />
                    
                    {/* Pantalla de bienvenida */}
                    {location.pathname === '/admin/dashboard' && (
                        <div className="bg-white rounded-lg mt-20 shadow-sm p-6 md:p-8 text-center">
                            <h1 className="text-2xl md:text-3xl font-bold mb-4">¡Bienvenido al Panel!</h1>
                            <p className="text-gray-600">Selecciona una sección del menú para comenzar</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;