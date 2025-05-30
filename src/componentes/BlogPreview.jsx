import { Link } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { getAll } from '../services/ApiService';

const BlogPreview = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        
        const fetchPost = async () => {
            try {
                const data = await getAll('blog');
                setPosts(data)
            } catch (error) {
                console.log("Error al obtener los Blogs: ", error)
            }
        }
        
        fetchPost()
    }, []);

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Inspírate en Nuestro Blog</h2>
                    <p className="text-gray-600 max-w-xl mx-auto">
                        Descubre tips de organización y las últimas tendencias en diseño
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {posts.map((post, index) => (
                        <article 
                            key={index}
                            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden"
                        >
                            {post.imagen && (
                                <img 
                                    src={post.imagen} 
                                    alt={post.titulo}
                                    className="w-full h-48 object-cover"
                                />
                            )}
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-3 text-gray-900">{post.titulo}</h3>
                                <p className="text-gray-600 mb-4">
                                    {post.contenido?.length > 150 
                                        ? `${post.contenido.substring(0, 150)}...` 
                                        : post.contenido}
                                </p>
                                <Link 
                                    to={post.enlaces} 
                                    className="text-purple-600 font-medium hover:underline inline-flex items-center"
                                >
                                    Leer artículo
                                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="mt-12 bg-purple-50 rounded-xl p-8 text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">¿Listo para personalizar tu agenda?</h3>
                    <p className="text-gray-600 mb-6">
                        Contáctanos directamente por WhatsApp para asesoría personalizada
                    </p>
                    <a 
                        href="https://wa.me/+5355879391" 
                        className="inline-flex items-center bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition-colors"
                    >
                        <FaWhatsapp className="mr-2" />
                        Iniciar por WhatsApp
                    </a>
                </div>
            </div>
        </section>
    );
};

export default BlogPreview;