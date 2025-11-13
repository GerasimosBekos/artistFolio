import "./MainGallery.css";
import "../Main.css";
import { Link } from "react-router-dom";

function MainGallery(props) {
    return (
        <div>
            <section id="gallery" className="content-section">
                <div className="content-gallery"> 
                    <div className="content-gallery-grid">
                        <Link to="/gallery/templa" className="gallery-item wide">
                            <img src="/images/categories/templo.jpg" alt="Τέμπλα" />
                            <span>Τέμπλα</span>
                        </Link>

                        <Link to="/gallery/proskinitaria" className="gallery-item tall">
                            <img src="/images/categories/prosk.jpg" alt="Προσκυνητάρια" />
                            <span>Προσκυνητάρια</span>
                        </Link>

                        <Link to="/gallery/stasidia" className="gallery-item">
                            <img src="/images/categories/stasidia.jpg" alt="Στασίδια" />
                            <span>Στασίδια</span>
                        </Link>

                        <Link to="/gallery/epitafioi" className="gallery-item tall">
                            <img src="/images/categories/epitafios.jpg" alt="Επιτάφιοι" />
                            <span>Επιτάφιοι</span>
                        </Link>

                        <Link to="/gallery/kornizes" className="gallery-item">
                            <img src="/images/categories/korniza.jpg" alt="Κορνίζες" />
                            <span>Κορνίζες</span>
                        </Link>

                        <Link to="/gallery/stavroi" className="gallery-item tall">
                            <img src="/images/categories/stavros.jpg" alt="Σταυροί" />
                            <span>Σταυροί</span>
                        </Link>

                        <Link to="/gallery/thronoi" className="gallery-item tall">
                            <img src="/images/categories/thronos.jpg" alt="Θρόνοι" />
                            <span>Θρόνοι</span>
                        </Link>

                        <Link to="/gallery/pagkaria" className="gallery-item">
                            <img src="/images/categories/pagkari.jpg" alt="Παγκάρια" />
                            <span>Παγκάρια</span>
                        </Link>

                        <Link to="/gallery/polithrones" className="gallery-item tall">
                            <img src="/images/categories/polithrona.jpg" alt="Πολυθρόνες" />
                            <span>Πολυθρόνες</span>
                        </Link>

                        <Link to="/gallery/amvones" className="gallery-item tall">
                            <img src="/images/categories/amvonas.jpg" alt="Άμβωνες" />
                            <span>Άμβωνες</span>
                        </Link>

                        <Link to="/gallery/karekles" className="gallery-item">
                            <img src="/images/categories/karekles.jpg" alt="Καρέκλες" />
                            <span>Καρέκλες</span>
                        </Link>

                        <Link to="/gallery/psaltiria" className="gallery-item">
                            <img src="/images/categories/psaltiri.jpg" alt="Ψαλτήρια" />
                            <span>Ψαλτήρια</span>
                        </Link>

                        <Link to="/gallery/lipsanothikes" className="gallery-item">
                            <img src="/images/categories/lipsanothiki.jpg" alt="Λειψανοθήκες" />
                            <span>Λειψανοθήκες</span>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
export default MainGallery;