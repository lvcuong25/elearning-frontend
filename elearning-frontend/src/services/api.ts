import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const API_BASE_URL = 'https://dummyjson.com';

// Tạo axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Base API functions (internal use only)
const api = {
  get: (endpoint: string) => apiClient.get(endpoint).then(res => res.data),
  post: (endpoint: string, data?: any) => apiClient.post(endpoint, data).then(res => res.data),
  put: (endpoint: string, data?: any) => apiClient.put(endpoint, data).then(res => res.data),
  delete: (endpoint: string) => apiClient.delete(endpoint).then(res => res.data),
};

// React Query hooks
export const useApiQuery = (queryKey: string[], queryFn: () => Promise<any>, options?: any) => {
  return useQuery({
    queryKey,
    queryFn,
    ...options,
  });
};

export const useApiMutation = (mutationFn: (variables: any) => Promise<any>, options?: any) => {
  return useMutation({
    mutationFn,
    ...options,
  });
};

export const useApiQueryClient = () => {
  return useQueryClient();
};

// Export api for internal use in services
export { api };
