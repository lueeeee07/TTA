import React from 'react';
import { X, Calendar, Share2, ChevronLeft } from 'lucide-react';

export default function NewsArticleModal({ article, onClose }) {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#0F172A]/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative max-w-2xl w-full bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xl animate-in zoom-in-95 duration-200 my-8">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 p-2 rounded-full hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded bg-[#097DC6] text-white">
              {article.category}
            </span>
            <span className="text-xs text-slate-500 flex items-center gap-1 font-bold">
              <Calendar className="w-3.5 h-3.5 text-[#097DC6]" />
              {article.date}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] leading-tight font-heading uppercase">
            {article.title}
          </h2>

          <div className="p-4 rounded-xl bg-[#F6F7F9] border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
            <span>Published by TTA Media Secretariat • Dar es Salaam</span>
            <button className="text-[#097DC6] hover:underline flex items-center gap-1 font-bold">
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>
          </div>

          <div className="text-slate-700 text-sm sm:text-base leading-relaxed space-y-4 pt-2 whitespace-pre-line">
            {article.content}
          </div>

          <div className="pt-6 border-t border-slate-200 flex justify-between items-center">
            <button
              onClick={onClose}
              className="px-5 py-2.5 text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 rounded-xl transition flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to All News</span>
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2.5 text-xs font-black uppercase text-[#0F172A] bg-[#c7ed56] rounded-xl hover:bg-[#b5e03b] transition shadow"
            >
              Done Reading
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
