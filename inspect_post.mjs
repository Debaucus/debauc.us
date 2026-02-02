import { createClient } from '@libsql/client';

const client = createClient({
  url: 'file:./apps/cms/local.db',
});

async function main() {
  try {
    const result = await client.execute({
        sql: "SELECT slug, title, content, content_html FROM posts WHERE slug = ?",
        args: ["beadie"]
    });
    console.log("Post 'beadie':");
    console.log(JSON.stringify(result.rows, null, 2));
  } catch (e) {
    console.error(e);
  }
}

main();
