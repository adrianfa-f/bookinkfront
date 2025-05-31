import { useState, useEffect } from 'react';
import SEO from '../componentes/SEO';
import RevealOnScroll from '../componentes/RevealOnScroll';
import ProductCard from '../componentes/cards/ProductCard';
import { getByCategory } from '../services/ApiService';

const Servicios = () => {
    const [servicios, setServicios] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getByCategory("productos", "SERVICIOS");
                setServicios(data)
            } catch (error) {
                console.log("Error al cargar los productos Servicios: ", error)
            }
        }
        fetchData()
    }, []);

    return (
        <>
            <SEO 
                title="Servicios Especializados | Bookink"
                description="Restauración profesional de libros e impresión de tarjetas de alta calidad."
                keywords="restauración libros, impresión tarjetas, encuadernación, servicios papelería"
            />

            <div className="bg-gradient-to-b mt-10 from-purple-50 to-white py-16">
                <div className="container mx-auto px-4">
                    <RevealOnScroll>
                        <div className="text-center mb-16">
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                                Servicios Expertos
                            </h1>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                Cuidado profesional y acabados de alta calidad
                            </p>
                        </div>
                    </RevealOnScroll>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {servicios.map((service, index) => (
                            <RevealOnScroll key={index} delay={index * 100}>
                                <ProductCard product={service} />
                            </RevealOnScroll>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Servicios;