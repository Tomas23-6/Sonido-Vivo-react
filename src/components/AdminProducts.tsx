import React, { useState } from 'react';
import { useAuth } from '../context/authContext';
import { Product } from '../type';
import { getStorageData, saveStorageData } from '../services/storege';

export const AdminProducts: React.FC = () => {
  const { user } = useAuth();
  const [productos, setProductos] = useState<Product[]>(() => getStorageData<Product[]>('sv_productos', []));

  const [nombre, setNombre] = useState('');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [categoria, setCategoria] = useState('Guitarras Acústicas');
  const [precio, setPrecio] = useState<number>(100000);
  const [stock, setStock] = useState<number>(5);

  const isAdmin = user?.rol === 'administrador';

  const handleCrearProducto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) {
      alert('Solo el Administrador puede agregar nuevos productos.');
      return;
    }

    const nuevo: Product = {
      id: `P${Date.now().toString().slice(-4)}`,
      nombre,
      marca,
      modelo,
      categoria,
      precio,
      precioOferta: null,
      stock,
      imagen: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500',
      descripcion: 'Producto ingresado desde el panel de administración.'
    };

    const actualizados = [...productos, nuevo];
    setProductos(actualizados);
    saveStorageData('sv_productos', actualizados);
    alert('Producto creado exitosamente.');
    setNombre(''); setMarca(''); setModelo('');
  };

  const handleUpdateStock = (id: string, nuevoStock: number) => {
    const actualizados = productos.map(p => p.id === id ? { ...p, stock: Math.max(0, nuevoStock) } : p);
    setProductos(actualizados);
    saveStorageData('sv_productos', actualizados);
  };

  const handleDelete = (id: string) => {
    if (!isAdmin) {
      alert('Los vendedores no pueden eliminar productos.');
      return;
    }
    if (confirm('¿Confirma eliminar este producto?')) {
      const actualizados = productos.filter(p => p.id !== id);
      setProductos(actualizados);
      saveStorageData('sv_productos', actualizados);
    }
  };

  return (
    <div className="container my-4">
      <h2 className="h3 mb-4">Gestión de Productos ({user?.rol.toUpperCase()})</h2>

      {/* Formulario solo para Admin */}
      {isAdmin && (
        <div className="card p-3 mb-4 shadow-sm">
          <h5>Nuevo Producto</h5>
          <form onSubmit={handleCrearProducto} className="row g-3">
            <div className="col-md-3">
              <input type="text" className="form-control" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} required />
            </div>
            <div className="col-md-2">
              <input type="text" className="form-control" placeholder="Marca" value={marca} onChange={e => setMarca(e.target.value)} required />
            </div>
            <div className="col-md-2">
              <input type="text" className="form-control" placeholder="Modelo" value={modelo} onChange={e => setModelo(e.target.value)} required />
            </div>
            <div className="col-md-2">
              <input type="number" className="form-control" placeholder="Precio" value={precio} onChange={e => setPrecio(Number(e.target.value))} required />
            </div>
            <div className="col-md-1">
              <input type="number" className="form-control" placeholder="Stock" value={stock} onChange={e => setStock(Number(e.target.value))} required />
            </div>
            <div className="col-md-2">
              <button className="btn btn-success w-100 fw-bold" type="submit">Agregar</button>
            </div>
          </form>
        </div>
      )}

      {/* Tabla */}
      <div className="card p-3 shadow-sm">
        <h5>Inventario de Productos</h5>
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>Cód</th>
                <th>Producto</th>
                <th>Precio</th>
                <th>Stock Actual</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map(p => (
                <tr key={p.id} className={p.stock < 3 ? 'table-warning' : ''}>
                  <td>{p.id}</td>
                  <td><strong>{p.nombre}</strong> ({p.marca})</td>
                  <td>${p.precio.toLocaleString('es-CL')}</td>
                  <td>
                    <input
                      type="number"
                      className="form-control d-inline-block"
                      style={{ width: '80px' }}
                      value={p.stock}
                      onChange={e => handleUpdateStock(p.id, Number(e.target.value))}
                    />
                    {p.stock < 3 && <span className="badge bg-danger ms-2">Stock Crítico</span>}
                  </td>
                  <td>
                    {isAdmin && (
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p.id)}>Eliminar</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};