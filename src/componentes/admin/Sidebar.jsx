// Sidebar.jsx
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { 
    FiBox, 
    FiMessageSquare, 
    FiFileText, 
    FiChevronLeft, 
    FiChevronRight,
    FiLogOut
} from 'react-icons/fi';

const Sidebar = () => {
    const { logout } = useAdminAuth();
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        if (location.pathname !== '/admin/dashboard') {
            setCollapsed(true);
        }
    }, [location]);

    const menuItems = [
        { path: '/admin/dashboard/products', label: 'Productos', icon: <FiBox /> },
        { path: '/admin/dashboard/testimonials', label: 'Testimonios', icon: <FiMessageSquare /> },
        { path: '/admin/dashboard/blog', label: 'Blog', icon: <FiFileText /> },
    ];

    return (
        <div className={`bg-white h-screen shadow-lg fixed top-16 left-0 transition-all duration-300 z-30
            ${collapsed ? 'w-16' : 'w-64'}`}>
            
            <button 
                onClick={() => setCollapsed(!collapsed)}
                className="absolute -right-3 top-5 bg-white p-1.5 rounded-full shadow-md hover:bg-gray-100"
            >
                {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
            </button>

            <div className="p-4 overflow-hidden">
                <h2 className={`text-xl font-bold mb-6 ${collapsed ? 'hidden' : 'block'}`}>
                    Panel
                </h2>
                
                <nav className="space-y-2">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center p-2 rounded gap-2 
                                ${location.pathname === item.path 
                                    ? 'bg-blue-100 text-blue-600' 
                                    : 'hover:bg-gray-100'}
                                ${collapsed ? 'justify-center' : ''}`}
                        >
                            {item.icon}
                            <span className={`${collapsed ? 'hidden' : 'block'}`}>
                                {item.label}
                            </span>
                        </Link>
                    ))}
                </nav>

                <button
                    onClick={logout}
                    className={`w-full mt-4 p-2 hover:bg-red-100 text-red-600 rounded flex items-center gap-2
                        ${collapsed ? 'justify-center' : ''}`}
                >
                    <FiLogOut />
                    <span className={`${collapsed ? 'hidden' : 'block'}`}>
                        Cerrar Sesión
                    </span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;