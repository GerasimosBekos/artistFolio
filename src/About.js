import "./About.css";
import Header from "./components/Header";
import HeroScreen from "./components/HeroScreen";
import MainAbout from "./components/MainAbout";
import Breadcrumb from "./components/Breadcrumb";
import Image from "./components/Image";
import Footer from "./components/Footer";
import Title from "./components/Title";
import { useLanguage } from "./contexts/LanguageContext";

function About(props) {

    const heroImage = "/images/about4.jpg";

    // Image component props
    const image = "/images/woodcarving2.jpg";
    const image_height = "350px";
    const image_textSize = "2rem";

    const {t} = useLanguage();

    return (
        <>
            <Header />
            <HeroScreen title={t.about.heroTitle} text={t.about.heroSubtitle} image={heroImage} height="70vh" opacity="0.8"/>
            <Breadcrumb />

            <div className="about">
                <Title title={t.about.title} subtitle={t.about.subtitle} />
                <MainAbout />
                
            </div>
            <Image text={t.about.footerImageText} image={image} height={image_height} textSize={image_textSize}/>
            <Footer />
        </>
    );
}
export default About;