import { FaWhatsapp, FaInstagram } from 'react-icons/fa';

const ContactSection = () => {
    return (
        <section className="bg-purple-50 py-16">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Contacto Directo</h2>
                    <p className="text-gray-600 mb-8">
                        Gestionamos todos los pedidos a través de WhatsApp e Instagram para brindarte
                        una atención más personalizada y rápida.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row justify-center gap-6 mb-8">
                        <a 
                            href="https://wa.me/+5353247364"
                            className="bg-green-500 text-white px-8 py-3 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
                        >
                            <FaWhatsapp className="mr-2 text-xl" />
                            WhatsApp
                        </a>
                        
                        <a 
                            href="https://instagram.com/booink96"
                            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-3 rounded-full flex items-center justify-center hover:opacity-90 transition-opacity"
                        >
                            <FaInstagram className="mr-2 text-xl" />
                            Instagram
                        </a>
                    </div>

                    <p className="text-gray-600">
                        También puedes escribirnos a:<br />
                        <a href="mailto:contacto@agendapersonalizada.com" className="text-purple-600 hover:underline">
                            contacto@agendapersonalizada.com
                        </a>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;