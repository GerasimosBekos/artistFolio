import { Link } from "react-router-dom";
import "./Footer.css";
import { useLanguage } from "../contexts/LanguageContext"

function Footer(props) {

    const {t} = useLanguage();

    return (
        <footer className="site-footer">
            <div className="footer-content">
                <div className="footer-left">
                <h3 className="footer-title">{t.footer.woodcarverFullName}</h3>
                <p className="footer-subtitle">{t.footer.description}</p>
                </div>

                <div className="footer-center">
                <Link to="/gallery" className="footer-link">{t.footer.gallery}</Link>
                <Link to="/about" className="footer-link">{t.footer.about}</Link>
                <Link to="/contact" className="footer-link">{t.footer.contact}</Link>
                
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