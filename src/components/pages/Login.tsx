import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { useToast } from '../../context/toastContext';

export const Login: React.FC = () => {
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const from = (location.state as { from?: string })?.from || '/';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const res = login(correo, password);
    if (res.success) {
      showToast(res.message, 'success');
      navigate(from, { replace: true });
    } else {
      setErrorMsg(res.message);
    }
  };

  return (
    <div className="container my-5" style={{ maxWidth: '440px' }}>
      <div className="card border-0 shadow-sm p-4 rounded-3">
        <div className="text-center mb-4">
          <span className="fs-2">🎸</span>
          <h2 className="h4 fw-bold mt-2 mb-1">Iniciar Sesión</h2>
          <p className="text-muted small">Ingresa con tu cuenta institucional Duoc UC</p>
        </div>

        {errorMsg && <div className="alert alert-danger small py-2">{errorMsg}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label small fw-semibold">Correo Electrónico</label>
            <input
              type="email"
              className="form-control"
              placeholder="usuario@duoc.cl"
              value={correo}
              onChange={e => setCorreo(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="form-label small fw-semibold">Contraseña</label>
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

        <p className="mt-4 text-center small text-muted mb-0">
          ¿No tienes cuenta? <Link to="/registro" className="fw-semibold text-decoration-none">Regístrate aquí</Link>
        </p>
      </div>
    </div>
  );
};