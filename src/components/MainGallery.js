// File: src/components/MainGallery.js - FULLY DYNAMIC VERSION

import "./MainGallery.css";
import "../Main.css";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { getCloudinaryUrl } from "../utils/cloudinary";
import { CLOUDINARY_IMAGES } from "../constants/images";
import { TEMPLATE_CONFIG } from "../config/template.config";
import { useEffect, useRef, useState } from "react";

function MainGallery(props) {
    const { t } = useLanguage();
    const [centerItemId, setCenterItemId] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    const containerRef = useRef(null);

    const getCategoryImage = (publicId) => {
        return getCloudinaryUrl(publicId, { width: 500, quality: 85, format: 'auto' });
    };

    // ⭐ BUILD GALLERY ITEMS DYNAMICALLY FROM CONFIG
    const galleryItems = TEMPLATE_CONFIG.categories
        .filter(cat => cat.enabled) // Only show enabled categories
        .map(cat => {
            const categoryKey = cat.id;
            
            // Get image from CLOUDINARY_IMAGES using category ID
            const imagePublicId = CLOUDINARY_IMAGES.categories[categoryKey] 
                || CLOUDINARY_IMAGES.categories[cat.id] 
                || `${TEMPLATE_CONFIG.cloudinary.folderPrefix}/categories/${categoryKey}`;
            
            return {
                id: categoryKey,
                to: `/gallery/${categoryKey}`,
                image: imagePublicId,
                label: t.categories?.[categoryKey] || cat.id, // Fallback to ID if translation missing
                className: cat.gridSize === 'wide' ? 'wide' : 
                          cat.gridSize === 'tall' ? 'tall' : ''
            };
        });

    // Detect mobile device
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Intersection Observer for mobile scroll highlight
    useEffect(() => {
        if (!isMobile || !containerRef.current) return;

        const options = {
            root: null,
            rootMargin: '-30% 0px -30% 0px',
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const itemId = entry.target.getAttribute('data-item-id');
                    setCenterItemId(itemId);
                }
            });
        }, options);

        const items = containerRef.current.querySelectorAll('.gallery-item');
        items.forEach((item) => observer.observe(item));

        return () => {
            items.forEach((item) => observer.unobserve(item));
        };
    }, [isMobile, t.categories]);

    return (
        <div>
            <section id="gallery" className="content-section">
                <div className="content-gallery"> 
                    <div 
                        className="content-gallery-grid" 
                        ref={containerRef}
                    >
                        {galleryItems.map((item) => (
                            <Link
                                key={item.id}
                                to={item.to}
                                className={`gallery-item ${item.className} ${
                                    isMobile && centerItemId === item.id ? 'center-highlight' : ''
                                }`}
                                data-item-id={item.id}
                            >
                                <img src={getCategoryImage(item.image)} alt={item.label} />
                                <span>{item.label}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default MainGallery;