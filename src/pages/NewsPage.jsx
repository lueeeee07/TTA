import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTtaData } from '../api/DataContext';
import { Calendar, ChevronRight, Trophy, Sparkles, Newspaper, ArrowRight, ShieldCheck } from 'lucide-react';

export default function NewsPage() {
  const { newsData } = useTtaData();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(newsData.map((a) => a.category).filter(Boolean)))];

  const filteredArticles = newsData.filter(
    (a) => selectedCategory === 'All' || a.category === selectedCategory
  );

  // High-performance results sidebar mock data for authentic newsroom context
  const liveResults = [
    { title: 'National Junior Qualifier U16', winner: 'Dar es Salaam (Gold)', date: 'Aug 2026' },
    { title: 'Tanzania National Wheelchair Open', winner: 'Moshi Club (Upcoming)', date: 'Oct 2026' },
    { title: 'CAT East Africa Junior Circuits', winner: 'Arusha Academy (Silver)', date: 'Jul 2026' },
  ];

  const announcements = [
    { title: 'Secretariat Announces Affiliation Deadline', desc: 'All member clubs must renew charters by September 15, 2026.' },
    { title: 'ITF Level 2 Accredited Coaching Slot Open', desc: 'Apply by September 1, 2026, for the certified workshop in Dar.' },
  ];

  return (
    <div className="min-h-screen pt-20 pb-0 bg-white page-fade-in flex flex-col">
      
      {/* 1. EDITORIAL HEADER */}
      <section className="py-24 lg:py-32 bg-[#0F172A] text-white relative overflow-hidden">
        <div className="absolute right-0 top-1/4 w-[400px] h-[400px] bg-[#097DC6]/20 rounded-full blur-[90px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-6">
          <span className="eyebrow-label-light">Press & Publications</span>
          <h1 className="text-5xl sm:text-7xl font-black font-heading leading-[0.98] tracking-tight">
            TTA SPORTS NEWSROOM
          </h1>
          <p className="text-slate-300 max-w-2xl text-base sm:text-lg font-medium leading-relaxed">
            Your official source for Tanzanian tennis news: tourney results, team logs, coaching developments, and federation policy updates.
          </p>
        </div>
      </section>

      {/* 2. NEWSROOM CORE WORKSPACE (Asymmetrical Content + Sidebar Grid) */}
      <section className="py-16 lg:py-24 bg-[#F6F7F9] border-b border-editorial">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
          
          {/* Categories Tab Filter Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 border-b border-editorial">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-3">Stream Category:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider whitespace-nowrap transition cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#097DC6] text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-200 border border-editorial'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            
            {/* Left Main Stream (8 Columns) */}
            <div className="lg:col-span-8 space-y-12">
              {filteredArticles.length === 0 ? (
                <div className="p-12 text-center bg-white border border-editorial rounded-3xl">
                  <p className="text-slate-500 font-semibold">No articles found in this category.</p>
                </div>
              ) : (
                <div className="space-y-12">
                  {filteredArticles.map((article, idx) => {
                    const isFirst = idx === 0 && selectedCategory === 'All';
                    if (isFirst) {
                      // Layout for Lead Featured Story
                      return (
                        <div key={article.id} className="group space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-editorial shadow-sm">
                          <div className="image-zoom-container rounded-2xl aspect-[16/9] bg-slate-900 border border-editorial shadow-sm relative">
                            <img
                              src={article.image}
                              alt={article.title}
                              className="image-zoom-img w-full h-full object-cover"
                            />
                            <span className="absolute top-4 left-4 px-3 py-1 rounded bg-[#097DC6] text-white text-[10px] font-black uppercase tracking-wider shadow">
                              {article.category} • featured
                            </span>
                          </div>
                          
                          <div className="space-y-4">
                            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">{article.date}</span>
                            <h2 className="text-2xl sm:text-4xl font-black text-[#0F172A] font-heading leading-tight group-hover:text-[#097DC6] transition">
                              <Link to={`/news/${article.id}`}>{article.title}</Link>
                            </h2>
                            <p className="text-slate-655 text-sm sm:text-base leading-relaxed font-semibold">
                              {article.snippet}
                            </p>
                            <div className="pt-2">
                              <Link
                                  to={`/news/${article.id}`}
                                  className="px-6 py-3.5 text-xs font-black uppercase tracking-wider btn-lime rounded-xl inline-flex items-center gap-2"
                                >
                                  <span>Read Full Coverage</span>
                                  <ChevronRight className="w-4 h-4" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      );
                    }

                    // Standard Asymmetrical Stream Card
                    return (
                      <div key={article.id} className="group grid sm:grid-cols-12 gap-6 bg-white p-6 rounded-3xl border border-editorial shadow-sm items-start">
                        <div className="sm:col-span-5">
                          <div className="image-zoom-container rounded-2xl aspect-[16/10] overflow-hidden bg-slate-900 border border-editorial shadow-sm">
                            <img
                              src={article.image}
                              alt={article.title}
                              loading="lazy"
                              className="image-zoom-img w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-7 space-y-3 flex flex-col justify-between h-full">
                          <div className="space-y-2">
                            <div className="flex items-center gap-3">
                              <span className="text-[9px] font-black uppercase text-[#097DC6] bg-[#097DC6]/5 px-2.5 py-0.5 rounded border border-[#097DC6]/15">
                                {article.category}
                              </span>
                              <span className="text-xs text-slate-400 font-bold flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                {article.date}
                              </span>
                            </div>
                            <h3 className="text-xl font-bold text-[#0F172A] font-heading group-hover:text-[#097DC6] transition leading-snug">
                              <Link to={`/news/${article.id}`}>{article.title}</Link>
                            </h3>
                            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-semibold">
                              {article.snippet}
                            </p>
                          </div>
                          <div className="pt-2">
                            <Link
                              to={`/news/${article.id}`}
                              className="inline-flex items-center text-xs font-black uppercase text-[#097DC6] hover:text-[#0F172A] transition"
                            >
                              <span>Read Story</span>
                              <ChevronRight className="w-4 h-4 ml-0.5" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Right Newsroom Sidebar widgets (4 Columns) */}
            <div className="lg:col-span-4 space-y-8">
              
              {/* Widget 1: Tournament Results */}
              <div className="bg-white p-6 rounded-3xl border border-editorial shadow-sm space-y-4">
                <div className="flex items-center gap-2 border-b border-editorial pb-3">
                  <Trophy className="w-5 h-5 text-[#097DC6]" />
                  <h3 className="text-sm font-black uppercase tracking-wider text-[#0F172A] font-heading">
                    Tournament Results
                  </h3>
                </div>
                <div className="space-y-4">
                  {liveResults.map((res, i) => (
                    <div key={i} className="text-xs space-y-1">
                      <div className="flex justify-between font-bold text-[#0F172A]">
                        <span>{res.title}</span>
                        <span className="text-slate-400 font-medium">{res.date}</span>
                      </div>
                      <p className="text-[#097DC6] font-bold uppercase tracking-wider text-[9px] bg-[#097DC6]/5 px-2 py-0.5 rounded border border-[#097DC6]/10 w-fit">
                        Winner: {res.winner}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Widget 2: Secretariat Announcements */}
              <div className="bg-[#0F172A] text-white p-6 rounded-3xl border border-white/5 shadow-md space-y-4">
                <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                  <ShieldCheck className="w-5 h-5 text-[#c7ed56]" />
                  <h3 className="text-sm font-black uppercase tracking-wider text-white font-heading">
                    Federation Notices
                  </h3>
                </div>
                <div className="space-y-4">
                  {announcements.map((ann, i) => (
                    <div key={i} className="space-y-1">
                      <h4 className="text-xs font-bold text-[#c7ed56]">{ann.title}</h4>
                      <p className="text-[11px] text-slate-300 leading-normal font-semibold">
                        {ann.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
