import { useState, useEffect } from 'react';
import { getAll, create } from '../services/ApiService';
import { testimonialModel } from '../models/index';
import RevealOnScroll from './RevealOnScroll';

const TestimonialsSection = () => {
    const [rating, setRating] = useState(0);
    const [showForm, setShowForm] = useState(false);
    const [testimonialsPost, setTestimonialsPost] = useState([]);
    const [formData, setFormData] = useState(testimonialModel);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const data = await getAll('testimonios');
                setTestimonialsPost(data || []);
            } catch (error) {
                console.error("Error cargando testimonios:", error);
            }
        };
        fetchTestimonials();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newTestimonial = await create('testimonios', formData);
            setTestimonialsPost(prev => [newTestimonial, ...prev]);
            setShowForm(false);
            setFormData(testimonialModel);
            setRating(0);
        } catch (error) {
            console.error("Error enviando testimonio:", error);
        }
    };

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900">Voces de Nuestros Clientes</h2>
                    <p className="text-gray-600 mt-2">Descubre lo que dicen quienes ya personalizaron sus agendas</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {testimonialsPost?.slice(0, 4).map((testimonial) => (
                        <RevealOnScroll key={testimonial.id} delay={100}>
                            <div className="bg-purple-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center mb-4">
                                    <div className="bg-purple-100 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                                        <span className="text-purple-600 font-medium">
                                            {testimonial.nombre?.charAt(0) || 'U'}
                                        </span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">{testimonial.nombre || 'Usuario'}</h4>
                                        <div className="flex items-center text-yellow-400">
                                            {[...Array(5)].map((_, i) => (
                                                <svg
                                                    key={i}
                                                    className={`w-4 h-4 ${i < testimonial.estrellas ? 'fill-current' : 'fill-none stroke-current'}`}
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-gray-600 line-clamp-4">
                                    "{testimonial.opinion || 'Experiencia maravillosa con el producto...'}"
                                </p>
                            </div>
                        </RevealOnScroll>
                    ))}
                </div>

                <div className="text-center">
                    <button 
                        onClick={() => setShowForm(true)}
                        className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
                    >
                        Comparte Tu Experiencia
                    </button>
                </div>

                {showForm && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                        <form 
                            onSubmit={handleSubmit}
                            className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
                        >
                            <div className="bg-gradient-to-r from-purple-600 to-blue-500 p-6">
                                <h3 className="text-2xl font-bold text-white">Tu Opinión Nos Importa</h3>
                            </div>
                            
                            <div className="p-6 space-y-4">
                                <input
                                    type="text"
                                    placeholder="Tu nombre"
                                    value={formData.nombre}
                                    onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"
                                    required
                                />
                                
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium">Calificación</label>
                                    <div className="flex gap-2">
                                        {[...Array(5)].map((_, i) => (
                                            <button
                                                type="button"
                                                key={i}
                                                onClick={() => {
                                                    setRating(i + 1);
                                                    setFormData({...formData, estrellas: i + 1});
                                                }}
                                                className={`p-2 rounded-lg ${i < rating ? 'bg-yellow-100 text-yellow-500' : 'bg-gray-100 text-gray-400'}`}
                                            >
                                                ★
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                
                                <textarea
                                    placeholder="Cuéntanos tu experiencia (mínimo 10 caracteres)"
                                    value={formData.opinion}
                                    onChange={(e) => setFormData({...formData, opinion: e.target.value})}
                                    className="w-full p-3 border border-gray-200 rounded-lg h-32 focus:ring-2 focus:ring-purple-500"
                                    required
                                    minLength="10"
                                />
                                
                                <div className="flex gap-4 justify-end pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowForm(false)}
                                        className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                                    >
                                        Publicar Opinión
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </section>
    );
};

export default TestimonialsSection;