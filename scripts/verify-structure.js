require('dotenv').config({ path: '.env.local' });
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

async function verifyStructure() {
  console.log('🔍 Verifying Cloudinary structure...\n');
  
  try {
    // Get all root folders
    const folders = await cloudinary.api.root_folders();
    console.log('📁 Root folders:', folders.folders.map(f => f.name));
    
    // Get all resources
    const resources = await cloudinary.api.resources({
      type: 'upload',
      max_results: 500
    });
    
    console.log(`\n📦 Total images: ${resources.resources.length}\n`);
    
    // Group by folder
    const byFolder = {};
    resources.resources.forEach(r => {
      const parts = r.public_id.split('/');
      const folder = parts.length > 1 ? parts[0] : 'root';
      if (!byFolder[folder]) byFolder[folder] = [];
      byFolder[folder].push(r.public_id);
    });
    
    console.log('📂 Folder breakdown:\n');
    Object.keys(byFolder).sort().forEach(folder => {
      console.log(`   ${folder}/ (${byFolder[folder].length} files)`);
      byFolder[folder].slice(0, 3).forEach(file => {
        console.log(`      - ${file}`);
      });
      if (byFolder[folder].length > 3) {
        console.log(`      ... and ${byFolder[folder].length - 3} more`);
      }
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

verifyStructure().catch(console.error);