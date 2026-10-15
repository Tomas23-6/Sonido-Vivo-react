import React, { useState } from 'react';
import { useAuth } from '../context/authContext';

interface LoginProps {
  setCurrentView: (view: string) => void;
}

export const Login: React.FC<LoginProps> = ({ setCurrentView }) => {
  const { login } = useAuth();
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const res = login(correo, password);
    if (res.success) {
      alert(res.message);
      setCurrentView('home');
    } else {
      setErrorMsg(res.message);
    }
  };

  return (
    <div className="container my-5" style={{ maxWidth: '450px' }}>
      <div className="card shadow p-4">
        <h2 className="h4 text-center mb-4">Iniciar Sesión</h2>
        {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold">Correo Electrónico</label>
            <input
              type="email"
              className="form-control"
              placeholder="usuario@duoc.cl"
              value={correo}
              onChange={e => setCorreo(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Contraseña</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 fw-bold">Ingresar</button>
        </form>
        <p className="mt-3 text-center mb-0">
          ¿No tienes cuenta? <button className="btn btn-link p-0" onClick={() => setCurrentView('registro')}>Regístrate aquí</button>
        </p>
      </div>
    </div>
  );
};