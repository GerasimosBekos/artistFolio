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

  // --- Detect image proportions ---
  useEffect(() => {
    if (!data || !data.images) return;

    const loadImages = async () => {
      const classes = {};
      await Promise.all(
        data.images.map((src) => {
          return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
              if (img.height > img.width * 1.2) classes[src] = "tall";
              else if (img.width > img.height * 1.2) classes[src] = "wide";
              else classes[src] = "";
              resolve();
            };
            img.src = src;
          });
        })
      );
      setImageClasses(classes);
    };

    loadImages();
  }, [data]);

  // --- Keyboard navigation for lightbox ---
  useEffect(() => {
    const handleKey = (e) => {
      if (selectedIndex === null || !data) return;
      if (e.key === "Escape") setSelectedIndex(null);
      else if (e.key === "ArrowRight")
        setSelectedIndex((i) => (i + 1) % data.images.length);
      else if (e.key === "ArrowLeft")
        setSelectedIndex(
          (i) => (i - 1 + data.images.length) % data.images.length
        );
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedIndex, data]);

  // --- Conditional rendering is safe AFTER hooks ---
  if (!data) {
    return (
      <>
        <Header />
        <div className="category-gallery">
          <h1>Η κατηγορία δεν βρέθηκε.</h1>
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
          {data.images.map((src, i) => (
            <div
              key={i}
              className={`category-item ${imageClasses[src] || ""}`}
              onClick={() => setSelectedIndex(i)}
            >
              <img src={src} alt={`${data.title} ${i + 1}`} />
            </div>
          ))}
        </div>

        <div >
          <Link to="/gallery" className="gallery-back">← Επιστροφή στις κατηγορίες</Link>
        </div>
      </div>

      {selectedIndex !== null && (
        <div className="lightbox" onClick={() => setSelectedIndex(null)}>
          <span
            className="nav-arrow left"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex(
                (selectedIndex - 1 + data.images.length) % data.images.length
              );
            }}
          >
            ‹
          </span>

          {/* ZOOM Component */}
          <div
            className="zoom-wrapper"
            onClick={(e) => e.stopPropagation()} // prevents closing when clicking inside
          >
            <Zoom
              src={data.images[selectedIndex]}
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
              setSelectedIndex((selectedIndex + 1) % data.images.length);
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
