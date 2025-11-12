import React, { useState } from 'react';
import "./MainContact.css";
import "../Main.css";

function MainContact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('sending');
    
    // Here you would integrate your actual form submission logic
    setTimeout(() => {
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormStatus(''), 3000);
    }, 1000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <section id="contact" className="content-section">
        <div className="content-gallery-subtitle">ΕΠΙΚΟΙΝΩΝΙΑ</div>
        <div className="content-gallery-title" style={{ marginBottom: '3rem' }}>
          Επικοινωνήστε μαζί μου
        </div>

        <div className="contact-wrapper">
          {/* === LEFT SIDE - PRIMARY CONTACT INFO === */}
          <div className="contact-info-primary">
            <h3 className="contact-info-heading">Στοιχεία Επικοινωνίας</h3>
            
            <div className="contact-info-list">
              <div className="contact-info-card">
                <div className="contact-card-icon"><i class="fa-solid fa-envelope"></i></div>
                <div className="contact-card-content">
                  <div className="contact-card-label">Email</div>
                  <a href="mailto:info@woodcarver.gr" className="contact-card-value">
                    info@woodcarver.gr
                  </a>
                </div>
              </div>

              <div className="contact-info-card">
                <div className="contact-card-icon"><i class="fa-solid fa-phone"></i></div>
                <div className="contact-card-content">
                  <div className="contact-card-label">Τηλέφωνο</div>
                  {isMobile ? (
                    <a href="tel:+306941234567" className="contact-card-value contact-card-link">
                      694 123 4567
                    </a>
                  ) : (
                    <div className="contact-card-value">694 123 4567</div>
                  )}
                </div>
              </div>

              <div className="contact-info-card">
                <div className="contact-card-icon"><i class="fa-solid fa-location"></i></div>
                <div className="contact-card-content">
                  <div className="contact-card-label">Διεύθυνση</div>
                  <a 
                    href="https://www.google.com/maps/search/?api=1&query=Αθήνα+Ελλάδα" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-card-value contact-card-link"
                  >
                    Αθήνα, Ελλάδα
                  </a>
                </div>
              </div>

              <div className="contact-info-card">
                <div className="contact-card-icon"><i class="fa-solid fa-clock"></i></div>
                <div className="contact-card-content">
                  <div className="contact-card-label">Ώρες Λειτουργίας</div>
                  <div className="contact-card-value contact-card-hours">                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
                    <div>Δευτέρα - Παρασκευή</div>
                    <div>9:00 - 18:00</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="contact-social-section">
              <div className="contact-social-heading">Ακολουθήστε με</div>
              <div className="contact-socials-primary">
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-social-btn"
                >
                  <span className="social-icon-primary">f</span>
                  Facebook
                </a>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-social-btn"
                >
                  <span className="social-icon-primary">i</span>
                  Instagram
                </a>
              </div>
            </div>
          </div>

          {/* === RIGHT SIDE - QUICK MESSAGE FORM === */}
          <div className="contact-form-secondary">
            <h3 className="contact-form-heading">Γρήγορο Μήνυμα</h3>
            <p className="contact-form-subtitle">Στείλτε μου ένα σύντομο μήνυμα και θα επικοινωνήσω μαζί σας σύντομα</p>
            
            <div className="contact-form-compact">
              <div className="contact-field-compact">
                <label htmlFor="name">Όνομα *</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="contact-input-compact"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Το όνομά σας"
                  required
                />
              </div>

              <div className="contact-field-compact">
                <label htmlFor="email">Email *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="contact-input-compact"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@example.com"
                  required
                />
              </div>

              <div className="contact-field-compact">
                <label htmlFor="message">Μήνυμα *</label>
                <textarea
                  id="message"
                  name="message"
                  className="contact-textarea-compact"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Πείτε μου περισσότερα για το έργο σας..."
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="contact-submit-compact"
                onClick={handleSubmit}
                disabled={formStatus === 'sending'}
              >
                {formStatus === 'sending' ? 'Αποστολή...' : 
                 formStatus === 'success' ? '✓ Στάλθηκε!' : 
                 'Αποστολή Μηνύματος'}
              </button>

              {formStatus === 'success' && (
                <div className="form-success-compact">
                  ✓ Ευχαριστώ! Θα επικοινωνήσω σύντομα.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default MainContact;