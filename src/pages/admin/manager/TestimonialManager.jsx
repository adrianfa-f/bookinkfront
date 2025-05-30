import { useState, useEffect } from 'react';
import DataGrid from '../../../componentes/admin/DataGrid';
import TestimonialEditor from '../editors/TestimonialEditor';
import PreviewModal from '../../../componentes/admin/PreviewModal';
import { getAll, create, update, deleteById } from '../../../services/ApiService'

const TestimonialManager = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [selectedTestimonial, setSelectedTestimonial] = useState(null);
    const [showEditor, setShowEditor] = useState(false);
    const [previewData, setPreviewData] = useState(null);

    useEffect(() => {
        const fetchTestimonials = async () => {
            const data = await getAll('testimonios');
            setTestimonials(data);
        };
        fetchTestimonials();
    }, []);

    const columns = [
        { 
            key: 'nombre', 
            header: 'Autor',
            render: (item) => (
                <div className="flex items-center">
                    <div className="bg-purple-100 w-8 h-8 rounded-full flex items-center justify-center mr-2">
                        <span className="text-purple-600 font-medium">
                            {item.nombre?.charAt(0) || '?'}
                        </span>
                    </div>
                    {item.nombre || 'Anónimo'}
                </div>
            )
        },
        { 
            key: 'opinion', 
            header: 'Opinión',
            render: (item) => (
                <div className="max-w-[250px] truncate italic text-gray-600" title={item.opinion}>
                    "{item.opinion?.substring(0, 30) || 'Sin opinión'}..."
                </div>
            )
        },
        { 
            key: 'estrellas', 
            header: 'Calificación',
            render: (item) => (
                <div className="flex items-center text-yellow-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                            key={i}
                            className={`w-4 h-4 ${i < (item.estrellas || 0) ? 'fill-current' : 'fill-none stroke-current'}`}
                            viewBox="0 0 20 20"
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    ))}
                    <span className="ml-2 text-gray-600 text-sm">
                        ({item.estrellas || 0}/5)
                    </span>
                </div>
            )
        },
        { 
            key: 'createdAt', 
            header: 'Fecha',
            render: (item) => (
                <div className="text-sm text-gray-500">
                    {new Date(item.createdAt).toLocaleDateString('es-ES', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                    })}
                </div>
            )
        }
    ];

    return (
        <div className="pl-3 w-64 md:w-full mt-24">
            <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl md:text-2xl font-bold">Gestión de Testimonios</h2>
                <button
                    onClick={() => {
                        setSelectedTestimonial(null);
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
            {testimonials && (
                <DataGrid
                    data={testimonials}
                    columns={columns}
                    onEdit={(testimonial) => {
                        setSelectedTestimonial(testimonial);
                        setShowEditor(true);
                    }}
                    onDelete={async (id) => {
                        await deleteById('testimonios', id);
                        setTestimonials(prev => prev.filter(t => t.id !== id));
                    }}
                    onPreview={setPreviewData}
                />
            )}

            {showEditor && (
                <TestimonialEditor
                    initialData={selectedTestimonial}
                    onClose={() => setShowEditor(false)}
                    onSubmit={async (formData) => {
                        if (selectedTestimonial) {
                            const { data } = await update('testimonios', selectedTestimonial.id, formData);
                            setTestimonials(prev => prev.map(p => p.id === data.id ? data : p));
                        } else {
                            const { data } = await create('testimonios', formData);
                            setTestimonials(prev => [...prev, data]);
                        }
                    setShowEditor(false);
                    }}
                />
            )}

            {previewData && (
                <PreviewModal
                    data={previewData}
                    onClose={() => setPreviewData(null)}
                    type="testimonial"
                />
            )}
        </div>
    );
};

export default TestimonialManager;