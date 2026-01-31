'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store';
import { universityAPI, getAuthToken } from '@/lib/api';
import { getCurrencyName, getCurrencySymbol } from '@/lib/countryCurrency';
import Navbar from '@/components/Navbar';
import {
  ArrowLeft,
  MapPin,
  Target,
  Lock,
  Unlock,
  ExternalLink,
  Globe,
  Banknote,
  Award,
  BookOpen,
  CheckCircle,
  Link2,
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
  living_cost_estimate?: number;
  min_gpa?: number;
  toefl_required?: boolean;
  ielts_required?: boolean;
  gre_required?: boolean;
  gmat_required?: boolean;
  website?: string;
  description?: string;
}

export default function UniversityDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id ? Number(params.id) : null;
  const { user } = useAuthStore();
  const [university, setUniversity] = useState<University | null>(null);
  const [shortlisted, setShortlisted] = useState(false);
  const [locked, setLocked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [shortlistModal, setShortlistModal] = useState(false);
  const [shortlistCategory, setShortlistCategory] = useState('target');
  const [shortlistNotes, setShortlistNotes] = useState('');
  const [linkCopied, setLinkCopied] = useState(false);

  const handleCopyLink = async () => {
    if (typeof window === 'undefined' || !id) return;
    const url = `${window.location.origin}/universities/${id}`;
    try {
      await navigator.clipboard.writeText(url);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch {
      // fallback for older browsers
      setLinkCopied(false);
    }
  };

  useEffect(() => {
    if (!user) {
      router.push('/');
      return;
    }
    if (!user.is_onboarded) {
      router.push('/onboarding');
      return;
    }
    if (!id || isNaN(id)) {
      router.push('/universities');
      return;
    }
    loadUniversity();
    loadShortlistedLocked();
  }, [user, router, id]);

  const loadUniversity = async () => {
    if (!id) return;
    try {
      const res = await universityAPI.getById(id);
      setUniversity(res.data);
    } catch (e: any) {
      if (e.response?.status === 404) router.push('/universities');
      else console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const loadShortlistedLocked = async () => {
    if (!getAuthToken()) return;
    try {
      const [shortRes, lockedRes] = await Promise.all([
        universityAPI.getShortlisted(),
        universityAPI.getLocked(),
      ]);
      const shortList = Array.isArray(shortRes.data) ? shortRes.data : (shortRes.data?.data ?? []);
      const lockedList = Array.isArray(lockedRes.data) ? lockedRes.data : (lockedRes.data?.data ?? []);
      const shortIds = new Set(shortList.map((u: University) => u.id));
      const lockedIds = new Set(lockedList.map((u: University) => u.id));
      setShortlisted(shortIds.has(id!));
      setLocked(lockedIds.has(id!));
    } catch (e) {
      console.error(e);
    }
  };

  const handleShortlist = async () => {
    if (!university) return;
    try {
      await universityAPI.shortlist({
        university_id: university.id,
        category: shortlistCategory,
        notes: shortlistNotes || undefined,
      });
      setShortlisted(true);
      setShortlistModal(false);
      setShortlistNotes('');
    } catch (e: any) {
      alert(e.response?.data?.detail || 'Failed to shortlist');
    }
  };

  const handleLock = async () => {
    if (!university) return;
    try {
      await universityAPI.lock({ university_id: university.id });
      setLocked(true);
    } catch (e: any) {
      alert(e.response?.data?.detail || 'Lock failed. Shortlist first.');
    }
  };

  const handleUnlock = async () => {
    if (!university) return;
    try {
      await universityAPI.unlock(university.id);
      setLocked(false);
    } catch (e: any) {
      alert(e.response?.data?.detail || 'Failed to unlock');
    }
  };

  if (!user || loading) {
    return (
      <div className="min-h-screen bg-surface-50">
        <Navbar />
        <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center">
          <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
          <p className="mt-4 font-medium text-slate-600">Loading university...</p>
        </div>
      </div>
    );
  }

  if (!university) {
    return null;
  }

  const currency = university.currency || 'USD';

  return (
    <div className="min-h-screen bg-surface-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link
          href="/universities"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Discover
        </Link>

        <div className="bg-white rounded-2xl shadow-card border border-slate-200/80 overflow-hidden">
          <div className="w-full h-2 bg-gradient-to-r from-primary-400 via-primary-600 to-primary-800" />
          <div className="p-6 md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div>
                <h1 className="font-display text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                  {university.name}
                </h1>
                <div className="flex items-center gap-2 text-slate-600">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span>
                    {[university.city, university.country].filter(Boolean).join(', ')}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors"
                >
                  <Link2 className="w-4 h-4" />
                  {linkCopied ? 'Copied!' : 'Copy link'}
                </button>
                {university.ranking != null && (
                  <span className="px-3 py-1.5 rounded-xl bg-primary-100 text-primary-700 text-sm font-semibold">
                    Rank #{university.ranking}
                  </span>
                )}
              </div>
            </div>

            {university.description && (
              <p className="text-slate-600 leading-relaxed mb-6">{university.description}</p>
            )}

            {/* Key stats */}
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              {university.acceptance_rate != null && (
                <div className="rounded-xl bg-slate-50 border border-slate-100 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                    Acceptance rate
                  </p>
                  <p className="text-xl font-bold text-slate-900">
                    {(university.acceptance_rate * 100).toFixed(0)}%
                  </p>
                </div>
              )}
              {(university.tuition_min != null || university.tuition_max != null) && (
                <div className="rounded-xl bg-slate-50 border border-slate-100 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
                    <Banknote className="w-3.5 h-3.5" />
                    Tuition / year
                  </p>
                  <p className="text-xl font-bold text-slate-900">
                    {getCurrencySymbol(currency)}{' '}
                    {university.tuition_min?.toLocaleString()}
                    {university.tuition_max && university.tuition_max !== university.tuition_min
                      ? ` – ${university.tuition_max.toLocaleString()}`
                      : ''}{' '}
                    <span className="text-sm font-normal text-slate-600">
                      {getCurrencyName(currency)}
                    </span>
                  </p>
                </div>
              )}
              {university.min_gpa != null && (
                <div className="rounded-xl bg-slate-50 border border-slate-100 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                    Min GPA
                  </p>
                  <p className="text-xl font-bold text-slate-900">{university.min_gpa}</p>
                </div>
              )}
              {university.living_cost_estimate != null && (
                <div className="rounded-xl bg-slate-50 border border-slate-100 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                    Est. living cost
                  </p>
                  <p className="text-xl font-bold text-slate-900">
                    {getCurrencySymbol(currency)} {university.living_cost_estimate.toLocaleString()}{' '}
                    <span className="text-sm font-normal text-slate-600">/ year</span>
                  </p>
                </div>
              )}
            </div>

            {/* Requirements */}
            <div className="mb-6">
              <h3 className="font-display font-bold text-slate-900 mb-3 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary-600" />
                Exam requirements
              </h3>
              <ul className="flex flex-wrap gap-2">
                {university.toefl_required && (
                  <li className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 text-amber-800 text-sm font-medium">
                    <CheckCircle className="w-4 h-4" /> TOEFL
                  </li>
                )}
                {university.ielts_required && (
                  <li className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 text-amber-800 text-sm font-medium">
                    <CheckCircle className="w-4 h-4" /> IELTS
                  </li>
                )}
                {university.gre_required && (
                  <li className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 text-amber-800 text-sm font-medium">
                    <CheckCircle className="w-4 h-4" /> GRE
                  </li>
                )}
                {university.gmat_required && (
                  <li className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 text-amber-800 text-sm font-medium">
                    <CheckCircle className="w-4 h-4" /> GMAT
                  </li>
                )}
                {!university.toefl_required && !university.ielts_required && !university.gre_required && !university.gmat_required && (
                  <li className="text-slate-500 text-sm">No specific exam requirements listed.</li>
                )}
              </ul>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-200">
              {university.website && (
                <a
                  href={university.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors"
                >
                  <Globe className="w-5 h-5" />
                  Visit official website
                </a>
              )}
              {!shortlisted ? (
                <button
                  onClick={() => setShortlistModal(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 text-slate-800 font-semibold hover:bg-slate-200 transition-colors"
                >
                  <Target className="w-5 h-5" />
                  Add to shortlist
                </button>
              ) : locked ? (
                <button
                  onClick={handleUnlock}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-100 text-amber-800 font-semibold hover:bg-amber-200 transition-colors"
                >
                  <Unlock className="w-5 h-5" />
                  Unlock
                </button>
              ) : (
                <button
                  onClick={handleLock}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors"
                >
                  <Lock className="w-5 h-5" />
                  Lock (commit to apply)
                </button>
              )}
              <Link
                href="/compare"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors"
              >
                <Award className="w-5 h-5" />
                Compare with others
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Shortlist modal */}
      {shortlistModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <h3 className="font-display text-lg font-bold text-slate-900 mb-4">Add to shortlist</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
                <select
                  value={shortlistCategory}
                  onChange={(e) => setShortlistCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white"
                >
                  <option value="dream">Dream</option>
                  <option value="target">Target</option>
                  <option value="safe">Safe</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Notes (optional)</label>
                <textarea
                  value={shortlistNotes}
                  onChange={(e) => setShortlistNotes(e.target.value)}
                  placeholder="e.g. Strong in my field"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white resize-none"
                  rows={2}
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShortlistModal(false)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleShortlist}
                className="flex-1 px-4 py-2.5 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
