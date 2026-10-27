import pg from 'pg';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const { Pool } = pg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Determine database configuration
const connectionString = process.env.DATABASE_URL;

const poolConfig: pg.PoolConfig = connectionString
  ? {
      connectionString,
      ssl:
        process.env.DATABASE_SSL === 'false'
          ? false
          : { rejectUnauthorized: false },
    }
  : {
      host: process.env.PGHOST || 'localhost',
      port: Number(process.env.PGPORT || 5432),
      user: process.env.PGUSER || 'postgres',
      password: process.env.PGPASSWORD || 'postgres',
      database: process.env.PGDATABASE || 'tta_db',
    };

export const pool = new Pool(poolConfig);

let isConnected = false;
let connectionAttempted = false;

// Fallback in-memory store in case PostgreSQL is temporarily unavailable locally
const inMemoryStore: Record<string, any[]> = {};

function initInMemoryFallback() {
  try {
    const seedPath = path.resolve(__dirname, 'seed.sql');
    if (fs.existsSync(seedPath)) {
      // Basic fallback data initialization if needed
    }
  } catch (err) {
    // Ignore fallback init errors
  }
}

export async function testConnection(): Promise<boolean> {
  if (connectionAttempted) return isConnected;
  connectionAttempted = true;
  try {
    const client = await pool.connect();
    isConnected = true;
    client.release();
    console.log('✅ Connected to PostgreSQL database');
    return true;
  } catch (err: any) {
    isConnected = false;
    console.warn(`⚠️ PostgreSQL connection not available (${err.message}).`);
    console.warn('Set DATABASE_URL in .env to connect to your Supabase PostgreSQL instance.');
    return false;
  }
}

export async function query(text: string, params?: any[]): Promise<pg.QueryResult<any>> {
  try {
    return await pool.query(text, params);
  } catch (err: any) {
    // If not connected yet or error occurred, re-test connection
    throw err;
  }
}

export default {
  pool,
  query,
  testConnection,
};
