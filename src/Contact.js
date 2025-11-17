import "./Contact.css";
import Header from "./components/Header";
import HeroScreen from "./components/HeroScreen";
import Breadcrumb from "./components/Breadcrumb";
import MainContact from "./components/MainContact";
import ImageText from "./components/ImageText";
import Footer from "./components/Footer";
import Title from "./components/Title";
import { useLanguage } from "./contexts/LanguageContext";


function Contact(props) {
    const heroImage = "/images/hero/contact.jpg";

    // Image component props
    const image = "/images/footer/contact.jpg";
    const image_height = "350px";
    const image_textSize = "2rem";

    const {t} = useLanguage();

    return (
        <>
            <Header />
            <HeroScreen title={t.contact.heroTitle} text={t.contact.heroSubtitle} image={heroImage} height="70vh" opacity="0.8"/>
            <Breadcrumb />
            <div className="contact">
                <Title title={t.contact.title} subtitle={t.contact.subtitle} />
                <MainContact />
                
            </div>
            <ImageText text={t.contact.footerImageText} image={image} height={image_height} textSize={image_textSize} />
            <Footer />
        </>
    );
}
export default Contact;