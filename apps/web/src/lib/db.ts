import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from './schema';
import path from "path";

const url = process.env.TURSO_DATABASE_URL || "file:../../apps/cms/local.db";
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!process.env.TURSO_DATABASE_URL) {
  const dbPath = path.resolve(process.cwd(), "../../apps/cms/local.db");
  console.log(`[DB Debug] CWD: ${process.cwd()}`);
  console.log(`[DB Debug] Attempting to connect to local DB at: ${dbPath}`);
}

const client = createClient({
  url,
  authToken,
});

export const db = drizzle(client, { schema });
