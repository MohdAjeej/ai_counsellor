'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { profileAPI, authAPI } from '@/lib/api';
import { ALL_CURRENCIES } from '@/lib/countryCurrency';
import { GraduationCap, ArrowRight } from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();
  const { user, setUser } = useAuthStore();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Academic background
    current_degree: '',
    current_gpa: '',
    current_institution: '',
    field_of_study: '',
    graduation_year: '',
    
    // Study goals
    desired_degree: '',
    desired_field: '',
    preferred_countries: '',
    study_start_year: '',
    
    // Budget
    budget_min: '',
    budget_max: '',
    currency: 'USD',
    
    // Exam readiness
    toefl_score: '',
    ielts_score: '',
    gre_score: '',
    gmat_score: '',
    exam_status: 'not_taken',
    
    // Additional
    work_experience_years: '0',
    research_experience: false,
    publications: '0',
  });

  useEffect(() => {
    if (!user) {
      router.push('/');
    } else if (user.is_onboarded) {
      router.push('/dashboard');
    }
  }, [user, router]);

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
        work_experience_years: parseInt(formData.work_experience_years),
        publications: parseInt(formData.publications),
      };

      await profileAPI.create(submitData);
      // Refresh user so is_onboarded is true; otherwise dashboard redirects back to onboarding
      const userResponse = await authAPI.getMe();
      setUser(userResponse.data);
      router.push('/dashboard');
    } catch (error: any) {
      alert(error.response?.data?.detail || 'Failed to save profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-center mb-8">
            <GraduationCap className="w-12 h-12 text-primary-600" />
          </div>
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
            Welcome! Let's Build Your Profile
          </h1>
          <p className="text-center text-gray-600 mb-8">
            This information helps us provide personalized recommendations
          </p>

          {/* Progress Steps */}
          <div className="flex justify-between mb-8">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex-1 flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step >= s ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {s}
                </div>
                {s < 4 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      step > s ? 'bg-primary-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            {/* Step 1: Academic Background */}
            {step === 1 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Academic Background</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Degree
                    </label>
                    <select
                      name="current_degree"
                      value={formData.current_degree}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">Select...</option>
                      <option value="High School">High School</option>
                      <option value="Bachelor's">Bachelor's</option>
                      <option value="Master's">Master's</option>
                      <option value="PhD">PhD</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current GPA (out of 4.0)
                    </label>
                    <input
                      type="number"
                      name="current_gpa"
                      value={formData.current_gpa}
                      onChange={handleChange}
                      step="0.01"
                      min="0"
                      max="4"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Institution
                    </label>
                    <input
                      type="text"
                      name="current_institution"
                      value={formData.current_institution}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Field of Study
                    </label>
                    <input
                      type="text"
                      name="field_of_study"
                      value={formData.field_of_study}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Graduation Year
                    </label>
                    <input
                      type="number"
                      name="graduation_year"
                      value={formData.graduation_year}
                      onChange={handleChange}
                      min="2000"
                      max="2030"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Study Goals */}
            {step === 2 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Study Goals</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Desired Degree
                    </label>
                    <select
                      name="desired_degree"
                      value={formData.desired_degree}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">Select...</option>
                      <option value="Bachelor's">Bachelor's</option>
                      <option value="Master's">Master's</option>
                      <option value="PhD">PhD</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Desired Field
                    </label>
                    <input
                      type="text"
                      name="desired_field"
                      value={formData.desired_field}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Countries (comma-separated)
                    </label>
                    <input
                      type="text"
                      name="preferred_countries"
                      value={formData.preferred_countries}
                      onChange={handleChange}
                      placeholder="e.g., United States, Canada, United Kingdom"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Study Start Year
                    </label>
                    <input
                      type="number"
                      name="study_start_year"
                      value={formData.study_start_year}
                      onChange={handleChange}
                      min="2024"
                      max="2030"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Budget & Exams */}
            {step === 3 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Budget & Exam Readiness</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Budget Min (per year)
                    </label>
                    <input
                      type="number"
                      name="budget_min"
                      value={formData.budget_min}
                      onChange={handleChange}
                      min="0"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Budget Max (per year)
                    </label>
                    <input
                      type="number"
                      name="budget_max"
                      value={formData.budget_max}
                      onChange={handleChange}
                      min="0"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Currency
                    </label>
                    <select
                      name="currency"
                      value={formData.currency}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    >
                      {ALL_CURRENCIES.map((c) => (
                          <option key={c.code} value={c.code}>{c.code} — {c.name}</option>
                        ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Exam Status
                    </label>
                    <select
                      name="exam_status"
                      value={formData.exam_status}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="not_taken">Not Taken</option>
                      <option value="scheduled">Scheduled</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      TOEFL Score
                    </label>
                    <input
                      type="number"
                      name="toefl_score"
                      value={formData.toefl_score}
                      onChange={handleChange}
                      min="0"
                      max="120"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      IELTS Score
                    </label>
                    <input
                      type="number"
                      name="ielts_score"
                      value={formData.ielts_score}
                      onChange={handleChange}
                      step="0.5"
                      min="0"
                      max="9"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      GRE Score
                    </label>
                    <input
                      type="number"
                      name="gre_score"
                      value={formData.gre_score}
                      onChange={handleChange}
                      min="260"
                      max="340"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      GMAT Score
                    </label>
                    <input
                      type="number"
                      name="gmat_score"
                      value={formData.gmat_score}
                      onChange={handleChange}
                      min="200"
                      max="800"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Additional Info */}
            {step === 4 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Additional Information</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Work Experience (years)
                    </label>
                    <input
                      type="number"
                      name="work_experience_years"
                      value={formData.work_experience_years}
                      onChange={handleChange}
                      min="0"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Publications
                    </label>
                    <input
                      type="number"
                      name="publications"
                      value={formData.publications}
                      onChange={handleChange}
                      min="0"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="research_experience"
                        checked={formData.research_experience}
                        onChange={handleChange}
                        className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        I have research experience
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={prevStep}
                disabled={step === 1}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              {step < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center space-x-2"
                >
                  <span>Next</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Saving...' : 'Complete Onboarding'}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

