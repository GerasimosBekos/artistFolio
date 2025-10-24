import "./Main.css";
import Header from "./components/Header";
import HeroScreen from "./components/HeroScreen";   
import MainAbout from "./components/MainAbout";
import MainGallery from "./components/MainGallery";
import MainToGallery from "./components/MainToGallery";
import MainContact from "./components/MainContact";
import Footer from "./components/Footer";


function Main(props) {
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
            <Footer />
        </div>
    );
}
export default Main;