const CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || 'dljyzn9e3';

/**
 * Generate optimized Cloudinary URL
 * @param {string} publicId - Cloudinary public ID (e.g., "woodcarver/gallery/templa/1")
 * @param {object} options - Transformation options
 */
/**
 * Generate optimized Cloudinary URL
 */
export const getCloudinaryUrl = (publicId, options = {}) => {
  if (!CLOUD_NAME) {
    console.error('❌ REACT_APP_CLOUDINARY_CLOUD_NAME is not set');
    return `https://via.placeholder.com/800x600?text=Missing+Cloud+Name`;
  }

  if (publicId && publicId.startsWith('http')) {
    return publicId;
  }

  const {
    width = 'auto',
    height = null,          // NEW: Optional height
    quality = 'auto',
    format = 'auto',
    crop = 'fill',          // Default: fill (crops to exact size)
    gravity = 'auto'
  } = options;
  
  const transformations = [
    `w_${width}`,
    height ? `h_${height}` : null,  // Only add height if specified
    `q_${quality}`,
    `f_${format}`,
    `c_${crop}`,
    gravity !== 'auto' ? `g_${gravity}` : null
  ].filter(Boolean).join(',');
  
  const url = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transformations}/${publicId}`;
  
  return url;
};

/**
 * Preset sizes for common use cases
 */
export const CloudinaryPresets = {
  thumbnail: (publicId) => getCloudinaryUrl(publicId, { 
    width: 300, 
    quality: 80, 
    crop: 'fill'      // Gallery thumbnails: crop to fill space
  }),
  
  gallery: (publicId) => getCloudinaryUrl(publicId, { 
    width: 800, 
    quality: 85, 
    crop: 'fill'      // Gallery grid: crop to fill space
  }),
  
  hero: (publicId) => getCloudinaryUrl(publicId, { 
    width: 1920, 
    quality: 90, 
    crop: 'fill'      // Hero images: crop to fill viewport
  }),
  
  lightbox: (publicId) => getCloudinaryUrl(publicId, { 
    width: 2400, 
    quality: 90, 
    crop: 'limit'     // ⭐ Lightbox: NEVER crop, just limit max size
  })
};