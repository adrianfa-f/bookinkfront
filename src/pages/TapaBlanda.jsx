import { useState, useEffect } from 'react';
import SEO from '../componentes/SEO';
import RevealOnScroll from '../componentes/RevealOnScroll';
import ProductCard from '../componentes/cards/ProductCard';
import { getByCategory } from '../services/ApiService';


const TapaBlanda = () => {
    const [tapaBlandaProducts, setTapaBlandaProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getByCategory("productos", "TAPA_BLANDA");
                setTapaBlandaProducts(data)
            } catch (error) {
                console.log("Error al cargar los productos de Tapa Blanda: ", error)
            }
        }
        fetchData()
    }, []);

    return (
        <>
            <SEO 
                title="Agendas de Tapa Blanda | Bookink"
                description="Agendas ligeras y flexibles perfectas para uso diario, totalmente personalizables"
                keywords="agendas tapa blanda, agendas flexibles, agendas diarias, personalización económica"
            />

            <div className="bg-gradient-to-b mt-10 from-purple-50 to-white py-16">
                <div className="container mx-auto px-4">
                    <RevealOnScroll>
                        <div className="text-center mb-16">
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                                Colección Tapa Blanda
                            </h1>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                Ligereza y flexibilidad para tu organización diaria
                            </p>
                        </div>
                    </RevealOnScroll>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {tapaBlandaProducts.map((product, index) => (
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

export default TapaBlanda;