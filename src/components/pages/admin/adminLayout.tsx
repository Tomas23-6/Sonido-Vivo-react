import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../../../context/authContext';

export const AdminLayout: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="container my-4">
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 pb-3 border-bottom gap-3">
        <div>
          <h2 className="h3 fw-bold m-0">Panel Administrativo</h2>
          <small className="text-muted">Gestión operativa de Sonido Vivo</small>
        </div>
        <span className="badge bg-dark px-3 py-2">
          {user?.nombre} · {user?.rol.toUpperCase()}
        </span>
      </div>

      <div className="nav nav-pills mb-4 gap-2">
        <NavLink
          to="/admin"
          end
          className={({ isActive }) => `btn btn-sm fw-semibold ${isActive ? 'btn-primary' : 'btn-outline-secondary'}`}
        >
          Resumen
        </NavLink>
        <NavLink
          to="/admin/productos"
          className={({ isActive }) => `btn btn-sm fw-semibold ${isActive ? 'btn-primary' : 'btn-outline-secondary'}`}
        >
          Productos
        </NavLink>
        {user?.rol === 'administrador' && (
          <NavLink
            to="/admin/categorias"
            className={({ isActive }) => `btn btn-sm fw-semibold ${isActive ? 'btn-primary' : 'btn-outline-secondary'}`}
          >
            Categorías
          </NavLink>
        )}
        {user?.rol === 'administrador' && (
          <NavLink
            to="/admin/usuarios"
            className={({ isActive }) => `btn btn-sm fw-semibold ${isActive ? 'btn-primary' : 'btn-outline-secondary'}`}
          >
            Usuarios
          </NavLink>
        )}
      </div>

      <Outlet />
    </div>
  );
};