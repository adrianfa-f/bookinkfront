import { useState } from 'react';
import { blogModel } from '../../../models/index';

const BlogEditor = ({ initialData, onClose, onSubmit }) => {
    const [formData, setFormData] = useState(initialData || { ...blogModel });
    const [newLink, setNewLink] = useState('');

    const handleAddLink = () => {
        if (newLink.trim()) {
            setFormData({
                ...formData,
                enlaces: [...formData.enlaces, newLink.trim()]
            });
            setNewLink('');
        }
    };

    const handleRemoveLink = (index) => {
        const updatedLinks = formData.enlaces.filter((_, i) => i !== index);
        setFormData({ ...formData, enlaces: updatedLinks });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="p-6 border-b border-gray-200">
                    <h3 className="text-2xl font-bold text-gray-800">
                        {initialData ? 'Editar Artículo' : 'Nuevo Artículo'}
                    </h3>
                </div>

                {/* Contenido desplazable */}
                <div className="flex-1 overflow-y-auto p-6">
                    <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }} className="space-y-6">
                        <div className="space-y-6">
                            {/* Campo Título */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Título</label>
                                <input
                                    type="text"
                                    value={formData.titulo}
                                    onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    required
                                />
                            </div>

                            {/* Campo Imagen */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Imagen URL</label>
                                <div className="flex items-center gap-4">
                                    <input
                                        type="url"
                                        value={formData.imagen}
                                        onChange={(e) => setFormData({ ...formData, imagen: e.target.value })}
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                        required
                                    />
                                    {formData.imagen && (
                                        <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border">
                                            <img
                                                src={formData.imagen}
                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                                onError={(e) => e.target.style.display = 'none'}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Campo Contenido */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Contenido</label>
                                <textarea
                                    value={formData.contenido}
                                    onChange={(e) => setFormData({ ...formData, contenido: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all min-h-[150px]"
                                    required
                                />
                            </div>

                            {/* Enlaces Relacionados */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Enlaces Relacionados</label>
                                <div className="flex gap-2 mb-3">
                                    <input
                                        type="url"
                                        value={newLink}
                                        onChange={(e) => setNewLink(e.target.value)}
                                        className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                        placeholder="https://ejemplo.com"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleAddLink}
                                        className="px-4 py-2.5 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                                    >
                                        Añadir
                                    </button>
                                </div>
                                
                                {/* Lista de enlaces */}
                                <div className="space-y-2">
                                    {formData.enlaces.map((link, index) => (
                                        <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg group hover:bg-gray-100 transition-colors">
                                            <span className="text-sm text-gray-600 truncate pr-2">{link}</span>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveLink(index)}
                                                className="text-red-400 hover:text-red-600 transition-colors px-2"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Botones de acción */}
                        <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-6 py-2.5 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2.5 bg-gradient-to-br from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all shadow-sm"
                            >
                                Guardar Artículo
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BlogEditor;