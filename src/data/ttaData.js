export const statsData = [
  { id: 'clubs', number: 30, suffix: '+', label: 'Affiliated Member Clubs', description: 'Governed member clubs across all 6 High-Performance regions.' },
  { id: 'regions', number: 6, suffix: '', label: 'HP Regions', description: 'Dar es Salaam, Arusha, Kilimanjaro, Morogoro, Pwani, Zanzibar.' },
  { id: 'programmes', number: 4, suffix: '', label: 'Core Programs', description: 'JTI, High Performance, Wheelchair, Coaching & Officiating.' },
  { id: 'teams', number: 3, suffix: '', label: 'National Squads', description: 'Juniors, Davis Cup Men, Billie Jean Cup Women.' },
  { id: 'players', number: 1200, suffix: '+', label: 'Registered Athletes', description: 'Youth, social, and professional players participating in TTA events.' },
];

export const valuesData = [
  { id: 'integrity', name: 'Integrity', icon: 'ShieldCheck', desc: 'Upholding honesty, fairness, and transparent governance across all national tournaments and club affiliations.' },
  { id: 'inclusivity', name: 'Inclusivity', icon: 'Users', desc: 'Welcoming athletes of all ages, genders, and adaptive backgrounds into tennis without barriers.' },
  { id: 'excellence', name: 'Excellence', icon: 'Award', desc: 'Striving for elite performance in player development, coaching accreditation, and officiating.' },
  { id: 'discipline', name: 'Discipline', icon: 'Target', desc: 'Instilling character, sportsmanship, and mental fortitude in youth players from primary school upwards.' },
  { id: 'teamwork', name: 'Teamwork', icon: 'Handshake', desc: 'Fostering unity across 30+ member clubs and representing Tanzania proudly on the global stage.' },
  { id: 'passion', name: 'Passion', icon: 'Flame', desc: 'Igniting lifelong enthusiasm for tennis as a sport, health discipline, and national pride.' }
];

export const objectivesData = [
  {
    num: '01',
    title: 'Primary School Talent Identification',
    desc: 'Introduce tennis to over 5,000 children aged 6–12 annually through the ITF-supported Junior Tennis Initiative (JTI).'
  },
  {
    num: '02',
    title: 'High Performance & International Pathways',
    desc: 'Develop top U12–U18 junior and senior athletes to compete at the Africa Junior Championships, ITF Circuits, Davis Cup & Billie Jean Cup.'
  },
  {
    num: '03',
    title: 'Coaching & Officiating Certification',
    desc: 'Conduct certified Level 1 & Level 2 ITF workshops to continually upgrade national coaching and umpiring standards.'
  },
  {
    num: '04',
    title: 'Infrastructure & Adaptive Accessibility',
    desc: 'Expand court infrastructure nationwide, support regional member clubs, and promote adaptive wheelchair tennis.'
  }
];

export const leadershipData = [
  {
    role: 'President',
    organization: 'Tanzania Tennis Association',
    name: 'Hon. Hassan M. Shabani',
    bio: 'Pioneering tennis development in Tanzania for over 15 years, expanding ties with WT, ITF, and CAT.',
    avatar: null
  },
  {
    role: 'Vice President',
    organization: 'Tanzania Tennis Association',
    name: 'Dr. Grace K. Kilonzo',
    bio: 'Championing junior high-performance pathways, women’s tennis initiatives, and regional tournament hosting.',
    avatar: null
  },
  {
    role: 'Secretary General',
    organization: 'Tanzania Tennis Association',
    name: 'Mr. Emmanuel J. Tarimo',
    bio: 'Directing association operations, affiliated club governance, and national team logistics for international events.',
    avatar: null
  },
  {
    role: 'Treasurer',
    organization: 'Tanzania Tennis Association',
    name: 'Ms. Amina S. Bakari',
    bio: 'Overseeing financial management, sports grants, and sponsorship allocations for player development.',
    avatar: null
  }
];

export const partnersData = [
  {
    code: 'ITF',
    name: 'International Tennis Federation',
    role: 'Global Governing Body',
    desc: 'Provides technical support, JTI equipment grants, and sanctioning for world junior and senior circuits.',
    badge: 'Global Affiliate',
    logo: 'ITF'
  },
  {
    code: 'CAT',
    name: 'Confederation of African Tennis',
    role: 'Continental Governing Body',
    desc: 'Organises Africa Junior Championships, regional circuits, and continental development workshops.',
    badge: 'Continental Federation',
    logo: 'CAT'
  },
  {
    code: 'WT',
    name: 'World Tennis',
    role: 'Recognised Global Body',
    desc: 'Endorses TTA as the sole national tennis federation representing Tanzania on the world stage.',
    badge: 'Official Recognition',
    logo: 'WT'
  }
];

