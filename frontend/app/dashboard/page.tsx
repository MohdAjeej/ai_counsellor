'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store';
import { profileAPI, counsellorAPI, universityAPI, todoAPI, getUniversityListFromResponse, getAuthToken } from '@/lib/api';
import Navbar from '@/components/Navbar';
import {
  UserCircle,
  Brain,
  Search,
  Lock,
  CheckCircle,
  ArrowRight,
  TrendingUp,
  Target,
  AlertCircle,
  Sparkles,
  HelpCircle,
  CalendarClock,
  MapPin,
  RefreshCw,
} from 'lucide-react';
import { getCurrencySymbol } from '@/lib/countryCurrency';

const stages = [
  { id: 'onboarding', name: 'Onboarding', icon: UserCircle },
  { id: 'dashboard', name: 'Dashboard', icon: TrendingUp },
  { id: 'discovery', name: 'Discovery', icon: Search },
  { id: 'shortlisting', name: 'Shortlisting', icon: Target },
  { id: 'application', name: 'Application', icon: CheckCircle },
];

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [profile, setProfile] = useState<any>(null);
  const [analysis, setAnalysis] = useState<string>('');
  const [shortlistedUniversities, setShortlistedUniversities] = useState<{ id: number; name: string }[]>([]);
  const [lockedUniversities, setLockedUniversities] = useState<{ id: number; name: string }[]>([]);
  const [upcomingTodos, setUpcomingTodos] = useState<{ id: number; title: string; due_date: string; status: string }[]>([]);
  const [recommendedUniversities, setRecommendedUniversities] = useState<any[]>([]);
  const [quickSearchCountry, setQuickSearchCountry] = useState('');
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
    loadData();
  }, [user, router]);

  // Refetch when user returns to this tab (e.g. after locking a university on another page)
  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible' && user?.is_onboarded) loadData();
    };
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => document.removeEventListener('visibilitychange', onVisibilityChange);
  }, [user?.is_onboarded]);

  const loadData = async () => {
    try {
      const token = getAuthToken();
      if (token && typeof window !== 'undefined') localStorage.setItem('token', token);
      // Only call shortlisted/locked when we have a token to avoid 422 from missing Authorization
      const shortlistedPromise = token ? universityAPI.getShortlisted().catch(() => ({ data: { data: [] } })) : Promise.resolve({ data: { data: [] } });
      const lockedPromise = token ? universityAPI.getLocked().catch(() => ({ data: { data: [] } })) : Promise.resolve({ data: { data: [] } });
      const [profileRes, analysisRes, shortlistedRes, lockedRes, todosRes, recommendedRes] = await Promise.all([
        profileAPI.get().catch(() => null),
        counsellorAPI.getAnalysis().catch(() => null),
        shortlistedPromise,
        lockedPromise,
        todoAPI.getAll().catch(() => ({ data: [] })),
        universityAPI.getAll({}).catch(() => ({ data: [] })),
      ]);

      if (profileRes) setProfile(profileRes.data);
      if (analysisRes) setAnalysis(analysisRes.data.analysis);
      const shortlistedList = getUniversityListFromResponse(shortlistedRes);
      const lockedList = getUniversityListFromResponse(lockedRes);
      setShortlistedUniversities(shortlistedList.map((u: any) => ({ id: u.id, name: u.name || 'University' })));
      setLockedUniversities(lockedList.map((u: any) => ({ id: u.id, name: u.name || 'University' })));
      if (recommendedRes?.data?.length) setRecommendedUniversities(recommendedRes.data.slice(0, 3));
      if (todosRes?.data?.length) {
        const now = new Date();
        const in14 = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);
        const upcoming = todosRes.data
          .filter((t: { due_date: string | null; status: string }) => t.due_date && t.status !== 'completed')
          .map((t: { id: number; title: string; due_date: string; status: string }) => ({
            id: t.id,
            title: t.title,
            due_date: t.due_date,
            status: t.status,
          }))
          .filter((t: { due_date: string }) => {
            const d = new Date(t.due_date);
            return d >= now && d <= in14;
          })
          .sort((a: { due_date: string }, b: { due_date: string }) =>
            new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
          )
          .slice(0, 5);
        setUpcomingTodos(upcoming);
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <Navbar />
        <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center">
          <div className="w-12 h-12 border-2 border-primary-200 border-t-primary-500 rounded-full animate-spin" />
          <p className="mt-4 font-medium text-slate-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const currentStageIndex = Math.max(0, stages.findIndex((s) => s.id === user.current_stage));
  const firstName = user.full_name?.split(' ')[0] || 'there';

  // Profile completion: key fields filled (non-empty / set)
  const profileCompletionFields = profile
    ? [
        profile.current_degree,
        profile.current_gpa != null && String(profile.current_gpa).trim() !== '',
        profile.current_institution,
        profile.field_of_study,
        profile.graduation_year != null && String(profile.graduation_year).trim() !== '',
        profile.desired_degree,
        profile.desired_field,
        profile.preferred_countries,
        profile.study_start_year != null && String(profile.study_start_year).trim() !== '',
        profile.budget_min != null && String(profile.budget_min).trim() !== '',
        profile.budget_max != null && String(profile.budget_max).trim() !== '',
        profile.currency,
        profile.exam_status,
      ].filter(Boolean).length
    : 0;
  const profileCompletionTotal = 13;
  const profileCompletionPct = Math.min(100, Math.round((profileCompletionFields / profileCompletionTotal) * 100));

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickSearchCountry.trim()) {
      router.push('/universities');
      return;
    }
    router.push(`/universities?country=${encodeURIComponent(quickSearchCountry.trim())}`);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50/90 via-white to-slate-50/70">
      <Navbar />

      {/* Welcome hero */}
      <div className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '28px 28px' }} />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" aria-hidden />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-400/15 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" aria-hidden />
        <div className="container mx-auto px-4 py-10 md:py-14 relative">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl md:text-4xl lg:text-[2.5rem] font-bold tracking-tight text-white drop-shadow-sm">
                Welcome back, {firstName}
              </h1>
              <p className="mt-2 text-primary-100/95 text-base md:text-lg max-w-xl">
                Here’s your study-abroad journey at a glance.
              </p>
            </div>
            <button
              type="button"
              onClick={handleRefresh}
              disabled={refreshing}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white font-medium transition-all duration-200 disabled:opacity-60 border border-white/20 shadow-lg shadow-black/5"
              title="Refresh shortlist and locked counts"
            >
              <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
          {/* Quick search by country */}
          <form onSubmit={handleQuickSearch} className="mt-6 max-w-lg flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-200" />
              <input
                type="text"
                value={quickSearchCountry}
                onChange={(e) => setQuickSearchCountry(e.target.value)}
                placeholder="Search universities by country..."
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-white/25 bg-white/10 text-white placeholder:text-primary-100 focus:ring-2 focus:ring-white/30 focus:border-white/40 focus:bg-white/20 transition-all shadow-inner"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-3 rounded-xl bg-white text-primary-700 font-semibold hover:bg-primary-50 hover:shadow-xl transition-all duration-200 shadow-md"
            >
              Search
            </button>
          </form>
        </div>
        <div className="h-8 md:h-10 w-full bg-gradient-to-b from-primary-600/80 to-transparent" aria-hidden />
      </div>

      <div className="container mx-auto px-4 pt-8 md:pt-10 relative z-10 pb-20 max-w-5xl">
        {/* Profile completion */}
        <div className="bg-white rounded-2xl shadow-md shadow-slate-200/40 border border-slate-100 p-6 mb-8 relative overflow-hidden group hover:shadow-lg hover:shadow-slate-200/50 transition-shadow duration-300">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-primary-500 to-primary-400 rounded-l-2xl" aria-hidden />
          <div className="pl-5">
            <div className="flex items-center justify-between gap-4 mb-3">
              <h2 className="font-display text-lg font-bold text-slate-900">Profile completion</h2>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent tabular-nums">{profileCompletionPct}%</span>
            </div>
            <div className="h-3.5 rounded-full bg-slate-100 overflow-hidden ring-1 ring-slate-200/50">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary-500 via-primary-400 to-primary-400 transition-all duration-700 ease-out"
                style={{ width: `${profileCompletionPct}%` }}
              />
            </div>
            <p className="mt-3 text-sm text-slate-600">
              {profileCompletionPct < 100
                ? 'Complete your profile for better university recommendations.'
                : 'Your profile is complete. Recommendations are tailored to you.'}
            </p>
            {profileCompletionPct < 100 && (
              <Link
                href="/profile"
                className="mt-3 inline-flex items-center gap-2 text-primary-600 font-semibold text-sm hover:text-primary-700 hover:gap-3 transition-all"
              >
                Edit profile
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>

        {/* Next deadline callout */}
        {upcomingTodos.length > 0 && (() => {
          const next = upcomingTodos[0];
          const d = new Date(next.due_date);
          const daysLeft = Math.ceil((d.getTime() - Date.now()) / (24 * 60 * 60 * 1000));
          const label = daysLeft === 0 ? 'Today' : daysLeft === 1 ? 'Tomorrow' : `In ${daysLeft} days`;
          const isUrgent = daysLeft <= 1;
          return (
            <Link
              href="/application"
              className="group mb-6 flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50/80 border border-amber-200/80 hover:from-amber-100 hover:to-orange-50 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ring-2 ${isUrgent ? 'bg-amber-200 ring-amber-300/60' : 'bg-amber-100 ring-amber-200/50'}`}>
                <CalendarClock className="w-6 h-6 text-amber-600" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-700">Next deadline</p>
                <p className="font-semibold text-slate-900 truncate">{next.title}</p>
                <p className="text-sm text-slate-600">{label} · {d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</p>
              </div>
              <ArrowRight className="w-5 h-5 text-amber-600 shrink-0 transition-transform group-hover:translate-x-0.5" />
            </Link>
          );
        })()}

        {/* Journey progress */}
        <div className="bg-white rounded-2xl shadow-md shadow-slate-200/40 border border-slate-100 p-6 mb-6">
          <div className="mb-6">
            <h2 className="font-display text-lg font-bold text-slate-900">Your Journey</h2>
            <p className="text-xs text-slate-500 mt-0.5">From onboarding to application</p>
          </div>
          <div className="flex items-center justify-between gap-0">
            {stages.map((stage, index) => {
              const Icon = stage.icon;
              const isCompleted = index < currentStageIndex;
              const isCurrent = index === currentStageIndex;

              return (
                <div key={stage.id} className="flex-1 flex items-center min-w-0">
                  <div className="flex flex-col items-center w-full">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                        isCompleted
                          ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-md shadow-emerald-200/50'
                          : isCurrent
                            ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-200/40 ring-2 ring-primary-300 ring-offset-2 scale-110'
                            : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span
                      className={`text-xs mt-3 font-semibold text-center truncate w-full max-w-[4.5rem] ${
                        isCurrent ? 'text-primary-700' : 'text-slate-600'
                      }`}
                    >
                      {stage.name}
                    </span>
                  </div>
                  {index < stages.length - 1 && (
                    <div
                      className={`flex-1 h-2 mx-1 rounded-full transition-colors duration-300 ${
                        isCompleted ? 'bg-gradient-to-r from-emerald-400 to-emerald-500' : 'bg-slate-200'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid md:grid-cols-3 gap-5 mb-6">
          <div className="group bg-white rounded-2xl shadow-md shadow-slate-200/40 border border-slate-100 p-5 hover:shadow-lg hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-200 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary-400 to-primary-500 rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden />
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                  Shortlisted
                </p>
                <p className="text-3xl font-bold bg-gradient-to-br from-slate-900 to-slate-700 bg-clip-text text-transparent tabular-nums">{shortlistedUniversities.length}</p>
                <p className="text-xs text-slate-500 mt-1">universities saved</p>
                {shortlistedUniversities.length > 0 && (
                  <ul className="mt-2 space-y-0.5">
                    {shortlistedUniversities.slice(0, 3).map((u) => (
                      <li key={u.id}>
                        <Link href={`/universities/${u.id}`} className="text-xs text-primary-600 font-medium truncate block hover:underline">
                          {u.name}
                        </Link>
                      </li>
                    ))}
                    {shortlistedUniversities.length > 3 && (
                      <li className="text-xs text-slate-400">+{shortlistedUniversities.length - 3} more</li>
                    )}
                  </ul>
                )}
                {shortlistedUniversities.length > 0 && (
                  <Link href="/universities" className="mt-1 inline-block text-xs font-medium text-primary-600 hover:underline">
                    View all →
                  </Link>
                )}
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center group-hover:bg-primary-100 transition-colors shrink-0 ml-2">
                <Target className="w-6 h-6 text-primary-600" />
              </div>
            </div>
          </div>

          <div
            className="group bg-white rounded-2xl shadow-md shadow-slate-200/40 border border-slate-100 p-5 hover:shadow-lg hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-200 relative overflow-hidden"
            title="Universities you’ve committed to; unlocks application guidance."
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-emerald-400 to-emerald-500 rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden />
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Locked
                  </p>
                  <span className="text-slate-400 hover:text-slate-600 cursor-help" title="Universities you’ve committed to; unlocks application guidance.">
                    <HelpCircle className="w-3.5 h-3.5" />
                  </span>
                </div>
                <p className="text-3xl font-bold bg-gradient-to-br from-slate-900 to-slate-700 bg-clip-text text-transparent tabular-nums">{lockedUniversities.length}</p>
                <p className="text-xs text-slate-500 mt-1">committed — app guidance on</p>
                {lockedUniversities.length > 0 && (
                  <ul className="mt-2 space-y-0.5">
                    {lockedUniversities.slice(0, 3).map((u) => (
                      <li key={u.id}>
                        <Link href={`/universities/${u.id}`} className="text-xs text-emerald-600 font-medium truncate block hover:underline">
                          {u.name}
                        </Link>
                      </li>
                    ))}
                    {lockedUniversities.length > 3 && (
                      <li className="text-xs text-slate-400">+{lockedUniversities.length - 3} more</li>
                    )}
                  </ul>
                )}
                {lockedUniversities.length > 0 && (
                  <Link href="/application" className="mt-1 inline-block text-xs font-medium text-emerald-600 hover:underline">
                    Application →
                  </Link>
                )}
              </div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-100 group-hover:scale-105 transition-all">
                <Lock className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="group bg-white rounded-2xl shadow-md shadow-slate-200/40 border border-slate-100 p-5 hover:shadow-lg hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-200 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-slate-400 to-slate-500 rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                  You’re here
                </p>
                <p className="text-lg font-bold text-slate-900 capitalize">{user.current_stage}</p>
                <p className="text-xs text-slate-500 mt-1">next: discovery & shortlist</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center group-hover:bg-slate-200 group-hover:scale-105 transition-all">
                <TrendingUp className="w-6 h-6 text-slate-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid md:grid-cols-2 gap-5 mb-6 md:items-stretch">
          <Link
            href="/counsellor"
            className="group flex h-full bg-white rounded-2xl shadow-md shadow-slate-200/40 border border-slate-100 p-6 hover:shadow-lg hover:shadow-primary-200/30 hover:-translate-y-1 transition-all duration-200 overflow-hidden relative"
          >
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-primary-400 to-primary-600 rounded-l-2xl" />
            <div className="flex-1 pl-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center group-hover:bg-primary-100 group-hover:scale-105 transition-all duration-200">
                  <Brain className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="font-display text-xl font-bold text-slate-900">AI Counsellor</h3>
              </div>
              <p className="text-slate-600 text-sm mb-4">
                Get personalized guidance and recommendations from your AI counsellor.
              </p>
              <span className="inline-flex items-center gap-2 text-primary-600 font-semibold text-sm group-hover:gap-3 transition-all">
                Chat Now
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>

          <Link
            href="/universities"
            className="group flex h-full bg-white rounded-2xl shadow-md shadow-slate-200/40 border border-slate-100 p-6 hover:shadow-lg hover:shadow-primary-200/30 hover:-translate-y-1 transition-all duration-200 overflow-hidden relative"
          >
            <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-primary-400 to-primary-600 rounded-r-2xl" />
            <div className="flex-1 pr-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center group-hover:bg-primary-100 group-hover:scale-105 transition-all duration-200">
                  <Search className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="font-display text-xl font-bold text-slate-900">
                  Discover Universities
                </h3>
              </div>
              <p className="text-slate-600 text-sm mb-4">
                Explore universities matched to your profile and preferences.
              </p>
              <span className="inline-flex items-center gap-2 text-primary-600 font-semibold text-sm group-hover:gap-3 transition-all">
                Explore
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>
        </div>
        <div className="flex flex-wrap items-center gap-3 mb-6 p-4 rounded-2xl bg-slate-50/60 border border-slate-100">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider w-full sm:w-auto">Quick ask</span>
          <Link href="/counsellor?suggestion=recommendations" className="px-4 py-2.5 rounded-full bg-white text-primary-700 text-sm font-medium hover:bg-primary-50 hover:shadow-md transition-all border border-slate-200/80 hover:border-primary-200">Get recommendations</Link>
          <Link href="/counsellor?suggestion=profile" className="px-4 py-2.5 rounded-full bg-white text-primary-700 text-sm font-medium hover:bg-primary-50 hover:shadow-md transition-all border border-slate-200/80 hover:border-primary-200">Profile analysis</Link>
          <Link href="/counsellor?suggestion=next" className="px-4 py-2.5 rounded-full bg-white text-primary-700 text-sm font-medium hover:bg-primary-50 hover:shadow-md transition-all border border-slate-200/80 hover:border-primary-200">What&apos;s next?</Link>
        </div>

        {/* Recommended for You */}
        {recommendedUniversities.length > 0 && (
          <div className="bg-white rounded-2xl shadow-md shadow-slate-200/40 border border-slate-100 p-6 mb-6">
            <div className="flex items-center justify-between gap-2 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center shadow-sm">
                  <Sparkles className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h2 className="font-display text-lg font-bold text-slate-900">Recommended for you</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Based on your profile</p>
                </div>
              </div>
              <Link
                href="/universities"
                className="text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors shrink-0"
              >
                View all →
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {recommendedUniversities.map((u: any) => {
                const sym = getCurrencySymbol(u.currency || 'USD');
                const min = u.tuition_min;
                const max = u.tuition_max;
                return (
                  <Link
                    key={u.id}
                    href={`/universities/${u.id}`}
                    className="block p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:border-primary-200 hover:bg-primary-50/50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <h3 className="font-display font-bold text-slate-900 truncate">{u.name}</h3>
                    <p className="text-sm text-slate-600 flex items-center gap-1 mt-1">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      {[u.city, u.country].filter(Boolean).join(', ') || u.country || '—'}
                    </p>
                    {u.ranking != null && (
                      <p className="text-xs text-slate-500 mt-1">Rank #{u.ranking}</p>
                    )}
                    {(min != null || max != null) && (
                      <p className="text-sm text-slate-700 mt-2 font-medium">
                        {sym} {min != null ? min.toLocaleString() : '—'}
                        {max != null && max !== min ? ` – ${max.toLocaleString()}` : ''} / year
                      </p>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Upcoming deadlines */}
        {upcomingTodos.length > 0 && (
          <div className="bg-white rounded-2xl shadow-md shadow-slate-200/40 border border-slate-100 p-6 mb-6">
            <div className="flex items-center justify-between gap-2 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center shadow-sm">
                  <CalendarClock className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h2 className="font-display text-lg font-bold text-slate-900">Upcoming deadlines</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Next 14 days</p>
                </div>
              </div>
              <Link
                href="/application"
                className="text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors shrink-0"
              >
                View all →
              </Link>
            </div>
            <ul className="space-y-2">
              {upcomingTodos.map((t) => {
                const d = new Date(t.due_date);
                const daysLeft = Math.ceil((d.getTime() - Date.now()) / (24 * 60 * 60 * 1000));
                const label = daysLeft === 0 ? 'Today' : daysLeft === 1 ? 'Tomorrow' : `In ${daysLeft} days`;
                const isUrgent = daysLeft <= 1;
                return (
                  <li key={t.id}>
                    <Link
                      href="/application"
                      className={`flex items-center justify-between gap-3 p-3 rounded-xl border transition-all hover:shadow-sm block ${isUrgent ? 'bg-amber-50/60 border-amber-100 hover:bg-amber-50' : 'bg-slate-50/80 border-slate-100 hover:bg-slate-100/80'}`}
                    >
                      <span className="text-slate-800 font-medium truncate">{t.title}</span>
                      <span className={`shrink-0 text-sm font-medium ${isUrgent ? 'text-amber-700' : 'text-slate-600'}`}>
                        {label} · {d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {/* Profile analysis - always show when profile loaded; display analysis or fallback */}
        {profile && (
          <div className="bg-white rounded-2xl shadow-md shadow-slate-200/40 border border-slate-100 p-6 mb-6 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-primary-400 to-primary-500 rounded-l-2xl" aria-hidden />
            <div className="pl-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary-600" />
                </div>
                <h2 className="font-display text-lg font-bold text-slate-900">Profile Analysis</h2>
              </div>
              <div className="prose prose-slate max-w-none">
                {analysis ? (
                  <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">{analysis}</p>
                ) : (
                  <p className="text-slate-600 text-sm">
                    Your AI counsellor is ready. Ask for a profile analysis in the chat, or use the &quot;Profile analysis&quot; quick ask above.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Next steps */}
        <div className="bg-white rounded-2xl shadow-md shadow-slate-200/40 border border-slate-100 p-6 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-amber-400 to-amber-500 rounded-l-2xl" aria-hidden />
          <div className="pl-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-amber-600" />
              </div>
              <h2 className="font-display text-lg font-bold text-slate-900">Next Steps</h2>
            </div>
            <ul className="space-y-3">
              {user.current_stage === 'dashboard' && (
                <li>
                  <Link href="/counsellor" className="flex items-center gap-3 p-3 rounded-xl bg-primary-50/80 border border-primary-100 hover:bg-primary-50 hover:shadow-sm transition-all">
                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span className="text-slate-700 text-sm">
                      Start chatting with your AI Counsellor to get recommendations
                    </span>
                  </Link>
                </li>
              )}
              {shortlistedUniversities.length === 0 && (
                <li>
                  <Link href="/universities" className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100/80 hover:shadow-sm transition-all">
                    <ArrowRight className="w-5 h-5 text-primary-600 shrink-0" />
                    <span className="text-slate-700 text-sm">
                      Discover and shortlist universities that match your profile
                    </span>
                  </Link>
                </li>
              )}
            {shortlistedUniversities.length > 0 && lockedUniversities.length === 0 && (
              <li>
                <Link href="/universities" className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/80 border border-slate-100 hover:bg-slate-100/80 hover:shadow-sm transition-all">
                  <ArrowRight className="w-5 h-5 text-primary-600 shrink-0" />
                  <span className="text-slate-700 text-sm">
                    Lock at least one university to unlock application guidance
                  </span>
                </Link>
              </li>
            )}
            {lockedUniversities.length > 0 && (
              <li>
                <Link
                  href="/application"
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/80 border border-slate-100 hover:bg-slate-100/80 hover:shadow-sm transition-all"
                >
                  <ArrowRight className="w-5 h-5 text-primary-600 shrink-0" />
                  <span className="text-primary-600 font-semibold text-sm">
                    View your application to-dos and timelines →
                  </span>
                </Link>
              </li>
            )}
            {shortlistedUniversities.length >= 2 && (
              <li>
                <Link
                  href="/compare"
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/80 border border-slate-100 hover:bg-slate-100/80 hover:shadow-sm transition-all"
                >
                  <ArrowRight className="w-5 h-5 text-primary-600 shrink-0" />
                  <span className="text-primary-600 font-semibold text-sm">
                    Compare your shortlisted universities side by side →
                  </span>
                </Link>
              </li>
            )}
          </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

