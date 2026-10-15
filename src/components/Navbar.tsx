import React from 'react';
import { useAuth } from '../context/authContext';
import { useCart } from '../context/cartContext';

interface NavbarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, setCurrentView, searchTerm, setSearchTerm }) => {
  const { user, logout } = useAuth();
  const { cartCount, totalPrice } = useCart();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow">
      <div className="container">
        <button className="navbar-brand btn btn-link text-white text-decoration-none fw-bold d-flex align-items-center gap-2" onClick={() => setCurrentView('home')}>
          <span style={{ fontSize: '1.5rem' }}>🎸</span> SONIDO VIVO
        </button>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navContent">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navContent">
          <form className="d-flex my-2 my-lg-0 me-auto ms-lg-3" onSubmit={(e) => { e.preventDefault(); setCurrentView('productos'); }}>
            <input
              type="search"
              className="form-control me-2"
              placeholder="Buscar instrumentos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-outline-light" type="submit">Buscar</button>
          </form>

          <ul className="navbar-nav me-3 mb-2 mb-lg-0 align-items-lg-center">
            <li className="nav-item">
              <button className={`nav-link btn btn-link ${currentView === 'home' ? 'active' : ''}`} onClick={() => setCurrentView('home')}>Home</button>
            </li>
            <li className="nav-item">
              <button className={`nav-link btn btn-link ${currentView === 'productos' ? 'active' : ''}`} onClick={() => setCurrentView('productos')}>Productos</button>
            </li>
            <li className="nav-item">
              <button className={`nav-link btn btn-link ${currentView === 'categorias' ? 'active' : ''}`} onClick={() => setCurrentView('categorias')}>Categorías</button>
            </li>
            <li className="nav-item">
              <button className={`nav-link btn btn-link ${currentView === 'ofertas' ? 'active' : ''}`} onClick={() => setCurrentView('ofertas')}>Ofertas</button>
            </li>
            <li className="nav-item">
              <button className={`nav-link btn btn-link ${currentView === 'nosotros' ? 'active' : ''}`} onClick={() => setCurrentView('nosotros')}>Nosotros</button>
            </li>
            <li className="nav-item">
              <button className={`nav-link btn btn-link ${currentView === 'blog' ? 'active' : ''}`} onClick={() => setCurrentView('blog')}>Blog</button>
            </li>
            <li className="nav-item">
              <button className={`nav-link btn btn-link ${currentView === 'contacto' ? 'active' : ''}`} onClick={() => setCurrentView('contacto')}>Contacto</button>
            </li>

            {(user?.rol === 'administrador' || user?.rol === 'vendedor') && (
              <li className="nav-item ms-lg-2">
                <button className="btn btn-warning text-dark fw-bold btn-sm" onClick={() => setCurrentView('admin-dashboard')}>
                  ⚡ Panel {user.rol}
                </button>
              </li>
            )}
          </ul>

          <div className="d-flex align-items-center gap-2">
            {user ? (
              <div className="dropdown">
                <button className="btn btn-outline-warning dropdown-toggle" type="button" data-bs-toggle="dropdown">
                  Hola, <strong>{user.nombre}</strong> ({user.rol})
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li><button className="dropdown-item" onClick={() => setCurrentView('perfil')}>Mi Perfil</button></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><button className="dropdown-item text-danger" onClick={logout}>Cerrar Sesión</button></li>
                </ul>
              </div>
            ) : (
              <>
                <button className="btn btn-outline-light btn-sm" onClick={() => setCurrentView('login')}>Iniciar Sesión</button>
                <button className="btn btn-primary btn-sm" onClick={() => setCurrentView('registro')}>Crear Cuenta</button>
              </>
            )}

            <button className="btn btn-success ms-2 d-flex align-items-center gap-1" onClick={() => setCurrentView('carrito')}>
              🛒 <span>${totalPrice.toLocaleString('es-CL')}</span>
              <span className="badge bg-white text-dark rounded-circle ms-1">{cartCount}</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};