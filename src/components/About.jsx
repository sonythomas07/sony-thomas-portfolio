import React from 'react';
import './About.css';
import mapImage from '../assets/map.png';

const personalInfo = [
  {
    label: 'Name',
    value: 'Sony Thomas',
    icon: (
      <svg className="info-row-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    label: 'Email',
    value: 'sonythomas703@gmail.com',
    icon: (
      <svg className="info-row-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    label: 'Location',
    value: 'Mysuru, Karnataka, India',
    icon: (
      <svg className="info-row-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    label: 'Availability',
    value: 'Open to Opportunities',
    icon: (
      <svg className="info-row-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect width="20" height="14" x="2" y="7" rx="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
];

const statCards = [
  {
    value: '8.82',
    label: 'CGPA',
    icon: (
      <svg className="stat-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
  },
  {
    value: '2',
    label: 'PROJECTS COMPLETED',
    icon: (
      <svg className="stat-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
      </svg>
    ),
  },
  {
    value: '2',
    label: 'INTERNSHIPS',
    icon: (
      <svg className="stat-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect width="20" height="14" x="2" y="7" rx="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  {
    value: '2',
    label: 'ONGOING PROJECTS',
    icon: (
      <svg className="stat-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
];

export default function About() {
  return (
    <section className="about section" id="about">
      {/* Background Subtle Atmosphere */}
      <div className="about-bg-glow" aria-hidden="true" />

      <div className="container about-container">
        {/* Section Label: 02. ABOUT ME */}
        <div className="about-section-label reveal">
          <span className="section-num">02.</span>
          <span className="section-title">ABOUT ME</span>
        </div>

        {/* Two-Column Editorial Layout */}
        <div className="about-main-layout">
          {/* Left Column: Heading, Introduction, 4 Stat Cards */}
          <div className="about-left-col">
            <h2 className="about-main-headline reveal reveal-delay-1">
              <span className="headline-line headline-light">MORE THAN</span>
              <span className="headline-line headline-accent">
                JUST <span className="headline-purple-gradient">CODE.</span>
              </span>
            </h2>

            <div className="about-intro-copy reveal reveal-delay-2">
              <p className="intro-lead">
                A curious mind, a problem solver, and a builder who cares about real people and real impact.
              </p>
              <p className="intro-body">
                I'm Sony Thomas, a final-year Computer Science and Engineering student who enjoys turning ideas into modern web applications, exploring AI/ML, and designing intuitive user experiences that make technology simple and meaningful.
              </p>
              <p className="intro-body">
                I'm always learning, always building, and always looking for ways to create value.
              </p>
            </div>

            {/* Four Statistic Cards (8.82 CGPA, 10+ Projects, 3+ Technologies, 2+ Internships) */}
            <div className="about-stats-grid reveal reveal-delay-3" aria-label="Key Metrics">
              {statCards.map((stat) => (
                <div className="stat-card" key={stat.label}>
                  <div className="stat-card-icon-wrap" aria-hidden="true">
                    {stat.icon}
                  </div>
                  <span className="stat-card-value">{stat.value}</span>
                  <span className="stat-card-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Central Subtle Vertical Divider */}
          <div className="about-central-divider" aria-hidden="true">
            <span className="divider-accent-bar" />
          </div>

          {/* Right Column: Info Panel + World Map */}
          <div className="about-right-col">
            {/* Information Panel */}
            <div className="about-info-panel reveal reveal-delay-2" aria-label="Personal Information">
              {personalInfo.map((info, idx) => (
                <React.Fragment key={info.label}>
                  <div className="info-panel-row">
                    <div className="info-icon-cell" aria-hidden="true">
                      {info.icon}
                    </div>
                    <div className="info-content-cell">
                      <span className="info-label">{info.label}:</span>
                      <span className="info-value">{info.value}</span>
                    </div>
                  </div>
                  {idx < personalInfo.length - 1 && (
                    <div className="info-row-divider" aria-hidden="true" />
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* World Map Container using map.png directly */}
            <div className="about-map-card reveal reveal-delay-3" aria-label="World map showing location in Mysuru, India">
              <div className="about-map-wrapper">
                <img
                  src={mapImage}
                  alt="World map"
                  className="about-map-img"
                  loading="lazy"
                  draggable={false}
                />
                {/* Exactly ONE Glowing Location Dot in Mysuru / Southern India */}
                <div className="about-map-marker" aria-hidden="true">
                  <span className="marker-halo" />
                  <span className="marker-pulse" />
                  <span className="marker-core" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
