import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../type';
import { getStorageData, saveStorageData, STORE_EVENTS } from '../services/storage';

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
    const userIndex = usuarios.findIndex(u => u.correo.toLowerCase() === correo.trim().toLowerCase());

    if (userIndex === -1) {
      return { success: false, message: 'Credenciales incorrectas o usuario no registrado.' };
    }

    const currentUser = usuarios[userIndex];

    if (currentUser.activo === false) {
      return { success: false, message: 'Esta cuenta se encuentra desactivada. Contacta al administrador.' };
    }

    if (currentUser.bloqueado) {
      return { success: false, message: 'Esta cuenta se encuentra BLOQUEADA debido a 3 intentos fallidos.' };
    }

    if (currentUser.password !== pass) {
      const nuevosIntentos = currentUser.intentosFallidos + 1;
      const debeBloquear = nuevosIntentos >= 3;
      const updatedUser: User = {
        ...currentUser,
        intentosFallidos: nuevosIntentos,
        bloqueado: debeBloquear
      };
      const updatedList = usuarios.map((u, idx) => (idx === userIndex ? updatedUser : u));
      saveStorageData('sv_usuarios', updatedList, STORE_EVENTS.USERS);

      if (debeBloquear) {
        return { success: false, message: 'Has alcanzado el límite de 3 intentos. Tu cuenta fue BLOQUEADA.' };
      }
      return { success: false, message: `Contraseña incorrecta. Intentos restantes: ${3 - nuevosIntentos}` };
    }

    const cleanUser: User = {
      ...currentUser,
      intentosFallidos: 0,
      bloqueado: false
    };
    const updatedList = usuarios.map((u, idx) => (idx === userIndex ? cleanUser : u));
    saveStorageData('sv_usuarios', updatedList, STORE_EVENTS.USERS);
    setUser(cleanUser);
    return { success: true, message: `¡Bienvenido/a, ${cleanUser.nombre}!` };
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
      saveStorageData('sv_usuarios', usuarios, STORE_EVENTS.USERS);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);