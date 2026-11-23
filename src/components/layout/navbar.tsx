import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { useCart } from '../../context/cartContext';
import { useToast } from '../../context/toastContext';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { cartCount, totalPrice } = useCart();
  const { showToast } = useToast();
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/productos?search=${encodeURIComponent(search.trim())}`);
    } else {
      navigate('/productos');
    }
  };

  const handleLogout = () => {
    logout();
    showToast('Sesión cerrada correctamente', 'info');
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm no-print">
      <div className="container">
        <Link className="navbar-brand fw-bold d-flex align-items-center gap-2" to="/">
          <span style={{ fontSize: '1.4rem' }}></span>
          <span className="tracking-tight">SONIDO VIVO</span>
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navContent">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navContent">
          <form className="d-flex my-2 my-lg-0 me-auto ms-lg-3" onSubmit={handleSearch}>
            <div className="input-group input-group-sm">
              <input
                type="search"
                className="form-control"
                placeholder="Buscar instrumentos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="btn btn-outline-light" type="submit">Buscar</button>
            </div>
          </form>

          <ul className="navbar-nav me-3 mb-2 mb-lg-0 align-items-lg-center small">
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active fw-semibold text-warning' : ''}`} to="/" end>
                Inicio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active fw-semibold text-warning' : ''}`} to="/productos">
                Productos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active fw-semibold text-warning' : ''}`} to="/categorias">
                Categorías
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active fw-semibold text-warning' : ''}`} to="/ofertas">
                Ofertas
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active fw-semibold text-warning' : ''}`} to="/nosotros">
                Nosotros
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active fw-semibold text-warning' : ''}`} to="/blog">
                Blog
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active fw-semibold text-warning' : ''}`} to="/contacto">
                Contacto
              </NavLink>
            </li>

            {(user?.rol === 'administrador' || user?.rol === 'vendedor') && (
              <li className="nav-item ms-lg-2 my-1 my-lg-0">
                <Link className="btn btn-warning text-dark fw-bold btn-sm" to="/admin">
                  Panel {user.rol}
                </Link>
              </li>
            )}
          </ul>

          <div className="d-flex align-items-center gap-2">
            {user ? (
              <div className="dropdown">
                <button className="btn btn-outline-light btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown">
                  Hola, <strong>{user.nombre}</strong>
                </button>
                <ul className="dropdown-menu dropdown-menu-end shadow">
                  <li className="px-3 py-1 small text-muted">Rol: {user.rol.toUpperCase()}</li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link className="dropdown-item" to="/perfil">Mi Perfil</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><button className="dropdown-item text-danger" onClick={handleLogout}>Cerrar Sesión</button></li>
                </ul>
              </div>
            ) : (
              <>
                <Link className="btn btn-outline-light btn-sm" to="/login">Ingresar</Link>
                <Link className="btn btn-otro_color btn-sm" to="/registro">Crear Cuenta</Link>
              </>
            )}

            <Link className="btn btn-otro_color2 btn-sm ms-1 d-flex align-items-center gap-1 fw-semibold" to="/carrito">
               Carrito <span>${totalPrice.toLocaleString('es-CL')}</span>
              <span className="badge bg-white text-dark rounded-pill ms-1">{cartCount}</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};