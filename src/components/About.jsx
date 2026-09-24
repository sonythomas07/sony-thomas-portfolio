import React from 'react';
import './About.css';

const editorialBlocks = [
  {
    number: '01',
    label: 'MY JOURNEY',
    text: 'From a curious student to a developer who loves building, learning, and solving real-world problems.',
  },
  {
    number: '02',
    label: 'WHAT I DO',
    text: 'I build modern web applications focused on clean design, seamless experiences, and meaningful functionality.',
  },
  {
    number: '03',
    label: 'WHAT EXCITES ME',
    text: 'I’m interested in the intersection of technology and design, especially AI/ML, scalable web solutions, and products with real impact.',
  },
  {
    number: '04',
    label: 'BEYOND TECH',
    text: 'When I’m not coding, I’m exploring new ideas, learning, and finding inspiration in everyday experiences.',
  },
];

const personalStats = [
  {
    value: '8.82',
    label: 'CGPA',
  },
  {
    value: 'FINAL YEAR',
    label: 'B.Tech CSE',
  },
  {
    value: 'MYSURU',
    label: 'From',
  },
];

export default function About() {
  return (
    <section className="about section" id="about">
      <div className="container about-container">
        {/* Section Label */}
        <div className="about-section-label">
          <span className="section-num">02.</span>
          <span className="section-title">ABOUT ME</span>
        </div>

        {/* Two-Column Editorial Layout */}
        <div className="about-editorial-grid">
          {/* Left Column */}
          <div className="about-left-col">
            <h2 className="about-main-headline">
              <span className="headline-line headline-light">MORE THAN</span>
              <span className="headline-line headline-accent">JUST CODE.</span>
            </h2>

            <div className="about-intro-copy">
              <p className="intro-lead">
                A curious mind, a problem solver, and a builder who cares about real people and real impact.
              </p>
              <p className="intro-body">
                I'm Sony Thomas, a final-year Computer Science student who enjoys turning ideas into modern web applications, exploring AI/ML, and designing intuitive user experiences that make technology simple and meaningful.
              </p>
              <p className="intro-body">
                I'm always learning, always building, and always looking for ways to create value.
              </p>
            </div>

            {/* Personal Stats Row */}
            <div className="about-stats-row">
              {personalStats.map((stat, idx) => (
                <React.Fragment key={idx}>
                  <div className="stat-item">
                    <span className="stat-value">{stat.value}</span>
                    <span className="stat-label">{stat.label}</span>
                  </div>
                  {idx < personalStats.length - 1 && <div className="stat-divider" aria-hidden="true" />}
                </React.Fragment>
              ))}
            </div>

            {/* Simple CTA */}
            <div className="about-cta-wrapper">
              <a href="#contact" className="about-cta-btn">
                Let's talk
              </a>
            </div>
          </div>

          {/* Vertical Divider Between Columns */}
          <div className="about-column-divider" aria-hidden="true">
            <span className="divider-accent-dot" />
          </div>

          {/* Right Column: Numbered Editorial Sections */}
          <div className="about-right-col">
            {editorialBlocks.map((block) => (
              <article className="editorial-block" key={block.number}>
                <span className="block-number">{block.number}</span>
                <h3 className="block-label">{block.label}</h3>
                <p className="block-text">{block.text}</p>
              </article>
            ))}
          </div>
        </div>

        {/* Bottom Editorial Details */}
        <div className="about-bottom-editorial">
          <span className="bottom-tagline-left">PEOPLE × TECHNOLOGY × IMPACT</span>
          <div className="bottom-accent-line" aria-hidden="true" />
          <span className="bottom-tagline-right">ALWAYS LEARNING. ALWAYS BUILDING.</span>
        </div>
      </div>
    </section>
  );
}
