import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "./Header";
import Breadcrumb from "../components/Breadcrumb";
import HeroScreen from "./HeroScreen";
import Footer from "./Footer";
import galleryData from "../data/galleryData.json";
import Zoom from "react-image-zooom";
import "./CategoryGallery.css";
import { getCloudinaryUrl } from "../utils/cloudinary";

// ===================================================================
// LAZY LOADING IMAGE COMPONENT
// ===================================================================
const LazyImage = ({ publicId, alt, className, onClick, width = 600 }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const imgRef = useRef(null);

  // KEY ASPECT 1: Intersection Observer
  // Watches when image enters viewport, then triggers loading
  useEffect(() => {
    if (!imgRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true); // Signal to start loading full image
            observer.disconnect(); // Stop observing once triggered
          }
        });
      },
      {
        rootMargin: '100px', // Start loading 100px before entering viewport
      }
    );

    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, []);

  // KEY ASPECT 2: Generate optimized URLs
  const thumbnailUrl = getCloudinaryUrl(publicId, { 
    width: 50,      // Tiny 50px width = ~1KB file
    quality: 30,    // Low quality for blur placeholder
    format: 'auto'  // WebP/AVIF for modern browsers
  });

  const fullUrl = getCloudinaryUrl(publicId, { 
    width,          // Full size (600px)
    quality: 'auto', // Cloudinary auto-optimizes
    format: 'auto'
  });

  return (
    <div 
      ref={imgRef} 
      className={className}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* KEY ASPECT 3: Blur Placeholder (loads immediately, ~1KB) */}
      <img
        src={thumbnailUrl}
        alt={alt}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: 'blur(10px)',
          transform: isHovered ? 'scale(1.05)' : 'scale(1)', // FIX: Apply hover here
          transition: 'opacity 0.3s ease, transform 0.4s ease', // FIX: Add transform transition
          opacity: isLoaded ? 0 : 1,
        }}
      />
      
      {/* KEY ASPECT 4: Full Quality Image (loads when in viewport) */}
      {isInView && (
        <img
          src={fullUrl}
          alt={alt}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)', // FIX: Apply hover here too
            transition: 'opacity 0.3s ease, transform 0.4s ease', // FIX: Add transform transition
            opacity: isLoaded ? 1 : 0,
          }}
          onLoad={() => setIsLoaded(true)} // Mark as loaded when image ready
        />
      )}
    </div>
  );
};

