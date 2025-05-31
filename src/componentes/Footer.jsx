import { Link, useLocation } from 'react-router-dom';
import { FaWhatsapp, FaInstagram, FaFacebook, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
    const location = useLocation();
    
    if (location.pathname.startsWith('/admin/dashboard')) return null;

    return (
        <footer className="bg-gray-900 text-gray-300 py-12">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-8">

                    {/* Contacto */}
                    <div>
                        <h4 className="text-lg font-bold text-white mb-4">Contacto</h4>
                        <div className="space-y-2">
                            <a href="mailto:contacto@agendapersonalizada.com" className="flex items-center hover:text-purple-400">
                                <FaEnvelope className="mr-2" />
                                Email
                            </a>
                            <a href="https://wa.me/+5353247364" className="flex items-center hover:text-purple-400">
                                <FaWhatsapp className="mr-2" />
                                WhatsApp
                            </a>
                        </div>
                    </div>

                    {/* Redes Sociales */}
                    <div>
                        <h4 className="text-lg font-bold text-white mb-4">Redes Sociales</h4>
                        <div className="flex space-x-4">
                            <a href="https://instagram.com/bookink96" className="hover:text-purple-400">
                                <FaInstagram size={24} />
                            </a>
                            <a href="https://facebook.com/tu_perfil" className="hover:text-purple-400">
                                <FaFacebook size={24} />
                            </a>
                        </div>
                    </div>

                    {/* Enlaces */}
                    <div className="md:col-span-2">
                        <h4 className="text-lg font-bold text-white mb-4">Explorar</h4>
                        <div className="grid grid-cols-2 gap-4">
                            <Link to="/tapa-dura" className="hover:text-purple-400">Tapa Dura</Link>
                            <Link to="/tapa-blanda" className="hover:text-purple-400">Tapa Blanda</Link>
                            <Link to="/100-citas" className="hover:text-purple-400">100 Citas</Link>
                            <Link to="/servicios" className="hover:text-purple-400">Servicios</Link>
                            <Link to="/blog" className="hover:text-purple-400">Blog</Link>
                            <Link to="/preguntas-frecuentes" className="hover:text-purple-400">FAQ</Link>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-800 text-center">
                    <p className="text-sm">
                        © 2024 AgendaPersonalizada. Todos los derechos reservados.<br />
                        Diseñado con ❤️ en La Habana, Cuba
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;