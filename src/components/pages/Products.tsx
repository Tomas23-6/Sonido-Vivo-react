import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCart } from '../../context/cartContext';
import { ProductCard } from '../ui/productCard';

export const Products: React.FC = () => {
  const { products: productos } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();

  const searchTerm = searchParams.get('search') || '';
  const initialCat = searchParams.get('categoria') || 'todas';

  const maxCatalogPrice = useMemo(() => {
    if (productos.length === 0) return 1000000;
    const highest = Math.max(...productos.map(p => p.precioOferta ?? p.precio));
    return Math.max(100000, Math.ceil(highest / 10000) * 10000);
  }, [productos]);

  const [catFiltro, setCatFiltro] = useState<string>(initialCat);
  const [precioMax, setPrecioMax] = useState<number>(maxCatalogPrice);

  useEffect(() => {
    setCatFiltro(searchParams.get('categoria') || 'todas');
  }, [searchParams]);

  useEffect(() => {
    setPrecioMax(maxCatalogPrice);
  }, [maxCatalogPrice]);

  const categorias = useMemo(
    () => Array.from(new Set(productos.map(p => p.categoria))),
    [productos]
  );

  const handleCategoryChange = (value: string) => {
    setCatFiltro(value);
    const nextParams = new URLSearchParams(searchParams);
    if (value === 'todas') {
      nextParams.delete('categoria');
    } else {
      nextParams.set('categoria', value);
    }
    setSearchParams(nextParams);
  };

  const resetFilters = () => {
    setCatFiltro('todas');
    setPrecioMax(maxCatalogPrice);
    setSearchParams({});
  };

  const filtrados = useMemo(() => {
    return productos.filter(p => {
      const cumpleCat = catFiltro === 'todas' || p.categoria === catFiltro;
      const precioEfectivo = p.precioOferta ?? p.precio;
      const cumplePrecio = precioEfectivo <= precioMax;
      const q = searchTerm.toLowerCase();
      const cumpleBusqueda =
        !q ||
        p.nombre.toLowerCase().includes(q) ||
        p.marca.toLowerCase().includes(q) ||
        p.modelo.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q);
      return cumpleCat && cumplePrecio && cumpleBusqueda;
    });
  }, [productos, catFiltro, precioMax, searchTerm]);

  return (
    <div className="container my-4">
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-2">
        <div>
          <h2 className="h3 fw-bold m-0">Catálogo de Productos</h2>
          {searchTerm && (
            <small className="text-muted">
              Mostrando resultados para: <strong>"{searchTerm}"</strong>
            </small>
          )}
        </div>
        {(catFiltro !== 'todas' || precioMax < maxCatalogPrice || searchTerm) && (
          <button className="btn btn-outline-secondary btn-sm" onClick={resetFilters}>
            Limpiar filtros
          </button>
        )}
      </div>

      {/* Filtros */}
      <div className="card p-3 mb-4 shadow-sm border-0 bg-white rounded-3">
        <div className="row g-3 align-items-center">
          <div className="col-md-5">
            <label className="form-label fw-semibold small text-muted mb-1">Categoría</label>
            <select
              className="form-select"
              value={catFiltro}
              onChange={e => handleCategoryChange(e.target.value)}
            >
              <option value="todas">Todas las categorías</option>
              {categorias.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="col-md-7">
            <label className="form-label fw-semibold small text-muted mb-1">
              Precio Máximo: <span className="text-primary fw-bold">${precioMax.toLocaleString('es-CL')}</span>
            </label>
            <input
              type="range"
              className="form-range"
              min="0"
              max={maxCatalogPrice}
              step="10000"
              value={precioMax}
              onChange={e => setPrecioMax(Number(e.target.value))}
            />
          </div>
        </div>
      </div>

      {/* Grilla o Empty State */}
      {filtrados.length === 0 ? (
        <div className="card border-0 shadow-sm p-5 text-center rounded-3">
          <div className="fs-1 mb-2">🔍</div>
          <h4 className="fw-bold">No se encontraron instrumentos</h4>
          <p className="text-muted mb-3">Intenta ajustar el rango de precios o limpiar los filtros de búsqueda.</p>
          <div>
            <button className="btn btn-primary" onClick={resetFilters}>Restablecer filtros</button>
          </div>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {filtrados.map(p => (
            <div key={p.id} className="col">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};