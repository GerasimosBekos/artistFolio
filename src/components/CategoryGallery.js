import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "./Header";
import Breadcrumb from "../components/Breadcrumb";
import HeroScreen from "./HeroScreen";
import Footer from "./Footer";
import galleryData from "../data/galleryData.json";
import Zoom from "react-image-zooom";
import "./CategoryGallery.css";

const CategoryGallery = () => {
  const { category } = useParams();
  const data = galleryData[category];

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [imageClasses, setImageClasses] = useState({});
  const [orderedImages, setOrderedImages] = useState([]);

  // --- Detect proportions and auto-balance grid order ---
  useEffect(() => {
    if (!data || !data.images) return;

    const loadImages = async () => {
      const imagesInfo = [];

      await Promise.all(
        data.images.map((src) => {
          return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
              const aspect = img.width / img.height;
              let cls = "";
              if (aspect > 1.3) cls = "wide";
              else if (aspect < 0.8) cls = "tall";
              imagesInfo.push({ src, aspect, cls });
              resolve();
            };
            img.src = src;
          });
        })
      );

      // Separate by class type
      const tall = imagesInfo.filter((i) => i.cls === "tall");
      const wide = imagesInfo.filter((i) => i.cls === "wide");
      const normal = imagesInfo.filter((i) => i.cls === "");

      // --- Simple balancing algorithm ---
      const mixed = [];
      while (tall.length || wide.length || normal.length) {
        if (normal.length) mixed.push(normal.shift());
        if (wide.length) mixed.push(wide.shift());
        if (tall.length) mixed.push(tall.shift());
      }

      // Set state for both classes and order
      setImageClasses(
        mixed.reduce((acc, item) => {
          acc[item.src] = item.cls;
          return acc;
        }, {})
      );

      setOrderedImages(mixed.map((i) => i.src));
    };

    loadImages();
  }, [data]);

  // --- Keyboard navigation for lightbox ---
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
      <HeroScreen image={data.hero} title={data.title} height="60vh" />
      <Breadcrumb />

      <div className="category-gallery">
        <h1 className="category-title">{data.title}</h1>

        <div className="category-grid">
          {orderedImages.map((src, i) => (
            <div
              key={i}
              className={`category-item ${imageClasses[src] || ""}`}
              onClick={() => setSelectedIndex(i)}
            >
              <img src={src} alt={`${data.title} ${i + 1}`} />
            </div>
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
            onClick={(e) => e.stopPropagation()} // prevent close when zooming
          >
            <Zoom
              src={orderedImages[selectedIndex]}
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
