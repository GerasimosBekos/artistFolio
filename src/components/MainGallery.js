// File: src/components/MainGallery.js - REPLACE ENTIRE FILE

import "./MainGallery.css";
import "../Main.css";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { getCloudinaryUrl } from "../utils/cloudinary";
import { CLOUDINARY_IMAGES } from "../constants/images";
import { useEffect, useRef, useState } from "react";

function MainGallery(props) {
    const { t } = useLanguage();
    const [centerItemId, setCenterItemId] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    const containerRef = useRef(null);

    const getCategoryImage = (publicId) => {
        return getCloudinaryUrl(publicId, { width: 500, quality: 85, format: 'auto' });
    };

    // Gallery items configuration
    const galleryItems = [
        { id: 'templa', to: '/gallery/templa', image: CLOUDINARY_IMAGES.categories.templo, label: t.categories.templa, className: 'wide' },
        { id: 'proskinitaria', to: '/gallery/proskinitaria', image: CLOUDINARY_IMAGES.categories.prosk, label: t.categories.proskinitaria, className: 'tall' },
        { id: 'stasidia', to: '/gallery/stasidia', image: CLOUDINARY_IMAGES.categories.stasidia, label: t.categories.stasidia, className: '' },
        { id: 'epitafioi', to: '/gallery/epitafioi', image: CLOUDINARY_IMAGES.categories.epitafios, label: t.categories.epitafioi, className: 'tall' },
        { id: 'kornizes', to: '/gallery/kornizes', image: CLOUDINARY_IMAGES.categories.korniza, label: t.categories.kornizes, className: '' },
        { id: 'stavroi', to: '/gallery/stavroi', image: CLOUDINARY_IMAGES.categories.stavros, label: t.categories.stavroi, className: 'tall' },
        { id: 'thronoi', to: '/gallery/thronoi', image: CLOUDINARY_IMAGES.categories.thronos, label: t.categories.thronoi, className: 'tall' },
        { id: 'pagkaria', to: '/gallery/pagkaria', image: CLOUDINARY_IMAGES.categories.pagkari, label: t.categories.pagkaria, className: '' },
        { id: 'polithrones', to: '/gallery/polithrones', image: CLOUDINARY_IMAGES.categories.polithrona, label: t.categories.polithrones, className: 'tall' },
        { id: 'amvones', to: '/gallery/amvones', image: CLOUDINARY_IMAGES.categories.amvonas, label: t.categories.amvones, className: 'tall' },
        { id: 'karekles', to: '/gallery/karekles', image: CLOUDINARY_IMAGES.categories.karekles, label: t.categories.karekles, className: '' },
        { id: 'psaltiria', to: '/gallery/psaltiria', image: CLOUDINARY_IMAGES.categories.psaltiri, label: t.categories.psaltiria, className: '' },
        { id: 'lipsanothikes', to: '/gallery/lipsanothikes', image: CLOUDINARY_IMAGES.categories.lipsanothiki, label: t.categories.lipsanothikes, className: '' },
    ];

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
            rootMargin: '-30% 0px -30% 0px', // Trigger when item is in center 20% of viewport
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
    }, [isMobile, t.categories]); // Re-run when language changes

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