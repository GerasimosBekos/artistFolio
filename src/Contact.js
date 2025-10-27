import "./Contact.css";
import Header from "./components/Header";
import HeroScreen from "./components/HeroScreen";
import Breadcrumb from "./components/Breadcrumb";
import MainContact from "./components/MainContact";
import Image from "./components/Image";
import Footer from "./components/Footer";


function Contact(props) {

    const title = "Επικοινωνία";
    const text = "Επικοινωνήστε μαζί μου για περισσότερες πληροφορίες";
    const heroImage = "/images/contact.jpg";

    // Image component props
    const image_text = "\"Τὸν ἄνθρωπον ὁ Θεὸς ἐποίησε δημιουργὸν, ὅπως μιμηθῇ τὸν Δημιουργόν\" - Ἅγιος Ἰωάννης ὁ Δαμασκηνός"
    const image = "/images/woodcarving3.jpg";
    const image_height = "350px";
    const image_textSize = "2rem";

    return (
        <>
            <Header />
            <HeroScreen title={title} text={text} image={heroImage} height="70vh" opacity="0.8"/>
            <Breadcrumb />
            <div className="contact">
                {/* <div className="contact-subtitle">
                    ΕΠΙΚΟΙΝΩΝΙΑ
                </div>
                <div className="contact-title">
                    Επικοινωνήστε μαζί μας
                </div> */}
                <MainContact />
                
            </div>
            <Image text={image_text} image={image} height={image_height} textSize={image_textSize} />
            <Footer />
        </>
    );
}
export default Contact;