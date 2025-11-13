import React, { useState } from 'react';
import "./MainContact.css";
import "../Main.css";
import { useLanguage } from "../contexts/LanguageContext"

function MainContact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  const {t} = useLanguage();

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
        <div className="contact-wrapper">
          {/* === LEFT SIDE - PRIMARY CONTACT INFO === */}
          <div className="contact-info-primary">
            <h3 className="contact-info-heading">{t.contact.contactInfoTitle}</h3>
            
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
                  <div className="contact-card-label">{t.contact.phoneTitle}</div>
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
                <div className="contact-card-icon"><i class="fa-solid fa-location-dot"></i></div>
                <div className="contact-card-content">
                  <div className="contact-card-label">{t.contact.addressTitle}</div>
                  <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${t.contact.addressValue} ${t.contact.addressValueCountry}`
  )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-card-value contact-card-link"
                  >
                    {t.contact.addressValue}, {t.contact.addressValueCountry}
                  </a>
                </div>
              </div>

              <div className="contact-info-card">
                <div className="contact-card-icon"><i class="fa-solid fa-clock"></i></div>
                <div className="contact-card-content">
                  <div className="contact-card-label">{t.contact.openingHoursTitle}</div>
                  <div className="contact-card-value contact-card-hours">                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
                    <div>{t.contact.openingHoursDays}</div>
                    <div>{t.contact.openingHoursHours}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="contact-social-section">
              <div className="contact-social-heading">{t.contact.followMe}</div>
              <div className="contact-socials-primary">
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-social-link-simple"
                >
                  <i className="fab fa-facebook-f"></i>
                  Facebook
                </a>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-social-link-simple"
                >
                  <i className="fab fa-instagram"></i>
                  Instagram
                </a>
              </div>
            </div>
          </div>

          {/* === RIGHT SIDE - QUICK MESSAGE FORM === */}
          <div className="contact-form-secondary">
            <h3 className="contact-form-heading">{t.contact.quickMessageTitle}</h3>
            <p className="contact-form-subtitle">{t.contact.quickMessageText}</p>
            
            <form>
              <div className="contact-form-compact">
              <div className="contact-field-compact">
                <label htmlFor="name">{t.contact.nameTitle} *</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="contact-input-compact"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t.contact.namePlaceholder}
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
                <label htmlFor="message">{t.contact.messageTitle} *</label>
                <textarea
                  id="message"
                  name="message"
                  className="contact-textarea-compact"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t.contact.messagePlaceholder}
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="contact-submit-compact"
                onClick={handleSubmit}
                disabled={formStatus === 'sending'}
              >
                {formStatus === 'sending' ? t.contact.messageSending : 
                 formStatus === 'success' ? '✓ ' + t.contact.messageSent: 
                 t.contact.messageButton}
              </button>

              {formStatus === 'success' && (
                <div className="form-success-compact">
                  ✓ {t.contact.messageSuccess}
                </div>
              )}
            </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default MainContact;