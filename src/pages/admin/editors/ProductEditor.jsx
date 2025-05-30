import { useState, useEffect } from 'react';
import { productModel } from '../../../models/index'
import Compressor from 'compressorjs';

const ProductEditor = ({ initialData, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        ...productModel,
        ...(initialData || {}),
        precio: initialData?.precio || 0
    });
    const [preview, setPreview] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (formData.imagen) {
            setPreview(formData.imagen);
        }
    }, [formData.imagen]);

    useEffect(() => {
        return () => {
            if (preview) URL.revokeObjectURL(preview);
        };
    }, [preview]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Comprimir imagen antes de mostrar vista previa
        new Compressor(file, {
            quality: 0.7,
            maxWidth: 1200,
            maxHeight: 1200,
            success(compressedFile) {
                // Generar vista previa temporal
                const previewUrl = URL.createObjectURL(compressedFile);
                setPreview(previewUrl);
                
                // Guardar el archivo comprimido para subir
                setSelectedImage(compressedFile);
            },
            error(err) {
                console.error('Error comprimiendo imagen:', err);
                alert('Error procesando la imagen');
            }
        });
    };

    const uploadImageToCloudinary = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);

        try {
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
                {
                    method: 'POST',
                    body: formData,
                }
            );

            if (!response.ok) throw new Error('Error subiendo imagen');
            return await response.json();
        } catch (error) {
            console.error('Error en carga de imagen:', error);
            throw error;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);
        
        try {
            let cloudinaryResult = null;
            
            // Subir imagen solo si hay una nueva
            if (selectedImage) {
                cloudinaryResult = await uploadImageToCloudinary(selectedImage);
            }

            // Construir objeto de datos para el producto
            const productData = {
                titulo: formData.titulo,
                descripcion: formData.descripcion,
                precio: parseFloat(formData.precio),
                categoria: formData.categoria,
                imagen: cloudinaryResult?.secure_url || formData.imagen,
                cloudinary_id: cloudinaryResult?.public_id || formData.cloudinary_id
            };

            // Pasar datos limpios al componente padre
            onSubmit(productData);
            
        } catch (error) {
            alert(`Error en operación: ${error.message}`);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4">
            <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl">
                <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
                    <h3 className="text-xl font-bold">
                        {initialData ? 'Editar Producto' : 'Nuevo Producto'}
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-full hover:bg-gray-100"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-1">Título *</label>
                            <input
                                type="text"
                                value={formData.titulo}
                                onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Precio *</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                                    $
                                </span>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={formData.precio}
                                    onChange={(e) => {
                                        const value = parseFloat(e.target.value);
                                        setFormData({ 
                                            ...formData, 
                                            precio: isNaN(value) ? 0 : value 
                                        });
                                    }}
                                    className="w-full pl-8 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Categoría *</label>
                            <select
                                value={formData.categoria}
                                onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="TAPA_DURA">Tapa Dura</option>
                                <option value="TAPA_BLANDA">Tapa Blanda</option>
                                <option value="CIEN_CITAS">100 Citas</option>
                                <option value="SERVICIOS">Servicios</option>
                            </select>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-1">Descripción *</label>
                            <textarea
                                value={formData.descripcion}
                                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                                className="w-full p-2 border rounded h-32 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-1">
                                Imagen {!initialData && '*'}
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="w-full p-2 border rounded file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                            
                            {/* Vista previa de la imagen */}
                            {preview && (
                                <div className="mt-4">
                                    <p className="text-sm text-gray-600 mb-2">Vista previa:</p>
                                    <div className="flex justify-center">
                                        <img 
                                            src={preview} 
                                            alt="Vista previa" 
                                            className="max-h-40 max-w-full object-contain rounded-lg border"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end space-x-2 mt-6 pt-4 border-t">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded hover:bg-gray-100 border border-gray-300"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={uploading}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-70 flex items-center"
                        >
                            {uploading && (
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            )}
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductEditor;