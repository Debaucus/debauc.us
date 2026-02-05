import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from './schema';
import path from "path";

const getDbUrl = () => {
  if (process.env.TURSO_DATABASE_URL) {
    return process.env.TURSO_DATABASE_URL;
  }

  // Fallback to local DB
  const cwd = process.cwd();
  const isWebDir = cwd.endsWith("web") || cwd.endsWith("web" + path.sep);
  const relativePath = isWebDir
    ? "../../apps/cms/local.db"
    : "apps/cms/local.db";
  const absolutePath = path.resolve(cwd, relativePath);

  return `file:${absolutePath}`;
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

  try {
    const fs = require("fs");
    console.log(`[DB Debug] File exists: ${fs.existsSync(dbPath)}`);
  } catch (e) {
    console.log("[DB Debug] Failed to check file existence:", e);
  }
}

const client = createClient({
  url,
  authToken,
});

export const db = drizzle(client, { schema });
