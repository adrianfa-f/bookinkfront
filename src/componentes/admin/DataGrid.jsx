import { useState } from 'react';
import { FiEye, FiEdit, FiTrash, FiChevronLeft, FiChevronRight, FiX, FiInfo } from 'react-icons/fi';

const DataGrid = ({ data, columns, pageSize = 10, onPreview, onEdit, onDelete }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [detailItem, setDetailItem] = useState(null);
    const totalPages = Math.ceil(data.length / pageSize);
    
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentItems = data.slice(startIndex, endIndex);

    // Identificar columnas principales
    const primaryColumns = columns.filter(col => ['titulo', 'imagen', 'nombre'].includes(col.key));
    
    // Columnas para vista móvil
    const mobileColumns = [
        ...primaryColumns,
        {
            key: 'actions',
            header: 'Acciones',
            render: (item) => (
                <div className="flex-row space-x-2">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onEdit(item);
                        }}
                        className="text-green-600 pl-2 mb-2 hover:text-green-800 transition-colors"
                        title="Editar"
                    >
                        <FiEdit className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(item.id);
                        }}
                        className="text-red-600 hover:text-red-800 transition-colors"
                        title="Eliminar"
                    >
                        <FiTrash className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                </div>
            )
        }
    ];

    // Columnas para vista escritorio
    const desktopColumns = [
        ...columns,
        {
            key: 'actions',
            header: 'Acciones',
            render: (item) => (
                <div className="flex space-x-2">
                    <button 
                        onClick={() => onPreview(item)}
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                        title="Vista previa"
                    >
                        <FiEye className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => onEdit(item)}
                        className="text-green-600 hover:text-green-800 transition-colors"
                        title="Editar"
                    >
                        <FiEdit className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => onDelete(item.id)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                        title="Eliminar"
                    >
                        <FiTrash className="w-5 h-5" />
                    </button>
                </div>
            )
        }
    ];

    // Función para determinar si es testimonio
    const isTestimonial = columns.some(col => col.key === 'nombre' && col.key === 'estrellas');

    return (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Tabla para escritorio */}
            <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {desktopColumns.map((col) => (
                                <th 
                                    key={col.key}
                                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    {col.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {currentItems.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                {desktopColumns.map((col) => (
                                    <td 
                                        key={col.key} 
                                        className="px-4 py-3 whitespace-nowrap text-sm text-gray-900"
                                    >
                                        {col.render ? col.render(item) : item[col.key]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
                
            {/* Lista para móvil */}
            <div className="md:hidden">
                {currentItems.map((item, index) => (
                    <div 
                        key={index} 
                        className="border-b border-gray-200 p-3 hover:bg-gray-50 cursor-pointer"
                        onClick={() => setDetailItem(item)}
                    >
                        <div className="flex justify-between items-start">
                            {/* Información principal */}
                            <div className="flex items-start space-x-3 truncate">
                                {/* Miniatura de imagen si está disponible */}
                                {!isTestimonial && item.imagen && (
                                    <div className="flex-shrink-0">
                                        <img 
                                            src={item.imagen} 
                                            alt="Miniatura" 
                                            className="h-12 w-12 rounded object-cover"
                                        />
                                    </div>
                                )}
                                
                                <div className="min-w-0 flex-1">
                                    <div className="font-medium text-gray-900 truncate">
                                        {/* Mostrar nombre para testimonios, título para otros */}
                                        {isTestimonial ? item.nombre : item.titulo}
                                    </div>
                                    
                                    {/* Campos adicionales */}
                                    <div className="flex flex-wrap gap-1 mt-1">
                                        {isTestimonial ? (
                                            // Para testimonios: mostrar estrellas
                                            <div className="text-xs text-yellow-500 flex items-center">
                                                {'★'.repeat(item.estrellas)}
                                                {'☆'.repeat(5 - item.estrellas)}
                                            </div>
                                        ) : (
                                            // Para otros: mostrar campos adicionales
                                            columns.map((col) => {
                                                if (col.key === 'titulo' || col.key === 'imagen' || col.key === 'actions') 
                                                    return null;
                                                    
                                                return (
                                                    <div key={col.key} className="text-xs text-gray-500 flex items-center">
                                                        <span className="font-medium mr-1">{col.header}:</span>
                                                        <span className="truncate max-w-[100px]">
                                                            {col.render ? col.render(item) : item[col.key]}
                                                        </span>
                                                    </div>
                                                );
                                            })
                                        )}
                                    </div>
                                </div>
                            </div>
                            
                            {/* Acciones e indicador de detalles */}
                            <div className="flex flex-col items-end space-y-2">
                                <div>
                                    {mobileColumns.find(col => col.key === 'actions')?.render(item)}
                                </div>
                                <button 
                                    className="text-gray-400 hover:text-gray-600"
                                    title="Ver detalles"
                                >
                                    <FiInfo className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
                
            {/* Modal de detalles para móvil */}
            {detailItem && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center md:hidden">
                    <div className="bg-white rounded-lg w-full max-w-md mx-4 max-h-[80vh] overflow-y-auto">
                        <div className="p-4 border-b flex justify-between items-center">
                            <h3 className="font-bold text-lg">Detalles completos</h3>
                            <button 
                                onClick={() => setDetailItem(null)}
                                className="p-1 rounded-full hover:bg-gray-100"
                            >
                                <FiX className="w-5 h-5" />
                            </button>
                        </div>
                        
                        <div className="p-4 space-y-4">
                            {desktopColumns.map(col => {
                                if (col.key === 'actions') return null;
                                
                                return (
                                    <div key={col.key} className="border-b pb-3 last:border-0">
                                        <div className="text-sm font-medium text-gray-500 mb-1">
                                            {col.header}
                                        </div>
                                        <div className="mt-1 text-gray-900">
                                            {col.render ? col.render(detailItem) : detailItem[col.key]}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        
                        <div className="p-4 bg-gray-50 flex justify-end space-x-2">
                            <button
                                onClick={() => {
                                    onEdit(detailItem);
                                    setDetailItem(null);
                                }}
                                className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => {
                                    onDelete(detailItem.id);
                                    setDetailItem(null);
                                }}
                                className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}
                
            {/* Paginación */}
            <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t border-gray-200">
                <div className="flex-1 flex justify-between sm:hidden">
                    <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                    >
                        <FiChevronLeft className="w-5 h-5" />
                    </button>
                    
                    <div className="flex items-center">
                        <span className="text-sm text-gray-700 mx-2">
                            {currentPage} / {totalPages}
                        </span>
                    </div>
                    
                    <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="relative inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                    >
                        <FiChevronRight className="w-5 h-5" />
                    </button>
                </div>
                        
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-700">
                            Mostrando <span className="font-medium">{startIndex + 1}</span> a 
                            <span className="font-medium"> {Math.min(endIndex, data.length)}</span> de 
                            <span className="font-medium"> {data.length}</span> registros
                        </p>
                    </div>
                    <div>
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <FiChevronLeft className="w-5 h-5" />
                            </button>

                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                let pageNum;
                                if (totalPages <= 5) {
                                    pageNum = i + 1;
                                } else if (currentPage <= 3) {
                                    pageNum = i + 1;
                                } else if (currentPage >= totalPages - 2) {
                                    pageNum = totalPages - 4 + i;
                                } else {
                                    pageNum = currentPage - 2 + i;
                                }

                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => setCurrentPage(pageNum)}
                                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium 
                                            ${currentPage === pageNum 
                                                ? 'bg-blue-50 border-blue-500 text-blue-600' 
                                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'}`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}
                        
                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <FiChevronRight className="w-5 h-5" />
                            </button>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DataGrid;