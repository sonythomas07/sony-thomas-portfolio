import React from 'react';
import './Skills.css';

const coreTechnologies = [
  { name: 'Python', desc: 'Scripting, backend, AI/ML' },
  { name: 'React', desc: 'Building modern web interfaces' },
  { name: 'FastAPI', desc: 'High-performance APIs' },
  { name: 'MySQL', desc: 'Relational data management' },
  { name: 'JavaScript', desc: 'Interactive and dynamic web' },
  { name: 'HTML / CSS', desc: 'Clean and responsive design' },
];

const toolsWorkflow = [
  { name: 'Git & GitHub', desc: 'Version control and collaboration' },
  { name: 'VS Code', desc: 'Primary development environment' },
  { name: 'Figma', desc: 'UI/UX design and prototyping' },
  { name: 'Vite', desc: 'Fast and modern tooling' },
  { name: 'Recharts', desc: 'Data visualization for the web' },
  { name: 'jsPDF', desc: 'Generating downloadable reports' },
];

const beyondTechnology = [
  { name: 'Full-Stack Development', desc: 'Building complete, scalable solutions' },
  { name: 'UI/UX Design', desc: 'Creating intuitive user experiences' },
  { name: 'AI / ML', desc: 'Exploring real-world applications' },
  { name: 'Product Thinking', desc: 'Turning ideas into useful products' },
  { name: 'Problem Solving', desc: 'Breaking down complex challenges' },
  { name: 'Continuous Learning', desc: 'Staying curious and growing every day' },
];

export default function Skills() {
  return (
    <section className="skills section" id="skills">
      <div className="container skills-container">
        {/* Main Editorial Grid */}
        <div className="skills-editorial-grid">
          {/* Left Editorial Summary Column */}
          <div className="skills-left-col">
            <div className="skills-section-label">
              <span className="skills-num">03.</span>
              <span className="skills-label-text">SKILLS</span>
            </div>

            <h2 className="skills-main-headline">
              <span className="skills-headline-line headline-light">WHAT I</span>
              <span className="skills-headline-line headline-accent">WORK WITH.</span>
            </h2>

            <p className="skills-supporting-text">
              A curated set of technologies, tools, and principles I use to turn ideas into real and meaningful experiences.
            </p>

            <div className="skills-accent-line" aria-hidden="true" />

            <p className="skills-statement">
              GOOD TOOLS
              <br />
              ENABLE BETTER IDEAS.
            </p>
          </div>

          {/* Right Column: Three Numbered Columns with Vertical Dividers */}
          <div className="skills-right-col">
            {/* Column 01 */}
            <div className="skills-col">
              <div className="skills-col-header">
                <span className="skills-col-num">01</span>
                <h3 className="skills-col-title">CORE TECHNOLOGIES</h3>
              </div>

              <ul className="skills-list">
                {coreTechnologies.map((item) => (
                  <li key={item.name} className="skills-item">
                    <span className="skills-item-name">{item.name}</span>
                    <span className="skills-item-desc">{item.desc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Vertical Divider */}
            <div className="skills-col-divider" aria-hidden="true" />

            {/* Column 02 */}
            <div className="skills-col">
              <div className="skills-col-header">
                <span className="skills-col-num">02</span>
                <h3 className="skills-col-title">TOOLS & WORKFLOW</h3>
              </div>

              <ul className="skills-list">
                {toolsWorkflow.map((item) => (
                  <li key={item.name} className="skills-item">
                    <span className="skills-item-name">{item.name}</span>
                    <span className="skills-item-desc">{item.desc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Vertical Divider */}
            <div className="skills-col-divider" aria-hidden="true" />

            {/* Column 03 */}
            <div className="skills-col skills-col-beyond">
              <div className="skills-col-header">
                <span className="skills-col-num">03</span>
                <h3 className="skills-col-title">BEYOND TECHNOLOGY</h3>
              </div>

              <p className="skills-beyond-intro">
                Things I'm passionate about and continuously exploring.
              </p>

              <ul className="skills-list">
                {beyondTechnology.map((item) => (
                  <li key={item.name} className="skills-item skills-item-light">
                    <span className="skills-item-name">{item.name}</span>
                    <span className="skills-item-desc">{item.desc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Skills Bottom Closing Treatment */}
        <div className="skills-bottom-editorial">
          <div className="skills-bottom-line" aria-hidden="true" />
          <p className="skills-bottom-statement">
            <span>SAME CURIOSITY.</span>
            <span className="skills-bottom-sep">/</span>
            <span>BIGGER THINGS AHEAD.</span>
          </p>
        </div>
      </div>
    </section>
  );
}

