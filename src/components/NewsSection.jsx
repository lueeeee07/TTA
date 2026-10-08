import React from 'react';
import { useTtaData } from '../api/DataContext';
import { Calendar, ArrowRight, ChevronRight, Newspaper } from 'lucide-react';

export default function NewsSection({ onSelectNewsArticle }) {
  const { newsData } = useTtaData();
  const featuredArticle = newsData.find((a) => a.isFeatured) || newsData[0];
  const secondaryArticles = featuredArticle
    ? newsData.filter((a) => a.id !== featuredArticle.id)
    : [];

  if (!featuredArticle) return null;

  return (
    <section id="news" className="relative py-20 lg:py-28 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#097DC6] bg-[#097DC6]/10 px-3.5 py-1 rounded-full border border-[#097DC6]/20">
              News & Media
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F172A] font-heading">
              Current News & Updates
            </h2>
          </div>
          
          <button
            onClick={() => onSelectNewsArticle(featuredArticle)}
            className="px-5 py-2.5 text-xs font-black uppercase tracking-wider btn-lime rounded-xl flex items-center gap-2 w-fit shadow"
          >
            <span>View All News</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Editorial Layout: 1 Featured Main Article + Secondary Stacked Articles */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Featured Article (Left - 7 Cols) */}
          <article
            onClick={() => onSelectNewsArticle(featuredArticle)}
            className="lg:col-span-7 card-elevated rounded-3xl overflow-hidden bg-white border border-slate-200 flex flex-col justify-between cursor-pointer group shadow-md"
          >
            <div className="relative h-72 sm:h-80 overflow-hidden bg-slate-900">
              <img
                src={featuredArticle.image}
                alt={featuredArticle.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 via-transparent to-transparent"></div>
              
              <div className="absolute top-4 left-4 px-3 py-1 rounded-md bg-[#097DC6] text-white text-xs font-black uppercase tracking-wider shadow">
                {featuredArticle.category} • Featured Lead
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-200">
                <span className="flex items-center gap-1.5 font-bold">
                  <Calendar className="w-3.5 h-3.5 text-[#c7ed56]" />
                  {featuredArticle.date}
                </span>
                <span className="bg-[#0F172A]/80 px-2.5 py-1 rounded text-[10px] uppercase tracking-wider">
                  Official Release
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-[#0F172A] group-hover:text-[#097DC6] transition font-heading leading-snug mb-3">
                  {featuredArticle.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  {featuredArticle.snippet}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-[#097DC6] group-hover:text-[#0F172A] flex items-center gap-1">
                  <span>Read Full Article</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition duration-200" />
                </span>
              </div>
            </div>
          </article>

          {/* Secondary Stacked Articles (Right - 5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {secondaryArticles.map((article) => (
              <article
                key={article.id}
                onClick={() => onSelectNewsArticle(article)}
                className="card-elevated p-6 rounded-3xl bg-[#F6F7F9] hover:bg-white border border-slate-200 flex flex-col justify-between cursor-pointer group flex-1"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded bg-[#097DC6] text-white">
                      {article.category}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1 font-bold">
                      <Calendar className="w-3.5 h-3.5 text-[#097DC6]" />
                      {article.date}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#0F172A] group-hover:text-[#097DC6] transition leading-snug font-heading">
                    {article.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 font-medium">
                    {article.snippet}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200/80">
                  <span className="inline-flex items-center text-xs font-black uppercase tracking-wider text-[#097DC6] group-hover:text-[#0F172A]">
                    <span>Read Story</span>
                    <ChevronRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition duration-200" />
                  </span>
                </div>
              </article>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
