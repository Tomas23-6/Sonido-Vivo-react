import React, { useState } from 'react';
import { useAuth } from '../../context/authContext';
import { useToast } from '../../context/toastContext';

export const Profile: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const { showToast } = useToast();

  const [nombre, setNombre] = useState(user?.nombre ?? '');
  const [apellido, setApellido] = useState(user?.apellido ?? '');
  const [fechaNac, setFechaNac] = useState(user?.fechaNacimiento ?? '');
  const [direccion, setDireccion] = useState(user?.direccion ?? '');
  const [region, setRegion] = useState(user?.region ?? 'Valparaíso');
  const [errorMsg, setErrorMsg] = useState('');

  if (!user) return null;

  const calcularEdad = (fecha: string) => {
    if (!fecha) return 0;
    const hoy = new Date();
    const nac = new Date(fecha);
    let edad = hoy.getFullYear() - nac.getFullYear();
    const m = hoy.getMonth() - nac.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < nac.getDate())) edad--;
    return edad;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (calcularEdad(fechaNac) < 14) {
      setErrorMsg('Debes ser mayor o igual a 14 años.');
      return;
    }

    updateProfile({ nombre, apellido, fechaNacimiento: fechaNac, direccion, region });
    showToast('Perfil actualizado exitosamente', 'success');
  };

  return (
    <div className="container my-5" style={{ maxWidth: '660px' }}>
      <div className="card border-0 shadow-sm p-4 rounded-3">
        <div className="d-flex align-items-center gap-3 mb-4 pb-3 border-bottom">
          <div
            className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center shadow-sm"
            style={{ width: '60px', height: '60px', fontSize: '1.6rem' }}
          >
            👤
          </div>
          <div>
            <h2 className="h4 fw-bold m-0">{user.nombre} {user.apellido}</h2>
            <span className="badge bg-primary bg-opacity-10 text-primary mt-1">
              Rol: {user.rol.toUpperCase()}
            </span>
          </div>
        </div>

        {errorMsg && <div className="alert alert-danger small py-2">{errorMsg}</div>}

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Nombre</label>
              <input type="text" className="form-control" value={nombre} onChange={e => setNombre(e.target.value)} required />
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Apellido</label>
              <input type="text" className="form-control" value={apellido} onChange={e => setApellido(e.target.value)} required />
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Correo (No modificable)</label>
              <input type="email" className="form-control bg-light" value={user.correo} disabled />
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-semibold">
                Fecha Nacimiento ({calcularEdad(fechaNac)} años)
              </label>
              <input type="date" className="form-control" value={fechaNac} onChange={e => setFechaNac(e.target.value)} required />
            </div>
            <div className="col-md-8">
              <label className="form-label small fw-semibold">Dirección</label>
              <input type="text" className="form-control" value={direccion} onChange={e => setDireccion(e.target.value)} required />
            </div>
            <div className="col-md-4">
              <label className="form-label small fw-semibold">Región</label>
              <select className="form-select" value={region} onChange={e => setRegion(e.target.value)}>
                <option value="Valparaíso">Valparaíso</option>
                <option value="Metropolitana">Metropolitana</option>
                <option value="Biobío">Biobío</option>
              </select>
            </div>
          </div>
          <button type="submit" className="btn btn-success mt-4 w-100 fw-bold">Guardar Cambios</button>
        </form>
      </div>
    </div>
  );
};