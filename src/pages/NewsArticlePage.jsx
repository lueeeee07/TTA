import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTtaData } from '../api/DataContext';
import { ArrowLeft, Calendar, User, ChevronRight } from 'lucide-react';

export default function NewsArticlePage() {
  const { articleId } = useParams();
  const { newsData } = useTtaData();
  const article = newsData.find((a) => a.id === articleId);
  const otherArticles = newsData.filter((a) => a.id !== articleId);

  if (!article) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-white page-fade-in flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-black font-heading">Article not found</h1>
        <Link to="/news" className="text-[#097DC6] font-bold">Back to Newsroom</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-0 bg-white page-fade-in flex flex-col">
      
      {/* 1. EDITORIAL ARTICLE HEADER */}
      <section className="py-24 lg:py-32 bg-[#0F172A] text-white relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-6">
          <Link
            to="/news"
            className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-[#c7ed56] hover:underline mb-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Newsroom
          </Link>
          
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded bg-[#097DC6] text-white text-xs font-black uppercase tracking-wider">
              {article.category}
            </span>
            <span className="text-xs text-slate-350 font-bold flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#c7ed56]" />
              {article.date}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading leading-tight text-white tracking-tight">
            {article.title}
          </h1>
        </div>
      </section>

      {/* 2. ARTICLE READING VIEW */}
      <section className="py-24 lg:py-32 bg-white border-b border-editorial">
        <div className="max-w-3xl mx-auto px-4 sm:px-8 space-y-12">
          
          {/* Main Visual Photo (Full Width of Reading Frame) */}
          <div className="relative rounded-3xl overflow-hidden shadow-md aspect-[16/9] border border-editorial bg-slate-900">
            <img
              src={article.image}
              alt={article.title}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Reading Prose Section */}
          <div className="space-y-8 text-slate-800 text-base sm:text-lg leading-relaxed font-medium">
            
            {/* Split paragraphs into readable blocks, adding a pull quote for editorial feel */}
            {(article.content || '').split('\n\n').map((paragraph, idx) => {
              const isSecondParagraph = idx === 1;
              if (isSecondParagraph) {
                return (
                  <div key={idx} className="space-y-8">
                    {/* Pull Quote style callout */}
                    <blockquote className="border-l-4 border-[#097DC6] pl-6 py-2 my-8 text-xl font-bold text-[#0F172A] font-heading leading-normal">
                      "TTA continues to prioritize long-term development to place Tanzanian athletes in tournaments that capture the country's national pride."
                    </blockquote>
                    <p className="bg-[#F6F7F9] p-6 sm:p-8 rounded-2xl border border-editorial">
                      {paragraph}
                    </p>
                  </div>
                );
              }
              return (
                <p key={idx} className="bg-[#F6F7F9] p-6 sm:p-8 rounded-2xl border border-editorial">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Footer Action Links */}
          <div className="pt-10 border-t border-editorial flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-bold uppercase tracking-wider">
              <User className="w-4 h-4 text-[#097DC6]" />
              <span>Official TTA Press Secretariat</span>
            </div>
            
            <Link
              to="/news"
              className="px-6 py-3 text-xs font-black uppercase tracking-wider text-[#0F172A] bg-[#F6F7F9] hover:bg-[#c7ed56] rounded-xl transition border border-slate-200 hover:border-transparent inline-flex items-center gap-1 cursor-pointer"
            >
              <span>View All Press Releases</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}
