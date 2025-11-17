import "./Gallery.css";
import Header from "./components/Header";
import MainGallery from "./components/MainGallery";
import HeroScreen from "./components/HeroScreen";
import Breadcrumb from "./components/Breadcrumb";
import ImageText from "./components/ImageText";
import Footer from "./components/Footer";
import Title from "./components/Title";
import { useLanguage } from "./contexts/LanguageContext";
import { CLOUDINARY_IMAGES } from "./constants/images";

function Gallery(props) {
    const { t } = useLanguage();

    return (
        <>
            <Header />
            <HeroScreen 
                title={t.gallery.heroTitle} 
                text={t.gallery.heroSubtitle} 
                image={CLOUDINARY_IMAGES.hero.gallery} 
                height="70vh" 
                opacity="0.8"
            />
            <Breadcrumb />
            
            <div className="gallery">
                <Title title={t.gallery.title} subtitle={t.gallery.subtitle} /> 
                <div data-aos="fade-up" data-aos-delay="200">
                    <MainGallery/>
                </div>
            </div>
            
            <ImageText 
                text={t.gallery.footerImageText} 
                image={CLOUDINARY_IMAGES.footer.gallery} 
                height="350px" 
                textSize="2rem"
            />
            <Footer />
        </>
    );
}

export default Gallery;