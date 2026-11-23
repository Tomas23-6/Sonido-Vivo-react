import React from 'react';
import { Product, Category } from '../../type';
import { getStorageData } from '../../services/storage';
import { ProductCard } from '../ui/productCard';

export const Categories: React.FC = () => {
  const categorias = getStorageData<Category[]>('sv_categorias', []);
  const productos = getStorageData<Product[]>('sv_productos', []);

  return (
    <div className="container my-4">
      <div className="text-center mb-5">
        <h2 className="h3 fw-bold">Nuestras Categorías</h2>
        <p className="text-muted">Explora nuestra selección organizada por familia de instrumentos</p>
      </div>

      {categorias.map(cat => {
        const prodsCat = productos.filter(p => p.categoria === cat.nombre);
        return (
          <section key={cat.id} className="mb-5">
            <div className="border-bottom pb-2 mb-4 d-flex justify-content-between align-items-end">
              <div>
                <h3 className="h4 text-primary fw-bold mb-1">{cat.nombre}</h3>
                <p className="text-muted small m-0">{cat.descripcion}</p>
              </div>
              <span className="badge bg-secondary rounded-pill">{prodsCat.length} productos</span>
            </div>

            {prodsCat.length === 0 ? (
              <div className="alert alert-light border text-muted small">
                No hay productos disponibles en esta categoría por el momento.
              </div>
            ) : (
              <div className="row row-cols-1 row-cols-md-3 g-4">
                {prodsCat.map(p => (
                  <div key={p.id} className="col">
                    <ProductCard product={p} />
                  </div>
                ))}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
};