// app/context/AuthContext.tsx

"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  token: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ token });
    } else {
      router.push('/login'); // Redirect to login if not authenticated
    }
  }, [router]);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('token', userData.token);
    router.push('/dashboard'); // Redirect after login
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    router.push('/signin'); // Redirect to login on logout
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
