const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function captureScrollingDemo() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 }
  });

  // Create screenshots directory
  const screenshotsDir = path.join(__dirname, '../docs/screenshots/temp');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  console.log('🎬 Starting capture...');
  
  // Navigate to your site
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(2000); // Wait for page load

  // Capture frames while scrolling
  const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
  const viewportHeight = 1080;
  const scrollStep = 10; // Pixels per frame (smaller = smoother)
  let currentScroll = 0;
  let frameNumber = 0;

  console.log(`📏 Total scroll height: ${scrollHeight}px`);

  while (currentScroll < scrollHeight - viewportHeight) {
    // Scroll smoothly
    await page.evaluate((y) => {
      window.scrollTo({ top: y, behavior: 'instant' });
    }, currentScroll);

    // Wait a bit for rendering
    await page.waitForTimeout(50);

    // Capture frame
    await page.screenshot({
      path: path.join(screenshotsDir, `frame-${String(frameNumber).padStart(4, '0')}.png`),
      fullPage: false
    });

    currentScroll += scrollStep;
    frameNumber++;

    if (frameNumber % 10 === 0) {
      console.log(`📸 Captured ${frameNumber} frames...`);
    }
  }

  console.log(`✅ Captured ${frameNumber} frames total`);
  await browser.close();

  console.log('\n🎨 Now convert to GIF with:');
  console.log(`cd docs/screenshots/temp && gifski -o ../homepage-demo.gif --fps 20 frame-*.png`);
}

captureScrollingDemo().catch(console.error);