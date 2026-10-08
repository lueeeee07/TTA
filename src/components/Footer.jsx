import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, Mail, Phone, MapPin, Globe, Share2 } from 'lucide-react';

export default function Footer({ onOpenJoinModal }) {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const footerSections = [
    {
      title: 'About TTA',
      links: [
        { label: 'Who We Are', path: '/about' },
        { label: 'Leadership', path: '/about#leadership' },
        { label: 'History & Governance', path: '/about#governance' },
        { label: 'Strategic Direction', path: '/about#objectives' },
      ],
    },
    {
      title: 'Tennis',
      links: [
        { label: 'National Teams', path: '/national-teams' },
        { label: 'Davis Cup', path: '/national-teams#davis' },
        { label: 'Billie Jean King Cup', path: '/national-teams#bjk' },
        { label: 'Tournaments', path: '/programs#tournaments' },
      ],
    },
    {
      title: 'Development',
      links: [
        { label: 'Junior Tennis (JTI)', path: '/programs/jti' },
        { label: 'Grassroots', path: '/programs/grassroots' },
        { label: 'Women & Girls', path: '/programs/women' },
        { label: 'Schools Tennis', path: '/programs/schools' },
        { label: 'Para Tennis', path: '/programs/wheelchair' },
      ],
    },
    {
      title: 'News & Clubs',
      links: [
        { label: 'Latest News', path: '/news' },
        { label: 'Media Gallery', path: '/gallery' },
        { label: 'Find a Club', path: '/clubs' },
        { label: 'Club Directory', path: '/clubs#directory' },
        { label: 'Contact Us', path: '/contact' },
      ],
    },
  ];

  return (
    <footer className="bg-[#0F172A] text-white relative" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>

      {/* ── Newsletter / Match Point CTA strip ── */}
      <div
        className="border-b"
        style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div className="text-[9px] font-black uppercase tracking-widest text-[#c7ed56] mb-1.5">Match Point</div>
            <p className="text-sm font-semibold text-slate-300">
              Stay updated on Tanzanian tennis — results, tournaments, and player news.
            </p>
          </div>
          <button
            onClick={onOpenJoinModal}
            className="px-6 py-3 text-xs font-black uppercase tracking-wider btn-lime rounded-xl flex items-center gap-2 shrink-0 cursor-pointer"
          >
            Join the Community
          </button>
        </div>
      </div>

      {/* ── Main footer grid ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >

          {/* Brand column — 4 cols */}
          <div className="lg:col-span-4 space-y-5">
            <Link to="/" className="inline-block">
              <img src={`${import.meta.env.BASE_URL}images/tta_logo.png`} alt="Tanzania Tennis Association" className="h-10 w-auto object-contain" />
            </Link>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal max-w-sm">
              The national governing body for tennis in Tanzania — recognized by World Tennis (WT), Confederation of African Tennis (CAT), and the International Tennis Federation (ITF).
            </p>

            {/* Affiliations */}
            <div className="flex flex-wrap gap-2 pt-1">
              {['WT', 'CAT', 'ITF'].map((badge) => (
                <span
                  key={badge}
                  className="px-2.5 py-1 text-[9px] font-black uppercase tracking-wider rounded-md"
                  style={{ background: 'rgba(9,125,198,0.15)', border: '1px solid rgba(9,125,198,0.25)', color: '#097DC6' }}
                >
                  {badge}
                </span>
              ))}
            </div>

            {/* Social links */}
            <div className="flex items-center gap-2.5 pt-2">
              {[
                { Icon: Globe, label: 'Facebook', href: '#' },
                { Icon: Share2, label: 'Instagram', href: '#' },
                { Icon: Globe, label: 'Twitter / X', href: '#' },
                { Icon: Share2, label: 'YouTube', href: '#' },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(9,125,198,0.3)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                >
                  <Icon className="w-3.5 h-3.5 text-slate-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns — 6 cols total (1.5 cols each) */}
          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {footerSections.map((section) => (
              <div key={section.title} className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-wider text-[#c7ed56] font-heading">
                  {section.title}
                </h4>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.path}
                        className="text-xs text-slate-400 hover:text-white transition font-medium leading-relaxed block"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact column — 2 cols */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#c7ed56] font-heading">Contact</h4>
            <div className="space-y-3">
              {[
                { Icon: MapPin, text: 'TTA Headquarters, Dar es Salaam, Tanzania' },
                { Icon: Phone, text: '+255 700 123 456' },
                { Icon: Mail, text: 'info@tanzaniatennis.or.tz' },
              ].map(({ Icon, text }) => (
                <div key={text} className="flex items-start gap-2.5">
                  <Icon className="w-3.5 h-3.5 text-[#097DC6] shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-400 font-medium leading-relaxed">{text}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <div>
            © {new Date().getFullYear()} Tanzania Tennis Association (TTA). All rights reserved.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-slate-400 hover:text-[#c7ed56] transition group cursor-pointer"
          >
            <span>Back to top</span>
            <span
              className="w-7 h-7 rounded-lg flex items-center justify-center transition"
              style={{ background: 'rgba(255,255,255,0.06)' }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(199,237,86,0.15)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
