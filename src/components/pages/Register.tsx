import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User } from '../../type';
import { getStorageData, saveStorageData, STORE_EVENTS } from '../../services/storage';
import { useToast } from '../../context/toastContext';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

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

  const calcularEdad = (fecha: string): number | null => {
    if (!fecha) return null;
    const hoy = new Date();
    const nac = new Date(`${fecha}T00:00:00`);
    if (Number.isNaN(nac.getTime())) return null;
    let edad = hoy.getFullYear() - nac.getFullYear();
    const m = hoy.getMonth() - nac.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < nac.getDate())) edad--;
    return edad;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const edad = calcularEdad(fechaNac);
    if (edad === null || edad < 14) {
      setErrorMsg('Ingresa una fecha de nacimiento válida. Debes tener al menos 14 años para registrarte.');
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
    if (usuarios.some(u => u.correo.toLowerCase() === correo.trim().toLowerCase())) {
      setErrorMsg('Este correo ya se encuentra registrado.');
      return;
    }

    const nuevoUsuario: User = {
      id: Date.now().toString(),
      nombre: nombre.trim(),
      apellido: apellido.trim(),
      fechaNacimiento: fechaNac,
      correo: correo.trim(),
      password,
      direccion: direccion.trim(),
      region,
      genero,
      rol: 'cliente',
      activo: true,
      intentosFallidos: 0,
      bloqueado: false
    };

    const updatedUsers = [...usuarios, nuevoUsuario];
    saveStorageData('sv_usuarios', updatedUsers, STORE_EVENTS.USERS);

    showToast('¡Registro exitoso! Ya puedes iniciar sesión.', 'success');
    navigate('/login');
  };

  return (
    <div className="container my-5" style={{ maxWidth: '620px' }}>
      <div className="card border-0 shadow-sm p-4 rounded-3">
        <h2 className="h4 fw-bold text-center mb-1">Registro de Usuario</h2>
        <p className="text-muted text-center small mb-4">Crea tu cuenta en Sonido Vivo</p>

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
              <label className="form-label small fw-semibold">Fecha de Nacimiento</label>
              <input type="date" className="form-control" value={fechaNac} onChange={e => setFechaNac(e.target.value)} required />
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Correo Electrónico</label>
              <input
                type="email"
                className="form-control"
                placeholder="cliente@correo.cl"
                value={correo}
                onChange={e => setCorreo(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Contraseña</label>
              <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Confirmar Contraseña</label>
              <input type="password" className="form-control" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
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
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Género</label>
              <select className="form-select" value={genero} onChange={e => setGenero(e.target.value)}>
                <option value="Otro">Otro / Prefiero no decir</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </select>
            </div>
            <div className="col-12">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="terms"
                  checked={terminos}
                  onChange={e => setTerminos(e.target.checked)}
                />
                <label className="form-check-label small" htmlFor="terms">
                  Acepto los términos y condiciones de Sonido Vivo
                </label>
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-100 fw-bold mt-4">Registrarse</button>
        </form>

        <p className="mt-3 text-center small text-muted mb-0">
          ¿Ya tienes una cuenta? <Link to="/login" className="fw-semibold text-decoration-none">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
};