// import ReactDOM from "react-dom/client";
import React, { useEffect } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Main from "./Main";
import About from "./About";
import Contact from "./Contact";
import Gallery from "./Gallery";
import CategoryGallery from "./components/CategoryGallery";
import ScrollToTop from "./components/ScrollToTop";
import './App.css';
import './index.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { LanguageProvider } from './contexts/LanguageContext';

function AOSInitializer() {
  const location = useLocation();

  useEffect(() => {
    // Check if we're at the top and refresh AOS
    const checkScrollAndRefresh = () => {
      if (window.scrollY < 10) {
        // We're at the top, refresh AOS to trigger animations
        AOS.refresh();
      } else {
        // Not at top yet, check again soon
        requestAnimationFrame(checkScrollAndRefresh);
      }
    };

    // Start checking
    checkScrollAndRefresh();
  }, [location.pathname]);

  return null;
}

function App() {
  // Disable browser's automatic scroll restoration
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Initialize AOS once globally
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
      easing: 'ease-in-out',
      disable: false
    });
  }, []);

  return (
    <LanguageProvider>
      <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <AOSInitializer />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/gallery/:category" element={<CategoryGallery />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
    </LanguageProvider>
  );
}

export default App;
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App />);