import "./Header.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Header(props) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
        if (window.scrollY > 20) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return (
        <header className={`header ${scrolled ? "scrolled" : ""}`}> 
            <div className="header-container">
                <Link to="/" className="logo-group">
                    <img src="/images/logo.png" alt="Woodcarver Logo" className="logo" />
                    <div className="artist-name">
                        <span className="surname">Μπέκος</span>
                        <span className="name">&nbsp;&nbsp;Παναγιώτης</span>
                        <span className="profession">Ξυλογλύπτης</span>
                    </div>
                </Link>
                
                
                <nav className="nav">
                    <Link to="/" style={{ textDecoration: 'none' }} className="nav-option">
                        Αρχική
                    </Link>
                    <Link to="/gallery" style={{ textDecoration: 'none' }} className="nav-option">
                        Δημιουργίες
                    </Link>
                    <Link to="/about" style={{ textDecoration: 'none' }} className="nav-option">
                        Ποιοί είμαστε
                    </Link>
                    <Link to="/contact" style={{ textDecoration: 'none' }} className="nav-option">
                        Επικοινωνία
                    </Link>  
                </nav>
            </div>
        </header>
    );
}
export default Header;