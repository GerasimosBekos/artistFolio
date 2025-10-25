import "./Main.css";
import Header from "./components/Header";
import HeroScreen from "./components/HeroScreen";   
import MainAbout from "./components/MainAbout";
import MainGallery from "./components/MainGallery";
import MainToGallery from "./components/MainToGallery";
import MainContact from "./components/MainContact";
import Image from "./components/Image";
import Footer from "./components/Footer";
import "./App.css";


function Main(props) {
    const psalmos = "\"...καὶ ἔστω ἡ λαμπρότης Κυρίου τοῦ Θεοῦ ἡμῶν ἐφ᾿ ἡμᾶς, καὶ τὰ ἔργα τῶν χειρῶν ἡμῶν κατεύθυνον ἐφ᾿ ἡμᾶς καὶ τὸ ἔργον τῶν χειρῶν ἡμῶν κατεύθυνον\" - Ψαλμός 89:17";
    const heroImage = '/images/bg.jpg';
    const woodcarvingQuote = "\"H τέχνη που έδωσε στον άνθρωπο τη δυνατότητα να εκφράσει έναν ολοκληρωμένο και μοναδικό τρόπο αισθητικής αντίληψης μέσω της πλαστικότητας του ξύλου\"";

    return (
        <>
            <div className="main">
                <Header />
                <HeroScreen image={heroImage} title="Ξυλογλυπτική" text={woodcarvingQuote} height="100vh"/>
                <div className="content">
                    <MainAbout />
                    <MainGallery />
                </div>
                <MainToGallery />
                <MainContact />
                <Image text={psalmos} image={'/images/footer.jpg'} height="350px" textSize="2rem" titleSize="3rem"/>
                <Footer />
            </div>
            
        </>
    );
}
export default Main;