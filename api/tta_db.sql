-- =============================================
-- TTA (Tanzania Tennis Association) Database
-- =============================================
SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;

CREATE DATABASE IF NOT EXISTS `tta_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `tta_db`;

-- ----- Admin Users -----
DROP TABLE IF EXISTS `admin_users`;
CREATE TABLE `admin_users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

INSERT INTO `admin_users` (`email`, `password`, `name`) VALUES
('admin@tta.or.tz', '$2y$10$mHBmnTTIpupsDClfmJGdC.4e2KOPq5/75UpUxoX06ubhWnurl5HKG', 'TTA Administrator');

-- ----- Regions -----
DROP TABLE IF EXISTS `regions`;
CREATE TABLE `regions` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `clubs_count` VARCHAR(50) NOT NULL
) ENGINE=InnoDB;

INSERT INTO `regions` (`name`, `clubs_count`) VALUES
('Dar es Salaam', '12 Clubs'),
('Arusha', '6 Clubs'),
('Kilimanjaro', '4 Clubs'),
('Morogoro', '3 Clubs'),
('Pwani', '3 Clubs'),
('Zanzibar', '4 Clubs'),
('Mwanza', '3 Clubs');

-- ----- Clubs -----
DROP TABLE IF EXISTS `clubs`;
CREATE TABLE `clubs` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `slug` VARCHAR(100) NOT NULL UNIQUE,
  `name` VARCHAR(255) NOT NULL,
  `region_id` INT NOT NULL,
  `courts` VARCHAR(100),
  `address` VARCHAR(255),
  `contact` VARCHAR(100),
  `features` JSON,
  `image` VARCHAR(500),
  FOREIGN KEY (`region_id`) REFERENCES `regions`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

