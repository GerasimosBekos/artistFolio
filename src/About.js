import "./About.css";
import Header from "./components/Header";
import HeroScreen from "./components/HeroScreen";
import MainAbout from "./components/MainAbout";
import Breadcrumb from "./components/Breadcrumb";
import ImageText from "./components/ImageText";
import Footer from "./components/Footer";
import Title from "./components/Title";
import { useLanguage } from "./contexts/LanguageContext";
import { CLOUDINARY_IMAGES } from "./constants/images";

function About(props) {

    const {t} = useLanguage();

    return (
        <>
            <Header />
            <HeroScreen title={t.about.heroTitle} text={t.about.heroSubtitle} image={CLOUDINARY_IMAGES.hero.about} height="70vh" opacity="0.8"/>
            <Breadcrumb />

            <div className="about">
                <Title title={t.about.title} subtitle={t.about.subtitle} />
                <MainAbout />
                
            </div>
            <ImageText 
                text={t.about.footerImageText} 
                image={CLOUDINARY_IMAGES.footer.about} 
                height="350px" 
                textSize="2rem"
            />
            <Footer />
        </>
    );
}
export default About;