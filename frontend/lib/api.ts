import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  register: (data: { email: string; password: string; full_name: string }) =>
    api.post('/api/auth/register', data),
  login: (email: string, password: string) =>
    api.post('/api/auth/login', new URLSearchParams({ username: email, password }), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }),
  getMe: () => api.get('/api/auth/me'),
};

// Profile APIs
export const profileAPI = {
  create: (data: any) => api.post('/api/profile', data),
  get: () => api.get('/api/profile'),
};

// Counsellor APIs
export const counsellorAPI = {
  chat: (message: string) => api.post('/api/counsellor/chat', { message }),
  getAnalysis: () => api.get('/api/counsellor/analysis'),
};

// University APIs
export const universityAPI = {
  getAll: (params?: { country?: string; budget_min?: number; budget_max?: number; show_all?: boolean }) =>
    api.get('/api/universities', { params }),
  shortlist: (data: { university_id: number; category: string; notes?: string }) =>
    api.post('/api/universities/shortlist', data),
  getShortlisted: () => api.get('/api/universities/shortlisted'),
  lock: (data: { university_id: number }) => api.post('/api/universities/lock', data),
  getLocked: () => api.get('/api/universities/locked'),
  unlock: (university_id: number) => api.delete(`/api/universities/lock/${university_id}`),
};

// Todo APIs
export const todoAPI = {
  getAll: () => api.get('/api/todos'),
  create: (data: any) => api.post('/api/todos', data),
  update: (id: number, data: any) => api.patch(`/api/todos/${id}`, data),
  delete: (id: number) => api.delete(`/api/todos/${id}`),
};

export default api;

