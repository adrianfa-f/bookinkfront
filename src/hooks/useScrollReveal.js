import { useState, useEffect } from 'react';

export const useScrollReveal = (options = {}) => {
    const [isRevealed, setIsRevealed] = useState(false);
    const [elementRef, setElementRef] = useState(null);

    useEffect(() => {
        if (!elementRef) return;

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsRevealed(true);
                observer.unobserve(elementRef);
            }
        }, options);

        observer.observe(elementRef);

        return () => observer.disconnect();
    }, [elementRef, options]);

    return [setElementRef, isRevealed];
};