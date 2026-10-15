import React, { useState } from 'react';
import { useAuth } from '../context/authContext';
import { Category } from '../type';
import { getStorageData, saveStorageData } from '../services/storege';

export const AdminCategories: React.FC = () => {
  const { user } = useAuth();
  const [categorias, setCategorias] = useState<Category[]>(() => getStorageData<Category[]>('sv_categorias', []));
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const isAdmin = user?.rol === 'administrador';

  const handleCrear = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) {
      alert('Solo el Administrador puede gestionar categorías.');
      return;
    }

    const nueva: Category = {
      id: `cat-${Date.now()}`,
      nombre,
      descripcion
    };

    const actualizadas = [...categorias, nueva];
    setCategorias(actualizadas);
    saveStorageData('sv_categorias', actualizadas);
    setNombre(''); setDescripcion('');
  };

  return (
    <div className="container my-4">
      <h2 className="h3 mb-4">Gestión de Categorías</h2>

      {isAdmin ? (
        <div className="card p-3 mb-4 shadow-sm">
          <h5>Agregar Categoría</h5>
          <form onSubmit={handleCrear} className="row g-3">
            <div className="col-md-4">
              <input type="text" className="form-control" placeholder="Nombre Categoría" value={nombre} onChange={e => setNombre(e.target.value)} required />
            </div>
            <div className="col-md-6">
              <input type="text" className="form-control" placeholder="Descripción" value={descripcion} onChange={e => setDescripcion(e.target.value)} required />
            </div>
            <div className="col-md-2">
              <button className="btn btn-success w-100 fw-bold" type="submit">Guardar</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="alert alert-warning">El rol Vendedor no tiene permisos para modificar categorías.</div>
      )}

      <div className="card p-3 shadow-sm">
        <ul className="list-group">
          {categorias.map(c => (
            <li key={c.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{c.nombre}</strong>
                <p className="m-0 text-muted small">{c.descripcion}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};