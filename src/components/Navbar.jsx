import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ChevronRight, ArrowRight } from 'lucide-react';

// ─── Nav data ─────────────────────────────────────────────────────────────────
const NAV = [
  {
    name: 'About TTA',
    path: '/about',
    mega: {
      cols: [
        {
          heading: 'Organization',
          links: [
            { label: 'Who We Are', path: '/about' },
            { label: 'Leadership', path: '/about#leadership' },
            { label: 'History & Governance', path: '/about#governance' },
            { label: 'Strategic Direction', path: '/about#objectives' },
          ],
        },
        {
          heading: 'Affiliations',
          links: [
            { label: 'World Tennis (WT)', path: '/about#affiliations' },
            { label: 'Confederation of African Tennis', path: '/about#affiliations' },
            { label: 'International Tennis Federation', path: '/about#affiliations' },
          ],
        },
      ],
      featured: {
        label: 'Our Mission',
        text: 'Growing the game of tennis across Tanzania — from school courts to the world stage.',
        path: '/about',
      },
    },
  },
  {
    name: 'Tennis',
    path: '/national-teams',
    mega: {
      cols: [
        {
          heading: 'Competition',
          links: [
            { label: 'National Teams', path: '/national-teams' },
            { label: 'Rankings & Players', path: '/national-teams#rankings' },
            { label: 'Tournaments', path: '/programs#tournaments' },
            { label: 'Results & Calendar', path: '/programs#calendar' },
          ],
        },
        {
          heading: 'Teams',
          links: [
            { label: 'Davis Cup Men', path: '/national-teams#davis' },
            { label: 'Billie Jean Cup Women', path: '/national-teams#bjk' },
            { label: 'Junior Squads', path: '/national-teams#juniors' },
          ],
        },
      ],
      featured: {
        label: 'National Pride',
        text: 'Representing Tanzania on the global stage at Davis Cup, BJK Cup and Africa Junior Championships.',
        path: '/national-teams',
      },
    },
  },
  {
    name: 'Development',
    path: '/programs',
    mega: {
      cols: [
        {
          heading: 'Programs',
          links: [
            { label: 'Junior Tennis (JTI)', path: '/programs/jti' },
            { label: 'Grassroots Tennis', path: '/programs/grassroots' },
            { label: 'Women & Girls', path: '/programs/women' },
            { label: 'Schools Tennis', path: '/programs/schools' },
          ],
        },
        {
          heading: 'Pathways',
          links: [
            { label: 'Coaching & Officials', path: '/programs/coaching' },
            { label: 'Para Tennis', path: '/programs/wheelchair' },
            { label: 'High Performance', path: '/programs/high-performance' },
          ],
        },
      ],
      featured: {
        label: 'Grassroots to Pro',
        text: 'Building the full player pathway from primary schools to international competition.',
        path: '/programs',
      },
    },
  },
  {
    name: 'Clubs',
    path: '/clubs',
    mega: {
      cols: [
        {
          heading: 'Find & Join',
          links: [
            { label: 'Find a Club', path: '/clubs' },
            { label: 'Club Directory', path: '/clubs#directory' },
            { label: 'Club Development', path: '/clubs#development' },
          ],
        },
        {
          heading: 'Regions',
          links: [
            { label: 'Dar es Salaam', path: '/clubs#dar' },
            { label: 'Arusha & Kilimanjaro', path: '/clubs#arusha' },
            { label: 'Zanzibar', path: '/clubs#zanzibar' },
            { label: 'Mwanza & Coast', path: '/clubs#mwanza' },
          ],
        },
      ],
      featured: {
        label: '30+ Clubs',
        text: 'Find your nearest TTA-affiliated club and start your tennis journey today.',
        path: '/clubs',
      },
    },
  },
  {
    name: 'News & Media',
    path: '/news',
    mega: {
      cols: [
        {
          heading: 'Content',
          links: [
            { label: 'Latest News', path: '/news' },
            { label: 'Tournament Reports', path: '/news' },
            { label: 'Player Stories', path: '/news' },
            { label: 'Photo Gallery', path: '/gallery' },
          ],
        },
        {
          heading: 'Resources',
          links: [
            { label: 'Press Releases', path: '/news' },
            { label: 'Media Kit', path: '/contact' },
            { label: 'Contact Press Office', path: '/contact' },
          ],
        },
      ],
      featured: {
        label: 'Match Point',
        text: 'The latest news, results, and stories from Tanzanian tennis.',
        path: '/news',
      },
    },
  },
  {
    name: 'Get Involved',
    path: '/contact',
    mega: {
      cols: [
        {
          heading: 'Participate',
          links: [
            { label: 'Play Tennis', path: '/clubs' },
            { label: 'Become a Member', path: '/clubs' },
            { label: 'Volunteer', path: '/contact' },
          ],
        },
        {
          heading: 'Partner',
          links: [
            { label: 'Partner with TTA', path: '/contact' },
            { label: 'Sponsor a Program', path: '/contact' },
            { label: 'Contact Us', path: '/contact' },
          ],
        },
      ],
      featured: {
        label: 'Join the Movement',
        text: 'Whether you play, coach, volunteer or sponsor — there is a place for you in Tanzanian tennis.',
        path: '/contact',
      },
    },
  },
];

