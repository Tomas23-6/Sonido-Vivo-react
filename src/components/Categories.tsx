import React from 'react';
import { Product, Category } from '../type';
import { getStorageData } from '../services/storege';
import { useCart } from '../context/cartContext';

interface CategoriesProps {
  setCurrentView: (view: string) => void;
  setSelectedProductId: (id: string) => void;
}

export const Categories: React.FC<CategoriesProps> = ({ setCurrentView, setSelectedProductId }) => {
  const categorias = getStorageData<Category[]>('sv_categorias', []);
  const productos = getStorageData<Product[]>('sv_productos', []);
  const { addToCart } = useCart();

  return (
    <div className="container my-4">
      <h2 className="h3 mb-4 text-center">Nuestras Categorías</h2>

      {categorias.map(cat => {
        const prodsCat = productos.filter(p => p.categoria === cat.nombre);
        return (
          <div key={cat.id} className="mb-5">
            <div className="border-bottom pb-2 mb-3">
              <h3 className="h4 text-primary">{cat.nombre}</h3>
              <p className="text-muted m-0">{cat.descripcion}</p>
            </div>
            <div className="row row-cols-1 row-cols-md-4 g-3">
              {prodsCat.length === 0 ? (
                <p className="text-muted fst-italic">No hay productos en esta categoría por el momento.</p>
              ) : (
                prodsCat.map(p => (
                  <div key={p.id} className="col">
                    <div className="card h-100 shadow-sm">
                      <img src={p.imagen} className="card-img-top object-fit-cover" alt={p.nombre} style={{ height: '150px' }} />
                      <div className="card-body d-flex flex-column">
                        <h6 className="card-title mb-1">{p.nombre}</h6>
                        <small className="text-muted mb-2">{p.marca}</small>
                        <span className="fw-bold mb-2">${(p.precioOferta ?? p.precio).toLocaleString('es-CL')}</span>
                        <div className="mt-auto d-flex gap-1">
                          <button
                            className="btn btn-outline-primary btn-sm w-100"
                            onClick={() => { setSelectedProductId(p.id); setCurrentView('detalle'); }}
                          >
                            Ver
                          </button>
                          <button className="btn btn-success btn-sm w-100" onClick={() => addToCart(p.id)}>
                            + Carrito
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};