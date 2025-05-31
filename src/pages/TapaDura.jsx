import { useState, useEffect } from 'react';
import SEO from '../componentes/SEO';
import RevealOnScroll from '../componentes/RevealOnScroll';
import ProductCard from '../componentes/cards/ProductCard';
import { getByCategory } from '../services/ApiService';

const TapaDura = () => {
    const [tapaDuraProducts, setTapaDuraProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getByCategory("productos", "TAPA_DURA");
                setTapaDuraProducts(data)
            } catch (error) {
                console.log("Error al obtener Tapa-Dura: ", error)
            }
                
        }
        fetchData()
    }, []);

    return (
        <>
            <SEO 
                title="Agendas de Tapa Dura Personalizadas | Bookink"
                description="Agendas de alta calidad con tapas duras personalizadas. Elige entre cuero, diseños modernos y medidas especiales."
                keywords="agendas tapa dura, personalización, cuero genuino, agendas premium"
            />

            <div className="bg-gradient-to-b from-purple-50 mt-10 to-white py-16">
                <div className="container mx-auto px-4">
                    <RevealOnScroll>
                        <div className="text-center mb-16">
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                                Colección Tapa Dura
                            </h1>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                Materiales premium y diseños exclusivos para tu agenda ideal
                            </p>
                        </div>
                    </RevealOnScroll>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {tapaDuraProducts.map((product, index) => (
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

export default TapaDura;