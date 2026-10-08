import React from 'react';
import { Eye, Target, ShieldCheck, Mail, User, Award, Users, Handshake, Flame } from 'lucide-react';
import { useTtaData } from '../api/DataContext';

export default function AboutPage({ onOpenBookModal }) {
  const { valuesData, objectivesData, leadershipData, partnersData } = useTtaData();
  // Helper to fetch values icon
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
    <div className="min-h-screen pt-20 pb-0 bg-white page-fade-in flex flex-col">
      
      {/* 1. EDITORIAL HEADER */}
      <section className="py-24 lg:py-36 bg-[#0F172A] text-white relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute right-0 top-1/4 w-[400px] h-[400px] bg-[#097DC6]/20 rounded-full blur-[80px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-6">
          <span className="eyebrow-label-light">About Tanzania Tennis</span>
          <h1 className="text-5xl sm:text-7xl font-black font-heading leading-[1.02] max-w-4xl">
            Pioneering Tennis Excellence.
          </h1>
          <p className="text-slate-300 max-w-2xl text-lg sm:text-xl font-medium leading-relaxed">
            The national sporting body for tennis in Tanzania — recognized by World Tennis (WT) and Confederation of African Tennis (CAT).
          </p>
        </div>
      </section>

      {/* 2. WHO WE ARE (Editorial Split Layout) */}
      <section className="py-24 lg:py-36 bg-white border-b border-editorial">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <span className="eyebrow-label">Our Mandate</span>
              <h2 className="text-3xl sm:text-5xl font-black text-[#0F172A] font-heading leading-tight">
                Empowering Youth, Promoting Community
              </h2>
              <div className="space-y-4 text-slate-600 text-base leading-relaxed font-medium">
                <p>
                  The Tanzania Tennis Association (TTA) is a non-profit organisation and the official national governing body for tennis. We govern and support 30+ member clubs and primary school structures across all 6 High-Performance zones.
                </p>
                <p>
                  Our responsibility is to build robust player pathways: introducing 6–12-year-olds to the sport via the ITF-supported Junior Tennis Initiative (JTI), and developing elite athletes to represent Tanzania in the Africa Junior Championships, Davis Cup, and Billie Jean Cup.
                </p>
              </div>
            </div>

            {/* Asymmetrical Image block */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] border border-editorial shadow-md group">
                <img
                  src={`${import.meta.env.BASE_URL}assets/images/about/about-tta.jpg`}
                  alt="TTA National Team"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/85 via-transparent to-transparent"></div>
                <div className="absolute bottom-5 left-5 right-5 text-white flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-black uppercase text-[#c7ed56] tracking-wider">Governing Body</span>
                    <div className="text-sm font-bold">ITF & CAT Affiliate</div>
                  </div>
                  <ShieldCheck className="w-5 h-5 text-[#c7ed56]" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. MISSION & VISION (High Contrast Split Layout) */}
      <section className="py-20 lg:py-28 bg-[#097DC6] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
            
            {/* Vision */}
            <div className="space-y-4 lg:pr-8">
              <div className="w-12 h-12 rounded-2xl bg-white/10 text-white border border-white/20 flex items-center justify-center font-bold shadow-sm">
                <Eye className="w-6 h-6 text-[#c7ed56]" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-black font-heading uppercase text-white tracking-wide">Our Vision</h3>
              <p className="text-base sm:text-lg text-slate-100 leading-relaxed font-semibold">
                To build a vibrant, accessible, and self-sustaining tennis environment that expands recreational play and competitive excellence to every corner of Tanzania.
              </p>
            </div>

            {/* Mission */}
            <div className="space-y-4 lg:pl-8 border-t border-white/20 pt-8 md:border-t-0 md:pt-0">
              <div className="w-12 h-12 rounded-2xl bg-white/10 text-white border border-white/20 flex items-center justify-center font-bold shadow-sm">
                <Target className="w-6 h-6 text-[#c7ed56]" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-black font-heading uppercase text-white tracking-wide">Our Mission</h3>
              <p className="text-base sm:text-lg text-slate-100 leading-relaxed font-semibold">
                To nurture talent through schools, support affiliated member clubs with structures and coach certification, and field highly competitive national squads.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* EDITORIAL BREAK: BLACK-AND-WHITE RACKETS */}
      <section className="relative bg-slate-950 py-32 lg:py-48 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={`${import.meta.env.BASE_URL}assets/images/editorial/bw_rackets.jpg`}
            alt="Black and White Tennis Rackets"
            className="w-full h-full object-cover grayscale opacity-40 object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 text-center space-y-6">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#c7ed56]">TTA Philosophy</span>
          <h2 className="text-giant font-black text-white leading-none tracking-tighter uppercase max-w-4xl mx-auto">
            MORE THAN A GAME.<br />A NATIONAL MOVEMENT.
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-lg mx-auto font-medium leading-relaxed">
            Tennis in Tanzania is a catalyst for education, community building, and international achievement. Every racket represents a story of ambition.
          </p>
        </div>
      </section>

      {/* 4. CORE VALUES (Guiding Principles) */}
      <section className="py-20 lg:py-28 bg-white border-b border-editorial">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          
          <div className="space-y-3">
            <span className="eyebrow-label">Guiding Principles</span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#0F172A] font-heading">
              Our Core Values
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-editorial">
            {valuesData.map((val) => (
              <div
                key={val.id}
                className="p-8 border-b border-r border-editorial flex flex-col justify-between min-h-[220px] hover:bg-[#F6F7F9] transition-colors duration-250 group"
              >
                <div className="space-y-4">
                  <div className="p-2.5 rounded-xl bg-[#F6F7F9] border border-editorial w-fit group-hover:bg-white transition-colors">
                    {getIcon(val.icon)}
                  </div>
                  <h3 className="text-xl font-bold text-[#0F172A] font-heading">{val.name}</h3>
                  <p className="text-sm text-slate-550 leading-relaxed font-semibold">{val.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. ROADMAP OBJECTIVES (Editorial Numbered Layout) */}
      <section className="py-20 lg:py-28 bg-[#F6F7F9] border-b border-editorial">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          
          <div className="space-y-3">
            <span className="eyebrow-label">Strategic Roadmap</span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#0F172A] font-heading">
              Association Objectives
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-10 lg:gap-14">
            {objectivesData.map((obj) => (
              <div key={obj.num} className="flex gap-6 items-start pb-8 border-b border-editorial">
                <span className="text-4xl font-black text-[#097DC6]/30 font-heading leading-none shrink-0">
                  {obj.num}
                </span>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-[#0F172A] font-heading">{obj.title}</h3>
                  <p className="text-sm sm:text-base text-slate-650 leading-relaxed font-semibold">{obj.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. EXECUTIVE COMMITTEE (Premium People Grid with Typographic Avatars) */}
      <section className="py-20 lg:py-28 bg-white border-b border-editorial">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          
          <div className="space-y-3">
            <span className="eyebrow-label">TTA Leadership</span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#0F172A] font-heading">
              Executive Committee
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadershipData.map((member) => {
              // Helper to generate initials from name, omitting titles like Hon., Dr., Mr., Ms.
              const getInitials = (n) => {
                const cleanName = n.replace(/^(Hon\.|Dr\.|Mr\.|Ms\.)\s+/i, '');
                const parts = cleanName.split(' ').filter(Boolean);
                if (parts.length >= 2) {
                  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
                }
                return parts[0] ? parts[0][0].toUpperCase() : '';
              };
              const initials = getInitials(member.name);

              return (
                <div key={member.role} className="flex flex-col justify-between group bg-white border border-editorial rounded-2xl overflow-hidden shadow-sm hover:border-[#097DC6] transition duration-300">
                  <div className="relative aspect-[4/5] profile-lettermark flex items-center justify-center overflow-hidden">
                    {/* Visual Typographic Treatment */}
                    <span className="text-7xl font-black font-heading text-white/5 select-none tracking-widest absolute -bottom-4 -right-4">
                      {initials}
                    </span>
                    <span className="text-4xl font-black font-heading text-[#c7ed56] z-10 drop-shadow-md">
                      {initials}
                    </span>
                    
                    <div className="absolute top-4 left-4 bg-[#c7ed56] text-[#0F172A] text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded shadow">
                      {member.role}
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-[#0F172A] font-heading">{member.name}</h3>
                      <div className="text-[10px] font-black text-[#097DC6] uppercase tracking-wider">{member.organization}</div>
                      <p className="text-xs text-slate-500 mt-2 leading-relaxed font-semibold">{member.bio}</p>
                    </div>
                    
                    <div className="pt-4 border-t border-slate-100">
                      <button
                        onClick={onOpenBookModal}
                        className="w-full py-2.5 text-xs font-black uppercase text-[#0F172A] bg-[#F6F7F9] hover:bg-[#c7ed56] rounded-xl transition border border-slate-200 hover:border-transparent cursor-pointer"
                      >
                        Book Consultation
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 7. PARTNERS & AFFILIATIONS (Minimal Horizontal Band) */}
      <section className="py-20 bg-[#F6F7F9] border-t border-editorial">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
          <div className="text-center">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400">Official International Affiliations</span>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {partnersData.map((partner) => (
              <div key={partner.code} className="p-6 rounded-2xl bg-white border border-editorial shadow-sm flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-[#097DC6] text-white font-black flex items-center justify-center font-heading text-lg">
                  {partner.code}
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-[#0F172A]">{partner.name}</div>
                  <div className="text-[10px] font-black uppercase text-[#097DC6] tracking-wider mt-0.5">{partner.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
