require('dotenv').config({ path: '.env.local' });
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
const nodeConfig = require('../config/node.config');

const FOLDER_PREFIX = nodeConfig.cloudinary.folderPrefix;

cloudinary.config({
  cloud_name: nodeConfig.cloudinary.cloudName,
  api_key: nodeConfig.cloudinary.apiKey,
  api_secret: nodeConfig.cloudinary.apiSecret
});


async function uploadImage(localPath, cloudinaryPath) {
  try {
    const result = await cloudinary.uploader.upload(localPath, {
      public_id: cloudinaryPath,
      overwrite: true,
      resource_type: 'auto',
      folder: FOLDER_PREFIX
    });
    
    return { success: true, url: result.secure_url };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

function scanImagesDirectory(dir, baseDir = dir, prefix = '') {
  let images = [];
  
  if (!fs.existsSync(dir)) {
    return images;
  }

  const items = fs.readdirSync(dir);
  
  items.forEach(item => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      const folderName = item;
      images = images.concat(
        scanImagesDirectory(fullPath, baseDir, prefix ? `${prefix}/${folderName}` : folderName)
      );
    } else if (/\.(jpg|jpeg|png|gif|webp)$/i.test(item)) {
      const fileName = item.replace(/\.(jpg|jpeg|png|gif|webp)$/i, '');
      const cloudinaryPath = prefix ? `${prefix}/${fileName}` : fileName;
      
      images.push({
        localPath: fullPath,
        cloudinaryPath: cloudinaryPath,
        fileName: item
      });
    }
  });
  
  return images;
}

async function uploadAllImages() {
  console.log('🚀 Starting Cloudinary Upload\n');
  console.log(`📁 Folder: ${FOLDER_PREFIX}\n`);

  const imageDir = path.join(__dirname, '../public/images');
  const images = scanImagesDirectory(imageDir);

  if (images.length === 0) {
    console.log('❌ No images found in public/images/\n');
    return;
  }

  console.log(`📦 Found ${images.length} images\n`);

  const results = {
    success: [],
    failed: [],
    mapping: {}
  };

  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    const progress = `[${i + 1}/${images.length}]`;
    
    process.stdout.write(`${progress} Uploading ${img.cloudinaryPath}... `);
    
    const result = await uploadImage(img.localPath, img.cloudinaryPath);
    
    if (result.success) {
      console.log('✅');
      results.success.push(img.cloudinaryPath);
      results.mapping[img.localPath] = `${FOLDER_PREFIX}/${img.cloudinaryPath}`;
    } else {
      console.log(`❌ ${result.error}`);
      results.failed.push({ path: img.localPath, error: result.error });
    }
    
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  // Save results
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const resultsPath = path.join(__dirname, `upload-results-${timestamp}.json`);
  fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));

  console.log('\n╔════════════════════════════════════════╗');
  console.log('║      UPLOAD COMPLETE                   ║');
  console.log('╚════════════════════════════════════════╝\n');
  console.log(`✅ Successful: ${results.success.length}/${images.length}`);
  console.log(`❌ Failed: ${results.failed.length}\n`);
  
  if (results.failed.length > 0) {
    console.log('Failed uploads:');
    results.failed.forEach(f => console.log(`  - ${f.path}: ${f.error}`));
    console.log('');
  }

  console.log(`📄 Results saved to: ${path.basename(resultsPath)}\n`);
}

if (require.main === module) {
  uploadAllImages().catch(console.error);
}

module.exports = { uploadAllImages };