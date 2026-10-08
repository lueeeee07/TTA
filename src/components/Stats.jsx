import React from 'react';
import { useTtaData } from '../api/DataContext';
import CountUpNumber from './CountUpNumber';
import { ShieldCheck, MapPin, Layers, Award, Users } from 'lucide-react';

export default function Stats() {
  const { statsData } = useTtaData();
  const getIcon = (id) => {
    switch (id) {
      case 'clubs': return <ShieldCheck className="w-5 h-5 text-[#097DC6]" />;
      case 'regions': return <MapPin className="w-5 h-5 text-[#097DC6]" />;
      case 'programmes': return <Layers className="w-5 h-5 text-[#097DC6]" />;
      case 'teams': return <Award className="w-5 h-5 text-[#097DC6]" />;
      default: return <Users className="w-5 h-5 text-[#097DC6]" />;
    }
  };

  return (
    <section className="relative py-16 bg-[#F6F7F9] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
          {statsData.map((stat) => (
            <div
              key={stat.id}
              className="card-elevated p-6 rounded-3xl flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-3 rounded-2xl bg-[#097DC6]/10 text-[#097DC6] group-hover:bg-[#097DC6] group-hover:text-white transition duration-300">
                  {getIcon(stat.id)}
                </div>
                <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#097DC6] font-heading tracking-tight">
                  <CountUpNumber target={stat.number} suffix={stat.suffix} />
                </span>
              </div>

              <div>
                <h3 className="text-sm sm:text-base font-extrabold text-[#0F172A] group-hover:text-[#097DC6] transition">
                  {stat.label}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed font-medium">
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
