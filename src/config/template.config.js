// ============================================
// CRAFTFOLIO TEMPLATE CONFIGURATION
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
    availableLanguages: ["el", "en"], // Available languages
    
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
      id: "templa",
      enabled: true,
      gridSize: "wide",
    },
    {
      id: "proskinitaria",
      enabled: true,
      gridSize: "tall",
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
    },
    {
      id: "kornizes",
      enabled: true,
      gridSize: "normal",
    },
    {
      id: "stavroi",
      enabled: true,
      gridSize: "tall",
    },
    {
      id: "thronoi",
      enabled: true,
      gridSize: "tall",
    },
    {
      id: "pagkaria",
      enabled: true,
      gridSize: "normal",
    },
    {
      id: "polithrones",
      enabled: true,
      gridSize: "tall",
    },
    {
      id: "amvones",
      enabled: true,
      gridSize: "tall",
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
    },
    {
      id: "lipsanothikes",
      enabled: true,
      gridSize: "normal",
    },
  ],
};