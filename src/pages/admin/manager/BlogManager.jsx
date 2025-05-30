import { useState, useEffect } from 'react';
import DataGrid from '../../../componentes/admin/DataGrid';
import BlogEditor from '../editors/BlogEditor';
import PreviewModal from '../../../componentes/admin/PreviewModal';
import { getAll,create, update, deleteById } from '../../../services/ApiService'

const BlogManager = () => {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [showEditor, setShowEditor] = useState(false);
    const [previewData, setPreviewData] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            const data = await getAll('blog');
            setPosts(data);
        };
        fetchPosts();
    }, []);

    const columns = [
        { 
            key: 'imagen', 
            header: 'Imagen',
            render: (item) => (
                <div className="flex items-center">
                    <img 
                        src={item.imagen || '/placeholder.jpg'} 
                        alt="Miniatura" 
                        className="h-10 w-10 object-cover rounded"
                    />
                    <a 
                        href={item.imagen} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="ml-2 text-blue-600 hover:underline text-sm"
                    >
                        Ver full
                    </a>
                </div>
            )
        },
        { 
            key: 'title', 
            header: 'Título',
            render: (item) => <span className="font-medium">{item.titulo || 'Sin título'}</span>
        },
        { 
            key: 'content', 
            header: 'Contenido',
            render: (item) => (
                <div className="max-w-[300px] truncate" title={item.content}>
                    {item.contenido?.substring(0, 50) || 'Sin contenido'}...
                </div>
            )
        },
        { 
            key: 'links', 
            header: 'Enlaces',
            render: (item) => (
                <span className="bg-gray-100 px-2 py-1 rounded-full text-sm">
                    {item.enlaces?.length || 0} enlaces
                </span>
            )
        },
        { 
            key: 'createdAt', 
            header: 'Publicación',
            render: (item) => (
                <div className="text-sm text-gray-500">
                    {new Date(item.createdAt).toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                    })}
                </div>
            )
        }
    ];

    return (
        <div className="pl-3 w-64 md:w-full mt-24">
            <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl md:text-2xl font-bold">Gestión del Blog</h2>
                <button
                    onClick={() => {
                        setSelectedPost(null);
                        setShowEditor(true);
                    }}
                    className="bg-blue-600 text-white px-3 py-1.5 md:px-4 md:py-2 rounded hover:bg-blue-700 text-sm md:text-base flex items-center"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Agregar
                </button>
            </div>
            
            {posts && (
                <DataGrid
                    data={posts}
                    columns={columns}
                    onEdit={(post) => {
                        setSelectedPost(post);
                        setShowEditor(true);
                    }}
                    onDelete={async (id) => {
                        await deleteById('blog', id);
                        setPosts(prev => prev.filter(p => p.id !== id));
                    }}
                    onPreview={setPreviewData}
                />
            )}

            {showEditor && (
                <BlogEditor
                    initialData={selectedPost}
                    onClose={() => setShowEditor(false)}
                    onSubmit={async (formData) => {
                        if (selectedPost) {
                            const data = await update('blog', selectedPost.id, formData);
                            setPosts(prev => prev.map(p => p.id === data.id ? data : p));
                        } else {
                            const data = await create('blog', formData);
                            setPosts(prev => [...prev, data]);
                        }
                        setShowEditor(false);
                    }}
                />
            )}
            {previewData && (
                <PreviewModal
                    data={previewData}
                    onClose={() => setPreviewData(null)}
                    type="blog"
                />
            )}
        </div>
    );
};

export default BlogManager;