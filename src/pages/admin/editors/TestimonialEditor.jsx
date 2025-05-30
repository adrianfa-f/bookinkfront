import { useState } from 'react';
import { testimonialModel } from '../../../models/index';

const TestimonialEditor = ({ initialData, onClose, onSubmit }) => {
    const [formData, setFormData] = useState(initialData || testimonialModel);
    
    const handleStarChange = (stars) => {
        setFormData({ ...formData, estrellas: stars });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
                <h3 className="text-xl font-bold mb-4">
                    {initialData ? 'Editar Testimonio' : 'Nuevo Testimonio'}
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Nombre</label>
                            <input
                                type="text"
                                value={formData.nombre}
                                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Calificación</label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => handleStarChange(star)}
                                        className={`text-3xl ${
                                            star <= formData.estrellas 
                                            ? 'text-yellow-400' 
                                            : 'text-gray-300'
                                        }`}
                                    >
                                        ★
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Opinión</label>
                            <textarea
                                value={formData.opinion}
                                onChange={(e) => setFormData({ ...formData, opinion: e.target.value })}
                                className="w-full p-2 border rounded h-32"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex justify-end space-x-2 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TestimonialEditor;