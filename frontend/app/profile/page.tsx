'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store';
import { profileAPI } from '@/lib/api';
import { ALL_CURRENCIES } from '@/lib/countryCurrency';
import Navbar from '@/components/Navbar';
import { User, ArrowLeft } from 'lucide-react';

const emptyForm = {
  current_degree: '',
  current_gpa: '',
  current_institution: '',
  field_of_study: '',
  graduation_year: '',
  desired_degree: '',
  desired_field: '',
  preferred_countries: '',
  study_start_year: '',
  budget_min: '',
  budget_max: '',
  currency: 'USD',
  toefl_score: '',
  ielts_score: '',
  gre_score: '',
  gmat_score: '',
  exam_status: 'not_taken',
  work_experience_years: '0',
  research_experience: false,
  publications: '0',
};

function profileToForm(p: any) {
  return {
    current_degree: p?.current_degree ?? '',
    current_gpa: p?.current_gpa != null ? String(p.current_gpa) : '',
    current_institution: p?.current_institution ?? '',
    field_of_study: p?.field_of_study ?? '',
    graduation_year: p?.graduation_year != null ? String(p.graduation_year) : '',
    desired_degree: p?.desired_degree ?? '',
    desired_field: p?.desired_field ?? '',
    preferred_countries: p?.preferred_countries ?? '',
    study_start_year: p?.study_start_year != null ? String(p.study_start_year) : '',
    budget_min: p?.budget_min != null ? String(p.budget_min) : '',
    budget_max: p?.budget_max != null ? String(p.budget_max) : '',
    currency: p?.currency ?? 'USD',
    toefl_score: p?.toefl_score != null ? String(p.toefl_score) : '',
    ielts_score: p?.ielts_score != null ? String(p.ielts_score) : '',
    gre_score: p?.gre_score != null ? String(p.gre_score) : '',
    gmat_score: p?.gmat_score != null ? String(p.gmat_score) : '',
    exam_status: p?.exam_status ?? 'not_taken',
    work_experience_years: p?.work_experience_years != null ? String(p.work_experience_years) : '0',
    research_experience: p?.research_experience ?? false,
    publications: p?.publications != null ? String(p.publications) : '0',
  };
}

