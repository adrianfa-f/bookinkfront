// src/components/RevealOnScroll.jsx
import { useScrollReveal } from '../hooks/useScrollReveal';

const RevealOnScroll = ({ children, delay = 0 }) => {
    const [setRef, isRevealed] = useScrollReveal({
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    return (
        <div
            ref={setRef}
            className={`transition-all duration-500 ease-out ${
                isRevealed 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: isRevealed ? `${delay}ms` : '0ms' }}
        >
            {children}
        </div>
    );
};

export default RevealOnScroll;