import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTtaData } from '../api/DataContext';
import { ArrowLeft, Sparkles, ChevronRight, Target, Shield } from 'lucide-react';

export default function ProgramDetailPage({ onOpenJoinModal }) {
  const { programId } = useParams();
  const { programsData } = useTtaData();
  const program = programsData.find((p) => p.id === programId);

  if (!program) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-white page-fade-in flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-black font-heading">Program not found</h1>
        <Link to="/programs" className="text-[#097DC6] font-bold">Back to Programs</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-0 bg-white page-fade-in flex flex-col">
      
      {/* 1. HERO HEADER */}
      <section className="py-24 lg:py-36 bg-[#0F172A] text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-6">
          <Link
            to="/programs"
            className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-[#c7ed56] hover:underline mb-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Programs Overview
          </Link>
          
          <div className="space-y-4">
            <span className="px-3.5 py-1 rounded bg-[#097DC6] border border-[#097DC6]/30 text-xs font-black uppercase text-white tracking-widest">
              {program.tag}
            </span>
            <h1 className="text-4xl sm:text-6xl font-black font-heading leading-tight text-white">
              {program.title}
            </h1>
            <p className="text-slate-350 max-w-2xl text-lg sm:text-xl font-medium leading-relaxed">
              {program.shortDesc}
            </p>
          </div>
        </div>
      </section>

      {/* 2. ARTICLE COMPOSITION */}
      <section className="py-24 lg:py-32 bg-white border-b border-editorial">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <div className="space-y-12">
            
            {/* Immersive Featured Image (Full Width of Content Area) */}
            <div className="relative rounded-3xl overflow-hidden shadow-lg aspect-[16/9] border border-editorial">
              <img
                src={program.image}
                alt={program.title}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Split Details Section */}
            <div className="grid md:grid-cols-12 gap-10 items-start">
              
              {/* Left Column: Core content (8 Cols) */}
              <div className="md:col-span-8 space-y-6">
                <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#097DC6]">
                  <Sparkles className="w-4 h-4 text-[#c7ed56]" />
                  <span>Program Framework & Structure</span>
                </div>

                <div className="prose prose-lg text-slate-700 leading-relaxed font-medium space-y-6">
                  {(program.fullContent || []).map((paragraph, idx) => (
                    <p key={idx} className="bg-[#F6F7F9] p-6 sm:p-8 rounded-2xl border border-editorial">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Right Column: Highlights / Quick facts (4 Cols) */}
              <div className="md:col-span-4 bg-[#F6F7F9] p-6 rounded-2xl border border-editorial space-y-5">
                <h4 className="text-sm font-black uppercase tracking-wider text-[#0F172A] border-b border-editorial pb-2">
                  Program Info
                </h4>
                
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase text-slate-400">Target Group</span>
                    <div className="text-xs font-bold text-slate-800">{program.tag}</div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase text-slate-400">Sanctioned By</span>
                    <div className="text-xs font-bold text-slate-800">Tanzania Tennis Association</div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase text-slate-400">Technical Support</span>
                    <div className="text-xs font-bold text-slate-800">ITF Development Grant</div>
                  </div>
                </div>

                <div className="pt-2 border-t border-editorial">
                  <button
                    onClick={onOpenJoinModal}
                    className="w-full py-3.5 text-xs font-black uppercase tracking-wider btn-lime rounded-xl inline-flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>Register Interest</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
