import React, { useState } from 'react';
import { Product } from '../type';
import { getStorageData } from '../services/storege';
import { useCart } from '../context/cartContext';

interface ProductDetailProps {
  productId: string;
  setCurrentView: (view: string) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ productId, setCurrentView }) => {
  const productos = getStorageData<Product[]>('sv_productos', []);
  const p = productos.find(item => item.id === productId);
  const { addToCart } = useCart();
  const [cantidad, setCantidad] = useState<number>(1);

  if (!p) {
    return (
      <div className="container my-5 text-center">
        <div className="alert alert-warning">
          Producto no encontrado. <button className="btn btn-link" onClick={() => setCurrentView('productos')}>Volver al catálogo</button>
        </div>
      </div>
    );
  }

  const tieneOferta = p.precioOferta !== null && p.precioOferta < p.precio;
  const sinStock = p.stock <= 0;

  return (
    <div className="container my-5">
      <button className="btn btn-outline-secondary mb-4" onClick={() => setCurrentView('productos')}>← Volver al catálogo</button>
      <div className="card shadow-lg p-4">
        <div className="row g-4">
          <div className="col-md-6">
            <img src={p.imagen} alt={p.nombre} className="img-fluid rounded object-fit-cover w-100" style={{ maxHeight: '400px' }} />
          </div>
          <div className="col-md-6 d-flex flex-column">
            <span className="badge bg-secondary w-auto align-self-start mb-2">{p.categoria}</span>
            <h2 className="h3">{p.nombre}</h2>
            <p className="text-muted">Marca: <strong>{p.marca}</strong> | Modelo: <strong>{p.modelo}</strong> (Cód: {p.id})</p>

            <div className="my-3">
              {tieneOferta ? (
                <div>
                  <span className="text-decoration-line-through text-muted me-2 fs-5">${p.precio.toLocaleString('es-CL')}</span>
                  <span className="text-danger fw-bold fs-2">${p.precioOferta?.toLocaleString('es-CL')}</span>
                </div>
              ) : (
                <span className="fw-bold fs-2">${p.precio.toLocaleString('es-CL')}</span>
              )}
            </div>

            <p className={sinStock ? 'text-danger fw-bold' : 'text-success fw-bold'}>
              {sinStock ? 'Agotado temporalmente' : `Stock disponible: ${p.stock} unidades`}
            </p>

            <div className="my-3">
              <h5>Descripción</h5>
              <p className="text-secondary">{p.descripcion}</p>
            </div>

            {!sinStock && (
              <div className="mt-auto d-flex gap-3 align-items-center">
                <label className="fw-bold">Cantidad:</label>
                <input
                  type="number"
                  className="form-control"
                  style={{ width: '80px' }}
                  min="1"
                  max={p.stock}
                  value={cantidad}
                  onChange={e => setCantidad(Math.max(1, Number(e.target.value)))}
                />
                <button className="btn btn-primary btn-lg flex-fill" onClick={() => addToCart(p.id, cantidad)}>
                  Agregar al Carrito
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};