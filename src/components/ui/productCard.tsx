import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../type';
import { useCart } from '../../context/cartContext';

interface ProductCardProps {
  product: Product;
  highlightOffer?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, highlightOffer = false }) => {
  const { addToCart } = useCart();

  const tieneOferta = product.precioOferta !== null && product.precioOferta < product.precio;
  const sinStock = product.stock <= 0;
  const descuentoPct = tieneOferta && product.precioOferta
    ? Math.round(((product.precio - product.precioOferta) / product.precio) * 100)
    : 0;

  return (
    <div className={`card h-100 shadow-sm product-card position-relative rounded-3 overflow-hidden ${highlightOffer ? 'border-danger' : 'border-0'}`}>
      {tieneOferta && (
        <span className="badge bg-danger position-absolute top-0 start-0 m-2 px-2 py-1 shadow-sm">
          -{descuentoPct}% OFERTA
        </span>
      )}
      <Link to={`/productos/${product.id}`} className="text-decoration-none">
        <img
          src={product.imagen}
          className="card-img-top object-fit-cover"
          alt={product.nombre}
          style={{ height: '210px' }}
        />
      </Link>
      <div className="card-body d-flex flex-column">
        <small className="text-muted text-uppercase fw-semibold" style={{ fontSize: '0.72rem' }}>
          {product.categoria}
        </small>
        <Link to={`/productos/${product.id}`} className="text-decoration-none text-dark">
          <h5 className="card-title mt-1 mb-1 fs-6 fw-bold">{product.nombre}</h5>
        </Link>
        <p className="card-subtitle mb-2 text-muted small">{product.marca} · {product.modelo}</p>

        <div className="my-2">
          {tieneOferta ? (
            <div className="d-flex align-items-baseline gap-2">
              <span className="text-danger fw-bold fs-5">${product.precioOferta?.toLocaleString('es-CL')}</span>
              <span className="text-decoration-line-through text-muted small">${product.precio.toLocaleString('es-CL')}</span>
            </div>
          ) : (
            <span className="fw-bold fs-5 text-dark">${product.precio.toLocaleString('es-CL')}</span>
          )}
        </div>

        <small className={sinStock ? 'text-danger fw-semibold' : 'text-success fw-semibold'}>
          {sinStock ? '● Agotado' : `● Stock: ${product.stock} u.`}
        </small>

        <div className="mt-auto pt-3 d-flex gap-2">
          <Link to={`/productos/${product.id}`} className="btn btn-outline-secondary btn-sm flex-fill">
            Ver detalle
          </Link>
          <button
            className={`btn btn-sm flex-fill fw-semibold ${highlightOffer ? 'btn-danger' : 'btn-primary'}`}
            disabled={sinStock}
            onClick={() => addToCart(product.id)}
          >
            {sinStock ? 'Sin Stock' : 'Agregar'}
          </button>
        </div>
      </div>
    </div>
  );
};