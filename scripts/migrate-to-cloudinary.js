require('dotenv').config({ path: '.env.local' });
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Test connection
async function testConnection() {
  try {
    await cloudinary.api.ping();
    console.log('✅ Cloudinary connection successful\n');
    return true;
  } catch (error) {
    console.error('❌ Cloudinary connection failed:', error.message);
    console.error('Check your credentials in .env.local\n');
    return false;
  }
}

// Upload single image with folder structure
async function uploadImage(imagePath, cloudinaryFolder, fileName) {
  try {
    const result = await cloudinary.uploader.upload(imagePath, {
      folder: cloudinaryFolder,           // The folder path: "woodcarver/hero"
      public_id: fileName,                // Just the filename: "main"
      use_filename: false,                // Don't use the original filename
      unique_filename: false,             // Don't add random suffix
      overwrite: true,                    // Overwrite if exists
      resource_type: 'auto'
    });
    
    return {
      success: true,
      url: result.secure_url,
      publicId: result.public_id
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

// Define all images to upload
const imagesToUpload = [
  // Hero images
  { localPath: 'public/images/hero/main.jpg', folder: 'woodcarver/hero', fileName: 'main' },
  { localPath: 'public/images/hero/about.jpg', folder: 'woodcarver/hero', fileName: 'about' },
  { localPath: 'public/images/hero/contact.jpg', folder: 'woodcarver/hero', fileName: 'contact' },
  { localPath: 'public/images/hero/gallery.jpg', folder: 'woodcarver/hero', fileName: 'gallery' },
  
  // Footer images
  { localPath: 'public/images/footer/main.jpg', folder: 'woodcarver/footer', fileName: 'main' },
  { localPath: 'public/images/footer/about.jpg', folder: 'woodcarver/footer', fileName: 'about' },
  { localPath: 'public/images/footer/contact.jpg', folder: 'woodcarver/footer', fileName: 'contact' },
  { localPath: 'public/images/footer/gallery.jpg', folder: 'woodcarver/footer', fileName: 'gallery' },
  
  // Other images
  { localPath: 'public/images/other/artist.jpg', folder: 'woodcarver/other', fileName: 'artist' },
  { localPath: 'public/images/other/logo.png', folder: 'woodcarver/other', fileName: 'logo' },
  { localPath: 'public/images/other/mainbg.png', folder: 'woodcarver/other', fileName: 'mainbg' },
  { localPath: 'public/images/other/texture.jpg', folder: 'woodcarver/other', fileName: 'texture' },
  { localPath: 'public/images/other/image_text_main.jpg', folder: 'woodcarver/other', fileName: 'image_text_main' },
  
  // Categories
  { localPath: 'public/images/categories/templo.jpg', folder: 'woodcarver/categories', fileName: 'templo' },
  { localPath: 'public/images/categories/prosk.jpg', folder: 'woodcarver/categories', fileName: 'prosk' },
  { localPath: 'public/images/categories/stasidia.jpg', folder: 'woodcarver/categories', fileName: 'stasidia' },
  { localPath: 'public/images/categories/epitafios.jpg', folder: 'woodcarver/categories', fileName: 'epitafios' },
  { localPath: 'public/images/categories/korniza.jpg', folder: 'woodcarver/categories', fileName: 'korniza' },
  { localPath: 'public/images/categories/stavros.jpg', folder: 'woodcarver/categories', fileName: 'stavros' },
  { localPath: 'public/images/categories/thronos.jpg', folder: 'woodcarver/categories', fileName: 'thronos' },
  { localPath: 'public/images/categories/pagkari.jpg', folder: 'woodcarver/categories', fileName: 'pagkari' },
  { localPath: 'public/images/categories/polithrona.jpg', folder: 'woodcarver/categories', fileName: 'polithrona' },
  { localPath: 'public/images/categories/amvonas.jpg', folder: 'woodcarver/categories', fileName: 'amvonas' },
  { localPath: 'public/images/categories/karekles.jpg', folder: 'woodcarver/categories', fileName: 'karekles' },
  { localPath: 'public/images/categories/psaltiri.jpg', folder: 'woodcarver/categories', fileName: 'psaltiri' },
  { localPath: 'public/images/categories/lipsanothiki.jpg', folder: 'woodcarver/categories', fileName: 'lipsanothiki' },
  
  // Gallery/templa
  { localPath: 'public/images/gallery/templa/templa.jpg', folder: 'woodcarver/gallery/templa', fileName: 'hero' },
  { localPath: 'public/images/gallery/templa/1.jpg', folder: 'woodcarver/gallery/templa', fileName: '1' },
  { localPath: 'public/images/gallery/templa/2.jpg', folder: 'woodcarver/gallery/templa', fileName: '2' },
  { localPath: 'public/images/gallery/templa/3.jpg', folder: 'woodcarver/gallery/templa', fileName: '3' },
  { localPath: 'public/images/gallery/templa/4.jpg', folder: 'woodcarver/gallery/templa', fileName: '4' },
  { localPath: 'public/images/gallery/templa/5.jpg', folder: 'woodcarver/gallery/templa', fileName: '5' },
  { localPath: 'public/images/gallery/templa/6.jpg', folder: 'woodcarver/gallery/templa', fileName: '6' },
  { localPath: 'public/images/gallery/templa/7.jpg', folder: 'woodcarver/gallery/templa', fileName: '7' },
  { localPath: 'public/images/gallery/templa/8.jpg', folder: 'woodcarver/gallery/templa', fileName: '8' },
  { localPath: 'public/images/gallery/templa/9.jpg', folder: 'woodcarver/gallery/templa', fileName: '9' },
  { localPath: 'public/images/gallery/templa/10.jpg', folder: 'woodcarver/gallery/templa', fileName: '10' },
  { localPath: 'public/images/gallery/templa/11.jpg', folder: 'woodcarver/gallery/templa', fileName: '11' },
  { localPath: 'public/images/gallery/templa/12.jpg', folder: 'woodcarver/gallery/templa', fileName: '12' },
];

// Main upload function
async function uploadAllImages() {
  console.log('🚀 Starting image upload to Cloudinary...\n');
  
  // Test connection first
  const connected = await testConnection();
  if (!connected) {
    process.exit(1);
  }
  
  console.log(`📦 Found ${imagesToUpload.length} images to upload\n`);
  
  // Track results
  const results = {
    success: [],
    failed: [],
    mapping: {},
    byFolder: {}
  };
  
  // Upload with progress
  for (let i = 0; i < imagesToUpload.length; i++) {
    const img = imagesToUpload[i];
    const progress = `[${i + 1}/${imagesToUpload.length}]`;
    const fullPath = path.join(__dirname, '..', img.localPath);
    
    // Check if file exists
    if (!fs.existsSync(fullPath)) {
      console.log(`${progress} ⚠️  SKIPPED: ${img.folder}/${img.fileName} - File not found`);
      results.failed.push({
        path: img.localPath,
        error: 'File not found'
      });
      continue;
    }
    
    process.stdout.write(`${progress} Uploading ${img.folder}/${img.fileName}... `);
    
    const result = await uploadImage(fullPath, img.folder, img.fileName);
    
    if (result.success) {
      console.log('✅');
      results.success.push(result.publicId);
      results.mapping[img.localPath] = result.publicId;
      
      // Track by folder
      if (!results.byFolder[img.folder]) {
        results.byFolder[img.folder] = [];
      }
      results.byFolder[img.folder].push(img.fileName);
    } else {
      console.log(`❌ ${result.error}`);
      results.failed.push({
        path: img.localPath,
        error: result.error
      });
    }
    
    // Small delay to avoid rate limits
    await new Promise(resolve => setTimeout(resolve, 150));
  }
  
  // Save results
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const resultsPath = path.join(__dirname, `upload-results-${timestamp}.json`);
  fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));
  
  // Summary
  console.log('\n=== UPLOAD COMPLETE ===\n');
  console.log(`✅ Successful: ${results.success.length}/${imagesToUpload.length}`);
  console.log(`❌ Failed: ${results.failed.length}`);
  console.log(`\n📄 Results saved to: ${resultsPath}\n`);
  
  console.log('📊 Images per folder:\n');
  Object.keys(results.byFolder).sort().forEach(folder => {
    console.log(`   ${folder}: ${results.byFolder[folder].length} images`);
  });
  
  if (results.failed.length > 0) {
    console.log('\n❌ Failed uploads:');
    results.failed.forEach(f => console.log(`   - ${f.path}: ${f.error}`));
  }
  
  console.log('\n💡 Check Cloudinary Dashboard → Media Library → Folders view\n');
}

// Run upload
uploadAllImages().catch(console.error);