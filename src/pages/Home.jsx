import HeroSection from '../componentes/HeroSection';
import BlogPreview from '../componentes/BlogPreview';
import TestimonialsSection from '../componentes/TestimonialsSection';
import ContactSection from '../componentes/ContactSection';
import SEO from '../componentes/SEO'

const Home = () => {
    
    return (
        
        <div className='mt-10'>
            <SEO 
                title="Bookink | Agendas Persoalizadas"
                description="Cear agendas personalizadas con tus gustos."
                keywords="agenda personalizada, organizador, agenda profesional, impresion, papelería"
            />
            <HeroSection />
            <BlogPreview />
            <TestimonialsSection />
            <ContactSection />
        </div>
    );
};

export default Home;