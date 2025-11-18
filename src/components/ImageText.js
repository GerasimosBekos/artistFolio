import "./ImageText.css";
import { getCloudinaryUrl } from "../utils/cloudinary";

function ImageText({title, text, image, height, titleSize, textSize}) {
    // Check if image is a Cloudinary public ID or local path
    const getImageUrl = () => {
        if (!image) return '';
        
        // If it's already a full URL, return it
        if (image.startsWith('http')) return image;
        
        // If it starts with /, it's a local path
        if (image.startsWith('/')) return image;
        
        // Otherwise, it's a Cloudinary public ID
        return getCloudinaryUrl(image, { 
            width: 1920, 
            quality: 85, 
            format: 'auto' 
        });
    };

    const imageUrl = getImageUrl();

    return (
        <div className="image-container" style={{backgroundImage: `url(${imageUrl})`, height: height }}>
            {title && <div className="image-title" style={{fontSize: titleSize}}>{title}</div>}
            <div className="image-text" style={{fontSize: textSize}}>{text}</div>
        </div>
    );
}

ImageText.defaultProps = {
    title: "",
    titleSize: "",
    textSize: ""
};

export default ImageText;