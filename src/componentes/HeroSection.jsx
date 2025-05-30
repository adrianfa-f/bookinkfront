import { Link } from 'react-router-dom';
import RevealOnScroll from './RevealOnScroll';
import { FaWhatsapp } from 'react-icons/fa';

const categories = [
    {
        title: "Agendas Tapa Dura",
        description: "Ediciones premium con materiales de lujo",
        image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80",
        link: "/tapa-dura"
    },
    {
        title: "Agendas Tapa Blanda",
        description: "Flexibles y ligeras para uso diario.",
        image: "https://cdn.pixabay.com/photo/2022/01/01/16/29/antelope-6908215_640.jpg",
        link: "/tapa-blanda"
    },
    {
        title: "100 Citas",
        description: "La agenda romántica definitiva.",
        image: "https://cdn.pixabay.com/photo/2021/10/14/12/32/autumn-6708984_640.jpg",
        link: "/100-citas"
    },
    {
        title: "Servicios",
        description: "Restauración e impresión profesional.",
        image: "https://cdn.pixabay.com/photo/2025/04/17/07/30/cake-9539411_640.jpg",
        link: "/servicios"
    }
];

const HeroSection = () => {
    return (
        <section className="pt-24 pb-16 bg-gradient-to-b from-purple-50 to-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Crea Tu Agenda Perfecta
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Personaliza cada detalle con nuestros diseños exclusivos y materiales premium
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((category, index) => (
                        <RevealOnScroll key={index} delay={index * 100}>
                            <Link 
                                to={category.link}
                                className="group relative block overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="relative h-64">
                                    <img
                                        src={category.image}
                                        alt={category.title}
                                        className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                </div>
                                
                                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                    <h3 className="text-xl font-bold mb-1">{category.title}</h3>
                                    <p className="text-sm opacity-90">{category.description}</p>
                                </div>
                            </Link>
                        </RevealOnScroll>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-gray-600 mb-4">
                        ¿Necesitas ayuda para elegir? ¡Escríbenos!
                    </p>
                    <a 
                        href="https://wa.me/+5355879391" 
                        className="inline-flex items-center bg-green-500 text-white px-8 py-3 rounded-full hover:bg-green-600 transition-colors"
                    >
                        <FaWhatsapp className="mr-2" />
                        Consultar por WhatsApp
                    </a>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;