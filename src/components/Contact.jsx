import React from 'react';
import './Contact.css';

const contactRows = [
  {
    id: '01',
    label: 'EMAIL',
    mainText: 'sonythomas703@gmail.com',
    supportingText: 'Drop me a message anytime.',
    href: 'mailto:sonythomas703@gmail.com',
    isExternal: false,
  },
  {
    id: '02',
    label: 'LINKEDIN',
    mainText: 'linkedin.com/in/sony-thomas-dev',
    supportingText: 'Let’s connect and grow together.',
    href: 'https://www.linkedin.com/in/sony-thomas-dev',
    isExternal: true,
  },
  {
    id: '03',
    label: 'GITHUB',
    mainText: 'github.com/sonythomas07',
    supportingText: 'Explore my projects and code.',
    href: 'https://github.com/sonythomas07',
    isExternal: true,
  },
  {
    id: '04',
    label: 'RESUME',
    mainText: 'View Resume',
    supportingText: 'Check out my latest resume.',
    href: '/Sony_Thomas_Resume.pdf',
    isExternal: true,
  },
];

export default function Contact() {
  return (
    <section className="contact section" id="contact">
      <div className="container contact-container">
        {/* Main Editorial Grid */}
        <div className="contact-editorial-grid">
          {/* Left Column */}
          <div className="contact-left-col">
            <div className="contact-section-label">
              <span className="contact-num">05.</span>
              <span className="contact-label-text">CONTACT</span>
            </div>

            <h2 className="contact-main-headline">
              <span className="contact-headline-line headline-light">LET’S</span>
              <span className="contact-headline-line headline-light">BUILD</span>
              <span className="contact-headline-line headline-accent">SOMETHING.</span>
            </h2>

            <p className="contact-supporting-text">
              Have an idea, project, or opportunity?
              <br />
              Let’s talk about it.
            </p>

            <div className="contact-accent-line" aria-hidden="true" />

            <p className="contact-statement">
              GOOD IDEAS DESERVE
              <br />
              GREAT CONVERSATIONS.
            </p>
          </div>

          {/* Right Column: Contact Rows & CTA */}
          <div className="contact-right-col">
            <div className="contact-rows-list">
              {contactRows.map((row) => (
                <a
                  key={row.id}
                  href={row.href}
                  target={row.isExternal ? '_blank' : undefined}
                  rel={row.isExternal ? 'noopener noreferrer' : undefined}
                  className="contact-row"
                >
                  <div className="contact-row-info">
                    <span className="contact-row-label">{row.label}</span>
                    <span className="contact-row-main">{row.mainText}</span>
                    <span className="contact-row-sub">{row.supportingText}</span>
                  </div>

                  <div className="contact-row-action" aria-hidden="true">
                    <svg
                      className="contact-row-arrow"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </div>
                </a>
              ))}
            </div>

            {/* Outlined CTA Button */}
            <div className="contact-cta-wrapper">
              <a href="mailto:sonythomas703@gmail.com" className="contact-outlined-btn">
                <span>LET’S CONNECT</span>
                <svg
                  className="contact-btn-arrow"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Section Editorial Footer */}
        <div className="contact-bottom-editorial">
          <span className="contact-bottom-left">SONY THOMAS &nbsp;/&nbsp; FULL-STACK DEVELOPER</span>
          <div className="contact-bottom-line" aria-hidden="true" />
          <span className="contact-bottom-right">TURNING IDEAS INTO REAL SOLUTIONS.</span>
        </div>
      </div>
    </section>
  );
}
