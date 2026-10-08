import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchApi } from './config';

// Import fallback data so site works even if API is down
import {
  statsData as fbStats,
  valuesData as fbValues,
  objectivesData as fbObjectives,
  leadershipData as fbLeadership,
  partnersData as fbPartners,
  regionsData as fbRegions,
  clubsData as fbClubs,
  programsData as fbPrograms,
  tournamentsData as fbTournaments,
  nationalTeamsData as fbTeams,
  newsData as fbNews,
  galleryData as fbGallery,
} from '../data/ttaData';

const DataContext = createContext(null);

// Helper to format image URLs with Vite base path if needed
export function formatImageUrl(pathStr) {
  if (!pathStr) return pathStr;
  if (typeof pathStr !== 'string') return pathStr;
  if (
    pathStr.startsWith('http://') ||
    pathStr.startsWith('https://') ||
    pathStr.startsWith('data:') ||
    pathStr.startsWith('blob:')
  ) {
    return pathStr;
  }
  const baseUrl = import.meta.env.BASE_URL || '/';
  let cleanBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  let cleanPath = pathStr.startsWith('/') ? pathStr : '/' + pathStr;

  if (cleanBase && cleanPath.startsWith(cleanBase)) {
    return cleanPath;
  }

  return `${cleanBase}${cleanPath}`;
}

// Helper to normalize any serialized data (array, JSON string, or object with numeric keys) to array
function normalizeArray(val) {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  if (typeof val === 'string') {
    try {
      const parsed = JSON.parse(val);
      return normalizeArray(parsed);
    } catch {
      return val.includes('\n') ? val.split('\n').map(s => s.trim()).filter(Boolean) : [val];
    }
  }
  if (typeof val === 'object' && val !== null) {
    return Object.values(val);
  }
  return [val];
}

// Map API response keys to match what components expect
function mapStats(data) {
  return data.map(s => ({
    id: s.stat_key,
    number: Number(s.number_value),
    suffix: s.suffix || '',
    label: s.label,
    description: s.description,
  }));
}

function mapValues(data) {
  return data.map(v => ({
    id: v.slug,
    name: v.name,
    icon: v.icon,
    desc: v.description,
  }));
}

function mapObjectives(data) {
  return data.map(o => ({
    num: o.num,
    title: o.title,
    desc: o.description,
  }));
}

function mapClubs(data) {
  return data.map(c => ({
    id: c.slug,
    name: c.name,
    region: c.region,
    courts: c.courts,
    address: c.address,
    contact: c.contact,
    features: normalizeArray(c.features),
    image: formatImageUrl(c.image),
  }));
}

function mapRegions(data) {
  return data.map(r => ({
    name: r.name,
    clubsCount: r.clubs_count,
  }));
}

function mapPrograms(data) {
  return data.map(p => ({
    id: p.slug,
    title: p.title,
    tag: p.tag,
    subtitle: p.subtitle,
    shortDesc: p.short_desc,
    image: formatImageUrl(p.image),
    fullContent: normalizeArray(p.full_content),
  }));
}

function mapTournaments(data) {
  return data.map(t => ({
    id: t.slug,
    type: t.type,
    name: t.name,
    date: t.date_text,
    location: t.location,
    status: t.status,
    statusBadge: (t.status_badge || 'upcoming').toLowerCase(),
    desc: t.description,
    badge: t.badge,
  }));
}

function mapTeams(data) {
  return data.map(t => ({
    id: t.slug,
    teamName: t.team_name,
    ageGroup: t.age_group,
    subTitle: t.subtitle,
    desc: t.description,
    image: formatImageUrl(t.image),
    achievements: normalizeArray(t.achievements),
  }));
}

function mapNews(data) {
  return data.map(n => ({
    id: n.slug,
    date: n.date_text,
    title: n.title,
    snippet: n.snippet,
    category: n.category,
    isFeatured: Boolean(Number(n.is_featured)),
    image: formatImageUrl(n.image),
    content: n.content,
  }));
}

function mapGallery(data) {
  return data.map(g => ({
    id: Number(g.id),
    title: g.title,
    category: g.category,
    type: g.type,
    image: formatImageUrl(g.image),
  }));
}

