import React from 'react';
import { useTtaData } from '../api/DataContext';
import { ShieldCheck, ExternalLink } from 'lucide-react';

export default function Partners() {
  const { partnersData } = useTtaData();
  return (
    <section className="relative py-20 lg:py-28 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0F172A] bg-[#c7ed56] px-3.5 py-1 rounded-full">
            Part 4 — Partners
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F172A] font-heading">
            TTA Partners
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium">
            World-class international governing bodies endorsing and empowering tennis in Tanzania.
          </p>
        </div>

        {/* 3 Main Partner Cards Showcase */}
        <div className="grid md:grid-cols-3 gap-8">
          {partnersData.map((partner) => (
            <div
              key={partner.code}
              className="card-elevated p-8 rounded-3xl border border-slate-200 bg-[#F6F7F9] hover:bg-white flex flex-col justify-between transition-all duration-300 relative group"
            >
              {/* Top Logo & Badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 rounded-2xl bg-[#097DC6] text-white flex items-center justify-center font-black text-2xl font-heading shadow-md group-hover:scale-105 transition duration-300">
                  {partner.code}
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-[#c7ed56] text-[#0F172A]">
                  {partner.badge}
                </span>
              </div>

              {/* Body Content */}
              <div className="space-y-3 flex-1">
                <h3 className="text-2xl font-black text-[#0F172A] group-hover:text-[#097DC6] transition font-heading">
                  {partner.name}
                </h3>
                <div className="text-xs font-extrabold uppercase text-[#097DC6] tracking-wider">
                  {partner.role}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {partner.desc}
                </p>
              </div>

              {/* Bottom Accreditation Tag */}
              <div className="pt-6 mt-6 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1.5 text-slate-700 font-bold">
                  <ShieldCheck className="w-4 h-4 text-[#097DC6]" />
                  Official Recognition
                </span>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#097DC6] transition" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
