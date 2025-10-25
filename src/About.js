import "./About.css";
import Header from "./components/Header";
import Footer from "./components/Footer";


function About(props) {
    return (
        <>
            <div className="about">
                <Header />
                <h1>Welcome to the About Page</h1>
                <p>This is the About of the application.</p>
                
            </div>
            <Footer />
        </>
    );
}
export default About;