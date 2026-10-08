import React from 'react';
import { useTtaData } from '../api/DataContext';
import { Mail, User } from 'lucide-react';

export default function Leadership({ onOpenBookModal }) {
  const { leadershipData } = useTtaData();
  return (
    <section className="relative py-20 lg:py-28 bg-[#F6F7F9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#097DC6] bg-[#097DC6]/10 px-3.5 py-1 rounded-full border border-[#097DC6]/20">
            Governance & Executive Body
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F172A] font-heading">
            TTA Leadership
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium">
            Executive Management Committee directing tennis governance and player pathways nationwide.
          </p>
        </div>

        {/* Leadership Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {leadershipData.map((member) => (
            <div
              key={member.role}
              className="card-elevated rounded-3xl overflow-hidden bg-white border border-slate-200 flex flex-col justify-between hover:border-[#097DC6] transition-all duration-300 group"
            >
              {/* Photo Frame or Professional Neutral Avatar */}
              <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-[#0F172A] to-[#097DC6] flex items-center justify-center">
                {member.avatar ? (
                  <img
                    src={member.avatar}
                    alt={member.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-center p-6 space-y-3">
                    <div className="w-20 h-20 rounded-full bg-[#c7ed56] text-[#0F172A] flex items-center justify-center shadow-lg group-hover:scale-110 transition duration-300">
                      <User className="w-10 h-10" />
                    </div>
                    <span className="text-xs font-black uppercase text-white/80 tracking-wider">
                      Official Committee
                    </span>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/85 via-transparent to-transparent"></div>
                <div className="absolute top-4 left-4 px-3 py-1 rounded-lg bg-[#c7ed56] text-[#0F172A] text-xs font-black shadow-md uppercase tracking-wider">
                  {member.role}
                </div>
              </div>

              {/* Standard Structure: Photo/Avatar -> Name -> Position -> Short Description -> Contact Button */}
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#0F172A] group-hover:text-[#097DC6] transition font-heading">
                    {member.name}
                  </h3>
                  <div className="text-xs font-bold text-[#097DC6] mb-2 uppercase tracking-wider">
                    {member.organization}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {member.bio}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <button
                    onClick={onOpenBookModal}
                    className="w-full py-2.5 text-xs font-black uppercase tracking-wider text-[#0F172A] bg-[#F6F7F9] hover:bg-[#c7ed56] rounded-xl transition flex items-center justify-center gap-2 border border-slate-200"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#097DC6]" />
                    <span>Contact Officer</span>
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
