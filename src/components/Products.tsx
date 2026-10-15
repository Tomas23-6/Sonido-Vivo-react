import React, { useState } from 'react';
import { Product } from '../type';
import { getStorageData } from '../services/storege';
import { useCart } from '../context/cartContext';

interface ProductsProps {
  searchTerm: string;
  setCurrentView: (view: string) => void;
  setSelectedProductId: (id: string) => void;
}

export const Products: React.FC<ProductsProps> = ({ searchTerm, setCurrentView, setSelectedProductId }) => {
  const productos = getStorageData<Product[]>('sv_productos', []);
  const { addToCart } = useCart();

  const [catFiltro, setCatFiltro] = useState<string>('todas');
  const [precioMax, setPrecioMax] = useState<number>(700000);

  const categorias = Array.from(new Set(productos.map(p => p.categoria)));

  const filtrados = productos.filter(p => {
    const cumpleCat = catFiltro === 'todas' || p.categoria === catFiltro;
    const precioEfectivo = p.precioOferta ?? p.precio;
    const cumplePrecio = precioEfectivo <= precioMax;
    const cumpleBusqueda = p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.marca.toLowerCase().includes(searchTerm.toLowerCase());
    return cumpleCat && cumplePrecio && cumpleBusqueda;
  });

  return (
    <div className="container my-4">
      <h2 className="h3 mb-4">Catálogo de Productos</h2>

      {/* Filtros */}
      <div className="card p-3 mb-4 shadow-sm bg-white">
        <div className="row g-3 align-items-center">
          <div className="col-md-5">
            <label className="form-label fw-bold">Categoría:</label>
            <select className="form-select" value={catFiltro} onChange={e => setCatFiltro(e.target.value)}>
              <option value="todas">Todas las categorías</option>
              {categorias.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          <div className="col-md-7">
            <label className="form-label fw-bold">Precio Máximo: ${precioMax.toLocaleString('es-CL')}</label>
            <input
              type="range"
              className="form-range"
              min="50000"
              max="700000"
              step="10000"
              value={precioMax}
              onChange={e => setPrecioMax(Number(e.target.value))}
            />
          </div>
        </div>
      </div>

      {/* Grilla de Productos */}
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {filtrados.length === 0 ? (
          <div className="col-12 text-center py-5">
            <p className="lead text-muted">No se encontraron productos con los filtros seleccionados.</p>
          </div>
        ) : (
          filtrados.map(p => {
            const tieneOferta = p.precioOferta !== null && p.precioOferta < p.precio;
            const sinStock = p.stock <= 0;

            return (
              <div key={p.id} className="col">
                <div className="card h-100 shadow-sm border-0 position-relative">
                  {tieneOferta && <span className="badge bg-danger position-absolute top-0 start-0 m-2">OFERTA</span>}
                  <img src={p.imagen} className="card-img-top object-fit-cover" alt={p.nombre} style={{ height: '200px' }} />
                  <div className="card-body d-flex flex-column">
                    <small className="text-muted text-uppercase fw-bold">{p.categoria}</small>
                    <h5 className="card-title mt-1">{p.nombre}</h5>
                    <p className="card-subtitle mb-2 text-muted">{p.marca} - {p.modelo}</p>
                    <div className="my-2">
                      {tieneOferta ? (
                        <div>
                          <span className="text-decoration-line-through text-muted me-2">${p.precio.toLocaleString('es-CL')}</span>
                          <span className="text-danger fw-bold fs-5">${p.precioOferta?.toLocaleString('es-CL')}</span>
                        </div>
                      ) : (
                        <span className="fw-bold fs-5">${p.precio.toLocaleString('es-CL')}</span>
                      )}
                    </div>
                    <small className={sinStock ? 'text-danger fw-bold' : 'text-success fw-bold'}>
                      {sinStock ? 'Agotado' : `Stock: ${p.stock} unidades`}
                    </small>
                    <div className="mt-auto pt-3 d-flex gap-2">
                      <button
                        className="btn btn-outline-secondary btn-sm flex-fill"
                        onClick={() => { setSelectedProductId(p.id); setCurrentView('detalle'); }}
                      >
                        Ver detalle
                      </button>
                      <button
                        className="btn btn-primary btn-sm flex-fill"
                        disabled={sinStock}
                        onClick={() => addToCart(p.id)}
                      >
                        {sinStock ? 'Sin Stock' : 'Agregar'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};