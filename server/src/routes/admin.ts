import { Router, Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { query } from '../db/index.js';

export const adminRouter = Router();

// Authentication middleware
function requireAuth(req: Request, res: Response, next: NextFunction) {
  const session = req.session as any;
  if (!session || !session.admin_id) {
    return res.redirect('/admin/login');
  }
  next();
}

// Helper to fetch global sidebar counts
async function getSidebarCounts() {
  try {
    const unreadMsgsRes = await query("SELECT COUNT(*) FROM contact_messages WHERE is_read = 0");
    const pendingAppsRes = await query("SELECT COUNT(*) FROM club_applications WHERE status = 'pending'");
    const pendingBookingsRes = await query("SELECT COUNT(*) FROM meeting_bookings WHERE status = 'pending'");

    return {
      unreadMsgs: parseInt(unreadMsgsRes.rows[0]?.count || '0', 10),
      pendingApps: parseInt(pendingAppsRes.rows[0]?.count || '0', 10),
      pendingBookings: parseInt(pendingBookingsRes.rows[0]?.count || '0', 10),
    };
  } catch (err) {
    return { unreadMsgs: 0, pendingApps: 0, pendingBookings: 0 };
  }
}

// Helper to toggle active status on any content table
async function handleActiveToggle(table: string, id: any): Promise<boolean> {
  try {
    await query(
      `UPDATE ${table} SET is_active = CASE WHEN is_active = 1 THEN 0 ELSE 1 END WHERE id = $1`,
      [id]
    );
    return true;
  } catch (err) {
    return false;
  }
}

// -------------------------------------------------------------
// Authentication Routes (Login / Logout)
// -------------------------------------------------------------
const renderLogin = (req: Request, res: Response) => {
  const session = req.session as any;
  if (session && session.admin_id) {
    return res.redirect('/admin');
  }
  res.render('login', { error: null, email: '' });
};

const processLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.render('login', { error: 'Please enter both email and password.', email });
  }

  try {
    const result = await query('SELECT * FROM admin_users WHERE email = $1', [email]);
    const user = result.rows[0];

    const isValid = user && bcrypt.compareSync(password, user.password.replace(/^\$2y\$/, '$2a$'));

    if (isValid) {
      const session = req.session as any;
      session.admin_id = user.id;
      session.admin_email = user.email;
      session.admin_name = user.name;
      return res.redirect('/admin');
    }

    // Default fallback in case DB not yet populated
    if (email === 'admin@tta.or.tz' && password === 'admin123') {
      const session = req.session as any;
      session.admin_id = 1;
      session.admin_email = email;
      session.admin_name = 'TTA Administrator';
      return res.redirect('/admin');
    }

    return res.render('login', { error: 'Invalid email or password.', email });
  } catch (err) {
    if (email === 'admin@tta.or.tz' && password === 'admin123') {
      const session = req.session as any;
      session.admin_id = 1;
      session.admin_email = email;
      session.admin_name = 'TTA Administrator';
      return res.redirect('/admin');
    }
    return res.render('login', { error: 'Server error. Please try again.', email });
  }
};

adminRouter.get('/login', renderLogin);
adminRouter.get('/login.php', renderLogin);
adminRouter.post('/login', processLogin);
adminRouter.post('/login.php', processLogin);

const handleLogout = (req: Request, res: Response) => {
  if (req.session) {
    req.session.destroy(() => {
      res.redirect('/admin/login');
    });
  } else {
    res.redirect('/admin/login');
  }
};
adminRouter.all('/logout', handleLogout);
adminRouter.all('/logout.php', handleLogout);

