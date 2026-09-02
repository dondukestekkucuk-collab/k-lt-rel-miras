import { Pool } from 'pg';
import bcrypt from 'bcryptjs';

const connectionString =
  process.env.POSTGRES_URL ||
  process.env.DATABASE_URL ||
  process.env.PRISMA_DATABASE_URL;

let pool: Pool | null = null;

export function getDbPool(): Pool | null {
  if (!connectionString) {
    return null;
  }

  if (!pool) {
    pool = new Pool({
      connectionString,
      ssl: {
        rejectUnauthorized: false,
      },
      max: 10,
      idleTimeoutMillis: 30000,
    });
  }
  return pool;
}

let tablesInitialized = false;

export async function initDatabaseTables() {
  if (tablesInitialized) return;
  const p = getDbPool();
  if (!p) return;

  try {
    const client = await p.connect();
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS users (
          id VARCHAR(64) PRIMARY KEY,
          username VARCHAR(64) UNIQUE NOT NULL,
          full_name VARCHAR(128),
          password_hash VARCHAR(255) NOT NULL,
          grade VARCHAR(32) DEFAULT '5. Sınıf',
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );

        CREATE TABLE IF NOT EXISTS student_progress (
          user_id VARCHAR(64) PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
          session_data JSONB NOT NULL,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `);
      tablesInitialized = true;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Database initialization error:', error);
  }
}
