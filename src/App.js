// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AdminAuthProvider } from './context/AdminAuthContext'; // Nuevo contexto de autenticación
import Home from './pages/Home';
import TapaDura from './pages/TapaDura';
import TapaBlanda from './pages/TapaBlanda';
import CienCitas from './pages/CienCitas';
import Servicios from './pages/Servicios';
import Login from './pages/admin/Login';
import Header from './componentes/Header';
import Footer from './componentes/Footer';
import Blog from './pages/Blog';
import AdminLayout from './pages/admin/Dashboard';
import ProductManager from './pages/admin/manager/ProductManager';
import TestimonialManager from './pages/admin/manager/TestimonialManager';
import BlogManager from './pages/admin/manager/BlogManager';
import ScrollToTop from './componentes/ScrollToTop';

function App() {
  return (
    <Router> 
      <AdminAuthProvider>{/* Envuelve todo el proyecto */}
        <ScrollToTop/>
          <Header />
          <Routes>
            {/* Públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/tapa-dura" element={<TapaDura />} />
            <Route path="/tapa-blanda" element={<TapaBlanda />} />
            <Route path="/100-citas" element={<CienCitas />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/admin/login" element={<Login />} />

            {/* Rutas protegidas */}
            <Route path="/admin/dashboard" element={<AdminLayout />}>
              <Route path="products" element={<ProductManager />} />
              <Route path="testimonials" element={<TestimonialManager />} />
              <Route path="blog" element={<BlogManager />} />
            </Route>
          </Routes>
          <Footer />
      </AdminAuthProvider>
    </Router>
  );
}

export default App;
