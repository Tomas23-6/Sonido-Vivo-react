import React, { useState } from 'react';
import { Product, Category } from '../../../type';
import { getStorageData, saveStorageData } from '../../../services/storage';
import { useToast } from '../../../context/toastContext';

export const AdminProducts: React.FC = () => {
  const [productos, setProductos] = useState<Product[]>(() => getStorageData<Product[]>('sv_productos', []));
  const categorias = getStorageData<Category[]>('sv_categorias', []);
  const { showToast } = useToast();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const [nombre, setNombre] = useState('');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [categoria, setCategoria] = useState(categorias[0]?.nombre || '');
  const [precio, setPrecio] = useState<number>(0);
  const [precioOferta, setPrecioOferta] = useState<number | null>(null);
  const [stock, setStock] = useState<number>(0);
  const [imagen, setImagen] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const resetForm = () => {
    setEditingId(null);
    setNombre('');
    setMarca('');
    setModelo('');
    setCategoria(categorias[0]?.nombre || '');
    setPrecio(0);
    setPrecioOferta(null);
    setStock(0);
    setImagen('');
    setDescripcion('');
  };

  const handleEdit = (p: Product) => {
    setEditingId(p.id);
    setNombre(p.nombre);
    setMarca(p.marca);
    setModelo(p.modelo);
    setCategoria(p.categoria);
    setPrecio(p.precio);
    setPrecioOferta(p.precioOferta);
    setStock(p.stock);
    setImagen(p.imagen);
    setDescripcion(p.descripcion);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const confirmDelete = (id: string) => {
    const updated = productos.filter(p => p.id !== id);
    setProductos(updated);
    saveStorageData('sv_productos', updated);
    setDeleteConfirmId(null);
    showToast('Producto eliminado del catálogo', 'info');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      const updated = productos.map(p =>
        p.id === editingId
          ? { ...p, nombre, marca, modelo, categoria, precio, precioOferta: precioOferta || null, stock, imagen, descripcion }
          : p
      );
      setProductos(updated);
      saveStorageData('sv_productos', updated);
      showToast('Producto actualizado con éxito', 'success');
    } else {
      const newProduct: Product = {
        id: `PROD-${Date.now()}`,
        nombre,
        marca,
        modelo,
        categoria: categoria || (categorias[0]?.nombre ?? 'Guitarras Acústicas'),
        precio,
        precioOferta: precioOferta || null,
        stock,
        imagen: imagen || 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=600',
        descripcion
      };
      const updated = [...productos, newProduct];
      setProductos(updated);
      saveStorageData('sv_productos', updated);
      showToast('Producto agregado al catálogo', 'success');
    }

    resetForm();
  };

  return (
    <div>
      {/* Formulario */}
      <div className="card border-0 shadow-sm p-4 mb-4 rounded-3">
        <h5 className="fw-bold mb-3 text-primary">
          {editingId ? '✏️ Editando Producto' : '➕ Agregar Nuevo Producto'}
        </h5>
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label small fw-semibold">Nombre</label>
              <input type="text" className="form-control" value={nombre} onChange={e => setNombre(e.target.value)} required />
            </div>
            <div className="col-md-4">
              <label className="form-label small fw-semibold">Marca</label>
              <input type="text" className="form-control" value={marca} onChange={e => setMarca(e.target.value)} required />
            </div>
            <div className="col-md-4">
              <label className="form-label small fw-semibold">Modelo</label>
              <input type="text" className="form-control" value={modelo} onChange={e => setModelo(e.target.value)} required />
            </div>
            <div className="col-md-4">
              <label className="form-label small fw-semibold">Categoría</label>
              <select className="form-select" value={categoria} onChange={e => setCategoria(e.target.value)}>
                {categorias.map(c => (
                  <option key={c.id} value={c.nombre}>{c.nombre}</option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label small fw-semibold">Precio Normal ($)</label>
              <input type="number" className="form-control" min="0" value={precio} onChange={e => setPrecio(Number(e.target.value))} required />
            </div>
            <div className="col-md-4">
              <label className="form-label small fw-semibold">Precio Oferta ($) (Opcional)</label>
              <input
                type="number"
                className="form-control"
                min="0"
                value={precioOferta ?? ''}
                onChange={e => setPrecioOferta(e.target.value ? Number(e.target.value) : null)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label small fw-semibold">Stock</label>
              <input type="number" className="form-control" min="0" value={stock} onChange={e => setStock(Number(e.target.value))} required />
            </div>
            <div className="col-md-8">
              <label className="form-label small fw-semibold">URL Imagen</label>
              <input type="url" className="form-control" value={imagen} onChange={e => setImagen(e.target.value)} placeholder="https://..." />
            </div>
            <div className="col-12">
              <label className="form-label small fw-semibold">Descripción</label>
              <textarea className="form-control" rows={2} value={descripcion} onChange={e => setDescripcion(e.target.value)} required></textarea>
            </div>
          </div>
          <div className="mt-3 d-flex gap-2">
            <button type="submit" className="btn btn-primary fw-bold">
              {editingId ? 'Guardar Cambios' : 'Crear Producto'}
            </button>
            {editingId && (
              <button type="button" className="btn btn-outline-secondary" onClick={resetForm}>
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Tabla */}
      <div className="card border-0 shadow-sm p-3 rounded-3">
        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Producto</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Oferta</th>
                <th>Stock</th>
                <th className="text-end">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map(p => (
                <tr key={p.id}>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <img src={p.imagen} alt={p.nombre} width="42" height="42" className="rounded object-fit-cover" />
                      <div>
                        <strong className="d-block">{p.nombre}</strong>
                        <small className="text-muted">{p.marca} {p.modelo}</small>
                      </div>
                    </div>
                  </td>
                  <td><span className="badge bg-light text-dark border">{p.categoria}</span></td>
                  <td>${p.precio.toLocaleString('es-CL')}</td>
                  <td>{p.precioOferta ? <span className="text-danger fw-semibold">${p.precioOferta.toLocaleString('es-CL')}</span> : '-'}</td>
                  <td><span className={`badge ${p.stock < 3 ? 'bg-danger' : 'bg-success'}`}>{p.stock} u.</span></td>
                  <td className="text-end">
                    {deleteConfirmId === p.id ? (
                      <div className="d-inline-flex align-items-center gap-1">
                        <small className="text-danger fw-semibold me-1">¿Confirmar?</small>
                        <button className="btn btn-sm btn-danger" onClick={() => confirmDelete(p.id)}>Sí</button>
                        <button className="btn btn-sm btn-secondary" onClick={() => setDeleteConfirmId(null)}>No</button>
                      </div>
                    ) : (
                      <>
                        <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEdit(p)}>Editar</button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => setDeleteConfirmId(p.id)}>Eliminar</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};