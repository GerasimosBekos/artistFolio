require('dotenv').config({ path: '.env.local' });
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

async function debugCloudinary() {
  console.log('\n=== CLOUDINARY DEBUG ===\n');
  
  // 1. Check credentials
  console.log('1. Checking credentials...');
  console.log(`   Cloud Name: ${process.env.CLOUDINARY_CLOUD_NAME}`);
  console.log(`   API Key: ${process.env.CLOUDINARY_API_KEY ? '✅ Set' : '❌ Missing'}`);
  console.log(`   API Secret: ${process.env.CLOUDINARY_API_SECRET ? '✅ Set' : '❌ Missing'}`);
  
  // 2. Test connection
  console.log('\n2. Testing connection...');
  try {
    await cloudinary.api.ping();
    console.log('   ✅ Connection successful');
  } catch (error) {
    console.log('   ❌ Connection failed:', error.message);
    return;
  }
  
  // 3. List all uploaded images
  console.log('\n3. Fetching uploaded images...');
  try {
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'woodcarver/',
      max_results: 500
    });
    
    console.log(`   Found ${result.resources.length} images\n`);
    
    // Group by folder
    const grouped = {};
    result.resources.forEach(resource => {
      const parts = resource.public_id.split('/');
      const folder = parts.slice(0, -1).join('/');
      if (!grouped[folder]) grouped[folder] = [];
      grouped[folder].push({
        publicId: resource.public_id,
        url: resource.secure_url,
        format: resource.format,
        size: (resource.bytes / 1024).toFixed(2) + ' KB'
      });
    });
    
    // Print organized list
    Object.keys(grouped).sort().forEach(folder => {
      console.log(`\n   📁 ${folder}/ (${grouped[folder].length} images)`);
      grouped[folder].forEach(img => {
        console.log(`      - ${img.publicId.split('/').pop()} (${img.format}, ${img.size})`);
      });
    });
    
    // 4. Test a specific image URL
    console.log('\n4. Testing image URL generation...');
    if (result.resources.length > 0) {
      const testImage = result.resources[0];
      const testUrl = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/w_800,q_auto,f_auto/${testImage.public_id}`;
      console.log(`   Test URL: ${testUrl}`);
      console.log(`   👆 Copy this URL and paste in browser to test`);
    }
    
  } catch (error) {
    console.log('   ❌ Failed to fetch images:', error.message);
  }
}

debugCloudinary().catch(console.error);