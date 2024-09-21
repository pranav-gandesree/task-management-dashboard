// app/components/ProtectedRoute.tsx
"use client";
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login'); // Redirect to login if not authenticated
    }
  }, [user, router]);

  return user ? <>{children}</> : null; // Render children if authenticated
};

export default ProtectedRoute;
