import { useAuth as useAuthContext } from '../contexts/AuthContext';

// Custom hook để tái sử dụng logic authentication

export const useAuth = () => {
  const authContext = useAuthContext();
  const isLoggedIn = authContext.isAuthenticated;
  
  return {
    ...authContext,
    isLoggedIn,
  };
};