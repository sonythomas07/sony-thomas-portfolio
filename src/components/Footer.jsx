import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-container">
        {/* Left: Copyright */}
        <div className="footer-left">
          <span>© 2026 Sony Thomas</span>
        </div>

        {/* Center: Title */}
        <div className="footer-center">
          <span>Full-Stack Developer</span>
        </div>

        {/* Right: Links */}
        <div className="footer-right">
          <a
            href="https://github.com/sonythomas07"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            GitHub
          </a>
          <span className="footer-sep" aria-hidden="true">·</span>
          <a
            href="https://www.linkedin.com/in/sony-thomas-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            LinkedIn
          </a>
          <span className="footer-sep" aria-hidden="true">·</span>
          <a href="mailto:sonythomas703@gmail.com" className="footer-link">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
