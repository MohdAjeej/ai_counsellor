'use client';

import Link from 'next/link';
import { useAuthStore } from '@/lib/store';
import Navbar from '@/components/Navbar';
import { HelpCircle, ArrowLeft } from 'lucide-react';

const FAQ_ITEMS = [
  {
    q: 'Is AI Counsellor really free?',
    a: 'You can sign up and use the platform to build your profile, get AI analysis, discover universities, and shortlist. Core guidance and matching are free to help you make confident decisions.',
  },
  {
    q: 'How does the AI Counsellor work?',
    a: 'After you complete your profile (degree, GPA, budget, preferred countries, exam scores), our AI gives you personalized analysis and chat support. You can ask questions and get recommendations tailored to your situation.',
  },
  {
    q: 'What does "lock" a university mean?',
    a: "Shortlisting saves universities you're interested in. Locking means you've committed to applying to that university—once you lock at least one, you get access to application to-dos and timelines for them.",
  },
  {
    q: 'Can I edit my profile later?',
    a: 'Yes. Click your name in the top bar to open Edit Profile. You can update your academic info, budget, and preferences anytime.',
  },
];

export default function HelpPage() {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="container mx-auto px-4 py-10 md:py-16">
        <Link
          href={user ? '/dashboard' : '/'}
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {user ? 'Back to Dashboard' : 'Back to Home'}
        </Link>

        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center">
              <HelpCircle className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h1 className="font-display text-2xl md:text-3xl font-bold text-slate-900">
                Help & FAQ
              </h1>
              <p className="text-slate-600 text-sm mt-0.5">
                Common questions about AI Counsellor
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {FAQ_ITEMS.map((faq) => (
              <div
                key={faq.q}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h2 className="font-display font-bold text-slate-900 mb-2">
                  {faq.q}
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