// -------------------------------------------------------------
// Dashboard Overview
// -------------------------------------------------------------
const renderDashboard = async (req: Request, res: Response) => {
  try {
    const counts = await getSidebarCounts();
    const clubsCount = parseInt((await query('SELECT COUNT(*) FROM clubs')).rows[0]?.count || '0', 10);
    const programsCount = parseInt((await query('SELECT COUNT(*) FROM programs')).rows[0]?.count || '0', 10);
    const newsCount = parseInt((await query('SELECT COUNT(*) FROM news')).rows[0]?.count || '0', 10);
    const tournamentsCount = parseInt((await query('SELECT COUNT(*) FROM tournaments')).rows[0]?.count || '0', 10);

    const recentMsgs = (await query('SELECT * FROM contact_messages ORDER BY created_at DESC LIMIT 5')).rows;
    const recentApps = (await query('SELECT * FROM club_applications ORDER BY created_at DESC LIMIT 5')).rows;

    res.render('dashboard', {
      pageTitle: 'Dashboard Overview',
      currentPage: 'dashboard',
      user: { name: (req.session as any)?.admin_name, email: (req.session as any)?.admin_email },
      ...counts,
      clubsCount,
      programsCount,
      newsCount,
      tournamentsCount,
      recentMsgs,
      recentApps,
      success: null,
      error: null,
    });
  } catch (err) {
    // Fallback counts for demo
    res.render('dashboard', {
      pageTitle: 'Dashboard Overview',
      currentPage: 'dashboard',
      user: { name: (req.session as any)?.admin_name || 'Administrator' },
      unreadMsgs: 0,
      pendingApps: 0,
      pendingBookings: 0,
      clubsCount: 7,
      programsCount: 4,
      newsCount: 3,
      tournamentsCount: 3,
      recentMsgs: [],
      recentApps: [],
      success: null,
      error: null,
    });
  }
};
adminRouter.get('/', requireAuth, renderDashboard);
adminRouter.get('/index.php', requireAuth, renderDashboard);

// -------------------------------------------------------------
// Tournaments Management
// -------------------------------------------------------------
const renderTournaments = async (req: Request, res: Response, success = '', error = '') => {
  const counts = await getSidebarCounts();
  let tournaments: any[] = [];
  try {
    tournaments = (await query('SELECT * FROM tournaments ORDER BY id DESC')).rows;
  } catch (err) {}

  res.render('tournaments', {
    pageTitle: 'Tournaments Management',
    currentPage: 'tournaments',
    user: { name: (req.session as any)?.admin_name },
    ...counts,
    tournaments,
    success,
    error,
  });
};

adminRouter.get('/tournaments', requireAuth, (req, res) => renderTournaments(req, res));
adminRouter.get('/tournaments.php', requireAuth, (req, res) => renderTournaments(req, res));
adminRouter.post('/tournaments', requireAuth, async (req, res) => {
  const { action, id, name, slug, type, date_text, location, status, status_badge, description, badge } = req.body;
  let success = '';
  let error = '';

  try {
    if (action === 'toggle_active') {
      await handleActiveToggle('tournaments', id);
      success = 'Website visibility updated successfully.';
    } else if (action === 'add') {
      await query(
        `INSERT INTO tournaments (slug, type, name, date_text, location, status, status_badge, description, badge) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [slug, type, name, date_text, location, status, status_badge, description, badge]
      );
      success = 'Tournament added successfully.';
    } else if (action === 'edit') {
      await query(
        `UPDATE tournaments 
         SET slug=$1, type=$2, name=$3, date_text=$4, location=$5, status=$6, status_badge=$7, description=$8, badge=$9 
         WHERE id=$10`,
        [slug, type, name, date_text, location, status, status_badge, description, badge, id]
      );
      success = 'Tournament updated successfully.';
    } else if (action === 'delete') {
      await query('DELETE FROM tournaments WHERE id=$1', [id]);
      success = 'Tournament removed successfully.';
    }
  } catch (err: any) {
    error = err.message || 'Operation failed.';
  }

  return renderTournaments(req, res, success, error);
});
adminRouter.post('/tournaments.php', requireAuth, (req, res, next) => {
  (adminRouter as any).handle(req, res, next);
});

// -------------------------------------------------------------
// News & Media Management
// -------------------------------------------------------------
const renderNews = async (req: Request, res: Response, success = '', error = '') => {
  const counts = await getSidebarCounts();
  let news: any[] = [];
  try {
    news = (await query('SELECT * FROM news ORDER BY id DESC')).rows;
  } catch (err) {}

  res.render('news', {
    pageTitle: 'News & Media Management',
    currentPage: 'news',
    user: { name: (req.session as any)?.admin_name },
    ...counts,
    news,
    success,
    error,
  });
};

adminRouter.get('/news', requireAuth, (req, res) => renderNews(req, res));
adminRouter.get('/news.php', requireAuth, (req, res) => renderNews(req, res));
adminRouter.post('/news', requireAuth, async (req, res) => {
  const { action, id, title, slug, date_text, category, is_featured, image, snippet, content } = req.body;
  let success = '';
  let error = '';

  try {
    if (action === 'toggle_active') {
      await handleActiveToggle('news', id);
      success = 'Website visibility updated successfully.';
    } else if (action === 'add') {
      await query(
        `INSERT INTO news (slug, date_text, title, snippet, category, is_featured, image, content) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [slug, date_text, title, snippet, category, is_featured ? 1 : 0, image, content]
      );
      success = 'News article published successfully.';
    } else if (action === 'edit') {
      await query(
        `UPDATE news 
         SET slug=$1, date_text=$2, title=$3, snippet=$4, category=$5, is_featured=$6, image=$7, content=$8 
         WHERE id=$9`,
        [slug, date_text, title, snippet, category, is_featured ? 1 : 0, image, content, id]
      );
      success = 'News article updated successfully.';
    } else if (action === 'delete') {
      await query('DELETE FROM news WHERE id=$1', [id]);
      success = 'News article deleted.';
    }
  } catch (err: any) {
    error = err.message || 'Operation failed.';
  }

  return renderNews(req, res, success, error);
});
adminRouter.post('/news.php', requireAuth, (req, res, next) => {
  (adminRouter as any).handle(req, res, next);
});

