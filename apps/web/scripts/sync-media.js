import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define paths
const WEB_ROOT = path.resolve(__dirname, '..');
const CMS_MEDIA_PATH = path.resolve(WEB_ROOT, '../../apps/cms/media');
const PUBLIC_MEDIA_PATH = path.resolve(WEB_ROOT, 'src/assets/media');

console.log('🔄 Syncing media assets...');
console.log(`FROM: ${CMS_MEDIA_PATH}`);
console.log(`TO:   ${PUBLIC_MEDIA_PATH}`);

// Ensure source exists
if (!fs.existsSync(CMS_MEDIA_PATH)) {
    console.warn(`⚠️ Warning: CMS media directory not found at ${CMS_MEDIA_PATH}`);
    console.warn('Skipping media sync. Images might be missing in production if not handled otherwise.');
    process.exit(0);
}

// Ensure destination exists
if (!fs.existsSync(PUBLIC_MEDIA_PATH)) {
    console.log(`Creating directory: ${PUBLIC_MEDIA_PATH}`);
    fs.mkdirSync(PUBLIC_MEDIA_PATH, { recursive: true });
}

// Copy files
try {
    const files = fs.readdirSync(CMS_MEDIA_PATH);
    let count = 0;

    for (const file of files) {
        const srcFile = path.join(CMS_MEDIA_PATH, file);
        const destFile = path.join(PUBLIC_MEDIA_PATH, file);
        
        // Skip directories for now (unless recursive is needed later)
        if (fs.lstatSync(srcFile).isDirectory()) continue;

        fs.copyFileSync(srcFile, destFile);
        count++;
    }

    console.log(`✅ Successfully synced ${count} media files.`);
} catch (error) {
    console.error('❌ Error syncing media files:', error);
    process.exit(1);
}
