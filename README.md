# artistFolio

![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?logo=node.js&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-Integrated-3448C5?logo=cloudinary)
![License](https://img.shields.io/badge/license-MIT-yellow.svg)

A beautiful, performant **portfolio template** for artisans, craftspeople, and visual artists. Built with React and Cloudinary for lightning-fast image delivery.

With just:
  - Bio info
  - Gallery folder
  - Styling options

  `You now have a beautiful portfolio to show your work!`
    
      

  ## 🎬 Demonstration
<p align="center">
  <div style="position:relative; display:inline-block; width:300px; margin-right:20px; vertical-align:top;">
    <strong>Woodcarving Workshop</strong><br><br>
    <img src="docs/images/mock_wood_desktop.gif" width="300">
    <img src="docs/images/mock_wood_mobile.gif" height="100" style="position:absolute; bottom:5px; right:5px;">
  </div>

  <div style="position:relative; display:inline-block; width:300px; vertical-align:top;">
    <strong>Jewelry Workshop</strong><br><br>
    <img src="docs/images/mock_jewelry_desktop.gif" width="300">
    <img src="docs/images/mock_jewelry_mobile.gif" height="100" style="position:absolute; bottom:5px; right:5px;">
  </div>
</p>

## ✨ Features
- **Optimized Image Gallery** - Dynamic category-based galleries, lighthbox with zoom capabilities
- **Fully Customizable Design** - Single configuration file for all styling
- **Performance Optimized** - Cloudinary CDN for image delivery, image lazy loading, SEO-friendly structure, smooth scrolling with AOS
- **Easy Setup** - Setup wizard, setup < 10 minutes
- **Contact Form** - EmailJS integration
- **Multi-language Support** - Centralized translation files
- **Mobile Responsive** - Fully responsive accross all devices


## Installation
### Prerequisites
- Node.js 16+ and npm
- A [Cloudinary](https://cloudinary.com/) account (free tier works)
- (Optional) [EmailJS](https://www.emailjs.com/) account for contact form

### 1. Clone and Install
```bash
git clone https://github.com/GerasimosBekos/artistFolio.git
cd artistFolio
npm install
```

### 2. Install dependencies
```bash
npm install
```

### 3. Edit `.env.local` with your dredentials
```env
# Cloudinary Configuration (Required)
REACT_APP_CLOUDINARY_CLOUD_NAME=your_cloud_name
REACT_APP_CLOUDINARY_API_KEY=your_api_key
REACT_APP_CLOUDINARY_API_SECRET=your_api_secret

# EmailJS Configuration (Optional - for contact form)
REACT_APP_EMAILJS_SERVICE_ID=your_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key
```

### 4. Run the setup wizard
```bash
npm run setup
```
This interactive wizard will:
- Verify your environment variables
- Test your Cloudinary connection
- Upload your images to Cloudinary 
- Generate gallery data
- Set up favicon


The first time you run the script, a demo project is going to be loaded. You can edit everything with your information afterwards.

### 5. Start development server
```bash
npm start
```
Visit `http://localhost:3000` to see your portfolio!

## Project Structure
- `public/images/` : 
  - `hero/` - Hero section 
  - `footer/` - Footer section backgrounds
  - `other/` - Logo, artist photo
  - `categories/` - Category thumbnail images
  - `gallery/` - Gallery images by category

- `src/` :
  - `components/` - React components
  - `config/` - ### Main configuration file ###
  - `translations/` - Multi-language support
  - `constants/` - Image path definitions
  - `data/` - Generated gallery structure
  - `utils/` - Image optimization utilities
  - `styles/` - Auto-generated CSS variables

- `scripts/` : Utility scripts


## Customization Guide

### 1. Basic Configuration
Edit `src/config/template.config.js`:
```javascript
export const TEMPLATE_CONFIG = {
  // Colors
  style: {
    colors: {
      primary: "#8b7355",      // Main brand color
      secondary: "#c0be8e",    // Secondary accent
      accent: "#623008",       // Dark accent
      // ... more colors
    },
    
    // Fonts
    fonts: {
      main: "Chiron Sung HK",   // Body text
      header: "Byzantine",       // Headers
    },
    
    // Font sizes
    fontSizes: {
      heroTitle: "4.3rem",
      pageTitle: "3.5rem",
      // ... more sizes
    },
  },

  // Cloudinary settings
  cloudinary: {
    folderPrefix: "your-folder-name",  // Change this!
  },

  // Gallery categories
  categories: [
    {
      id: "category1",   
      enabled: true,
      gridSize: "wide",  // "normal", "wide", or "tall"
    },
    // Add more categories...
  ],
};
```

After editing, run:
```bash
npm run generate-theme  # Regenerates CSS variables
```

### 2. Update Translations

Edit language files in `src/translations/`:

**`src/translations/en.js`**
```javascript
export const en = {
  personal: {
    firstName: "Your",
    lastName: "Name",
    profession: "Your Profession",
  },
  contact: {
    email: "your@email.com",
    phone: "+1 234 567 8900",
  },
  // ... more translations
};
```

Update all three language files (el.js, en.js, fr.js) to keep consistency.

### 4. Add / Edit / Remove Categories
**Step 1:** Add category to config
```javascript
// In template.config.js
categories: [
  // ... existing categories
  {
    id: "my-new-category",
    enabled: true,
    gridSize: "normal",
  },
]
```

**IMPORTANT**: You should also have the folder `public/images/gallery/{my-new-category}/` and the image `public/images/categories/{my-new-category}.jpg`

**Step 2:** Add translations
```javascript
// In each translation file
categories: {
  // ... existing
  "my-new-category": "My New Category Name",
}
```

**Step 3:** Upload images
```bash
# Upload a specific category folder
node scripts/upload-specific-folder.js public/images/gallery/{my-new-category} my-new-category
```

**Step 4:** Generate gallery data
```bash
npm run generate-gallery
```

### 4. Change Images
Replace locally and re-upload
```bash
# Replace images in public/images/
# Then re-upload everything
npm run upload-images
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server |
| `npm run build` | Build for production |
| `npm run setup` | Run interactive setup wizard |
| `npm run upload-images` | Upload all images to Cloudinary |
| `npm run generate-gallery` | Generate gallery data from Cloudinary |
| `npm run generate-theme` | Generate CSS from config |
| `npm run audit-images` | Audit local images |


## Deployment

### Build for Production
```bash
npm run build
```

This creates an optimized production build in the `build/` folder.