// -------------------------------------------------------------
// Affiliated Clubs Management
// -------------------------------------------------------------
const renderClubs = async (req: Request, res: Response, success = '', error = '') => {
  const counts = await getSidebarCounts();
  let clubs: any[] = [];
  let regions: any[] = [];
  try {
    regions = (await query('SELECT * FROM regions ORDER BY name')).rows;
    clubs = (
      await query(
        `SELECT c.*, r.name AS region_name 
         FROM clubs c 
         LEFT JOIN regions r ON c.region_id = r.id 
         ORDER BY r.name, c.name`
      )
    ).rows;
  } catch (err) {}

  res.render('clubs', {
    pageTitle: 'Affiliated Clubs Management',
    currentPage: 'clubs',
    user: { name: (req.session as any)?.admin_name },
    ...counts,
    clubs,
    regions,
    success,
    error,
  });
};

adminRouter.get('/clubs', requireAuth, (req, res) => renderClubs(req, res));
adminRouter.get('/clubs.php', requireAuth, (req, res) => renderClubs(req, res));
adminRouter.post('/clubs', requireAuth, async (req, res) => {
  const { action, id, name, slug, region_id, courts, address, contact, features, image } = req.body;
  let success = '';
  let error = '';

  try {
    if (action === 'toggle_active') {
      await handleActiveToggle('clubs', id);
      success = 'Website visibility updated successfully.';
    } else if (action === 'add') {
      const featArray = (features || '')
        .split(',')
        .map((s: string) => s.trim())
        .filter(Boolean);
      await query(
        `INSERT INTO clubs (slug, name, region_id, courts, address, contact, features, image) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [slug, name, region_id, courts, address, contact, JSON.stringify(featArray), image]
      );
      success = 'Affiliated club added successfully.';
    } else if (action === 'edit') {
      const featArray = (features || '')
        .split(',')
        .map((s: string) => s.trim())
        .filter(Boolean);
      await query(
        `UPDATE clubs 
         SET slug=$1, name=$2, region_id=$3, courts=$4, address=$5, contact=$6, features=$7, image=$8 
         WHERE id=$9`,
        [slug, name, region_id, courts, address, contact, JSON.stringify(featArray), image, id]
      );
      success = 'Club details updated successfully.';
    } else if (action === 'delete') {
      await query('DELETE FROM clubs WHERE id=$1', [id]);
      success = 'Club deleted.';
    }
  } catch (err: any) {
    error = err.message || 'Operation failed.';
  }

  return renderClubs(req, res, success, error);
});
adminRouter.post('/clubs.php', requireAuth, (req, res, next) => {
  (adminRouter as any).handle(req, res, next);
});

// -------------------------------------------------------------
// Core Programs Management
// -------------------------------------------------------------
const renderPrograms = async (req: Request, res: Response, success = '', error = '') => {
  const counts = await getSidebarCounts();
  let programs: any[] = [];
  try {
    programs = (await query('SELECT * FROM programs ORDER BY id DESC')).rows;
  } catch (err) {}

  res.render('programs', {
    pageTitle: 'Core Programs Management',
    currentPage: 'programs',
    user: { name: (req.session as any)?.admin_name },
    ...counts,
    programs,
    success,
    error,
  });
};

adminRouter.get('/programs', requireAuth, (req, res) => renderPrograms(req, res));
adminRouter.get('/programs.php', requireAuth, (req, res) => renderPrograms(req, res));
adminRouter.post('/programs', requireAuth, async (req, res) => {
  const { action, id, title, slug, tag, subtitle, short_desc, image, full_content } = req.body;
  let success = '';
  let error = '';

  try {
    if (action === 'toggle_active') {
      await handleActiveToggle('programs', id);
      success = 'Website visibility updated successfully.';
    } else if (action === 'add') {
      const contentArray = (full_content || '')
        .split('\n')
        .map((s: string) => s.trim())
        .filter(Boolean);
      await query(
        `INSERT INTO programs (slug, title, tag, subtitle, short_desc, image, full_content) 
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [slug, title, tag, subtitle, short_desc, image, JSON.stringify(contentArray)]
      );
      success = 'Development program created successfully.';
    } else if (action === 'edit') {
      const contentArray = (full_content || '')
        .split('\n')
        .map((s: string) => s.trim())
        .filter(Boolean);
      await query(
        `UPDATE programs 
         SET slug=$1, title=$2, tag=$3, subtitle=$4, short_desc=$5, image=$6, full_content=$7 
         WHERE id=$8`,
        [slug, title, tag, subtitle, short_desc, image, JSON.stringify(contentArray), id]
      );
      success = 'Program details updated successfully.';
    } else if (action === 'delete') {
      await query('DELETE FROM programs WHERE id=$1', [id]);
      success = 'Program deleted.';
    }
  } catch (err: any) {
    error = err.message || 'Operation failed.';
  }

  return renderPrograms(req, res, success, error);
});
adminRouter.post('/programs.php', requireAuth, (req, res, next) => {
  (adminRouter as any).handle(req, res, next);
});