INSERT INTO `clubs` (`slug`, `name`, `region_id`, `courts`, `address`, `contact`, `features`, `image`) VALUES
('dar-gymkhana', 'Dar es Salaam Gymkhana Club', 1, '8 Clay & Hard Courts', 'Ocean Road, Dar es Salaam', '+255 22 211 4567', '["Floodlights","JTI Training Centre","Pro Shop","Wheelchair Access"]', 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=800&q=80'),
('kijitonyama-hub', 'Kijitonyama Tennis Hub', 1, '4 Hard Courts', 'Kijitonyama, Dar es Salaam', '+255 712 345 678', '["High Performance Squads","Junior Academy","Night Play"]', 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=800&q=80'),
('arusha-gymkhana', 'Arusha Gymkhana Club', 2, '6 Clay Courts', 'Boma Road, Arusha', '+255 27 254 8900', '["High Altitude Training","Club House","Coaching Clinics"]', 'https://images.unsplash.com/photo-1622279457486-62dce4a4953f?auto=format&fit=crop&w=800&q=80'),
('moshi-club', 'Moshi Sports Club', 3, '4 Hard Courts', 'Kiboriloni, Moshi', '+255 27 275 1234', '["Grassroots JTI","Scenic Views","Tournament Host"]', '/assets/images/editorial/blue_court_ball.jpg'),
('morogoro-club', 'Morogoro Tennis Centre', 4, '3 Hard Courts', 'Old Dar Road, Morogoro', '+255 23 260 4321', '["Primary School Outreach","Junior Tournaments"]', '/assets/images/editorial/racket_ball_blue_court.jpg'),
('maisara-zanzibar', 'Maisara Tennis Club', 6, '4 Hard Courts', 'Maisara Grounds, Stone Town, Zanzibar', '+255 24 223 9876', '["Beach Proximity","Island Youth Academy","Visitor Guest Play"]', 'https://images.unsplash.com/photo-1560079007-a53207b16174?auto=format&fit=crop&w=800&q=80'),
('mwanza-hub', 'Mwanza Lake Tennis Club', 7, '4 Hard Courts', 'Capri Point, Mwanza', '+255 28 250 1122', '["Lake Views","Junior Squads","Weekend Clinics"]', 'https://images.unsplash.com/photo-1576610612946-e6e25d241940?auto=format&fit=crop&w=800&q=80');

-- ----- Programs -----
DROP TABLE IF EXISTS `programs`;
CREATE TABLE `programs` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `slug` VARCHAR(100) NOT NULL UNIQUE,
  `title` VARCHAR(255) NOT NULL,
  `tag` VARCHAR(100),
  `subtitle` VARCHAR(255),
  `short_desc` TEXT,
  `image` VARCHAR(500),
  `full_content` JSON
) ENGINE=InnoDB;

INSERT INTO `programs` (`slug`, `title`, `tag`, `subtitle`, `short_desc`, `image`, `full_content`) VALUES
('jti', 'Junior Tennis Initiative (JTI)', 'Youth U6–U18', 'Junior tennis', 'Supported by the ITF to introduce 6–12-year-old children in primary schools to tennis and discover raw talent.', '/assets/images/programs/jti-program.jpg', '["The Junior Tennis Initiative (JTI) is a programme supported by the International Tennis Federation (ITF). The aim of the JTI program is to increase the number of people playing tennis in the entire world. Our JTI program targets 6–12-year-old children in primary schools to identify their talent.","The main target of this initiative is to promote more involvement of children (boys and girls) into playing tennis in Tanzania and encourage more parents to involve their children in the sport. The program aims to ensure that young people get a chance to have more fun, be independent — as it is an independent sport — and discipline the young kids."]'),
('hp', 'High Performance Programme', 'U12 • U14 • U16 • U18', 'High performance', 'Specialised training regimes, biomechanics, mental conditioning, and international tournament prep for top junior talents.', '/assets/images/programs/high-performance.jpg', '["The TTA High Performance Programme selects the top ranked junior players across all 6 regions for intensive squad training.","Athletes receive structured fitness, match analysis, and financial support to participate in ITF World Tennis Tour Juniors and continental championships."]'),
('wheelchair', 'Wheelchair Tennis', 'All ages & backgrounds', 'Wheelchair tennis', 'Promoting full inclusion and competitive pathways for adaptive tennis players of all backgrounds across Tanzania.', '/assets/images/programs/wheelchair-tennis.jpg', '["Wheelchair tennis is one of the fastest-growing paralympic sports in Tanzania. TTA provides specialized equipment, wheelchairs, and accessible court facilities.","Athletes participate in local exhibition matches, regional championships, and international ITF Wheelchair Tennis Tour events."]'),
('coaching', 'Coaching & Officiating', 'Coaches & officials', 'Coaching and officiating', 'Regular certification workshops, Level 1 & Level 2 ITF courses, and national umpire development programs.', '/assets/images/programs/coaching-course.jpg', '["TTA conducts Level 1 & 2 Coaching Certification courses nationwide, led by certified ITF tutors.","We also train linespeople, chair umpires, and tournament directors to ensure international standards across all domestic events."]');

-- ----- Tournaments -----
DROP TABLE IF EXISTS `tournaments`;
CREATE TABLE `tournaments` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `slug` VARCHAR(100) NOT NULL UNIQUE,
  `type` VARCHAR(100),
  `name` VARCHAR(255) NOT NULL,
  `date_text` VARCHAR(100),
  `location` VARCHAR(255),
  `status` VARCHAR(50),
  `status_badge` VARCHAR(50),
  `description` TEXT,
  `badge` VARCHAR(100)
) ENGINE=InnoDB;

INSERT INTO `tournaments` (`slug`, `type`, `name`, `date_text`, `location`, `status`, `status_badge`, `description`, `badge`) VALUES
('tourney-1', 'Junior Tournaments', 'Africa Junior Championships Qualifier', '15 – 20 Sep 2026', 'Dar es Salaam Gymkhana Club', 'Registration Open', 'open', 'Africa Junior Championships, ITF Junior Circuits and national junior events for U6–U18 players.', 'Youth Circuit'),
('tourney-2', 'Wheelchair Tournaments', 'Tanzania National Wheelchair Open', '02 – 05 Oct 2026', 'Moshi Sports Club, Kilimanjaro', 'Upcoming', 'upcoming', 'Competitive and social wheelchair tennis events for athletes of all ages and backgrounds.', 'Adaptive Sport'),
('tourney-3', 'Senior Tournaments', 'Davis Cup & Billie Jean Cup National Selection', '28 Jul 2026', 'Arusha Gymkhana Club', 'Completed', 'completed', 'Davis Cup, Billie Jean Cup and senior events — local and international competition.', 'World Cup & Pro');

