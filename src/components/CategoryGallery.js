import React from "react";
import { useParams, Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import "./CategoryGallery.css";

const categoryData = {
  templa: {
    title: "Τέμπλα",
    images: ["/images/templa/1.jpg", "/images/templa/2.jpg"],
  },
  proskinitaria: {
    title: "Προσκυνητάρια",
    images: ["/images/proskinitaria/1.jpg", "/images/proskinitaria/2.jpg"],
  },
  stasidia: {
    title: "Στασίδια",
    images: ["/images/stasidia/1.jpg", "/images/stasidia/2.jpg"],
  },
  // ... add the rest
};

const CategoryGallery = () => {
  const { category } = useParams();
  const data = categoryData[category];

  if (!data) {
    return <div>Κατηγορία δεν βρέθηκε.</div>;
  }

  return (
    <div className="category-gallery">
        
      <Breadcrumb />
      <h1 className="category-title">{data.title}</h1>
      <div className="category-grid">
        {data.images.map((src, i) => (
          <img key={i} src={src} alt={`${data.title} ${i + 1}`} />
        ))}
      </div>
      <div className="gallery-back">
        <Link to="/gallery">← Επιστροφή στις κατηγορίες</Link>
      </div>
    </div>
  );
};

export default CategoryGallery;
