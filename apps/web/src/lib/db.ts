import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from './schema';
import path from "path";

const getDbUrl = () => {
  if (process.env.TURSO_DATABASE_URL) {
    return process.env.TURSO_DATABASE_URL;
  }

  // Fallback to local DB
  // Check if we are in apps/web (local dev) or root (Cloudflare build)
  const cwd = process.cwd();
  const isWebDir = cwd.endsWith("web") || cwd.endsWith("web" + path.sep);
  const relativePath = isWebDir
    ? "../../apps/cms/local.db"
    : "apps/cms/local.db";

  return `file:${relativePath}`;
};

const url = getDbUrl();
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!process.env.TURSO_DATABASE_URL) {
  const cwd = process.cwd();
  const isWebDir = cwd.endsWith("web") || cwd.endsWith("web" + path.sep);
  const relativePath = isWebDir
    ? "../../apps/cms/local.db"
    : "apps/cms/local.db";
  const dbPath = path.resolve(cwd, relativePath);

  console.log(`[DB Debug] CWD: ${cwd}`);
  console.log(`[DB Debug] Is Web Dir: ${isWebDir}`);
  console.log(`[DB Debug] Resolved Relative Path: ${relativePath}`);
  console.log(`[DB Debug] Absolute DB Path: ${dbPath}`);
}

const client = createClient({
  url,
  authToken,
});

export const db = drizzle(client, { schema });