// ─── Component ─────────────────────────────────────────────────────────────────
export default function Navbar({ onOpenJoinModal, onOpenBookModal }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const menuTimerRef = useRef(null);
  const location = useLocation();

  // Scroll listener — make nav solid after hero
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setMobileExpanded(null);
  }, [location.pathname]);

  const handleMenuEnter = (name) => {
    clearTimeout(menuTimerRef.current);
    setActiveMenu(name);
  };

  const handleMenuLeave = () => {
    menuTimerRef.current = setTimeout(() => setActiveMenu(null), 120);
  };

  const isActivePath = (path) =>
    location.pathname === path || (path !== '/' && location.pathname.startsWith(path));

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-400"
      style={{
        background: scrolled
          ? 'rgba(15,23,42,0.97)'
          : 'rgba(15,23,42,0.0)',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
        boxShadow: scrolled ? '0 4px 32px rgba(0,0,0,0.3)' : 'none',
      }}
    >
      <nav className="px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center shrink-0 group"
            onClick={() => setMobileOpen(false)}
          >
            <img
              src={`${import.meta.env.BASE_URL}images/tta_logo.png`}
              alt="Tanzania Tennis Association"
              className="h-9 sm:h-10 w-auto object-contain group-hover:opacity-90 transition duration-300"
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => handleMenuEnter(item.name)}
                onMouseLeave={handleMenuLeave}
              >
                <button
                  className={`flex items-center gap-1 px-3 py-2 text-sm font-bold rounded-lg transition-all duration-200 ${
                    isActivePath(item.path)
                      ? 'text-[#c7ed56]'
                      : 'text-slate-200 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.name}
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      activeMenu === item.name ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Mega menu dropdown */}
                {item.mega && (
                  <div
                    className="absolute top-full left-1/2 mt-2 pt-2"
                    style={{
                      transform: 'translateX(-50%)',
                      opacity: activeMenu === item.name ? 1 : 0,
                      visibility: activeMenu === item.name ? 'visible' : 'hidden',
                      transition: 'opacity 0.18s ease, visibility 0.18s ease',
                      pointerEvents: activeMenu === item.name ? 'all' : 'none',
                    }}
                  >
                    <div
                      style={{
                        background: '#0F172A',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: 16,
                        boxShadow: '0 32px 80px -12px rgba(0,0,0,0.7)',
                        minWidth: 520,
                        padding: 24,
                        display: 'grid',
                        gridTemplateColumns: `repeat(${item.mega.cols.length}, 1fr) 1.2fr`,
                        gap: 20,
                        transform: activeMenu === item.name ? 'translateY(0)' : 'translateY(-6px)',
                        transition: 'transform 0.18s ease',
                      }}
                    >
                      {/* Link columns */}
                      {item.mega.cols.map((col) => (
                        <div key={col.heading}>
                          <div
                            style={{
                              fontSize: '0.6rem',
                              fontWeight: 800,
                              textTransform: 'uppercase',
                              letterSpacing: '0.15em',
                              color: 'rgba(255,255,255,0.3)',
                              marginBottom: 12,
                            }}
                          >
                            {col.heading}
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                            {col.links.map((link) => (
                              <Link
                                key={link.label}
                                to={link.path}
                                style={{
                                  display: 'block',
                                  padding: '6px 10px',
                                  borderRadius: 8,
                                  fontSize: '0.8rem',
                                  fontWeight: 600,
                                  color: 'rgba(255,255,255,0.75)',
                                  transition: 'all 0.15s ease',
                                  textDecoration: 'none',
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                                  e.currentTarget.style.color = '#fff';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = 'transparent';
                                  e.currentTarget.style.color = 'rgba(255,255,255,0.75)';
                                }}
                              >
                                {link.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}

                      {/* Featured panel */}
                      <div
                        style={{
                          background: 'rgba(9,125,198,0.12)',
                          border: '1px solid rgba(9,125,198,0.2)',
                          borderRadius: 12,
                          padding: '16px 18px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          gap: 12,
                        }}
                      >
                        <div>
                          <div
                            style={{
                              fontSize: '0.6rem',
                              fontWeight: 800,
                              textTransform: 'uppercase',
                              letterSpacing: '0.15em',
                              color: '#c7ed56',
                              marginBottom: 6,
                            }}
                          >
                            {item.mega.featured.label}
                          </div>
                          <p
                            style={{
                              fontSize: '0.78rem',
                              color: 'rgba(255,255,255,0.65)',
                              lineHeight: 1.5,
                              fontWeight: 500,
                            }}
                          >
                            {item.mega.featured.text}
                          </p>
                        </div>
                        <Link
                          to={item.mega.featured.path}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 6,
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            color: '#c7ed56',
                            textDecoration: 'none',
                          }}
                        >
                          Explore <ArrowRight size={12} />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-2.5 shrink-0">
            <button
              onClick={onOpenJoinModal}
              className="px-5 py-2.5 text-xs font-black uppercase tracking-wider btn-lime rounded-xl flex items-center gap-1.5 cursor-pointer"
            >
              Join a Club
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={onOpenJoinModal}
              className="px-3.5 py-1.5 text-xs font-black uppercase tracking-wider btn-lime rounded-lg cursor-pointer"
            >
              Join
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg text-white hover:bg-white/10 transition cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5 text-[#c7ed56]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className="lg:hidden overflow-hidden transition-all duration-300"
        style={{
          maxHeight: mobileOpen ? '90vh' : 0,
          opacity: mobileOpen ? 1 : 0,
        }}
      >
        <div
          className="overflow-y-auto"
          style={{
            background: 'rgba(10,16,30,0.98)',
            backdropFilter: 'blur(20px)',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            maxHeight: '85vh',
          }}
        >
          <div className="px-4 py-6 space-y-1">
            {/* Home link */}
            <Link
              to="/"
              className="block px-4 py-3 rounded-xl text-sm font-bold text-slate-200 hover:bg-white/5 hover:text-white transition"
              onClick={() => setMobileOpen(false)}
            >
              Home
            </Link>

            {NAV.map((item) => (
              <div key={item.name}>
                <button
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition ${
                    mobileExpanded === item.name
                      ? 'bg-white/8 text-white'
                      : 'text-slate-200 hover:bg-white/5 hover:text-white'
                  }`}
                  onClick={() =>
                    setMobileExpanded(mobileExpanded === item.name ? null : item.name)
                  }
                >
                  {item.name}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      mobileExpanded === item.name ? 'rotate-180 text-[#c7ed56]' : ''
                    }`}
                  />
                </button>

                {mobileExpanded === item.name && item.mega && (
                  <div className="mt-1 ml-4 pl-4 border-l border-white/10 space-y-1 pb-2">
                    {item.mega.cols.flatMap((col) => col.links).map((link) => (
                      <Link
                        key={link.label}
                        to={link.path}
                        className="block px-3 py-2 rounded-lg text-sm text-slate-300 hover:text-[#c7ed56] transition font-medium"
                        onClick={() => setMobileOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="px-4 pb-8 pt-4 border-t border-white/06 space-y-3">
            <button
              onClick={() => { setMobileOpen(false); onOpenJoinModal(); }}
              className="w-full py-3.5 text-sm font-black uppercase tracking-wider btn-lime rounded-xl cursor-pointer"
            >
              Join a Member Club
            </button>
            <button
              onClick={() => { setMobileOpen(false); onOpenBookModal(); }}
              className="w-full py-3 text-xs font-bold uppercase tracking-wider text-slate-200 hover:text-white bg-white/5 rounded-xl border border-white/10 cursor-pointer transition"
            >
              Book a Meeting
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
