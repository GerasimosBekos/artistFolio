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

async function uploadImage(localPath, cloudinaryPath, fullFolderPath) {
  try {
    const result = await cloudinary.uploader.upload(localPath, {
      public_id: cloudinaryPath,
      overwrite: true,
      resource_type: 'auto',
      folder: fullFolderPath
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

async function uploadSpecificFolder(folderPath, category) {
  console.log('🚀 Starting Cloudinary Upload\n');
  
  const cloudinaryPath = `gallery/${category}`;
  const fullFolderPath = `${FOLDER_PREFIX}/${cloudinaryPath}`;
  console.log(`📁 Cloudinary Full Path: ${fullFolderPath}\n`);
  
  // Resolve the folder path
  const targetFolder = path.isAbsolute(folderPath) 
    ? folderPath 
    : path.join(__dirname, folderPath);
  
  // Check if folder exists
  if (!fs.existsSync(targetFolder)) {
    console.log(`❌ Folder not found: ${targetFolder}\n`);
    return;
  }

  // Check if it's a directory
  if (!fs.statSync(targetFolder).isDirectory()) {
    console.log(`❌ Path is not a directory: ${targetFolder}\n`);
    return;
  }

  console.log(`📂 Local folder: ${targetFolder}\n`);
  console.log(`🏷️  Category: ${category}\n`);
  
  // Scan starting from targetFolder, using empty prefix since folder path is set separately
  const images = scanImagesDirectory(targetFolder, targetFolder, '');
  
  if (images.length === 0) {
    console.log(`❌ No images found in ${targetFolder}\n`);
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
    
    const result = await uploadImage(img.localPath, img.cloudinaryPath, fullFolderPath);
    
    if (result.success) {
      console.log('✅');
      results.success.push(img.cloudinaryPath);
      results.mapping[img.localPath] = `${fullFolderPath}/${img.cloudinaryPath}`;
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
  // Get folder path and category from command line arguments
  const folderArg = process.argv[2];
  const category = process.argv[3];
  
  if (!folderArg || !category) {
    console.log('❌ Please provide both folder path and category name\n');
    console.log('Usage: node script.js <folder-path> <category>\n');
    console.log('Examples:');
    console.log('  node script.js ../public/images/lipsanothikes lipsanothikes');
    console.log('  node script.js ./local-folder nature');
    console.log('  node script.js /absolute/path/to/folder portraits\n');
    console.log('This will upload to: {prefix}/gallery/{category}/\n');
    process.exit(1);
  }
  
  uploadSpecificFolder(folderArg, category).catch(console.error);
}

module.exports = { uploadSpecificFolder };