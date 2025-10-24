import "../Main.css";
import "./MainAbout.css";

function MainAbout(props) {
    return (
        <div>
            <section id="about" className="content-section">
                <div className="content-about">
                    <div className="content-about-image">
                        <img src="/images/artist.jpeg" alt="About Me" className="content-about-img" />
                    </div>
                    <div className="content-about-text">
                        <div className="content-about-text-title">
                            Σχετικά με μένα
                        </div>
                        <div className="content-about-text-body">
                            Η στάση μου απέναντι σ' αυτή την παράδοση είναι στάση μελέτης και μαθητείας πάνω στα έργα μεγάλων ξυλογλυπτών
                            , που προδίδουν γνώση, πείρα, ευαισθησία, υψηλή τεχνική, και που πολλές φορές
                                είναι η αποτύπωση της εμπειρίας του εκκλησιαστικού βιώματος, πάνω στο άψυχο υλικό, όσο αυτό είναι δυνατό.
                                Η συνεργασία μου, με έμπειρους τεχνίτες, στοχεύει στην επιτυχή συνέχιση της ξυλογλυπτικής τέχνης. 
                                Συνοδοιπόρος αυτής της προσπάθειας ο αδερφός μου Θεόφιλος, θεολόγος και ιεροψάλτης. Ελπίζω με τη χάρη του Θεού σε μελλοντική προσωπική επαφή και συνεργασία. 
                        </div>
                        <div className="content-about-text-signature">
                            Παναγιώτης Μπέκος
                        </div>
                        <div className="content-about-text-profession">
                            Ξυλογλύπτης
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
export default MainAbout;