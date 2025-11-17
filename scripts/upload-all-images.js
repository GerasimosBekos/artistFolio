require('dotenv').config({ path: '.env.local' });
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Map of all images and their Cloudinary destinations
const imagesToUpload = {
  // Hero images
  'hero/main': 'public/images/bg.jpg',
  'hero/about': 'public/images/about4.jpg',
  'hero/contact': 'public/images/contact.jpg',
  'hero/gallery': 'public/images/contact.jpg', // Gallery.js uses contact.jpg
  
  // Footer images
  'footer/main': 'public/images/footer.jpg',
  'footer/woodcarving1': 'public/images/woodcarving1.jpg',
  'footer/woodcarving2': 'public/images/woodcarving2.jpg',
  'footer/woodcarving3': 'public/images/woodcarving3.jpg',
  
  // Other images
  'other/artist': 'public/images/artist.jpeg',
  'other/hand_crop': 'public/images/hand_crop.jpg',
  'other/logo': 'public/images/logo.png',
  
  // Category images (for MainGallery.js)
  'categories/templo': 'public/images/categories/templo.jpg',
  'categories/prosk': 'public/images/categories/prosk.jpg',
  'categories/stasidia': 'public/images/categories/stasidia.jpg',
  'categories/epitafios': 'public/images/categories/epitafios.jpg',
  'categories/korniza': 'public/images/categories/korniza.jpg',
  'categories/stavros': 'public/images/categories/stavros.jpg',
  'categories/thronos': 'public/images/categories/thronos.jpg',
  'categories/pagkari': 'public/images/categories/pagkari.jpg',
  'categories/polithrona': 'public/images/categories/polithrona.jpg',
  'categories/amvonas': 'public/images/categories/amvonas.jpg',
  'categories/karekles': 'public/images/categories/karekles.jpg',
  'categories/psaltiri': 'public/images/categories/psaltiri.jpg',
  'categories/lipsanothiki': 'public/images/categories/lipsanothiki.jpg',
};

async function uploadAllImages() {
  console.log('🚀 Starting upload of all images to Cloudinary...\n');
  
  const results = { success: [], failed: [], mapping: {} };
  const entries = Object.entries(imagesToUpload);
  
  for (let i = 0; i < entries.length; i++) {
    const [publicId, localPath] = entries[i];
    const fullPath = path.join(__dirname, '..', localPath);
    const progress = `[${i + 1}/${entries.length}]`;
    
    if (!fs.existsSync(fullPath)) {
      console.log(`${progress} ⚠️  Skipping ${publicId} - file not found: ${localPath}`);
      results.failed.push({ publicId, error: 'File not found' });
      continue;
    }
    
    process.stdout.write(`${progress} Uploading ${publicId}... `);
    
    try {
      const result = await cloudinary.uploader.upload(fullPath, {
        public_id: publicId,
        folder: 'woodcarver',
        overwrite: true,
        resource_type: 'auto'
      });
      
      console.log('✅');
      results.success.push(publicId);
      results.mapping[localPath] = `woodcarver/${publicId}`;
      
    } catch (error) {
      console.log(`❌ ${error.message}`);
      results.failed.push({ publicId, error: error.message });
    }
    
    // Small delay to avoid rate limits
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  // Save mapping
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const mappingPath = path.join(__dirname, `all-images-mapping-${timestamp}.json`);
  fs.writeFileSync(mappingPath, JSON.stringify(results, null, 2));
  
  console.log('\n=== UPLOAD COMPLETE ===\n');
  console.log(`✅ Successful: ${results.success.length}`);
  console.log(`❌ Failed: ${results.failed.length}`);
  console.log(`\n📄 Mapping saved to: ${mappingPath}\n`);
  
  if (results.failed.length > 0) {
    console.log('Failed uploads:');
    results.failed.forEach(f => console.log(`  - ${f.publicId}: ${f.error}`));
  }
}

uploadAllImages().catch(console.error);