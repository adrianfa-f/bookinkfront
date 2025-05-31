import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';
import { useClickOutside } from '../hooks/useClickOutside';
import Logo from '../assets/IMG-20240824-WA0000.jpg'
import RevealOnScroll from './RevealOnScroll';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const menuRef = useRef();
    useClickOutside(menuRef, () => setIsMenuOpen(false));

    useEffect(() => {
        console.log("Location: ", location)
        setIsMenuOpen(false);
    }, [location]);

    return (
        <header className="bg-white w-full fixed top-0 shadow-lg z-50">
            <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold flex items-center">
                    <img 
                        src={Logo} 
                        alt="Logo" 
                        className="w-16 mr-10"
                    />
                    Bookink
                </Link>

                {/* Menú Desktop */}
                <div className="hidden md:flex items-center space-x-8">
                    <div className="flex space-x-6">
                        <RevealOnScroll delay={50}>
                            <Link to="/" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">Inicio</Link>
                        </RevealOnScroll>
                        <RevealOnScroll delay={100}>
                            <Link to="/tapa-dura" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">Tapa Dura</Link>
                        </RevealOnScroll>
                        <RevealOnScroll delay={150}>
                            <Link to="/tapa-blanda" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">Tapa Blanda</Link>
                        </RevealOnScroll>
                        <RevealOnScroll delay={200}>
                            <Link to="/100-citas" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">100 Citas</Link>
                        </RevealOnScroll>
                        <RevealOnScroll delay={250}>
                            <Link to="/servicios" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">Servicios</Link>
                        </RevealOnScroll>
                        <RevealOnScroll delay={300}>
                            <Link to="/blog" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">Blog</Link>
                        </RevealOnScroll>
                    </div>
                    
                    <a 
                        href="https://wa.me/+5353247364" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-4 bg-green-500 text-white px-5 py-2.5 rounded-full flex items-center hover:bg-green-600 transition-colors"
                    >
                        <FaWhatsapp className="mr-2" />
                        Pedir por WhatsApp
                    </a>
                </div>

                {/* Menú Mobile */}
                <button 
                    className="md:hidden text-gray-700"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
                </button>

                {/* Menú Desplegable Mobile */}
                {isMenuOpen && (
                    <div ref={menuRef} className="fixed top-16 inset-x-0 bg-white shadow-xl md:hidden z-50">
                        <div className="p-4 space-y-2">
                            <RevealOnScroll delay={50}>
                                <Link to="/" className="block px-4 py-3 text-gray-700 hover:bg-purple-50 rounded-lg transition-colors">
                                    Inicio
                                </Link>
                            </RevealOnScroll>
                            <RevealOnScroll delay={100}>
                                <Link to="/tapa-dura" className="block px-4 py-3 text-gray-700 hover:bg-purple-50 rounded-lg transition-colors">
                                    Tapa Dura
                                </Link>
                            </RevealOnScroll>
                            <RevealOnScroll delay={150}>
                                <Link to="/tapa-blanda" className="block px-4 py-3 text-gray-700 hover:bg-purple-50 rounded-lg transition-colors">
                                    Tapa Blanda
                                </Link>
                            </RevealOnScroll>
                            <RevealOnScroll delay={200}>
                                <Link to="/100-citas" className="block px-4 py-3 text-gray-700 hover:bg-purple-50 rounded-lg transition-colors">
                                    100 Citas
                                </Link>
                            </RevealOnScroll>
                            <RevealOnScroll delay={250}>
                                <Link to="/servicios" className="block px-4 py-3 text-gray-700 hover:bg-purple-50 rounded-lg transition-colors">
                                    Servicios
                                </Link>
                            </RevealOnScroll>
                            <RevealOnScroll delay={300}>
                                <Link to="/blog" className="block px-4 py-3 text-gray-700 hover:bg-purple-50 rounded-lg transition-colors">
                                    Blog
                                </Link>
                            </RevealOnScroll>
                            <a
                                href="https://wa.me/+5353247364"
                                className="block mx-4 mt-4 bg-green-500 text-white text-center py-3 px-6 rounded-full hover:bg-green-600 transition-colors"
                                onClick={() => setIsMenuOpen(false)} // Solo necesario para enlaces externos
                            >
                                <FaWhatsapp className="inline mr-2" />
                                Pedir por WhatsApp
                            </a>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;