export const regionsData = [
  { name: 'Dar es Salaam', clubsCount: '12 Clubs' },
  { name: 'Arusha', clubsCount: '6 Clubs' },
  { name: 'Kilimanjaro', clubsCount: '4 Clubs' },
  { name: 'Morogoro', clubsCount: '3 Clubs' },
  { name: 'Pwani', clubsCount: '3 Clubs' },
  { name: 'Zanzibar', clubsCount: '4 Clubs' },
  { name: 'Mwanza', clubsCount: '3 Clubs' }
];

export const clubsData = [
  {
    id: 'dar-gymkhana',
    name: 'Dar es Salaam Gymkhana Club',
    region: 'Dar es Salaam',
    courts: '8 Clay & Hard Courts',
    address: 'Ocean Road, Dar es Salaam',
    contact: '+255 22 211 4567',
    features: ['Floodlights', 'JTI Training Centre', 'Pro Shop', 'Wheelchair Access'],
    image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'kijitonyama-hub',
    name: 'Kijitonyama Tennis Hub',
    region: 'Dar es Salaam',
    courts: '4 Hard Courts',
    address: 'Kijitonyama, Dar es Salaam',
    contact: '+255 712 345 678',
    features: ['High Performance Squads', 'Junior Academy', 'Night Play'],
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'arusha-gymkhana',
    name: 'Arusha Gymkhana Club',
    region: 'Arusha',
    courts: '6 Clay Courts',
    address: 'Boma Road, Arusha',
    contact: '+255 27 254 8900',
    features: ['High Altitude Training', 'Club House', 'Coaching Clinics'],
    image: 'https://images.unsplash.com/photo-1622279457486-62dce4a4953f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'moshi-club',
    name: 'Moshi Sports Club',
    region: 'Kilimanjaro',
    courts: '4 Hard Courts',
    address: 'Kiboriloni, Moshi',
    contact: '+255 27 275 1234',
    features: ['Grassroots JTI', 'Scenic Views', 'Tournament Host'],
    image: (import.meta.env.BASE_URL + 'assets/images/editorial/blue_court_ball.jpg')
  },
  {
    id: 'morogoro-club',
    name: 'Morogoro Tennis Centre',
    region: 'Morogoro',
    courts: '3 Hard Courts',
    address: 'Old Dar Road, Morogoro',
    contact: '+255 23 260 4321',
    features: ['Primary School Outreach', 'Junior Tournaments'],
    image: (import.meta.env.BASE_URL + 'assets/images/editorial/racket_ball_blue_court.jpg')
  },
  {
    id: 'maisara-zanzibar',
    name: 'Maisara Tennis Club',
    region: 'Zanzibar',
    courts: '4 Hard Courts',
    address: 'Maisara Grounds, Stone Town, Zanzibar',
    contact: '+255 24 223 9876',
    features: ['Beach Proximity', 'Island Youth Academy', 'Visitor Guest Play'],
    image: 'https://images.unsplash.com/photo-1560079007-a53207b16174?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'mwanza-hub',
    name: 'Mwanza Lake Tennis Club',
    region: 'Mwanza',
    courts: '4 Hard Courts',
    address: 'Capri Point, Mwanza',
    contact: '+255 28 250 1122',
    features: ['Lake Views', 'Junior Squads', 'Weekend Clinics'],
    image: 'https://images.unsplash.com/photo-1576610612946-e6e25d241940?auto=format&fit=crop&w=800&q=80'
  }
];

