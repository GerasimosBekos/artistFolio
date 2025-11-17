require('dotenv').config({ path: '.env.local' });
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

async function deleteAllImages() {
  console.log('🗑️  Starting deletion of all woodcarver images...\n');
  
  try {
    // Get all resources in the woodcarver folder
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'woodcarver/',
      max_results: 500
    });
    
    console.log(`Found ${result.resources.length} images to delete\n`);
    
    if (result.resources.length === 0) {
      console.log('No images found. Nothing to delete.');
      return;
    }
    
    // Delete all resources
    const publicIds = result.resources.map(r => r.public_id);
    
    for (let i = 0; i < publicIds.length; i++) {
      const publicId = publicIds[i];
      const progress = `[${i + 1}/${publicIds.length}]`;
      
      process.stdout.write(`${progress} Deleting ${publicId}... `);
      
      try {
        await cloudinary.uploader.destroy(publicId);
        console.log('✅');
      } catch (error) {
        console.log(`❌ ${error.message}`);
      }
      
      // Small delay to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    
    // Delete the woodcarver folder itself
    console.log('\n🗑️  Deleting woodcarver folder...');
    try {
      await cloudinary.api.delete_folder('woodcarver');
      console.log('✅ Folder deleted\n');
    } catch (error) {
      console.log(`⚠️  Folder deletion: ${error.message}\n`);
    }
    
    console.log('=== DELETION COMPLETE ===\n');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

deleteAllImages().catch(console.error);