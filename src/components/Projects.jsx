import React from 'react';
import './Projects.css';
import project1Img from '../assets/project_1.png';

const projectsList = [
  {
    number: '01',
    title: 'HITS PROCTORING',
    concept: false,
    description:
      'An AI-powered interview proctoring system for HR environments, combining real-time candidate monitoring, behavioral analysis, and an administrative monitoring dashboard.',
    technologies: ['React', 'FastAPI', 'MySQL', 'YOLO', 'MediaPipe', 'OpenCV'],
    image: project1Img,
    alt: 'HITS Proctoring Platform Preview',
    link: null,
  },
  {
    number: '02',
    title: 'DO IT LATER',
    concept: false,
    description:
      'A productivity and task management platform designed to help users organize tasks, postpone them intelligently, and stay focused on what matters.',
    technologies: ['React', 'Vite', 'Recharts'],
    image: null,
    placeholderCategory: 'PRODUCTIVITY / TASK PLATFORM',
    alt: 'Do It Later Platform Preview',
    link: null,
  },
  {
    number: '03',
    title: 'RESTAURANT FOOD RECOMMENDATION',
    concept: false,
    description:
      'A recommendation system designed to suggest restaurants and dishes based on user preferences, cuisine, and available recommendation data.',
    technologies: ['Python', 'Machine Learning', 'Pandas', 'Scikit-learn'],
    image: null,
    placeholderCategory: 'RECOMMENDATION SYSTEM',
    alt: 'Restaurant Food Recommendation Preview',
    link: null,
  },
  {
    number: '04',
    title: 'TRAVEL AGENT',
    concept: true,
    description:
      'A travel planning concept focused on helping users discover destinations, explore travel options, and plan personalized trips.',
    technologies: ['React', 'UI/UX Design'],
    image: null,
    placeholderCategory: 'TRAVEL PLATFORM CONCEPT',
    alt: 'Travel Agent Concept Preview',
    link: null,
  },
];

export default function Projects() {
  return (
    <section className="projects section" id="projects">
      <div className="container projects-container">
        {/* Main Editorial Grid */}
        <div className="projects-editorial-grid">
          {/* Left Intro Column */}
          <div className="projects-left-col">
            <div className="projects-section-label">
              <span className="projects-num">04.</span>
              <span className="projects-label-text">PROJECTS</span>
            </div>

            <h2 className="projects-main-headline">
              <span className="projects-headline-line headline-light">SELECTED</span>
              <span className="projects-headline-line headline-accent">WORK.</span>
            </h2>

            <p className="projects-supporting-text">
              A collection of projects that reflect my interests, skills, and the kind of impact I want to create.
            </p>

            <div className="projects-accent-line" aria-hidden="true" />

            <p className="projects-statement">
              REAL PROBLEMS.
              <br />
              PRACTICAL SOLUTIONS.
            </p>
          </div>

          {/* Right Column: Structured Editorial Project List */}
          <div className="projects-right-col">
            <div className="projects-list">
              {projectsList.map((project) => (
                <article className="project-row" key={project.number}>
                  {/* Project Number */}
                  <div className="project-row-num">
                    <span>{project.number}</span>
                  </div>

                  {/* Project Preview */}
                  <div className="project-row-preview">
                    {project.image ? (
                      <div className="project-preview-img-wrapper">
                        <img
                          src={project.image}
                          alt={project.alt}
                          className="project-preview-img"
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <div className="project-preview-placeholder" aria-label={project.alt}>
                        <span className="placeholder-text">{project.placeholderCategory}</span>
                      </div>
                    )}
                  </div>

                  {/* Project Information */}
                  <div className="project-row-info">
                    <div className="project-title-wrap">
                      <h3 className="project-row-title">{project.title}</h3>
                      {project.concept && (
                        <span className="project-concept-tag">CONCEPT</span>
                      )}
                    </div>

                    <p className="project-row-desc">{project.description}</p>

                    <div className="project-row-tech">
                      {project.technologies.map((tech, idx) => (
                        <React.Fragment key={tech}>
                          <span className="tech-item">{tech}</span>
                          {idx < project.technologies.length - 1 && (
                            <span className="tech-sep">·</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  {/* View Project Action */}
                  <div className="project-row-action">
                    {project.link ? (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="view-project-link"
                      >
                        <span className="view-project-text">
                          VIEW
                          <br />
                          PROJECT
                        </span>
                        <svg
                          className="view-project-arrow"
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
                    ) : (
                      <div className="view-project-link view-project-pending" aria-label="Project details view">
                        <span className="view-project-text">
                          VIEW
                          <br />
                          PROJECT
                        </span>
                        <svg
                          className="view-project-arrow"
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
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* Section Editorial Footer */}
        <div className="projects-bottom-editorial">
          <span className="projects-bottom-left">IDEAS TO PRODUCTS.</span>
          <div className="projects-bottom-line" aria-hidden="true" />
          <span className="projects-bottom-right">BUILDING A BETTER TOMORROW.</span>
        </div>
      </div>
    </section>
  );
}