export const programsData = [
  {
    id: 'jti',
    title: 'Junior Tennis Initiative (JTI)',
    tag: 'Youth U6–U18',
    subtitle: 'Junior tennis',
    shortDesc: 'Supported by the ITF to introduce 6–12-year-old children in primary schools to tennis and discover raw talent.',
    image: (import.meta.env.BASE_URL + 'assets/images/programs/jti-program.jpg'),
    fullContent: [
      'The Junior Tennis Initiative (JTI) is a programme supported by the International Tennis Federation (ITF). The aim of the JTI program is to increase the number of people playing tennis in the entire world. Our JTI program targets 6–12-year-old children in primary schools to identify their talent.',
      'The main target of this initiative is to promote more involvement of children (boys and girls) into playing tennis in Tanzania and encourage more parents to involve their children in the sport. The program aims to ensure that young people get a chance to have more fun, be independent — as it is an independent sport — and discipline the young kids.'
    ]
  },
  {
    id: 'hp',
    title: 'High Performance Programme',
    tag: 'U12 • U14 • U16 • U18',
    subtitle: 'High performance',
    shortDesc: 'Specialised training regimes, biomechanics, mental conditioning, and international tournament prep for top junior talents.',
    image: (import.meta.env.BASE_URL + 'assets/images/programs/high-performance.jpg'),
    fullContent: [
      'The TTA High Performance Programme selects the top ranked junior players across all 6 regions for intensive squad training.',
      'Athletes receive structured fitness, match analysis, and financial support to participate in ITF World Tennis Tour Juniors and continental championships.'
    ]
  },
  {
    id: 'wheelchair',
    title: 'Wheelchair Tennis',
    tag: 'All ages & backgrounds',
    subtitle: 'Wheelchair tennis',
    shortDesc: 'Promoting full inclusion and competitive pathways for adaptive tennis players of all backgrounds across Tanzania.',
    image: (import.meta.env.BASE_URL + 'assets/images/programs/wheelchair-tennis.jpg'),
    fullContent: [
      'Wheelchair tennis is one of the fastest-growing paralympic sports in Tanzania. TTA provides specialized equipment, wheelchairs, and accessible court facilities.',
      'Athletes participate in local exhibition matches, regional championships, and international ITF Wheelchair Tennis Tour events.'
    ]
  },
  {
    id: 'coaching',
    title: 'Coaching & Officiating',
    tag: 'Coaches & officials',
    subtitle: 'Coaching and officiating',
    shortDesc: 'Regular certification workshops, Level 1 & Level 2 ITF courses, and national umpire development programs.',
    image: (import.meta.env.BASE_URL + 'assets/images/programs/coaching-course.jpg'),
    fullContent: [
      'TTA conducts Level 1 & 2 Coaching Certification courses nationwide, led by certified ITF tutors.',
      'We also train linespeople, chair umpires, and tournament directors to ensure international standards across all domestic events.'
    ]
  }
];

export const tournamentsData = [
  {
    id: 'tourney-1',
    type: 'Junior Tournaments',
    name: 'Africa Junior Championships Qualifier',
    date: '15 – 20 Sep 2026',
    location: 'Dar es Salaam Gymkhana Club',
    status: 'Registration Open',
    statusBadge: 'open',
    desc: 'Africa Junior Championships, ITF Junior Circuits and national junior events for U6–U18 players.',
    badge: 'Youth Circuit'
  },
  {
    id: 'tourney-2',
    type: 'Wheelchair Tournaments',
    name: 'Tanzania National Wheelchair Open',
    date: '02 – 05 Oct 2026',
    location: 'Moshi Sports Club, Kilimanjaro',
    status: 'Upcoming',
    statusBadge: 'upcoming',
    desc: 'Competitive and social wheelchair tennis events for athletes of all ages and backgrounds.',
    badge: 'Adaptive Sport'
  },
  {
    id: 'tourney-3',
    type: 'Senior Tournaments',
    name: 'Davis Cup & Billie Jean Cup National Selection',
    date: '28 Jul 2026',
    location: 'Arusha Gymkhana Club',
    status: 'Completed',
    statusBadge: 'completed',
    desc: 'Davis Cup, Billie Jean Cup and senior events — local and international competition.',
    badge: 'World Cup & Pro'
  }
];

export const nationalTeamsData = [
  {
    id: 'juniors',
    teamName: 'Juniors Squad',
    ageGroup: 'U12 – U18',
    subTitle: 'Proudly representing Tanzania',
    desc: 'Our brightest young talents competing at the Africa Junior Championships, ITF Junior Circuits and individual events the world over.',
    image: (import.meta.env.BASE_URL + 'assets/images/teams/junior-team.jpg'),
    achievements: ['Multiple CAT East Africa Regional Medals', 'Qualification for Africa Junior Finals', 'Over 40 Active Junior ITF Ranking Points']
  },
  {
    id: 'davis-cup',
    teamName: "Men's National Team",
    subTitle: 'Davis Cup Squad',
    ageGroup: 'Senior Men',
    desc: "Tanzania's premier men's team, competing in the world cup of tennis against nations from across the globe.",
    image: (import.meta.env.BASE_URL + 'assets/images/teams/davis-cup.jpg'),
    achievements: ['World Cup of Tennis Competitor', 'Group III Africa Zone Contender', 'Nationwide Squad Selection']
  },
  {
    id: 'billie-jean',
    teamName: "Women's National Team",
    subTitle: 'Billie Jean Cup Squad',
    ageGroup: 'Senior Women',
    desc: "Tanzania's women's national team battling in the premier world team competition for women's tennis.",
    image: (import.meta.env.BASE_URL + 'assets/images/teams/womens-team.jpg'),
    achievements: ['Premier World Team Competition', 'Rising Stars in East Africa', 'Inspirational Female Role Models']
  }
];

