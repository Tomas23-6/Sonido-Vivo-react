import React from 'react';
import { Product } from '../type';
import { getStorageData } from '../services/storege';
import { useCart } from '../context/cartContext';

interface OffersProps {
  setCurrentView: (view: string) => void;
  setSelectedProductId: (id: string) => void;
}

export const Offers: React.FC<OffersProps> = ({ setCurrentView, setSelectedProductId }) => {
  const productos = getStorageData<Product[]>('sv_productos', []);
  const { addToCart } = useCart();

  const ofertas = productos.filter(p => p.precioOferta !== null && p.precioOferta < p.precio);

  return (
    <div className="container my-4">
      <div className="p-4 bg-danger text-white rounded mb-4 text-center">
        <h2 className="fw-bold m-0">🔥 OFERTAS IMPERDIBLES</h2>
        <p className="m-0 mt-1">Aprovecha los mejores descuentos en instrumentos musicales seleccionados.</p>
      </div>

      <div className="row row-cols-1 row-cols-md-3 g-4">
        {ofertas.map(p => (
          <div key={p.id} className="col">
            <div className="card h-100 shadow border-danger">
              <span className="badge bg-danger position-absolute top-0 start-0 m-2">OFERTA</span>
              <img src={p.imagen} className="card-img-top object-fit-cover" alt={p.nombre} style={{ height: '200px' }} />
              <div className="card-body d-flex flex-column">
                <small className="text-muted text-uppercase">{p.categoria}</small>
                <h5 className="card-title">{p.nombre}</h5>
                <p className="text-muted mb-2">{p.marca}</p>
                <div className="mb-3">
                  <span className="text-decoration-line-through text-muted me-2">${p.precio.toLocaleString('es-CL')}</span>
                  <span className="text-danger fw-bold fs-4">${p.precioOferta?.toLocaleString('es-CL')}</span>
                </div>
                <div className="mt-auto d-flex gap-2">
                  <button className="btn btn-outline-dark btn-sm flex-fill" onClick={() => { setSelectedProductId(p.id); setCurrentView('detalle'); }}>
                    Ver Detalle
                  </button>
                  <button className="btn btn-danger btn-sm flex-fill fw-bold" onClick={() => addToCart(p.id)}>
                    Aprovechar
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};