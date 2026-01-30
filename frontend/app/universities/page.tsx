'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { universityAPI } from '@/lib/api';
import { getCurrencyForCountry, getCurrencyName, getCurrencySymbol } from '@/lib/countryCurrency';
import Navbar from '@/components/Navbar';
import { Search, MapPin, Target, Lock, Unlock, ExternalLink, Globe, Banknote } from 'lucide-react';

interface University {
  id: number;
  name: string;
  country: string;
  city?: string;
  ranking?: number;
  acceptance_rate?: number;
  tuition_min?: number;
  tuition_max?: number;
  currency?: string;
  min_gpa?: number;
  description?: string;
  website?: string;
}

export default function UniversitiesPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [universities, setUniversities] = useState<University[]>([]);
  const [shortlisted, setShortlisted] = useState<number[]>([]);
  const [locked, setLocked] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ country: '', budget_min: '', budget_max: '' });
  const [showShortlistModal, setShowShortlistModal] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);
  const [shortlistCategory, setShortlistCategory] = useState('target');
  const [shortlistNotes, setShortlistNotes] = useState('');

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    if (!user.is_onboarded) {
      router.push('/onboarding');
      return;
    }
    loadUniversities();
    loadShortlisted();
    loadLocked();
  }, [user, router]);

  const loadUniversities = async () => {
    try {
      const params: any = {};
      if (filter.country) params.country = filter.country;
      if (filter.budget_min) params.budget_min = parseFloat(filter.budget_min);
      if (filter.budget_max) params.budget_max = parseFloat(filter.budget_max);
      
      const response = await universityAPI.getAll(params);
      setUniversities(response.data);
    } catch (error) {
      console.error('Error loading universities:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadShortlisted = async () => {
    try {
      const response = await universityAPI.getShortlisted();
      setShortlisted(response.data.map((u: University) => u.id));
    } catch (error) {
      console.error('Error loading shortlisted:', error);
    }
  };

  const loadLocked = async () => {
    try {
      const response = await universityAPI.getLocked();
      setLocked(response.data.map((u: University) => u.id));
    } catch (error) {
      console.error('Error loading locked:', error);
    }
  };

  const handleShortlist = async () => {
    if (!selectedUniversity) return;
    
    try {
      await universityAPI.shortlist({
        university_id: selectedUniversity.id,
        category: shortlistCategory,
        notes: shortlistNotes,
      });
      setShortlisted([...shortlisted, selectedUniversity.id]);
      setShowShortlistModal(false);
      setSelectedUniversity(null);
      setShortlistNotes('');
    } catch (error: any) {
      alert(error.response?.data?.detail || 'Failed to shortlist university');
    }
  };

  const handleLock = async (universityId: number) => {
    if (!shortlisted.includes(universityId)) {
      alert('Please shortlist the university first');
      return;
    }
    
    if (!confirm('Are you sure you want to lock this university? This is a commitment step.')) {
      return;
    }
    
    try {
      await universityAPI.lock({ university_id: universityId });
      setLocked([...locked, universityId]);
      alert('University locked successfully! You can now access application guidance.');
    } catch (error: any) {
      alert(error.response?.data?.detail || 'Failed to lock university');
    }
  };

  const handleUnlock = async (universityId: number) => {
    if (!confirm('Are you sure you want to unlock this university? You will lose access to application guidance for this university.')) {
      return;
    }
    
    try {
      await universityAPI.unlock(universityId);
      setLocked(locked.filter(id => id !== universityId));
    } catch (error: any) {
      alert(error.response?.data?.detail || 'Failed to unlock university');
    }
  };

  const applyFilters = () => {
    setLoading(true);
    loadUniversities();
  };

  if (!user || loading && universities.length === 0) {
    return (
      <div className="min-h-screen bg-surface-50">
        <Navbar />
        <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center">
          <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
          <p className="mt-4 font-medium text-slate-600">Finding universities...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-50">
      <Navbar />

      {/* Hero */}
      <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white">
        <div className="container mx-auto px-4 py-10 md:py-14">
          <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
            Discover Universities
          </h1>
          <p className="mt-2 text-primary-100 text-lg max-w-xl">
            Search by country and budget. Tuition is shown in each university&apos;s local currency.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-4 relative z-10 pb-12">
        {/* Filters card */}
        <div className="bg-white rounded-2xl shadow-card border border-slate-200/80 p-6 mb-6">
          <div className="flex flex-wrap items-end gap-4">
            <div className="flex-1 min-w-[180px]">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Country</label>
              <input
                type="text"
                value={filter.country}
                onChange={(e) => setFilter({ ...filter, country: e.target.value })}
                placeholder="e.g. India, United States"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 transition-all outline-none"
              />
              {filter.country.trim() && getCurrencyForCountry(filter.country) && (
                <p className="mt-1.5 flex items-center gap-1.5 text-xs text-primary-700">
                  <Banknote className="w-3.5 h-3.5" />
                  {getCurrencyForCountry(filter.country)!.name} ({getCurrencyForCountry(filter.country)!.code})
                </p>
              )}
            </div>
            <div className="w-32">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Min budget</label>
              <input
                type="number"
                value={filter.budget_min}
                onChange={(e) => setFilter({ ...filter, budget_min: e.target.value })}
                placeholder={filter.country.trim() && getCurrencyForCountry(filter.country) ? getCurrencyForCountry(filter.country)?.code : '—'}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 transition-all outline-none"
              />
            </div>
            <div className="w-32">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Max budget</label>
              <input
                type="number"
                value={filter.budget_max}
                onChange={(e) => setFilter({ ...filter, budget_max: e.target.value })}
                placeholder={filter.country.trim() && getCurrencyForCountry(filter.country) ? getCurrencyForCountry(filter.country)?.code : '—'}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 transition-all outline-none"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={applyFilters}
                className="px-5 py-2.5 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 active:scale-[0.98] transition-all shadow-sm"
              >
                Apply
              </button>
              <button
                onClick={async () => {
                  setFilter({ country: '', budget_min: '', budget_max: '' });
                  setLoading(true);
                  try {
                    const response = await universityAPI.getAll({ show_all: true });
                    setUniversities(response.data);
                  } catch (e) {
                    console.error(e);
                  } finally {
                    setLoading(false);
                  }
                }}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors"
              >
                Clear all
              </button>
            </div>
          </div>
        </div>

        {/* Results banner */}
        {filter.country.trim() && universities.length > 0 && getCurrencyForCountry(filter.country) && (
          <div className="mb-5 flex items-center gap-3 px-4 py-3 rounded-xl bg-primary-50 border border-primary-100 text-primary-800">
            <Search className="w-5 h-5 text-primary-600 shrink-0" />
            <span className="font-medium">Showing universities in {filter.country}</span>
            <span className="text-primary-600">·</span>
            <span className="text-sm">Tuition in {getCurrencyForCountry(filter.country)!.name} ({getCurrencyForCountry(filter.country)!.code})</span>
          </div>
        )}
        {!filter.country.trim() && universities.length > 0 && (
          <p className="mb-5 text-sm text-slate-500">Tuition in each university&apos;s local currency.</p>
        )}

        {/* University cards */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {universities.map((university) => (
            <article
              key={university.id}
              className="group bg-white rounded-2xl shadow-card border border-slate-200/80 overflow-hidden hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 flex flex-col"
            >
              {/* Left accent bar */}
              <div className="flex">
                <div className="w-1.5 shrink-0 bg-gradient-to-b from-primary-400 to-primary-600" />
                <div className="flex-1 p-5">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="font-display font-bold text-slate-900 text-lg leading-tight line-clamp-2">
                      {university.name}
                    </h3>
                    {university.ranking != null && (
                      <span className="shrink-0 px-2.5 py-1 rounded-full bg-primary-100 text-primary-700 text-xs font-semibold">
                        #{university.ranking}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500 text-sm mb-3">
                    <MapPin className="w-4 h-4 shrink-0 text-slate-400" />
                    <span>{university.city ? `${university.city}, ` : ''}{university.country}</span>
                  </div>
                  {university.description && (
                    <p className="text-slate-600 text-sm leading-relaxed line-clamp-2 mb-4">
                      {university.description}
                    </p>
                  )}

                  {/* Stats row */}
                  <div className="flex flex-wrap gap-3 mb-4">
                    {university.acceptance_rate != null && (
                      <span className="text-sm text-slate-600">
                        Acceptance <strong className="text-slate-800">{(university.acceptance_rate * 100).toFixed(0)}%</strong>
                      </span>
                    )}
                    {university.min_gpa != null && (
                      <span className="text-sm text-slate-600">
                        Min GPA <strong className="text-slate-800">{university.min_gpa}</strong>
                      </span>
                    )}
                  </div>

                  {/* Tuition strip */}
                  {university.tuition_min != null && (
                    <div className="rounded-xl bg-slate-50 border border-slate-100 px-3 py-2.5 mb-4">
                      <div className="flex items-baseline gap-1.5 text-sm">
                        <span className="font-semibold text-slate-800" aria-hidden="true">
                          {getCurrencySymbol(university.currency || 'USD')}
                        </span>
                        <span className="text-slate-700">
                          {university.tuition_min.toLocaleString()}
                          {university.tuition_max && university.tuition_max !== university.tuition_min
                            ? ` – ${university.tuition_max.toLocaleString()}`
                            : ''}{' '}
                          <span className="text-slate-500">
                            {getCurrencyName(university.currency || 'USD')} / year
                          </span>
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Links */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {university.website && (
                      <a
                        href={university.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-primary-700 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
                      >
                        <Globe className="w-3.5 h-3.5" />
                        Website
                      </a>
                    )}
                    <a
                      href={`https://www.google.com/search?q=${encodeURIComponent(university.name + ' university')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Google
                    </a>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 mt-auto pt-2 border-t border-slate-100">
                    {!shortlisted.includes(university.id) ? (
                      <button
                        onClick={() => {
                          setSelectedUniversity(university);
                          setShowShortlistModal(true);
                        }}
                        className="flex-1 px-4 py-2.5 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 active:scale-[0.98] flex items-center justify-center gap-2 transition-all"
                      >
                        <Target className="w-4 h-4" />
                        Shortlist
                      </button>
                    ) : (
                      <span className="flex-1 px-4 py-2.5 rounded-xl bg-emerald-50 text-emerald-700 text-center text-sm font-semibold border border-emerald-200">
                        Shortlisted
                      </span>
                    )}
                    {locked.includes(university.id) ? (
                      <button
                        onClick={() => handleUnlock(university.id)}
                        className="px-4 py-2.5 rounded-xl border border-red-200 text-red-600 font-medium hover:bg-red-50 flex items-center gap-2 transition-colors"
                      >
                        <Unlock className="w-4 h-4" />
                        Unlock
                      </button>
                    ) : shortlisted.includes(university.id) ? (
                      <button
                        onClick={() => handleLock(university.id)}
                        className="px-4 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 flex items-center gap-2 transition-colors"
                      >
                        <Lock className="w-4 h-4" />
                        Lock
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Empty state */}
        {universities.length === 0 && (
          <div className="text-center py-16 px-4">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="font-display font-bold text-slate-800 text-xl mb-2">No universities found</h3>
            <p className="text-slate-500 max-w-sm mx-auto">Try a different country or broaden your budget range.</p>
          </div>
        )}
      </div>

      {/* Shortlist modal */}
      {showShortlistModal && selectedUniversity && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-soft border border-slate-200 p-6 max-w-md w-full">
            <h2 className="font-display text-xl font-bold text-slate-900 mb-1">Shortlist university</h2>
            <p className="text-slate-600 text-sm mb-6">{selectedUniversity.name}</p>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Category</label>
                <select
                  value={shortlistCategory}
                  onChange={(e) => setShortlistCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 outline-none"
                >
                  <option value="dream">Dream</option>
                  <option value="target">Target</option>
                  <option value="safe">Safe</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Notes (optional)</label>
                <textarea
                  value={shortlistNotes}
                  onChange={(e) => setShortlistNotes(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 outline-none resize-none"
                  rows={3}
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowShortlistModal(false);
                  setSelectedUniversity(null);
                }}
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleShortlist}
                className="flex-1 px-4 py-2.5 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700"
              >
                Shortlist
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

