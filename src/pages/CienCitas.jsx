import { useState, useEffect } from 'react';
import SEO from '../componentes/SEO';
import RevealOnScroll from '../componentes/RevealOnScroll';
import ProductCard from '../componentes/cards/ProductCard';
import { getByCategory } from '../services/ApiService'

const CienCitas = () => {
    const [cienCitasProducts, setCienCitasProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getByCategory("productos", "CIEN_CITAS");
                setCienCitasProducts(data)
            } catch (error) {
                console.log("Error al cargar el producto Cien Citas: ", error)
            }
        }
        fetchData()
    }, []);

    return (
        <>
            <SEO 
                title="Agenda 100 Citas | Bookink"
                description="La agenda perfecta para parejas, con 100 ideas de citas románticas personalizables"
                keywords="agenda parejas, regalo romántico, citas en pareja, ideas románticas"
            />

            <div className="bg-gradient-to-b from-purple-50 to-white py-16">
                <div className="container mx-auto px-4">
                    <RevealOnScroll>
                        <div className="text-center mb-16">
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                                Agenda 100 Citas
                            </h1>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                Convierte cada momento en una experiencia memorable
                            </p>
                        </div>
                    </RevealOnScroll>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {cienCitasProducts.map((product, index) => (
                            <RevealOnScroll key={product.id} delay={index * 100}>
                                <ProductCard product={product} />
                            </RevealOnScroll>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default CienCitas;