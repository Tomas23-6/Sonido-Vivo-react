import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/authContext';
import { CartProvider } from './context/cartContext';
import { initLocalStorage } from './services/storege';

// Componentes de Navegación y Estructura
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Vistas de la Tienda
import { Home } from './components/Home';
import { Products } from './components/Products';
import { ProductDetail } from './components/ProductDetail';
import { Categories } from './components/Categories';
import { Offers } from './components/Offers';
import { Cart } from './components/Cart';
import { Checkout } from './components/Checkout';
import { PaymentSuccess } from './components/PaymentSuccess';
import { PaymentError } from './components/PaymentError';

// Vistas de Usuarios y Contenido
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Profile } from './components/Profile';
import { AboutUs } from './components/AboutUs';
import { Contact } from './components/Contact';
import { Blog } from './components/Blog';

// Vistas Administrativas
import { AdminDashboard } from './components/AdminDashBoard';
import { AdminProducts } from './components/AdminProducts';
import { AdminCategories } from './components/AdminCategories';
import { AdminUsers } from './components/AdminUser';

import { Order } from './type';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<string>('home');
  const [adminSubView, setAdminSubView] = useState<string>('menu');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [lastOrder, setLastOrder] = useState<Order | null>(null);

  useEffect(() => {
    initLocalStorage();
  }, []);

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return <Home setCurrentView={setCurrentView} setSelectedProductId={setSelectedProductId} />;
      case 'productos':
        return <Products searchTerm={searchTerm} setCurrentView={setCurrentView} setSelectedProductId={setSelectedProductId} />;
      case 'detalle':
        return <ProductDetail productId={selectedProductId} setCurrentView={setCurrentView} />;
      case 'categorias':
        return <Categories setCurrentView={setCurrentView} setSelectedProductId={setSelectedProductId} />;
      case 'ofertas':
        return <Offers setCurrentView={setCurrentView} setSelectedProductId={setSelectedProductId} />;
      case 'carrito':
        return <Cart setCurrentView={setCurrentView} />;
      case 'checkout':
        return <Checkout setCurrentView={setCurrentView} setLastOrder={setLastOrder} />;
      case 'pago-exito':
        return <PaymentSuccess lastOrder={lastOrder} setCurrentView={setCurrentView} />;
      case 'pago-error':
        return <PaymentError lastOrder={lastOrder} setCurrentView={setCurrentView} />;
      case 'login':
        return <Login setCurrentView={setCurrentView} />;
      case 'registro':
        return <Register setCurrentView={setCurrentView} />;
      case 'perfil':
        return <Profile />;
      case 'nosotros':
        return <AboutUs />;
      case 'contacto':
        return <Contact />;
      case 'blog':
        return <Blog />;
      case 'admin-dashboard':
        return (
          <div>
            <div className="container mt-3">
              <button className={`btn me-2 ${adminSubView === 'menu' ? 'btn-primary' : 'btn-outline-secondary'}`} onClick={() => setAdminSubView('menu')}>
                Dashboard
              </button>
              <button className={`btn me-2 ${adminSubView === 'productos' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setAdminSubView('productos')}>
                Productos
              </button>
              <button className={`btn me-2 ${adminSubView === 'categorias' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setAdminSubView('categorias')}>
                Categorías
              </button>
              <button className={`btn ${adminSubView === 'usuarios' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setAdminSubView('usuarios')}>
                Usuarios
              </button>
            </div>
            {adminSubView === 'menu' && <AdminDashboard setAdminSubView={setAdminSubView} />}
            {adminSubView === 'productos' && <AdminProducts />}
            {adminSubView === 'categorias' && <AdminCategories />}
            {adminSubView === 'usuarios' && <AdminUsers />}
          </div>
        );
      default:
        return <Home setCurrentView={setCurrentView} setSelectedProductId={setSelectedProductId} />;
    }
  };

  return (
    <AuthProvider>
      <CartProvider>
        <div className="d-flex flex-column min-vh-100 bg-light">
          <Navbar currentView={currentView} setCurrentView={setCurrentView} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <main className="flex-grow-1">{renderContent()}</main>
          <Footer setCurrentView={setCurrentView} />
        </div>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;