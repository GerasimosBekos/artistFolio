import "./Gallery.css";
import Header from "./components/Header";
import MainGallery from "./components/MainGallery";
import HeroScreen from "./components/HeroScreen";
import Breadcrumb from "./components/Breadcrumb";
import Footer from "./components/Footer";


function Gallery(props) {
    const title = "Ξυλογλυπτική Τέχνη";
    const text = "Ξυλόγλυπτα έργα τέχνης φτιαγμένα με μεράκι και αγάπη για την παράδοση";
    const heroImage = "/images/gallery.jpg";
    
    return (
        <>
            <Header />
            <HeroScreen title={title} text={text} image={heroImage} height="70vh"/>
            <Breadcrumb />
            <div className="gallery">
                <MainGallery/>
                
            </div>
            <Footer />
        </>
    );
}
export default Gallery;