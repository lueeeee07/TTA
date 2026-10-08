import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useTtaData } from '../api/DataContext';

export default function JoinClubModal({ isOpen, onClose }) {
  const { clubsData, regionsData } = useTtaData();
  const [region, setRegion] = useState('');
  const [selectedClub, setSelectedClub] = useState('');
  const [applicantName, setApplicantName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('Junior (U6 - U18)');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!region && regionsData[0]) setRegion(regionsData[0].name);
  }, [region, regionsData]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('http://localhost/TTA/api/endpoints/join_club.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          region,
          club_name: selectedClub,
          applicant_name: applicantName,
          email,
          phone,
          category,
        }),
      });
    } catch (err) {
      console.error('Failed to submit application:', err);
    }
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 3500);
  };

  const filteredClubs = clubsData.filter((c) => c.region === region);

  return (
    <div className="fixed inset-0 z-50 bg-[#0F172A]/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative max-w-xl w-full bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xl animate-in zoom-in-95 duration-200">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 p-2 rounded-full hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#c7ed56] flex items-center justify-center text-[#0F172A] font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-[#0F172A] font-heading uppercase">
              Join an Affiliated TTA Club
            </h3>
            <p className="text-xs text-slate-600">
              Connect with over 30+ official member clubs across Tanzania.
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="py-10 text-center space-y-4 rounded-2xl bg-[#c7ed56]/20 border border-[#c7ed56]">
            <CheckCircle2 className="w-14 h-14 text-[#097DC6] mx-auto animate-bounce" />
            <h4 className="text-xl font-bold text-[#0F172A]">Application Received!</h4>
            <p className="text-sm text-slate-700">
              We have forwarded your registration request to <span className="text-[#097DC6] font-bold">{selectedClub || 'the regional tennis secretary'}</span>. They will contact you via phone or email shortly!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1">
                  Select Region *
                </label>
                <select
                  value={region}
                  onChange={(e) => {
                    setRegion(e.target.value);
                    setSelectedClub('');
                  }}
                  className="w-full px-3.5 py-2.5 bg-[#F6F7F9] text-slate-900 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-[#097DC6]"
                >
                  {regionsData.map((r) => (
                    <option key={r.name} value={r.name}>{r.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1">
                  Preferred Club *
                </label>
                <select
                  value={selectedClub}
                  onChange={(e) => setSelectedClub(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F6F7F9] text-slate-900 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-[#097DC6]"
                >
                  <option value="">-- Choose Club --</option>
                  {filteredClubs.map((club) => (
                    <option key={club.id} value={club.name}>
                      {club.name}
                    </option>
                  ))}
                  <option value="Any Nearest Club">Any Nearest Affiliated Club</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Neema Mollel"
                value={applicantName}
                onChange={(e) => setApplicantName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F6F7F9] text-slate-900 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-[#097DC6]"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1">
                  Phone / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+255 7..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F6F7F9] text-slate-900 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-[#097DC6]"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1">
                  Player Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F6F7F9] text-slate-900 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-[#097DC6]"
                >
                  <option>Junior (U6 - U18)</option>
                  <option>Senior Competitive</option>
                  <option>Social & Beginner</option>
                  <option>Wheelchair Tennis Athlete</option>
                  <option>Coach / Official Trainee</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="neema@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F6F7F9] text-slate-900 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-[#097DC6]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 text-xs font-black uppercase tracking-wider text-[#0F172A] bg-[#c7ed56] hover:bg-[#b5e03b] rounded-xl shadow transition"
            >
              Submit Membership Application
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
