// ============================================
// artistFolio TEMPLATE CONFIGURATION
// ============================================
// Edit this file to customize your portfolio

export const TEMPLATE_CONFIG = {
  // ==================== STYLING ====================
  style: {
    // Color Palette
    colors: {
      primary: "#8b7355",      // Main brand color (buttons, accents)
      secondary: "#c0be8e",    // Secondary accent color
      accent: "#623008",       // Dark accent color
      textDark: "#333",        // Main text color
      textLight: "#666",       // Secondary text color
      background: "#fff",      // Background color
      footerBg: "#1a1a1aCC",   // Footer background
    },

    // Typography
    fonts: {
      main: "Chiron Sung HK",   // Body text font
      header: "Byzantine",       // Headers and titles font
      fallback: "serif",         // Fallback font family
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
    folderPrefix: "woodcarver",  // Root folder name
    
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
    defaultLanguage: "el",           // Default language
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
  // ⭐ DYNAMIC: Add/remove/edit categories here
  // gridSize options: "normal", "wide", "tall"
  // enabled: true/false to show/hide category
  // imageName: optional - override default image name (defaults to category id)
  categories: [
    {
      id: "templa",
      enabled: true,
      gridSize: "wide",
      imageName: "templo", // Custom image name
    },
    {
      id: "proskinitaria",
      enabled: true,
      gridSize: "tall",
      imageName: "prosk",
    },
    {
      id: "stasidia",
      enabled: true,
      gridSize: "normal",
    },
    {
      id: "epitafioi",
      enabled: true,
      gridSize: "tall",
      imageName: "epitafios",
    },
    {
      id: "kornizes",
      enabled: true,
      gridSize: "normal",
      imageName: "korniza",
    },
    {
      id: "stavroi",
      enabled: true,
      gridSize: "tall",
      imageName: "stavros",
    },
    {
      id: "thronoi",
      enabled: true,
      gridSize: "tall",
      imageName: "thronos",
    },
    {
      id: "pagkaria",
      enabled: true,
      gridSize: "normal",
      imageName: "pagkari",
    },
    {
      id: "polithrones",
      enabled: true,
      gridSize: "tall",
      imageName: "polithrona",
    },
    {
      id: "amvones",
      enabled: true,
      gridSize: "tall",
      imageName: "amvonas",
    },
    {
      id: "karekles",
      enabled: true,
      gridSize: "normal",
    },
    {
      id: "psaltiria",
      enabled: true,
      gridSize: "normal",
      imageName: "psaltiri",
    },
    {
      id: "lipsanothikes",
      enabled: true,
      gridSize: "normal",
      imageName: "lipsanothiki",
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