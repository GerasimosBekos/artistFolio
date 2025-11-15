import "./Gallery.css";
import Header from "./components/Header";
import MainGallery from "./components/MainGallery";
import HeroScreen from "./components/HeroScreen";
import Breadcrumb from "./components/Breadcrumb";
import Image from "./components/Image";
import Footer from "./components/Footer";
import Title from "./components/Title";
import { useLanguage } from "./contexts/LanguageContext";


function Gallery(props) {

    const heroImage = "/images/gallery.jpg";
    
    // Image Footer
    const image = "/images/woodcarving1.jpg";
    const image_height = "350px";
    const image_textSize = "2rem";

    const { t } = useLanguage();

    return (
        <>
            <Header />
            <HeroScreen title={t.gallery.heroTitle} text={t.gallery.heroSubtitle} image={heroImage} height="70vh" opacity="0.8"/>
            <Breadcrumb />
            <div className="gallery">
                <Title title={t.gallery.title} subtitle={t.gallery.subtitle} /> 
                <div data-aos="fade-up" data-aos-delay="200">
                    <MainGallery/>
                </div>
            </div>
            <Image text={t.gallery.footerImageText} image={image} height={image_height} textSize={image_textSize}/>
            <Footer />
        </>
    );
}
export default Gallery;