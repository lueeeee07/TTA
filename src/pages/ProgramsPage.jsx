import React from 'react';
import { Link } from 'react-router-dom';
import { useTtaData } from '../api/DataContext';
import { ChevronRight, Calendar, MapPin, Check, Award, ArrowRight } from 'lucide-react';

export default function ProgramsPage({ onOpenJoinModal }) {
  const { programsData, tournamentsData } = useTtaData();
  const getStatusClass = (statusBadge) => {
    switch (statusBadge) {
      case 'open': return 'bg-[#c7ed56] text-[#0F172A] border-[#c7ed56]';
      case 'upcoming': return 'bg-[#097DC6]/10 text-[#097DC6] border-[#097DC6]/20';
      case 'completed': return 'bg-slate-100 text-slate-400 border-slate-200';
      default: return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-0 bg-white page-fade-in flex flex-col">
      
      {/* 1. EDITORIAL HEADER */}
      <section className="py-24 lg:py-36 bg-[#097DC6] text-white relative overflow-hidden">
        {/* Subtle background overlay patterns */}
        <div className="absolute right-0 top-1/4 w-[500px] h-[500px] bg-white/10 rounded-full blur-[90px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-6">
          <span className="eyebrow-label-light">Development & Education</span>
          <h1 className="text-5xl sm:text-7xl font-black font-heading leading-[1.02] max-w-4xl">
            TTA Tennis Pathways.
          </h1>
          <p className="text-slate-100 max-w-2xl text-lg sm:text-xl font-medium leading-relaxed">
            From grassroots primary school programs to elite international circuits, adaptive wheelchair inclusion, and coaching qualifications.
          </p>
        </div>
      </section>

      {/* 2. CORE PROGRAMS (Alternating Scroll Rhythm - No Card Overuse) */}
      <section className="py-24 lg:py-36 bg-white border-b border-editorial">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-32">
          
          {/* Header */}
          <div className="space-y-3">
            <span className="eyebrow-label">Player & Official Development</span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#0F172A] font-heading">
              Our Core Programs
            </h2>
          </div>

          {/* Programs Loop - Dynamic Alternating Layout for all programs */}
          <div className="space-y-24 lg:space-y-36">
            {programsData.map((prog, index) => {
              const isEven = index % 2 === 0;
              const contentParagraphs = Array.isArray(prog.fullContent) ? prog.fullContent : [];

              return (
                <div
                  key={prog.id}
                  id={prog.id}
                  className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center scroll-mt-28"
                >
                  {/* Visual Image */}
                  <div className={`lg:col-span-6 ${isEven ? '' : 'lg:order-2'}`}>
                    <div className="image-zoom-container rounded-3xl overflow-hidden aspect-[16/10] border border-editorial shadow-sm bg-slate-900 group">
                      <img
                        src={prog.image || `${import.meta.env.BASE_URL}assets/images/programs/jti-program.jpg`}
                        alt={prog.title}
                        loading="lazy"
                        className="image-zoom-img w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Details Block */}
                  <div className={`lg:col-span-6 space-y-6 ${isEven ? '' : 'lg:order-1'}`}>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-[#097DC6] uppercase tracking-widest bg-[#097DC6]/10 px-3 py-1 rounded-full border border-[#097DC6]/20">
                        {prog.tag || 'Development'}
                      </span>
                      {prog.subtitle && (
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                          • {prog.subtitle}
                        </span>
                      )}
                    </div>

                    <h3 className="text-3xl sm:text-5xl font-black text-[#0F172A] font-heading leading-[1.05] tracking-tight">
                      {prog.title}
                    </h3>

                    <p className="text-slate-655 text-base sm:text-lg leading-relaxed font-semibold">
                      {prog.shortDesc}
                    </p>

                    {contentParagraphs.length > 0 && (
                      <div className="space-y-2 pt-1">
                        {contentParagraphs.slice(0, 2).map((paragraph, pIdx) => (
                          <div key={pIdx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 font-semibold bg-[#F6F7F9] p-3.5 rounded-xl border border-editorial">
                            <span className="w-2 h-2 rounded-full bg-[#097DC6] mt-1.5 shrink-0" />
                            <span>{paragraph}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="pt-3">
                      <Link
                        to={`/programs/${prog.id}`}
                        className="px-6 py-3.5 text-xs font-black uppercase tracking-wider btn-lime rounded-xl inline-flex items-center gap-2 shadow-sm"
                      >
                        <span>Explore {prog.title}</span>
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 3. SANCTIONED TOURNAMENTS (Timetable/Agenda Layout - No Cards) */}
      <section className="py-24 lg:py-36 bg-[#F6F7F9] border-t border-editorial">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
          
          <div className="space-y-3">
            <span className="eyebrow-label">Competitive Calendar</span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#0F172A] font-heading">
              National & International Tournaments
            </h2>
          </div>

          {/* Timetable Schedule Grid (Mobile overflow scroll) */}
          <div className="bg-white border border-editorial rounded-3xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-[#0F172A] text-white text-xs font-black uppercase tracking-wider">
                    <th className="py-5 px-6">Date</th>
                    <th className="py-5 px-6">Tournament Info</th>
                    <th className="py-5 px-6">HP Location</th>
                    <th className="py-5 px-6 text-center">Status</th>
                    <th className="py-5 px-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-editorial">
                  {tournamentsData.map((tourney) => (
                    <tr key={tourney.id} className="hover:bg-[#F6F7F9]/40 transition-colors">
                      
                      {/* Date Column */}
                      <td className="py-6 px-6 font-bold text-slate-700 text-sm whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-[#097DC6]" />
                          <span>{tourney.date}</span>
                        </div>
                      </td>

                      {/* Info Column */}
                      <td className="py-6 px-6">
                        <div className="space-y-1">
                          <span className="text-[10px] font-black uppercase tracking-wider bg-[#097DC6]/10 text-[#097DC6] px-2.5 py-0.5 rounded border border-[#097DC6]/20">
                            {tourney.badge}
                          </span>
                          <h4 className="text-base font-bold text-[#0F172A] font-heading pt-1">
                            {tourney.name}
                          </h4>
                          <p className="text-xs text-slate-500 max-w-md font-medium leading-relaxed">
                            {tourney.desc}
                          </p>
                        </div>
                      </td>

                      {/* Location Column */}
                      <td className="py-6 px-6 text-slate-600 text-xs font-bold whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>{tourney.location}</span>
                        </div>
                      </td>

                      {/* Status Column */}
                      <td className="py-6 px-6 text-center whitespace-nowrap">
                        <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full border ${getStatusClass(tourney.statusBadge)}`}>
                          {tourney.status}
                        </span>
                      </td>

                      {/* CTA Register */}
                      <td className="py-6 px-6 text-right whitespace-nowrap">
                        {tourney.statusBadge === 'completed' ? (
                          <span className="text-xs text-slate-400 font-bold flex items-center justify-end gap-1">
                            <Check className="w-3.5 h-3.5 text-slate-400" />
                            Completed
                          </span>
                        ) : (
                          <button
                            onClick={onOpenJoinModal}
                            className="px-4 py-2 text-xs font-black uppercase tracking-wider btn-lime rounded-xl inline-flex items-center gap-1 cursor-pointer"
                          >
                            <span>Register</span>
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        )}
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
