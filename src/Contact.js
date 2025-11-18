import "./Contact.css";
import Header from "./components/Header";
import HeroScreen from "./components/HeroScreen";
import Breadcrumb from "./components/Breadcrumb";
import MainContact from "./components/MainContact";
import ImageText from "./components/ImageText";
import Footer from "./components/Footer";
import Title from "./components/Title";
import { useLanguage } from "./contexts/LanguageContext";
import { CLOUDINARY_IMAGES } from "./constants/images";


function Contact(props) {

    const {t} = useLanguage();

    return (
        <>
            <Header />
            <HeroScreen title={t.contactPage.heroTitle} text={t.contactPage.heroSubtitle} image={CLOUDINARY_IMAGES.hero.contact} height="70vh" opacity="0.8"/>
            <Breadcrumb />
            <div className="contact">
                <Title title={t.contactPage.title} subtitle={t.contactPage.subtitle} />
                <MainContact />
                
            </div>
            <ImageText 
                text={t.contactPage.footerImageText} 
                image={CLOUDINARY_IMAGES.footer.contact} 
                height="350px" 
                textSize="2rem"
            />
            <Footer />
        </>
    );
}
export default Contact;