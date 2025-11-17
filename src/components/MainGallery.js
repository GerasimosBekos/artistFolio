import "./MainGallery.css";
import "../Main.css";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { getCloudinaryUrl } from "../utils/cloudinary";
import { CLOUDINARY_IMAGES } from "../constants/images";

function MainGallery(props) {
    const {t} = useLanguage();

    const getCategoryImage = (publicId) => {
        return getCloudinaryUrl(publicId, { width: 500, quality: 85, format: 'auto' });
    };

    return (
        <div>
            <section id="gallery" className="content-section">
                <div className="content-gallery"> 
                    <div className="content-gallery-grid">
                        <Link to="/gallery/templa" className="gallery-item wide">
                            <img src={getCategoryImage(CLOUDINARY_IMAGES.categories.templo)} alt="Τέμπλα" />
                            <span>{t.categories.templa}</span>
                        </Link>

                        <Link to="/gallery/proskinitaria" className="gallery-item tall">
                            <img src={getCategoryImage(CLOUDINARY_IMAGES.categories.prosk)} alt="Προσκυνητάρια" />
                            <span>{t.categories.proskinitaria}</span>
                        </Link>

                        <Link to="/gallery/stasidia" className="gallery-item">
                            <img src={getCategoryImage(CLOUDINARY_IMAGES.categories.stasidia)} alt="Στασίδια" />
                            <span>{t.categories.stasidia}</span>
                        </Link>

                        <Link to="/gallery/epitafioi" className="gallery-item tall">
                            <img src={getCategoryImage(CLOUDINARY_IMAGES.categories.epitafios)} alt="Επιτάφιοι" />
                            <span>{t.categories.epitafioi}</span>
                        </Link>

                        <Link to="/gallery/kornizes" className="gallery-item">
                            <img src={getCategoryImage(CLOUDINARY_IMAGES.categories.korniza)} alt="Κορνίζες" />
                            <span>{t.categories.kornizes}</span>
                        </Link>

                        <Link to="/gallery/stavroi" className="gallery-item tall">
                            <img src={getCategoryImage(CLOUDINARY_IMAGES.categories.stavros)} alt="Σταυροί" />
                            <span>{t.categories.stavroi}</span>
                        </Link>

                        <Link to="/gallery/thronoi" className="gallery-item tall">
                            <img src={getCategoryImage(CLOUDINARY_IMAGES.categories.thronos)} alt="Θρόνοι" />
                            <span>{t.categories.thronoi}</span>
                        </Link>

                        <Link to="/gallery/pagkaria" className="gallery-item">
                            <img src={getCategoryImage(CLOUDINARY_IMAGES.categories.pagkari)} alt="Παγκάρια" />
                            <span>{t.categories.pagkaria}</span>
                        </Link>

                        <Link to="/gallery/polithrones" className="gallery-item tall">
                            <img src={getCategoryImage(CLOUDINARY_IMAGES.categories.polithrona)} alt="Πολυθρόνες" />
                            <span>{t.categories.polithrones}</span>
                        </Link>

                        <Link to="/gallery/amvones" className="gallery-item tall">
                            <img src={getCategoryImage(CLOUDINARY_IMAGES.categories.amvonas)} alt="Άμβωνες" />
                            <span>{t.categories.amvones}</span>
                        </Link>

                        <Link to="/gallery/karekles" className="gallery-item">
                            <img src={getCategoryImage(CLOUDINARY_IMAGES.categories.karekles)} alt="Καρέκλες" />
                            <span>{t.categories.karekles}</span>
                        </Link>

                        <Link to="/gallery/psaltiria" className="gallery-item">
                            <img src={getCategoryImage(CLOUDINARY_IMAGES.categories.psaltiri)} alt="Ψαλτήρια" />
                            <span>{t.categories.psaltiria}</span>
                        </Link>

                        <Link to="/gallery/lipsanothikes" className="gallery-item">
                            <img src={getCategoryImage(CLOUDINARY_IMAGES.categories.lipsanothiki)} alt="Λειψανοθήκες" />
                            <span>{t.categories.lipsanothikes}</span>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default MainGallery;