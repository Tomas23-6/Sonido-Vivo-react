import React from 'react';
import { Link } from 'react-router-dom';
import { getStorageData } from '../../../services/storage';
import { Product, User, Order } from '../../../type';

export const AdminDashboard: React.FC = () => {
  const productos = getStorageData<Product[]>('sv_productos', []);
  const usuarios = getStorageData<User[]>('sv_usuarios', []);
  const ordenes = getStorageData<Order[]>('sv_ordenes', []);

  return (
    <div>
      {/* Tarjetas de Métricas */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="card border-0 bg-primary text-white p-3 shadow-sm rounded-3">
            <small className="text-uppercase opacity-75 fw-semibold">Total Productos</small>
            <h2 className="display-6 fw-bold my-1">{productos.length}</h2>
            <small className="opacity-75">En catálogo activo</small>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 bg-success text-white p-3 shadow-sm rounded-3">
            <small className="text-uppercase opacity-75 fw-semibold">Usuarios</small>
            <h2 className="display-6 fw-bold my-1">{usuarios.length}</h2>
            <small className="opacity-75">Cuentas registradas</small>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 bg-warning text-dark p-3 shadow-sm rounded-3">
            <small className="text-uppercase opacity-75 fw-semibold">Stock Crítico</small>
            <h2 className="display-6 fw-bold my-1">{productos.filter(p => p.stock < 3).length}</h2>
            <small className="opacity-75">Menos de 3 unidades</small>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 bg-dark text-white p-3 shadow-sm rounded-3">
            <small className="text-uppercase opacity-75 fw-semibold">Ventas Realizadas</small>
            <h2 className="display-6 fw-bold my-1">{ordenes.length}</h2>
            <small className="opacity-75">Órdenes aprobadas</small>
          </div>
        </div>
      </div>

      {/* Accesos Directos */}
      <div className="row g-3">
        <div className="col-md-4">
          <div className="card border-0 p-4 text-center shadow-sm h-100 rounded-3">
            <div className="fs-1 mb-2">📦</div>
            <h4 className="h5 fw-bold">Productos</h4>
            <p className="text-muted small">Gestión de inventario, precios de oferta y actualización de stock.</p>
            <Link className="btn btn-outline-primary mt-auto fw-semibold" to="/admin/productos">
              Administrar Productos
            </Link>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 p-4 text-center shadow-sm h-100 rounded-3">
            <div className="fs-1 mb-2">🏷️</div>
            <h4 className="h5 fw-bold">Categorías</h4>
            <p className="text-muted small">Crear y organizar las familias de instrumentos de la tienda.</p>
            <Link className="btn btn-outline-primary mt-auto fw-semibold" to="/admin/categorias">
              Administrar Categorías
            </Link>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 p-4 text-center shadow-sm h-100 rounded-3">
            <div className="fs-1 mb-2">👥</div>
            <h4 className="h5 fw-bold">Usuarios</h4>
            <p className="text-muted small">Asignar roles de acceso y desbloquear cuentas suspendidas.</p>
            <Link className="btn btn-outline-primary mt-auto fw-semibold" to="/admin/usuarios">
              Administrar Usuarios
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};