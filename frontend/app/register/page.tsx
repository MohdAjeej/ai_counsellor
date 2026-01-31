'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store';
import { authAPI } from '@/lib/api';
import { GraduationCap, Eye, EyeOff } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { setUser, setToken } = useAuthStore();
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await authAPI.register({
        email: formData.email,
        password: formData.password,
        full_name: formData.full_name,
      });

      // Auto-login after registration for a seamless experience
      const loginResponse = await authAPI.login(formData.email, formData.password);
      const { access_token } = loginResponse.data;
      
      setToken(access_token);
      
      const userResponse = await authAPI.getMe();
      setUser(userResponse.data);
      
      // Redirect to dashboard; dashboard will send new users to onboarding if needed
      router.push('/dashboard');
    } catch (err: any) {
      console.error('Registration error:', err);
      
      // More specific error messages
      if (err.response) {
        // Server responded with error
        const errorDetail = err.response.data?.detail || err.response.data?.message;
        if (errorDetail) {
          setError(errorDetail);
        } else if (err.response.status === 400) {
          setError('Invalid data. Please check your information and try again.');
        } else if (err.response.status === 409) {
          setError('Email already registered. Please use a different email or login.');
        } else if (err.response.status === 500) {
          setError('Server error. Please try again later.');
        } else {
          setError(`Registration failed: ${err.response.status} ${err.response.statusText}`);
        }
      } else if (err.request) {
        // Request was made but no response received
        setError('Cannot connect to server. Please make sure the backend is running on http://localhost:8000');
      } else {
        // Something else happened
        setError(err.message || 'Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="flex items-center justify-center mb-6">
          <GraduationCap className="w-12 h-12 text-primary-600" />
        </div>
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">Create Account</h1>
        <p className="text-center text-gray-600 mb-8">Start your study-abroad journey today</p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              id="full_name"
              name="full_name"
              type="text"
              value={formData.full_name}
              onChange={handleChange}
              required
              autoComplete="name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="John Doe"
              suppressHydrationWarning
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="you@example.com"
              suppressHydrationWarning
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="new-password"
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="••••••••"
                suppressHydrationWarning
              />
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setShowPassword(!showPassword);
                }}
                onMouseDown={(e) => e.preventDefault()}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none z-10"
                aria-label={showPassword ? "Hide password" : "Show password"}
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                autoComplete="new-password"
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="••••••••"
                suppressHydrationWarning
              />
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setShowConfirmPassword(!showConfirmPassword);
                }}
                onMouseDown={(e) => e.preventDefault()}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none z-10"
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                tabIndex={-1}
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-primary-600 hover:text-primary-700 font-semibold">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

