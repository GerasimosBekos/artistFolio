import "./Header.css";
import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isScrollingToTop = useRef(false);

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
          <img src="/images/logo.png" alt="Woodcarver Logo" className="logo" />
          <div className="artist-name">
            <span className="surname">Μπέκος</span>
            <span className="name">&nbsp;&nbsp;Παναγιώτης</span>
            <span className="profession">Ξυλογλύπτης</span>
          </div>
        </NavLink>

        <nav className="nav">
          {[
            { to: "/", label: "Αρχική" },
            { to: "/gallery", label: "Δημιουργίες" },
            { to: "/about", label: "To Εργαστήρι" },
            { to: "/contact", label: "Επικοινωνία" },
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
      </div>
    </header>
  );
}

export default Header;