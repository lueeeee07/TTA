import React, { useState } from 'react';
import { useTtaData } from '../api/DataContext';
import { Camera, Maximize2, Play, X } from 'lucide-react';

export default function GallerySection() {
  const { galleryData } = useTtaData();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeMedia, setActiveMedia] = useState(null);

  const categories = ['All', ...Array.from(new Set(galleryData.map((item) => item.category).filter(Boolean)))];

  const filteredGallery = galleryData.filter((item) =>
    selectedCategory === 'All' ? true : item.category === selectedCategory
  );

  return (
    <section id="gallery" className="relative py-20 lg:py-28 bg-[#F6F7F9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#097DC6]/10 border border-[#097DC6]/20 text-[#097DC6] text-xs font-bold uppercase tracking-wider">
            <Camera className="w-3.5 h-3.5" />
            Media Gallery
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F172A] font-heading">
            Photos & Videos
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium">
            High-definition match highlights, tournament photography, and grassroots clinics across Tanzania.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition uppercase tracking-wider ${
                selectedCategory === cat
                  ? 'bg-[#097DC6] text-white shadow-md'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-[#097DC6]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Asymmetric / Sports Media Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item, idx) => {
            const isVideo = item.type === 'video';
            const isLarge = idx === 0 || idx === 3;
            return (
              <div
                key={item.id}
                onClick={() => setActiveMedia(item)}
                className={`relative rounded-3xl overflow-hidden border border-slate-200 bg-slate-900 group cursor-pointer shadow-md ${
                  isLarge ? 'h-72 sm:h-80' : 'h-64'
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-108 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/30 to-transparent opacity-85 group-hover:opacity-95 transition duration-300"></div>

                {/* Top Category Badge & Video Play Marker */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-md bg-[#0F172A]/90 text-[#c7ed56] text-[10px] font-black uppercase tracking-wider backdrop-blur-sm border border-white/10">
                    {item.category}
                  </span>

                  {isVideo && (
                    <span className="w-8 h-8 rounded-full bg-[#c7ed56] text-[#0F172A] flex items-center justify-center shadow-lg animate-pulse">
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </span>
                  )}
                </div>

                {/* Title & Preview Action */}
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-[#c7ed56] transition font-heading">
                      {item.title}
                    </h3>
                    <span className="text-xs text-slate-300 font-medium">TTA Official Media</span>
                  </div>
                  <div className="w-9 h-9 rounded-2xl bg-white/20 text-white flex items-center justify-center group-hover:bg-[#c7ed56] group-hover:text-[#0F172A] transition duration-300">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Lightbox / Media Viewer Modal */}
      {activeMedia && (
        <div className="fixed inset-0 z-50 bg-[#0F172A]/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-2xl">
            <button
              onClick={() => setActiveMedia(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-[#0F172A] text-white hover:bg-[#c7ed56] hover:text-[#0F172A] flex items-center justify-center transition"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative max-h-[70vh] bg-black flex items-center justify-center">
              {activeMedia.type === 'video' ? (
                <div className="relative w-full h-[60vh] flex flex-col items-center justify-center bg-slate-950 text-white text-center p-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#c7ed56] text-[#0F172A] flex items-center justify-center shadow-2xl">
                    <Play className="w-8 h-8 fill-current ml-1" />
                  </div>
                  <h4 className="text-2xl font-bold font-heading">{activeMedia.title}</h4>
                  <p className="text-xs text-slate-400 max-w-md">Official TTA Video Stream • Playing HD Highlights</p>
                </div>
              ) : (
                <img
                  src={activeMedia.image}
                  alt={activeMedia.title}
                  className="w-full h-full object-contain max-h-[70vh]"
                />
              )}
            </div>

            <div className="p-6 bg-white border-t border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-xs font-black text-[#097DC6] uppercase tracking-wider">
                  {activeMedia.category} • {activeMedia.type.toUpperCase()}
                </span>
                <h4 className="text-xl font-bold text-[#0F172A]">{activeMedia.title}</h4>
              </div>
              <button
                onClick={() => setActiveMedia(null)}
                className="px-5 py-2.5 text-xs font-black uppercase text-[#0F172A] bg-[#c7ed56] rounded-xl hover:bg-[#b8e244] shadow"
              >
                Close Viewer
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
