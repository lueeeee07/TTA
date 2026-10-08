import React from 'react';
import { useTtaData } from '../api/DataContext';
import { Flag, Medal, ChevronRight } from 'lucide-react';

export default function NationalTeams({ onOpenJoinModal }) {
  const { nationalTeamsData } = useTtaData();
  return (
    <section id="teams" className="relative py-20 lg:py-28 bg-[#F6F7F9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#097DC6]/10 border border-[#097DC6]/20 text-[#097DC6] text-xs font-bold uppercase tracking-wider">
            <Flag className="w-3.5 h-3.5" />
            National Teams
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F172A] font-heading">
            Proudly Representing <span className="text-[#097DC6]">Tanzania</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium">
            Flying the national flag at continental championships and world tennis team competitions.
          </p>
        </div>

        {/* 3 National Team Cards Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {nationalTeamsData.map((team) => (
            <div
              key={team.id}
              className="card-elevated rounded-3xl overflow-hidden bg-white border border-slate-200 flex flex-col justify-between hover:border-[#097DC6] transition duration-300 group"
            >
              {/* Team Image & Header */}
              <div className="relative h-64 overflow-hidden bg-slate-900">
                <img
                  src={team.image}
                  alt={team.teamName}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/40 to-transparent"></div>
                
                <div className="absolute top-4 left-4 px-3 py-1 rounded-md bg-[#c7ed56] text-[#0F172A] text-xs font-black uppercase tracking-wider shadow">
                  {team.ageGroup}
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#c7ed56]">
                    {team.subTitle}
                  </span>
                  <h3 className="text-2xl font-bold text-white font-heading">
                    {team.teamName}
                  </h3>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {team.desc}
                </p>

                {/* Achievements List */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <span className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                    Key Milestones:
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-700 font-medium">
                    {team.achievements.map((ach, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Medal className="w-3.5 h-3.5 text-[#097DC6] shrink-0" />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <button
                    onClick={onOpenJoinModal}
                    className="w-full py-2.5 text-xs font-black uppercase tracking-wider btn-lime rounded-xl flex items-center justify-center gap-1.5 shadow"
                  >
                    <span>Support / Try Out</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
