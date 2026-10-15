import React from 'react';
import { useAuth } from '../context/authContext';
import { getStorageData } from '../services/storege';
import { Product, User } from '../type';

interface AdminDashboardProps {
  setAdminSubView: (subview: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ setAdminSubView }) => {
  const { user } = useAuth();
  const productos = getStorageData<Product[]>('sv_productos', []);
  const usuarios = getStorageData<User[]>('sv_usuarios', []);

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="h3">Panel Administrativo</h2>
        <span className="badge bg-primary fs-6">Usuario: {user?.nombre} ({user?.rol.toUpperCase()})</span>
      </div>

      {/* Tarjetas de Métricas */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card bg-primary text-white p-3 shadow-sm">
            <h5>Total Productos</h5>
            <h2 className="display-6 fw-bold">{productos.length}</h2>
            <small>En catálogo activo</small>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-success text-white p-3 shadow-sm">
            <h5>Usuarios Registrados</h5>
            <h2 className="display-6 fw-bold">{usuarios.length}</h2>
            <small>Clientes, Vendedores y Admins</small>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-warning text-dark p-3 shadow-sm">
            <h5>Stock Crítico</h5>
            <h2 className="display-6 fw-bold">{productos.filter(p => p.stock < 3).length}</h2>
            <small>Productos con menos de 3 unidades</small>
          </div>
        </div>
      </div>

      {/* Botones de Selección */}
      <div className="row g-3">
        <div className="col-md-4">
          <div className="card p-4 text-center shadow-sm h-100">
            <h4>📦 Productos</h4>
            <p className="text-muted">Gestión de inventario y actualización de stock.</p>
            <button className="btn btn-outline-primary mt-auto fw-bold" onClick={() => setAdminSubView('productos')}>Ir a Productos</button>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-4 text-center shadow-sm h-100">
            <h4>🏷️ Categorías</h4>
            <p className="text-muted">Crear y administrar categorías de instrumentos.</p>
            <button className="btn btn-outline-primary mt-auto fw-bold" onClick={() => setAdminSubView('categorias')}>Ir a Categorías</button>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-4 text-center shadow-sm h-100">
            <h4>👥 Usuarios</h4>
            <p className="text-muted">Crear usuarios, controlar bloqueo y asignar roles.</p>
            <button className="btn btn-outline-primary mt-auto fw-bold" onClick={() => setAdminSubView('usuarios')}>Ir a Usuarios</button>
          </div>
        </div>
      </div>
    </div>
  );
};