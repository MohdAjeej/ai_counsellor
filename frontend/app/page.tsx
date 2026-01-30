'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store';
import { GraduationCap, Brain, Target, CheckCircle } from 'lucide-react';
import Footer from '@/components/Footer';

export default function LandingPage() {
  const router = useRouter();
  const { user } = useAuthStore();

  useEffect(() => {
    if (user) {
      if (!user.is_onboarded) {
        router.push('/onboarding');
      } else {
        router.push('/dashboard');
      }
    }
  }, [user, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <GraduationCap className="w-8 h-8 text-primary-600" />
            <span className="text-2xl font-bold text-gray-900">AI Counsellor</span>
          </div>
          <div className="space-x-4">
            <Link
              href="/login"
              className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Make Confident Study-Abroad Decisions
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your AI-powered counsellor guides you step-by-step from confusion to clarity
            in your study-abroad journey
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/register"
              className="px-8 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-lg font-semibold"
            >
              Start Your Journey
            </Link>
            <Link
              href="/login"
              className="px-8 py-4 bg-white text-primary-600 rounded-lg hover:bg-gray-50 transition-colors text-lg font-semibold border-2 border-primary-600"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <Brain className="w-12 h-12 text-primary-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">AI-Powered Guidance</h3>
            <p className="text-gray-600">
              Get personalized recommendations and insights based on your unique profile,
              goals, and constraints
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <Target className="w-12 h-12 text-primary-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">Structured Journey</h3>
            <p className="text-gray-600">
              Follow a clear, stage-based process from profile building to application
              preparation
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <CheckCircle className="w-12 h-12 text-primary-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">Decision Support</h3>
            <p className="text-gray-600">
              Shortlist, lock, and track your university choices with actionable to-dos
              and timelines
            </p>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="container mx-auto px-4 py-20 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h2>
          <div className="space-y-8">
            {[
              {
                step: '1',
                title: 'Complete Onboarding',
                description: 'Share your academic background, goals, budget, and exam readiness',
              },
              {
                step: '2',
                title: 'Get AI Analysis',
                description: 'Receive insights about your profile strengths and areas for improvement',
              },
              {
                step: '3',
                title: 'Discover Universities',
                description: 'Explore universities matched to your profile with risk assessments',
              },
              {
                step: '4',
                title: 'Shortlist & Lock',
                description: 'Organize universities into Dream, Target, and Safe categories, then lock your choices',
              },
              {
                step: '5',
                title: 'Application Guidance',
                description: 'Get personalized to-dos and timelines for your locked universities',
              },
            ].map((item) => (
              <div key={item.step} className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

