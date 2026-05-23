import { createClient } from '@libsql/client';

const client = createClient({
  url: 'file:./apps/cms/local.db',
});

async function main() {
  try {
    const result = await client.execute("SELECT slug, title, projectLink, content FROM posts");
    for (const row of result.rows) {
      console.log(`Post: ${row.slug}, Link: ${row.projectLink}`);
      if (row.content) {
         const str = JSON.stringify(row.content).toLowerCase();
         if (str.includes('casino') || str.includes('viagra') || str.includes('http')) {
             console.log(`  Suspicious content found in lexical json!`);
         }
      }
    }
  } catch (e) {
    console.error(e);
  }
}

main();
