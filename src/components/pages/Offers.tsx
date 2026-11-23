import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../type';
import { getStorageData } from '../../services/storage';
import { ProductCard } from '../ui/productCard';

export const Offers: React.FC = () => {
  const productos = getStorageData<Product[]>('sv_productos', []);
  const ofertas = productos.filter(p => p.precioOferta !== null && p.precioOferta < p.precio);

  return (
    <div className="container my-4">
      <div className="p-4 bg-danger bg-gradient text-white rounded-3 mb-4 text-center shadow-sm">
        <h2 className="fw-bold m-0">🔥 OFERTAS IMPERDIBLES</h2>
        <p className="m-0 mt-1 opacity-75">Aprovecha descuentos exclusivos en instrumentos musicales seleccionados.</p>
      </div>

      {ofertas.length === 0 ? (
        <div className="card border-0 shadow-sm p-5 text-center rounded-3">
          <h4 className="fw-bold">No hay ofertas activas hoy</h4>
          <p className="text-muted">Revisa nuestro catálogo general para ver todos los instrumentos disponibles.</p>
          <div>
            <Link to="/productos" className="btn btn-primary">Ver Catálogo</Link>
          </div>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {ofertas.map(p => (
            <div key={p.id} className="col">
              <ProductCard product={p} highlightOffer />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};