import { getPayload } from 'payload'
import config from '@payload-config'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config({ path: path.resolve(process.cwd(), '.env') })

async function run() {
  const payload = await getPayload({ config })
  const allMedia = await payload.find({
    collection: 'media',
    limit: 1000,
  })
  
  console.log('Media filenames in CMS:')
  allMedia.docs.forEach((doc: any) => {
    console.log(`- ${doc.filename} (ID: ${doc.id})`)
  })
  process.exit(0)
}

run()
