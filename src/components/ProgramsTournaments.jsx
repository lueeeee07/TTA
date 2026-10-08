import React, { useState } from 'react';
import { useTtaData } from '../api/DataContext';
import { Sparkles, ChevronRight, Check, Calendar, MapPin } from 'lucide-react';

export default function ProgramsTournaments({ onOpenJoinModal }) {
  const { programsData, tournamentsData } = useTtaData();
  const [activeProgramId, setActiveProgramId] = useState('jti');

  const selectedProgram = programsData.find((p) => p.id === activeProgramId) || programsData[0];

  const getStatusBadgeClass = (badgeType) => {
    switch (badgeType) {
      case 'open':
        return 'bg-[#c7ed56] text-[#0F172A] border-[#c7ed56]';
      case 'upcoming':
        return 'bg-[#097DC6] text-white border-[#097DC6]';
      case 'completed':
        return 'bg-slate-200 text-slate-700 border-slate-300';
      default:
        return 'bg-[#097DC6] text-white';
    }
  };

  return (
    <section id="programs" className="relative py-20 lg:py-28 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#097DC6] bg-[#097DC6]/10 px-3.5 py-1 rounded-full border border-[#097DC6]/20">
            Programs & Pathways
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F172A] font-heading">
            Find the One for You
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium">
            Structured development pathways for primary school children, high-performance athletes, adaptive players, and coaches.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-10">
          {programsData.map((prog) => {
            const isActive = prog.id === activeProgramId;
            return (
              <button
                key={prog.id}
                onClick={() => setActiveProgramId(prog.id)}
                className={`p-5 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between ${
                  isActive
                    ? 'bg-[#097DC6] text-white border-[#097DC6] shadow-lg ring-2 ring-[#c7ed56]'
                    : 'bg-[#F6F7F9] border-slate-200 text-slate-800 hover:border-slate-300'
                }`}
              >
                <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded w-fit mb-2 ${
                  isActive ? 'bg-[#c7ed56] text-[#0F172A]' : 'bg-slate-200 text-slate-700'
                }`}>
                  {prog.tag}
                </span>
                <div>
                  <div className={`text-xs font-bold uppercase tracking-wider ${isActive ? 'text-white/80' : 'text-slate-500'}`}>
                    {prog.subtitle}
                  </div>
                  <h3 className="text-base font-bold font-heading">
                    {prog.title}
                  </h3>
                </div>
              </button>
            );
          })}
        </div>

        {/* Feature Spotlight Card */}
        <div className="bg-[#F6F7F9] p-6 sm:p-10 rounded-3xl border border-slate-200 mb-20 shadow-md">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            {/* Details Left */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c7ed56] text-[#0F172A] text-xs font-black uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Featured Program Spotlight</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-[#0F172A] font-heading">
                {selectedProgram?.title}
              </h3>

              <div className="space-y-4 text-slate-700 text-sm leading-relaxed font-medium">
                {(selectedProgram?.fullContent || []).map((paragraph, i) => (
                  <p key={i} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="pt-2 flex items-center gap-4">
                <button
                  onClick={onOpenJoinModal}
                  className="px-6 py-3.5 text-xs font-black uppercase tracking-wider btn-lime rounded-xl flex items-center gap-2"
                >
                  <span>Enroll in Program</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Visual Right */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl h-80 sm:h-96 group">
                <img
                  src={selectedProgram?.image}
                  alt={selectedProgram?.title || 'Program'}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-xs font-bold text-white bg-[#0F172A]/90 p-3.5 rounded-2xl border border-white/10 backdrop-blur-md">
                  🇹🇿 Supported by World Tennis & Confederation of African Tennis
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* National & International Tournaments Subsection */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#097DC6] bg-[#097DC6]/10 px-3.5 py-1 rounded-full border border-[#097DC6]/20">
              Sanctioned Tournaments
            </span>
            <h3 className="text-2xl sm:text-4xl font-black text-[#0F172A] font-heading">
              National & International Tournaments
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {tournamentsData.map((tourney) => (
              <div
                key={tourney.id}
                className="card-elevated p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 hover:border-[#097DC6] transition duration-300 space-y-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded bg-[#097DC6] text-white">
                      {tourney.badge}
                    </span>
                    <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded border ${getStatusBadgeClass(tourney.statusBadge)}`}>
                      {tourney.status}
                    </span>
                  </div>

                  <h4 className="text-xl font-bold text-[#0F172A] mt-2 font-heading">
                    {tourney.name}
                  </h4>

                  <div className="space-y-1.5 mt-3 text-xs text-slate-600 font-medium">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#097DC6]" />
                      <span>{tourney.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#097DC6]" />
                      <span>{tourney.location}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 mt-3 leading-relaxed">
                    {tourney.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#097DC6] flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 text-[#9BBB3E]" />
                    Sanctioned Event
                  </span>
                  <button
                    onClick={onOpenJoinModal}
                    className="px-3.5 py-1.5 text-xs font-black uppercase tracking-wider btn-lime rounded-lg flex items-center gap-1"
                  >
                    <span>Register</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
