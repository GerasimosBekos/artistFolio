// Configuration for Node.js scripts
require('dotenv').config({ path: '.env.local' });

module.exports = {
  cloudinary: {
    cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.REACT_APP_CLOUDINARY_API_KEY,
    apiSecret: process.env.REACT_APP_CLOUDINARY_API_SECRET,
    folderPrefix: "woodcarver", // <-- Set your folder prefix here
  }
};