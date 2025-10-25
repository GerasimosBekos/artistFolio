import "./Main.css";
import Header from "./components/Header";
import HeroScreen from "./components/HeroScreen";   
import MainAbout from "./components/MainAbout";
import MainGallery from "./components/MainGallery";
import MainToGallery from "./components/MainToGallery";
import MainContact from "./components/MainContact";
import Image from "./components/Image";
import Footer from "./components/Footer";


function Main(props) {
    const text = "\"...καὶ ἔστω ἡ λαμπρότης Κυρίου τοῦ Θεοῦ ἡμῶν ἐφ᾿ ἡμᾶς, καὶ τὰ ἔργα τῶν χειρῶν ἡμῶν κατεύθυνον ἐφ᾿ ἡμᾶς καὶ τὸ ἔργον τῶν χειρῶν ἡμῶν κατεύθυνον\" - Ψαλμός 89:17";
    return (
        <div className="main">
            <Header />
            <HeroScreen />
            <div className="content">
                <MainAbout />
                <MainGallery />
            </div>
            <MainToGallery />
            <MainContact />
            <Image text={text} image={'/images/footer.jpg'} height="350px" textSize="2rem" titleSize="3rem"/>
            <Footer />
        </div>
    );
}
export default Main;