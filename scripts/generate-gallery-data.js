require('dotenv').config({ path: '.env.local' });
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
const nodeConfig = require('../src/config/node.config');

const FOLDER_PREFIX = nodeConfig.cloudinary.folderPrefix;

cloudinary.config({
  cloud_name: nodeConfig.cloudinary.cloudName,
  api_key: nodeConfig.cloudinary.apiKey,
  api_secret: nodeConfig.cloudinary.apiSecret
});

async function generateGalleryData() {
  console.log('📊 Generating gallery data from Cloudinary...\n');
  console.log(`📁 Using folder prefix: "${FOLDER_PREFIX}"\n`);

  try {
    // Get all resources from Cloudinary
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: `${FOLDER_PREFIX}/gallery/`,
      max_results: 500
    });
    const galleryData = {};
    
    // Group by category
    result.resources.forEach(resource => {
      const publicId = resource.public_id;
      
      // Extract category from path: artistFolio/gallery/[category]/[image]
      const match = publicId.match(/gallery\/([^\/]+)\//);
      if (!match) return;
      
      const category = match[1];
      
      if (!galleryData[category]) {
        galleryData[category] = {
          title: category.charAt(0).toUpperCase() + category.slice(1),
          hero: `${FOLDER_PREFIX}/gallery/${category}/hero`,
          images: []
        };
        console.log(`category: ${category}`);
      }
      
      // Skip hero image from images array
      if (!publicId.endsWith('/hero')) {
        galleryData[category].images.push(publicId);
      }
    });

    // Sort images numerically if possible
    Object.keys(galleryData).forEach(category => {
      galleryData[category].images.sort((a, b) => {
        const numA = parseInt(a.match(/(\d+)$/)?.[1] || '0');
        const numB = parseInt(b.match(/(\d+)$/)?.[1] || '0');
        return numA - numB;
      });
    });

    // Save to file
    const outputPath = path.join(__dirname, '../src/data/galleryData.json');
    fs.writeFileSync(outputPath, JSON.stringify(galleryData, null, 2));

    console.log('✅ Gallery data generated successfully!\n');
    console.log(`📁 Categories found: ${Object.keys(galleryData).length}`);
    Object.keys(galleryData).forEach(cat => {
      console.log(`   - ${cat}: ${galleryData[cat].images.length} images`);
    });
    console.log('');

  } catch (error) {
    console.error('❌ Failed to generate gallery data:', error.message);
  }
}

if (require.main === module) {
  generateGalleryData().catch(console.error);
}

module.exports = { generateGalleryData };