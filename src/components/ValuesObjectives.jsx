import React, { useState } from 'react';
import { useTtaData } from '../api/DataContext';
import { ShieldCheck, Users, Award, Target, Handshake, Flame, ChevronDown, ChevronUp } from 'lucide-react';

export default function ValuesObjectives() {
  const { valuesData, objectivesData } = useTtaData();
  const [expandedObjective, setExpandedObjective] = useState(0);

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-[#097DC6]" />;
      case 'Users': return <Users className="w-5 h-5 text-[#097DC6]" />;
      case 'Award': return <Award className="w-5 h-5 text-[#097DC6]" />;
      case 'Target': return <Target className="w-5 h-5 text-[#097DC6]" />;
      case 'Handshake': return <Handshake className="w-5 h-5 text-[#097DC6]" />;
      case 'Flame': return <Flame className="w-5 h-5 text-[#097DC6]" />;
      default: return <ShieldCheck className="w-5 h-5 text-[#097DC6]" />;
    }
  };

  return (
    <section className="relative py-20 lg:py-28 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Core Values Section */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#097DC6] bg-[#097DC6]/10 px-3.5 py-1 rounded-full">
            Guiding Pillars
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F172A] font-heading">
            Core Values
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-medium">
            The foundation of sportsmanship and development at the Tanzania Tennis Association.
          </p>
        </div>

        {/* 3-Column Desktop / 2-Column Tablet / 1-Column Mobile Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {valuesData.map((val) => (
            <div
              key={val.id}
              className="card-elevated p-6 rounded-3xl border border-slate-200 bg-[#F6F7F9] hover:bg-white transition-all duration-300 group"
            >
              <div className="flex items-center gap-3.5 mb-3">
                <div className="p-3 rounded-2xl bg-white border border-slate-200 group-hover:bg-[#097DC6]/10 transition duration-300 shadow-sm">
                  {getIcon(val.icon)}
                </div>
                <h3 className="text-lg font-bold text-[#0F172A] group-hover:text-[#097DC6] transition font-heading">
                  {val.name}
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {val.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Objectives Section - Compact Numbered Item Flow */}
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-[#0F172A] bg-[#c7ed56] px-3.5 py-1 rounded-full">
              Strategic Roadmap
            </span>
            <h3 className="text-2xl sm:text-4xl font-black text-[#0F172A] font-heading">
              Objectives of the Association
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {objectivesData.map((obj, index) => {
              const isExpanded = expandedObjective === index;
              return (
                <div
                  key={index}
                  className={`p-6 rounded-3xl border transition-all duration-300 ${
                    isExpanded
                      ? 'bg-white border-[#097DC6] shadow-lg ring-1 ring-[#097DC6]/30'
                      : 'bg-[#F6F7F9] border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <span className="w-10 h-10 rounded-2xl bg-[#097DC6] text-white text-sm font-black flex items-center justify-center shrink-0 shadow-md font-heading">
                      {obj.num}
                    </span>
                    <div className="space-y-2 flex-1">
                      <h4 className="text-base font-bold text-[#0F172A] font-heading">
                        {obj.title}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed font-medium">
                        {obj.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
