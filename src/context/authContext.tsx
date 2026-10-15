import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../type';
import { getStorageData, saveStorageData } from '../services/storege';

interface AuthContextType {
  user: User | null;
  login: (correo: string, pass: string) => { success: boolean; message: string };
  logout: () => void;
  updateProfile: (updatedData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => getStorageData<User | null>('sv_sesion', null));

  useEffect(() => {
    saveStorageData('sv_sesion', user);
  }, [user]);

  const login = (correo: string, pass: string) => {
    const usuarios = getStorageData<User[]>('sv_usuarios', []);
    const userIndex = usuarios.findIndex(u => u.correo.toLowerCase() === correo.toLowerCase());

    if (userIndex === -1) {
      return { success: false, message: 'Credenciales incorrectas o usuario no registrado.' };
    }

    const u = usuarios[userIndex];
    if (u.bloqueado) {
      return { success: false, message: 'Esta cuenta se encuentra BLOQUEADA debido a 3 intentos fallidos.' };
    }

    if (u.password !== pass) {
      u.intentosFallidos += 1;
      if (u.intentosFallidos >= 3) {
        u.bloqueado = true;
        saveStorageData('sv_usuarios', usuarios);
        return { success: false, message: 'Ha alcanzado el límite de 3 intentos. Su cuenta fue BLOQUEADA.' };
      }
      saveStorageData('sv_usuarios', usuarios);
      return { success: false, message: `Contraseña incorrecta. Intentos restantes: ${3 - u.intentosFallidos}` };
    }

    u.intentosFallidos = 0;
    saveStorageData('sv_usuarios', usuarios);
    setUser(u);
    return { success: true, message: `¡Bienvenido/a, ${u.nombre}!` };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sv_sesion');
  };

  const updateProfile = (updatedData: Partial<User>) => {
    if (!user) return;
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);

    const usuarios = getStorageData<User[]>('sv_usuarios', []);
    const idx = usuarios.findIndex(u => u.id === user.id);
    if (idx !== -1) {
      usuarios[idx] = updatedUser;
      saveStorageData('sv_usuarios', usuarios);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);