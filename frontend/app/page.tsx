'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store';
import {
  GraduationCap,
  Brain,
  Target,
  CheckCircle,
  Search,
  Lock,
  ArrowRight,
  Globe,
  Sparkles,
  Zap,
  Layers,
  Heart,
} from 'lucide-react';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';

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
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200/80 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-primary-100 flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                <GraduationCap className="w-5 h-5 text-primary-600" />
              </div>
              <span className="font-display text-xl font-bold text-slate-900">AI Counsellor</span>
            </Link>
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="px-4 py-2 text-slate-600 hover:text-slate-900 font-medium transition-colors rounded-lg hover:bg-slate-50"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-5 py-2.5 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-all shadow-md hover:shadow-lg"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero - text + study-abroad image */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
            <div className="text-center lg:text-left order-2 lg:order-1">
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-tight mb-6">
                Build Your Study-Abroad Journey.
                <br />
                <span className="text-primary-600">With Confidence.</span>
              </h1>
              <p className="text-xl text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Your AI-powered counsellor guides you step-by-step from profile to application.
                One platform. Personalized guidance. The right university fit.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-600 text-white rounded-xl font-semibold text-lg hover:bg-primary-700 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
              <p className="mt-6 text-sm text-slate-500">
                Free to start · AI guidance · University matching · No obligation
              </p>
            </div>
            <div className="relative order-1 lg:order-2 rounded-2xl overflow-hidden shadow-lg border border-slate-200/80 aspect-[4/3] lg:aspect-auto lg:min-h-[380px] bg-slate-100">
              {/* Hero: real photograph only (no AI, no illustration). Free stock photo; if it does not load, add your own photo as public/hero.jpg */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Student studying - study abroad journey"
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                  const el = e.currentTarget;
                  if (el.src && !el.src.endsWith('/hero.jpg')) {
                    el.onerror = null;
                    el.src = '/hero.jpg';
                  }
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Showcase card - AI Counsellor value prop + feature highlights (SaaS-style) */}
      <section className="relative bg-gradient-to-b from-slate-50 to-white border-y border-slate-200/60" aria-labelledby="ai-counsellor-heading">
        <div className="container mx-auto px-4 py-14 md:py-20">
          <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200/80 overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:items-stretch gap-8 lg:gap-8 p-8 md:p-12 lg:p-14">
              {/* Left: value prop + CTA */}
              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <div className="inline-flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-primary-100 flex items-center justify-center shadow-sm border border-primary-200/50" aria-hidden>
                    <Brain className="w-6 h-6 text-primary-600" aria-hidden />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-primary-600/90" id="ai-counsellor-label">
                    AI Counsellor
                  </span>
                </div>
                <h2 id="ai-counsellor-heading" className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight leading-tight mb-3">
                  Your study-abroad counsellor, always on.
                </h2>
                <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-8 max-w-lg">
                  Your journey to the right university starts here. Profile-based matching, shortlists, and application to-dos—all in one place.
                </p>
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-primary-600 text-white rounded-2xl font-semibold text-base shadow-lg shadow-primary-600/25 hover:bg-primary-700 hover:shadow-xl hover:shadow-primary-600/30 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 active:scale-[0.98] transition-all duration-200 w-fit"
                >
                  Start Your Journey
                  <ArrowRight className="w-5 h-5 shrink-0" aria-hidden />
                </Link>
              </div>
              {/* Right: feature cards — 2x2 grid, two sections per row */}
              <div className="grid grid-cols-2 gap-3 w-full lg:min-w-0 lg:max-w-[360px]">
                {[
                  { label: 'Free', value: 'Start', icon: Sparkles, accent: 'primary' },
                  { label: 'AI-Powered', value: 'Guidance', icon: Zap, accent: 'primary' },
                  { label: '5 Steps', value: 'Simple', icon: Layers, accent: 'primary' },
                  { label: 'Yours', value: '100%', icon: Heart, accent: 'emerald' },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className={`group flex flex-col items-center justify-center text-center p-4 rounded-2xl border-2 transition-all duration-300 min-w-0 hover:-translate-y-0.5 hover:shadow-lg focus-within:ring-2 focus-within:ring-primary-400 focus-within:ring-offset-2 ${
                        item.accent === 'emerald'
                          ? 'bg-emerald-50/90 border-emerald-200/80 hover:bg-emerald-50 hover:shadow-emerald-200/30 hover:border-emerald-300/80'
                          : 'bg-primary-50/90 border-primary-200/80 hover:bg-primary-50 hover:shadow-primary-200/30 hover:border-primary-300/80'
                      }`}
                    >
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-2.5 shadow-sm ring-2 ring-white/80 transition-transform duration-300 group-hover:scale-110 ${
                          item.accent === 'emerald' ? 'bg-emerald-100' : 'bg-primary-100'
                        }`}
                      >
                        <Icon
                          className={`w-6 h-6 shrink-0 ${item.accent === 'emerald' ? 'text-emerald-600' : 'text-primary-600'}`}
                          strokeWidth={2.25}
                          aria-hidden
                        />
                      </div>
                      <p className="text-sm font-bold text-slate-900 leading-tight whitespace-nowrap truncate w-full px-1">{item.value}</p>
                      <p className="text-xs text-slate-600 leading-tight font-medium whitespace-nowrap truncate w-full px-1">{item.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - Oaysus style "Real results" */}
      <section className="bg-slate-50 border-y border-slate-200/80">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <h2 className="font-display text-3xl font-bold text-slate-900 text-center mb-4">
            What students say
          </h2>
          <p className="text-slate-600 text-center max-w-2xl mx-auto mb-12">
            Real results from students who used AI Counsellor to plan their study-abroad journey.
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto md:items-stretch">
            {[
              {
                quote: 'From confusion to a locked shortlist in a few weeks. The AI counsellor explained risks and next steps. My dashboard keeps everything in one place.',
                name: 'Maria L.',
                role: 'Bachelor\'s applicant, Brazil',
                photo: 'https://i.pravatar.cc/150?img=47',
                alt: 'Maria L. - Reviewer',
              },
              {
                quote: 'AI Counsellor gave me a clear shortlist in one place. No more endless spreadsheets—I locked two universities and now I\'m tracking my application to-dos here.',
                name: 'Priya S.',
                role: 'Master\'s applicant, India',
                photo: 'https://i.pravatar.cc/150?img=32',
                alt: 'Priya S. - Reviewer',
              },
              {
                quote: 'The profile-based matching actually made sense. I could see why each university fit my budget and GPA. Locking my choices made me focus instead of second-guessing.',
                name: 'Ahmed K.',
                role: 'PhD applicant, Egypt',
                photo: 'https://i.pravatar.cc/150?img=12',
                alt: 'Ahmed K. - Reviewer',
              },
            ].map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-md overflow-hidden flex flex-col h-full">
                <p className="text-slate-700 text-sm leading-relaxed mb-6 flex-1 min-h-[7rem]">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3 flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={t.photo}
                    alt={t.alt}
                    className="w-12 h-12 rounded-full object-cover border-2 border-slate-200 bg-slate-100 flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="font-display font-bold text-slate-900">{t.name}</p>
                    <p className="text-slate-500 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sound familiar? - pain points + study image */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row gap-10 items-center max-w-5xl mx-auto mb-12">
          <div className="relative w-full md:w-80 flex-shrink-0 rounded-2xl overflow-hidden shadow-lg border border-slate-200/80 aspect-[4/3] md:aspect-square bg-slate-100">
            {/* Education image: student studying (Unsplash, free to use). Native img for reliable load. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80"
              alt="Student studying and planning - education journey"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="text-center md:text-left">
            <h2 className="font-display text-3xl font-bold text-slate-900 mb-4">
              Sound familiar?
            </h2>
            <p className="text-slate-600 max-w-xl">
              Most students planning to study abroad face these exact challenges. You are not alone.
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[
            {
              title: 'Stuck choosing countries and universities?',
              text: 'You have your grades, your budget, and your goals. But which countries and schools actually fit? You need clarity, not another generic list.',
            },
            {
              title: 'Spending hours on random university lists?',
              text: 'Your time is valuable. Scrolling through rankings and forums without a clear strategy is exhausting. You need a structured path.',
            },
            {
              title: 'Not sure what to include in your profile?',
              text: 'GPA, exams, budget, preferences—how do you turn all of that into a shortlist? You need guidance that understands your situation.',
            },
            {
              title: 'Worried about missing application deadlines?',
              text: 'Once you lock your choices, you need to-dos and timelines—not a scattered checklist. You need one place to track everything.',
            },
          ].map((item) => (
            <div key={item.title} className="p-6 rounded-2xl border border-slate-200 bg-white hover:border-primary-200 hover:shadow-card transition-all">
              <h3 className="font-display text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What You Get - feature grid */}
      <section className="bg-slate-50 border-y border-slate-200/80">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <h2 className="font-display text-3xl font-bold text-slate-900 text-center mb-4">
            What You Get
          </h2>
          <p className="text-slate-600 text-center max-w-2xl mx-auto mb-12">
            Everything you need to go from &quot;I want to study abroad&quot; to a clear shortlist and application plan.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Brain, title: 'AI Counsellor', desc: 'Personalized guidance and recommendations based on your profile, goals, and budget.' },
              { icon: Target, title: 'Profile-Based Matching', desc: 'Universities filtered by your GPA, budget, preferred countries, and exam scores.' },
              { icon: Search, title: 'Discover Universities', desc: 'Explore a global database with country-wise currency and official links.' },
              { icon: Lock, title: 'Shortlist & Lock', desc: 'Organize schools as Dream, Target, and Safe. Lock choices to unlock application guidance.' },
              { icon: CheckCircle, title: 'Application To-Dos', desc: 'Track tasks and deadlines for each locked university in one place.' },
              { icon: Globe, title: 'One Dashboard', desc: 'Your journey, stats, and next steps in one clean dashboard.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card hover:shadow-card-hover transition-all">
                <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-primary-600" />
                </div>
                <h3 className="font-display text-lg font-bold text-slate-900 mb-2">{title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process - How it works, numbered */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <h2 className="font-display text-3xl font-bold text-slate-900 text-center mb-4">
          From signup to application in 5 steps
        </h2>
        <p className="text-slate-600 text-center max-w-2xl mx-auto mb-12">
          You focus on your goals. We give you the structure and the AI counsellor.
        </p>
        <div className="max-w-3xl mx-auto space-y-8">
          {[
            { step: '1', day: 'Day 1', title: 'Sign up & complete your profile', desc: 'Share your academic background, desired degree, budget, and exam readiness.' },
            { step: '2', day: 'Day 1', title: 'Get AI analysis', desc: 'Receive insights on your profile strengths and areas to improve.' },
            { step: '3', day: 'Ongoing', title: 'Discover & shortlist universities', desc: 'Explore universities matched to your profile. Shortlist and lock your choices.' },
            { step: '4', day: 'Ongoing', title: 'Chat with your AI Counsellor', desc: 'Ask questions, get recommendations, and refine your list with personalized guidance.' },
            { step: '5', day: 'When ready', title: 'Application guidance', desc: 'Get to-dos and timelines for each locked university so you never miss a deadline.' },
          ].map((item) => (
            <div key={item.step} className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-600 text-white flex items-center justify-center font-display font-bold text-lg">
                {item.step}
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-primary-600 mb-1">{item.day}</p>
                <h3 className="font-display text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Perfect for - audience pills */}
      <section className="bg-gradient-to-b from-white to-slate-50/80 border-y border-slate-200/60">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-900 text-center mb-8 tracking-tight">
            Perfect for
          </h2>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {['Undergraduate applicants', 'Master’s applicants', 'PhD applicants', 'First-time study abroad', 'Students with a budget in mind', 'Students who want AI guidance'].map((label) => (
              <span
                key={label}
                className="px-5 py-2.5 rounded-full bg-white border border-slate-200/80 text-slate-700 text-sm font-medium shadow-sm hover:shadow-md hover:border-primary-200/80 hover:bg-primary-50/50 hover:text-primary-800 transition-all duration-200"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="container mx-auto px-4 py-16 md:py-24 scroll-mt-20">
        <h2 className="font-display text-3xl font-bold text-slate-900 text-center mb-12">
          Questions we get asked
        </h2>
        <div className="max-w-2xl mx-auto space-y-6">
          {[
            {
              q: 'Is AI Counsellor really free?',
              a: 'You can sign up and use the platform to build your profile, get AI analysis, discover universities, and shortlist. Core guidance and matching are free to help you make confident decisions.',
            },
            {
              q: 'How does the AI Counsellor work?',
              a: 'After you complete your profile (degree, GPA, budget, preferred countries, exam scores), our AI gives you personalized analysis and chat support. You can ask questions and get recommendations tailored to your situation.',
            },
            {
              q: 'What does “lock” a university mean?',
              a: 'Shortlisting saves universities you’re interested in. Locking means you’ve committed to applying to that university—once you lock at least one, you get access to application to-dos and timelines for them.',
            },
            {
              q: 'Can I edit my profile later?',
              a: 'Yes. Click your name in the top bar to open Edit Profile. You can update your academic info, budget, and preferences anytime.',
            },
          ].map((faq) => (
            <div key={faq.q} className="rounded-xl border border-slate-200 bg-white p-6">
              <h3 className="font-display font-bold text-slate-900 mb-2">{faq.q}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA - "Your future clients are searching" style */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Your dream university is out there
            </h2>
            <p className="text-primary-100 text-lg mb-8">
              Start with a free profile. Get AI guidance. Discover and shortlist universities that fit—then lock and track your applications.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-700 rounded-xl font-semibold text-lg hover:bg-primary-50 transition-colors"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="mt-6 text-sm text-primary-200">
              No credit card · Free to start · 100% yours
            </p>
          </div>
        </div>
      </section>

      <Footer />
      <BackToTop />
    </div>
  );
}
