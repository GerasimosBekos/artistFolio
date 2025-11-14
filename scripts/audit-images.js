const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public/images');

function scanDirectory(dir, baseDir = dir) {
  let images = [];
  
  const items = fs.readdirSync(dir);
  
  items.forEach(item => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      images = images.concat(scanDirectory(fullPath, baseDir));
    } else if (/\.(jpg|jpeg|png|gif|webp)$/i.test(item)) {
      const relativePath = path.relative(baseDir, fullPath);
      images.push({
        path: fullPath,
        relativePath: relativePath.replace(/\\/g, '/'),
        name: item,
        size: (stat.size / 1024).toFixed(2) + ' KB'
      });
    }
  });
  
  return images;
}

const images = scanDirectory(publicDir);

console.log('\n=== IMAGE AUDIT ===\n');
console.log(`Total images found: ${images.length}\n`);

// Group by folder
const grouped = images.reduce((acc, img) => {
  const folder = img.relativePath.split('/')[0] || 'root';
  if (!acc[folder]) acc[folder] = [];
  acc[folder].push(img);
  return acc;
}, {});

Object.keys(grouped).sort().forEach(folder => {
  console.log(`\n📁 ${folder}/ (${grouped[folder].length} images)`);
  grouped[folder].forEach(img => {
    console.log(`   - ${img.name} (${img.size})`);
  });
});

const totalSize = images.reduce((sum, img) => {
  return sum + parseFloat(img.size);
}, 0);

console.log(`\n📊 Total size: ${(totalSize / 1024).toFixed(2)} MB\n`);

// Save to JSON for migration script
fs.writeFileSync(
  path.join(__dirname, 'images-manifest.json'),
  JSON.stringify(images, null, 2)
);

console.log('✅ Manifest saved to scripts/images-manifest.json\n');