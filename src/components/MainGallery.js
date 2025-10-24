import "./MainGallery.css";
import "../Main.css";

function MainGallery(props) {
    return (
        <div>
            <section id="gallery" className="content-section">
                <div className="content-gallery">
                    <div className="content-gallery-subtitle">
                        KATHΓOPIEΣ
                    </div>
                    <div className="content-gallery-title">
                        Δημιουργίες
                    </div>
                    <div className="content-gallery-grid">
                        <div className="gallery-item wide"><img src="/images/categories/templo.jpg" alt="Τέμπλα" /><span>Τέμπλα</span></div>
                        <div className="gallery-item tall"><img src="/images/categories/prosk.jpg" alt="Προσκυνητάρια" /><span>Προσκυνητάρια</span></div>
                        <div className="gallery-item"><img src="/images/categories/stasidia.jpg" alt="Στασίδια" /><span>Στασίδια</span></div>     
                        <div className="gallery-item tall"><img src="/images/categories/epitafios.jpg" alt="Επιτάφιοι" /><span>Επιτάφιοι</span></div>
                        <div className="gallery-item"><img src="/images/categories/korniza.jpg" alt="Κορνίζες" /><span>Κορνίζες</span></div>
                        <div className="gallery-item tall"><img src="/images/categories/stavros.jpg" alt="Σταυροί" /><span>Σταυροί</span></div>
                            <div className="gallery-item tall"><img src="/images/categories/thronos.jpg" alt="Θρόνοι" /><span>Θρόνοι</span></div>
                        <div className="gallery-item"><img src="/images/categories/pagkari.jpg" alt="Παγκάρια" /><span>Παγκάρια</span></div>
                        <div className="gallery-item tall"><img src="/images/categories/polithrona.jpg" alt="Πολυθρόνες" /><span>Πολυθρόνες</span></div>
                        <div className="gallery-item tall"><img src="/images/categories/amvonas.jpg" alt="Άμβωνες" /><span>Άμβωνες</span></div>
                        <div className="gallery-item"><img src="/images/categories/karekles.jpg" alt="Καρέκλες" /><span>Καρέκλες</span></div>
                        <div className="gallery-item"><img src="/images/categories/psaltiri.jpg" alt="Ψαλτήρια" /><span>Ψαλτήρια</span></div>
                        <div className="gallery-item"><img src="/images/categories/lipsanothiki.jpg" alt="Λειψανοθήκες" /><span>Λειψανοθήκες</span></div>
                    </div>
                </div>
            </section>
        </div>
    );
}
export default MainGallery;