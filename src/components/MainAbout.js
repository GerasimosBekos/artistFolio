import "../Main.css";
import "./MainAbout.css";
import { useLanguage } from "../contexts/LanguageContext";
import { getCloudinaryUrl} from "../utils/cloudinary";
import { CLOUDINARY_IMAGES } from "../constants/images";

function MainAbout(props) {

    const {t} = useLanguage();

    return (
        <div>
            <section id="about" className="content-section">
                <div className="content-about">
                    <div className="content-about-image">
                        <img 
                            src={getCloudinaryUrl(CLOUDINARY_IMAGES.misc.artist, { 
                                width: 400, 
                                quality: 85,
                                format: 'auto'
                            })} 
                            alt="About Me" 
                            className="content-about-img" 
                        />
                    </div>
                    <div className="content-about-text">
                        <div className="content-about-text-title">
                            {t.about.aboutMeTitle}
                        </div>
                        <div className="content-about-text-body">
                            {t.about.aboutMeText} 
                        </div>
                        <div className="content-about-text-signature">
                            {t.about.woodcarverFullName}
                        </div>
                        <div className="content-about-text-profession">
                            {t.about.woodcarverSpeciality}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
export default MainAbout;