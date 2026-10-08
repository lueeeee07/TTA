import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Trophy, MapPin, Award } from 'lucide-react';
import { useTtaData } from '../api/DataContext';

export default function Hero({ onOpenJoinModal }) {
  const { statsData } = useTtaData();
  const clubsStat = statsData.find((s) => s.id === 'clubs');
  const regionsStat = statsData.find((s) => s.id === 'regions');
  const teamsStat = statsData.find((s) => s.id === 'teams');

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-visible bg-[#097DC6]">
      {/* Clear Sky Background Image with Gradient Overlay for Contrast */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={`${import.meta.env.BASE_URL}images/clear_sky.png`}
          alt="Clear Sky Background"
          className="w-full h-full object-cover object-center opacity-90 scale-105"
        />
        {/* Dark/Blue Directional Gradient behind text to guarantee readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/90 via-[#097DC6]/50 to-transparent"></div>
        {/* Subtle ambient light glow for athlete blending */}
        <div className="absolute right-0 top-1/4 w-[600px] h-[600px] bg-[#38BDF8]/20 rounded-full blur-3xl pointer-events-none"></div>
        {/* Soft bottom transition gradient */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#F6F7F9] to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 flex flex-col justify-between space-y-8 lg:space-y-12">
        
        {/* Top Hero Layout: Grid Split to ensure Athlete never overlaps text */}
        <div className="relative grid lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[480px]">
          
          {/* Left Column: Text & CTAs (7 Cols on Desktop) */}
          <div className="lg:col-span-7 space-y-6 relative z-10">
            
            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.02] font-heading drop-shadow-xl">
              Serve for Glory.<br />
              <span className="text-[#c7ed56]">Rise Together.</span>
            </h1>

            {/* Supporting Paragraph */}
            <p className="text-base sm:text-lg text-slate-100 font-semibold max-w-xl leading-relaxed drop-shadow-md">
              Growing the game of tennis across Tanzania from primary school courts to the world stage.
            </p>

            {/* Trust & Credibility Badge */}
            <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/25 text-xs sm:text-sm font-medium text-white shadow-sm">
              <ShieldCheck className="w-5 h-5 text-[#c7ed56] shrink-0" />
              <span>
                Recognized by <strong className="font-extrabold text-white">World Tennis (WT)</strong> & <strong className="font-extrabold text-white">Confederation of African Tennis (CAT)</strong>.
              </span>
            </div>

            {/* Call to Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenJoinModal}
                className="px-7 py-4 text-xs sm:text-sm font-black uppercase tracking-wider btn-lime rounded-xl flex items-center gap-2.5 group shadow-lg cursor-pointer"
              >
                <span>JOIN A MEMBER CLUB</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </button>

              <button
                onClick={() => scrollToSection('programs')}
                className="px-7 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-white/15 hover:bg-white/25 border border-white/35 backdrop-blur-md rounded-xl transition duration-300 shadow-md cursor-pointer"
              >
                EXPLORE PROGRAMS
              </button>
            </div>

          </div>

          {/* Right Column Spacer for Desktop */}
          <div className="hidden lg:block lg:col-span-5"></div>

          {/* 3D Breakout Athlete Layer */}
          <div className="absolute top-[-35px] sm:top-[-45px] lg:top-[-70px] right-[-30px] sm:right-[-8%] lg:right-[-13%] z-30 w-[480px] sm:w-[720px] lg:w-[1060px] pointer-events-none animate-float">
            <img
              src={`${import.meta.env.BASE_URL}images/player_cutout.png`}
              alt="Tanzania Tennis Athlete"
              className="w-full h-auto object-contain filter drop-shadow-[0_30px_60px_rgba(0,0,0,0.45)]"
            />
          </div>

        </div>

        {/* Bottom Hero Statistics Strip */}
        <div className="relative z-20 pt-4">
          <div className="grid sm:grid-cols-3 gap-4 lg:gap-6">
            
            {/* Card 1 */}
            <div className="bg-[#0F172A]/90 backdrop-blur-md p-6 rounded-3xl border border-white/15 text-white flex items-center gap-4 shadow-xl hover:-translate-y-1.5 transition duration-300 group">
              <div className="p-3.5 rounded-2xl bg-[#c7ed56] text-[#0F172A] font-black shrink-0 group-hover:scale-105 transition">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <div className="text-3xl lg:text-4xl font-black text-white font-heading">
                  {clubsStat ? `${clubsStat.number}${clubsStat.suffix}` : '30+'}
                </div>
                <div className="text-xs font-bold text-slate-200 uppercase tracking-wider">{clubsStat?.label || 'Affiliated Clubs'}</div>
                <div className="text-[11px] text-slate-400 font-medium">{clubsStat?.description || 'Nationwide Sports Governance'}</div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-[#0F172A]/90 backdrop-blur-md p-6 rounded-3xl border border-white/15 text-white flex items-center gap-4 shadow-xl hover:-translate-y-1.5 transition duration-300 group relative">
              <div className="p-3.5 rounded-2xl bg-[#097DC6] text-white font-black shrink-0 group-hover:scale-105 transition">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <div className="text-3xl lg:text-4xl font-black text-white font-heading">
                  {regionsStat ? `${regionsStat.number}${regionsStat.suffix}` : '6'}
                </div>
                <div className="text-xs font-bold text-slate-200 uppercase tracking-wider">{regionsStat?.label || 'HP Regions'}</div>
                <div className="text-[11px] text-slate-400 font-medium">{regionsStat?.description || 'Dar, Arusha, Moshi, Morogoro, Pwani, Zanzibar'}</div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-[#0F172A]/90 backdrop-blur-md p-6 rounded-3xl border border-white/15 text-white flex items-center gap-4 shadow-xl hover:-translate-y-1.5 transition duration-300 group">
              <div className="p-3.5 rounded-2xl bg-[#c7ed56] text-[#0F172A] font-black shrink-0 group-hover:scale-105 transition">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <div className="text-3xl lg:text-4xl font-black text-white font-heading">
                  {teamsStat ? `${teamsStat.number}${teamsStat.suffix}` : '3'}
                </div>
                <div className="text-xs font-bold text-slate-200 uppercase tracking-wider">{teamsStat?.label || 'National Squads'}</div>
                <div className="text-[11px] text-slate-400 font-medium">{teamsStat?.description || 'Juniors, Davis Cup & Billie Jean Cup'}</div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
