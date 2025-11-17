import "./MainToGallery.css";
import "../Main.css";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { getCloudinaryUrl } from "../utils/cloudinary";
import { CLOUDINARY_IMAGES } from "../constants/images";

function MainToGallery(props) {
    const {t} = useLanguage();
    
    const backgroundUrl = getCloudinaryUrl(CLOUDINARY_IMAGES.other.imageTextMain, {
        width: 1920,
        quality: 85,
        format: 'auto'
    });

    return (
        <div data-aos="fade-up">
            <section id="gallery" className="content-section">
                <div className="content-to-gallery">
                    <div 
                        className="content-to-gallery-title"
                        style={{ backgroundImage: `url(${backgroundUrl})` }}
                    >
                        <div className="content-to-gallery-text">
                            {t.main.textToGallery}
                        </div>
                        <Link to="/gallery" className="content-to-gallery-button">
                            {t.main.buttonToGallery}
                        </Link>
                    </div> 
                </div>
            </section>
        </div>
    );
}

export default MainToGallery;