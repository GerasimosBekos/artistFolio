import { Link } from "react-router-dom";
import "./Footer.css";

function Footer(props) {
    return (
        <footer className="site-footer">
            <div className="footer-content">
                <div className="footer-left">
                <h3 className="footer-title">Παναγιώτης Μπέκος</h3>
                <p className="footer-subtitle">Ξυλογλυπτική τέχνη &amp; παράδοση</p>
                </div>

                <div className="footer-center">
                <Link to="/contact" className="footer-link">Σχετικά</Link>
                <Link to="/gallery" className="footer-link">Δημιουργίες</Link>
                <Link to="/about" className="footer-link">Επικοινωνία</Link>
                
                </div>

                <div className="footer-right">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="footer-social">Facebook</a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="footer-social">Instagram</a>
                </div>
            </div>

            <div className="footer-bottom">
                © {new Date().getFullYear()} Panagiotis Bekos — All rights reserved
            </div>
        </footer>

    );
}
export default Footer;