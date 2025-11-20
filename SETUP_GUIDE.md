# 🛠️ artistFolio Setup Guide

Complete step-by-step guide to set up your portfolio.

## 📋 Checklist

- [ ] Node.js 16+ installed
- [ ] Cloudinary account created
- [ ] EmailJS account created (optional)
- [ ] Images prepared and organized
- [ ] Logo created
- [ ] Content written

## Step 1: Initial Setup

### 1.1 Clone Repository
```bash
git clone https://github.com/yourusername/artistFolio.git
cd artistFolio
```

### 1.2 Install Dependencies
```bash
npm install
```

This installs all required packages.

## Step 2: Prepare Content

### 2.1 Write Your Content

Open and edit these files with YOUR information:

**Greek Translation** - `src/translations/el.js`:
```javascript
personal: {
  firstName: "Το όνομά σας",
  lastName: "Το επώνυμό σας",
  profession: "Το επάγγελμά σας",
  bio: "Η βιογραφία σας...",
}

contact: {
  email: "το-email-σας@example.com",
  phone: "+30 694 123 4567",
  address: {
    street: "Η διεύθυνσή σας",
    city: "Η πόλη σας",
    country: "Ελλάδα",
  },
  social: {
    facebook: "https://facebook.com/your-page",
    instagram: "https://instagram.com/your-account",
  }
}

// Update ALL sections with your content
```

**English Translation** - `src/translations/en.js`:
```javascript
// Same structure, English version
```

### 2.2 Customize Styling (Optional)

Edit `config/template.config.js`:
```javascript
style: {
  colors: {
    primary: "#your-color",    // Your brand color
    secondary: "#your-color",  // Accent color
    // ...
  },
  
  fonts: {
    main: "Your Font",
    header: "Your Header Font",
  }
}
```

## Step 3: Prepare Images

### 3.1 Organize Images

Create this **exact** folder structure in `public/`:
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
│   ├── artist.jpg
│   ├── logo.png
│   ├── texture.jpg
│   └── image_text_main.jpg
├── categories/
│   ├── category1.jpg
│   ├── category2.jpg
│   └── ...
└── gallery/
    ├── category1/
    │   ├── 1.jpg
    │   ├── 2.jpg
    │   └── ...
    └── category2/
        └── ...
```

### 3.2 Image Specifications

| Type | Size | Format | Max Size |
|------|------|--------|----------|
| Hero | 1920x1080px | JPEG | 2MB |
| Footer | 1920x1080px | JPEG | 2MB |
| Category Thumb | 800x800px | JPEG | 500KB |
| Gallery | 1200x800px+ | JPEG | 3MB |
| Logo | 500x500px | PNG | 500KB |
| Artist Photo | 600x800px | JPEG | 1MB |

**Tips:**
- Use [TinyPNG](https://tinypng.com/) to compress
- Keep aspect ratios consistent
- Use descriptive filenames

## Step 4: Cloudinary Setup

### 4.1 Create Account

1. Go to [cloudinary.com](https://cloudinary.com/)
2. Sign up (free tier is fine)
3. Verify your email

### 4.2 Get Credentials

1. Go to Dashboard
2. Find "Account Details"
3. Copy these values:
   - **Cloud name:** (e.g., `dljyzn9e3`)
   - **API Key:** (e.g., `123456789012345`)
   - **API Secret:** (e.g., `abcdefghijklmnopqrstuvwxyz`)

### 4.3 Add to Environment

Create `.env.local` in project root:
```env
REACT_APP_CLOUDINARY_CLOUD_NAME=your_cloud_name
REACT_APP_CLOUDINARY_API_KEY=your_api_key
REACT_APP_CLOUDINARY_API_SECRET=your_api_secret
```

**Important:** Never commit `.env.local` to Git!

## Step 5: EmailJS Setup (Optional)

### 5.1 Create Account

1. Go to [emailjs.com](https://www.emailjs.com/)
2. Sign up (100 emails/month free)

### 5.2 Add Email Service

1. Go to "Email Services"
2. Click "Add New Service"
3. Choose Gmail, Outlook, or custom SMTP
4. Follow setup instructions
5. Note the **Service ID** (e.g., `service_abc123`)

### 5.3 Create Template

1. Go to "Email Templates"
2. Click "Create New Template"
3. Use these variables:
```
Subject: New message from {{from_name}}

From: {{from_email}}

Message:
{{message}}
```

4. Save and note **Template ID** (e.g., `template_xyz789`)

### 5.4 Get Public Key

1. Go to "Account" → "General"
2. Copy **Public Key** (e.g., `xyzABC123`)

### 5.5 Add to Environment

Add to `.env.local`:
```env
REACT_APP_EMAILJS_SERVICE_ID=service_abc123
REACT_APP_EMAILJS_TEMPLATE_ID=template_xyz789
REACT_APP_EMAILJS_PUBLIC_KEY=xyzABC123
```

## Step 6: Run Setup Wizard

### 6.1 Run Wizard
```bash
npm run setup
```

The wizard will:
1. ✅ Check environment variables
2. ✅ Test Cloudinary connection
3. ✅ Scan for images
4. ✅ Upload images to Cloudinary
5. ✅ Generate gallery data

### 6.2 Follow Prompts

Answer the wizard questions:
- "Have you filled in .env.local?" → **yes**
- "Upload images to Cloudinary?" → **yes**
- "Generate gallery data?" → **yes**

## Step 7: Test Locally

### 7.1 Start Dev Server
```bash
npm start
```

### 7.2 Check Everything

- [ ] Site loads at `http://localhost:3000`
- [ ] Images display correctly
- [ ] All text is correct
- [ ] Language switching works
- [ ] Gallery categories work
- [ ] Contact form works
- [ ] Mobile responsive

### 7.3 Fix Issues

**Images not loading?**
```bash
npm run upload-images
```

**Gallery empty?**
```bash
npm run generate-gallery
```

**Contact form fails?**
- Check EmailJS credentials
- Verify template variables

## Step 8: Deploy

### 8.1 Build for Production
```bash
npm run build
```

This creates optimized `build/` folder.

### 8.2 Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts
```

Add environment variables in Vercel dashboard:
- Settings → Environment Variables
- Add all from `.env.local`

### 8.3 Or Deploy to Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod --dir=build
```

Add environment variables in Netlify:
- Site Settings → Build & Deploy → Environment

## Step 9: Final Touches

### 9.1 Generate Favicon

1. Go to [realfavicongenerator.net](https://realfavicongenerator.net/)
2. Upload `public/images/other/logo.png`
3. Download favicon package
4. Replace files in `public/`

### 9.2 Test Production

- [ ] Visit your live URL
- [ ] Test on mobile device
- [ ] Test contact form
- [ ] Check all pages
- [ ] Test image loading

### 9.3 SEO (Optional)

Edit `public/index.html`:
```html
<title>Your Name - Your Profession</title>
<meta name="description" content="Your description">
```

## 🎉 Done!

Your portfolio is live! 

## 📝 Maintenance

### Update Content
```bash
# 1. Edit translations
# 2. Commit changes
git add .
git commit -m "Update content"
git push

# 3. Redeploy (automatic on Vercel/Netlify)
```

### Add Images
```bash
# 1. Add images to public/images/
# 2. Upload to Cloudinary
npm run upload-images

# 3. Regenerate gallery
npm run generate-gallery

# 4. Commit and push
```

## 🆘 Need Help?

- Check [README.md](README.md)
- Open [GitHub Issue](https://github.com/yourusername/artistFolio/issues)
- Email: support@artistFolio.com