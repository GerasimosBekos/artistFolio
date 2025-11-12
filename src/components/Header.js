import "./Header.css";
import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";

function Header() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY;
          const progress = Math.min(y / 100, 1);
          setScrollProgress(progress);
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initialize on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- Update CSS variable for smooth interpolation ---
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--header-progress",
      scrollProgress
    );
  }, [scrollProgress]);

  // --- Reset on route change ---
  useEffect(() => {
    if (window.scrollY === 0) {
      setScrollProgress(0); // at top → large header
    } else {
      setScrollProgress(1); // scrolled → small header
    }
  }, [location]);

  return (
    <header className="header">
      <div className="header-container">
        {/* <NavLink to="/" className="logo-group">
          <img src="/images/logo.png" alt="Woodcarver Logo" className="logo" />
          <div className="artist-name">
            <span className="surname">Μπέκος</span>
            <span className="name">&nbsp;&nbsp;Παναγιώτης</span>
            <span className="profession">Ξυλογλύπτης</span>
          </div> */}
        {/* </NavLink> */}
        <NavLink
          to="/"
          className="logo-group"
          onClick={(e) => {
            if (location.pathname === "/") {
              e.preventDefault(); // stop React Router from reloading
              window.scrollTo({ top: 0, behavior: "smooth" });
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
                  e.preventDefault(); // prevent re-navigation
                  window.scrollTo({ top: 0, behavior: "smooth" });
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
