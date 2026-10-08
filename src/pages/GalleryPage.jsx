import React, { useState } from 'react';
import { useTtaData } from '../api/DataContext';
import { Camera, Maximize2, Play, X, Info } from 'lucide-react';

export default function GalleryPage() {
  const { galleryData } = useTtaData();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeMedia, setActiveMedia] = useState(null);

  const categories = ['All', ...Array.from(new Set(galleryData.map((item) => item.category).filter(Boolean)))];

  const filteredGallery = galleryData.filter((item) =>
    selectedCategory === 'All' ? true : item.category === selectedCategory
  );

  return (
    <div className="min-h-screen pt-20 pb-0 bg-white page-fade-in flex flex-col">
      
      {/* 1. EDITORIAL HEADER */}
      <section className="py-24 lg:py-36 bg-[#0F172A] text-white relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute right-0 top-1/4 w-[400px] h-[400px] bg-[#097DC6]/20 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-6 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#c7ed56] text-xs font-black uppercase tracking-wider shadow-sm">
            <Camera className="w-4 h-4 text-[#c7ed56]" />
            <span>Captured moments</span>
          </div>
          <h1 className="text-5xl sm:text-7xl font-black font-heading leading-[1.02] max-w-4xl mx-auto">
            Photos & Videos.
          </h1>
          <p className="text-slate-350 max-w-2xl mx-auto text-lg sm:text-xl font-medium leading-relaxed">
            Highlights from sanctioned tournaments, training camps, coaching workshops, and wheelchair tennis exhibitions.
          </p>
        </div>
      </section>

      {/* 2. GALLERY INTERACTIVE VIEW */}
      <section className="py-24 lg:py-36 bg-white border-b border-editorial">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
          
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-xs font-black transition uppercase tracking-widest cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#097DC6] text-white shadow-sm'
                    : 'bg-[#F6F7F9] text-slate-700 border border-editorial hover:border-[#097DC6]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Asymmetrical Masonry Grid Showcase */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 auto-rows-[240px]">
            {filteredGallery.map((item, idx) => {
              const isVideo = item.type === 'video';
              
              // Define custom asymmetrical column/row spans based on indexes to create an editorial grid
              let gridClasses = 'col-span-1 row-span-1';
              if (selectedCategory === 'All') {
                if (idx === 0) {
                  gridClasses = 'md:col-span-2 md:row-span-2'; // Featured item
                } else if (idx === 3) {
                  gridClasses = 'md:col-span-2 row-span-1'; // Horizontal wider band
                }
              }

              return (
                <div
                  key={item.id}
                  onClick={() => setActiveMedia(item)}
                  className={`relative rounded-3xl overflow-hidden border border-editorial bg-slate-900 group cursor-pointer shadow-sm ${gridClasses}`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/20 to-transparent opacity-85 group-hover:opacity-95 transition duration-300"></div>

                  {/* Top badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-3 py-1 rounded bg-[#0F172A]/90 text-[#c7ed56] text-[9px] font-black uppercase tracking-wider backdrop-blur-sm border border-white/5">
                      {item.category}
                    </span>

                    {isVideo && (
                      <span className="w-8 h-8 rounded-full bg-[#c7ed56] text-[#0F172A] flex items-center justify-center shadow-lg">
                        <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                      </span>
                    )}
                  </div>

                  {/* Caption & Expand Button */}
                  <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                    <div className="space-y-1">
                      <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-[#c7ed56] transition font-heading leading-tight">
                        {item.title}
                      </h3>
                      <span className="text-[10px] text-slate-350 font-bold uppercase tracking-wider block">Official TTA Media</span>
                    </div>
                    <div className="w-8 h-8 rounded-xl bg-white/20 text-white flex items-center justify-center group-hover:bg-[#c7ed56] group-hover:text-[#0F172A] transition duration-350">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 3. LIGHTBOX / IMAGES VIEWER (Minimalist, Large overlay) */}
      {activeMedia && (
        <div className="fixed inset-0 z-50 bg-[#0F172A]/95 backdrop-blur-md flex items-center justify-center p-4">
          
          <div className="relative max-w-5xl w-full flex flex-col items-center space-y-6">
            
            {/* Top Bar Actions */}
            <div className="w-full flex items-center justify-between text-white border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-black text-[#c7ed56] uppercase tracking-widest block">
                  {activeMedia.category} • {activeMedia.type.toUpperCase()}
                </span>
                <h4 className="text-xl font-bold font-heading">{activeMedia.title}</h4>
              </div>
              
              <button
                onClick={() => setActiveMedia(null)}
                className="w-10 h-10 rounded-xl bg-white/10 text-white hover:bg-[#c7ed56] hover:text-[#0F172A] flex items-center justify-center transition cursor-pointer border border-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Media Container */}
            <div className="relative w-full h-[60vh] flex items-center justify-center bg-black/40 rounded-3xl overflow-hidden border border-white/10">
              {activeMedia.type === 'video' ? (
                <div className="w-full h-full flex flex-col items-center justify-center bg-slate-950 text-white p-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#c7ed56] text-[#0F172A] flex items-center justify-center shadow-2xl">
                    <Play className="w-8 h-8 fill-current ml-1" />
                  </div>
                  <h4 className="text-2xl font-bold font-heading">{activeMedia.title}</h4>
                  <p className="text-xs text-slate-400">Playable High-Definition TTA Match Recording</p>
                </div>
              ) : (
                <img
                  src={activeMedia.image}
                  alt={activeMedia.title}
                  className="w-full h-full object-contain"
                />
              )}
            </div>

            {/* Bottom Caption Info */}
            <div className="w-full flex items-center gap-3 bg-white/5 border border-white/10 p-5 rounded-2xl text-slate-355 text-xs">
              <Info className="w-5 h-5 text-[#c7ed56] shrink-0" />
              <p>
                This photograph is an official document of the Tanzania Tennis Association. Redistribution or use without official secretariat accreditation is subject to regulation.
              </p>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