// ===================================================================
// MAIN CATEGORY GALLERY COMPONENT
// ===================================================================
const CategoryGallery = () => {
  const { category } = useParams();
  const data = galleryData[category];

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [imageClasses, setImageClasses] = useState({});
  const [orderedImages, setOrderedImages] = useState([]);

  // KEY ASPECT 5: Detect Image Proportions
  // Uses tiny thumbnails to determine if image is wide/tall/normal
  useEffect(() => {
    if (!data || !data.images) return;

    const loadImages = async () => {
      const imagesInfo = [];

      await Promise.all(
        data.images.map((publicId) => {
          return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
              const aspect = img.width / img.height;
              let cls = "";
              if (aspect > 1.3) cls = "wide";        // Landscape
              else if (aspect < 0.8) cls = "tall";   // Portrait
              // else normal (square-ish)
              imagesInfo.push({ publicId, aspect, cls });
              resolve();
            };
            img.onerror = () => {
              console.error(`Failed to load image: ${publicId}`);
              imagesInfo.push({ publicId, aspect: 1, cls: "" });
              resolve();
            };
            // Load tiny 100px thumbnail just to get dimensions
            img.src = getCloudinaryUrl(publicId, { width: 100, quality: 30 });
          });
        })
      );

      // KEY ASPECT 6: Balance Grid Layout
      // Distribute wide/tall/normal images evenly for aesthetic grid
      const tall = imagesInfo.filter((i) => i.cls === "tall");
      const wide = imagesInfo.filter((i) => i.cls === "wide");
      const normal = imagesInfo.filter((i) => i.cls === "");

      const mixed = [];
      while (tall.length || wide.length || normal.length) {
        if (normal.length) mixed.push(normal.shift());
        if (wide.length) mixed.push(wide.shift());
        if (tall.length) mixed.push(tall.shift());
      }

      setImageClasses(
        mixed.reduce((acc, item) => {
          acc[item.publicId] = item.cls;
          return acc;
        }, {})
      );

      setOrderedImages(mixed.map((i) => i.publicId));
    };

    loadImages();
  }, [data]);

  // KEY ASPECT 7: Preload Adjacent Images in Lightbox
  // When lightbox opens or navigates, preload next/prev images
  useEffect(() => {
    if (selectedIndex === null || orderedImages.length === 0) return;

    // Preload current image (if not already loaded)
    const currentImg = new Image();
    currentImg.src = getCloudinaryUrl(orderedImages[selectedIndex], { 
      width: 2400, 
      quality: 90 
    });

    // FIX: Preload NEXT image
    const nextIndex = (selectedIndex + 1) % orderedImages.length;
    const nextImg = new Image();
    nextImg.src = getCloudinaryUrl(orderedImages[nextIndex], { 
      width: 2400, 
      quality: 90 
    });

    // FIX: Preload PREVIOUS image
    const prevIndex = (selectedIndex - 1 + orderedImages.length) % orderedImages.length;
    const prevImg = new Image();
    prevImg.src = getCloudinaryUrl(orderedImages[prevIndex], { 
      width: 2400, 
      quality: 90 
    });

    console.log(`🖼️ Preloading: current=${selectedIndex}, next=${nextIndex}, prev=${prevIndex}`);

  }, [selectedIndex, orderedImages]);

  // KEY ASPECT 8: Keyboard Navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (selectedIndex === null || !data) return;
      if (e.key === "Escape") setSelectedIndex(null);
      else if (e.key === "ArrowRight")
        setSelectedIndex((i) => (i + 1) % orderedImages.length);
      else if (e.key === "ArrowLeft")
        setSelectedIndex(
          (i) => (i - 1 + orderedImages.length) % orderedImages.length
        );
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedIndex, orderedImages, data]);

  // --- If category doesn't exist ---
  if (!data) {
    return (
      <>
        <Header />
        <div className="category-gallery" style={{marginTop: "250px", fontFamily: " 'Zen Old Mincho', serif", textAlign: "center"}}>
          <h1>Μόνο Τέμπλα μπορείτε να διαλέξετε (τα υπόλοιπα είναι προς υλοποίηση)</h1>
          <Link to="/gallery" className="gallery-back">
            ← Επιστροφή στις κατηγορίες
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <HeroScreen 
        image={data.hero} 
        title={data.title} 
        height="60vh" 
      />
      <Breadcrumb />

      <div className="category-gallery">
        <h1 className="category-title">{data.title}</h1>

        <div className="category-grid">
          {orderedImages.map((publicId, i) => (
            <LazyImage
              key={i}
              publicId={publicId}
              alt={`${data.title} ${i + 1}`}
              className={`category-item ${imageClasses[publicId] || ""}`}
              onClick={() => setSelectedIndex(i)}
              width={600}
            />
          ))}
        </div>

        <div>
          <Link to="/gallery" className="gallery-back">
            ← Επιστροφή στις κατηγορίες
          </Link>
        </div>
      </div>

      {/* --- LIGHTBOX --- */}
      {selectedIndex !== null && (
        <div className="lightbox" onClick={() => setSelectedIndex(null)}>
          <span
            className="nav-arrow left"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex(
                (selectedIndex - 1 + orderedImages.length) %
                  orderedImages.length
              );
            }}
          >
            ‹
          </span>

          <div
            className="zoom-wrapper"
            onClick={(e) => e.stopPropagation()}
          >
            <Zoom
              src={getCloudinaryUrl(orderedImages[selectedIndex], { 
                width: 2400, 
                quality: 90 
              })}
              alt={`Full view ${selectedIndex + 1}`}
              zoom="200"
              transitionTime={0.4}
              className="lightbox-image"
            />
          </div>

          <span
            className="nav-arrow right"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex((selectedIndex + 1) % orderedImages.length);
            }}
          >
            ›
          </span>

          <span
            className="close"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex(null);
            }}
          >
            ×
          </span>
        </div>
      )}

      <Footer />
    </>
  );
};

export default CategoryGallery;