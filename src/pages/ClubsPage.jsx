import React, { useState } from 'react';
import { useTtaData } from '../api/DataContext';
import { MapPin, Search, Phone, ChevronRight, Trophy } from 'lucide-react';

export default function ClubsPage({ onOpenJoinModal }) {
  const { regionsData, clubsData } = useTtaData();
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const regionNames = ['All', ...regionsData.map((r) => r.name)];

  const filteredClubs = clubsData.filter((club) => {
    const matchesRegion = selectedRegion === 'All' || club.region === selectedRegion;
    const matchesSearch =
      (club.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
      (club.region?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
      (club.address?.toLowerCase() || '').includes(searchQuery.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-20 pb-0 bg-white page-fade-in flex flex-col">
      
      {/* 1. EDITORIAL HEADER */}
      <section className="relative bg-slate-950 py-36 lg:py-52 overflow-hidden border-b border-editorial">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&w=1800&q=80"
            alt="Empty Green Tennis Court"
            className="w-full h-full object-cover opacity-50 object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 space-y-6 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#c7ed56] text-xs font-black uppercase tracking-wider shadow-sm max-w-fit mx-auto">
            <Trophy className="w-4 h-4 text-[#c7ed56]" />
            <span>National Directory</span>
          </div>
          <h1 className="text-giant font-black text-white leading-none tracking-tighter uppercase max-w-4xl mx-auto">
            FIND YOUR COURT.<br />FIND YOUR CLUB.
          </h1>
          <p className="text-slate-350 max-w-2xl mx-auto text-base sm:text-lg font-medium leading-relaxed">
            Discover high-performance clay and hard courts, junior academies, and local leagues across Tanzania's regions.
          </p>
        </div>
      </section>

      {/* 2. DIRECTORY FILTERS & LISTING */}
      <section className="py-24 lg:py-36 bg-[#F6F7F9] border-b border-editorial">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          
          {/* Filters Bar (Clean, Minimal border design) */}
          <div className="bg-white p-6 rounded-3xl border border-editorial flex flex-col lg:flex-row items-center justify-between gap-6 shadow-sm">
            
            {/* Region Tabs Overflow container */}
            <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-3 lg:pb-0 scrollbar-none">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest shrink-0 mr-2">
                Filter Region:
              </span>
              {regionNames.map((r) => (
                <button
                  key={r}
                  onClick={() => setSelectedRegion(r)}
                  className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider whitespace-nowrap transition cursor-pointer ${
                    selectedRegion === r
                      ? 'bg-[#097DC6] text-white shadow-sm'
                      : 'bg-[#F6F7F9] text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            {/* Search Input Box */}
            <div className="relative w-full lg:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search club name, region, or address..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-[#F6F7F9] text-slate-900 placeholder-slate-400 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#097DC6] focus:bg-white transition"
              />
            </div>

          </div>

          {/* Clubs Grid Showcase */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredClubs.map((club) => (
              <div
                key={club.id}
                className="flex flex-col justify-between bg-white border border-editorial rounded-3xl overflow-hidden shadow-sm hover:border-[#097DC6] transition duration-300 group"
              >
                {/* Image Showcase */}
                <div className="image-zoom-container h-52 bg-slate-900">
                  <img
                    src={club.image || `${import.meta.env.BASE_URL}assets/images/clubs/club-default.jpg`}
                    alt={club.name}
                    loading="lazy"
                    className="image-zoom-img w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-[#0F172A]/90 px-3 py-1 rounded text-[9px] font-black text-white uppercase tracking-wider shadow">
                    {club.region}
                  </div>
                  <div className="absolute bottom-4 right-4 bg-[#c7ed56] text-[#0F172A] px-3 py-1 rounded text-[10px] font-black uppercase tracking-wider shadow">
                    {club.courts}
                  </div>
                </div>

                {/* Info Text Details */}
                <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-[#0F172A] group-hover:text-[#097DC6] transition font-heading leading-tight">
                      {club.name}
                    </h3>
                    
                    <div className="flex items-start gap-2 text-xs text-slate-500 font-medium">
                      <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      <span>{club.address}</span>
                    </div>

                    {/* Features tags as clean inline labels */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {club.features.map((feat) => (
                        <span
                          key={feat}
                          className="text-[9px] font-black uppercase px-2.5 py-1 rounded bg-[#F6F7F9] text-slate-500 border border-slate-200"
                        >
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                    <div className="text-xs text-slate-500 font-bold flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#097DC6]" />
                      <a href={`tel:${club.contact}`} className="hover:underline">{club.contact}</a>
                    </div>
                    
                    <button
                      onClick={onOpenJoinModal}
                      className="px-4 py-2.5 text-xs font-black uppercase tracking-wider btn-lime rounded-xl inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Join Club</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
