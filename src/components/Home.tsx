import React from 'react';
import { Product } from '../type';
import { getStorageData } from '../services/storege';
import { useCart } from '../context/cartContext';

interface HomeProps {
  setCurrentView: (view: string) => void;
  setSelectedProductId: (id: string) => void;
}

export const Home: React.FC<HomeProps> = ({ setCurrentView, setSelectedProductId }) => {
  const productos = getStorageData<Product[]>('sv_productos', []);
  const { addToCart } = useCart();

  // Tomamos los primeros 3 productos como destacados
  const destacados = productos.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-dark text-white py-5 mb-5 shadow-sm" style={{
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url(https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className="container text-center py-4">
          <h1 className="display-4 fw-bold">Pasión por la Música en Viña del Mar</h1>
          <p className="col-lg-8 fs-5 mx-auto text-light">
            Explora nuestro catálogo de guitarras, bajos, teclados y equipos de sonido profesional con despacho a todo Chile.
          </p>
          <button className="btn btn-warning btn-lg fw-bold px-4 mt-2" onClick={() => setCurrentView('productos')}>
            Ver Catálogo Completo
          </button>
        </div>
      </section>

      <div className="container">
        {/* Banner de Categorías Rápidas */}
        <section className="mb-5 text-center">
          <h2 className="h3 mb-4 text-primary fw-bold">Categorías Principales</h2>
          <div className="row row-cols-2 row-cols-md-4 g-3">
            <div className="col">
              <div className="card p-3 shadow-sm border-0 bg-white h-100 cursor-pointer" onClick={() => setCurrentView('categorias')}>
                <span className="fs-1">🎸</span>
                <h6 className="mt-2 fw-bold">Guitarras</h6>
              </div>
            </div>
            <div className="col">
              <div className="card p-3 shadow-sm border-0 bg-white h-100 cursor-pointer" onClick={() => setCurrentView('categorias')}>
                <span className="fs-1">🎹</span>
                <h6 className="mt-2 fw-bold">Teclados</h6>
              </div>
            </div>
            <div className="col">
              <div className="card p-3 shadow-sm border-0 bg-white h-100 cursor-pointer" onClick={() => setCurrentView('categorias')}>
                <span className="fs-1">🥁</span>
                <h6 className="mt-2 fw-bold">Baterías</h6>
              </div>
            </div>
            <div className="col">
              <div className="card p-3 shadow-sm border-0 bg-white h-100 cursor-pointer" onClick={() => setCurrentView('categorias')}>
                <span className="fs-1">🔊</span>
                <h6 className="mt-2 fw-bold">Amplificadores</h6>
              </div>
            </div>
          </div>
        </section>

        {/* Productos Destacados */}
        <section className="mb-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="h3 text-primary fw-bold m-0">Productos Destacados</h2>
            <button className="btn btn-outline-primary btn-sm" onClick={() => setCurrentView('productos')}>Ver todos →</button>
          </div>

          <div className="row row-cols-1 row-cols-md-3 g-4">
            {destacados.map(p => {
              const tieneOferta = p.precioOferta !== null && p.precioOferta < p.precio;
              return (
                <div key={p.id} className="col">
                  <div className="card h-100 shadow-sm border-0">
                    {tieneOferta && <span className="badge bg-danger position-absolute top-0 start-0 m-2">OFERTA</span>}
                    <img src={p.imagen} className="card-img-top object-fit-cover" alt={p.nombre} style={{ height: '220px' }} />
                    <div className="card-body d-flex flex-column">
                      <small className="text-muted text-uppercase fw-bold">{p.categoria}</small>
                      <h5 className="card-title mt-1">{p.nombre}</h5>
                      <p className="card-subtitle mb-2 text-muted">{p.marca} {p.modelo}</p>
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
                      <div className="mt-auto pt-3 d-flex gap-2">
                        <button
                          className="btn btn-outline-secondary btn-sm flex-fill"
                          onClick={() => { setSelectedProductId(p.id); setCurrentView('detalle'); }}
                        >
                          Ver detalle
                        </button>
                        <button className="btn btn-primary btn-sm flex-fill" onClick={() => addToCart(p.id)}>
                          Agregar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};