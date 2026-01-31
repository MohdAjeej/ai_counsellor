'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { GraduationCap, LogOut, User, Search, GitCompare, ChevronDown, HelpCircle, LayoutDashboard } from 'lucide-react';

export default function Navbar() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setProfileOpen(false);
    logout();
    router.push('/');
  };

  return (
    <nav className="bg-white/95 backdrop-blur border-b border-slate-200/80 sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link
            href={user?.is_onboarded ? "/dashboard" : "/"}
            className="flex items-center gap-2.5 group"
            title={user?.is_onboarded ? "Dashboard (Home)" : "Home"}
          >
            <div className="w-9 h-9 rounded-xl bg-primary-100 flex items-center justify-center group-hover:bg-primary-200 transition-colors">
              <GraduationCap className="w-5 h-5 text-primary-600" />
            </div>
            <span className="font-display text-xl font-bold text-slate-900">AI Counsellor</span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            {user && (
              <>
                <Link
                  href="/dashboard"
                  className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                  title="Dashboard"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span className="text-sm font-medium">Dashboard</span>
                </Link>
                <Link
                  href="/help"
                  className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                  title="Help & FAQ"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">Help</span>
                </Link>
                <Link
                  href="/universities"
                  className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                  title="Discover Universities"
                >
                  <Search className="w-4 h-4" />
                  <span className="text-sm font-medium">Discover</span>
                </Link>
                <Link
                  href="/compare"
                  className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                  title="Compare Universities"
                >
                  <GitCompare className="w-4 h-4" />
                  <span className="text-sm font-medium">Compare</span>
                </Link>
                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setProfileOpen((o) => !o)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 text-slate-700 hover:bg-slate-100 transition-colors"
                    title="Profile menu"
                  >
                    <User className="w-4 h-4 text-slate-500" />
                    <span className="text-sm font-medium max-w-[120px] truncate">{user.full_name}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {profileOpen && (
                    <div className="absolute right-0 top-full mt-1 py-1 w-48 bg-white rounded-xl border border-slate-200 shadow-lg z-50">
                      <Link
                        href="/profile"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 rounded-lg mx-1"
                      >
                        <User className="w-4 h-4 text-slate-500" />
                        Edit profile
                      </Link>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 rounded-lg mx-1 text-left"
                      >
                        <LogOut className="w-4 h-4 text-slate-500" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

