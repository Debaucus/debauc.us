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

const client = createClient({
  url,
  authToken,
});

export const db = drizzle(client, { schema });
