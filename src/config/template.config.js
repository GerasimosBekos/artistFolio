// ============================================
// ARTISTFOLIO TEMPLATE CONFIGURATION
// ============================================
// Edit this file to customize your portfolio

export const TEMPLATE_CONFIG = {
  // ==================== STYLING ====================
  style: {
    // Color Palette
    colors: {
      primary: "#b76e79",    // Rose gold
      secondary: "#f7e7ce",  // Champagne
      accent: "#8b4f5c",     // Deep rose
      textDark: "#3d3d3d",
      textLight: "#7a7a7a",
      background: "#fff9f5",
      footerBg: "#8b4f5ce6",
    },

    // Typography
    fonts: {
      main: "Montserrat",      // Clean, modern sans-serif for body text
      header: "Playfair Display", // Elegant serif for headers and titles
      fallback: "sans-serif",  // Fallback font family
    },

    // Font Sizes
    fontSizes: {
      heroTitle: "4.3rem",
      pageTitle: "3.5rem",
      sectionTitle: "2.5rem",
      subtitle: "1.5rem",
      body: "1.2rem",
      small: "1rem",
    },
  },

  // ==================== CLOUDINARY ====================
  cloudinary: {
    cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.REACT_APP_CLOUDINARY_API_KEY,
    apiSecret: process.env.REACT_APP_CLOUDINARY_API_SECRET,
    
    // Folder structure in Cloudinary
    folderPrefix: "jewelry",  // Root folder name 
                            // !!! CHANGE ALSO ./node.config.js
    
    // Subfolders
    folders: {
      hero: "hero",
      footer: "footer",
      other: "other",
      categories: "categories",
      gallery: "gallery",
    },
  },

  // ==================== EMAILJS ====================
  emailjs: {
    serviceId: process.env.REACT_APP_EMAILJS_SERVICE_ID,
    templateId: process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
    publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY,
  },

  // ==================== SITE SETTINGS ====================
  site: {
    defaultLanguage: "en",           // Default language
    availableLanguages: ["el", "en", "fr"], // Available languages
    
    // Features to enable/disable
    features: {
      languageSwitch: true,
      contactForm: true,
      socialMedia: true,
      businessHours: false,
      breadcrumbs: true,
      scrollAnimations: true,
    },
  },

  // ==================== GALLERY CATEGORIES ====================
  // Add/remove/edit categories here
  // gridSize options: "normal", "wide", "tall" 
  categories: [
    {
      id: "bracelets",
      enabled: true,
      gridSize: "wide",    // The 'bracelets' category should be
    },                     // shown vericaly in the gallery grid
    {
      id: "brooches",
      enabled: true,
      gridSize: "tall",
    },
    {
      id: "classic",
      enabled: true,
      gridSize: "normal",
    },
    {
      id: "custom",
      enabled: true,
      gridSize: "tall",
    },
    {
      id: "earrings",
      enabled: true,
      gridSize: "normal",
    },
    {
      id: "modern",
      enabled: true,
      gridSize: "tall",
    },
    {
      id: "necklaces",
      enabled: true,
      gridSize: "tall",
    },
    {
      id: "pendants",
      enabled: true,
      gridSize: "normal",
    },
    {
      id: "rings",
      enabled: true,
      gridSize: "tall",
    },
    {
      id: "sets",
      enabled: true,
      gridSize: "tall",
    },
    {
      id: "vintage",
      enabled: true,
      gridSize: "normal",
    },
    {
      id: "wedding",
      enabled: true,
      gridSize: "normal",
    },
  ],

  // ==================== HELPER FUNCTIONS ====================
  // Get enabled categories only
  getEnabledCategories() {
    return this.categories.filter(cat => cat.enabled);
  },

  // Get category by ID
  getCategoryById(id) {
    return this.categories.find(cat => cat.id === id);
  },

  // Get image name for category (with fallback to id)
  getCategoryImageName(id) {
    const category = this.getCategoryById(id);
    return category?.imageName || id;
  }
};