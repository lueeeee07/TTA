import React, { useState } from 'react';
import { X, Calendar, CheckCircle2 } from 'lucide-react';

export default function BookMeetingModal({ isOpen, onClose }) {
  const [meetingType, setMeetingType] = useState('Club Affiliation & Membership');
  const [officer, setOfficer] = useState('Secretary General - Emmanuel Tarimo');
  const [date, setDate] = useState('2026-08-25');
  const [time, setTime] = useState('10:00 AM');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('http://localhost/TTA/api/endpoints/book_meeting.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          meeting_type: meetingType,
          officer,
          preferred_date: date,
          time_slot: time,
          name,
          email,
        }),
      });
    } catch (err) {
      console.error('Failed to book meeting:', err);
    }
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 3500);
  };

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
          <div className="w-10 h-10 rounded-xl bg-[#097DC6] flex items-center justify-center text-white font-bold">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-[#0F172A] font-heading uppercase">
              Book a Meeting with TTA
            </h3>
            <p className="text-xs text-slate-600">
              Schedule an official consultation with the secretariat or technical committee.
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="py-10 text-center space-y-4 rounded-2xl bg-[#c7ed56]/20 border border-[#c7ed56]">
            <CheckCircle2 className="w-14 h-14 text-[#097DC6] mx-auto animate-bounce" />
            <h4 className="text-xl font-bold text-[#0F172A]">Meeting Scheduled!</h4>
            <p className="text-sm text-slate-700">
              Your appointment for <span className="text-[#097DC6] font-bold">{date} at {time}</span> with <span className="text-[#0F172A] font-bold">{officer}</span> has been booked. Confirmation details have been sent to your email.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div>
              <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1">
                Meeting Purpose *
              </label>
              <select
                value={meetingType}
                onChange={(e) => setMeetingType(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F6F7F9] text-slate-900 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-[#097DC6]"
              >
                <option>Club Affiliation & Membership</option>
                <option>Junior Tennis Initiative (JTI) School Partnership</option>
                <option>Sponsorship & Corporate Tournament Branding</option>
                <option>Coaching & Umpire Certification</option>
                <option>National Team Player Endorsement</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1">
                Select TTA Representative *
              </label>
              <select
                value={officer}
                onChange={(e) => setOfficer(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F6F7F9] text-slate-900 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-[#097DC6]"
              >
                <option>President - Hon. Hassan M. Shabani</option>
                <option>Vice President - Dr. Grace K. Kilonzo</option>
                <option>Secretary General - Emmanuel Tarimo</option>
                <option>Treasurer - Amina S. Bakari</option>
                <option>Head of Technical & JTI Development</option>
              </select>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1">
                  Preferred Date *
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F6F7F9] text-slate-900 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-[#097DC6]"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1">
                  Time Slot *
                </label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F6F7F9] text-slate-900 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-[#097DC6]"
                >
                  <option>09:00 AM - 10:00 AM</option>
                  <option>10:00 AM - 11:00 AM</option>
                  <option>11:30 AM - 12:30 PM</option>
                  <option>02:00 PM - 03:00 PM</option>
                  <option>03:00 PM - 04:00 PM</option>
                </select>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Captain David Swai"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F6F7F9] text-slate-900 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-[#097DC6]"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="david@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F6F7F9] text-slate-900 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-[#097DC6]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 text-xs font-black uppercase tracking-wider text-[#0F172A] bg-[#c7ed56] hover:bg-[#b5e03b] rounded-xl shadow transition"
            >
              Confirm Appointment Booking
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
