import { createClient } from '@libsql/client';

const client = createClient({
  url: 'file:./apps/cms/local.db',
});

async function main() {
  try {
    const result = await client.execute("SELECT id, url, filename FROM media");
    console.log("Media table:");
    console.log(JSON.stringify(result.rows, null, 2));
  } catch (e) {
    console.error(e);
  }
}

main();
