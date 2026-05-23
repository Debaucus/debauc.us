import { createClient } from '@libsql/client';

const client = createClient({
  url: 'file:./apps/cms/local.db',
});

async function main() {
  try {
    const result = await client.execute("SELECT title, excerpt, content_html FROM posts");
    for (const row of result.rows) {
      console.log(`Title: ${row.title}`);
      console.log(`Excerpt: ${row.excerpt}`);
      if(row.content_html) console.log(`Content HTML Length: ${row.content_html.length}`);
      console.log('---');
    }
  } catch (e) {
    console.error(e);
  }
}

main();
