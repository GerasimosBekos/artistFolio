import { useEffect, useState } from "react";
import "./HeroScreen.css";
import "../Main.css";
import { getCloudinaryUrl } from "../utils/cloudinary";

function HeroScreen({image, title, text, height, opacity, title_size = "4.3rem"}) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    
    // Generate URL immediately
    useEffect(() => {
        if (!image) return;
        
        let url = image;
        
        // Process image URL
        if (!image.startsWith('http') && !image.startsWith('/images/')) {
            url = getCloudinaryUrl(image, { 
                width: 1920, 
                quality: 90, 
                format: 'auto',
                crop: 'fill'
            });
        }
        
        setImageUrl(url);
        
        // Start preloading immediately
        const img = new Image();
        img.onload = () => setIsLoaded(true);
        img.onerror = () => setIsLoaded(true);
        img.src = url;
        
    }, [image]);

    return (
        <section 
            className={`hero ${isLoaded ? 'hero-loaded' : 'hero-loading'}`}
            style={{
                backgroundImage: `url(${imageUrl})`,
                height: height, 
                opacity: opacity, 
                fontSize: title_size
            }}
        >
            <div className="quote">
                <div className="quote-title">
                    {title}
                </div>
                {text && (
                    <div className="quote-text">
                        {text}
                    </div>
                )}
            </div>
        </section>
    );
}

export default HeroScreen;