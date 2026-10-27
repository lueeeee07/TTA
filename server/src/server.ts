import express, { Request, Response, NextFunction } from 'express';
import session from 'express-session';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { apiRouter } from './routes/api.js';
import { adminRouter } from './routes/admin.js';
import { testConnection } from './db/index.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 5000;

// Set up EJS view engine with resilient path resolution for dev and prod
const viewsPath = fs.existsSync(path.join(__dirname, 'views'))
  ? path.join(__dirname, 'views')
  : path.resolve(__dirname, '../src/views');

app.set('view engine', 'ejs');
app.set('views', viewsPath);

// Trust proxy for secure cookies behind reverse proxies (Render, Heroku, Fly)
app.set('trust proxy', 1);

// Middleware
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map((o) => o.trim())
  : ['http://localhost:5173', 'http://localhost:5000', 'http://localhost:3000'];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, server-to-server)
      if (!origin || allowedOrigins.includes(origin) || origin.includes('localhost')) {
        callback(null, true);
      } else {
        callback(null, true); // Permissive for public API
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Cache-Control', 'Pragma', 'Origin', 'Accept'],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'tta-development-secret-key-2026',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      sameSite: 'lax',
    },
  })
);

// Serve admin static CSS/JS assets
app.use('/admin-assets', express.static(path.resolve(__dirname, '../public')));

// Serve root public assets (images, editorial photos)
app.use('/assets', express.static(path.resolve(__dirname, '../../public/assets')));

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'TTA Backend Service',
    time: new Date().toISOString(),
  });
});

// Mount API routes across both clean paths and legacy PHP paths
app.use('/api', apiRouter);
app.use('/TTA/api/endpoints', apiRouter);
app.use('/api/endpoints', apiRouter);

// Mount Admin routes
app.use('/admin', adminRouter);
app.use('/TTA/admin', adminRouter);

// Serve React production build if available
const distPath = path.resolve(__dirname, '../../dist');
app.use(express.static(distPath));
app.use('/TTA', express.static(distPath));
app.use('/TTA/assets', express.static(path.resolve(distPath, 'assets')));

// Redirect legacy /TTA and /TTA/* routes to root equivalents
app.get('/TTA', (req: Request, res: Response) => {
  res.redirect('/');
});
app.get('/TTA/*', (req: Request, res: Response, next: NextFunction) => {
  if (req.path.startsWith('/TTA/api') || req.path.startsWith('/TTA/admin')) {
    return next();
  }
  const subPath = req.path.replace(/^\/TTA/, '') || '/';
  res.redirect(subPath);
});

// SPA fallback for frontend client-side routes (e.g. /about, /programs, /clubs)
app.get('*', (req: Request, res: Response, next: NextFunction) => {
  if (
    req.path.startsWith('/api') ||
    req.path.startsWith('/admin') ||
    req.path.startsWith('/admin-assets')
  ) {
    return next();
  }
  const indexPath = path.resolve(distPath, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      next();
    }
  });
});

// Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Unhandled Server Error:', err);
  if (req.path.startsWith('/api')) {
    res.status(500).json({ error: 'Internal Server Error' });
  } else {
    res.status(500).send('Internal Server Error');
  }
});

// Start server
app.listen(PORT, async () => {
  console.log(`🎾 Tanzania Tennis Association (TTA) Server running on http://localhost:${PORT}`);
  console.log(`📊 Admin Portal available at: http://localhost:${PORT}/admin`);
  console.log(`🔌 API available at: http://localhost:${PORT}/api/`);
  await testConnection();
});

export default app;
