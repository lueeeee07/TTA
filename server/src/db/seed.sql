-- =============================================
-- TTA PostgreSQL Seed Data
-- =============================================

-- ----- Admin Users -----
INSERT INTO admin_users (email, password, name) VALUES
('admin@tta.or.tz', '$2y$10$mHBmnTTIpupsDClfmJGdC.4e2KOPq5/75UpUxoX06ubhWnurl5HKG', 'TTA Administrator')
ON CONFLICT (email) DO NOTHING;

-- ----- Regions -----
INSERT INTO regions (id, name, clubs_count, is_active) VALUES
(1, 'Dar es Salaam', '12 Clubs', 1),
(2, 'Arusha', '6 Clubs', 1),
(3, 'Kilimanjaro', '4 Clubs', 1),
(4, 'Morogoro', '3 Clubs', 1),
(5, 'Pwani', '3 Clubs', 1),
(6, 'Zanzibar', '4 Clubs', 1),
(7, 'Mwanza', '3 Clubs', 1)
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, clubs_count = EXCLUDED.clubs_count, is_active = EXCLUDED.is_active;

SELECT setval('regions_id_seq', (SELECT MAX(id) FROM regions));

-- ----- Clubs -----
INSERT INTO clubs (id, slug, name, region_id, courts, address, contact, features, image, is_active) VALUES
(1, 'dar-gymkhana', 'Dar es Salaam Gymkhana Club', 1, '8 Clay & Hard Courts', 'Ocean Road, Dar es Salaam', '+255 22 211 4567', '["Floodlights","JTI Training Centre","Pro Shop","Wheelchair Access"]'::jsonb, 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=800&q=80', 1),
(2, 'kijitonyama-hub', 'Kijitonyama Tennis Hub', 1, '4 Hard Courts', 'Kijitonyama, Dar es Salaam', '+255 712 345 678', '["High Performance Squads","Junior Academy","Night Play"]'::jsonb, 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=800&q=80', 1),
(3, 'arusha-gymkhana', 'Arusha Gymkhana Club', 2, '6 Clay Courts', 'Boma Road, Arusha', '+255 27 254 8900', '["High Altitude Training","Club House","Coaching Clinics"]'::jsonb, 'https://images.unsplash.com/photo-1622279457486-62dce4a4953f?auto=format&fit=crop&w=800&q=80', 1),
(4, 'moshi-club', 'Moshi Sports Club', 3, '4 Hard Courts', 'Kiboriloni, Moshi', '+255 27 275 1234', '["Grassroots JTI","Scenic Views","Tournament Host"]'::jsonb, '/assets/images/editorial/blue_court_ball.jpg', 1),
(5, 'morogoro-club', 'Morogoro Tennis Centre', 4, '3 Hard Courts', 'Old Dar Road, Morogoro', '+255 23 260 4321', '["Primary School Outreach","Junior Tournaments"]'::jsonb, '/assets/images/editorial/racket_ball_blue_court.jpg', 1),
(6, 'maisara-zanzibar', 'Maisara Tennis Club', 6, '4 Hard Courts', 'Maisara Grounds, Stone Town, Zanzibar', '+255 24 223 9876', '["Beach Proximity","Island Youth Academy","Visitor Guest Play"]'::jsonb, 'https://images.unsplash.com/photo-1560079007-a53207b16174?auto=format&fit=crop&w=800&q=80', 1),
(7, 'mwanza-hub', 'Mwanza Lake Tennis Club', 7, '4 Hard Courts', 'Capri Point, Mwanza', '+255 28 250 1122', '["Lake Views","Junior Squads","Weekend Clinics"]'::jsonb, 'https://images.unsplash.com/photo-1576610612946-e6e25d241940?auto=format&fit=crop&w=800&q=80', 1)
ON CONFLICT (id) DO UPDATE SET
  slug = EXCLUDED.slug,
  name = EXCLUDED.name,
  region_id = EXCLUDED.region_id,
  courts = EXCLUDED.courts,
  address = EXCLUDED.address,
  contact = EXCLUDED.contact,
  features = EXCLUDED.features,
  image = EXCLUDED.image,
  is_active = EXCLUDED.is_active;

SELECT setval('clubs_id_seq', (SELECT MAX(id) FROM clubs));

-- ----- Programs -----
INSERT INTO programs (id, slug, title, tag, subtitle, short_desc, image, full_content, is_active) VALUES
(1, 'jti', 'Junior Tennis Initiative (JTI)', 'Youth U6–U18', 'Junior tennis', 'Supported by the ITF to introduce 6–12-year-old children in primary schools to tennis and discover raw talent.', '/assets/images/programs/jti-program.jpg', '["The Junior Tennis Initiative (JTI) is a programme supported by the International Tennis Federation (ITF). The aim of the JTI program is to increase the number of people playing tennis in the entire world. Our JTI program targets 6–12-year-old children in primary schools to identify their talent.","The main target of this initiative is to promote more involvement of children (boys and girls) into playing tennis in Tanzania and encourage more parents to involve their children in the sport. The program aims to ensure that young people get a chance to have more fun, be independent — as it is an independent sport — and discipline the young kids."]'::jsonb, 1),
(2, 'hp', 'High Performance Programme', 'U12 • U14 • U16 • U18', 'High performance', 'Specialised training regimes, biomechanics, mental conditioning, and international tournament prep for top junior talents.', '/assets/images/programs/high-performance.jpg', '["The TTA High Performance Programme selects the top ranked junior players across all 6 regions for intensive squad training.","Athletes receive structured fitness, match analysis, and financial support to participate in ITF World Tennis Tour Juniors and continental championships."]'::jsonb, 1),
(3, 'wheelchair', 'Wheelchair Tennis', 'All ages & backgrounds', 'Wheelchair tennis', 'Promoting full inclusion and competitive pathways for adaptive tennis players of all backgrounds across Tanzania.', '/assets/images/programs/wheelchair-tennis.jpg', '["Wheelchair tennis is one of the fastest-growing paralympic sports in Tanzania. TTA provides specialized equipment, wheelchairs, and accessible court facilities.","Athletes participate in local exhibition matches, regional championships, and international ITF Wheelchair Tennis Tour events."]'::jsonb, 1),
(4, 'coaching', 'Coaching & Officiating', 'Coaches & officials', 'Coaching and officiating', 'Regular certification workshops, Level 1 & Level 2 ITF courses, and national umpire development programs.', '/assets/images/programs/coaching-course.jpg', '["TTA conducts Level 1 & 2 Coaching Certification courses nationwide, led by certified ITF tutors.","We also train linespeople, chair umpires, and tournament directors to ensure international standards across all domestic events."]'::jsonb, 1)
ON CONFLICT (id) DO UPDATE SET
  slug = EXCLUDED.slug,
  title = EXCLUDED.title,
  tag = EXCLUDED.tag,
  subtitle = EXCLUDED.subtitle,
  short_desc = EXCLUDED.short_desc,
  image = EXCLUDED.image,
  full_content = EXCLUDED.full_content,
  is_active = EXCLUDED.is_active;

SELECT setval('programs_id_seq', (SELECT MAX(id) FROM programs));

-- ----- Tournaments -----
INSERT INTO tournaments (id, slug, type, name, date_text, location, status, status_badge, description, badge, is_active) VALUES
(1, 'tourney-1', 'Junior Tournaments', 'Africa Junior Championships Qualifier', '15 – 20 Sep 2026', 'Dar es Salaam Gymkhana Club', 'Registration Open', 'open', 'Africa Junior Championships, ITF Junior Circuits and national junior events for U6–U18 players.', 'Youth Circuit', 1),
(2, 'tourney-2', 'Wheelchair Tournaments', 'Tanzania National Wheelchair Open', '02 – 05 Oct 2026', 'Moshi Sports Club, Kilimanjaro', 'Upcoming', 'upcoming', 'Competitive and social wheelchair tennis events for athletes of all ages and backgrounds.', 'Adaptive Sport', 1),
(3, 'tourney-3', 'Senior Tournaments', 'Davis Cup & Billie Jean Cup National Selection', '28 Jul 2026', 'Arusha Gymkhana Club', 'Completed', 'completed', 'Davis Cup, Billie Jean Cup and senior events — local and international competition.', 'World Cup & Pro', 1)
ON CONFLICT (id) DO UPDATE SET
  slug = EXCLUDED.slug,
  type = EXCLUDED.type,
  name = EXCLUDED.name,
  date_text = EXCLUDED.date_text,
  location = EXCLUDED.location,
  status = EXCLUDED.status,
  status_badge = EXCLUDED.status_badge,
  description = EXCLUDED.description,
  badge = EXCLUDED.badge,
  is_active = EXCLUDED.is_active;

SELECT setval('tournaments_id_seq', (SELECT MAX(id) FROM tournaments));

-- ----- National Teams -----
INSERT INTO national_teams (id, slug, team_name, age_group, subtitle, description, image, achievements, is_active) VALUES
(1, 'juniors', 'Juniors Squad', 'U12 – U18', 'Proudly representing Tanzania', 'Our brightest young talents competing at the Africa Junior Championships, ITF Junior Circuits and individual events the world over.', '/assets/images/teams/junior-team.jpg', '["Multiple CAT East Africa Regional Medals","Qualification for Africa Junior Finals","Over 40 Active Junior ITF Ranking Points"]'::jsonb, 1),
(2, 'davis-cup', 'Men''s National Team', 'Senior Men', 'Davis Cup Squad', 'Tanzania''s premier men''s team, competing in the world cup of tennis against nations from across the globe.', '/assets/images/teams/davis-cup.jpg', '["World Cup of Tennis Competitor","Group III Africa Zone Contender","Nationwide Squad Selection"]'::jsonb, 1),
(3, 'billie-jean', 'Women''s National Team', 'Senior Women', 'Billie Jean Cup Squad', 'Tanzania''s women''s national team battling in the premier world team competition for women''s tennis.', '/assets/images/teams/womens-team.jpg', '["Premier World Team Competition","Rising Stars in East Africa","Inspirational Female Role Models"]'::jsonb, 1)
ON CONFLICT (id) DO UPDATE SET
  slug = EXCLUDED.slug,
  team_name = EXCLUDED.team_name,
  age_group = EXCLUDED.age_group,
  subtitle = EXCLUDED.subtitle,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  achievements = EXCLUDED.achievements,
  is_active = EXCLUDED.is_active;

SELECT setval('national_teams_id_seq', (SELECT MAX(id) FROM national_teams));

-- ----- News -----
INSERT INTO news (id, slug, date_text, title, snippet, category, is_featured, image, content, is_active) VALUES
(1, 'news-1', '28 Jul 2026', 'National Junior Championships conclude in Dar es Salaam', 'Young stars from all six high-performance regions battled for national titles at the Dar Gymkhana courts…', 'Tournaments', 1, '/assets/images/news/news-junior-championship.jpg', 'The 2026 Tanzania National Junior Championships came to an exhilarating close at the Dar es Salaam Gymkhana Club courts after five days of intense competition. Over 120 young athletes representing Dar es Salaam, Arusha, Kilimanjaro, Morogoro, Pwani, and Zanzibar competed across U12, U14, U16, and U18 age categories.

TTA President Hon. Hassan M. Shabani commended the incredible determination shown by the participants and highlighted that several champions have been selected for the upcoming Africa Junior Championships team.

"The standard of tennis we witnessed this week is a testament to the hard work happening in primary schools and member clubs nationwide," stated Shabani during the trophy presentation.', 1),
(2, 'news-2', '12 Jul 2026', 'TTA concludes Level 1 coaching certification course', 'Newly certified coaches and officials graduate, boosting coaching standards nationwide…', 'Coaching', 0, '/assets/images/news/news-coaching-course.jpg', 'A total of 24 new tennis coaches and 12 match officials successfully completed the 2026 TTA Level 1 Coaching & Officiating Certification Course held in Arusha. Conducted in collaboration with ITF tutors, the intensive 7-day program covered biomechanics, tactical drills for U10 players, tournament refereeing, and inclusive coaching methodologies.

The newly certified coaches will be deployed to primary schools in Morogoro, Pwani, and Zanzibar to accelerate the Junior Tennis Initiative (JTI).', 1),
(3, 'news-3', '30 Jun 2026', 'Davis Cup squad announced for upcoming ties', 'The national team prepares to fly the flag in the world cup of tennis…', 'National Team', 0, '/assets/images/news/news-davis-cup.jpg', 'Tanzania Tennis Association has officially announced the four-man national team squad selected to represent Tanzania at the upcoming Davis Cup Africa Group III ties. The team features top-ranked domestic players who underwent a 3-week intensive high-performance camp in Dar es Salaam.

TTA Secretary General Emmanuel Tarimo expressed full confidence in the team''s readiness: "Our players have put in rigorous work on hard and clay courts. We are ready to make the nation proud on the international stage."', 1)
ON CONFLICT (id) DO UPDATE SET
  slug = EXCLUDED.slug,
  date_text = EXCLUDED.date_text,
  title = EXCLUDED.title,
  snippet = EXCLUDED.snippet,
  category = EXCLUDED.category,
  is_featured = EXCLUDED.is_featured,
  image = EXCLUDED.image,
  content = EXCLUDED.content,
  is_active = EXCLUDED.is_active;

SELECT setval('news_id_seq', (SELECT MAX(id) FROM news));

-- ----- Gallery -----
INSERT INTO gallery (id, title, category, type, image, is_active) VALUES
(1, 'National Junior Championships Action', 'Juniors', 'image', '/assets/images/gallery/gallery-jti.jpg', 1),
(2, 'Davis Cup Team Final Highlights', 'Davis Cup', 'video', '/assets/images/gallery/gallery-davis.jpg', 1),
(3, 'Junior Team Preparation Camp', 'Juniors', 'image', '/assets/images/gallery/gallery-junior.jpg', 1),
(4, 'High Performance Serve Technique', 'Matches', 'image', '/assets/images/gallery/gallery-hp.jpg', 1),
(5, 'Match Point Championship Rally', 'Matches', 'video', '/assets/images/gallery/gallery-match.jpg', 1),
(6, 'Level 1 Coaching Workshop Arusha', 'Coaching', 'image', '/assets/images/gallery/gallery-coaching.jpg', 1)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  type = EXCLUDED.type,
  image = EXCLUDED.image,
  is_active = EXCLUDED.is_active;

SELECT setval('gallery_id_seq', (SELECT MAX(id) FROM gallery));

-- ----- Leadership -----
INSERT INTO leadership (id, role, organization, name, bio, avatar, is_active) VALUES
(1, 'President', 'Tanzania Tennis Association', 'Hon. Hassan M. Shabani', 'Pioneering tennis development in Tanzania for over 15 years, expanding ties with WT, ITF, and CAT.', NULL, 1),
(2, 'Vice President', 'Tanzania Tennis Association', 'Dr. Grace K. Kilonzo', 'Championing junior high-performance pathways, women''s tennis initiatives, and regional tournament hosting.', NULL, 1),
(3, 'Secretary General', 'Tanzania Tennis Association', 'Mr. Emmanuel J. Tarimo', 'Directing association operations, affiliated club governance, and national team logistics for international events.', NULL, 1),
(4, 'Treasurer', 'Tanzania Tennis Association', 'Ms. Amina S. Bakari', 'Overseeing financial management, sports grants, and sponsorship allocations for player development.', NULL, 1)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  organization = EXCLUDED.organization,
  name = EXCLUDED.name,
  bio = EXCLUDED.bio,
  avatar = EXCLUDED.avatar,
  is_active = EXCLUDED.is_active;

SELECT setval('leadership_id_seq', (SELECT MAX(id) FROM leadership));

-- ----- Partners -----
INSERT INTO partners (id, code, name, role, description, badge, logo, is_active) VALUES
(1, 'ITF', 'International Tennis Federation', 'Global Governing Body', 'Provides technical support, JTI equipment grants, and sanctioning for world junior and senior circuits.', 'Global Affiliate', 'ITF', 1),
(2, 'CAT', 'Confederation of African Tennis', 'Continental Governing Body', 'Organises Africa Junior Championships, regional circuits, and continental development workshops.', 'Continental Federation', 'CAT', 1),
(3, 'WT', 'World Tennis', 'Recognised Global Body', 'Endorses TTA as the sole national tennis federation representing Tanzania on the world stage.', 'Official Recognition', 'WT', 1)
ON CONFLICT (id) DO UPDATE SET
  code = EXCLUDED.code,
  name = EXCLUDED.name,
  role = EXCLUDED.role,
  description = EXCLUDED.description,
  badge = EXCLUDED.badge,
  logo = EXCLUDED.logo,
  is_active = EXCLUDED.is_active;

SELECT setval('partners_id_seq', (SELECT MAX(id) FROM partners));

-- ----- Stats -----
INSERT INTO stats (id, stat_key, number_value, suffix, label, description, is_active) VALUES
(1, 'clubs', 30, '+', 'Affiliated Member Clubs', 'Governed member clubs across all 6 High-Performance regions.', 1),
(2, 'regions', 6, '', 'HP Regions', 'Dar es Salaam, Arusha, Kilimanjaro, Morogoro, Pwani, Zanzibar.', 1),
(3, 'programmes', 4, '', 'Core Programs', 'JTI, High Performance, Wheelchair, Coaching & Officiating.', 1),
(4, 'teams', 3, '', 'National Squads', 'Juniors, Davis Cup Men, Billie Jean Cup Women.', 1),
(5, 'players', 1200, '+', 'Registered Athletes', 'Youth, social, and professional players participating in TTA events.', 1)
ON CONFLICT (id) DO UPDATE SET
  stat_key = EXCLUDED.stat_key,
  number_value = EXCLUDED.number_value,
  suffix = EXCLUDED.suffix,
  label = EXCLUDED.label,
  description = EXCLUDED.description,
  is_active = EXCLUDED.is_active;

SELECT setval('stats_id_seq', (SELECT MAX(id) FROM stats));

-- ----- Core Values -----
INSERT INTO core_values (id, slug, name, icon, description, is_active) VALUES
(1, 'integrity', 'Integrity', 'ShieldCheck', 'Upholding honesty, fairness, and transparent governance across all national tournaments and club affiliations.', 1),
(2, 'inclusivity', 'Inclusivity', 'Users', 'Welcoming athletes of all ages, genders, and adaptive backgrounds into tennis without barriers.', 1),
(3, 'excellence', 'Excellence', 'Award', 'Striving for elite performance in player development, coaching accreditation, and officiating.', 1),
(4, 'discipline', 'Discipline', 'Target', 'Instilling character, sportsmanship, and mental fortitude in youth players from primary school upwards.', 1),
(5, 'teamwork', 'Teamwork', 'Handshake', 'Fostering unity across 30+ member clubs and representing Tanzania proudly on the global stage.', 1),
(6, 'passion', 'Passion', 'Flame', 'Igniting lifelong enthusiasm for tennis as a sport, health discipline, and national pride.', 1)
ON CONFLICT (id) DO UPDATE SET
  slug = EXCLUDED.slug,
  name = EXCLUDED.name,
  icon = EXCLUDED.icon,
  description = EXCLUDED.description,
  is_active = EXCLUDED.is_active;

SELECT setval('core_values_id_seq', (SELECT MAX(id) FROM core_values));

-- ----- Objectives -----
INSERT INTO objectives (id, num, title, description, is_active) VALUES
(1, '01', 'Primary School Talent Identification', 'Introduce tennis to over 5,000 children aged 6–12 annually through the ITF-supported Junior Tennis Initiative (JTI).', 1),
(2, '02', 'High Performance & International Pathways', 'Develop top U12–U18 junior and senior athletes to compete at the Africa Junior Championships, ITF Circuits, Davis Cup & Billie Jean Cup.', 1),
(3, '03', 'Coaching & Officiating Certification', 'Conduct certified Level 1 & Level 2 ITF workshops to continually upgrade national coaching and umpiring standards.', 1),
(4, '04', 'Infrastructure & Adaptive Accessibility', 'Expand court infrastructure nationwide, support regional member clubs, and promote adaptive wheelchair tennis.', 1)
ON CONFLICT (id) DO UPDATE SET
  num = EXCLUDED.num,
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  is_active = EXCLUDED.is_active;

SELECT setval('objectives_id_seq', (SELECT MAX(id) FROM objectives));
