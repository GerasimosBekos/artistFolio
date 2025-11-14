import "./MainGallery.css";
import "../Main.css";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { getCloudinaryUrl } from '../utils/cloudinary';

function MainGallery(props) {

    const {t} = useLanguage();

    return (
        <div>
            <section id="gallery" className="content-section">
                <div className="content-gallery"> 
                    <div className="content-gallery-grid">
                        {/* DOOOT TTHEEE RESSTT */}
                        <Link to="/gallery/templa" className="gallery-item wide">
                            <img 
                                src={getCloudinaryUrl('woodcarver/categories/templo', { width: 500 })} 
                                alt="Τέμπλα" 
                            />
                            <span>{t.categories.templa}</span>
                        </Link>

                        <Link to="/gallery/proskinitaria" className="gallery-item tall">
                            <img src="/images/categories/prosk.jpg" alt="Προσκυνητάρια" />
                            <span>{t.categories.proskinitaria}</span>
                        </Link>

                        <Link to="/gallery/stasidia" className="gallery-item">
                            <img src="/images/categories/stasidia.jpg" alt="Στασίδια" />
                            <span>{t.categories.stasidia}</span>
                        </Link>

                        <Link to="/gallery/epitafioi" className="gallery-item tall">
                            <img src="/images/categories/epitafios.jpg" alt="Επιτάφιοι" />
                            <span>{t.categories.epitafioi}</span>
                        </Link>

                        <Link to="/gallery/kornizes" className="gallery-item">
                            <img src="/images/categories/korniza.jpg" alt="Κορνίζες" />
                            <span>{t.categories.kornizes}</span>
                        </Link>

                        <Link to="/gallery/stavroi" className="gallery-item tall">
                            <img src="/images/categories/stavros.jpg" alt="Σταυροί" />
                            <span>{t.categories.stavroi}</span>
                        </Link>

                        <Link to="/gallery/thronoi" className="gallery-item tall">
                            <img src="/images/categories/thronos.jpg" alt="Θρόνοι" />
                            <span>{t.categories.thronoi}</span>
                        </Link>

                        <Link to="/gallery/pagkaria" className="gallery-item">
                            <img src="/images/categories/pagkari.jpg" alt="Παγκάρια" />
                            <span>{t.categories.pagkaria}</span>
                        </Link>

                        <Link to="/gallery/polithrones" className="gallery-item tall">
                            <img src="/images/categories/polithrona.jpg" alt="Πολυθρόνες" />
                            <span>{t.categories.polithrones}</span>
                        </Link>

                        <Link to="/gallery/amvones" className="gallery-item tall">
                            <img src="/images/categories/amvonas.jpg" alt="Άμβωνες" />
                            <span>{t.categories.amvones}</span>
                        </Link>

                        <Link to="/gallery/karekles" className="gallery-item">
                            <img src="/images/categories/karekles.jpg" alt="Καρέκλες" />
                            <span>{t.categories.karekles}</span>
                        </Link>

                        <Link to="/gallery/psaltiria" className="gallery-item">
                            <img src="/images/categories/psaltiri.jpg" alt="Ψαλτήρια" />
                            <span>{t.categories.psaltiria}</span>
                        </Link>

                        <Link to="/gallery/lipsanothikes" className="gallery-item">
                            <img src="/images/categories/lipsanothiki.jpg" alt="Λειψανοθήκες" />
                            <span>{t.categories.lipsanothikes}</span>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
export default MainGallery;