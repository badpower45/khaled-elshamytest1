import React, { createContext, useContext, useEffect, useState } from 'react';

type AuthContextType = {
  isAuthenticated: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// NOTE: For simplicity this uses a hardcoded password. Assumption: this project
// needs a simple client-side gate for the admin panel. Change this to real
// server-side auth for production.
const HARDCODED_PASSWORD = 'admin123';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem('isAuthenticated') === '1';
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    // Automatically authenticate for admin panel
    if (window.location.pathname.includes('/admin')) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    try {
      if (isAuthenticated) localStorage.setItem('isAuthenticated', '1');
      else localStorage.removeItem('isAuthenticated');
    } catch (e) {}
  }, [isAuthenticated]);

  const login = async (password: string) => {
    // simple check — replace with API call if needed
    const ok = password === HARDCODED_PASSWORD;
    setIsAuthenticated(ok);
    return ok;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export default AuthContext;
