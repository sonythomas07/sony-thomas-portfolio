import React from 'react';
import './Hero.css';
import profileImg from '../assets/profile.png';

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="container hero-container">
        {/* Left Column: Typography & Actions */}
        <div className="hero-left">
          <div className="hero-intro">
            <span className="hero-greeting">HI, I'M SONY THOMAS</span>
          </div>

          <h1 className="hero-title">
            <span className="hero-title-top">FULL-STACK</span> <br />
            <span className="hero-title-gradient">DEVELOPER</span>
          </h1>

          <p className="hero-description">
            I build modern web applications and intelligent
            software experiences.
          </p>

          <div className="hero-cta-group">
            <a href="#projects" className="btn-primary">
              View Projects ↗
            </a>
            <a href="#contact" className="btn-secondary">
              Let's Connect
            </a>
          </div>

          <div className="hero-social">
            <a
              href="https://github.com/sonythomas07"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="social-link"
            >
              <i className="fa-brands fa-github"></i>
            </a>

            <a
              href="https://www.linkedin.com/in/sony-thomas-dev"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="social-link"
            >
              <i className="fa-brands fa-linkedin-in"></i>
            </a>

            <a
              href="#contact"
              aria-label="Email"
              className="social-link"
            >
              <i className="fa-solid fa-envelope"></i>
            </a>
          </div>
        </div>

        {/* Right Column: Standalone Prominent Editorial Portrait with Statement */}
        <div className="hero-right">
          <div className="portrait-wrapper">
            {/* Thin Electric-Blue Neon Arc (180-200 deg curve) */}
            <svg
              className="portrait-arc"
              viewBox="0 0 440 540"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M 170,40 A 220,230 0 0,1 200,490"
                stroke="url(#portraitArcGradient)"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="portraitArcGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3045E8" stopOpacity="0" />
                  <stop offset="15%" stopColor="#3045E8" stopOpacity="0.85" />
                  <stop offset="50%" stopColor="#435aff" stopOpacity="0.95" />
                  <stop offset="85%" stopColor="#2638D9" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#2638D9" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>

            <div className="portrait-statement">
              <span className="statement-accent-line"></span>
              <p className="statement-text">
                TURNING<br />
                IDEA INTO<br />
                REAL WORLD<br />
                <span className="statement-solution">SOLUTION</span>.
              </p>
            </div>
            <img
              src={profileImg}
              alt="Sony Thomas - Full-Stack Developer"
              className="portrait-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
