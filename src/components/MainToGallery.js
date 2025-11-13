import "./MainToGallery.css";
import "../Main.css";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext"

function MainToGallery(props) {

    const {t} = useLanguage();

    return (
        <div data-aos="fade-up">
            <section id="gallery" className="content-section">
                <div className="content-to-gallery">
                    <div className="content-to-gallery-title">
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