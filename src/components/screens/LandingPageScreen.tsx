import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  GraduationCap,
  Award,
  BookOpen,
  Calendar,
  Users,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Zap,
  Star,
  Clock,
  FileText,
  BarChart3,
  UserCheck,
  ChevronRight,
  Send,
} from 'lucide-react';

export const LandingPageScreen: React.FC = () => {
  const { setCurrentScreen, showToast } = useApp();
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryCourse, setInquiryCourse] = useState('JEE Advanced Target');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName || !inquiryPhone) return;
    setIsSubmitted(true);
    showToast(`Inquiry received for ${inquiryName}! Our admission desk will call you shortly.`);
  };

  const courses = [
    {
      title: 'JEE Advanced / Main Integrated',
      target: 'Class 11th & 12th',
      duration: '1 & 2 Year Programs',
      badge: 'Most Popular',
      color: 'from-amber-500 to-yellow-600',
      description: 'Rigorous physics, chemistry, and mathematics coaching with daily practice problem sets, weekly grand tests, and personal mentoring.',
      features: ['Daily 3-Hour Interactive Lectures', '15,000+ Solved Question Bank', 'Personal Doubt Clearing Slots', 'AI-Powered Rank Analytics'],
    },
    {
      title: 'NEET Medical Mastery',
      target: 'Class 11th & 12th',
      duration: '1 & 2 Year Programs',
      badge: 'Top Results',
      color: 'from-emerald-500 to-teal-600',
      description: 'Comprehensive biology (botany & zoology), organic chemistry, and physics tailored specifically for NEET NCERT conceptual clarity.',
      features: ['NCERT Line-by-Line Mastery', 'Mock Tests on Exact NTA Pattern', 'Diagram Memory Tricks', 'Regular Doctor Seminars'],
    },
    {
      title: 'Class 9th & 10th Foundation Genius',
      target: 'Class 9th & 10th',
      duration: '1 Year Program',
      badge: 'Early Start',
      color: 'from-blue-600 to-indigo-700',
      description: 'Strong foundation for Olympiads, NTSE, and early preparation for XI-XII competitive engineering & medical benchmarks.',
      features: ['Mental Ability & Analytical Math', 'Science Lab Demonstrations', 'School Exam 95%+ Target', 'Olympiad Rank Training'],
    },
  ];

  const features = [
    {
      icon: <Award className="w-6 h-6 text-amber-500" />,
      title: 'Real-Time Online MCQ Tests',
      desc: 'Simulated NTA & JEE testing engine with detailed solutions, instant rank calculations, and performance metrics.',
    },
    {
      icon: <BookOpen className="w-6 h-6 text-blue-500" />,
      title: 'Handcrafted Study Notes',
      desc: 'High-yield PDF summaries, formula booklets, video masterclasses, and chapter-wise numerical sheets uploaded daily.',
    },
    {
      icon: <Calendar className="w-6 h-6 text-emerald-500" />,
      title: 'Attendance & Class Logs',
      desc: 'Biometric & online attendance logs with instant parent notifications, monthly percentage reports, and holiday calendars.',
    },
    {
      icon: <Users className="w-6 h-6 text-purple-500" />,
      title: 'Parent Progress Portal',
      desc: 'Dedicated parent view to track child test scores, attendance, batch timetable, and schedule teacher meetings.',
    },
  ];

  const achievements = [
    { rank: 'AIR 14', exam: 'JEE Advanced 2025', name: 'Aditya Sharma', score: '332 / 360' },
    { rank: 'AIR 42', exam: 'NEET UG 2025', name: 'Priya Sundaram', score: '710 / 720' },
    { rank: '99.8%ile', exam: 'JEE Main 2025', name: 'Kavya Reddy', score: '99.85 %' },
    { rank: 'AIR 88', exam: 'KVPY Fellow', name: 'Rohan Deshmukh', score: 'Scholar' },
  ];

  return (
    <div className="flex-1 bg-slate-900 text-slate-100 overflow-y-auto selection:bg-amber-400 selection:text-slate-900">
      {/* Top Bar Announcement */}
      <div className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-slate-950 font-black text-[11px] py-2 px-4 text-center flex items-center justify-center gap-2 shadow-sm">
        <Sparkles className="w-3.5 h-3.5 animate-spin" />
        <span>ADMISSIONS OPEN FOR BATCH 2026-2027 • JEE & NEET SCHOLARSHIP TEST THIS SUNDAY</span>
        <button
          onClick={() => setCurrentScreen('dashboard')}
          className="ml-2 bg-slate-950 text-white text-[10px] font-bold px-2 py-0.5 rounded-full hover:bg-slate-800 transition"
        >
          Portal Entry →
        </button>
      </div>

      {/* Navigation Header */}
      <nav className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 flex items-center justify-center text-slate-950 font-black text-sm shadow-md border border-amber-200/60">
            CCC
          </div>
          <div>
            <h1 className="font-extrabold text-sm text-white leading-none">
              Challenge Coaching <span className="text-amber-400 font-bold">Classes</span>
            </h1>
            <p className="text-[10px] text-slate-400">Aim High, Achieve Higher</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentScreen('welcome')}
            className="text-xs font-bold text-slate-300 hover:text-white px-3 py-1.5 rounded-xl border border-slate-700 hover:border-slate-500 transition"
          >
            Admin Login
          </button>
          <button
            onClick={() => setCurrentScreen('dashboard')}
            className="text-xs font-extrabold bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 px-3.5 py-1.5 rounded-xl shadow-md hover:from-amber-300 hover:to-yellow-300 transition flex items-center gap-1.5"
          >
            <span>Enter App Portal</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-4 py-12 md:py-20 max-w-6xl mx-auto overflow-hidden text-center md:text-left">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full filter blur-3xl -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full filter blur-3xl -z-10 pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Bengaluru's Premier JEE & NEET Coaching Academy</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Transform Your Dreams Into Top National <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500">Ranks & Success</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
              Welcome to <strong>Challenge Coaching Classes</strong>, directed by <strong>Manjunath Sarjapur</strong>.
              We provide expert faculty guidance, live online MCQ test series with rank analysis, handcrafted study notes, and personal mentorship.
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
              <button
                onClick={() => setCurrentScreen('dashboard')}
                className="px-6 py-3 bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-black rounded-2xl shadow-xl hover:from-amber-300 hover:to-yellow-300 transition flex items-center gap-2 text-sm"
              >
                <span>Launch Academy App Portal</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <a
                href="#inquiry"
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-extrabold rounded-2xl border border-slate-700 transition text-sm flex items-center gap-2"
              >
                <span>Request Admission Call</span>
                <Phone className="w-4 h-4 text-amber-400" />
              </a>
            </div>

            {/* Quick Hero Stats */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-800">
              <div className="bg-slate-850/60 p-3 rounded-2xl border border-slate-800 text-center md:text-left">
                <span className="text-xl sm:text-2xl font-black text-amber-400 block">5,000+</span>
                <span className="text-[11px] text-slate-400 font-semibold">Students Mentored</span>
              </div>
              <div className="bg-slate-850/60 p-3 rounded-2xl border border-slate-800 text-center md:text-left">
                <span className="text-xl sm:text-2xl font-black text-emerald-400 block">98.4%</span>
                <span className="text-[11px] text-slate-400 font-semibold">JEE/NEET Qualifiers</span>
              </div>
              <div className="bg-slate-850/60 p-3 rounded-2xl border border-slate-800 text-center md:text-left">
                <span className="text-xl sm:text-2xl font-black text-blue-400 block">4.9 / 5</span>
                <span className="text-[11px] text-slate-400 font-semibold">Parent & Student Rating</span>
              </div>
            </div>
          </div>

          {/* Director Banner Card */}
          <div className="md:col-span-5">
            <div className="bg-gradient-to-br from-slate-800 via-slate-850 to-slate-900 border border-slate-700/80 rounded-3xl p-6 shadow-2xl relative overflow-hidden space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                  alt="Manjunath Sarjapur"
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-400 shadow-lg"
                />
                <div>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-400 text-slate-950">
                    SUPER ADMIN & DIRECTOR
                  </span>
                  <h3 className="font-extrabold text-base text-white mt-1">Manjunath Sarjapur</h3>
                  <p className="text-xs text-slate-400 font-medium">Founder & Director of Academy</p>
                </div>
              </div>

              <blockquote className="text-xs italic text-slate-300 leading-relaxed border-l-2 border-amber-400 pl-3">
                "Our mission at Challenge Coaching Classes is to foster conceptual clarity, build exam stamina, and provide real-time digital tracking for every student's growth."
              </blockquote>

              <div className="space-y-2 pt-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="font-bold text-white">manjunathsarjapur1995@gmail.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="font-bold text-white">+91 98765 43210</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Sarjapur Main Road, Bengaluru, KA</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setCurrentScreen('dashboard')}
                  className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-xs transition flex items-center justify-center gap-1.5"
                >
                  <span>Open Super Admin Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* App Real-Time Feature Highlights */}
      <section className="bg-slate-950 py-12 px-4 border-y border-slate-800">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              SMART REAL-TIME INFRASTRUCTURE
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Everything You Need To Excel, Powered By Real-Time Data
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
              Our web & mobile platform syncs attendance, test scores, study materials, and timetables instantly across Super Admin, Faculty, Students, and Parents.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((f, i) => (
              <div
                key={i}
                className="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-3 hover:border-slate-700 transition group"
              >
                <div className="p-3 bg-slate-800 w-fit rounded-2xl group-hover:scale-110 transition">
                  {f.icon}
                </div>
                <h3 className="font-bold text-base text-white">{f.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Rankers & Results */}
      <section className="py-12 px-4 max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
            PROVEN TRACK RECORD
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Hall of Fame — Recent Top Rankers
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Celebrating our students who cracked national engineering and medical entrances with stellar scores.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {achievements.map((a, i) => (
            <div
              key={i}
              className="bg-gradient-to-b from-slate-850 to-slate-900 border border-slate-800 p-4 rounded-3xl text-center space-y-2 relative overflow-hidden shadow-md"
            >
              <div className="w-12 h-12 bg-amber-400/20 text-amber-300 font-black text-xs rounded-2xl flex items-center justify-center mx-auto border border-amber-400/30">
                {a.rank}
              </div>
              <h3 className="font-bold text-sm text-white truncate">{a.name}</h3>
              <p className="text-[11px] text-amber-400 font-semibold">{a.exam}</p>
              <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                Score: {a.score}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Offered Courses */}
      <section className="bg-slate-950 py-12 px-4 border-t border-slate-800">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">
              ACADEMIC PROGRAMS
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Target Programs & Batches
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {courses.map((c, i) => (
              <div
                key={i}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between space-y-4 shadow-xl relative overflow-hidden"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full text-slate-950 bg-gradient-to-r ${c.color}`}>
                      {c.badge}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400">{c.duration}</span>
                  </div>

                  <h3 className="font-extrabold text-lg text-white">{c.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{c.description}</p>

                  <div className="space-y-1.5 pt-2 border-t border-slate-800">
                    {c.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setInquiryCourse(c.title);
                    const el = document.getElementById('inquiry');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold rounded-xl border border-slate-700 transition text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Apply for Batch</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Admission Inquiry Form */}
      <section id="inquiry" className="py-12 px-4 max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-blue-900/60 via-slate-900 to-slate-950 border border-blue-800/60 p-6 sm:p-10 rounded-3xl shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              ADMISSION COUNSELING
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Book a Free Demo Class & Counseling Session
            </h2>
            <p className="text-xs text-slate-300 max-w-md mx-auto">
              Fill out the form below and our senior faculty team under Director Manjunath Sarjapur will contact you with batch details and fee structures.
            </p>
          </div>

          {isSubmitted ? (
            <div className="bg-emerald-500/10 border border-emerald-400/30 p-6 rounded-2xl text-center space-y-2 text-emerald-300">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <h3 className="font-extrabold text-lg text-white">Inquiry Registered Successfully!</h3>
              <p className="text-xs">
                Thank you, <strong>{inquiryName}</strong>. Our counselors will get in touch with you shortly.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="mt-2 text-xs text-amber-400 underline font-bold"
              >
                Submit another inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleInquiry} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                  Student / Parent Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ramesh Patel"
                  value={inquiryName}
                  onChange={(e) => setInquiryName(e.target.value)}
                  className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  placeholder="+91 98765 00000"
                  value={inquiryPhone}
                  onChange={(e) => setInquiryPhone(e.target.value)}
                  className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                  Select Program / Batch Interest
                </label>
                <select
                  value={inquiryCourse}
                  onChange={(e) => setInquiryCourse(e.target.value)}
                  className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="JEE Advanced Target">Class 12th JEE Advanced / Main Integrated</option>
                  <option value="NEET Medical Target">Class 12th NEET Medical Program</option>
                  <option value="Class 11th Foundation">Class 11th Science Foundation</option>
                  <option value="Class 10th Board Excellence">Class 10th Board Excellence</option>
                </select>
              </div>

              <div className="sm:col-span-2 pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 font-black rounded-xl shadow-xl hover:from-amber-300 hover:to-yellow-200 transition text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Counseling Request</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-8 px-4 text-xs text-slate-400">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
          <div className="space-y-2">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <div className="w-7 h-7 rounded-xl bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center">
                CCC
              </div>
              <span className="font-extrabold text-sm text-white">Challenge Coaching Classes</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Premier Coaching Academy for JEE Main, JEE Advanced, NEET, and Foundation Courses.
            </p>
          </div>

          <div className="space-y-1">
            <h4 className="font-bold text-white text-xs uppercase">Contact Information</h4>
            <p className="text-[11px]">Director: <strong>Manjunath Sarjapur</strong></p>
            <p className="text-[11px]">Email: <a href="mailto:manjunathsarjapur1995@gmail.com" className="text-amber-400 hover:underline">manjunathsarjapur1995@gmail.com</a></p>
            <p className="text-[11px]">Phone: +91 98765 43210</p>
          </div>

          <div className="space-y-2 flex flex-col items-center sm:items-start">
            <h4 className="font-bold text-white text-xs uppercase">Academy App</h4>
            <button
              onClick={() => setCurrentScreen('dashboard')}
              className="px-4 py-2 bg-amber-400 text-slate-950 font-black rounded-xl text-xs hover:bg-amber-300 transition"
            >
              Launch Super Admin Portal →
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto pt-6 mt-6 border-t border-slate-900 text-center text-[10px] text-slate-500">
          © {new Date().getFullYear()} Challenge Coaching Classes • All Rights Reserved. Director: Manjunath Sarjapur.
        </div>
      </footer>
    </div>
  );
};
