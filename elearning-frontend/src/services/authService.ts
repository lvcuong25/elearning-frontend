import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { LoginCredentials } from '../types/auth';
import { api } from './api';

// React Query hook for login
export const useLogin = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      return await api.post('/c/954e-997d-44a7-936b', credentials);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};


