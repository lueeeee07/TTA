import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Calendar, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage({ onOpenBookModal }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    topic: 'General Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', topic: 'General Inquiry', message: '' });
    }, 4000);
  };

  return (
    <div className="min-h-screen pt-20 pb-0 bg-white page-fade-in flex flex-col">
      
      {/* 1. EDITORIAL HEADER */}
      <section className="py-24 lg:py-36 bg-[#0F172A] text-white relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute right-0 top-1/4 w-[400px] h-[400px] bg-[#097DC6]/25 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-6 text-center">
          <span className="eyebrow-label-light">Reach Out</span>
          <h1 className="text-5xl sm:text-7xl font-black font-heading leading-[1.02] max-w-4xl mx-auto">
            Contact the Secretariat.
          </h1>
          <p className="text-slate-355 max-w-2xl mx-auto text-lg sm:text-xl font-medium leading-relaxed">
            Reach out regarding member club affiliations, tournament registrations, coaching certifications, and sponsorships.
          </p>
        </div>
      </section>

      {/* 2. SPLIT CONTACT & CONVERSION FORM */}
      <section className="py-24 lg:py-36 bg-white border-b border-editorial">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            
            {/* Left Column: Office Contacts & Hours (5 Columns) */}
            <div className="lg:col-span-5 space-y-8">
              
              {/* Core contacts list with thin dividers */}
              <div className="space-y-6 border-b border-editorial pb-8">
                <span className="eyebrow-label">TTA Office Info</span>
                
                <div className="space-y-5 text-slate-800">
                  <div className="flex gap-4">
                    <MapPin className="w-5 h-5 text-[#097DC6] shrink-0 mt-1" />
                    <div>
                      <h4 className="text-sm font-black uppercase tracking-wider text-slate-400">Headquarters</h4>
                      <p className="text-base font-semibold text-slate-700 mt-1">TTA Secretariat, Dar es Salaam, Tanzania</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Phone className="w-5 h-5 text-[#097DC6] shrink-0 mt-1" />
                    <div>
                      <h4 className="text-sm font-black uppercase tracking-wider text-slate-400">Telephone</h4>
                      <a href="tel:+255700123456" className="text-base font-bold text-[#097DC6] hover:underline mt-1 inline-block">
                        +255 700 123 456
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Mail className="w-5 h-5 text-[#097DC6] shrink-0 mt-1" />
                    <div>
                      <h4 className="text-sm font-black uppercase tracking-wider text-slate-400">Email Address</h4>
                      <a href="mailto:info@tta.or.tz" className="text-base font-bold text-[#097DC6] hover:underline mt-1 inline-block">
                        info@tta.or.tz
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Working hours table style */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#097DC6]" />
                  <span className="text-xs font-black uppercase tracking-wider text-slate-700">Office Working Hours</span>
                </div>

                <div className="space-y-3 text-sm text-slate-600 border border-editorial p-6 rounded-2xl bg-[#F6F7F9]">
                  <div className="flex justify-between py-1 border-b border-editorial font-semibold">
                    <span className="text-slate-500">Monday – Friday</span>
                    <span className="font-bold text-[#0F172A]">8:00 AM – 4:00 PM</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-editorial font-semibold">
                    <span className="text-slate-500">Saturday</span>
                    <span className="font-bold text-[#0F172A]">9:00 AM – 1:00 PM</span>
                  </div>
                  <div className="flex justify-between py-1 font-semibold">
                    <span className="text-slate-500">Sundays & Holidays</span>
                    <span className="font-bold text-rose-500">Closed</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={onOpenBookModal}
                    className="w-full py-4 text-xs font-black uppercase tracking-wider text-[#0F172A] bg-white hover:bg-[#c7ed56] rounded-xl transition border border-slate-200 hover:border-transparent flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Schedule Executive Consult</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Right Column: Sleek Conversion Form (7 Columns) */}
            <div className="lg:col-span-7 bg-[#F6F7F9] p-8 sm:p-10 rounded-3xl border border-editorial shadow-sm">
              <div className="space-y-2 mb-8">
                <span className="eyebrow-label">Submit Inquiry</span>
                <h3 className="text-2xl sm:text-3xl font-black text-[#0F172A] font-heading">
                  Secretariat Contact Form
                </h3>
              </div>

              {submitted ? (
                <div className="p-8 text-center space-y-4 rounded-2xl bg-[#c7ed56]/20 border border-[#c7ed56]/30 animate-bounce">
                  <CheckCircle2 className="w-12 h-12 text-[#097DC6] mx-auto" />
                  <h4 className="text-xl font-bold text-[#0F172A]">Thank You! Message Sent</h4>
                  <p className="text-xs sm:text-sm text-slate-655 font-semibold">
                    Your message was delivered successfully. The secretariat will respond inside 24 business hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Baraka Juma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 bg-white text-slate-900 border border-slate-250 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#097DC6] transition"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. baraka@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-white text-slate-900 border border-slate-250 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#097DC6] transition"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="+255..."
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-white text-slate-900 border border-slate-250 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#097DC6] transition"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">
                        Inquiry Topic
                      </label>
                      <select
                        value={formData.topic}
                        onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                        className="w-full px-4 py-3 bg-white text-slate-900 border border-slate-250 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#097DC6] transition"
                      >
                        <option>General Inquiry</option>
                        <option>Club Affiliation</option>
                        <option>Junior Tennis Initiative (JTI)</option>
                        <option>Coaching Certification</option>
                        <option>Tournament Entry</option>
                        <option>Sponsorship & Partnership</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">
                      Message Details *
                    </label>
                    <textarea
                      rows={5}
                      required
                      placeholder="Write your detailed inquiry here..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 bg-white text-slate-900 border border-slate-250 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#097DC6] transition"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 text-xs font-black uppercase tracking-wider btn-lime rounded-xl flex items-center justify-center gap-2 shadow cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message to Secretariat</span>
                  </button>

                </form>
              )}
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
