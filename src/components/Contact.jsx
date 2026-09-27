import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import contactBg from '../assets/contactbg.png';
import './Contact.css';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  // Auto-reset back to the original form 3 seconds after successful submission
  useEffect(() => {
    if (status === 'success') {
      const timer = setTimeout(() => {
        setStatus('idle');
        setFormData({ name: '', email: '', message: '' });
        setErrors({});
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const next = {};
    if (!formData.name.trim()) next.name = 'Name is required.';
    if (!formData.email.trim()) {
      next.email = 'Email is required.';
    } else if (!EMAIL_RE.test(formData.email.trim())) {
      next.email = 'Enter a valid email address.';
    }
    if (!formData.message.trim()) next.message = 'Message is required.';
    return next;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = validate();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    setStatus('sending');

    const templateParams = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      message: formData.message.trim(),
    };

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY }
      );
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
    } catch (_err) {
      setStatus('error');
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setFormData({ name: '', email: '', message: '' });
    setErrors({});
  };

  const isDisabled = status === 'sending';

  return (
    <section className="contact section" id="contact" aria-label="Contact Section">
      {/* Background Image & Subdued Dark Overlay */}
      <div
        className="contact-bg-image"
        style={{ backgroundImage: `url(${contactBg})` }}
        aria-hidden="true"
      />
      <div className="contact-bg-overlay" aria-hidden="true" />
      <div className="contact-bg-glow" aria-hidden="true" />

      <div className="container contact-container">

        {/* Section Top Label */}
        <div className="contact-top-bar reveal">
          <div className="contact-section-label">
            <span className="contact-num">05.</span>
            <span className="contact-label-text">CONTACT</span>
          </div>
        </div>

        {/* Main 2-Column Layout */}
        <div className="contact-main-grid">

          {/* Left Column - Minimal Editorial Headline, Copy & Social Cards */}
          <div className="contact-left-col reveal reveal-delay-1">
            <h2 className="contact-main-headline">
              <span className="headline-line headline-light">LET’S BUILD</span>
              <span className="headline-line headline-accent">
                <span className="headline-purple-gradient">SOMETHING.</span>
              </span>
            </h2>

            <p className="contact-intro-desc">
              Have an idea, project, or opportunity?
              <br />
              Let’s talk about it.
            </p>

            {/* Social Cards - Design C Card Style */}
            <div className="contact-cards-grid">
              <a
                href="https://www.linkedin.com/in/sony-thomas-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-card"
                aria-label="LinkedIn: Let’s Connect"
              >
                <div className="contact-card-icon-wrap" aria-hidden="true">
                  <svg viewBox="0 0 24 24" className="contact-card-svg" fill="currentColor">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                </div>
                <div className="contact-card-text">
                  <span className="contact-card-title">LinkedIn</span>
                  <span className="contact-card-sub">
                    Let’s Connect <span className="contact-card-arrow" aria-hidden="true">↗</span>
                  </span>
                </div>
              </a>

              <a
                href="https://github.com/sonythomas07"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-card"
                aria-label="GitHub: View My Code"
              >
                <div className="contact-card-icon-wrap" aria-hidden="true">
                  <svg viewBox="0 0 24 24" className="contact-card-svg" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    />
                  </svg>
                </div>
                <div className="contact-card-text">
                  <span className="contact-card-title">GitHub</span>
                  <span className="contact-card-sub">
                    View My Code <span className="contact-card-arrow" aria-hidden="true">↗</span>
                  </span>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column - Contact Form & Centered Success State */}
          <div className="contact-right-col reveal reveal-delay-2">
            <div className="contact-form-card">

              {/* SUCCESS STATE (Vertically & Horizontally Centered in the same card) */}
              {status === 'success' && (
                <div className="contact-status contact-status--success" role="status" aria-live="polite">
                  <div className="contact-status-icon-wrap" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="#C084FC" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="contact-status-title">MESSAGE SENT</h3>
                  <p className="contact-status-body">
                    Thanks for reaching out! I've received your message and will get back to you soon.
                  </p>
                  <button
                    type="button"
                    className="contact-status-reset"
                    onClick={handleReset}
                  >
                    SEND ANOTHER MESSAGE
                  </button>
                </div>
              )}

              {/* ERROR STATE */}
              {status === 'error' && (
                <div className="contact-status contact-status--error" role="alert" aria-live="assertive">
                  <h3 className="contact-status-title">SOMETHING WENT WRONG</h3>
                  <p className="contact-status-body">
                    Failed to send your message. Please try again or reach out directly via LinkedIn.
                  </p>
                  <button
                    type="button"
                    className="contact-status-reset"
                    onClick={handleReset}
                  >
                    TRY AGAIN
                  </button>
                </div>
              )}

              {/* ACTIVE FORM */}
              {(status === 'idle' || status === 'sending') && (
                <form
                  className="contact-form"
                  onSubmit={handleSubmit}
                  noValidate
                  aria-label="Contact form"
                >
                  <div className="contact-field">
                    <label htmlFor="cf-name" className="contact-field-label">
                      YOUR NAME
                    </label>
                    <input
                      id="cf-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      autoComplete="name"
                      required
                      disabled={isDisabled}
                      className={"contact-input" + (errors.name ? " contact-input--error" : "")}
                      aria-describedby={errors.name ? "cf-name-err" : undefined}
                    />
                    {errors.name && (
                      <span id="cf-name-err" className="contact-field-error" role="alert">
                        {errors.name}
                      </span>
                    )}
                  </div>

                  <div className="contact-field">
                    <label htmlFor="cf-email" className="contact-field-label">
                      EMAIL ADDRESS
                    </label>
                    <input
                      id="cf-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email Address"
                      autoComplete="email"
                      required
                      disabled={isDisabled}
                      className={"contact-input" + (errors.email ? " contact-input--error" : "")}
                      aria-describedby={errors.email ? "cf-email-err" : undefined}
                    />
                    {errors.email && (
                      <span id="cf-email-err" className="contact-field-error" role="alert">
                        {errors.email}
                      </span>
                    )}
                  </div>

                  <div className="contact-field">
                    <label htmlFor="cf-message" className="contact-field-label">
                      YOUR MESSAGE
                    </label>
                    <textarea
                      id="cf-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your idea, project, or role..."
                      rows={5}
                      required
                      disabled={isDisabled}
                      className={"contact-textarea" + (errors.message ? " contact-input--error" : "")}
                      aria-describedby={errors.message ? "cf-message-err" : undefined}
                    />
                    {errors.message && (
                      <span id="cf-message-err" className="contact-field-error" role="alert">
                        {errors.message}
                      </span>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isDisabled}
                    className={"contact-submit-btn" + (isDisabled ? " contact-submit-btn--sending" : "")}
                  >
                    {isDisabled ? (
                      <span>SENDING...</span>
                    ) : (
                      <>
                        <span>SEND MESSAGE</span>
                        <span className="btn-arrow" aria-hidden="true">↗</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Contact;