-- ----- National Teams -----
DROP TABLE IF EXISTS `national_teams`;
CREATE TABLE `national_teams` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `slug` VARCHAR(100) NOT NULL UNIQUE,
  `team_name` VARCHAR(255) NOT NULL,
  `age_group` VARCHAR(50),
  `subtitle` VARCHAR(255),
  `description` TEXT,
  `image` VARCHAR(500),
  `achievements` JSON
) ENGINE=InnoDB;

INSERT INTO `national_teams` (`slug`, `team_name`, `age_group`, `subtitle`, `description`, `image`, `achievements`) VALUES
('juniors', 'Juniors Squad', 'U12 – U18', 'Proudly representing Tanzania', 'Our brightest young talents competing at the Africa Junior Championships, ITF Junior Circuits and individual events the world over.', '/assets/images/teams/junior-team.jpg', '["Multiple CAT East Africa Regional Medals","Qualification for Africa Junior Finals","Over 40 Active Junior ITF Ranking Points"]'),
('davis-cup', 'Men\'s National Team', 'Senior Men', 'Davis Cup Squad', 'Tanzania\'s premier men\'s team, competing in the world cup of tennis against nations from across the globe.', '/assets/images/teams/davis-cup.jpg', '["World Cup of Tennis Competitor","Group III Africa Zone Contender","Nationwide Squad Selection"]'),
('billie-jean', 'Women\'s National Team', 'Senior Women', 'Billie Jean Cup Squad', 'Tanzania\'s women\'s national team battling in the premier world team competition for women\'s tennis.', '/assets/images/teams/womens-team.jpg', '["Premier World Team Competition","Rising Stars in East Africa","Inspirational Female Role Models"]');

-- ----- News -----
DROP TABLE IF EXISTS `news`;
CREATE TABLE `news` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `slug` VARCHAR(100) NOT NULL UNIQUE,
  `date_text` VARCHAR(50),
  `title` VARCHAR(255) NOT NULL,
  `snippet` TEXT,
  `category` VARCHAR(100),
  `is_featured` TINYINT(1) DEFAULT 0,
  `image` VARCHAR(500),
  `content` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

INSERT INTO `news` (`slug`, `date_text`, `title`, `snippet`, `category`, `is_featured`, `image`, `content`) VALUES
('news-1', '28 Jul 2026', 'National Junior Championships conclude in Dar es Salaam', 'Young stars from all six high-performance regions battled for national titles at the Dar Gymkhana courts…', 'Tournaments', 1, '/assets/images/news/news-junior-championship.jpg', 'The 2026 Tanzania National Junior Championships came to an exhilarating close at the Dar es Salaam Gymkhana Club courts after five days of intense competition. Over 120 young athletes representing Dar es Salaam, Arusha, Kilimanjaro, Morogoro, Pwani, and Zanzibar competed across U12, U14, U16, and U18 age categories.\n\nTTA President Hon. Hassan M. Shabani commended the incredible determination shown by the participants and highlighted that several champions have been selected for the upcoming Africa Junior Championships team.\n\n\"The standard of tennis we witnessed this week is a testament to the hard work happening in primary schools and member clubs nationwide,\" stated Shabani during the trophy presentation.'),
('news-2', '12 Jul 2026', 'TTA concludes Level 1 coaching certification course', 'Newly certified coaches and officials graduate, boosting coaching standards nationwide…', 'Coaching', 0, '/assets/images/news/news-coaching-course.jpg', 'A total of 24 new tennis coaches and 12 match officials successfully completed the 2026 TTA Level 1 Coaching & Officiating Certification Course held in Arusha. Conducted in collaboration with ITF tutors, the intensive 7-day program covered biomechanics, tactical drills for U10 players, tournament refereeing, and inclusive coaching methodologies.\n\nThe newly certified coaches will be deployed to primary schools in Morogoro, Pwani, and Zanzibar to accelerate the Junior Tennis Initiative (JTI).'),
('news-3', '30 Jun 2026', 'Davis Cup squad announced for upcoming ties', 'The national team prepares to fly the flag in the world cup of tennis…', 'National Team', 0, '/assets/images/news/news-davis-cup.jpg', 'Tanzania Tennis Association has officially announced the four-man national team squad selected to represent Tanzania at the upcoming Davis Cup Africa Group III ties. The team features top-ranked domestic players who underwent a 3-week intensive high-performance camp in Dar es Salaam.\n\nTTA Secretary General Emmanuel Tarimo expressed full confidence in the team\'s readiness: \"Our players have put in rigorous work on hard and clay courts. We are ready to make the nation proud on the international stage.\"');

