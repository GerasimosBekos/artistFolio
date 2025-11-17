import "./Header.css";
import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext"
import { getCloudinaryUrl } from "../utils/cloudinary";
import { CLOUDINARY_IMAGES } from "../constants/images";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isScrollingToTop = useRef(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const {t} = useLanguage();
  const { language, toggleLanguage } = useLanguage();

  // Scroll detection - only when not actively scrolling to top
  useEffect(() => {
    const handleScroll = () => {
      if (!isScrollingToTop.current) {
        setIsScrolled(window.scrollY > 50);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle smooth scroll to top
  const smoothScrollToTop = () => {
    isScrollingToTop.current = true;
    
    // Keep header in current state during scroll
    const currentScrolled = window.scrollY > 200;
    setIsScrolled(currentScrolled);
    
    // Start smooth scroll
    window.scrollTo({ top: 0, behavior: "smooth" });
    
    // Wait for scroll to complete (600ms is safe for smooth scroll)
    setTimeout(() => {
      isScrollingToTop.current = false;
      // Now update header based on actual position
      setIsScrolled(window.scrollY > 50);
    }, 600);
  };

  // Handle route changes
  useEffect(() => {
    isScrollingToTop.current = true;
    
    // Set header to big immediately
    setIsScrolled(false);
    
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: "smooth" });
    
    // After animation, re-enable scroll detection
    setTimeout(() => {
      isScrollingToTop.current = false;
      setIsScrolled(window.scrollY > 50);
    }, 800);
  }, [location.pathname]);

   // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".lang-dropdown")) setDropdownOpen(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleLanguageSelect = () => {
    toggleLanguage();
    setDropdownOpen(false);
  };

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="header-container">
        <NavLink
          to="/"
          className="logo-group"
          onClick={(e) => {
            if (location.pathname === "/") {
              e.preventDefault();
              smoothScrollToTop();
            }
          }}
        >
          <img 
            src={getCloudinaryUrl(CLOUDINARY_IMAGES.other.logo, { 
                width: 300, 
                quality: 90,
                format: 'auto'
            })} 
            alt="Woodcarver Logo" 
            className="logo" 
          />
          <div className="artist-name">
            <span className="surname">{t.header.woodcarverSurname}</span>
            <span className="name">&nbsp;&nbsp;{t.header.woodcarverName}</span>
            <span className="profession">{t.header.woodcarverSpeciality}</span>
          </div>
        </NavLink>

        <nav className="nav">
          {[
            { to: "/", label: t.header.main },
            { to: "/gallery", label: t.header.gallery },
            { to: "/about", label: t.header.about },
            { to: "/contact", label: t.header.contact },
          ].map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={(e) => {
                if (location.pathname === link.to) {
                  e.preventDefault();
                  smoothScrollToTop();
                }
              }}
              className={({ isActive }) =>
                isActive ? "nav-option active" : "nav-option"
              }
            >
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>
        {/* <button className="lang-toggle" onClick={toggleLanguage}>
          {language === 'el' ? 'EN' : 'EL'}
        </button> */}
        <div className="lang-dropdown">
          <button
            className="lang-button"
            onClick={() => setDropdownOpen((prev) => !prev)}
          >
            {language === "el" ? "EL" : "EN"}
            <span className={`arrow ${dropdownOpen ? "up" : "down"}`}></span>
          </button>
          {dropdownOpen && (
            <div className="lang-menu">
              <button
                className="lang-option"
                onClick={handleLanguageSelect}
              >
                {language === "el" ? "EN" : "EL"}
              </button>
            </div>
          )}
        </div>
      </div>
       
    </header>
  );
}

export default Header;