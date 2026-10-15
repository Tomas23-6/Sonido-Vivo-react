import React, { useState } from 'react';
import { useAuth } from '../context/authContext';

export const Profile: React.FC = () => {
  const { user, updateProfile } = useAuth();

  if (!user) return <div className="container my-5 alert alert-warning">Debe iniciar sesión para ver su perfil.</div>;

  const [nombre, setNombre] = useState(user.nombre);
  const [apellido, setApellido] = useState(user.apellido);
  const [fechaNac, setFechaNac] = useState(user.fechaNacimiento);
  const [direccion, setDireccion] = useState(user.direccion);
  const [region, setRegion] = useState(user.region);
  const [mensaje, setMensaje] = useState('');

  // Cálculo dinámico de edad
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
    if (calcularEdad(fechaNac) < 14) {
      alert('Debes ser mayor o igual a 14 años.');
      return;
    }
    updateProfile({ nombre, apellido, fechaNacimiento: fechaNac, direccion, region });
    setMensaje('Perfil actualizado exitosamente.');
    setTimeout(() => setMensaje(''), 3000);
  };

  return (
    <div className="container my-5" style={{ maxWidth: '650px' }}>
      <div className="card shadow p-4">
        <div className="d-flex align-items-center gap-3 mb-4">
          <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px', fontSize: '1.8rem' }}>
            👤
          </div>
          <div>
            <h2 className="h4 m-0">{user.nombre} {user.apellido}</h2>
            <span className="badge bg-info text-dark">Rol: {user.rol.toUpperCase()}</span>
          </div>
        </div>

        {mensaje && <div className="alert alert-success">{mensaje}</div>}

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label fw-bold">Nombre</label>
              <input type="text" className="form-control" value={nombre} onChange={e => setNombre(e.target.value)} required />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-bold">Apellido</label>
              <input type="text" className="form-control" value={apellido} onChange={e => setApellido(e.target.value)} required />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-bold">Correo (No modificable)</label>
              <input type="email" className="form-control" value={user.correo} disabled />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-bold">Fecha Nacimiento (Edad: {calcularEdad(fechaNac)} años)</label>
              <input type="date" className="form-control" value={fechaNac} onChange={e => setFechaNac(e.target.value)} required />
            </div>
            <div className="col-md-8">
              <label className="form-label fw-bold">Dirección</label>
              <input type="text" className="form-control" value={direccion} onChange={e => setDireccion(e.target.value)} required />
            </div>
            <div className="col-md-4">
              <label className="form-label fw-bold">Región</label>
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