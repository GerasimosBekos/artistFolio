import "./MainContact.css";
import "../Main.css";

function MainContact() {
  return (
    <div>
      <section id="contact" className="content-section">
        <div className="content-gallery-subtitle">ΕΠΙΚΟΙΝΩΝΙΑ</div>
        <div
          className="content-gallery-title"
          style={{ marginBottom: "3rem" }}
        >
          Επικοινωνήστε μαζί μου
        </div>

        <div className="contact-wrapper">
          {/* === LEFT IMAGE SIDE === */}
          <div className="contact-image"></div>

          {/* === RIGHT FORM SIDE === */}
          <div className="contact-form-side">
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

              <button type="submit" className="contact-submit">
                Αποστολή
              </button>
            </form>

            {/* Divider */}
            <div className="contact-divider">ή</div>

            {/* Phone reveal */}
            <button
                className="contact-phone-button"
                onClick={(e) => {
                    const btn = e.currentTarget;
                    const showingNumber = btn.dataset.show === "true";

                    if (!showingNumber) {
                    btn.dataset.originalText = btn.textContent;
                    btn.textContent = "📞 694 123 4567";
                    btn.dataset.show = "true";
                    } else {
                    btn.textContent = btn.dataset.originalText;
                    btn.dataset.show = "false";
                    }
                }}
                >
                📞 Τηλέφωνο
            </button>


            {/* Social links */}
            <div className="contact-socials">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-link"
              >
                Facebook
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-link"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default MainContact;
