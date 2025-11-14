const CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || 'dljyzn9e3';

/**
 * Generate optimized Cloudinary URL
 * @param {string} publicId - Cloudinary public ID (e.g., "woodcarver/gallery/templa/1")
 * @param {object} options - Transformation options
 */
export const getCloudinaryUrl = (publicId, options = {}) => {
  const {
    width = 'auto',
    quality = 'auto',
    format = 'auto',
    crop = 'fill',
    gravity = 'auto'
  } = options;
  
  const transformations = [
    `w_${width}`,
    `q_${quality}`,
    `f_${format}`,
    `c_${crop}`,
    gravity !== 'auto' ? `g_${gravity}` : null
  ].filter(Boolean).join(',');
  
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transformations}/${publicId}`;
};

/**
 * Preset sizes for common use cases
 */
export const CloudinaryPresets = {
  thumbnail: (publicId) => getCloudinaryUrl(publicId, { width: 300, quality: 80 }),
  gallery: (publicId) => getCloudinaryUrl(publicId, { width: 800, quality: 85 }),
  hero: (publicId) => getCloudinaryUrl(publicId, { width: 1920, quality: 90 }),
  lightbox: (publicId) => getCloudinaryUrl(publicId, { width: 2400, quality: 90 })
};