# 🎨 ArtistFolio

**A modern, customizable portfolio template for artists, craftspeople, and creatives**

ArtistFolio is a production-ready React portfolio template designed specifically for artists to showcase their work beautifully. Built with performance, accessibility, and easy customization in mind.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)
![Cloudinary](https://img.shields.io/badge/Cloudinary-Integrated-3448C5?logo=cloudinary)

---

## ✨ Features

### 🖼️ **Gallery System**
- Dynamic category-based galleries
- Lazy-loaded images with blur-up placeholders
- Responsive masonry grid layout
- Lightbox with zoom, keyboard navigation, and preloading
- Mobile-optimized scroll highlighting
- Smart image optimization via Cloudinary

### 🌐 **Multi-Language Support**
- Built-in support for Greek, English, and French
- Easy to add more languages
- Centralized translation files

### 🎨 **Fully Customizable Design**
- Single configuration file for all styling
- Auto-generated CSS variables from config
- Custom fonts and color palettes
- Responsive design for all devices

### 📧 **Contact Form**
- EmailJS integration for contact submissions
- Form validation with real-time feedback
- Copy-to-clipboard for email/phone
- Mobile-friendly interactions

### ⚡ **Performance Optimized**
- Cloudinary CDN for image delivery
- Automatic WebP/AVIF format selection
- Progressive image loading
- Smooth scroll animations with AOS
- SEO-friendly structure

### 📱 **Responsive & Accessible**
- Mobile-first design approach
- Touch-optimized interactions
- Keyboard navigation support
- ARIA labels and semantic HTML
- Reduced motion support

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- A [Cloudinary](https://cloudinary.com/) account (free tier works)
- (Optional) [EmailJS](https://www.emailjs.com/) account for contact form

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/artistfolio.git
cd artistfolio
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:
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

4. **Run the setup wizard**
```bash
npm run setup
```

This interactive wizard will:
- Verify your environment variables
- Test your Cloudinary connection
- Upload your images to Cloudinary
- Generate gallery data
- Set up favicon

5. **Start development server**
```bash
npm start
```

Visit `http://localhost:3000` to see your portfolio!

---

## 📁 Project Structure

```
artistfolio/
├── public/
│   └── images/              # Your local images (before upload)
│       ├── hero/            # Hero section backgrounds
│       ├── footer/          # Footer section backgrounds
│       ├── other/           # Logo, artist photo, textures
│       ├── categories/      # Category thumbnail images
│       └── gallery/         # Gallery images by category
│           ├── category1/
│           ├── category2/
│           └── ...
├── src/
│   ├── components/          # React components
│   ├── config/
│   │   ├── template.config.js  # 🎯 Main configuration file
│   │   └── node.config.js      # Server-side config
│   ├── translations/        # Multi-language support
│   │   ├── el.js           # Greek
│   │   ├── en.js           # English
│   │   └── fr.js           # French
│   ├── constants/
│   │   └── images.js        # Image path definitions
│   ├── data/
│   │   └── galleryData.json # Generated gallery structure
│   ├── utils/
│   │   └── cloudinary.js    # Image optimization utilities
│   └── styles/
│       └── theme.css        # Auto-generated CSS variables
├── scripts/                 # Utility scripts
│   ├── setup-craftfolio.js  # Setup wizard
│   ├── upload-all-images.js # Bulk image uploader
│   ├── generate-gallery-data.js
│   └── generate-theme-css.js
└── package.json
```

---

## 🎨 Customization Guide

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
      imageName: "custom-image-name", // Optional
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

### 3. Add Gallery Categories

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

**Step 2:** Add translations
```javascript
// In each translation file
categories: {
  // ... existing
  "my-new-category": "My New Category",
}
```

**Step 3:** Upload images
```bash
# Upload a specific category folder
node scripts/upload-specific-folder.js ./path/to/images my-new-category
```

**Step 4:** Generate gallery data
```bash
npm run generate-gallery
```

### 4. Change Images

**Option A: Replace locally and re-upload**
```bash
# Replace images in public/images/
# Then re-upload everything
npm run upload-images
```

**Option B: Upload specific folder**
```bash
node scripts/upload-specific-folder.js ./path/to/folder category-name
```

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server |
| `npm run build` | Build for production |
| `npm run setup` | Run interactive setup wizard |
| `npm run upload-images` | Upload all images to Cloudinary |
| `npm run generate-gallery` | Generate gallery data from Cloudinary |
| `npm run generate-theme` | Generate CSS from config |
| `npm run audit-images` | Audit local images |

---

## 🖼️ Image Requirements

### Recommended Sizes
- **Hero Images**: 1920x1080px (landscape)
- **Category Thumbnails**: 600x600px (square)
- **Gallery Images**: 1200px on longest side
- **Logo**: 300x300px (transparent PNG)
- **Artist Photo**: 800x800px (square)

### Supported Formats
- JPG/JPEG
- PNG
- WebP
- GIF

### File Structure
```
public/images/
├── hero/
│   ├── main.jpg
│   ├── about.jpg
│   ├── contact.jpg
│   └── gallery.jpg
├── footer/
│   ├── main.jpg
│   ├── about.jpg
│   ├── contact.jpg
│   └── gallery.jpg
├── other/
│   ├── logo.png
│   ├── artist.jpg
│   ├── texture.jpg
│   └── image_text_main.jpg
├── categories/
│   ├── category1.jpg
│   └── category2.jpg
└── gallery/
    ├── category1/
    │   ├── hero.jpg  (category hero image)
    │   ├── 1.jpg
    │   ├── 2.jpg
    │   └── ...
    └── category2/
        └── ...
```

---

## 🌐 Deployment

### Build for Production
```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

### Deploy to Netlify

1. Push your code to GitHub
2. Connect your repository to [Netlify](https://www.netlify.com/)
3. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `build`
4. Add environment variables in Netlify dashboard
5. Deploy!

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Add environment variables in Vercel dashboard.

### Other Platforms

ArtistFolio works with any static hosting provider:
- GitHub Pages
- AWS S3 + CloudFront
- Firebase Hosting
- Render
- Railway

---

## 🔧 Advanced Configuration

### Custom Fonts

1. Add font files to `src/assets/fonts/`
2. Define in `App.css`:
```css
@font-face {
  font-family: "YourFont";
  src: url("/src/assets/fonts/YourFont.ttf") format("truetype");
}
```
3. Update `template.config.js`:
```javascript
fonts: {
  main: "YourFont",
}
```

### Cloudinary Transformations

Customize image optimization in `src/utils/cloudinary.js`:

```javascript
export const getCloudinaryUrl = (publicId, options = {}) => {
  const {
    width = 'auto',
    quality = 'auto',
    format = 'auto',
    crop = 'fill',
    // Add custom transformations
  } = options;
  // ...
};
```

### EmailJS Setup

1. Create account at [emailjs.com](https://www.emailjs.com/)
2. Create email service (Gmail, Outlook, etc.)
3. Create email template with variables: `{{from_name}}`, `{{from_email}}`, `{{message}}`
4. Add credentials to `.env.local`

---

## 🐛 Troubleshooting

### Images not loading?
- Verify Cloudinary credentials in `.env.local`
- Check `folderPrefix` in `template.config.js` matches your Cloudinary folder
- Run `npm run generate-gallery` to refresh gallery data

### Contact form not working?
- Verify EmailJS credentials
- Check browser console for errors
- Test EmailJS template manually in their dashboard

### Styling not updating?
- Run `npm run generate-theme` after config changes
- Clear browser cache
- Restart development server

### Build errors?
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Check Node.js version (16+ required)

---

## 📝 License

MIT License - feel free to use for personal or commercial projects.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 💖 Support

If you find this template helpful, please consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting new features
- 📢 Sharing with others

---

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Made with ❤️ for artists and creators**