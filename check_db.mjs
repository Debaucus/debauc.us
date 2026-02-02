import { createClient } from '@libsql/client';

const client = createClient({
  url: 'file:./apps/cms/local.db',
});

async function main() {
  try {
    const rels = await client.execute("PRAGMA table_info(posts_rels)");
    console.log("posts_rels Columns:", JSON.stringify(rels.rows, null, 2));
  } catch (e) {
    console.error(e);
  }
}

main();
