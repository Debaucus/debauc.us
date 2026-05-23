import { createClient } from '@libsql/client';

const client = createClient({
  url: 'file:./apps/cms/local.db',
});

async function main() {
  try {
    const result = await client.execute("SELECT content_html, content FROM posts WHERE title LIKE '%CloudFlare Cache Bug%'");
    if(result.rows.length > 0) {
      console.log(result.rows[0].content_html || JSON.stringify(result.rows[0].content, null, 2));
    }
  } catch (e) {
    console.error(e);
  }
}

main();
