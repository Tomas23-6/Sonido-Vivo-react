import React, { useState } from 'react';
import { User } from '../type';
import { getStorageData, saveStorageData } from '../services/storege';

interface RegisterProps {
  setCurrentView: (view: string) => void;
}

export const Register: React.FC<RegisterProps> = ({ setCurrentView }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [fechaNac, setFechaNac] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [direccion, setDireccion] = useState('');
  const [region, setRegion] = useState('Valparaíso');
  const [genero, setGenero] = useState('Otro');
  const [terminos, setTerminos] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const calcularEdad = (fecha: string) => {
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
      setErrorMsg('Debes tener al menos 14 años para registrarte.');
      return;
    }

    if (!correo.toLowerCase().endsWith('@duoc.cl')) {
      setErrorMsg('El correo electrónico debe pertenecer al dominio @duoc.cl');
      return;
    }

    const passRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passRegex.test(password)) {
      setErrorMsg('La contraseña debe tener mínimo 8 caracteres, 1 mayúscula y 1 número.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('Las contraseñas no coinciden.');
      return;
    }

    if (!terminos) {
      setErrorMsg('Debe aceptar los términos y condiciones.');
      return;
    }

    const usuarios = getStorageData<User[]>('sv_usuarios', []);
    if (usuarios.some(u => u.correo.toLowerCase() === correo.toLowerCase())) {
      setErrorMsg('Este correo ya se encuentra registrado.');
      return;
    }

    const nuevoUsuario: User = {
      id: Date.now().toString(),
      nombre,
      apellido,
      fechaNacimiento: fechaNac,
      correo,
      password,
      direccion,
      region,
      genero,
      rol: 'cliente', // El registro público genera siempre rol cliente
      intentosFallidos: 0,
      bloqueado: false
    };

    usuarios.push(nuevoUsuario);
    saveStorageData('sv_usuarios', usuarios);

    alert('¡Registro exitoso! Ya puedes iniciar sesión.');
    setCurrentView('login');
  };

  return (
    <div className="container my-5" style={{ maxWidth: '600px' }}>
      <div className="card shadow p-4">
        <h2 className="h4 text-center mb-4">Registro de Usuario</h2>
        {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
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
              <label className="form-label fw-bold">Fecha de Nacimiento</label>
              <input type="date" className="form-control" value={fechaNac} onChange={e => setFechaNac(e.target.value)} required />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-bold">Correo (@duoc.cl)</label>
              <input type="email" className="form-control" placeholder="usuario@duoc.cl" value={correo} onChange={e => setCorreo(e.target.value)} required />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-bold">Contraseña</label>
              <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-bold">Confirmar Contraseña</label>
              <input type="password" className="form-control" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
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
            <div className="col-12">
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="terms" checked={terminos} onChange={e => setTerminos(e.target.checked)} />
                <label className="form-check-label" htmlFor="terms">Acepto los términos y condiciones</label>
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-100 fw-bold mt-4">Registrarse</button>
        </form>
      </div>
    </div>
  );
};