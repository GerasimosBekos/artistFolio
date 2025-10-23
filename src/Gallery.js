import "./Gallery.css";
import Header from "./components/Header";
import Footer from "./components/Footer";


function Gallery(props) {
    return (
        <div className="gallery">
            <Header />
            <h1>Welcome to the Gallery Page</h1>
            <p>This is the gallery of the application.</p>
            <Footer />
        </div>
    );
}
export default Gallery;