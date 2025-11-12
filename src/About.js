import "./About.css";
import Header from "./components/Header";
import HeroScreen from "./components/HeroScreen";
import MainAbout from "./components/MainAbout";
import Breadcrumb from "./components/Breadcrumb";
import Image from "./components/Image";
import Footer from "./components/Footer";
import Title from "./components/Title";


function About(props) {

    const title = "Εργαστήρι Ξυλογλυπτικής";
    const text = "Ο χώρος όπου η ξυλογλυπτική τέχνη ζωντανεύει";
    const heroImage = "/images/about4.jpg";

    // Image component props
    const image_text = "\"... αὐτοῦ γάρ ἐσμέν ποίημα, κτισθέντες ἐν Χριστῷ Ἰησοῦ ἐπὶ ἔργοις ἀγαθοῖς\" - προς Ἐφεσίους 2:10";
    const image = "/images/woodcarving2.jpg";
    const image_height = "350px";
    const image_textSize = "2rem";

    return (
        <>
            <Header />
            <HeroScreen title={title} text={text} image={heroImage} height="70vh" opacity="0.8"/>
            <Breadcrumb />

            <div className="about">
                <Title title={"Το Εργαστήρι μας"} subtitle={"ΙΣΤΟΡΙΑ"} />
                <MainAbout />
                
            </div>
            <Image text={image_text} image={image} height={image_height} textSize={image_textSize}/>
            <Footer />
        </>
    );
}
export default About;