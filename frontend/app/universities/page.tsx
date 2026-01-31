'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { universityAPI, getAuthToken } from '@/lib/api';
import { getCurrencyForCountry, getCurrencyName, getCurrencySymbol } from '@/lib/countryCurrency';
import Navbar from '@/components/Navbar';
import BackToTop from '@/components/BackToTop';
import Link from 'next/link';
import { Search, MapPin, Target, Lock, Unlock, ExternalLink, Globe, Banknote, Eye, ArrowUpDown, Sparkles, Filter } from 'lucide-react';

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
  const searchParams = useSearchParams();
  const { user } = useAuthStore();
  const [universities, setUniversities] = useState<University[]>([]);
  const [shortlisted, setShortlisted] = useState<number[]>([]);
  const [locked, setLocked] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const countryFromUrl = searchParams.get('country') ?? '';
  const [filter, setFilter] = useState({ country: countryFromUrl, budget_min: '', budget_max: '' });
  const [showShortlistModal, setShowShortlistModal] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);
  const [shortlistCategory, setShortlistCategory] = useState('target');
  const [shortlistNotes, setShortlistNotes] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'rank' | 'tuition_low' | 'tuition_high' | 'acceptance'>('default');

  useEffect(() => {
    if (!user) {
      router.push('/');
      return;
    }
    if (!user.is_onboarded) {
      router.push('/onboarding');
      return;
    }
    loadShortlisted();
    loadLocked();
    const urlCountry = searchParams.get('country') ?? '';
    setFilter((f) => ({ ...f, country: urlCountry || f.country }));
    const params: any = {};
    if (urlCountry) params.country = urlCountry;
    if (filter.budget_min) params.budget_min = parseFloat(filter.budget_min);
    if (filter.budget_max) params.budget_max = parseFloat(filter.budget_max);
    universityAPI.getAll(params).then((r) => setUniversities(r.data)).catch(() => {}).finally(() => setLoading(false));
  }, [user, router, searchParams.get('country')]);

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
    if (!getAuthToken()) return;
    try {
      const response = await universityAPI.getShortlisted();
      const list = Array.isArray(response.data) ? response.data : (response.data?.data ?? []);
      setShortlisted(list.map((u: University) => u.id));
    } catch (error) {
      console.error('Error loading shortlisted:', error);
    }
  };

  const loadLocked = async () => {
    if (!getAuthToken()) return;
    try {
      const response = await universityAPI.getLocked();
      const list = Array.isArray(response.data) ? response.data : (response.data?.data ?? []);
      setLocked(list.map((u: University) => u.id));
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
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <Navbar />
        <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center">
          <div className="w-12 h-12 border-2 border-primary-200 border-t-primary-500 rounded-full animate-spin" />
          <p className="mt-4 font-medium text-slate-600">Finding universities...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50/90 via-white to-slate-50/70">
      <Navbar />

      {/* Hero */}
      <div className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-400/25 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" aria-hidden />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" aria-hidden />
        <div className="container mx-auto px-4 py-10 md:py-14 relative">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm shadow-lg shrink-0">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-bold tracking-tight">
                Discover Universities
              </h1>
              <p className="mt-2 text-primary-100 text-base md:text-lg max-w-xl leading-relaxed">
                Find programs that match your profile, budget, and goals. Shortlist, compare, and lock your choices with confidence.
              </p>
            </div>
          </div>
        </div>
        <div className="h-8 w-full bg-gradient-to-b from-primary-600/80 to-transparent" aria-hidden />
      </div>

      <div className="container mx-auto px-4 pt-8 md:pt-10 relative z-10 pb-16 max-w-6xl">
        {/* Filters card */}
        <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-200/80 overflow-hidden mb-8">
          <div className="px-5 py-4 bg-slate-50/80 border-b border-slate-200/80 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
              <Filter className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <h2 className="font-display font-semibold text-slate-900">Refine your search</h2>
              <p className="text-xs text-slate-500 mt-0.5">Country and budget filter results by your preferences</p>
            </div>
          </div>
          <div className="p-6">
            <div className="flex flex-wrap items-end gap-5 md:gap-6">
              <div className="flex-1 min-w-[180px]">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Country</label>
                <input
                  type="text"
                  value={filter.country}
                  onChange={(e) => setFilter({ ...filter, country: e.target.value })}
                  placeholder="e.g. United States, United Kingdom"
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
              <div className="flex gap-3 shrink-0">
                <button
                  onClick={applyFilters}
                  className="px-5 py-2.5 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 active:scale-[0.98] transition-all shadow-md hover:shadow-lg"
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
                  className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-medium hover:bg-slate-50 hover:border-slate-300 transition-all"
                >
                  Clear all
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results banner */}
        {filter.country.trim() && universities.length > 0 && getCurrencyForCountry(filter.country) && (
          <div className="mb-5 flex items-center gap-3 px-4 py-3.5 rounded-xl bg-primary-50/90 border border-primary-200/60 text-primary-800 shadow-sm">
            <div className="w-9 h-9 rounded-lg bg-primary-100 flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4 text-primary-600" />
            </div>
            <div>
              <span className="font-semibold">Universities in {filter.country}</span>
              <span className="text-primary-600 mx-2">·</span>
              <span className="text-sm">Tuition in {getCurrencyForCountry(filter.country)!.name} ({getCurrencyForCountry(filter.country)!.code})</span>
            </div>
          </div>
        )}
        {!filter.country.trim() && universities.length > 0 && (
          <p className="mb-5 text-sm text-slate-500">Tuition shown in each university&apos;s local currency.</p>
        )}

        {/* Sort + results count */}
        {universities.length > 0 && (
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3 px-1">
            <p className="text-sm font-medium text-slate-600">
              <span className="text-slate-900 font-semibold tabular-nums">{universities.length}</span> {universities.length === 1 ? 'university' : 'universities'} found
            </p>
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4 text-slate-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-medium focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all cursor-pointer"
              >
                <option value="default">Best match</option>
                <option value="rank">Rank (best first)</option>
                <option value="tuition_low">Tuition (low → high)</option>
                <option value="tuition_high">Tuition (high → low)</option>
                <option value="acceptance">Acceptance (high first)</option>
              </select>
            </div>
          </div>
        )}

        {/* University cards */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[...universities]
            .sort((a, b) => {
              if (sortBy === 'default') return 0;
              if (sortBy === 'rank') return (a.ranking ?? 9999) - (b.ranking ?? 9999);
              if (sortBy === 'tuition_low') return (a.tuition_min ?? 0) - (b.tuition_min ?? 0);
              if (sortBy === 'tuition_high') return (b.tuition_min ?? 0) - (a.tuition_min ?? 0);
              if (sortBy === 'acceptance') return (b.acceptance_rate ?? 0) - (a.acceptance_rate ?? 0);
              return 0;
            })
            .map((university) => (
            <article
              key={university.id}
              className="group bg-white rounded-2xl shadow-md shadow-slate-200/40 border border-slate-200/80 overflow-hidden hover:shadow-xl hover:shadow-slate-300/40 hover:-translate-y-1.5 hover:border-primary-200/60 transition-all duration-300 flex flex-col h-full"
            >
              <div className="flex flex-1 min-h-0">
                <div className="w-1 shrink-0 bg-gradient-to-b from-primary-400 via-primary-500 to-primary-600 rounded-l-2xl group-hover:w-1.5 transition-all duration-300" />
                <div className="flex-1 flex flex-col min-h-0 p-5 min-w-0">
                  <div className="flex-1 min-h-0 flex flex-col">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <Link
                        href={`/universities/${university.id}`}
                        className="font-display font-bold text-slate-900 text-lg leading-tight line-clamp-2 hover:text-primary-600 transition-colors"
                      >
                        {university.name}
                      </Link>
                      {university.ranking != null && (
                        <span className="shrink-0 px-2.5 py-1 rounded-lg bg-primary-100 text-primary-700 text-xs font-bold tabular-nums">
                          #{university.ranking}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-500 text-sm mb-3">
                      <MapPin className="w-4 h-4 shrink-0 text-slate-400" />
                      <span className="truncate">{university.city ? `${university.city}, ` : ''}{university.country}</span>
                    </div>
                    {university.description && (
                      <p className="text-slate-600 text-sm leading-relaxed line-clamp-2 mb-4">
                        {university.description}
                      </p>
                    )}

                    {/* Stats row */}
                    <div className="flex flex-wrap gap-4 mb-4">
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
                      <div className="rounded-xl bg-slate-50/90 border border-slate-200/60 px-3 py-2.5 mb-4">
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
                      <Link
                        href={`/universities/${university.id}`}
                        className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-all"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        View details
                      </Link>
                      {university.website && (
                        <a
                          href={university.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-primary-700 bg-primary-50 rounded-lg hover:bg-primary-100 transition-all"
                        >
                          <Globe className="w-3.5 h-3.5" />
                          Website
                        </a>
                      )}
                      <a
                        href={`https://www.google.com/search?q=${encodeURIComponent(university.name + ' university')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-all"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Google
                      </a>
                    </div>
                  </div>

                  {/* Actions - always at bottom of card for aligned Shortlist row */}
                  <div className="flex gap-2 mt-auto pt-3 border-t border-slate-100 shrink-0">
                    {!shortlisted.includes(university.id) ? (
                      <button
                        onClick={() => {
                          setSelectedUniversity(university);
                          setShowShortlistModal(true);
                        }}
                        className="flex-1 px-4 py-2.5 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 active:scale-[0.98] flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md"
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
                        className="px-4 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 flex items-center gap-2 transition-all shadow-sm hover:shadow-md"
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
          <div className="text-center py-20 px-6 rounded-2xl bg-gradient-to-b from-slate-50/80 via-white to-slate-50/80 border border-slate-200/80 shadow-lg shadow-slate-200/30">
            <div className="w-24 h-24 mx-auto rounded-2xl bg-primary-100/90 flex items-center justify-center mb-6 shadow-inner border border-primary-200/40">
              <Search className="w-12 h-12 text-primary-600" />
            </div>
            <h3 className="font-display font-bold text-slate-900 text-2xl mb-2">No universities match your filters</h3>
            <p className="text-slate-600 max-w-md mx-auto mb-8 leading-relaxed">
              Try a different country, widen your budget range, or browse all universities to get started.
            </p>
            <button
              onClick={() => {
                setFilter({ country: '', budget_min: '', budget_max: '' });
                setLoading(true);
                universityAPI.getAll({ show_all: true }).then((r) => setUniversities(r.data)).catch(() => {}).finally(() => setLoading(false));
              }}
              className="px-6 py-3 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
            >
              Show all universities
            </button>
          </div>
        )}
      </div>

      {/* Shortlist modal */}
      {showShortlistModal && selectedUniversity && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 p-6 max-w-md w-full">
            <div className="flex items-start gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center shrink-0">
                <Target className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h2 className="font-display text-xl font-bold text-slate-900">Add to shortlist</h2>
                <p className="text-slate-600 text-sm mt-1 line-clamp-2">{selectedUniversity.name}</p>
              </div>
            </div>
            <div className="space-y-5 mb-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Category</label>
                <div className="flex gap-2">
                  {(['dream', 'target', 'safe'] as const).map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setShortlistCategory(cat)}
                      className={`flex-1 px-3 py-2.5 rounded-xl text-sm font-medium capitalize transition-all ${
                        shortlistCategory === cat
                          ? 'bg-primary-600 text-white shadow-md'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Notes (optional)</label>
                <textarea
                  value={shortlistNotes}
                  onChange={(e) => setShortlistNotes(e.target.value)}
                  placeholder="Why this university? Deadlines, programs..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 outline-none resize-none placeholder:text-slate-400"
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
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleShortlist}
                className="flex-1 px-4 py-2.5 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
              >
                Add to shortlist
              </button>
            </div>
          </div>
        </div>
      )}
      <BackToTop />
    </div>
  );
}

