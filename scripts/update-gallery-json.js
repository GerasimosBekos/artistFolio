const fs = require('fs');
const path = require('path');

// Load migration results
const resultsFile = fs.readdirSync(__dirname)
  .filter(f => f.startsWith('migration-results-'))
  .sort()
  .pop();

if (!resultsFile) {
  console.error('❌ No migration results found. Run migration first.');
  process.exit(1);
}

const results = JSON.parse(
  fs.readFileSync(path.join(__dirname, resultsFile), 'utf8')
);

// Load current gallery data
const galleryPath = path.join(__dirname, '../src/data/galleryData.json');
const galleryData = JSON.parse(fs.readFileSync(galleryPath, 'utf8'));

// Helper to convert old path to public ID
function getPublicId(oldPath) {
  return results.mapping[oldPath] || null;
}

// Update gallery data
const updated = {};

Object.keys(galleryData).forEach(category => {
  const cat = galleryData[category];
  
  updated[category] = {
    title: cat.title,
    hero: getPublicId(cat.hero) || cat.hero,
    images: cat.images.map(img => getPublicId(img) || img)
  };
});

// Save updated data
const backupPath = galleryPath.replace('.json', '.backup.json');
fs.copyFileSync(galleryPath, backupPath);
console.log(`✅ Backup created: ${backupPath}`);

fs.writeFileSync(galleryPath, JSON.stringify(updated, null, 2));
console.log(`✅ Updated: ${galleryPath}`);
