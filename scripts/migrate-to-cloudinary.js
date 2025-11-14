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

// Upload single image
async function uploadImage(imagePath, cloudinaryPath) {
  try {
    const result = await cloudinary.uploader.upload(imagePath, {
      folder: cloudinaryPath,
      use_filename: true,
      unique_filename: false,
      overwrite: false,
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

// Main migration function
async function migrateImages() {
  console.log('🚀 Starting image migration to Cloudinary...\n');
  
  // Test connection first
  const connected = await testConnection();
  if (!connected) {
    process.exit(1);
  }
  
  // Load manifest
  const manifestPath = path.join(__dirname, 'images-manifest.json');
  if (!fs.existsSync(manifestPath)) {
    console.error('❌ Run audit-images.js first to create manifest');
    process.exit(1);
  }
  
  const images = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  console.log(`📦 Found ${images.length} images to migrate\n`);
  
  // Create results tracking
  const results = {
    success: [],
    failed: [],
    mapping: {}
  };
  
  // Upload with progress
  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    const progress = `[${i + 1}/${images.length}]`;
    
    // Determine Cloudinary folder structure
    // e.g., "gallery/templa/1.jpg" -> folder: "woodcarver/gallery/templa"
    const pathParts = img.relativePath.split('/');
    const fileName = pathParts.pop();
    const cloudinaryFolder = 'woodcarver/' + pathParts.join('/');
    
    process.stdout.write(`${progress} Uploading ${img.relativePath}... `);
    
    const result = await uploadImage(img.path, cloudinaryFolder);
    
    if (result.success) {
      console.log('✅');
      results.success.push(img.relativePath);
      
      // Store mapping for later use
      results.mapping[`/images/${img.relativePath}`] = result.publicId;
    } else {
      console.log(`❌ ${result.error}`);
      results.failed.push({
        path: img.relativePath,
        error: result.error
      });
    }
    
    // Small delay to avoid rate limits
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  // Save results
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const resultsPath = path.join(__dirname, `migration-results-${timestamp}.json`);
  fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));
  
  // Summary
  console.log('\n=== MIGRATION COMPLETE ===\n');
  console.log(`✅ Successful: ${results.success.length}`);
  console.log(`❌ Failed: ${results.failed.length}`);
  console.log(`\n📄 Results saved to: ${resultsPath}\n`);
  
  if (results.failed.length > 0) {
    console.log('Failed uploads:');
    results.failed.forEach(f => console.log(`  - ${f.path}: ${f.error}`));
  }
}

// Run migration
migrateImages().catch(console.error);