import "./Footer.css";

function Footer(props) {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-left">
                <p className="footer-brand">© 2025 Your Name</p>
                <p className="footer-credits">All rights reserved</p>
                </div>

                <div className="footer-socials">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer-link">
                    Facebook
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-link">
                    Instagram
                </a>
                </div>
            </div>
        </footer>
    );
}
export default Footer;