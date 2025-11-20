// File: src/constants/images.js - FULLY DYNAMIC WITH CONFIG METHODS

import { TEMPLATE_CONFIG } from '../config/template.config';

const FOLDER = TEMPLATE_CONFIG.cloudinary.folderPrefix;

// Central configuration for all Cloudinary images
export const CLOUDINARY_IMAGES = {
  // Hero images
  hero: {
    main: `${FOLDER}/hero/main`,
    about: `${FOLDER}/hero/about`,
    contact: `${FOLDER}/hero/contact`,
    gallery: `${FOLDER}/hero/gallery`,
  },
  
  // Footer images
  footer: {
    main: `${FOLDER}/footer/main`,
    about: `${FOLDER}/footer/about`,
    contact: `${FOLDER}/footer/contact`,
    gallery: `${FOLDER}/footer/gallery`,
  },
  
  // Other images
  other: {
    artist: `${FOLDER}/other/artist`,
    logo: `${FOLDER}/other/logo`,
    mainbg: `${FOLDER}/other/mainbg`,
    texture: `${FOLDER}/other/texture`,
    imageTextMain: `${FOLDER}/other/image_text_main`,
  },
  
  // ⭐ DYNAMIC: Category thumbnails generated from config
  categories: (() => {
    const categoryImages = {};
    
    // Build category images from config using helper method
    TEMPLATE_CONFIG.categories.forEach(cat => {
      const imageName = TEMPLATE_CONFIG.getCategoryImageName(cat.id);
      categoryImages[cat.id] = `${FOLDER}/categories/${imageName}`;
    });
    
    return categoryImages;
  })()
};

// ⭐ Helper function to get category image by ID
export const getCategoryImage = (categoryId) => {
  return CLOUDINARY_IMAGES.categories[categoryId] 
    || `${FOLDER}/categories/${categoryId}`;
};