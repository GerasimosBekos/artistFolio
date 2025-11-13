import "./Main.css";
import Header from "./components/Header";
import HeroScreen from "./components/HeroScreen";   
import MainAbout from "./components/MainAbout";
import MainGallery from "./components/MainGallery";
import MainToGallery from "./components/MainToGallery";
import MainContact from "./components/MainContact";
import Image from "./components/Image";
import Footer from "./components/Footer";
import Title from "./components/Title";
import "./App.css";
import { useLanguage } from "./contexts/LanguageContext";


function Main(props) {
    const heroImage = '/images/bg.jpg';
    const { t } = useLanguage();

    return (
        <>
            <div className="main">
                <Header />
                <HeroScreen image={heroImage} title={t.main.heroTitle} text={t.main.heroSubtitle} height="95vh" opacity="0.82"/>
                <div className="content">
                    <div data-aos="fade-up">
                        <MainAbout />
                    </div>
                    <div data-aos="fade-up">
                        <Title title={t.main.galleryTitle} subtitle={t.main.gallerySubtitle} /> 
                        <MainGallery />
                    </div>
                </div>
                <MainToGallery />
                <div data-aos="fade-up">
                    <Title title={t.main.contactTitle} subtitle={t.main.contactSubtitle} />
                    <MainContact />
                </div>
                <Image text={t.main.footerImageText} image={'/images/footer.jpg'} height="350px" textSize="2rem"/>
                <Footer />
            </div>
            
        </>
    );
}
export default Main;