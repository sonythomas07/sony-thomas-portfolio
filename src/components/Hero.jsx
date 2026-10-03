import React from 'react';
import './Hero.css';
import profileImg from '../assets/profile.png';

const techStack = [
  {
    name: 'React',
    icon: (
      <svg className="tech-svg" viewBox="-11.5 -10.23174 23 20.46348" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="0" cy="0" r="2.05" fill="#00D8FF" />
        <g stroke="#00D8FF" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    ),
  },
  {
    name: 'Python',
    icon: (
      <svg className="tech-svg" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M63.5 0C29.6 0 31.7 14.6 31.7 14.6L31.8 29.8H64v4.5H19.7S0 32.1 0 65.5s17.2 33.7 17.2 33.7h10.2v-14.9s-.6-17.7 17.4-17.7h29.8s16.7.3 16.7-16.1V16.7S93.2 0 63.5 0zm-17 10.3c3.7 0 6.7 3 6.7 6.7s-3 6.7-6.7 6.7-6.7-3-6.7-6.7c0-3.6 3-6.7 6.7-6.7z" fill="#387EB8" />
        <path d="M64.5 128c33.9 0 31.8-14.6 31.8-14.6l-.1-15.2H64v-4.5h44.3s19.7 2.2 19.7-31.2-17.2-33.7-17.2-33.7H100.6v14.9s.6 17.7-17.4 17.7H53.4s-16.7-.3-16.7 16.1v33.8s-2 16.7 27.8 16.7zm17-10.3c-3.7 0-6.7-3-6.7-6.7s3-6.7 6.7-6.7 6.7 3 6.7 6.7c0 3.6-3 6.7-6.7 6.7z" fill="#FFE052" />
      </svg>
    ),
  },
  {
    name: 'FastAPI',
    icon: (
      <svg className="tech-svg" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="64" cy="64" r="64" fill="#05998B" />
        <path d="M70.9 104.7L36.4 69.2h22.9L55.2 23.3l36.4 35.5H68.7l2.2 45.9z" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    name: 'MySQL',
    icon: (
      <svg className="tech-svg" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M64 12C35.3 12 12 35.3 12 64s23.3 52 52 52 52-23.3 52-52S92.7 12 64 12zm24 64.8c-2.3 8.7-10.1 14.8-19.1 14.8-11 0-20-9-20-20s9-20 20-20c6.4 0 12.1 3 15.8 7.8l-5.6 4.3c-2.5-3.3-6.2-5.3-10.2-5.3-7.2 0-13.1 5.9-13.1 13.1s5.9 13.1 13.1 13.1c5.9 0 10.9-3.9 12.5-9.4H68.9v-6.8H88v8.4z" fill="#00758F" />
      </svg>
    ),
  },
  {
    name: 'JavaScript',
    icon: (
      <svg className="tech-svg" viewBox="0 0 630 630" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect width="630" height="630" rx="80" fill="#F7DF1E" />
        <path d="m423.2 492.19c12.69 20.72 29.2 35.95 58.4 35.95 24.53 0 40.2-12.26 40.2-29.2 0-20.3-16.1-27.49-43.1-39.3l-14.8-6.35c-42.72-18.2-70.63-41.03-70.63-89.23 0-44.4 33.83-78.23 86.7-78.23 37.63 0 64.7 13.1 82.5 44.41l-44 28.34c-9.72-17.34-22.41-24.95-38.5-24.95-17.76 0-30.87 11-30.87 25.37 0 17.77 11 25 36.37 36l14.8 6.35c52 22.41 78.67 44.83 78.67 92.2 0 52.44-41.45 82.9-94.74 82.9-53.29 0-87.13-28.34-102.37-64.26zm-209.76-7.18c7.61 13.53 18.19 24.95 38.07 24.95 20.72 0 33.83-9.73 33.83-47.37v-207.24h54.13v209.77c0 68.94-40.18 97.7-94.74 97.7-47.79 0-77-24.53-91.39-57.93z" fill="#000000" />
      </svg>
    ),
  },
];

export default function Hero() {
  return (
    <section className="hero" id="home">
      {/* Background Subtle Ambient Lighting */}
      <div className="hero-bg-glow" aria-hidden="true" />
      <div className="hero-bg-grid" aria-hidden="true" />

      <div className="container hero-container hero-reveal">
        {/* Left Column: Typography, Actions, Technology Row */}
        <div className="hero-left">
          {/* Eyebrow: ──── HELLO, I'M */}
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-line" aria-hidden="true" />
            <span className="hero-eyebrow-text">HELLO, I'M</span>
          </div>

          {/* Secondary Personal Introduction: SONY (white) + THOMAS (purple gradient) on ONE line */}
          <div className="hero-name">
            <span className="hero-name-first">SONY</span>{' '}
            <span className="hero-name-last">THOMAS</span>
          </div>

          {/* Dominant Professional Headline: FULL-STACK / DEVELOPER | */}
          <h1 className="hero-role">
            <span className="hero-role-main">FULL-STACK</span>
            <span className="hero-role-line2">
              <span className="hero-role-accent">DEVELOPER</span>
              <span className="hero-role-cursor" aria-hidden="true">|</span>
            </span>
          </h1>

          {/* Concise Description */}
          <p className="hero-description">
            I build modern web applications with clean user interfaces, scalable backend systems, and intelligent features, turning ideas into real-world solutions.
          </p>

          {/* CTA Buttons with Glassmorphism Treatment */}
          <div className="hero-cta-group">
            <a href="#projects" className="btn-hero-primary">
              <span>View My Work</span>
              <span className="btn-arrow" aria-hidden="true">→</span>
            </a>
            <a
              href={`${import.meta.env.BASE_URL}Sony_Thomas_Resume.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-hero-secondary"
            >
              <span>Download Resume</span>
              <svg
                className="btn-download-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </a>
          </div>

          {/* Technology Stack Row (One Clean Row on Desktop with Vertical Dividers) */}
          <div className="hero-tech-row" aria-label="Technologies I work with">
            {techStack.map((tech, idx) => (
              <React.Fragment key={tech.name}>
                <div className="hero-tech-item">
                  <span className="hero-tech-icon-wrap">{tech.icon}</span>
                  <span className="hero-tech-name">{tech.name}</span>
                </div>
                {idx < techStack.length - 1 && (
                  <span className="hero-tech-sep" aria-hidden="true" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Right Column: Portrait + Futuristic Purple Orbital HUD Visual System */}
        <div className="hero-right">
          <div className="portrait-composition">
            {/* Layer 1: Large Soft Purple Atmospheric Glow (Multiple Radial Halos) */}
            <div className="purple-ambient-glow" aria-hidden="true">
              <div className="ambient-halo-outer" />
              <div className="ambient-halo-mid" />
              <div className="ambient-halo-core" />
            </div>

            {/* Layer 2: Main Vivid Neon Purple Ring */}
            <div className="purple-neon-ring" aria-hidden="true" />

            {/* Layer 3 & 4: Multiple Outer Rings, Broken Orbital Arcs, Inner HUD Details & Technical Connections */}
            <svg
              className="tech-orbital-system"
              viewBox="0 0 580 580"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="arcGradVivid" x1="400" y1="65" x2="515" y2="245" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#E9D5FF" stopOpacity="0.95" />
                  <stop offset="40%" stopColor="#C084FC" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="arcGradCyan" x1="130" y1="115" x2="65" y2="245" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#C084FC" stopOpacity="0.75" />
                  <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.25" />
                </linearGradient>
                <linearGradient id="innerArcGrad" x1="160" y1="130" x2="230" y2="100" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#C084FC" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.15" />
                </linearGradient>
                <filter id="arcGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* ==================== A. DETAILS INSIDE MAIN RING (r < 190) ==================== */}
              {/* A1. Inner Subtle Segmented Orbital Arcs (r=168 and r=152) */}
              <path
                d="M 175 125 A 168 168 0 0 1 245 85"
                stroke="url(#innerArcGrad)"
                strokeWidth="1"
                strokeDasharray="4 4"
                strokeLinecap="round"
              />
              <path
                d="M 345 88 A 168 168 0 0 1 420 135"
                stroke="#A855F7"
                strokeWidth="1.1"
                strokeOpacity="0.38"
                strokeDasharray="8 4 2 4"
                strokeLinecap="round"
              />
              <path
                d="M 135 270 A 168 168 0 0 0 185 375"
                stroke="#8B5CF6"
                strokeWidth="0.85"
                strokeOpacity="0.28"
                strokeDasharray="5 5"
              />
              <path
                d="M 405 365 A 168 168 0 0 1 445 285"
                stroke="#A855F7"
                strokeWidth="0.9"
                strokeOpacity="0.32"
                strokeDasharray="6 3"
              />

              {/* A2. Inner Radial Tick Marks around Circumference (r=176 to 184) */}
              <line x1="215" y1="92" x2="220" y2="98" stroke="#C084FC" strokeWidth="0.8" strokeOpacity="0.4" />
              <line x1="230" y1="84" x2="234" y2="91" stroke="#C084FC" strokeWidth="0.8" strokeOpacity="0.45" />
              <line x1="246" y1="78" x2="249" y2="86" stroke="#C084FC" strokeWidth="0.8" strokeOpacity="0.35" />
              <line x1="334" y1="78" x2="331" y2="86" stroke="#A855F7" strokeWidth="0.8" strokeOpacity="0.35" />
              <line x1="350" y1="84" x2="346" y2="91" stroke="#A855F7" strokeWidth="0.8" strokeOpacity="0.45" />
              <line x1="365" y1="92" x2="360" y2="98" stroke="#A855F7" strokeWidth="0.8" strokeOpacity="0.4" />
              
              <line x1="126" y1="215" x2="134" y2="217" stroke="#8B5CF6" strokeWidth="0.75" strokeOpacity="0.35" />
              <line x1="124" y1="230" x2="132" y2="231" stroke="#8B5CF6" strokeWidth="0.75" strokeOpacity="0.45" />
              <line x1="124" y1="260" x2="132" y2="259" stroke="#8B5CF6" strokeWidth="0.75" strokeOpacity="0.45" />
              <line x1="126" y1="275" x2="134" y2="273" stroke="#8B5CF6" strokeWidth="0.75" strokeOpacity="0.35" />

              {/* A3. Inner Technical Corner Markers & Targeting Brackets */}
              {/* Upper-Left Corner Bracket (x=165, y=140) */}
              <path d="M 155 145 L 155 135 L 165 135" stroke="#C084FC" strokeWidth="0.9" strokeOpacity="0.5" fill="none" />
              <circle cx="170" cy="148" r="1.5" fill="#E9D5FF" opacity="0.55" />
              <line x1="166" y1="148" x2="174" y2="148" stroke="#C084FC" strokeWidth="0.6" strokeOpacity="0.4" />
              <line x1="170" y1="144" x2="170" y2="152" stroke="#C084FC" strokeWidth="0.6" strokeOpacity="0.4" />

              {/* Upper-Right Corner Bracket (x=415, y=140) */}
              <path d="M 425 145 L 425 135 L 415 135" stroke="#A855F7" strokeWidth="0.9" strokeOpacity="0.5" fill="none" />
              <rect x="408" y="142" width="3" height="3" fill="#C084FC" opacity="0.45" />

              {/* Mid-Left Segmented Indicator Line */}
              <line x1="130" y1="245" x2="155" y2="245" stroke="#C084FC" strokeWidth="0.8" strokeDasharray="3 3" strokeOpacity="0.4" />
              <circle cx="158" cy="245" r="1.5" fill="#C084FC" opacity="0.5" />

              {/* Lower-Left Tech Node & Bracket */}
              <path d="M 155 345 L 155 355 L 165 355" stroke="#8B5CF6" strokeWidth="0.85" strokeOpacity="0.4" fill="none" />
              <circle cx="168" cy="350" r="1.5" fill="#A855F7" opacity="0.4" />

              {/* Lower-Right Tech Bracket */}
              <path d="M 425 345 L 425 355 L 415 355" stroke="#A855F7" strokeWidth="0.85" strokeOpacity="0.4" fill="none" />
              <line x1="400" y1="355" x2="410" y2="355" stroke="#8B5CF6" strokeWidth="0.75" strokeOpacity="0.35" />

              {/* A4. Inner Digital Signal Dashes */}
              <line x1="160" y1="165" x2="172" y2="165" stroke="#C084FC" strokeWidth="1" strokeOpacity="0.32" />
              <line x1="160" y1="169" x2="167" y2="169" stroke="#C084FC" strokeWidth="1" strokeOpacity="0.22" />
              <line x1="160" y1="173" x2="175" y2="173" stroke="#C084FC" strokeWidth="1" strokeOpacity="0.28" />

              <line x1="408" y1="165" x2="420" y2="165" stroke="#A855F7" strokeWidth="1" strokeOpacity="0.32" />
              <line x1="413" y1="169" x2="420" y2="169" stroke="#A855F7" strokeWidth="1" strokeOpacity="0.22" />

              {/* ==================== B. DETAILS OUTSIDE MAIN RING ==================== */}
              {/* B1. Multiple Outer Circular Concentric Rings with Segmented Breaks */}
              {/* Outer Ring 1: Fine Tracking Ring (r=215, Segmented Breaks) */}
              <circle cx="290" cy="245" r="215" stroke="#8B5CF6" strokeWidth="0.8" strokeOpacity="0.26" strokeDasharray="16 8 4 8 28 12" />
              
              {/* Outer Ring 2: Mid Thin Orbital Ring (r=235) */}
              <circle cx="290" cy="245" r="235" stroke="#A855F7" strokeWidth="0.85" strokeOpacity="0.28" />

              {/* Outer Ring 3: Outer Dashed Orbit Ring (r=255) */}
              <circle cx="290" cy="245" r="255" stroke="#C084FC" strokeWidth="0.9" strokeOpacity="0.2" strokeDasharray="5 9" />

              {/* Outer Ring 4: Extended Perimeter Ring (r=275, Dotted) */}
              <circle cx="290" cy="245" r="275" stroke="#7C3AED" strokeWidth="0.65" strokeOpacity="0.16" strokeDasharray="1 12" />

              {/* B2. Broken Orbital Arcs */}
              {/* Upper-Right Vivid Glowing Arc */}
              <path d="M 400 65 A 225 225 0 0 1 515 245" stroke="url(#arcGradVivid)" strokeWidth="2.2" strokeLinecap="round" filter="url(#arcGlow)" />

              {/* Upper-Left Accent Arc */}
              <path d="M 130 115 A 225 225 0 0 1 65 245" stroke="url(#arcGradCyan)" strokeWidth="1.6" strokeLinecap="round" strokeOpacity="0.65" />

              {/* Lower-Right Dashed Tracking Arc */}
              <path d="M 505 320 A 225 225 0 0 1 425 435" stroke="#A855F7" strokeWidth="1.5" strokeDasharray="6 5" strokeOpacity="0.6" strokeLinecap="round" />

              {/* Lower-Left Thin Geometric Arc */}
              <path d="M 80 290 A 225 225 0 0 0 160 410" stroke="#8B5CF6" strokeWidth="1.2" strokeOpacity="0.45" strokeLinecap="round" />

              {/* Top-Center Micro Arc Bracket */}
              <path d="M 255 20 A 225 225 0 0 1 325 20" stroke="#E9D5FF" strokeWidth="2" strokeOpacity="0.75" strokeLinecap="round" />

              {/* Outer Perimeter Flank Arc (r=255) */}
              <path d="M 545 220 A 255 255 0 0 1 535 310" stroke="#C084FC" strokeWidth="1.4" strokeOpacity="0.5" strokeDasharray="8 4 2 4" strokeLinecap="round" />

              {/* B3. Radial Ticks & Geometric Angle Markers */}
              <line x1="290" y1="12" x2="290" y2="26" stroke="#C084FC" strokeWidth="1.4" strokeOpacity="0.75" />
              <line x1="290" y1="464" x2="290" y2="478" stroke="#8B5CF6" strokeWidth="1.2" strokeOpacity="0.5" />
              <line x1="47" y1="245" x2="61" y2="245" stroke="#C084FC" strokeWidth="1.4" strokeOpacity="0.75" />
              <line x1="519" y1="245" x2="533" y2="245" stroke="#C084FC" strokeWidth="1.4" strokeOpacity="0.75" />
              
              {/* 45-degree angle marker ticks */}
              <line x1="449" y1="86" x2="459" y2="76" stroke="#E9D5FF" strokeWidth="1.2" strokeOpacity="0.6" />
              <line x1="131" y1="86" x2="121" y2="76" stroke="#A855F7" strokeWidth="1.2" strokeOpacity="0.5" />
              <line x1="449" y1="404" x2="459" y2="414" stroke="#8B5CF6" strokeWidth="1.2" strokeOpacity="0.5" />
              <line x1="131" y1="404" x2="121" y2="414" stroke="#8B5CF6" strokeWidth="1.2" strokeOpacity="0.5" />

              {/* B4. Outer Structural & Connecting Technical Lines */}
              {/* Upper-right 45-degree connector to outer coordinate marker */}
              <line x1="450" y1="85" x2="510" y2="85" stroke="#C084FC" strokeWidth="0.9" strokeOpacity="0.65" />
              <circle cx="510" cy="85" r="2.5" fill="#E9D5FF" stroke="#A855F7" strokeWidth="1" filter="url(#nodeGlow)" />

              {/* Mid-right stepped connector line */}
              <path d="M 480 185 L 530 185 L 542 197" stroke="#A855F7" strokeWidth="0.85" strokeOpacity="0.55" fill="none" />
              <rect x="540" y="195" width="4" height="4" fill="#E9D5FF" stroke="#A855F7" strokeWidth="0.75" filter="url(#nodeGlow)" />

              {/* Mid-right extended horizontal connector */}
              <line x1="525" y1="245" x2="565" y2="245" stroke="#A855F7" strokeWidth="0.8" strokeOpacity="0.5" />
              <rect x="563" y="243" width="4" height="4" fill="#C084FC" stroke="#E9D5FF" strokeWidth="0.75" filter="url(#nodeGlow)" />

              {/* Lower-right stepped connector */}
              <line x1="435" y1="390" x2="475" y2="430" stroke="#8B5CF6" strokeWidth="0.85" strokeOpacity="0.5" />
              <line x1="475" y1="430" x2="525" y2="430" stroke="#8B5CF6" strokeWidth="0.85" strokeOpacity="0.45" />
              <circle cx="525" cy="430" r="2" fill="#C084FC" />

              {/* Upper-left stepped connector */}
              <line x1="130" y1="115" x2="70" y2="115" stroke="#C084FC" strokeWidth="0.85" strokeOpacity="0.55" />
              <rect x="68" y="113" width="4" height="4" fill="#E9D5FF" stroke="#A855F7" strokeWidth="0.75" filter="url(#nodeGlow)" />
              <line x1="70" y1="115" x2="55" y2="130" stroke="#C084FC" strokeWidth="0.8" strokeOpacity="0.45" />
              <circle cx="55" cy="130" r="1.8" fill="#C084FC" />

              {/* Lower-left horizontal line */}
              <line x1="80" y1="290" x2="30" y2="290" stroke="#8B5CF6" strokeWidth="0.8" strokeOpacity="0.45" />
              <circle cx="30" cy="290" r="2" fill="#A855F7" />

              {/* B5. Outer Geometric HUD Brackets */}
              <path d="M 50 80 L 40 80 L 40 90" stroke="#A855F7" strokeWidth="0.85" strokeOpacity="0.4" fill="none" />
              <path d="M 540 80 L 550 80 L 550 90" stroke="#C084FC" strokeWidth="0.85" strokeOpacity="0.4" fill="none" />
              <path d="M 540 450 L 550 450 L 550 440" stroke="#8B5CF6" strokeWidth="0.85" strokeOpacity="0.4" fill="none" />
              <path d="M 50 450 L 40 450 L 40 440" stroke="#8B5CF6" strokeWidth="0.85" strokeOpacity="0.4" fill="none" />
            </svg>

            {/* Layer 5: Glowing Purple Square Nodes Overlay */}
            <div className="tech-nodes-overlay" aria-hidden="true">
              <span className="tech-sq-node tech-sq-node--tr1" />
              <span className="tech-sq-node tech-sq-node--tr2" />
              <span className="tech-sq-node tech-sq-node--tr3" />
              <span className="tech-sq-node tech-sq-node--tl" />
              <span className="tech-sq-node tech-sq-node--tl2" />
              <span className="tech-sq-node tech-sq-node--mr" />
              <span className="tech-sq-node tech-sq-node--br" />
              <span className="tech-sq-node tech-sq-node--br2" />
              <span className="tech-sq-node tech-sq-node--bl" />

              {/* Structural Vertical Lines with Micro Dots */}
              <div className="tech-vertical-system tech-vertical-system--right">
                <span className="tech-v-dot" />
                <span className="tech-v-line" />
                <span className="tech-v-dot" />
              </div>

              <div className="tech-vertical-system tech-vertical-system--left">
                <span className="tech-v-dot" />
                <span className="tech-v-line tech-v-line--short" />
                <span className="tech-v-dot" />
              </div>

              {/* Micro Crosshair Coordinates (+) */}
              <span className="micro-crosshair micro-crosshair--tr">+</span>
              <span className="micro-crosshair micro-crosshair--tl">+</span>
              <span className="micro-crosshair micro-crosshair--mr">+</span>
              <span className="micro-crosshair micro-crosshair--br">+</span>
              <span className="micro-crosshair micro-crosshair--bl">+</span>
            </div>

            {/* Layer 6: Particle Dot Clusters & Digital Dash / HUD Signals */}
            <div className="tech-particles-overlay" aria-hidden="true">
              {/* Particle Cluster 1: Upper Right */}
              <div className="particle-cluster particle-cluster--ur">
                <span className="p-dot p-dot--lg" />
                <span className="p-dot p-dot--sm" />
                <span className="p-dot p-dot--md" />
                <span className="p-dot p-dot--xs" />
                <span className="p-dot p-dot--sm" />
              </div>

              {/* Particle Cluster 2: Mid Right */}
              <div className="particle-cluster particle-cluster--mr">
                <span className="p-dot p-dot--sm" />
                <span className="p-dot p-dot--md" />
                <span className="p-dot p-dot--xs" />
                <span className="p-dot p-dot--sm" />
              </div>

              {/* Particle Cluster 3: Lower Right */}
              <div className="particle-cluster particle-cluster--lr">
                <span className="p-dot p-dot--md" />
                <span className="p-dot p-dot--sm" />
                <span className="p-dot p-dot--xs" />
                <span className="p-dot p-dot--sm" />
              </div>

              {/* Particle Cluster 4: Upper Left */}
              <div className="particle-cluster particle-cluster--ul">
                <span className="p-dot p-dot--sm" />
                <span className="p-dot p-dot--xs" />
                <span className="p-dot p-dot--md" />
                <span className="p-dot p-dot--xs" />
              </div>

              {/* Particle Cluster 5: Mid Left */}
              <div className="particle-cluster particle-cluster--ml">
                <span className="p-dot p-dot--xs" />
                <span className="p-dot p-dot--sm" />
                <span className="p-dot p-dot--xs" />
              </div>

              {/* Digital Dash Signals */}
              <div className="digital-dashes digital-dashes--ur">
                <span className="dash dash--long" />
                <span className="dash dash--short" />
                <span className="dash dash--med" />
              </div>

              <div className="digital-dashes digital-dashes--mr">
                <span className="dash dash--med" />
                <span className="dash dash--long" />
                <span className="dash dash--short" />
              </div>

              <div className="digital-dashes digital-dashes--lr">
                <span className="dash dash--short" />
                <span className="dash dash--med" />
                <span className="dash dash--long" />
              </div>

              <div className="digital-dashes digital-dashes--ul">
                <span className="dash dash--short" />
                <span className="dash dash--med" />
              </div>
            </div>

            {/* Foreground Real Portrait Image */}
            <img
              src={profileImg}
              alt="Sony Thomas - Full-Stack Developer"
              className="hero-portrait-img"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