export default function ProfilePage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [formData, setFormData] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/');
      return;
    }
    if (!user.is_onboarded) {
      router.push('/onboarding');
      return;
    }
    loadProfile();
  }, [user, router]);

  const loadProfile = async () => {
    try {
      const res = await profileAPI.get();
      setFormData(profileToForm(res.data));
    } catch {
      setFormData(emptyForm);
    } finally {
      setLoadingProfile(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const submitData = {
        ...formData,
        current_gpa: formData.current_gpa ? parseFloat(formData.current_gpa) : null,
        graduation_year: formData.graduation_year ? parseInt(formData.graduation_year) : null,
        study_start_year: formData.study_start_year ? parseInt(formData.study_start_year) : null,
        budget_min: formData.budget_min ? parseFloat(formData.budget_min) : null,
        budget_max: formData.budget_max ? parseFloat(formData.budget_max) : null,
        toefl_score: formData.toefl_score ? parseInt(formData.toefl_score) : null,
        ielts_score: formData.ielts_score ? parseFloat(formData.ielts_score) : null,
        gre_score: formData.gre_score ? parseInt(formData.gre_score) : null,
        gmat_score: formData.gmat_score ? parseInt(formData.gmat_score) : null,
        work_experience_years: parseInt(formData.work_experience_years) || 0,
        publications: parseInt(formData.publications) || 0,
      };
      await profileAPI.create(submitData);
      alert('Profile updated successfully.');
      router.push('/dashboard');
    } catch (err: any) {
      const detail = err?.response?.data?.detail;
      const msg = typeof detail === 'string' ? detail : Array.isArray(detail) ? detail.map((d: { msg?: string }) => d.msg).join('. ') : 'Failed to save profile.';
      alert(msg || 'Failed to save profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!user || loadingProfile) {
    return (
      <div className="min-h-screen bg-surface-50">
        <Navbar />
        <div className="container mx-auto px-4 py-24 flex justify-center">
          <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
        <div className="bg-white rounded-2xl shadow-card border border-slate-200/80 p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center">
              <User className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-slate-900">Edit Profile</h1>
              <p className="text-slate-600 text-sm">Update your academic and study preferences.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Academic */}
            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Academic Background</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Current Degree</label>
                  <select name="current_degree" value={formData.current_degree} onChange={handleChange} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500">
                    <option value="">Select...</option>
                    <option value="High School">High School</option>
                    <option value="Bachelor's">Bachelor's</option>
                    <option value="Master's">Master's</option>
                    <option value="PhD">PhD</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Current GPA (4.0)</label>
                  <input type="number" name="current_gpa" value={formData.current_gpa} onChange={handleChange} step="0.01" min="0" max="4" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Current Institution</label>
                  <input type="text" name="current_institution" value={formData.current_institution} onChange={handleChange} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Field of Study</label>
                  <input type="text" name="field_of_study" value={formData.field_of_study} onChange={handleChange} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Graduation Year</label>
                  <input type="number" name="graduation_year" value={formData.graduation_year} onChange={handleChange} min="2000" max="2030" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500" />
                </div>
              </div>
            </section>

            {/* Study goals */}
            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Study Goals</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Desired Degree</label>
                  <select name="desired_degree" value={formData.desired_degree} onChange={handleChange} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500">
                    <option value="">Select...</option>
                    <option value="Bachelor's">Bachelor's</option>
                    <option value="Master's">Master's</option>
                    <option value="PhD">PhD</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Desired Field</label>
                  <input type="text" name="desired_field" value={formData.desired_field} onChange={handleChange} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Preferred Countries (comma-separated)</label>
                  <input type="text" name="preferred_countries" value={formData.preferred_countries} onChange={handleChange} placeholder="e.g., United States, Canada" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Study Start Year</label>
                  <input type="number" name="study_start_year" value={formData.study_start_year} onChange={handleChange} min="2024" max="2030" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500" />
                </div>
              </div>
            </section>

            {/* Budget & exams */}
            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Budget & Exams</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Budget Min (per year)</label>
                  <input type="number" name="budget_min" value={formData.budget_min} onChange={handleChange} min="0" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Budget Max (per year)</label>
                  <input type="number" name="budget_max" value={formData.budget_max} onChange={handleChange} min="0" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Currency</label>
                  <select name="currency" value={formData.currency} onChange={handleChange} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500">
                    {ALL_CURRENCIES.map((c) => (
                        <option key={c.code} value={c.code}>{c.code} — {c.name}</option>
                      ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Exam Status</label>
                  <select name="exam_status" value={formData.exam_status} onChange={handleChange} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500">
                    <option value="not_taken">Not Taken</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">TOEFL Score</label>
                  <input type="number" name="toefl_score" value={formData.toefl_score} onChange={handleChange} min="0" max="120" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">IELTS Score</label>
                  <input type="number" name="ielts_score" value={formData.ielts_score} onChange={handleChange} step="0.5" min="0" max="9" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">GRE Score</label>
                  <input type="number" name="gre_score" value={formData.gre_score} onChange={handleChange} min="260" max="340" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">GMAT Score</label>
                  <input type="number" name="gmat_score" value={formData.gmat_score} onChange={handleChange} min="200" max="800" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500" />
                </div>
              </div>
            </section>

            {/* Additional */}
            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Additional</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Work Experience (years)</label>
                  <input type="number" name="work_experience_years" value={formData.work_experience_years} onChange={handleChange} min="0" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Publications</label>
                  <input type="number" name="publications" value={formData.publications} onChange={handleChange} min="0" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500" />
                </div>
                <div className="md:col-span-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="research_experience" checked={formData.research_experience} onChange={handleChange} className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500" />
                    <span className="text-sm font-medium text-slate-700">I have research experience</span>
                  </label>
                </div>
              </div>
            </section>

            <div className="flex gap-3 pt-4">
              <Link href="/dashboard" className="px-6 py-2.5 border border-slate-200 rounded-xl text-slate-700 font-medium hover:bg-slate-50">
                Cancel
              </Link>
              <button type="submit" disabled={loading} className="px-6 py-2.5 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 disabled:opacity-50">
                {loading ? 'Saving...' : 'Save changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