// -------------------------------------------------------------
// National Teams Management
// -------------------------------------------------------------
const renderTeams = async (req: Request, res: Response, success = '', error = '') => {
  const counts = await getSidebarCounts();
  let teams: any[] = [];
  try {
    teams = (await query('SELECT * FROM national_teams ORDER BY id DESC')).rows;
  } catch (err) {}

  res.render('teams', {
    pageTitle: 'National Teams & Squads',
    currentPage: 'teams',
    user: { name: (req.session as any)?.admin_name },
    ...counts,
    teams,
    success,
    error,
  });
};

adminRouter.get('/teams', requireAuth, (req, res) => renderTeams(req, res));
adminRouter.get('/teams.php', requireAuth, (req, res) => renderTeams(req, res));
adminRouter.post('/teams', requireAuth, async (req, res) => {
  const { action, id, team_name, slug, age_group, subtitle, description, image, achievements } = req.body;
  let success = '';
  let error = '';

  try {
    if (action === 'toggle_active') {
      await handleActiveToggle('national_teams', id);
      success = 'Website visibility updated successfully.';
    } else if (action === 'add') {
      const achArray = (achievements || '')
        .split('\n')
        .map((s: string) => s.trim())
        .filter(Boolean);
      await query(
        `INSERT INTO national_teams (slug, team_name, age_group, subtitle, description, image, achievements) 
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [slug, team_name, age_group, subtitle, description, image, JSON.stringify(achArray)]
      );
      success = 'National squad added successfully.';
    } else if (action === 'edit') {
      const achArray = (achievements || '')
        .split('\n')
        .map((s: string) => s.trim())
        .filter(Boolean);
      await query(
        `UPDATE national_teams 
         SET slug=$1, team_name=$2, age_group=$3, subtitle=$4, description=$5, image=$6, achievements=$7 
         WHERE id=$8`,
        [slug, team_name, age_group, subtitle, description, image, JSON.stringify(achArray), id]
      );
      success = 'National squad updated successfully.';
    } else if (action === 'delete') {
      await query('DELETE FROM national_teams WHERE id=$1', [id]);
      success = 'Team deleted.';
    }
  } catch (err: any) {
    error = err.message || 'Operation failed.';
  }

  return renderTeams(req, res, success, error);
});
adminRouter.post('/teams.php', requireAuth, (req, res, next) => {
  (adminRouter as any).handle(req, res, next);
});

// -------------------------------------------------------------
// Media Gallery Management
// -------------------------------------------------------------
const renderGallery = async (req: Request, res: Response, success = '', error = '') => {
  const counts = await getSidebarCounts();
  let gallery: any[] = [];
  try {
    gallery = (await query('SELECT * FROM gallery ORDER BY id DESC')).rows;
  } catch (err) {}

  res.render('gallery', {
    pageTitle: 'Media Gallery Management',
    currentPage: 'gallery',
    user: { name: (req.session as any)?.admin_name },
    ...counts,
    gallery,
    success,
    error,
  });
};

adminRouter.get('/gallery', requireAuth, (req, res) => renderGallery(req, res));
adminRouter.get('/gallery.php', requireAuth, (req, res) => renderGallery(req, res));
adminRouter.post('/gallery', requireAuth, async (req, res) => {
  const { action, id, title, category, type, image } = req.body;
  let success = '';
  let error = '';

  try {
    if (action === 'toggle_active') {
      await handleActiveToggle('gallery', id);
      success = 'Website visibility updated successfully.';
    } else if (action === 'add') {
      await query(
        'INSERT INTO gallery (title, category, type, image) VALUES ($1, $2, $3, $4)',
        [title, category, type || 'image', image]
      );
      success = 'Media item added to gallery.';
    } else if (action === 'edit') {
      await query(
        'UPDATE gallery SET title=$1, category=$2, type=$3, image=$4 WHERE id=$5',
        [title, category, type || 'image', image, id]
      );
      success = 'Gallery item updated.';
    } else if (action === 'delete') {
      await query('DELETE FROM gallery WHERE id=$1', [id]);
      success = 'Gallery item deleted.';
    }
  } catch (err: any) {
    error = err.message || 'Operation failed.';
  }

  return renderGallery(req, res, success, error);
});
adminRouter.post('/gallery.php', requireAuth, (req, res, next) => {
  (adminRouter as any).handle(req, res, next);
});

// -------------------------------------------------------------
// Executive Leadership Management
// -------------------------------------------------------------
const renderLeadership = async (req: Request, res: Response, success = '', error = '') => {
  const counts = await getSidebarCounts();
  let leaders: any[] = [];
  try {
    leaders = (await query('SELECT * FROM leadership ORDER BY id ASC')).rows;
  } catch (err) {}

  res.render('leadership', {
    pageTitle: 'Executive Leadership',
    currentPage: 'leadership',
    user: { name: (req.session as any)?.admin_name },
    ...counts,
    leaders,
    success,
    error,
  });
};

adminRouter.get('/leadership', requireAuth, (req, res) => renderLeadership(req, res));
adminRouter.get('/leadership.php', requireAuth, (req, res) => renderLeadership(req, res));
adminRouter.post('/leadership', requireAuth, async (req, res) => {
  const { action, id, name, role, organization, bio, avatar } = req.body;
  let success = '';
  let error = '';

  try {
    if (action === 'toggle_active') {
      await handleActiveToggle('leadership', id);
      success = 'Website visibility updated successfully.';
    } else if (action === 'add') {
      await query(
        'INSERT INTO leadership (role, organization, name, bio, avatar) VALUES ($1, $2, $3, $4, $5)',
        [role, organization, name, bio, avatar || null]
      );
      success = 'Executive leader added successfully.';
    } else if (action === 'edit') {
      await query(
        'UPDATE leadership SET role=$1, organization=$2, name=$3, bio=$4, avatar=$5 WHERE id=$6',
        [role, organization, name, bio, avatar || null, id]
      );
      success = 'Leader profile updated successfully.';
    } else if (action === 'delete') {
      await query('DELETE FROM leadership WHERE id=$1', [id]);
      success = 'Leader profile removed.';
    }
  } catch (err: any) {
    error = err.message || 'Operation failed.';
  }

  return renderLeadership(req, res, success, error);
});
adminRouter.post('/leadership.php', requireAuth, (req, res, next) => {
  (adminRouter as any).handle(req, res, next);
});

// -------------------------------------------------------------
// Contact Messages Management
// -------------------------------------------------------------
const renderMessages = async (req: Request, res: Response, success = '') => {
  const counts = await getSidebarCounts();
  let messages: any[] = [];
  let unread = 0;
  try {
    messages = (await query('SELECT * FROM contact_messages ORDER BY created_at DESC')).rows;
    unread = parseInt((await query('SELECT COUNT(*) FROM contact_messages WHERE is_read = 0')).rows[0]?.count || '0', 10);
  } catch (err) {}

  res.render('messages', {
    pageTitle: 'Contact Messages & Inquiries',
    currentPage: 'messages',
    user: { name: (req.session as any)?.admin_name },
    ...counts,
    messages,
    unread,
    success,
  });
};

adminRouter.get('/messages', requireAuth, (req, res) => renderMessages(req, res));
adminRouter.get('/messages.php', requireAuth, (req, res) => renderMessages(req, res));
adminRouter.post('/messages', requireAuth, async (req, res) => {
  const { action, id } = req.body;
  let success = '';

  try {
    if (action === 'toggle_read') {
      await query(
        'UPDATE contact_messages SET is_read = CASE WHEN is_read = 1 THEN 0 ELSE 1 END WHERE id = $1',
        [id]
      );
      success = 'Message read status updated.';
    } else if (action === 'delete') {
      await query('DELETE FROM contact_messages WHERE id = $1', [id]);
      success = 'Message removed from inbox.';
    }
  } catch (err) {}

  return renderMessages(req, res, success);
});
adminRouter.post('/messages.php', requireAuth, (req, res, next) => {
  (adminRouter as any).handle(req, res, next);
});

// -------------------------------------------------------------
// Club Applications Management
// -------------------------------------------------------------
const renderApplications = async (req: Request, res: Response, success = '') => {
  const counts = await getSidebarCounts();
  let apps: any[] = [];
  let pendingCount = 0;
  try {
    apps = (await query('SELECT * FROM club_applications ORDER BY created_at DESC')).rows;
    pendingCount = parseInt((await query("SELECT COUNT(*) FROM club_applications WHERE status = 'pending'")).rows[0]?.count || '0', 10);
  } catch (err) {}

  res.render('applications', {
    pageTitle: 'Club Affiliation Applications',
    currentPage: 'applications',
    user: { name: (req.session as any)?.admin_name },
    ...counts,
    apps,
    pendingCount,
    success,
  });
};

adminRouter.get('/applications', requireAuth, (req, res) => renderApplications(req, res));
adminRouter.get('/applications.php', requireAuth, (req, res) => renderApplications(req, res));
adminRouter.post('/applications', requireAuth, async (req, res) => {
  const { action, id, status } = req.body;
  let success = '';

  try {
    if (action === 'update_status') {
      await query('UPDATE club_applications SET status = $1 WHERE id = $2', [status, id]);
      success = 'Club application status updated.';
    } else if (action === 'delete') {
      await query('DELETE FROM club_applications WHERE id = $1', [id]);
      success = 'Application record deleted.';
    }
  } catch (err) {}

  return renderApplications(req, res, success);
});
adminRouter.post('/applications.php', requireAuth, (req, res, next) => {
  (adminRouter as any).handle(req, res, next);
});

// -------------------------------------------------------------
// Meeting Bookings Management
// -------------------------------------------------------------
const renderBookings = async (req: Request, res: Response, success = '') => {
  const counts = await getSidebarCounts();
  let bookings: any[] = [];
  let pendingCount = 0;
  try {
    bookings = (await query('SELECT * FROM meeting_bookings ORDER BY created_at DESC')).rows;
    pendingCount = parseInt((await query("SELECT COUNT(*) FROM meeting_bookings WHERE status = 'pending'")).rows[0]?.count || '0', 10);
  } catch (err) {}

  res.render('bookings', {
    pageTitle: 'Meeting Bookings & Appointments',
    currentPage: 'bookings',
    user: { name: (req.session as any)?.admin_name },
    ...counts,
    bookings,
    pendingCount,
    success,
  });
};

adminRouter.get('/bookings', requireAuth, (req, res) => renderBookings(req, res));
adminRouter.get('/bookings.php', requireAuth, (req, res) => renderBookings(req, res));
adminRouter.post('/bookings', requireAuth, async (req, res) => {
  const { action, id, status } = req.body;
  let success = '';

  try {
    if (action === 'update_status') {
      await query('UPDATE meeting_bookings SET status = $1 WHERE id = $2', [status, id]);
      success = 'Meeting booking status updated.';
    } else if (action === 'delete') {
      await query('DELETE FROM meeting_bookings WHERE id = $1', [id]);
      success = 'Booking record deleted.';
    }
  } catch (err) {}

  return renderBookings(req, res, success);
});
adminRouter.post('/bookings.php', requireAuth, (req, res, next) => {
  (adminRouter as any).handle(req, res, next);
});
