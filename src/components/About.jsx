import React from 'react';
import './About.css';

const highlights = [
  'Full-Stack Web Development',
  'Responsive UI Engineering',
  'User-Centered Architecture',
  'Problem Solving & Clean Code',
];

const skillCategories = [
  {
    icon: 'fa-solid fa-code',
    title: 'Frontend',
    skills: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    icon: 'fa-solid fa-palette',
    title: 'Design',
    skills: ['Figma', 'Wireframing', 'Prototyping', 'User Research'],
  },
  {
    icon: 'fa-solid fa-laptop-code',
    title: 'Development',
    skills: ['Python', 'Git', 'GitHub', 'VS Code'],
  },
];

const stats = [
  { value: '01', label: 'Projects' },
  { value: '8.82', label: 'CGPA' },
  { value: '03', label: 'Certifications' },
  { value: '01', label: 'Internship' },
];

export default function About() {
  return (
    <section className="about section" id="about">
      <div className="container">
        <div className="section-heading">
          <span className="section-number">02.</span>
          <h2>Who I Am</h2>
        </div>

        <div className="about-wrapper">
          {/* Left Content */}
          <div className="about-content">
            <span className="about-tag">About Me</span>

            <h3>
              Building reliable digital applications through thoughtful design
              and clean, modern code.
            </h3>

            <p>
              I'm Sony Thomas, a Computer Science student focused on full-stack
              development and modern web technologies. I build responsive web
              applications and intuitive interfaces that combine usability,
              performance, and clean code.
            </p>

            <div className="about-highlights">
              {highlights.map((item, index) => (
                <div className="highlight-item" key={index}>
                  <span className="highlight-dot"></span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Skills */}
          <div className="skills-preview">
            {skillCategories.map((cat, index) => (
              <div className="skill-category" key={index}>
                <div className="skill-header">
                  <i className={cat.icon}></i>
                  <h4>{cat.title}</h4>
                </div>

                <div className="skill-tags">
                  {cat.skills.map((skill, sIdx) => (
                    <span key={sIdx}>{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="about-stats">
          {stats.map((stat, index) => (
            <div className="stat-card" key={index}>
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
