// Import config
import { TEMPLATE_CONFIG } from '../config/template.config';

const FOLDER = TEMPLATE_CONFIG.cloudinary.folderPrefix;
console.log(FOLDER);

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
  
  // Category thumbnails
  categories: {
    templo: `${FOLDER}/categories/templo`,
    prosk: `${FOLDER}/categories/prosk`,
    stasidia: `${FOLDER}/categories/stasidia`,
    epitafios: `${FOLDER}/categories/epitafios`,
    korniza: `${FOLDER}/categories/korniza`,
    stavros: `${FOLDER}/categories/stavros`,
    thronos: `${FOLDER}/categories/thronos`,
    pagkari: `${FOLDER}/categories/pagkari`,
    polithrona: `${FOLDER}/categories/polithrona`,
    amvonas: `${FOLDER}/categories/amvonas`,
    karekles: `${FOLDER}/categories/karekles`,
    psaltiri: `${FOLDER}/categories/psaltiri`,
    lipsanothiki: `${FOLDER}/categories/lipsanothiki`,
  }
};