import { createClient } from '@libsql/client';

const client = createClient({
  url: 'file:./apps/cms/local.db',
});

async function main() {
  try {
    const result = await client.execute("SELECT slug, title, content_html FROM posts");
    for (const row of result.rows) {
      if (row.content_html && (row.content_html.includes('href') || row.content_html.includes('a '))) {
        console.log(`Post: ${row.slug}`);
        // match all a tags
        const regex = /<a [^>]*href="([^"]*)"[^>]*>/g;
        let match;
        while ((match = regex.exec(row.content_html)) !== null) {
          console.log(`  Link: ${match[1]}`);
        }
      }
    }
  } catch (e) {
    console.error(e);
  }
}

main();
