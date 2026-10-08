import React from 'react';
import { Target, Eye, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function AboutUs({ onOpenBookModal }) {
  return (
    <section id="about" className="relative py-20 lg:py-28 bg-[#F6F7F9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#097DC6]/10 border border-[#097DC6]/20 text-[#097DC6] text-xs font-bold uppercase tracking-wider mb-6">
          <span>Clubs Section • Who We Are</span>
        </div>

        {/* 50/50 Desktop Composition */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16">
          
          {/* Left Column: Text */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F172A] tracking-tight font-heading leading-tight">
              Building Champions on and Off the Court
            </h2>

            <div className="inline-block px-3.5 py-1 rounded-lg bg-[#c7ed56] text-[#0F172A] text-xs font-black uppercase tracking-wider">
              Everyone is welcome on court!
            </div>

            <p className="text-base text-slate-700 leading-relaxed font-medium">
              The <strong className="text-[#097DC6]">Tanzania Tennis Association (TTA)</strong> is a non-profit organisation and the national sporting body for tennis in Tanzania, recognised by both <strong className="text-[#0F172A]">World Tennis (WT)</strong> and the <strong className="text-[#0F172A]">Confederation of African Tennis (CAT)</strong>. TTA currently has more than 30 affiliated member clubs across the country.
            </p>

            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              Our responsibility is to create development programs at every level in an effort to continuously improve the standards of tennis in the country. TTA organises and participates in local and international tournaments such as the Davis Cup, Billie Jean Cup, senior events and junior tournaments including the Africa Junior Championships and ITF Junior Circuits.
            </p>

            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={onOpenBookModal}
                className="px-6 py-3.5 text-xs font-black uppercase tracking-wider btn-lime rounded-xl flex items-center gap-2"
              >
                <span>Book a Meeting</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Featured Image */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 aspect-[4/3] group">
              <img
                src={`${import.meta.env.BASE_URL}assets/images/about/about-tta.jpg`}
                alt="Official Tanzania Tennis Association National Team"
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#0F172A]/90 backdrop-blur-md text-white border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-xs font-black uppercase text-[#c7ed56]">National Development</div>
                  <div className="text-base font-bold">Grassroots to Elite Pathway</div>
                </div>
                <ShieldCheck className="w-6 h-6 text-[#c7ed56]" />
              </div>
            </div>
          </div>

        </div>

        {/* 3 Visually Connected Supporting Cards */}
        <div className="grid sm:grid-cols-3 gap-6">
          
          {/* Card 1: Vision */}
          <div className="card-elevated p-6 rounded-3xl space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#097DC6]/10 text-[#097DC6] flex items-center justify-center">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#0F172A] font-heading">Our Vision</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              To promote the development and popularity of tennis across all regions of Tanzania.
            </p>
          </div>

          {/* Card 2: Mission */}
          <div className="card-elevated p-6 rounded-3xl space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#c7ed56] text-[#0F172A] flex items-center justify-center font-bold">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#0F172A] font-heading">Our Mission</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              To identify and nurture tennis players and organise tennis at a social, competitive and professional level.
            </p>
          </div>

          {/* Card 3: Governance */}
          <div className="card-elevated p-6 rounded-3xl space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#097DC6]/10 text-[#097DC6] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#0F172A] font-heading">International Recognition</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Endorsed by World Tennis (WT) and Confederation of African Tennis (CAT) with 30+ affiliated clubs.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
