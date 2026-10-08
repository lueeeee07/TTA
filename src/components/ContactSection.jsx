import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Calendar, Send, CheckCircle2 } from 'lucide-react';

export default function ContactSection({ onOpenBookModal }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    topic: 'General Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('http://localhost/TTA/api/endpoints/contact.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
    } catch (err) {
      console.error('Failed to send message:', err);
    }
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', topic: 'General Inquiry', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="relative py-20 lg:py-28 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#097DC6] bg-[#097DC6]/10 px-3.5 py-1 rounded-full border border-[#097DC6]/20">
            Contact Us
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F172A] font-heading">
            Get in Touch with TTA
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium">
            Reach out to the Tanzania Tennis Association for memberships, club affiliation, tournaments, coaching courses and partnerships.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Contact Cards & Office Hours */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Cards */}
            <div className="card-elevated p-7 rounded-3xl bg-[#F6F7F9] border border-slate-200 space-y-6">
              
              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="p-3.5 rounded-2xl bg-[#097DC6] text-white shrink-0 shadow-md">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-[#0F172A] font-heading">TTA Headquarters</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-0.5 font-medium">TTA Offices, Dar es Salaam, Tanzania</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="p-3.5 rounded-2xl bg-[#c7ed56] text-[#0F172A] shrink-0 shadow-md">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-[#0F172A] font-heading">Telephone</h3>
                  <a href="tel:+255700123456" className="text-xs sm:text-sm text-[#097DC6] hover:underline font-black mt-0.5 inline-block">
                    +255 700 123 456
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="p-3.5 rounded-2xl bg-[#097DC6] text-white shrink-0 shadow-md">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-[#0F172A] font-heading">Email Address</h3>
                  <a href="mailto:info@tta.or.tz" className="text-xs sm:text-sm text-[#097DC6] hover:underline font-black mt-0.5 inline-block">
                    info@tta.or.tz
                  </a>
                </div>
              </div>

            </div>

            {/* Working Hours Card */}
            <div className="card-elevated p-7 rounded-3xl bg-[#F6F7F9] border border-slate-200 space-y-4">
              <div className="flex items-center gap-2.5">
                <Clock className="w-5 h-5 text-[#097DC6]" />
                <h3 className="text-lg font-bold text-[#0F172A] font-heading">Working Hours</h3>
              </div>

              <div className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                <div className="flex justify-between py-1 border-b border-slate-200/80 font-medium">
                  <span className="text-slate-500">Monday – Friday</span>
                  <span className="font-bold text-[#097DC6]">8:00 AM – 4:00 PM</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/80 font-medium">
                  <span className="text-slate-500">Saturday</span>
                  <span className="font-bold text-[#9BBB3E]">9:00 AM – 1:00 PM</span>
                </div>
                <div className="flex justify-between py-1 font-medium">
                  <span className="text-slate-500">Sunday & Holidays</span>
                  <span className="font-bold text-rose-500">Closed</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenBookModal}
                  className="w-full py-3 text-xs font-black uppercase tracking-wider btn-lime rounded-xl flex items-center justify-center gap-2 shadow"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book a Meeting</span>
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Send Message Form */}
          <div className="lg:col-span-7">
            <div className="card-elevated p-7 sm:p-10 rounded-3xl bg-[#F6F7F9] border border-slate-200 shadow-md">
              <h3 className="text-2xl sm:text-3xl font-black text-[#0F172A] mb-6 font-heading">
                Send a Message
              </h3>

              {submitted ? (
                <div className="p-8 text-center space-y-4 rounded-3xl bg-[#c7ed56]/20 border border-[#c7ed56]">
                  <CheckCircle2 className="w-14 h-14 text-[#097DC6] mx-auto animate-bounce" />
                  <h4 className="text-2xl font-black text-[#0F172A]">Asante Sana! Message Sent</h4>
                  <p className="text-sm text-slate-700 font-medium">
                    Thank you for contacting the Tanzania Tennis Association. Our secretariat will respond within 24 business hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Baraka Juma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 bg-white text-slate-900 placeholder-slate-400 border border-slate-300 rounded-xl text-sm font-medium focus:outline-none focus:border-[#097DC6] focus:ring-2 focus:ring-[#097DC6]/20 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. baraka@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-white text-slate-900 placeholder-slate-400 border border-slate-300 rounded-xl text-sm font-medium focus:outline-none focus:border-[#097DC6] focus:ring-2 focus:ring-[#097DC6]/20 transition"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="+255..."
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-white text-slate-900 placeholder-slate-400 border border-slate-300 rounded-xl text-sm font-medium focus:outline-none focus:border-[#097DC6] focus:ring-2 focus:ring-[#097DC6]/20 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Inquiry Topic
                      </label>
                      <select
                        value={formData.topic}
                        onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                        className="w-full px-4 py-3 bg-white text-slate-900 border border-slate-300 rounded-xl text-sm font-medium focus:outline-none focus:border-[#097DC6] focus:ring-2 focus:ring-[#097DC6]/20 transition"
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

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Your Message *
                    </label>
                    <textarea
                      rows={5}
                      required
                      placeholder="How can TTA assist you today?"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 bg-white text-slate-900 placeholder-slate-400 border border-slate-300 rounded-xl text-sm font-medium focus:outline-none focus:border-[#097DC6] focus:ring-2 focus:ring-[#097DC6]/20 transition"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 text-xs font-black uppercase tracking-wider btn-lime rounded-2xl flex items-center justify-center gap-2 shadow"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message to TTA</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
