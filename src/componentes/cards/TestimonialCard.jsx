const TestimonialCard = ({ testimonial }) => {
    return (
        <div className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold">{testimonial.nombre}</h4>
                <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                        <span
                            key={i}
                            className={`text-xl ${i < testimonial.estrellas ? 'text-yellow-400' : 'text-gray-300'}`}
                        >
                            ★
                        </span>
                    ))}
                </div>
            </div>
            <p className="text-gray-600 italic">"{testimonial.opinion}"</p>
        </div>
    );
};

export default TestimonialCard;