import React, { useState } from 'react';
import { useTtaData } from '../api/DataContext';
import { MapPin, Search, Phone, ChevronRight, Trophy } from 'lucide-react';

export default function NetworkClubs({ onOpenJoinModal }) {
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
    <section id="network" className="relative py-20 lg:py-28 bg-[#F6F7F9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#097DC6] bg-[#097DC6]/10 px-3.5 py-1 rounded-full border border-[#097DC6]/20">
            Our Network
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F172A] font-heading">
            Tennis Clubs Across Tanzania
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium">
            Over 30 affiliated member clubs across all high-performance regional zones.
          </p>
        </div>

        {/* Region Filter Pills & Search */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 mb-10 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
          
          {/* Region Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            <span className="text-xs font-black text-slate-500 uppercase tracking-wider shrink-0 mr-1">
              Region:
            </span>
            {regionNames.map((r) => (
              <button
                key={r}
                onClick={() => setSelectedRegion(r)}
                className={`px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider whitespace-nowrap transition ${
                  selectedRegion === r
                    ? 'bg-[#097DC6] text-white shadow-sm'
                    : 'bg-[#F6F7F9] text-slate-700 hover:bg-slate-200'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search club name or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#F6F7F9] text-slate-900 placeholder-slate-400 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#097DC6] transition"
            />
          </div>

        </div>

        {/* Interactive Club Directory Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClubs.map((club) => (
            <div
              key={club.id}
              className="card-elevated rounded-3xl overflow-hidden bg-white border border-slate-200 flex flex-col justify-between hover:border-[#097DC6] transition duration-300 group"
            >
              {/* Club Thumbnail & Region Badge */}
              <div className="relative h-44 overflow-hidden bg-slate-900">
                <img
                  src={club.image}
                  alt={club.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-transparent to-transparent"></div>
                
                <div className="absolute top-3 left-3 px-3 py-1 rounded-md bg-[#097DC6] text-white text-[10px] font-black uppercase shadow">
                  {club.region} Region
                </div>

                <div className="absolute bottom-3 right-3 text-xs font-bold text-[#c7ed56]">
                  {club.courts}
                </div>
              </div>

              {/* Club Information */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-[#0F172A] group-hover:text-[#097DC6] transition font-heading">
                    {club.name}
                  </h3>

                  <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-1 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{club.address}</span>
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {club.features.map((feat) => (
                      <span
                        key={feat}
                        className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-[#F6F7F9] text-slate-600 border border-slate-200"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Direct Action */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500 flex items-center gap-1 font-bold">
                    <Phone className="w-3.5 h-3.5 text-[#097DC6]" />
                    {club.contact}
                  </span>
                  <button
                    onClick={onOpenJoinModal}
                    className="px-4 py-2 text-xs font-black uppercase tracking-wider btn-lime rounded-xl flex items-center gap-1"
                  >
                    <span>Join Club</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
