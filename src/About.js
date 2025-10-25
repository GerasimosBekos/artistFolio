import "./About.css";
import Header from "./components/Header";
import HeroScreen from "./components/HeroScreen";
import Footer from "./components/Footer";


function About(props) {

    const title = "Το εργαστήρι μας";
    const text = "Ο χώρος όπου η ξυλογλυπτική τέχνη ζωντανεύει";
    const heroImage = "/images/about1.jpg";

    return (
        <>
            <Header />
            <HeroScreen title={title} text={text} image={heroImage} height="70vh"/>
            <div className="about">
                <h1>Το εργαστήρι μας</h1>
                
            </div>
            <Footer />
        </>
    );
}
export default About;