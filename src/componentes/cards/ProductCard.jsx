const ProductCard = ({ product }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
            <div className="relative h-64">
                <img 
                    src={product.imagen} 
                    alt={product.altText} 
                    className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 p-4">
                    <h3 className="text-xl font-bold text-white">{product.titulo}</h3>
                </div>
            </div>
            
            <div className="p-6">
                <p className="text-gray-600 line-clamp-2 mb-4">{product.descripcion}</p>
                <div className="flex justify-between items-center">
                    <span className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                        ${product.precio.toFixed(2)}
                    </span>
                    <button className="bg-purple-100 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-200 transition-colors">
                        Personalizar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;