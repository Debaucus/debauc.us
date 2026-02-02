import { createClient } from '@libsql/client';

const client = createClient({
  url: 'file:./apps/cms/local.db',
});

async function main() {
  try {
    const result = await client.execute("PRAGMA table_info(posts)");
    console.log("Columns in 'posts' table:");
    console.log(JSON.stringify(result.rows, null, 2));
  } catch (e) {
    console.error(e);
  }
}

main();
