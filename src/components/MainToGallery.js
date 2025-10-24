import "./MainToGallery.css";
import "../Main.css";
import { Link } from "react-router-dom";

function MainToGallery(props) {
    return (
        <div>
            <section id="gallery" className="content-section">
                <div className="content-to-gallery">
                    <div className="content-to-gallery-title">
                        <div className="content-to-gallery-text">
                            Ανακαλύψτε όλες τις δημιουργίες μου
                        </div>
                        <Link to="/gallery" className="content-to-gallery-button">
                            Δείτε τη συλλογή
                        </Link>
                    </div> 
                </div>
            </section>
        </div>
    );
}
export default MainToGallery;