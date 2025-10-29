import React, { createContext, useContext, useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { User, LoginCredentials } from '../types/auth';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => void;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth phải được sử dụng trong AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    // Load user from localStorage on mount
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const queryClient = useQueryClient();
  const isAuthenticated = !!user;

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // Hardcoded login mutation with TanStack Query
  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (credentials.email === 'emily.johnson@x.dummyjson.com' && credentials.password === 'emilyspass123') {
        return {
          id: 1,
          username: 'emilys',
          email: 'emily.johnson@x.dummyjson.com',
          firstName: 'Emily',
          lastName: 'Johnson',
          gender: 'female',
          image: 'https://dummyjson.com/icon/emilys/128',
          accessToken: 'dummy-token',
          refreshToken: 'dummy-refresh-token',
          role: 'admin'
        };
      } else {
        throw new Error('Tên đăng nhập hoặc mật khẩu không đúng');
      }
    },
    onSuccess: (data) => {
      setUser(data);
      // Invalidate user-related queries
      queryClient.invalidateQueries({ queryKey: ['user'] });
    }
  });

  const login = (credentials: LoginCredentials) => {
    loginMutation.mutate(credentials);
  };

  const logout = () => {
    setUser(null);
    // Invalidate all queries on logout
    queryClient.clear();
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    login,
    logout,
    isLoading: loginMutation.isPending,
    error: loginMutation.error?.message || null
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};