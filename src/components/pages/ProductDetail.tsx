import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Product } from '../../type';
import { getStorageData } from '../../services/storage';
import { useCart } from '../../context/cartContext';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const productos = getStorageData<Product[]>('sv_productos', []);
  const p = productos.find(item => item.id === id);
  const { addToCart } = useCart();
  const [cantidad, setCantidad] = useState<number>(1);

  if (!p) {
    return (
      <div className="container my-5 text-center">
        <div className="card border-0 shadow-sm p-5 mx-auto" style={{ maxWidth: '500px' }}>
          <span className="fs-1 mb-2">🎸</span>
          <h3 className="fw-bold">Producto no encontrado</h3>
          <p className="text-muted">El instrumento que buscas no existe o fue retirado del catálogo.</p>
          <Link className="btn btn-primary mt-2" to="/productos">Volver al catálogo</Link>
        </div>
      </div>
    );
  }

  const tieneOferta = p.precioOferta !== null && p.precioOferta < p.precio;
  const sinStock = p.stock <= 0;

  return (
    <div className="container my-5">
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
          <li className="breadcrumb-item"><Link to="/productos">Productos</Link></li>
          <li className="breadcrumb-item active" aria-current="page">{p.nombre}</li>
        </ol>
      </nav>

      <div className="card shadow-sm border-0 p-4 rounded-3">
        <div className="row g-4 align-items-center">
          <div className="col-md-6">
            <img
              src={p.imagen}
              alt={p.nombre}
              className="img-fluid rounded-3 object-fit-cover w-100 shadow-sm"
              style={{ maxHeight: '420px' }}
            />
          </div>
          <div className="col-md-6 d-flex flex-column">
            <span className="badge bg-primary bg-opacity-10 text-primary w-auto align-self-start mb-2 px-3 py-2">
              {p.categoria}
            </span>
            <h1 className="h2 fw-bold mb-1">{p.nombre}</h1>
            <p className="text-muted small">
              Marca: <strong>{p.marca}</strong> · Modelo: <strong>{p.modelo}</strong> · SKU: <code>{p.id}</code>
            </p>

            <div className="my-3 p-3 bg-light rounded-3">
              {tieneOferta ? (
                <div className="d-flex align-items-baseline gap-3">
                  <span className="text-danger fw-bold display-6">${p.precioOferta?.toLocaleString('es-CL')}</span>
                  <span className="text-decoration-line-through text-muted fs-5">${p.precio.toLocaleString('es-CL')}</span>
                </div>
              ) : (
                <span className="fw-bold display-6">${p.precio.toLocaleString('es-CL')}</span>
              )}
              <div className="mt-1">
                <span className={sinStock ? 'text-danger fw-semibold small' : 'text-success fw-semibold small'}>
                  {sinStock ? '● Agotado temporalmente' : `● Stock disponible: ${p.stock} unidades`}
                </span>
              </div>
            </div>

            <div className="my-3">
              <h6 className="fw-bold text-uppercase small text-muted">Descripción del producto</h6>
              <p className="text-secondary mb-0">{p.descripcion}</p>
            </div>

            {!sinStock && (
              <div className="mt-4 pt-3 border-top d-flex gap-3 align-items-center">
                <div>
                  <label className="form-label small fw-bold mb-1 d-block">Cantidad</label>
                  <input
                    type="number"
                    className="form-control"
                    style={{ width: '85px' }}
                    min="1"
                    max={p.stock}
                    value={cantidad}
                    onChange={e => setCantidad(Math.min(p.stock, Math.max(1, Number(e.target.value))))}
                  />
                </div>
                <button
                  className="btn btn-primary btn-lg flex-fill fw-bold align-self-end"
                  onClick={() => addToCart(p.id, cantidad)}
                >
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