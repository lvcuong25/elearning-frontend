import type { LoginCredentials } from '../types/auth';
import { post } from './api';

// Login API - POST method
export const login = async (credentials: LoginCredentials) => {
  return await post('/c/954e-997d-44a7-936b', credentials);
};


