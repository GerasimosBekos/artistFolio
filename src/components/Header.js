import "./Header.css";
import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

function Header() {
  const [scrollProgress, setScrollProgress] = useState(1); // 1 = fully scrolled (small header)
  const location = useLocation();

  // --- Scroll listener: update header size smoothly based on scroll position ---
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const progress = Math.min(y / 100, 1); // clamp between 0 and 1
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initialize
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- Reset scroll progress to small header when route changes ---
  useEffect(() => {
    // Only reset header if the page is actually scrolled
    if (window.scrollY > 0) {
        setScrollProgress(1);
    } else {
        setScrollProgress(0); // at top → large header
    }
  }, [location]);


  // --- Update CSS variable for smooth interpolation ---
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--header-progress",
      scrollProgress
    );
  }, [scrollProgress]);

  return (
    <header className="header">
      <div className="header-container">
        <NavLink to="/" className="logo-group">
          <img
            src="/images/logo.png"
            alt="Woodcarver Logo"
            className="logo"
          />
          <div className="artist-name">
            <span className="surname">Μπέκος</span>
            <span className="name">&nbsp;&nbsp;Παναγιώτης</span>
            <span className="profession">Ξυλογλύπτης</span>
          </div>
        </NavLink>

        <nav className="nav">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-option active" : "nav-option"
            }
          >
            <span>Αρχική</span>
          </NavLink>
          <NavLink
            to="/gallery"
            className={({ isActive }) =>
              isActive ? "nav-option active" : "nav-option"
            }
          >
            <span>Δημιουργίες</span>
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "nav-option active" : "nav-option"
            }
          >
            <span>To Εργαστήρι</span>
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "nav-option active" : "nav-option"
            }
          >
            <span>Επικοινωνία</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