function mapLeadership(data) {
  return data.map(l => ({
    role: l.role,
    organization: l.organization,
    name: l.name,
    bio: l.bio,
    avatar: l.avatar ? formatImageUrl(l.avatar) : null,
  }));
}

function mapPartners(data) {
  return data.map(p => ({
    code: p.code,
    name: p.name,
    role: p.role,
    desc: p.description,
    badge: p.badge,
    logo: p.logo,
  }));
}

function asList(data) {
  return Array.isArray(data) ? data : null;
}

export function DataProvider({ children }) {
  const [data, setData] = useState({
    statsData: fbStats,
    valuesData: fbValues,
    objectivesData: fbObjectives,
    leadershipData: fbLeadership.map(l => ({ ...l, avatar: l.avatar ? formatImageUrl(l.avatar) : null })),
    partnersData: fbPartners,
    regionsData: fbRegions,
    clubsData: fbClubs.map(c => ({ ...c, image: formatImageUrl(c.image) })),
    programsData: fbPrograms.map(p => ({ ...p, image: formatImageUrl(p.image) })),
    tournamentsData: fbTournaments,
    nationalTeamsData: fbTeams.map(t => ({ ...t, image: formatImageUrl(t.image) })),
    newsData: fbNews.map(n => ({ ...n, image: formatImageUrl(n.image) })),
    galleryData: fbGallery.map(g => ({ ...g, image: formatImageUrl(g.image) })),
    loaded: false,
    reload: () => {},
  });

  useEffect(() => {
    let cancelled = false;

    async function loadAll() {
      const [stats, values, objectives, leadership, partners, regions, clubs, programs, tournaments, teams, news, gallery] =
        await Promise.all([
          fetchApi('stats.php'),
          fetchApi('values.php'),
          fetchApi('objectives.php'),
          fetchApi('leadership.php'),
          fetchApi('partners.php'),
          fetchApi('regions.php'),
          fetchApi('clubs.php'),
          fetchApi('programs.php'),
          fetchApi('tournaments.php'),
          fetchApi('national_teams.php'),
          fetchApi('news.php'),
          fetchApi('gallery.php'),
        ]);

      if (cancelled) return;

      setData(prev => ({
        ...prev,
        statsData: asList(stats) ? mapStats(stats) : fbStats,
        valuesData: asList(values) ? mapValues(values) : fbValues,
        objectivesData: asList(objectives) ? mapObjectives(objectives) : fbObjectives,
        leadershipData: asList(leadership) ? mapLeadership(leadership) : fbLeadership.map(l => ({ ...l, avatar: l.avatar ? formatImageUrl(l.avatar) : null })),
        partnersData: asList(partners) ? mapPartners(partners) : fbPartners,
        regionsData: asList(regions) ? mapRegions(regions) : fbRegions,
        clubsData: asList(clubs) ? mapClubs(clubs) : fbClubs.map(c => ({ ...c, image: formatImageUrl(c.image) })),
        programsData: asList(programs) ? mapPrograms(programs) : fbPrograms.map(p => ({ ...p, image: formatImageUrl(p.image) })),
        tournamentsData: asList(tournaments) ? mapTournaments(tournaments) : fbTournaments,
        nationalTeamsData: asList(teams) ? mapTeams(teams) : fbTeams.map(t => ({ ...t, image: formatImageUrl(t.image) })),
        newsData: asList(news) ? mapNews(news) : fbNews.map(n => ({ ...n, image: formatImageUrl(n.image) })),
        galleryData: asList(gallery) ? mapGallery(gallery) : fbGallery.map(g => ({ ...g, image: formatImageUrl(g.image) })),
        loaded: true,
        reload: loadAll,
      }));
    }

    loadAll();

    // Auto refresh on focus and visibility change
    const onFocus = () => loadAll();
    const onVisible = () => {
      if (document.visibilityState === 'visible') loadAll();
    };
    window.addEventListener('focus', onFocus);
    document.addEventListener('visibilitychange', onVisible);

    // Refresh every 10 seconds in case admin changes in another tab
    const interval = setInterval(loadAll, 10000);

    return () => {
      cancelled = true;
      clearInterval(interval);
      window.removeEventListener('focus', onFocus);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, []);

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
}

export function useTtaData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useTtaData must be used within DataProvider');
  return ctx;
}
