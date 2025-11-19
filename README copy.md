# 🎨 Craftfolio - Artisan Portfolio Template

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.x-blue)](https://reactjs.org/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-Optimized-blue)](https://cloudinary.com/)

> A beautiful, performant portfolio template for artisans, craftspeople, and visual artists. Built with React and Cloudinary for lightning-fast image delivery.

## ✨ Features

- 🎭 **Multi-language Support** - Easy translation system (Greek & English included)
- 🖼️ **Optimized Image Gallery** - Lazy loading, responsive images via Cloudinary
- 📱 **Fully Responsive** - Beautiful on all devices
- ⚡ **Performance Optimized** - < 3s load times
- 🎨 **Highly Customizable** - Colors, fonts, layout via simple config
- 📧 **Contact Form** - EmailJS integration
- 🚀 **Easy Setup** - Automated setup wizard
- 🌐 **SEO Ready** - Meta tags and structured data

## 📋 Prerequisites

- Node.js 16+ and npm
- [Cloudinary account](https://cloudinary.com/) (free tier works!)
- [EmailJS account](https://www.emailjs.com/) (optional, for contact form)

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/yourusername/craftfolio.git
cd craftfolio
npm install
```

### 2. Run Setup Wizard
```bash
npm run setup
```

The wizard will guide you through:
- ✅ Creating `.env.local` with your credentials
- ✅ Testing Cloudinary connection
- ✅ Uploading images to Cloudinary
- ✅ Generating gallery data
- ✅ Creating favicon

### 3. Configure Your Content

#### Edit Translations (Required)
```bash
src/translations/el.js  # Greek content
src/translations/en.js  # English content
```

**What to edit:**
- Personal information (name, profession, bio)
- Contact details (email, phone, address, social media)
- All page content and messages

#### Customize Styling (Optional)
```bash
config/template.config.js
```

**What to customize:**
- Colors (primary, secondary, accent)
- Fonts (main, header)
- Font sizes
- Spacing and effects

### 4. Prepare Your Images

Create this folder structure in `public/images/`:
````
public/images/
├── hero/
│   ├── main.jpg        (Homepage hero)
│   ├── about.jpg       (About page hero)
│   ├── contact.jpg     (Contact page hero)
│   └── gallery.jpg     (Gallery page hero)
├── footer/
│   ├── main.jpg        (Homepage footer)
│   ├── about.jpg       (About footer)
│   ├── contact.jpg     (Contact footer)
│   └── gallery.jpg     (Gallery footer)
├── other/
│   ├── artist.jpg      (Your photo)
│   ├── logo.png        (Your logo - transparent PNG)
│   ├── texture.jpg     (Background texture)
│   └── image_text_main.jpg (Mid-page image)
├── categories/
│   ├── category1.jpg   (Category thumbnail)
│   ├── category2.jpg
│   └── ...
└── gallery/
    ├── category1/
    │   ├── 1.jpg
    │   ├── 2.jpg
    │   └── ...
    └── category2/
        ├── 1.jpg
        └── ...
````
## Image Guidelines:

Hero images: 1920x1080px (16:9), < 2MB
Category thumbnails: 800x800px (1:1), < 500KB
Gallery images: 1200x800px minimum, < 3MB
Logo: 500x500px, transparent PNG
Format: JPEG for photos, PNG for logos

## 5. Set Up Credentials

Cloudinary (Required)

Sign up at cloudinary.com
Go to Dashboard
Copy your credentials to .env.local:

REACT_APP_CLOUDINARY_CLOUD_