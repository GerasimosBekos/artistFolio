#!/usr/bin/env node

require('dotenv').config({ path: '.env.local' });
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║           🎨 CRAFTFOLIO SETUP WIZARD 🎨                   ║
║                                                            ║
║   This wizard will help you set up your portfolio         ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
`);

async function setupWizard() {
  try {
    console.log('\n📋 STEP 1: Check Environment Variables\n');
    
    // Check .env.local
    if (!fs.existsSync('.env.local')) {
      console.log('⚠️  .env.local not found. Creating from .env.example...\n');
      fs.copyFileSync('.env.example', '.env.local');
      console.log('✅ Created .env.local\n');
      console.log('⚠️  IMPORTANT: Edit .env.local with your credentials!\n');
      console.log('   Required:');
      console.log('   - REACT_APP_CLOUDINARY_CLOUD_NAME');
      console.log('   - REACT_APP_CLOUDINARY_API_KEY');
      console.log('   - REACT_APP_CLOUDINARY_API_SECRET');
      console.log('   - REACT_APP_EMAILJS_SERVICE_ID (optional)');
      console.log('   - REACT_APP_EMAILJS_TEMPLATE_ID (optional)');
      console.log('   - REACT_APP_EMAILJS_PUBLIC_KEY (optional)\n');
      
      const proceed = await question('Have you filled in .env.local? (yes/no): ');
      if (proceed.toLowerCase() !== 'yes') {
        console.log('\n❌ Please edit .env.local first, then run this script again.\n');
        rl.close();
        return;
      }
      
      // Reload environment
      require('dotenv').config({ path: '.env.local' });
    }

    // Verify Cloudinary credentials
    if (!process.env.REACT_APP_CLOUDINARY_CLOUD_NAME) {
      console.log('❌ REACT_APP_CLOUDINARY_CLOUD_NAME not set in .env.local\n');
      rl.close();
      return;
    }

    console.log('\n✅ Environment variables configured\n');

    // Configure Cloudinary
    cloudinary.config({
      cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
      api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
      api_secret: process.env.REACT_APP_CLOUDINARY_API_SECRET
    });

    // Test connection
    console.log('🔌 Testing Cloudinary connection...\n');
    try {
      await cloudinary.api.ping();
      console.log('✅ Cloudinary connection successful!\n');
    } catch (error) {
      console.log('❌ Cloudinary connection failed:', error.message);
      console.log('\n   Please check your credentials in .env.local\n');
      rl.close();
      return;
    }

    // Check for images
    console.log('\n📋 STEP 2: Check Image Files\n');
    
    const imageDir = path.join(__dirname, '../public/images');
    if (!fs.existsSync(imageDir)) {
      console.log('❌ public/images directory not found!\n');
      console.log('   Please create the following structure:\n');
      console.log('   public/images/');
      console.log('   ├── hero/');
      console.log('   │   ├── main.jpg');
      console.log('   │   ├── about.jpg');
      console.log('   │   ├── contact.jpg');
      console.log('   │   └── gallery.jpg');
      console.log('   ├── footer/');
      console.log('   │   ├── main.jpg');
      console.log('   │   ├── about.jpg');
      console.log('   │   ├── contact.jpg');
      console.log('   │   └── gallery.jpg');
      console.log('   ├── other/');
      console.log('   │   ├── artist.jpg');
      console.log('   │   ├── logo.png');
      console.log('   │   ├── texture.jpg');
      console.log('   │   └── image_text_main.jpg');
      console.log('   ├── categories/');
      console.log('   │   └── [category-name].jpg');
      console.log('   └── gallery/');
      console.log('       └── [category-name]/');
      console.log('           ├── 1.jpg');
      console.log('           ├── 2.jpg');
      console.log('           └── ...\n');
      rl.close();
      return;
    }

    console.log('✅ public/images directory found\n');

    // Ask about uploading images
    console.log('\n📋 STEP 3: Upload Images to Cloudinary\n');
    const uploadImages = await question('Do you want to upload images to Cloudinary now? (yes/no): ');
    
    if (uploadImages.toLowerCase() === 'yes') {
      console.log('\n🚀 Starting image upload...\n');
      
      // Import and run upload script
      const { uploadAllImages } = require('./upload-images-to-cloudinary');
      await uploadAllImages();
    } else {
      console.log('\n⏭️  Skipping image upload. You can run it later with:');
      console.log('   npm run upload-images\n');
    }

    // Generate favicon
    console.log('\n📋 STEP 4: Generate Favicon\n');
    const logoPath = path.join(__dirname, '../public/images/other/logo.png');
    
    if (fs.existsSync(logoPath)) {
      const generateFavicon = await question('Generate favicon from logo? (yes/no): ');
      if (generateFavicon.toLowerCase() === 'yes') {
        console.log('📝 To generate favicon, use an online tool like:');
        console.log('   https://realfavicongenerator.net/');
        console.log('   Upload: public/images/other/logo.png\n');
      }
    } else {
      console.log('⚠️  Logo not found at public/images/other/logo.png\n');
    }

    // Generate gallery data
    console.log('\n📋 STEP 5: Generate Gallery Data\n');
    const generateGallery = await question('Generate gallery data from images? (yes/no): ');
    
    if (generateGallery.toLowerCase() === 'yes') {
      const { generateGalleryData } = require('./generate-gallery-data');
      await generateGalleryData();
    }

    // Final instructions
    console.log('\n╔════════════════════════════════════════════════════════════╗');
    console.log('║                                                            ║');
    console.log('║║                  ✅ SETUP COMPLETE! ✅                      ║');
    console.log('║                                                            ║');
    console.log('╚════════════════════════════════════════════════════════════╝\n');

    console.log('📝 NEXT STEPS:\n');
    console.log('1. Edit your translations in:');
    console.log('   - src/translations/el.js (Greek)');
    console.log('   - src/translations/en.js (English)\n');

    console.log('2. Customize styling in:');
    console.log('   - src/config/template.config.js\n');

    console.log('3. Start development server:');
    console.log('   npm start\n');

    console.log('4. Build for production:');
    console.log('   npm run build\n');

    console.log('📚 For more help, see README.md\n');

    } catch (error) {
    console.error('❌ Setup failed:', error.message);
    } finally {
    rl.close();
    }
    }
    setupWizard();




  