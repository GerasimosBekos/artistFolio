import "./HeroScreen.css";
import "../Main.css";

function HeroScreen({image, title, text, height, opacity, title_size = "4.3rem"}) {
    return (
        <section className="hero" style={{backgroundImage: `url(${image})`, height: height, opacity: opacity, fontSize: title_size}}>
            <div className="quote">
                <div className="quote-title">
                    {title}
                </div>
                <div className="quote-text">
                    {text}
                </div>
            </div>
        </section>
    );
}
export default HeroScreen;