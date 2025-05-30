import { useEffect } from 'react';

const SEO = ({ title, description, keywords }) => {
    useEffect(() => {
        document.title = title;
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.content = description;
        }
        const metaKeywords = document.querySelector('meta[name="keywords"]');
        if (metaKeywords) {
            metaKeywords.content = keywords;
        }
    }, [title, description, keywords]);

    return null;
};

export default SEO;