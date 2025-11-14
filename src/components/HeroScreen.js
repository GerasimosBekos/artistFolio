// import "./HeroScreen.css";
// import "../Main.css";
// import { CloudinaryPresets } from '../utils/cloudinary';

// function HeroScreen({image, title, text, height, opacity, title_size = "4.3rem"}) {
//     return (
//         <section className="hero" style={{backgroundImage: `url(${image})`, height: height, opacity: opacity, fontSize: title_size}}>
//             <div className="quote">
//                 <div className="quote-title">
//                     {title}
//                 </div>
//                 <div className="quote-text">
//                     {text}
//                 </div>
//             </div>
//         </section>
//     );
// }
// export default HeroScreen;
import "./HeroScreen.css";
import "../Main.css";
import { getCloudinaryUrl } from "../utils/cloudinary";

function HeroScreen({image, title, text, height, opacity, title_size = "4.3rem"}) {
    
    // Check if image is a Cloudinary public ID or already a full URL
    const getBackgroundImage = () => {
        if (!image) return '';
        
        // If it's already a full URL (starts with http), use it directly
        if (image.startsWith('http')) {
            return image;
        }
        
        // If it starts with /images/, it's an old path - keep it for now
        if (image.startsWith('/images/')) {
            return image;
        }
        
        // Otherwise, treat it as a Cloudinary public ID
        return getCloudinaryUrl(image, { width: 1920, quality: 90 });
    };

    const backgroundImageUrl = getBackgroundImage();

    console.log('🎨 HeroScreen - Original image:', image);
    console.log('🎨 HeroScreen - Generated URL:', backgroundImageUrl);

    return (
        <section 
            className="hero" 
            style={{
                backgroundImage: `url(${backgroundImageUrl})`, 
                height: height, 
                opacity: opacity, 
                fontSize: title_size
            }}
        >
            <div className="quote">
                <div className="quote-title">
                    {title}
                </div>
                <div className="quote-text">
                    {text}
                </div>
            </div>
        </section>
    );
}
export default HeroScreen;