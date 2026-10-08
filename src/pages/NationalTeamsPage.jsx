import React from 'react';
import { Flag, Medal, ChevronRight, Trophy, Award, ShieldAlert, Sparkles } from 'lucide-react';
import { useTtaData } from '../api/DataContext';

export default function NationalTeamsPage({ onOpenJoinModal }) {
  const { nationalTeamsData } = useTtaData();

  return (
    <div className="min-h-screen pt-20 pb-0 bg-white page-fade-in flex flex-col">
      
      {/* 1. HERO PAGE HEADER (Prestigious, Patriotic) */}
      <section className="py-24 lg:py-36 bg-[#0F172A] text-white relative overflow-hidden">
        {/* Soft green-blue background details */}
        <div className="absolute right-0 top-1/4 w-[400px] h-[400px] bg-[#097DC6]/25 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="absolute left-1/10 bottom-0 w-[300px] h-[300px] bg-[#c7ed56]/10 rounded-full blur-[90px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#c7ed56] text-xs font-black uppercase tracking-wider shadow-sm">
            <Flag className="w-4 h-4 text-[#c7ed56]" />
            <span>Representing Tanzania</span>
          </div>
          <h1 className="text-5xl sm:text-7xl font-black font-heading leading-[1.02] max-w-4xl mx-auto">
            Pride, Passion, Performance.
          </h1>
          <p className="text-slate-350 max-w-2xl mx-auto text-lg sm:text-xl font-medium leading-relaxed">
            Meet the official squads flying the national flag across continental finals and international team championships.
          </p>
        </div>
      </section>

      {/* Dynamic Squads Loop */}
      {nationalTeamsData.map((team, index) => {
        const themeIndex = index % 3;
        const achievementsList = Array.isArray(team.achievements) ? team.achievements : [];

        // Theme 0: Royal Blue
        if (themeIndex === 0) {
          return (
            <section key={team.id || index} className="py-24 lg:py-36 bg-[#097DC6] text-white relative overflow-hidden">
              <div className="max-w-7xl mx-auto px-4 sm:px-8">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
                  <div className="lg:col-span-7 space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0F172A] text-white text-[10px] font-black uppercase tracking-wider shadow">
                      <Trophy className="w-3.5 h-3.5 text-[#c7ed56]" />
                      <span>{team.ageGroup ? `${team.ageGroup} • ` : ''}{team.subTitle || 'National Squad'}</span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-black font-heading leading-tight">
                      {team.teamName}
                    </h2>
                    <p className="text-slate-100 text-base sm:text-lg font-medium leading-relaxed">
                      {team.desc}
                    </p>
                    {achievementsList.length > 0 && (
                      <div className="space-y-4 pt-4 border-t border-white/15">
                        <span className="text-[10px] font-black uppercase text-[#c7ed56] tracking-widest block">Squad Accomplishments</span>
                        <div className="grid sm:grid-cols-2 gap-4">
                          {achievementsList.map((ach, idx) => (
                            <div key={idx} className="flex items-start gap-3 bg-[#0F172A]/15 border border-white/10 p-4 rounded-xl">
                              <Medal className="w-5 h-5 text-[#c7ed56] shrink-0" />
                              <span className="text-xs font-bold leading-normal text-slate-100">{ach}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="lg:col-span-5">
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20 aspect-[4/3]">
                      <img
                        src={team.image || `${import.meta.env.BASE_URL}assets/images/teams/davis-cup.jpg`}
                        alt={team.teamName}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        }

        // Theme 1: Crisp Light
        if (themeIndex === 1) {
          return (
            <section key={team.id || index} className="py-24 lg:py-36 bg-white border-b border-editorial">
              <div className="max-w-7xl mx-auto px-4 sm:px-8">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
                  <div className="lg:col-span-5 order-2 lg:order-1">
                    <div className="relative rounded-3xl overflow-hidden shadow-xl border border-editorial aspect-[4/3] group">
                      <img
                        src={team.image || `${import.meta.env.BASE_URL}assets/images/teams/junior-team.jpg`}
                        alt={team.teamName}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#097DC6]/10 text-[#097DC6] text-[10px] font-black uppercase tracking-wider border border-[#097DC6]/25">
                      <Sparkles className="w-3.5 h-3.5 text-[#097DC6]" />
                      <span>{team.ageGroup ? `${team.ageGroup} • ` : ''}{team.subTitle || 'National Squad'}</span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-black text-[#0F172A] font-heading leading-tight">
                      {team.teamName}
                    </h2>
                    <p className="text-slate-650 text-base leading-relaxed font-medium">
                      {team.desc}
                    </p>
                    {achievementsList.length > 0 && (
                      <div className="space-y-4 pt-4 border-t border-editorial">
                        <span className="text-[10px] font-black uppercase text-[#097DC6] tracking-widest block">Development Milestones</span>
                        <div className="grid sm:grid-cols-2 gap-4">
                          {achievementsList.map((ach, idx) => (
                            <div key={idx} className="flex items-start gap-3 bg-[#F6F7F9] border border-editorial p-4 rounded-xl">
                              <Medal className="w-5 h-5 text-[#097DC6] shrink-0" />
                              <span className="text-xs font-bold leading-normal text-slate-700">{ach}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          );
        }

        // Theme 2: Deep Navy
        return (
          <section key={team.id || index} className="py-24 lg:py-36 bg-[#0F172A] text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-8">
              <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#c7ed56] text-[#0F172A] text-[10px] font-black uppercase tracking-wider shadow">
                    <Award className="w-3.5 h-3.5" />
                    <span>{team.ageGroup ? `${team.ageGroup} • ` : ''}{team.subTitle || 'National Squad'}</span>
                  </div>
                  <h2 className="text-4xl sm:text-5xl font-black font-heading leading-tight">
                    {team.teamName}
                  </h2>
                  <p className="text-slate-300 text-base sm:text-lg font-medium leading-relaxed">
                    {team.desc}
                  </p>
                  {achievementsList.length > 0 && (
                    <div className="space-y-4 pt-4 border-t border-white/15">
                      <span className="text-[10px] font-black uppercase text-[#c7ed56] tracking-widest block">Team Achievements</span>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {achievementsList.map((ach, idx) => (
                          <div key={idx} className="flex items-start gap-3 bg-white/5 border border-white/10 p-4 rounded-xl">
                            <Medal className="w-5 h-5 text-[#c7ed56] shrink-0" />
                            <span className="text-xs font-bold leading-normal text-slate-200">{ach}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="lg:col-span-5">
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 aspect-[4/3]">
                    <img
                      src={team.image || `${import.meta.env.BASE_URL}assets/images/teams/womens-team.jpg`}
                      alt={team.teamName}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* 5. TRYOUT CALL TO ACTION */}
      <section className="py-24 bg-[#c7ed56] text-[#0F172A] text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-6">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#097DC6]">Selection Trials</span>
          <h2 className="text-4xl sm:text-5xl font-black font-heading leading-tight">
            Aspire to Represent Your Nation?
          </h2>
          <p className="text-slate-800 text-base sm:text-lg max-w-xl mx-auto font-bold leading-relaxed">
            Selection for international squads is conducted at sanctioned TTA national tournaments. Register your affiliation with an approved club to start your pathway.
          </p>
          <div className="pt-4">
            <button
              onClick={onOpenJoinModal}
              className="px-8 py-4 text-xs font-black uppercase tracking-wider bg-[#0F172A] hover:bg-[#0F172A]/90 text-white rounded-xl inline-flex items-center gap-2 shadow-lg cursor-pointer"
            >
              <span>Affiliate with a Tennis Club</span>
              <ChevronRight className="w-4 h-4 text-[#c7ed56]" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
