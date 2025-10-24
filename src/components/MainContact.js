import "./MainContact.css";
import "../Main.css";

function MainContact(props) {
    return (
        <div>
            <section id="contact" className="content-section">
                <div className="content-contact">
                    <div className="content-gallery-subtitle">
                        ΕΠΙΚΟΙΝΩΝΙΑ
                    </div>
                    <div className="content-gallery-title">
                        Επικοινωνήστε μαζί μου
                    </div>
                    <form className="contact-form">
                        <div className="contact-row">
                            <div className="contact-field">
                            <label htmlFor="name">
                                Ονοματεπώνυμο <span className="required">*</span>
                            </label>
                            <input
                                id="name"
                                type="text"
                                className="contact-input"
                                required
                            />
                            </div>

                            <div className="contact-field">
                            <label htmlFor="email">
                                Email <span className="required">*</span>
                            </label>
                            <input
                                id="email"
                                type="email"
                                className="contact-input"
                                required
                            />
                            </div>
                        </div>

                        <div className="contact-field">
                            <label htmlFor="message">
                            Μήνυμα <span className="required">*</span>
                            </label>
                            <textarea
                            id="message"
                            className="contact-textarea"
                            required
                            ></textarea>
                        </div>

                        <button type="submit" className="contact-submit">Αποστολή</button>
                    </form>

                    {/* Divider */}
                    <div className="contact-divider">ή</div>

                    {/* Phone reveal */}
                    <div className="contact-phone">
                    <button className="contact-phone-button" onClick={() => {
                        const num = document.querySelector('.contact-phone-number');
                        num.style.display = num.style.display === 'block' ? 'none' : 'block';
                    }}>
                        📞 Τηλέφωνο
                    </button>
                    <div className="contact-phone-number" style={{ display: 'none' }}>
                        694 123 4567
                    </div>
                    </div>

                    {/* Social links */}
                    <div className="contact-socials">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="contact-social-link">Facebook</a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="contact-social-link">Instagram</a>
                    </div>
                </div>
            </section>
        </div>
    );
}
export default MainContact;