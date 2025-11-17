// Central configuration for all Cloudinary images
// This makes it easy to update image paths in one place

export const CLOUDINARY_IMAGES = {
  // Hero images
  hero: {
    main: 'woodcarver/hero/main',
    about: 'woodcarver/hero/about',
    contact: 'woodcarver/hero/contact',
    gallery: 'woodcarver/hero/gallery',
  },
  
  // Footer images
  footer: {
    main: 'woodcarver/footer/main',
    woodcarving1: 'woodcarver/footer/woodcarving1',
    woodcarving2: 'woodcarver/footer/woodcarving2',
    woodcarving3: 'woodcarver/footer/woodcarving3',
  },
  
  // Misc images
  misc: {
    artist: 'woodcarver/misc/artist',
    handCrop: 'woodcarver/misc/hand_crop',
    logo: 'woodcarver/misc/logo',
  },
  
  // Category thumbnails (for MainGallery.js)
  categories: {
    templo: 'woodcarver/categories/templo',
    prosk: 'woodcarver/categories/prosk',
    stasidia: 'woodcarver/categories/stasidia',
    epitafios: 'woodcarver/categories/epitafios',
    korniza: 'woodcarver/categories/korniza',
    stavros: 'woodcarver/categories/stavros',
    thronos: 'woodcarver/categories/thronos',
    pagkari: 'woodcarver/categories/pagkari',
    polithrona: 'woodcarver/categories/polithrona',
    amvonas: 'woodcarver/categories/amvonas',
    karekles: 'woodcarver/categories/karekles',
    psaltiri: 'woodcarver/categories/psaltiri',
    lipsanothiki: 'woodcarver/categories/lipsanothiki',
  }
};