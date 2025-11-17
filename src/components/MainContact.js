import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import "./MainContact.css";
import "../Main.css";
import { useLanguage } from "../contexts/LanguageContext";
import { CLOUDINARY_IMAGES } from "../constants/images";
import { getCloudinaryUrl } from '../utils/cloudinary';

function MainContact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [formStatus, setFormStatus] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [emailCopied, setEmailCopied] = useState(false);
  const [phoneCopied, setPhoneCopied] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { t } = useLanguage();

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleCopyEmail = async (e) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(t.general.email);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (err) {
      console.error(t.contactMessages.failCopyEmail, err);
    }
  };

    const handleCopyPhone = async (e) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(t.general.phone);
      setPhoneCopied(true);
      setTimeout(() => setPhoneCopied(false), 2000);
    } catch (err) {
      console.error(t.contactMessages.failCopyPhone, err);
    }
  };


  const validateForm = (t) => {
  const errors = {};
  const nameRegex = /^[A-Za-zΑ-Ωα-ωΆ-Ώά-ώ\s]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // name required + regex
  if (!formData.name.trim()) {
    errors.name = t.contactMessages.nameRequired;
  } else if (!nameRegex.test(formData.name.trim())) {
    errors.name = t.contactMessages.nameInvalid;
  }

  // email required + regex
  if (!formData.email.trim()) {
    errors.email = t.contactMessages.emailRequired;
  } else if (!emailRegex.test(formData.email.trim())) {
    errors.email = t.contactMessages.emailInvalid;
  }

  // message required
  if (!formData.message.trim()) {
    errors.message = t.contactMessages.messageRequired;
  }

  setFormErrors(errors);
  return Object.keys(errors).length === 0;
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('');
    setErrorMessage('');
    if (!validateForm(t)) {
      setFormStatus('error');
      return;
    }

    setFormStatus('sending');

    // REPLACE THESE WITH YOUR ACTUAL VALUES FROM EMAILJS
    const serviceId = 'service_c5g9579';
    const templateId = 'template_lo7117c';
    const publicKey = '_k2BDg5lGryKfH1GM';

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setFormErrors({});
      setTimeout(() => setFormStatus(''), 5000);
    } catch (error) {
      console.error('Email send error:', error);
      setFormStatus('error');
      setErrorMessage(t.contactMessages.sendFailed);
      setTimeout(() => {
        setFormStatus('');
        setErrorMessage('');
      }, 5000);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: '' });
  };


  const validateField = (name, value) => {
  const errors = {};
  const nameRegex = /^[A-Za-zΑ-Ωα-ωΆ-Ώά-ώ\s]*$/; // letters & spaces, allow empty
  const emailRegex = /^[^\s@]+@[^\s@]*$/; // basic email format, allow empty

  switch (name) {
    case 'name':
      if (value && !nameRegex.test(value.trim())) {
        errors[name] = t.contactMessages.nameInvalid}
      break;

    case 'email':
      if (value && !emailRegex.test(value.trim())) {
        errors[name] = t.contactMessages.emailInvalid}
      break;

    // message field doesn’t need format check on blur
    default:
      break;
  }

  setFormErrors(prev => ({ ...prev, ...errors }));
};


  return (
    <div>
      <section id="contact" className="content-section" style={{ position: 'relative' }}>
        <div className="contact-wrapper">
          {/* === LEFT SIDE === */}
          <div className="contact-info-primary" style={{
            background: `url(${getCloudinaryUrl(CLOUDINARY_IMAGES.other.texture,)
            
          })`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}>
            <h3 className="contact-info-heading">{t.contact.contactInfoTitle}</h3>
            
            <div className="contact-info-list">
              {/* Email */}
              <div className="contact-info-card">
                <div className="contact-card-icon"><i className="fa-solid fa-envelope"></i></div>
                <div className="contact-card-content">
                  <div className="contact-card-label">Email</div>
                  <div style={{ position: 'relative', display: 'inline-block' }}>
                    <a
                      href="mailto:info@woodcarver.gr"
                      onClick={handleCopyEmail}
                      className="contact-card-value contact-card-link"
                    >
                      {t.general.email}
                    </a>
                    {emailCopied && (
                      <div className="email-copy-toast">
                        ✓ {t.contactMessages.emailCopied}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="contact-info-card">
                <div className="contact-card-icon"><i className="fa-solid fa-phone"></i></div>
                <div className="contact-card-content">
                  <div className="contact-card-label">{t.contact.phoneTitle}</div>
                  {isMobile ? (
                    <a href="tel:+306941234567" className="contact-card-value contact-card-link">
                      {t.general.phone}
                    </a>
                  ) : (
                    // <div className="contact-card-value">{t.general.phone}</div>
                    <div style={{position: "relative"}}>
                      <button 
                        onClick={handleCopyPhone} 
                        className="contact-card-value contact-card-link phone-copy-btn"
                        type="button"
                      >
                        {t.general.phone}
                      </button>


                      {phoneCopied && (
                        <div className="phone-copy-toast">
                          ✓ {t.contactMessages.phoneCopied}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Address */}
              <div className="contact-info-card">
                <div className="contact-card-icon"><i className="fa-solid fa-location-dot"></i></div>
                <div className="contact-card-content">
                  <div className="contact-card-label">{t.contact.addressTitle}</div>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${t.contact.addressValue} ${t.contact.addressValueCountry}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-card-value contact-card-link"
                  >
                    {t.contact.addressValue}, {t.contact.addressValueCountry}
                  </a>
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

          
            
  

          {/* === RIGHT SIDE (FORM) === */}
          <div className="contact-form-secondary" style={{
            background: `url(${getCloudinaryUrl(CLOUDINARY_IMAGES.other.texture,)
            
          })`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}>
            <h3 className="contact-form-heading">{t.contact.quickMessageTitle}</h3>
            <p className="contact-form-subtitle">{t.contact.quickMessageText}</p>
            
            <form onSubmit={handleSubmit} className="contact-form-compact">
              {/* Name */}
              <div className="contact-field-compact">
                <label htmlFor="name">{t.contact.nameTitle} *</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className={`contact-input-compact ${formErrors.name ? 'input-error' : ''}`}
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={(e) => validateField(e.target.name, e.target.value)}
                  placeholder={t.contact.namePlaceholder}
                  disabled={formStatus === 'sending'}
                />
                {formErrors.name && <div className="error-text">{formErrors.name}</div>}
              </div>

              {/* Email */}
              <div className="contact-field-compact">
                <label htmlFor="email">Email *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className={`contact-input-compact ${formErrors.email ? 'input-error' : ''}`}
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={(e) => validateField(e.target.name, e.target.value)}
                  placeholder="email@example.com"
                  disabled={formStatus === 'sending'}
                />
                {formErrors.email && <div className="error-text">{formErrors.email}</div>}
              </div>

              {/* Message */}
              <div className="contact-field-compact">
                <label htmlFor="message">{t.contact.messageTitle} *</label>
                <textarea
                  id="message"
                  name="message"
                  className={`contact-textarea-compact ${formErrors.message ? 'input-error' : ''}`}
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={(e) => validateField(e.target.name, e.target.value)}
                  placeholder={t.contact.messagePlaceholder}
                  disabled={formStatus === 'sending'}
                ></textarea>
                {formErrors.message && <div className="error-text">{formErrors.message}</div>}
              </div>

              <button
                type="submit"
                className="contact-submit-compact"
                disabled={formStatus === 'sending'}
              >
                {formStatus === 'sending'
                  ? t.contact.messageSending
                  : formStatus === 'success'
                  ? '✓ ' + t.contact.messageSent
                  : t.contact.messageButton}
              </button>
            </form>
          </div>
        </div>
        {/* === Banner Overlay === */}
        {formStatus === 'success' && (
          <div className="form-success-compact-overlay">
            ✓ {t.contact.messageSuccess}
          </div>
        )}
        {formStatus === 'error' && errorMessage && (
          <div className="form-error-banner-overlay">
            ✕ {errorMessage}
          </div>
        )}
      </section>
    </div>
  );
}

export default MainContact;
