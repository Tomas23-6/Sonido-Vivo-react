import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../type';
import { getStorageData } from '../../services/storage';
import { ProductCard } from '../ui/productCard';

export const Home: React.FC = () => {
  const productos = getStorageData<Product[]>('sv_productos', []);
  const destacados = productos.slice(0, 3);

  const quickCategories = [
    { icon: '🎸', label: 'Guitarras', filter: 'Guitarras Acústicas' },
    { icon: '⚡', label: 'Eléctricas', filter: 'Guitarras Eléctricas' },
    { icon: '🎹', label: 'Teclados', filter: 'Teclados' },
    { icon: '🔊', label: 'Amplificadores', filter: 'Amplificadores' }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section
        className="bg-dark text-white py-5 mb-5 shadow-sm"
        style={{
          backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.85)), url(https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container text-center py-5">
          <span className="badge bg-warning text-dark mb-3 px-3 py-2 fw-semibold">Envíos a todo Chile</span>
          <h1 className="display-4 fw-bold mb-3">Pasión por la Música en Viña del Mar</h1>
          <p className="col-lg-7 fs-5 mx-auto text-light opacity-75 mb-4">
            Explora nuestro catálogo de guitarras, bajos, teclados y equipos de sonido profesional con asesoría especializada.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Link className="btn btn-warning btn-lg fw-bold px-4" to="/productos">
              Ver Catálogo Completo
            </Link>
            <Link className="btn btn-outline-light btn-lg px-4" to="/ofertas">
              Ver Ofertas
            </Link>
          </div>
        </div>
      </section>

      <div className="container">
        {/* Categorías Rápidas */}
        <section className="mb-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="h4 fw-bold m-0">Explora por Categoría</h2>
            <Link to="/categorias" className="text-decoration-none small fw-semibold">Ver todas las categorías →</Link>
          </div>
          <div className="row row-cols-2 row-cols-md-4 g-3">
            {quickCategories.map(cat => (
              <div key={cat.label} className="col">
                <Link
                  to={`/productos?categoria=${encodeURIComponent(cat.filter)}`}
                  className="card p-4 shadow-sm border bg-white h-100 text-center category-card rounded-3"
                >
                  <span className="fs-1 mb-2">{cat.icon}</span>
                  <h6 className="fw-bold m-0">{cat.label}</h6>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Productos Destacados */}
        <section className="mb-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="h4 fw-bold m-0">Productos Destacados</h2>
            <Link className="btn btn-outline-primary btn-sm fw-semibold" to="/productos">
              Explorar catálogo →
            </Link>
          </div>

          <div className="row row-cols-1 row-cols-md-3 g-4">
            {destacados.map(p => (
              <div key={p.id} className="col">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};