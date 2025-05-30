import { useState, useEffect } from "react";
import DataGrid from "../../../componentes/admin/DataGrid";
import ProductEditor from "../editors/ProductEditor";
import PreviewModal from "../../../componentes/admin/PreviewModal";

import { getAll, getByCategory, deleteById, update, create } from '../../../services/ApiService'

const ProductManager = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showEditor, setShowEditor] = useState(false);
    const [previewData, setPreviewData] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [currentFilter, setCurrentFilter] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getAll('productos');
                console.log("Productos: ", data);
                setProducts(data);
            } catch (error) {
                console.error("Error cargando productos:", error);
            }
        };
        fetchPosts();
    }, []);

    const handleFilter = async (category) => {
        try {
            setError(null);
            let data;

            if (category) {
                data = await getByCategory('productos', category);
            } else {
                data = await getAll('productos');
            }
            if (data.length === 0) {
                setError(`No se encontraron productos en la categoría: ${category || 'todas'}`);
                setFilteredProducts([]);
            } else {
                setFilteredProducts(data);
            }

            setCurrentFilter(category);
        } catch (error) {
            setError(error.message);
            setFilteredProducts([]);
        }
    };


    const columns = [
        { 
            key: 'titulo', 
            header: 'Título',
            render: (item) => <span className="font-medium">{item.titulo}</span>
        },
        { 
            key: 'descripcion', 
            header: 'Descripción',
            render: (item) => (
                <div className="truncate max-w-[300px]" title={item.descripcion}>
                    {item.descripcion}
                </div>
            )
        },
        { 
            key: 'categoria', 
            header: 'Categoría',
            render: (item) => (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {item.categoria}
                </span>
            )
        },
        { 
            key: 'imagen', 
            header: 'Imagen',
            render: (item) => (
                <div className="flex-shrink-0 h-10 w-10">
                    <img 
                        className="h-10 w-10 rounded-full object-cover" 
                        src={item.imagen} 
                        alt="Miniatura" 
                    />
                </div>
            )
        },
        { 
            key: 'precio', 
            header: 'Precio',
            render: (item) => `$${item.precio.toFixed(2)}`
        },
        { 
            key: 'createdAt', 
            header: 'Fecha',
            render: (item) => new Date(item.createdAt).toLocaleDateString()
        }
    ];

  return (
    <div className="pl-3 w-64 md:w-full mt-24">
        <div className="mb-6">
            {/* Título y botón Agregar */}
            <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl md:text-2xl font-bold">Administrar Productos</h2>
                <button
                    onClick={() => {
                        setSelectedProduct(null);
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
            
            {/* Filtros para escritorio */}
            <div className="hidden md:flex gap-2 flex-wrap">
                <button 
                    onClick={() => handleFilter('TAPA_DURA')}
                    className="px-3 py-1.5 text-xs md:text-sm bg-purple-100 text-purple-800 rounded-lg hover:bg-purple-200 transition-colors"
                >
                    Tapa Dura
                </button>
                <button 
                    onClick={() => handleFilter('TAPA_BLANDA')}
                    className="px-3 py-1.5 text-xs md:text-sm bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors"
                >
                    Tapa Blanda
                </button>
                <button 
                    onClick={() => handleFilter('CIEN_CITAS')}
                    className="px-3 py-1.5 text-xs md:text-sm bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors"
                >
                    100 Citas
                </button>
                <button 
                    onClick={() => handleFilter('SERVICIOS')}
                    className="px-3 py-1.5 text-xs md:text-sm bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200 transition-colors"
                >
                    Servicios
                </button>
                <button 
                    onClick={() => handleFilter(null)}
                    className="px-3 py-1.5 text-xs md:text-sm bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
                >
                    Mostrar Todos
                </button>
            </div>
              
            {/* Selector de filtros para móvil */}
            <div className="md:hidden relative">
                <select 
                    onChange={(e) => handleFilter(e.target.value || null)}
                    className="w-full p-2 border rounded bg-white text-gray-700 appearance-none pl-3 pr-8"
                    value={currentFilter || ""}
                >
                    <option value="">Mostrar Todos</option>
                    <option value="TAPA_DURA">Tapa Dura</option>
                    <option value="TAPA_BLANDA">Tapa Blanda</option>
                    <option value="CIEN_CITAS">100 Citas</option>
                    <option value="SERVICIOS">Servicios</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                </div>
            </div>
              
            {/* Indicador de filtro activo en móvil */}
            {currentFilter && (
                <div className="md:hidden mt-2 text-sm text-gray-600 flex items-center">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2">Filtro activo:</span>
                    <span className="font-medium">
                        {currentFilter === 'TAPA_DURA' && 'Tapa Dura'}
                        {currentFilter === 'TAPA_BLANDA' && 'Tapa Blanda'}
                        {currentFilter === 'CIEN_CITAS' && '100 Citas'}
                        {currentFilter === 'SERVICIOS' && 'Servicios'}
                    </span>
                    <button 
                        onClick={() => handleFilter(null)}
                        className="ml-3 text-red-600 hover:text-red-800 text-sm"
                    >
                        Limpiar
                    </button>
                </div>
            )}
        </div>
            
        {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                ⚠️ {error} o No hay productos en esta categoría actualmente
            </div>
        )}

        {products && (
            <DataGrid
                data={currentFilter ? filteredProducts : products}
                columns={columns}
                onEdit={(product) => {
                    setSelectedProduct(product);
                    setShowEditor(true);
                }}
                onDelete={async (id) => {
                    await deleteById('productos', id);
                    setProducts(prev => prev.filter(p => p.id !== id));
                }}
                onPreview={setPreviewData}
            />
        )}

        {showEditor && (
            <ProductEditor
                initialData={selectedProduct}
                onClose={() => setShowEditor(false)}
                onSubmit={async (formData) => {
                    try {
                        if (selectedProduct) {
                            const response = await update('productos', selectedProduct.id, formData, true);
                            if (!response?.id) throw new Error('Error actualizando producto');

                            setProducts(prev => prev.map(p => p.id === response.id ? response : p));
                        } else {
                            const response = await create('productos', formData, true);
                            if (!response?.titulo) throw new Error('Error creando producto');

                            setProducts(prev => [...prev, response]);
                        }
                        setShowEditor(false);
                    } catch (error) {
                        console.error("Error en operación:", error);
                        alert(error.message);
                    }
                }}
            />
        )}

            {previewData && (
                <PreviewModal
                    data={previewData}
                    onClose={() => setPreviewData(null)}
                    type="product"
                />
            )}
        </div>
    );
};

export default ProductManager;