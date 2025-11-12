import "./HeroScreen.css";
import "../Main.css";

function HeroScreen({image, title, text, height, opacity}) {
    return (
        <section className="hero" style={{backgroundImage: `url(${image})`, height: height, opacity: opacity}}>
            <div className="quote">
                <div className="quote-title">
                    {title}
                </div>
                <div className="quote-text">
                    {text}
                </div>
            </div>
            <div className="hero-fade"></div>
        </section>
    );
}
export default HeroScreen;