-- ----- Gallery -----
DROP TABLE IF EXISTS `gallery`;
CREATE TABLE `gallery` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `category` VARCHAR(100),
  `type` VARCHAR(20) DEFAULT 'image',
  `image` VARCHAR(500)
) ENGINE=InnoDB;

INSERT INTO `gallery` (`title`, `category`, `type`, `image`) VALUES
('National Junior Championships Action', 'Juniors', 'image', '/assets/images/gallery/gallery-jti.jpg'),
('Davis Cup Team Final Highlights', 'Davis Cup', 'video', '/assets/images/gallery/gallery-davis.jpg'),
('Junior Team Preparation Camp', 'Juniors', 'image', '/assets/images/gallery/gallery-junior.jpg'),
('High Performance Serve Technique', 'Matches', 'image', '/assets/images/gallery/gallery-hp.jpg'),
('Match Point Championship Rally', 'Matches', 'video', '/assets/images/gallery/gallery-match.jpg'),
('Level 1 Coaching Workshop Arusha', 'Coaching', 'image', '/assets/images/gallery/gallery-coaching.jpg');

-- ----- Leadership -----
DROP TABLE IF EXISTS `leadership`;
CREATE TABLE `leadership` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `role` VARCHAR(100) NOT NULL,
  `organization` VARCHAR(255),
  `name` VARCHAR(255) NOT NULL,
  `bio` TEXT,
  `avatar` VARCHAR(500) DEFAULT NULL
) ENGINE=InnoDB;

INSERT INTO `leadership` (`role`, `organization`, `name`, `bio`) VALUES
('President', 'Tanzania Tennis Association', 'Hon. Hassan M. Shabani', 'Pioneering tennis development in Tanzania for over 15 years, expanding ties with WT, ITF, and CAT.'),
('Vice President', 'Tanzania Tennis Association', 'Dr. Grace K. Kilonzo', 'Championing junior high-performance pathways, women\'s tennis initiatives, and regional tournament hosting.'),
('Secretary General', 'Tanzania Tennis Association', 'Mr. Emmanuel J. Tarimo', 'Directing association operations, affiliated club governance, and national team logistics for international events.'),
('Treasurer', 'Tanzania Tennis Association', 'Ms. Amina S. Bakari', 'Overseeing financial management, sports grants, and sponsorship allocations for player development.');

-- ----- Partners -----
DROP TABLE IF EXISTS `partners`;
CREATE TABLE `partners` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `code` VARCHAR(20) NOT NULL UNIQUE,
  `name` VARCHAR(255) NOT NULL,
  `role` VARCHAR(255),
  `description` TEXT,
  `badge` VARCHAR(100),
  `logo` VARCHAR(100)
) ENGINE=InnoDB;

INSERT INTO `partners` (`code`, `name`, `role`, `description`, `badge`, `logo`) VALUES
('ITF', 'International Tennis Federation', 'Global Governing Body', 'Provides technical support, JTI equipment grants, and sanctioning for world junior and senior circuits.', 'Global Affiliate', 'ITF'),
('CAT', 'Confederation of African Tennis', 'Continental Governing Body', 'Organises Africa Junior Championships, regional circuits, and continental development workshops.', 'Continental Federation', 'CAT'),
('WT', 'World Tennis', 'Recognised Global Body', 'Endorses TTA as the sole national tennis federation representing Tanzania on the world stage.', 'Official Recognition', 'WT');

-- ----- Stats -----
DROP TABLE IF EXISTS `stats`;
CREATE TABLE `stats` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `stat_key` VARCHAR(50) NOT NULL UNIQUE,
  `number_value` INT NOT NULL,
  `suffix` VARCHAR(10) DEFAULT '',
  `label` VARCHAR(100),
  `description` TEXT
) ENGINE=InnoDB;

