-- =============================================
-- TTA (Tanzania Tennis Association) PostgreSQL Schema
-- =============================================

-- ----- Admin Users -----
CREATE TABLE IF NOT EXISTS admin_users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- ----- Regions -----
CREATE TABLE IF NOT EXISTS regions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  clubs_count VARCHAR(50) NOT NULL,
  is_active SMALLINT NOT NULL DEFAULT 1
);

-- ----- Clubs -----
CREATE TABLE IF NOT EXISTS clubs (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(100) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  region_id INT NOT NULL REFERENCES regions(id) ON DELETE CASCADE,
  courts VARCHAR(100),
  address VARCHAR(255),
  contact VARCHAR(100),
  features JSONB DEFAULT '[]'::jsonb,
  image VARCHAR(500),
  is_active SMALLINT NOT NULL DEFAULT 1
);

-- ----- Programs -----
CREATE TABLE IF NOT EXISTS programs (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(100) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  tag VARCHAR(100),
  subtitle VARCHAR(255),
  short_desc TEXT,
  image VARCHAR(500),
  full_content JSONB DEFAULT '[]'::jsonb,
  is_active SMALLINT NOT NULL DEFAULT 1
);

-- ----- Tournaments -----
CREATE TABLE IF NOT EXISTS tournaments (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(100) NOT NULL UNIQUE,
  type VARCHAR(100),
  name VARCHAR(255) NOT NULL,
  date_text VARCHAR(100),
  location VARCHAR(255),
  status VARCHAR(50),
  status_badge VARCHAR(50),
  description TEXT,
  badge VARCHAR(100),
  is_active SMALLINT NOT NULL DEFAULT 1
);

-- ----- National Teams -----
CREATE TABLE IF NOT EXISTS national_teams (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(100) NOT NULL UNIQUE,
  team_name VARCHAR(255) NOT NULL,
  age_group VARCHAR(50),
  subtitle VARCHAR(255),
  description TEXT,
  image VARCHAR(500),
  achievements JSONB DEFAULT '[]'::jsonb,
  is_active SMALLINT NOT NULL DEFAULT 1
);

-- ----- News -----
CREATE TABLE IF NOT EXISTS news (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(100) NOT NULL UNIQUE,
  date_text VARCHAR(50),
  title VARCHAR(255) NOT NULL,
  snippet TEXT,
  category VARCHAR(100),
  is_featured SMALLINT DEFAULT 0,
  image VARCHAR(500),
  content TEXT,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  is_active SMALLINT NOT NULL DEFAULT 1
);

-- ----- Gallery -----
CREATE TABLE IF NOT EXISTS gallery (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  type VARCHAR(20) DEFAULT 'image',
  image VARCHAR(500),
  is_active SMALLINT NOT NULL DEFAULT 1
);

-- ----- Leadership -----
CREATE TABLE IF NOT EXISTS leadership (
  id SERIAL PRIMARY KEY,
  role VARCHAR(100) NOT NULL,
  organization VARCHAR(255),
  name VARCHAR(255) NOT NULL,
  bio TEXT,
  avatar VARCHAR(500) DEFAULT NULL,
  is_active SMALLINT NOT NULL DEFAULT 1
);

-- ----- Partners -----
CREATE TABLE IF NOT EXISTS partners (
  id SERIAL PRIMARY KEY,
  code VARCHAR(20) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(255),
  description TEXT,
  badge VARCHAR(100),
  logo VARCHAR(100),
  is_active SMALLINT NOT NULL DEFAULT 1
);

-- ----- Stats -----
CREATE TABLE IF NOT EXISTS stats (
  id SERIAL PRIMARY KEY,
  stat_key VARCHAR(50) NOT NULL UNIQUE,
  number_value INT NOT NULL,
  suffix VARCHAR(10) DEFAULT '',
  label VARCHAR(100),
  description TEXT,
  is_active SMALLINT NOT NULL DEFAULT 1
);

-- ----- Core Values -----
CREATE TABLE IF NOT EXISTS core_values (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(50) NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  icon VARCHAR(50),
  description TEXT,
  is_active SMALLINT NOT NULL DEFAULT 1
);

-- ----- Objectives -----
CREATE TABLE IF NOT EXISTS objectives (
  id SERIAL PRIMARY KEY,
  num VARCHAR(10) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  is_active SMALLINT NOT NULL DEFAULT 1
);

-- ----- Contact Messages (form submissions) -----
CREATE TABLE IF NOT EXISTS contact_messages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  topic VARCHAR(100),
  message TEXT NOT NULL,
  is_read SMALLINT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- ----- Club Applications (form submissions) -----
CREATE TABLE IF NOT EXISTS club_applications (
  id SERIAL PRIMARY KEY,
  region VARCHAR(100) NOT NULL,
  club_name VARCHAR(255),
  applicant_name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(50) NOT NULL,
  category VARCHAR(100),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- ----- Meeting Bookings (form submissions) -----
CREATE TABLE IF NOT EXISTS meeting_bookings (
  id SERIAL PRIMARY KEY,
  meeting_type VARCHAR(255) NOT NULL,
  officer VARCHAR(255) NOT NULL,
  preferred_date DATE NOT NULL,
  time_slot VARCHAR(50) NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
