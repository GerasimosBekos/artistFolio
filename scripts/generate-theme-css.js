const fs = require('fs');
const path = require('path');

function getConfig() {
  try {
    const configPath = path.join(__dirname, '../src/config/template.config.js');
    const configContent = fs.readFileSync(configPath, 'utf8');
    
    // Extract style object using regex
    const styleMatch = configContent.match(/style:\s*{([\s\S]*?)},\s*\/\/\s*===/);
    
    if (!styleMatch) {
      throw new Error('Could not find style section in template.config.js');
    }
    
    // Extract colors
    const colorsMatch = styleMatch[0].match(/colors:\s*{([^}]+)}/);
    const fontsMatch = styleMatch[0].match(/fonts:\s*{([^}]+)}/);
    const fontSizesMatch = styleMatch[0].match(/fontSizes:\s*{([^}]+)}/);
    
    const extractValues = (match, section) => {
      const values = {};
      const lines = match.split('\n');
      lines.forEach(line => {
        const valueMatch = line.match(/(\w+):\s*["']([^"']+)["']/);
        if (valueMatch) {
          values[valueMatch[1]] = valueMatch[2];
        }
      });
      return values;
    };
    
    return {
      colors: extractValues(colorsMatch[1], 'colors'),
      fonts: extractValues(fontsMatch[1], 'fonts'),
      fontSizes: extractValues(fontSizesMatch[1], 'fontSizes')
    };
    
  } catch (error) {
    console.error('❌ Error reading config:', error.message);
    return null;
  }
}

function generateThemeCSS() {
  console.log('🎨 Generating theme CSS from template.config.js...\n');
  
  const config = getConfig();
  
  if (!config) {
    console.error('❌ Could not load config\n');
    return;
  }

  const { colors, fonts, fontSizes } = config;

  const cssContent = `/* ============================================
   artistFolio THEME VARIABLES
   Auto-generated from config/template.config.js
   DO NOT EDIT MANUALLY
   
   To update: npm run generate-theme
   ============================================ */

:root {
  /* ==================== COLORS ==================== */
  --color-primary: ${colors.primary};
  --color-secondary: ${colors.secondary};
  --color-accent: ${colors.accent};
  --color-text-dark: ${colors.textDark};
  --color-text-light: ${colors.textLight};
  --color-background: ${colors.background};
  --color-footer-bg: ${colors.footerBg};

  /* ==================== FONTS ==================== */
  --font-main: "${fonts.main}", ${fonts.fallback};
  --font-header: "${fonts.header}", ${fonts.fallback};

  /* ==================== FONT SIZES ==================== */
  --font-size-hero-title: ${fontSizes.heroTitle};
  --font-size-page-title: ${fontSizes.pageTitle};
  --font-size-section-title: ${fontSizes.sectionTitle};
  --font-size-subtitle: ${fontSizes.subtitle};
  --font-size-body: ${fontSizes.body};
  --font-size-small: ${fontSizes.small};
}
`;

  const outputPath = path.join(__dirname, '../src/styles/theme.css');
  
  const stylesDir = path.dirname(outputPath);
  if (!fs.existsSync(stylesDir)) {
    fs.mkdirSync(stylesDir, { recursive: true });
  }
  
  fs.writeFileSync(outputPath, cssContent);
  
  console.log('✅ Theme CSS generated!\n');
  console.log('📄 Output: src/styles/theme.css\n');
}

if (require.main === module) {
  generateThemeCSS();
}

module.exports = { generateThemeCSS };