export const newsData = [
  {
    id: 'news-1',
    date: '28 Jul 2026',
    title: 'National Junior Championships conclude in Dar es Salaam',
    snippet: 'Young stars from all six high-performance regions battled for national titles at the Dar Gymkhana courts…',
    category: 'Tournaments',
    isFeatured: true,
    image: (import.meta.env.BASE_URL + 'assets/images/news/news-junior-championship.jpg'),
    content: `The 2026 Tanzania National Junior Championships came to an exhilarating close at the Dar es Salaam Gymkhana Club courts after five days of intense competition. Over 120 young athletes representing Dar es Salaam, Arusha, Kilimanjaro, Morogoro, Pwani, and Zanzibar competed across U12, U14, U16, and U18 age categories.

TTA President Hon. Hassan M. Shabani commended the incredible determination shown by the participants and highlighted that several champions have been selected for the upcoming Africa Junior Championships team.

"The standard of tennis we witnessed this week is a testament to the hard work happening in primary schools and member clubs nationwide," stated Shabani during the trophy presentation.`
  },
  {
    id: 'news-2',
    date: '12 Jul 2026',
    title: 'TTA concludes Level 1 coaching certification course',
    snippet: 'Newly certified coaches and officials graduate, boosting coaching standards nationwide…',
    category: 'Coaching',
    isFeatured: false,
    image: (import.meta.env.BASE_URL + 'assets/images/news/news-coaching-course.jpg'),
    content: `A total of 24 new tennis coaches and 12 match officials successfully completed the 2026 TTA Level 1 Coaching & Officiating Certification Course held in Arusha. Conducted in collaboration with ITF tutors, the intensive 7-day program covered biomechanics, tactical drills for U10 players, tournament refereeing, and inclusive coaching methodologies.

The newly certified coaches will be deployed to primary schools in Morogoro, Pwani, and Zanzibar to accelerate the Junior Tennis Initiative (JTI).`
  },
  {
    id: 'news-3',
    date: '30 Jun 2026',
    title: 'Davis Cup squad announced for upcoming ties',
    snippet: 'The national team prepares to fly the flag in the world cup of tennis…',
    category: 'National Team',
    isFeatured: false,
    image: (import.meta.env.BASE_URL + 'assets/images/news/news-davis-cup.jpg'),
    content: `Tanzania Tennis Association has officially announced the four-man national team squad selected to represent Tanzania at the upcoming Davis Cup Africa Group III ties. The team features top-ranked domestic players who underwent a 3-week intensive high-performance camp in Dar es Salaam.

TTA Secretary General Emmanuel Tarimo expressed full confidence in the team's readiness: "Our players have put in rigorous work on hard and clay courts. We are ready to make the nation proud on the international stage."`
  }
];

export const galleryData = [
  { id: 1, title: 'National Junior Championships Action', category: 'Juniors', type: 'image', image: (import.meta.env.BASE_URL + 'assets/images/gallery/gallery-jti.jpg') },
  { id: 2, title: 'Davis Cup Team Final Highlights', category: 'Davis Cup', type: 'video', image: (import.meta.env.BASE_URL + 'assets/images/gallery/gallery-davis.jpg') },
  { id: 3, title: 'Junior Team Preparation Camp', category: 'Juniors', type: 'image', image: (import.meta.env.BASE_URL + 'assets/images/gallery/gallery-junior.jpg') },
  { id: 4, title: 'High Performance Serve Technique', category: 'Matches', type: 'image', image: (import.meta.env.BASE_URL + 'assets/images/gallery/gallery-hp.jpg') },
  { id: 5, title: 'Match Point Championship Rally', category: 'Matches', type: 'video', image: (import.meta.env.BASE_URL + 'assets/images/gallery/gallery-match.jpg') },
  { id: 6, title: 'Level 1 Coaching Workshop Arusha', category: 'Coaching', type: 'image', image: (import.meta.env.BASE_URL + 'assets/images/gallery/gallery-coaching.jpg') }
];
