import "./HeroScreen.css";
import "../Main.css";

function HeroScreen(props) {
    return (
        <div>
            <section className="hero">
                <div className="quote">
                    <div className="quote-title">
                        Ξυλογλυπτική
                    </div>
                    <div className="quote-text">
                        "Η τέχνη που έδωσε στον άνθρωπο τη δυνατότητα να εκφράσει έναν ολοκληρωμένο και 
                        μοναδικό τρόπο αισθητικής αντίληψης μέσω της πλαστικότητας του ξύλου"
                    </div>
                </div>
                <div className="hero-fade"></div>
            </section>
        </div>
    );
}
export default HeroScreen;