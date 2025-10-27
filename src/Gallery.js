import "./Gallery.css";
import Header from "./components/Header";
import MainGallery from "./components/MainGallery";
import HeroScreen from "./components/HeroScreen";
import Breadcrumb from "./components/Breadcrumb";
import Image from "./components/Image";
import Footer from "./components/Footer";


function Gallery(props) {
    const title = "Ξυλογλυπτική Τέχνη";
    const text = "Ξυλόγλυπτα έργα τέχνης φτιαγμένα με μεράκι και αγάπη για την παράδοση";
    const heroImage = "/images/gallery.jpg";
    
    // Image Footer
    const image_text = "\"Τὸν ἄνθρωπον ὁ Θεὸς ἐποίησε δημιουργὸν, ὅπως μιμηθῇ τὸν Δημιουργόν\" - Ἅγιος Ἰωάννης ὁ Δαμασκηνός"
    const image = "/images/woodcarving1.jpg";
    const image_height = "350px";
    const image_textSize = "2rem";

    return (
        <>
            <Header />
            <HeroScreen title={title} text={text} image={heroImage} height="70vh" opacity="0.85"/>
            <Breadcrumb />
            <div className="gallery">
                <MainGallery/>
            </div>
            <Image text={image_text} image={image} height={image_height} textSize={image_textSize}/>
            <Footer />
        </>
    );
}
export default Gallery;