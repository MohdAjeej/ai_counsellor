import axios from 'axios';
import { useAuthStore } from '@/lib/store';

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests (use store token if not in localStorage — e.g. after refresh from persist)
api.interceptors.request.use((config) => {
  let token = localStorage.getItem('token');
  if (!token && typeof window !== 'undefined') {
    token = useAuthStore.getState().token ?? null;
    if (token) localStorage.setItem('token', token);
  }
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// On 401: clear session only. Do NOT redirect — user stays on current page.
// Login page is only shown when user clicks "Login" from the landing page.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
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

/** Get token from store or localStorage so we only call auth-required APIs when token exists (avoids 422). */
export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token') ?? useAuthStore.getState().token ?? null;
}

/** Extract list from shortlisted/locked API response. Backend returns { data: [...] }. */
export function getUniversityListFromResponse(res: any): any[] {
  if (!res) return [];
  const body = res.data;
  if (Array.isArray(body)) return body;
  if (body && Array.isArray(body.data)) return body.data;
  return [];
}

// University APIs
export const universityAPI = {
  getAll: (params?: { country?: string; budget_min?: number; budget_max?: number; show_all?: boolean }) =>
    api.get('/api/universities', { params }),
  getById: (id: number) => api.get(`/api/universities/${id}`),
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

