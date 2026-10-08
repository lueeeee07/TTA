import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import { ArrowRight, ChevronRight, Trophy, Users, Zap, Play } from 'lucide-react';
import { useTtaData } from '../api/DataContext';

// ─── Animated counter hook ───────────────────────────────────────────────────
function useCountUp(target, duration = 1800, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return value;
}

// ─── Intersection observer hook ──────────────────────────────────────────────
function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold: 0.2, ...options }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, inView];
}

export default function HomePage({ onOpenJoinModal }) {
  const { programsData, newsData, statsData, regionsData, nationalTeamsData } = useTtaData();
  const featuredArticle = newsData.find((a) => a.isFeatured) || newsData[0];
  const secondaryArticles = featuredArticle
    ? newsData.filter((a) => a.id !== featuredArticle.id).slice(0, 3)
    : [];
  const flagshipProgram = programsData.find((p) => p.id === 'jti') || programsData[0];
  const otherPrograms = flagshipProgram
    ? programsData.filter((p) => p.id !== flagshipProgram.id).slice(0, 3)
    : [];

  const davisTeam = nationalTeamsData.find((t) => t.id === 'davis-cup') || nationalTeamsData[1] || nationalTeamsData[0];
  const juniorTeam = nationalTeamsData.find((t) => t.id === 'juniors') || nationalTeamsData[0];

  const clubsStat = statsData.find((s) => s.id === 'clubs');
  const clubsTarget = clubsStat?.number ?? 30;
  const athletesTarget = statsData.find((s) => s.id === 'players')?.number ?? 1200;
  const regionsStat = statsData.find((s) => s.id === 'regions');
  const regionsTarget = regionsStat?.number ?? 6;

  const [statsRef, statsInView] = useInView();
  const clubs = useCountUp(clubsTarget, 1600, statsInView);
  const athletes = useCountUp(athletesTarget, 2000, statsInView);
  const regions = useCountUp(regionsTarget, 1000, statsInView);
  const years = useCountUp(35, 1400, statsInView);

  // Marquee items
  const marqueeItems = [
    'TENNIS', 'TANZANIA', 'SERVE', 'ACE', 'DAVIS CUP', 'BJK CUP', 'JUNIORS',
    'GRASSROOTS', 'EXCELLENCE', 'FUTURE', 'EAST AFRICA', 'CHAMPIONS',
  ];

  return (
    <div className="min-h-screen flex flex-col">

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 1 — HERO
          ════════════════════════════════════════════════════════════════════ */}
      <Hero onOpenJoinModal={onOpenJoinModal} />

      {/* ══════════════════════════════════════════════════════════════════════
          MARQUEE STRIP — scrolling text band
          ════════════════════════════════════════════════════════════════════ */}
      <div
        className="marquee-wrap py-4 overflow-hidden border-b"
        style={{ background: '#c7ed56', borderColor: 'rgba(15,23,42,0.12)' }}
      >
        <div className="marquee-inner">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center font-black uppercase text-sm tracking-widest text-[#0F172A] px-8"
            >
              {item}
              <span className="ml-8 w-1.5 h-1.5 rounded-full bg-[#0F172A]/30 inline-block" />
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 2 — WHO WE ARE (editorial split)
          ════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-32 bg-white border-b border-editorial">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">

            {/* Left — big statement */}
            <div className="lg:col-span-7 space-y-6">
              <span className="eyebrow-label">Tanzania Tennis Governance</span>
              <h2
                className="text-white font-black leading-[0.94] tracking-tighter font-heading text-[#0F172A]"
                style={{ fontSize: 'clamp(2.8rem, 6vw, 6rem)', color: '#0F172A' }}
              >
                Everyone is<br />
                <span style={{ color: '#097DC6' }}>welcome</span><br />
                on court.
              </h2>
              <blockquote
                className="border-l-4 pl-6 text-lg font-semibold text-slate-700 leading-relaxed"
                style={{ borderColor: '#c7ed56' }}
              >
                "Our mission is to plant the seeds of tennis in primary schools, nurture junior excellence, and fly the national flag proudly on the international stage."
              </blockquote>
            </div>

            {/* Right — narrative */}
            <div className="lg:col-span-5 space-y-6 lg:pt-6">
              <p className="text-slate-600 leading-relaxed font-medium text-base">
                The Tanzania Tennis Association (TTA) is the sole national governing body for tennis in Tanzania — recognised by World Tennis (WT) and the Confederation of African Tennis (CAT).
              </p>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">
                We regulate and grow the game across more than 30 member clubs and 6 High-Performance zones, supporting over 1,200 registered athletes from grassroots clinics to professional circuits.
              </p>

              {/* Two quick facts */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                {[
                  { val: '1988', label: 'Founded' },
                  { val: 'WT · ITF · CAT', label: 'Affiliated' },
                ].map((item) => (
                  <div key={item.label} className="p-4 rounded-2xl bg-[#F6F7F9] border border-editorial">
                    <div className="text-xl font-black text-[#0F172A] font-heading">{item.val}</div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-0.5">{item.label}</div>
                  </div>
                ))}
              </div>

              <Link
                to="/about"
                className="group inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#097DC6] hover:text-[#0F172A] transition"
              >
                Learn About Our Leadership & Vision
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 3 — PLAYER SHADOW VISUAL BREATHER (full-bleed editorial)
          Uses: player_shadow.jpg (uploaded reference image 5)
          ════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{ minHeight: 'min(80vh, 700px)' }}
      >
        {/* Full-bleed image */}
        <div className="absolute inset-0 z-0">
          <img
            src={`${import.meta.env.BASE_URL}assets/editorial/player_shadow.jpg`}
            alt="Tennis player on court"
            className="w-full h-full object-cover object-center"
            style={{ objectPosition: 'center 30%' }}
          />
          {/* Deep directional gradient for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/90 via-[#0F172A]/60 to-[#0F172A]/10" />
          {/* Subtle bottom transition */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#F6F7F9] to-transparent" />
        </div>

        {/* Editorial text overlay */}
        <div className="relative z-10 flex items-center h-full" style={{ minHeight: 'inherit' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-24 lg:py-40">
            <span className="eyebrow-label-light mb-4 block">TTA Visual Statement</span>
            <h2
              className="text-white font-black leading-none tracking-tighter font-heading uppercase"
              style={{ fontSize: 'clamp(3rem, 8vw, 7.5rem)' }}
            >
              EVERY POINT<br />STARTS<br />
              <span style={{ color: '#c7ed56' }}>SOMEWHERE.</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-md font-medium leading-relaxed mt-6">
              From the first serve to the final match — excellence in Tanzanian tennis is built through discipline, repetition, and community.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 4 — PROGRAMS / DEVELOPMENT (asymmetric editorial)
          ════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-32 bg-[#F6F7F9] border-b border-editorial">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">

          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <span className="eyebrow-label">Player Pathways</span>
              <h2
                className="font-black text-[#0F172A] font-heading leading-none"
                style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)' }}
              >
                Programs Built<br />for Every Level
              </h2>
            </div>
            <Link
              to="/programs"
              className="group inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#097DC6] hover:text-[#0F172A] transition shrink-0"
            >
              View All Programs
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-start">

            {/* Flagship — 7 cols, large image-forward card */}
            <div className="lg:col-span-7 group">
              <div
                className="rounded-3xl overflow-hidden border border-editorial bg-white shadow-sm"
                style={{ transition: 'box-shadow 0.4s ease, transform 0.4s ease' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 24px 60px -12px rgba(9,125,198,0.15)';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '';
                  e.currentTarget.style.transform = '';
                }}
              >
                <div className="image-zoom-container" style={{ height: 380 }}>
                  <img
                    src={flagshipProgram?.image}
                    alt={flagshipProgram?.title || 'Program'}
                    className="image-zoom-img w-full h-full object-cover"
                  />
                  {/* Overlay badge */}
                  <span
                    className="absolute top-5 left-5 px-3.5 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider"
                    style={{ background: '#c7ed56', color: '#0F172A' }}
                  >
                    Flagship — Junior Initiative
                  </span>
                </div>
                <div className="p-8 sm:p-10 space-y-4">
                  <span className="text-xs font-bold text-[#097DC6] uppercase tracking-wider">{flagshipProgram?.tag}</span>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#0F172A] font-heading leading-tight group-hover:text-[#097DC6] transition">
                    {flagshipProgram?.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-medium">{flagshipProgram?.shortDesc}</p>
                  <div className="pt-4 border-t border-slate-100">
                    <Link
                      to={`/programs/${flagshipProgram?.id || ''}`}
                      className="px-6 py-3.5 text-xs font-black uppercase tracking-wider btn-lime rounded-xl inline-flex items-center gap-2"
                    >
                      Explore Junior Pathway
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Other programs — numbered vertical list */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-8 lg:pt-4">
              {otherPrograms.map((prog, index) => (
                <div
                  key={prog.id}
                  className="group relative pl-12 space-y-2 border-b border-editorial pb-7 last:border-0 last:pb-0"
                >
                  <span className="absolute left-0 top-0 text-3xl font-black text-[#097DC6]/15 group-hover:text-[#097DC6] transition duration-300 font-heading">
                    0{index + 2}
                  </span>
                  <h4 className="text-lg font-bold text-[#0F172A] group-hover:text-[#097DC6] transition duration-200">
                    <Link to={`/programs/${prog.id}`}>{prog.title}</Link>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">{prog.shortDesc}</p>
                  <Link
                    to={`/programs/${prog.id}`}
                    className="inline-flex items-center text-xs font-black text-[#097DC6] hover:text-[#0F172A] transition mt-1"
                  >
                    View details
                    <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                  </Link>
                </div>
              ))}
              <div className="pt-2">
                <Link
                  to="/programs"
                  className="px-6 py-3.5 text-xs font-black uppercase tracking-wider text-[#0F172A] bg-white border border-slate-200 hover:border-[#0F172A] rounded-xl inline-flex items-center gap-1.5 transition shadow-sm"
                >
                  View All TTA Programs
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 5 — BE BOLD EDITORIAL INTERRUPT
          Inspired by: be_bold.jpg reference image
          Full-width yellow campaign moment
          ════════════════════════════════════════════════════════════════════ */}
      <section className="be-bold-section relative overflow-hidden">
        {/* Background texture — subtle court lines */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.07]"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, #0F172A 0px, #0F172A 1px, transparent 1px, transparent 60px),
              repeating-linear-gradient(90deg, #0F172A 0px, #0F172A 1px, transparent 1px, transparent 60px)
            `,
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-12 items-center gap-10 lg:gap-0">

            {/* Left — text column */}
            <div className="lg:col-span-6 space-y-6 relative z-10">
              <span
                className="text-[10px] font-black uppercase tracking-widest"
                style={{ color: 'rgba(15,23,42,0.4)' }}
              >
                TTA Player Campaign
              </span>

              {/* BE BOLD oversized text */}
              <div>
                <div
                  className="font-black leading-none tracking-tighter font-heading uppercase"
                  style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)', color: '#0F172A', letterSpacing: '-0.03em' }}
                >
                  BE
                </div>
                <div
                  className="font-black leading-none tracking-tighter font-heading uppercase"
                  style={{ fontSize: 'clamp(5rem, 15vw, 12rem)', color: '#0F172A', letterSpacing: '-0.05em', lineHeight: 0.85 }}
                >
                  BOLD.
                </div>
              </div>

              <div className="space-y-1 pl-1">
                <p
                  className="font-black text-[#0F172A] leading-snug"
                  style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.75rem)', letterSpacing: '-0.02em' }}
                >
                  Play with purpose.
                </p>
                <p
                  className="font-semibold text-[#0F172A]/60"
                  style={{ fontSize: 'clamp(0.85rem, 1.5vw, 1rem)' }}
                >
                  The next generation of Tanzanian champions starts here.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/programs/jti"
                  className="px-7 py-4 text-xs font-black uppercase tracking-wider rounded-xl flex items-center gap-2 cursor-pointer"
                  style={{
                    background: '#0F172A',
                    color: '#c7ed56',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#1e293b'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#0F172A'}
                >
                  Junior Tennis Initiative
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/programs"
                  className="px-7 py-4 text-xs font-black uppercase tracking-wider rounded-xl"
                  style={{ border: '2px solid rgba(15,23,42,0.2)', color: '#0F172A' }}
                >
                  All Development Programs
                </Link>
              </div>
            </div>

            {/* Right — giant tennis ball editorial composition */}
            <div className="lg:col-span-6 flex items-center justify-center relative">
              <div className="relative w-full max-w-sm mx-auto lg:max-w-none">

                {/* Giant ball image — editorial crop */}
                <div
                  className="rounded-2xl overflow-hidden animate-bold-ball"
                  style={{
                    aspectRatio: '3/4',
                    maxHeight: 520,
                    boxShadow: '0 40px 80px -20px rgba(15,23,42,0.35)',
                  }}
                >
                  <img
                    src={`${import.meta.env.BASE_URL}assets/editorial/giant_ball.jpg`}
                    alt="Tennis player with giant tennis ball"
                    className="w-full h-full object-cover"
                    style={{ objectPosition: 'center top' }}
                  />
                </div>

                {/* Floating quote badge */}
                <div
                  className="absolute -bottom-5 -left-5 sm:-left-10 px-5 py-4 rounded-2xl max-w-[200px]"
                  style={{
                    background: '#0F172A',
                    boxShadow: '0 16px 40px rgba(0,0,0,0.3)',
                  }}
                >
                  <div className="text-[9px] font-black uppercase tracking-widest text-[#c7ed56] mb-1">TTA Spirit</div>
                  <div className="text-sm font-black text-white leading-tight">BIG DREAMS.<br />BIGGER FUTURES.</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 6 — NATIONAL TEAMS (dark bg)
          ════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-32 bg-[#0F172A] text-white relative overflow-hidden">
        <div
          className="absolute right-0 top-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(9,125,198,0.2) 0%, transparent 70%)' }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left */}
            <div className="lg:col-span-6 space-y-6">
              <span className="eyebrow-label-light">Representing Tanzania</span>
              <h2
                className="text-white font-black leading-[1.0] font-heading"
                style={{ fontSize: 'clamp(2.2rem, 5vw, 4.5rem)' }}
              >
                Flying the Flag<br />on the Global Stage.
              </h2>
              <p className="text-slate-300 text-sm sm:text-base font-semibold leading-relaxed max-w-md">
                TTA coordinates national team selections for the Davis Cup, Billie Jean King Cup, and Africa Junior Championships — Tanzania's banner on the international tennis stage.
              </p>

              {/* Team tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {['Davis Cup', 'Billie Jean King Cup', 'Junior Squad', 'U14 · U16 · U18'].map((tag) => (
                  <span
                    key={tag}
                    className="px-3.5 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-full"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <Link
                to="/national-teams"
                className="px-7 py-4 text-xs font-black uppercase tracking-wider btn-lime rounded-xl inline-flex items-center gap-2"
              >
                Meet Our Squads
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Right — overlapping image composition */}
            <div className="lg:col-span-6">
              <div className="relative grid grid-cols-12 gap-4 items-center">

                <div className="col-span-7 relative z-10 rounded-2xl overflow-hidden aspect-[4/3] group"
                  style={{ border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
                >
                  <img
                    src={davisTeam?.image || `${import.meta.env.BASE_URL}assets/images/teams/davis-cup.jpg`}
                    alt={davisTeam?.teamName || 'Davis Cup Team'}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 to-transparent" />
                  <div
                    className="absolute bottom-3 left-3 px-2.5 py-1 rounded text-[9px] font-black text-[#c7ed56] uppercase tracking-wider"
                    style={{ background: 'rgba(15,23,42,0.9)', border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    {davisTeam?.teamName || 'Davis Cup'}
                  </div>
                </div>

                <div className="col-span-8 -ml-14 mt-16 relative z-20 rounded-2xl overflow-hidden aspect-[4/3] group"
                  style={{ border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 32px 60px rgba(0,0,0,0.45)' }}
                >
                  <img
                    src={juniorTeam?.image || `${import.meta.env.BASE_URL}assets/images/teams/junior-team.jpg`}
                    alt={juniorTeam?.teamName || 'Junior National Team'}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 to-transparent" />
                  <div
                    className="absolute bottom-3 left-3 px-2.5 py-1 rounded text-[9px] font-black text-[#c7ed56] uppercase tracking-wider"
                    style={{ background: 'rgba(15,23,42,0.9)', border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    {juniorTeam?.teamName || 'Junior Squad'}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 7 — ANIMATED STATS
          ════════════════════════════════════════════════════════════════════ */}
      <div
        ref={statsRef}
        className="py-16 lg:py-24 bg-white border-b border-editorial"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-editorial"
            style={{ backgroundColor: 'rgba(15,23,42,0.06)' }}
          >
            {[
              { val: clubs, suffix: clubsStat?.suffix || '+', label: clubsStat?.label || 'Affiliated Clubs', icon: Trophy },
              { val: athletes, suffix: '+', label: 'Registered Athletes', icon: Users },
              { val: regions, suffix: '', label: regionsStat?.label || 'HP Regions', icon: Zap },
              { val: years, suffix: '+', label: 'Years of Tennis', icon: Play },
            ].map(({ val, suffix, label, icon: Icon }) => (
              <div
                key={label}
                className="bg-white p-8 lg:p-12 text-center"
              >
                <div
                  className="font-black font-heading text-[#0F172A] leading-none mb-2"
                  style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}
                >
                  {val.toLocaleString()}{suffix}
                </div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 8 — MATCH POINT NEWSROOM
          Inspired by: match_point.jpg reference image
          Dark green editorial header
          ════════════════════════════════════════════════════════════════════ */}
      <section className="bg-white border-b border-editorial">

        {/* Match Point header strip */}
        <div
          className="match-point-header py-10 lg:py-14"
          style={{ background: '#1A3A2A' }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
            <div>
              <div className="text-[9px] font-black uppercase tracking-widest text-[#c7ed56] mb-3">TTA Newsroom</div>
              <h2
                className="font-black leading-none font-heading text-white"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)' }}
              >
                MATCH
              </h2>
              <h2
                className="font-black leading-none font-heading"
                style={{
                  fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
                  color: '#c7ed56',
                  WebkitTextStroke: '1px rgba(199,237,86,0.3)',
                }}
              >
                POINT.
              </h2>
              <p className="text-sm font-medium mt-3" style={{ color: 'rgba(255,255,255,0.5)' }}>
                The latest from Tanzanian tennis.
              </p>
            </div>

            <Link
              to="/news"
              className="group inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider transition shrink-0"
              style={{ color: '#c7ed56' }}
            >
              All Stories
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* News content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 lg:py-20">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">

            {/* Featured story — 7 cols */}
            <div className="lg:col-span-7 group">
              <div className="image-zoom-container rounded-3xl overflow-hidden border border-editorial shadow-sm"
                style={{ aspectRatio: '16/9' }}
              >
                <img
                  src={featuredArticle?.image}
                  alt={featuredArticle?.title || 'News'}
                  className="image-zoom-img w-full h-full object-cover"
                />
                <span
                  className="absolute top-4 left-4 px-3 py-1 rounded text-[10px] font-black uppercase tracking-wider text-white shadow"
                  style={{ background: '#097DC6' }}
                >
                  {featuredArticle?.category} · Featured
                </span>
              </div>
              <div className="mt-6 space-y-3">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">{featuredArticle?.date}</span>
                <h3 className="text-2xl sm:text-3xl font-black text-[#0F172A] font-heading leading-tight group-hover:text-[#097DC6] transition">
                  <Link to={`/news/${featuredArticle?.id}`}>{featuredArticle?.title}</Link>
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">{featuredArticle?.snippet}</p>
                <Link
                  to={`/news/${featuredArticle?.id}`}
                  className="inline-flex items-center text-xs font-black uppercase text-[#097DC6] hover:text-[#0F172A] transition"
                >
                  Read Full Coverage
                  <ChevronRight className="w-4 h-4 ml-0.5" />
                </Link>
              </div>
            </div>

            {/* Secondary stories — 5 cols */}
            <div className="lg:col-span-5 divide-y divide-editorial">
              {secondaryArticles.map((article) => (
                <div key={article.id} className="group pt-6 first:pt-0 pb-6 space-y-2">
                  <div className="flex items-center gap-3">
                    <span
                      className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded"
                      style={{ background: 'rgba(9,125,198,0.06)', border: '1px solid rgba(9,125,198,0.12)', color: '#097DC6' }}
                    >
                      {article.category}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">{article.date}</span>
                  </div>
                  <h4 className="text-lg font-bold text-[#0F172A] group-hover:text-[#097DC6] transition duration-200 leading-snug">
                    <Link to={`/news/${article.id}`}>{article.title}</Link>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">{article.snippet}</p>
                  <Link
                    to={`/news/${article.id}`}
                    className="inline-flex items-center text-xs font-black text-[#097DC6] hover:text-[#0F172A] transition"
                  >
                    Read Story
                    <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                  </Link>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 9 — CLUBS NETWORK (split layout)
          ════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-32 bg-[#F6F7F9] border-b border-editorial relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left text */}
            <div className="lg:col-span-7 space-y-6">
              <span className="eyebrow-label">TTA Regional Network</span>
              <h2
                className="font-black text-[#0F172A] font-heading leading-[0.95] tracking-tight"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)' }}
              >
                Over {clubsTarget} Clubs<br />in {regionsTarget} HP Regions.
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-semibold max-w-lg">
                From Dar es Salaam to Zanzibar, Arusha to Mwanza — TTA governs the tennis network across Tanzania, ensuring standardized facilities and ITF coaching at every level.
              </p>

              {/* Region pills */}
              <div className="flex flex-wrap gap-2 pt-2">
                {(regionsData.length > 0 ? regionsData.map(r => r.name) : ['Dar es Salaam', 'Arusha', 'Kilimanjaro', 'Zanzibar', 'Morogoro', 'Mwanza']).map((r) => (
                  <span
                    key={r}
                    className="px-3 py-1.5 text-xs font-bold rounded-full"
                    style={{ background: 'white', border: '1px solid rgba(15,23,42,0.1)', color: '#0F172A' }}
                  >
                    {r}
                  </span>
                ))}
              </div>

              <Link
                to="/clubs"
                className="px-8 py-4 text-xs font-black uppercase tracking-wider btn-lime rounded-xl inline-flex items-center gap-2 shadow-sm"
              >
                Explore Member Club Directory
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Right image */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-3xl overflow-hidden border border-editorial shadow-lg"
                style={{ aspectRatio: '4/3' }}
              >
                <img
                  src="https://images.unsplash.com/photo-1531315630201-bb15abeb1653?auto=format&fit=crop&w=1200&q=80"
                  alt="Tennis court"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Float badge */}
              <div
                className="absolute -bottom-5 -left-5 px-5 py-4 rounded-2xl max-w-xs hidden sm:block"
                style={{ background: '#0F172A', boxShadow: '0 20px 40px rgba(0,0,0,0.25)' }}
              >
                <span className="text-[9px] font-black text-[#c7ed56] uppercase tracking-widest block mb-1">Find a Club</span>
                <span className="text-xs font-bold text-white">Your nearest TTA-affiliated club is waiting.</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 10 — FINAL CTA
          ════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 lg:py-36 bg-[#097DC6] text-white text-center relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.15) 0%, transparent 60%)',
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-8 space-y-7">
          <span className="eyebrow-label-light">Ready to Serve?</span>
          <h2
            className="text-white font-black font-heading leading-[1] tracking-tight"
            style={{ fontSize: 'clamp(2.8rem, 7vw, 7rem)' }}
          >
            Get Involved<br />with TTA.
          </h2>
          <p className="text-slate-100 text-base sm:text-lg max-w-xl mx-auto font-semibold leading-relaxed">
            Whether you are a beginner seeking a club, an athlete targeting national squad selection, or a prospective sponsor — we welcome you.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onOpenJoinModal}
              className="px-8 py-4 text-xs font-black uppercase tracking-wider bg-[#0F172A] hover:bg-slate-900 text-white rounded-xl inline-flex items-center gap-2.5 transition shadow-lg cursor-pointer"
            >
              Join a Member Club
              <ArrowRight className="w-4 h-4 text-[#c7ed56]" />
            </button>
            <Link
              to="/contact"
              className="px-8 py-4 text-xs font-black uppercase tracking-wider rounded-xl inline-flex items-center gap-2 transition btn-outline-white"
            >
              Contact the Secretariat
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
