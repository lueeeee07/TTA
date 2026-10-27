import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool, testConnection } from './index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function runMigrations() {
  console.log('🚀 Running database migrations...');

  const connected = await testConnection();
  if (!connected) {
    console.error('❌ Cannot run migrations: database connection failed.');
    console.error('Please configure DATABASE_URL in .env (e.g. Supabase connection string)');
    process.exit(1);
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const schemaPath = path.resolve(__dirname, 'schema.sql');
    const seedPath = path.resolve(__dirname, 'seed.sql');

    console.log('📄 Executing schema.sql...');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    await client.query(schemaSql);
    console.log('✅ Schema migration completed.');

    console.log('🌱 Executing seed.sql...');
    const seedSql = fs.readFileSync(seedPath, 'utf8');
    await client.query(seedSql);
    console.log('✅ Seed data applied.');

    await client.query('COMMIT');
    console.log('🎉 Migrations successfully completed!');
  } catch (err: any) {
    await client.query('ROLLBACK');
    console.error('❌ Migration failed:', err.message);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

// If run directly from command line
if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  runMigrations();
}
