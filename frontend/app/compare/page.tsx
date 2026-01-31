'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store';
import { universityAPI, getUniversityListFromResponse, getAuthToken } from '@/lib/api';
import { getCurrencyName, getCurrencySymbol } from '@/lib/countryCurrency';
import Navbar from '@/components/Navbar';
import {
  ArrowLeft,
  GitCompare,
  MapPin,
  Banknote,
  Award,
  ExternalLink,
  CheckCircle,
  RefreshCw,
  Search,
  Sparkles,
} from 'lucide-react';

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
  website?: string;
}

export default function ComparePage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [allUniversities, setAllUniversities] = useState<University[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push('/');
      return;
    }
    if (!user.is_onboarded) {
      router.push('/onboarding');
      return;
    }
    loadUniversities();
  }, [user, router]);

  // Refetch when user returns to this tab (e.g. after shortlisting from Discover)
  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible' && user?.is_onboarded) loadUniversities();
    };
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => document.removeEventListener('visibilitychange', onVisibilityChange);
  }, [user?.is_onboarded]);

  const loadUniversities = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    try {
      const token = getAuthToken();
      if (token && typeof window !== 'undefined') localStorage.setItem('token', token);
      if (!token) {
        setAllUniversities([]);
        return;
      }
      const [shortRes, lockedRes] = await Promise.all([
        universityAPI.getShortlisted().catch(() => null),
        universityAPI.getLocked().catch(() => null),
      ]);
      const shortList = getUniversityListFromResponse(shortRes);
      const lockedList = getUniversityListFromResponse(lockedRes);
      const byId = new Map<number, University>();
      [...shortList, ...lockedList].forEach((u: University) =>
        byId.set(u.id, u)
      );
      setAllUniversities(Array.from(byId.values()));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      if (isRefresh) setRefreshing(false);
    }
  };

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else if (next.size < 4) next.add(id);
      return next;
    });
  };

  const selected = allUniversities.filter((u) => selectedIds.has(u.id));

  if (!user || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <Navbar />
        <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center">
          <div className="w-12 h-12 border-3 border-primary-200 border-t-primary-500 rounded-full animate-spin" />
          <p className="mt-4 font-medium text-slate-600">Loading your shortlist...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50/80 to-white">
      <Navbar />

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-primary-600 font-medium mb-6 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Dashboard
        </Link>

        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center shadow-sm ring-1 ring-primary-100/50">
              <GitCompare className="w-7 h-7 text-primary-600" />
            </div>
            <div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Compare Universities
              </h1>
              <p className="text-slate-600 mt-1 text-sm sm:text-base max-w-md">
                Select 2–4 from your shortlist or locked list to compare side by side.
              </p>
            </div>
          </div>
          {allUniversities.length > 0 && (
            <button
              type="button"
              onClick={() => loadUniversities(true)}
              disabled={refreshing}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-medium hover:bg-slate-50 hover:border-slate-300 disabled:opacity-60 transition-all shadow-sm"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              {refreshing ? 'Refreshing...' : 'Refresh list'}
            </button>
          )}
        </header>

        {allUniversities.length === 0 ? (
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-50 via-white to-primary-50/30 border border-slate-200/80 shadow-lg shadow-slate-200/20 p-8 sm:p-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-100/20 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative flex flex-col sm:flex-row sm:items-start gap-6">
              <div className="w-16 h-16 rounded-2xl bg-primary-100/80 flex items-center justify-center shrink-0">
                <Sparkles className="w-8 h-8 text-primary-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-display text-xl font-bold text-slate-900 mb-2">
                  No universities to compare yet
                </h3>
                <p className="text-slate-600 text-sm sm:text-base mb-6 max-w-lg">
                  Shortlist or lock universities from Discover first. If you just shortlisted, click &quot;Refresh list&quot; to load them here.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => loadUniversities(true)}
                    disabled={refreshing}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 text-white font-semibold hover:bg-slate-900 disabled:opacity-60 transition-all shadow-md hover:shadow-lg"
                  >
                    <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                    {refreshing ? 'Refreshing...' : 'Refresh list'}
                  </button>
                  <Link
                    href="/universities"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-all shadow-md hover:shadow-lg"
                  >
                    <Search className="w-4 h-4" />
                    Discover Universities
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <section className="bg-white rounded-2xl shadow-md shadow-slate-200/50 border border-slate-200/80 p-6 sm:p-8 mb-8">
              <h2 className="font-display font-bold text-slate-900 mb-1 text-lg">
                Select universities (2–4)
              </h2>
              <p className="text-slate-500 text-sm mb-5">
                Click a card to add or remove it from the comparison.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {allUniversities.map((u) => {
                  const isSelected = selectedIds.has(u.id);
                  return (
                    <button
                      key={u.id}
                      type="button"
                      onClick={() => toggleSelect(u.id)}
                      className={`text-left rounded-xl border-2 p-4 transition-all duration-200 ${
                        isSelected
                          ? 'border-primary-500 bg-primary-50/80 shadow-md shadow-primary-200/30 ring-2 ring-primary-200/50'
                          : 'border-slate-200 bg-slate-50/50 hover:border-slate-300 hover:bg-slate-100/50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`mt-0.5 shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          isSelected ? 'border-primary-500 bg-primary-500' : 'border-slate-300'
                        }`}>
                          {isSelected && <CheckCircle className="w-4 h-4 text-white" strokeWidth={2.5} />}
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="font-semibold text-slate-900 block truncate">{u.name}</span>
                          <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                            {u.ranking != null && <span>#{u.ranking}</span>}
                            {u.country && <span>· {u.country}</span>}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {selected.length >= 2 && (
              <div className="bg-white rounded-2xl shadow-md shadow-slate-200/50 border border-slate-200/80 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px] text-left">
                    <thead>
                      <tr className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-slate-50/80">
                        <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 w-40">
                          Criteria
                        </th>
                        {selected.map((u) => (
                          <th key={u.id} className="px-5 py-4 font-display font-bold text-slate-900 min-w-[180px]">
                            <Link
                              href={`/universities/${u.id}`}
                              className="hover:text-primary-600 hover:underline transition-colors"
                            >
                              {u.name}
                            </Link>
                            {u.ranking != null && (
                              <span className="block text-xs font-normal text-slate-500 mt-0.5">
                                #{u.ranking} · {u.city ? `${u.city}, ` : ''}{u.country}
                              </span>
                            )}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-5 py-3.5 text-sm font-medium text-slate-600 flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                          Location
                        </td>
                        {selected.map((u) => (
                          <td key={u.id} className="px-5 py-3.5 text-sm text-slate-800">
                            {[u.city, u.country].filter(Boolean).join(', ') || '—'}
                          </td>
                        ))}
                      </tr>
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-5 py-3.5 text-sm font-medium text-slate-600 flex items-center gap-2">
                          <Award className="w-4 h-4 text-slate-400 shrink-0" />
                          Rank
                        </td>
                        {selected.map((u) => (
                          <td key={u.id} className="px-5 py-3.5 text-sm text-slate-800">
                            {u.ranking != null ? `#${u.ranking}` : '—'}
                          </td>
                        ))}
                      </tr>
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-5 py-3.5 text-sm font-medium text-slate-600 flex items-center gap-2">
                          <Banknote className="w-4 h-4 text-slate-400 shrink-0" />
                          Tuition / year
                        </td>
                        {selected.map((u) => {
                          const cur = u.currency || 'USD';
                          const sym = getCurrencySymbol(cur);
                          const name = getCurrencyName(cur);
                          const min = u.tuition_min;
                          const max = u.tuition_max;
                          if (min == null) return <td key={u.id} className="px-5 py-3.5 text-sm text-slate-800">—</td>;
                          return (
                            <td key={u.id} className="px-5 py-3.5 text-sm text-slate-800">
                              {sym} {min.toLocaleString()}
                              {max != null && max !== min ? ` – ${max.toLocaleString()}` : ''} ({name})
                            </td>
                          );
                        })}
                      </tr>
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-5 py-3.5 text-sm font-medium text-slate-600">
                          Acceptance rate
                        </td>
                        {selected.map((u) => (
                          <td key={u.id} className="px-5 py-3.5 text-sm text-slate-800">
                            {u.acceptance_rate != null ? `${(u.acceptance_rate * 100).toFixed(0)}%` : '—'}
                          </td>
                        ))}
                      </tr>
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-5 py-3.5 text-sm font-medium text-slate-600 flex items-center gap-2">
                          <ExternalLink className="w-4 h-4 text-slate-400 shrink-0" />
                          Website
                        </td>
                        {selected.map((u) => (
                          <td key={u.id} className="px-5 py-3.5 text-sm text-slate-800">
                            {u.website ? (
                              <a
                                href={u.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary-600 hover:underline"
                              >
                                Visit site
                              </a>
                            ) : (
                              '—'
                            )}
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {selected.length === 1 && (
              <p className="text-slate-500 text-sm text-center py-8 bg-white/60 rounded-2xl border border-dashed border-slate-200">
                Select at least one more university to see the comparison table.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
