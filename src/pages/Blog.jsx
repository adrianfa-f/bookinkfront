import { useState, useEffect } from 'react';
import SEO from '../componentes/SEO';
import RevealOnScroll from '../componentes/RevealOnScroll';
import { getAll } from '../services/ApiService'

const Blog = () => {
    const [blogPosts, setBlogPosts] = useState([]);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await getAll('blog');
                setBlogPosts(data)
            } catch (error) {
                console.log("Error al cargar los Blogs: ", error)
            }
        }
        fetchPost()
    }, []);

    return (
        <>
            <SEO 
                title="Blog - Tips y Tendencias | Bookink"
                description="Artículos expertos sobre personalización de agendas y cuidado de materiales."
                keywords="blog agendas, organización personal, tips productividad, cuidado cuero"
            />

            <div className="bg-gradient-to-b mt-10 from-purple-50 to-white py-16">
                <div className="container mx-auto px-4">
                    <RevealOnScroll delay={100}>
                        <div className="text-center mb-16">
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                                Inspiración Consejos
                            </h1>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                Descubre las últimas tendencias en organización y cuidado de agendas
                            </p>
                        </div>
                    </RevealOnScroll>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogPosts.map((post, index) => (
                            <RevealOnScroll key={post.id} delay={index * 100}>
                                <article className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                    <div className="relative h-64">
                                        <img 
                                            src={post.imagen} 
                                            alt={post.titulo} 
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40" />
                                    </div>
                                    <div className="p-6">
                                        <span className="text-sm text-purple-600 hidden font-medium">
                                            {new Date(post.createAt).toLocaleDateString('es-ES', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric'
                                            })}
                                        </span>
                                        <h3 className="text-xl font-bold mt-2 mb-3 line-clamp-2">
                                            {post.titulo}
                                        </h3>
                                        <p className="text-gray-600 line-clamp-3 mb-4">
                                            {post.contenido}
                                        </p>
                                        <button className="text-purple-600 hidden font-semibold hover:underline items-center">
                                            Leer artículo completo
                                            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>
                                </article>
                            </RevealOnScroll>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Blog;