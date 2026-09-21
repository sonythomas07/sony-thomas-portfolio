import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';

export default function Contact() {
  const formRef = useRef(null);
  const [btnText, setBtnText] = useState('Send Message');
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSending(true);
    setBtnText('Sending...');

    emailjs
      .sendForm(
        'service_izabk9u',
        'template_mu34mrp',
        formRef.current,
        'qbtWwsIz_ByKmwU33'
      )
      .then(() => {
        setBtnText('Message Sent ✓');
        if (formRef.current) {
          formRef.current.reset();
        }

        setTimeout(() => {
          setIsSending(false);
          setBtnText('Send Message');
        }, 2500);
      })
      .catch((error) => {
        console.error('EmailJS Error:', error);
        alert(`Status: ${error.status || 'Error'}\n\nText: ${error.text || error.message || 'Failed to send'}`);
        setIsSending(false);
        setBtnText('Send Message');
      });
  };

  return (
    <section className="contact section" id="contact">
      <div className="container">
        <div className="section-heading">
          <span className="section-number">04.</span>
          <h2>Get In Touch</h2>
        </div>

        <div className="contact-wrapper">
          {/* Left */}
          <div className="contact-info">
            <a
              href="https://www.linkedin.com/in/sony-thomas-1856913a0"
              className="contact-card"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="contact-icon">
                <i className="fa-brands fa-linkedin-in"></i>
              </div>

              <h3>LinkedIn</h3>
              <p>Let's connect and grow together.</p>

              <span className="contact-arrow">
                <i className="fa-solid fa-arrow-right"></i>
              </span>
            </a>

            <a
              href="https://github.com/sonythomas07"
              className="contact-card"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="contact-icon">
                <i className="fa-brands fa-github"></i>
              </div>

              <h3>GitHub</h3>
              <p>Follow my development journey.</p>

              <span className="contact-arrow">
                <i className="fa-solid fa-arrow-right"></i>
              </span>
            </a>
          </div>

          {/* Right */}
          <form
            className="contact-form"
            id="contact-form"
            ref={formRef}
            onSubmit={handleSubmit}
          >
            <div className="input-group">
              <input
                type="text"
                name="from_name"
                placeholder="Your Name"
                required
              />

              <input
                type="email"
                name="reply_to"
                placeholder="Email Address"
                required
              />
            </div>

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              required
            />

            <textarea
              rows="7"
              name="message"
              placeholder="Your Message"
              required
            ></textarea>

            <button type="submit" className="contact-btn" disabled={isSending}>
              <i className="fa-solid fa-paper-plane"></i>
              {btnText}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

