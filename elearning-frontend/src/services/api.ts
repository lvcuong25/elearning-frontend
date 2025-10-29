const API_BASE_URL = 'https://dummyjson.com';

// Base fetch wrapper
export const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP Error! Status: ${response.status}`);
  }

  return await response.json();
};

// GET request
export const get = (endpoint: string, options?: RequestInit) => {
  return apiRequest(endpoint, { ...options, method: 'GET' });
};

// POST request
export const post = (endpoint: string, data?: any, options?: RequestInit) => {
  return apiRequest(endpoint, {
    ...options,
    method: 'POST',
    body: data ? JSON.stringify(data) : undefined,
  });
};

// PUT request
export const put = (endpoint: string, data?: any, options?: RequestInit) => {
  return apiRequest(endpoint, {
    ...options,
    method: 'PUT',
    body: data ? JSON.stringify(data) : undefined,
  });
};

// DELETE request
export const del = (endpoint: string, options?: RequestInit) => {
  return apiRequest(endpoint, { ...options, method: 'DELETE' });
};
