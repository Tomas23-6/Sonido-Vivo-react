import React, { useState } from 'react';
import { Category, Product } from '../../../type';
import { getStorageData, saveStorageData } from '../../../services/storage';
import { useToast } from '../../../context/toastContext';

export const AdminCategories: React.FC = () => {
  const [categorias, setCategorias] = useState<Category[]>(() => getStorageData<Category[]>('sv_categorias', []));
  const productos = getStorageData<Product[]>('sv_productos', []);
  const { showToast } = useToast();

  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!nombre.trim()) return;

    if (categorias.some(c => c.nombre.toLowerCase() === nombre.trim().toLowerCase())) {
      setErrorMsg('Ya existe una categoría con ese nombre.');
      return;
    }

    const newCat: Category = {
      id: `cat-${Date.now()}`,
      nombre: nombre.trim(),
      descripcion: descripcion.trim()
    };

    const updated = [...categorias, newCat];
    setCategorias(updated);
    saveStorageData('sv_categorias', updated);

    setNombre('');
    setDescripcion('');
    showToast('Categoría creada correctamente', 'success');
  };

  const confirmDeleteCategory = (id: string, nombreCat: string) => {
    setErrorMsg('');
    const prodsAsociados = productos.filter(p => p.categoria === nombreCat);
    if (prodsAsociados.length > 0) {
      setDeleteConfirmId(null);
      setErrorMsg(`No se puede eliminar "${nombreCat}" porque tiene ${prodsAsociados.length} producto(s) asociado(s).`);
      return;
    }

    const updated = categorias.filter(c => c.id !== id);
    setCategorias(updated);
    saveStorageData('sv_categorias', updated);
    setDeleteConfirmId(null);
    showToast(`Categoría "${nombreCat}" eliminada`, 'info');
  };

  return (
    <div>
      {errorMsg && (
        <div className="alert alert-warning d-flex justify-content-between align-items-center">
          <span>{errorMsg}</span>
          <button type="button" className="btn-close" onClick={() => setErrorMsg('')}></button>
        </div>
      )}

      {/* Formulario */}
      <div className="card border-0 shadow-sm p-4 mb-4 rounded-3">
        <h5 className="fw-bold mb-3 text-primary">➕ Nueva Categoría</h5>
        <form onSubmit={handleAddCategory}>
          <div className="row g-3">
            <div className="col-md-5">
              <label className="form-label small fw-semibold">Nombre de la Categoría</label>
              <input type="text" className="form-control" value={nombre} onChange={e => setNombre(e.target.value)} required />
            </div>
            <div className="col-md-7">
              <label className="form-label small fw-semibold">Descripción</label>
              <input type="text" className="form-control" value={descripcion} onChange={e => setDescripcion(e.target.value)} required />
            </div>
          </div>
          <button type="submit" className="btn btn-primary fw-bold mt-3">Agregar Categoría</button>
        </form>
      </div>

      {/* Tabla */}
      <div className="card border-0 shadow-sm p-3 rounded-3">
        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Productos Asociados</th>
                <th className="text-end">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {categorias.map(cat => {
                const count = productos.filter(p => p.categoria === cat.nombre).length;
                return (
                  <tr key={cat.id}>
                    <td className="fw-bold">{cat.nombre}</td>
                    <td className="text-muted small">{cat.descripcion}</td>
                    <td><span className="badge bg-info bg-opacity-10 text-info border border-info">{count} productos</span></td>
                    <td className="text-end">
                      {deleteConfirmId === cat.id ? (
                        <div className="d-inline-flex align-items-center gap-1">
                          <small className="text-danger fw-semibold me-1">¿Eliminar?</small>
                          <button className="btn btn-sm btn-danger" onClick={() => confirmDeleteCategory(cat.id, cat.nombre)}>Sí</button>
                          <button className="btn btn-sm btn-secondary" onClick={() => setDeleteConfirmId(null)}>No</button>
                        </div>
                      ) : (
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => setDeleteConfirmId(cat.id)}
                        >
                          Eliminar
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};