INSERT INTO `stats` (`stat_key`, `number_value`, `suffix`, `label`, `description`) VALUES
('clubs', 30, '+', 'Affiliated Member Clubs', 'Governed member clubs across all 6 High-Performance regions.'),
('regions', 6, '', 'HP Regions', 'Dar es Salaam, Arusha, Kilimanjaro, Morogoro, Pwani, Zanzibar.'),
('programmes', 4, '', 'Core Programs', 'JTI, High Performance, Wheelchair, Coaching & Officiating.'),
('teams', 3, '', 'National Squads', 'Juniors, Davis Cup Men, Billie Jean Cup Women.'),
('players', 1200, '+', 'Registered Athletes', 'Youth, social, and professional players participating in TTA events.');

-- ----- Core Values -----
DROP TABLE IF EXISTS `core_values`;
CREATE TABLE `core_values` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `slug` VARCHAR(50) NOT NULL UNIQUE,
  `name` VARCHAR(100) NOT NULL,
  `icon` VARCHAR(50),
  `description` TEXT
) ENGINE=InnoDB;

INSERT INTO `core_values` (`slug`, `name`, `icon`, `description`) VALUES
('integrity', 'Integrity', 'ShieldCheck', 'Upholding honesty, fairness, and transparent governance across all national tournaments and club affiliations.'),
('inclusivity', 'Inclusivity', 'Users', 'Welcoming athletes of all ages, genders, and adaptive backgrounds into tennis without barriers.'),
('excellence', 'Excellence', 'Award', 'Striving for elite performance in player development, coaching accreditation, and officiating.'),
('discipline', 'Discipline', 'Target', 'Instilling character, sportsmanship, and mental fortitude in youth players from primary school upwards.'),
('teamwork', 'Teamwork', 'Handshake', 'Fostering unity across 30+ member clubs and representing Tanzania proudly on the global stage.'),
('passion', 'Passion', 'Flame', 'Igniting lifelong enthusiasm for tennis as a sport, health discipline, and national pride.');

-- ----- Objectives -----
DROP TABLE IF EXISTS `objectives`;
CREATE TABLE `objectives` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `num` VARCHAR(10) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT
) ENGINE=InnoDB;

INSERT INTO `objectives` (`num`, `title`, `description`) VALUES
('01', 'Primary School Talent Identification', 'Introduce tennis to over 5,000 children aged 6–12 annually through the ITF-supported Junior Tennis Initiative (JTI).'),
('02', 'High Performance & International Pathways', 'Develop top U12–U18 junior and senior athletes to compete at the Africa Junior Championships, ITF Circuits, Davis Cup & Billie Jean Cup.'),
('03', 'Coaching & Officiating Certification', 'Conduct certified Level 1 & Level 2 ITF workshops to continually upgrade national coaching and umpiring standards.'),
('04', 'Infrastructure & Adaptive Accessibility', 'Expand court infrastructure nationwide, support regional member clubs, and promote adaptive wheelchair tennis.');

-- ----- Contact Messages (form submissions) -----
DROP TABLE IF EXISTS `contact_messages`;
CREATE TABLE `contact_messages` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(50),
  `topic` VARCHAR(100),
  `message` TEXT NOT NULL,
  `is_read` TINYINT(1) DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ----- Club Applications (form submissions) -----
DROP TABLE IF EXISTS `club_applications`;
CREATE TABLE `club_applications` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `region` VARCHAR(100) NOT NULL,
  `club_name` VARCHAR(255),
  `applicant_name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255),
  `phone` VARCHAR(50) NOT NULL,
  `category` VARCHAR(100),
  `status` ENUM('pending','approved','rejected') DEFAULT 'pending',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ----- Meeting Bookings (form submissions) -----
DROP TABLE IF EXISTS `meeting_bookings`;
CREATE TABLE `meeting_bookings` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `meeting_type` VARCHAR(255) NOT NULL,
  `officer` VARCHAR(255) NOT NULL,
  `preferred_date` DATE NOT NULL,
  `time_slot` VARCHAR(50) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `status` ENUM('pending','confirmed','cancelled') DEFAULT 'pending',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;
