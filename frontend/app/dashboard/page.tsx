'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store';
import { profileAPI, counsellorAPI, universityAPI } from '@/lib/api';
import Navbar from '@/components/Navbar';
import { 
  UserCircle, Brain, Search, Lock, CheckCircle, 
  ArrowRight, TrendingUp, Target, AlertCircle 
} from 'lucide-react';

const stages = [
  { id: 'onboarding', name: 'Onboarding', icon: UserCircle },
  { id: 'dashboard', name: 'Dashboard', icon: TrendingUp },
  { id: 'discovery', name: 'Discovery', icon: Search },
  { id: 'shortlisting', name: 'Shortlisting', icon: Target },
  { id: 'application', name: 'Application', icon: CheckCircle },
];

export default function DashboardPage() {
  const router = useRouter();
  const { user, setUser } = useAuthStore();
  const [profile, setProfile] = useState<any>(null);
  const [analysis, setAnalysis] = useState<string>('');
  const [shortlistedCount, setShortlistedCount] = useState(0);
  const [lockedCount, setLockedCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    if (!user.is_onboarded) {
      router.push('/onboarding');
      return;
    }
    loadData();
  }, [user, router]);

  const loadData = async () => {
    try {
      const [profileRes, analysisRes, shortlistedRes, lockedRes] = await Promise.all([
        profileAPI.get().catch(() => null),
        counsellorAPI.getAnalysis().catch(() => null),
        universityAPI.getShortlisted().catch(() => ({ data: [] })),
        universityAPI.getLocked().catch(() => ({ data: [] })),
      ]);

      if (profileRes) setProfile(profileRes.data);
      if (analysisRes) setAnalysis(analysisRes.data.analysis);
      if (shortlistedRes) setShortlistedCount(shortlistedRes.data.length);
      if (lockedRes) setLockedCount(lockedRes.data.length);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user || loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  const currentStageIndex = stages.findIndex(s => s.id === user.current_stage);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

        {/* Stage Progress */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Journey</h2>
          <div className="flex items-center justify-between">
            {stages.map((stage, index) => {
              const Icon = stage.icon;
              const isCompleted = index < currentStageIndex;
              const isCurrent = index === currentStageIndex;
              
              return (
                <div key={stage.id} className="flex-1 flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        isCompleted
                          ? 'bg-green-500 text-white'
                          : isCurrent
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs mt-2 text-gray-600 text-center">{stage.name}</span>
                  </div>
                  {index < stages.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-2 ${
                        isCompleted ? 'bg-green-500' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Shortlisted</p>
                <p className="text-3xl font-bold text-gray-900">{shortlistedCount}</p>
              </div>
              <Target className="w-12 h-12 text-primary-600 opacity-20" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Locked</p>
                <p className="text-3xl font-bold text-gray-900">{lockedCount}</p>
              </div>
              <Lock className="w-12 h-12 text-green-600 opacity-20" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Current Stage</p>
                <p className="text-lg font-semibold text-gray-900 capitalize">
                  {user.current_stage}
                </p>
              </div>
              <TrendingUp className="w-12 h-12 text-blue-600 opacity-20" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Link
            href="/counsellor"
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-4 mb-4">
              <Brain className="w-8 h-8 text-primary-600" />
              <h3 className="text-xl font-semibold text-gray-900">AI Counsellor</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Get personalized guidance and recommendations from your AI counsellor
            </p>
            <div className="flex items-center text-primary-600 font-semibold">
              <span>Chat Now</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </div>
          </Link>

          <Link
            href="/universities"
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-4 mb-4">
              <Search className="w-8 h-8 text-primary-600" />
              <h3 className="text-xl font-semibold text-gray-900">Discover Universities</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Explore universities matched to your profile and preferences
            </p>
            <div className="flex items-center text-primary-600 font-semibold">
              <span>Explore</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </div>
          </Link>
        </div>

        {/* Profile Analysis */}
        {analysis && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <AlertCircle className="w-5 h-5 text-primary-600" />
              <h2 className="text-xl font-semibold text-gray-900">Profile Analysis</h2>
            </div>
            <div className="prose max-w-none">
              <p className="text-gray-700 whitespace-pre-wrap">{analysis}</p>
            </div>
          </div>
        )}

        {/* Next Steps */}
        <div className="bg-primary-50 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Next Steps</h2>
          <ul className="space-y-2">
            {user.current_stage === 'dashboard' && (
              <li className="flex items-center space-x-2 text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Start chatting with your AI Counsellor to get recommendations</span>
              </li>
            )}
            {shortlistedCount === 0 && (
              <li className="flex items-center space-x-2 text-gray-700">
                <ArrowRight className="w-5 h-5 text-primary-600" />
                <span>Discover and shortlist universities that match your profile</span>
              </li>
            )}
            {shortlistedCount > 0 && lockedCount === 0 && (
              <li className="flex items-center space-x-2 text-gray-700">
                <ArrowRight className="w-5 h-5 text-primary-600" />
                <span>Lock at least one university to proceed to application guidance</span>
              </li>
            )}
            {lockedCount > 0 && (
              <li className="flex items-center space-x-2 text-gray-700">
                <ArrowRight className="w-5 h-5 text-primary-600" />
                <Link href="/application" className="text-primary-600 hover:underline">
                  View your application to-dos and timelines
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

