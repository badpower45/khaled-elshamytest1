import React, { createContext, useContext, useEffect, useState } from 'react';

type AuthContextType = {
  isAuthenticated: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Load admin password from environment variables
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

if (!ADMIN_PASSWORD) {
  console.error('VITE_ADMIN_PASSWORD is not set in Replit Secrets. Admin login will not work.');
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      const authData = localStorage.getItem('adminAuth');
      if (!authData) return false;
      
      const { timestamp } = JSON.parse(authData);
      const oneHour = 60 * 60 * 1000;
      
      // Session expires after 1 hour
      if (Date.now() - timestamp > oneHour) {
        localStorage.removeItem('adminAuth');
        return false;
      }
      
      return true;
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    try {
      if (isAuthenticated) {
        localStorage.setItem('adminAuth', JSON.stringify({ timestamp: Date.now() }));
      } else {
        localStorage.removeItem('adminAuth');
      }
    } catch (e) {}
  }, [isAuthenticated]);

  const login = async (password: string) => {
    if (!ADMIN_PASSWORD) {
      console.error('Admin password not configured');
      return false;
    }
    
    const ok = password === ADMIN_PASSWORD;
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
