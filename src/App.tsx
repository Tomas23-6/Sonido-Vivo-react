import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import { AuthProvider } from './context/authContext';
import { CartProvider } from './context/cartContext';
import { ToastProvider } from './context/toastContext';
import { initLocalStorage } from './services/storage';

import { Navbar } from './components/layout/navbar';
import { Footer } from './components/layout/Footer';
import { ProtectedRoute } from './components/layout/protectedRoute';

import { Home } from './components/pages/Home';
import { Products } from './components/pages/Products';
import { ProductDetail } from './components/pages/ProductDetail';
import { Categories } from './components/pages/Categories';
import { Offers } from './components/pages/Offers';
import { Cart } from './components/pages/Cart';
import { Checkout } from './components/pages/Checkout';
import { PaymentSuccess } from './components/pages/PaymentSuccess';
import { PaymentError } from './components/pages/PaymentError';
import { Login } from './components/pages/Login';
import { Register } from './components/pages/Register';
import { Profile } from './components/pages/Profile';
import { AboutUs } from './components/pages/AboutUs';
import { Contact } from './components/pages/Contact';
import { Blog } from './components/pages/Blog';

import { AdminLayout } from './components/pages/admin/adminLayout';
import { AdminDashboard } from './components/pages/admin/AdminDashBoard';
import { AdminProducts } from './components/pages/admin/adminProducts';
import { AdminCategories } from './components/pages/admin/AdminCategories';
import { AdminUsers } from './components/pages/admin/AdminUser';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const App: React.FC = () => {
  useEffect(() => {
    initLocalStorage();
  }, []);

  return (
    <ToastProvider>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <ScrollToTop />
            <div className="d-flex flex-column min-vh-100">
              <Navbar />
              <main className="flex-grow-1">
                <Routes>
                  {/* Rutas Públicas */}
                  <Route path="/" element={<Home />} />
                  <Route path="/productos" element={<Products />} />
                  <Route path="/productos/:id" element={<ProductDetail />} />
                  <Route path="/categorias" element={<Categories />} />
                  <Route path="/ofertas" element={<Offers />} />
                  <Route path="/carrito" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/pago-exito" element={<PaymentSuccess />} />
                  <Route path="/pago-error" element={<PaymentError />} />
                  <Route path="/nosotros" element={<AboutUs />} />
                  <Route path="/contacto" element={<Contact />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/registro" element={<Register />} />

                  {/* Rutas Protegidas (Usuario Autenticado) */}
                  <Route element={<ProtectedRoute />}>
                    <Route path="/perfil" element={<Profile />} />
                  </Route>

                  {/* Rutas Protegidas (Administrador y Vendedor) */}
                  <Route element={<ProtectedRoute allowedRoles={['administrador', 'vendedor']} />}>
                    <Route path="/admin" element={<AdminLayout />}>
                      <Route index element={<AdminDashboard />} />
                      <Route path="productos" element={<AdminProducts />} />
                      <Route element={<ProtectedRoute allowedRoles={['administrador']} />}>
                        <Route path="categorias" element={<AdminCategories />} />
                        <Route path="usuarios" element={<AdminUsers />} />
                      </Route>
                    </Route>
                  </Route>

                  {/* Fallback */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </ToastProvider>
  );
};

export default App;