const BlogPost = ({ post }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="relative h-64">
                <img 
                    src={post.imagen} 
                    alt={post.titulo} 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40" />
            </div>
            
            <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-purple-600">
                        {new Date(post.createdAt).toLocaleDateString('es-ES')}
                    </span>
                    <div className="flex space-x-2">
                        {post.enlaces.map((link, i) => (
                            <a 
                                key={i} 
                                href={link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-gray-200"
                            >
                                Enlace {i + 1}
                            </a>
                        ))}
                    </div>
                </div>
                
                <h3 className="text-xl font-bold mb-3">{post.titulo}</h3>
                <p className="text-gray-600 line-clamp-3">{post.contenido}</p>
            </div>
        </div>
    );
};

export default BlogPost;