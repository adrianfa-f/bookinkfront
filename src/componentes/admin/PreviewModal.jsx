import ProductCard from '../cards/ProductCard';
import BlogPost from '../cards/BlogPost';
import TestimonialCard from '../cards/TestimonialCard';

const PreviewModal = ({ data, type, onClose }) => {
    const renderContent = () => {
        switch(type) {
            case 'product':
                return <ProductCard product={data} />;
            case 'blog':
                return <BlogPost post={data} />;
            case 'testimonial':
                return <TestimonialCard testimonial={data} />;
            default:
                return null;
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg max-w-2xl w-full">
                <h3 className="text-xl font-bold mb-4">Vista Previa</h3>
                {renderContent()}
                <button
                    onClick={onClose}
                    className="mt-4 bg-gray-200 px-4 py-2 rounded w-full"
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
};

export default PreviewModal;