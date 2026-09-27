import React, { useState, useEffect, useRef, useCallback } from 'react';
import './Projects.css';
import project1Img from '../assets/project_1.png';

/* ─── Project data ───────────────────────────────────────────────────────── */
const projectsData = [
  {
    number: '01',
    title: 'HITS PROCTORING',
    concept: false,
    description:
      'An AI-powered interview proctoring system for HR environments, combining real-time candidate monitoring, behavioral analysis, and an administrative monitoring dashboard.',
    technologies: ['React', 'FastAPI', 'MySQL', 'YOLO', 'MediaPipe', 'OpenCV'],
    image: project1Img,
    categoryTag: 'AI PROCTORING SYSTEM',
    liveDemo: 'https://hits-proctoring.vercel.app',
    github: 'https://github.com/sonythomas07/hits-proctoring',
  },
  {
    number: '02',
    title: 'DO IT LATER',
    concept: false,
    description:
      'A productivity and task management platform designed to help users organize tasks, postpone them intelligently, and stay focused on what matters.',
    technologies: ['React', 'Vite', 'Recharts'],
    image: null,
    categoryTag: 'PRODUCTIVITY / TASK PLATFORM',
    liveDemo: 'https://do-it-later.vercel.app',
    github: 'https://github.com/sonythomas07/do-it-later',
  },
  {
    number: '03',
    title: 'RESTAURANT FOOD RECOMMENDATION',
    concept: false,
    description:
      'A recommendation system designed to suggest restaurants and dishes based on user preferences, cuisine, and available recommendation data.',
    technologies: ['Python', 'Machine Learning', 'Pandas', 'Scikit-learn'],
    image: null,
    categoryTag: 'RECOMMENDATION SYSTEM',
    liveDemo: 'https://restaurant-food-recommendation.vercel.app',
    github: 'https://github.com/sonythomas07/restaurant-recommendation-system',
  },
  {
    number: '04',
    title: 'TRAVEL AGENT',
    concept: true,
    description:
      'A travel planning concept focused on helping users discover destinations, explore travel options, and plan personalized trips.',
    technologies: ['React', 'UI/UX Design'],
    image: null,
    categoryTag: 'TRAVEL PLANNING CONCEPT',
    liveDemo: 'https://travel-agent-concept.vercel.app',
    github: 'https://github.com/sonythomas07/travel-agent-concept',
  },
];

/* ─── Constants ─────────────────────────────────────────────────────────── */
const N                 = projectsData.length;
const ROTATION_SPEED    = 1 / 10;   // full orbit every 10 s (steady & continuous)
const TRANSITION_DUR    = 550;      // ms: single direct card click transition
const FAST_SPIN_DUR     = 1450;     // ms: brisk, quick spin for full loop + 1 card
const PAUSE_DUR         = 10000;    // ms: exactly 10s pause after reaching center

/* ─── Responsive arc parameters ─────────────────────────────────────────── */
function getArcParams(vw) {
  if (vw <= 768) {
    return { rx: 0, rz: 0, ryMax: 0 };
  }
  if (vw <= 1094) {
    return { rx: 270, rz: 140, ryMax: 14 };
  }
  if (vw <= 1280) {
    return { rx: 320, rz: 160, ryMax: 16 };
  }
  return { rx: 370, rz: 180, ryMax: 18 };
}

/* ─── Position & Visibility Calculation ─────────────────────────────────── */
function computeCardStyles(pos, params) {
  const { rx, rz, ryMax } = params;

  return projectsData.map((_, i) => {
    const raw   = (((pos - i) % N) + N) % N;
    const angle = (raw / N) * 2 * Math.PI;

    // Horizontal (tx) and depth (tz) positioning along the ellipse
    const tx = rx * Math.sin(angle);
    const tz = rz * (Math.cos(angle) - 1);

    // depth: 1.0 at front center, 0.5 at sides, 0.0 at back
    const depth = (1 + Math.cos(angle)) / 2;
    const ty = -24 * (1 - depth);

    // Perspective rotation angling side cards gently toward center
    const rotY = -ryMax * Math.sin(angle);

    // Visibility & Opacity:
    let opacity = 0;
    let isVisible = false;

    if (depth > 0.28) {
      isVisible = true;
      if (depth >= 0.5) {
        opacity = 0.65 + ((depth - 0.5) / 0.5) * 0.35;
      } else {
        opacity = ((depth - 0.28) / 0.22) * 0.65;
      }
    }

    const scale  = 0.68 + 0.32 * depth;
    const blur   = isVisible ? 0.8 * (1 - depth) : 0;
    const zIndex = Math.round(2 + 8 * depth);

    return {
      tx,
      ty,
      tz,
      rotY,
      scale,
      opacity: Math.max(0, Math.min(1, opacity)),
      isVisible,
      blur,
      zIndex,
      isActive: raw < 0.25 || raw > N - 0.25,
    };
  });
}

/* ─── Easing ─────────────────────────────────────────────────────────────── */
function lerp(a, b, t) {
  return a + (b - a) * t;
}

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function Projects() {
  /* Mutable animation refs */
  const posRef     = useRef(0);
  const modeRef    = useRef('rotating');  // 'rotating' | 'transitioning' | 'paused'
  const rafRef     = useRef(null);
  const timerRef   = useRef(null);
  const transRef   = useRef(null);        // { startPos, targetPos, startTime, dur }
  const lastTRef   = useRef(null);
  const paramsRef  = useRef(getArcParams(typeof window !== 'undefined' ? window.innerWidth : 1440));
  const reducedRef = useRef(
    typeof window !== 'undefined'
      ? (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false)
      : false
  );

  /* Render state */
  const [cardStyles, setCardStyles] = useState(() =>
    computeCardStyles(0, paramsRef.current)
  );

  /* ── Core animation loop ── */
  const tick = useCallback((timestamp) => {
    if (lastTRef.current === null) lastTRef.current = timestamp;
    const dt = Math.min((timestamp - lastTRef.current) / 1000, 0.1);
    lastTRef.current = timestamp;

    if (modeRef.current === 'rotating') {
      posRef.current += ROTATION_SPEED * dt;
      setCardStyles(computeCardStyles(posRef.current, paramsRef.current));
      rafRef.current = requestAnimationFrame(tick);

    } else if (modeRef.current === 'transitioning') {
      const { startPos, targetPos, startTime, dur } = transRef.current;
      const t = Math.min((timestamp - startTime) / dur, 1);
      posRef.current = lerp(startPos, targetPos, easeInOutCubic(t));
      setCardStyles(computeCardStyles(posRef.current, paramsRef.current));

      if (t >= 1) {
        /* Reached target center position: lock position and start 10s pause */
        posRef.current   = targetPos;
        modeRef.current  = 'paused';
        rafRef.current   = null;

        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
          if (modeRef.current === 'paused') {
            modeRef.current  = 'rotating';
            lastTRef.current = null;
            rafRef.current   = requestAnimationFrame(tick);
          }
        }, PAUSE_DUR);
      } else {
        rafRef.current = requestAnimationFrame(tick);
      }
    }
  }, []);

  /* ── Responsive window resize ── */
  useEffect(() => {
    const onResize = () => {
      paramsRef.current = getArcParams(window.innerWidth);
      setCardStyles(computeCardStyles(posRef.current, paramsRef.current));
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  /* ── Mount / Unmount animation lifecycle ── */
  useEffect(() => {
    if (reducedRef.current) return;
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current)   cancelAnimationFrame(rafRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [tick]);

  /* ── Direct Card Click: smoothly bring specified card to center ── */
  const handleCardClick = useCallback((clickedIndex) => {
    if (reducedRef.current) return;

    const raw = (((posRef.current - clickedIndex) % N) + N) % N;
    if (raw < 0.25 || raw > N - 0.25) return;  // already center

    const angle = (raw / N) * 2 * Math.PI;
    const depth = (1 + Math.cos(angle)) / 2;
    if (depth <= 0.28) return; // rear card cannot be clicked

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    const steps = ((clickedIndex - posRef.current) % N + N) % N;
    if (steps < 0.01) return;

    transRef.current = {
      startPos:  posRef.current,
      targetPos: posRef.current + steps,
      startTime: performance.now(),
      dur:       TRANSITION_DUR,
    };
    modeRef.current  = 'transitioning';
    lastTRef.current = null;
    rafRef.current   = requestAnimationFrame(tick);
  }, [tick]);

  /* ── Directional Side Click: Fast Spin (1 Full Loop + 1 Next/Previous Project) ── */
  const handleSideClick = useCallback((side) => {
    if (reducedRef.current) return;

    // Cancel any active animation frame and active pause timer
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    // Determine currently centered project position
    const baseCenter = Math.round(posRef.current);

    // RIGHT CLICK = 1 Full Forward Loop (N) + 1 NEXT Project (+1) = baseCenter + (N + 1)
    // LEFT CLICK  = 1 Full Reverse Loop (-N) + 1 PREVIOUS Project (-1) = baseCenter - (N + 1)
    const targetPos = side === 'right' ? baseCenter + (N + 1) : baseCenter - (N + 1);

    transRef.current = {
      startPos:  posRef.current,
      targetPos: targetPos,
      startTime: performance.now(),
      dur:       FAST_SPIN_DUR,
    };
    modeRef.current  = 'transitioning';
    lastTRef.current = null;
    rafRef.current   = requestAnimationFrame(tick);
  }, [tick]);

  /* ── Render ── */
  return (
    <section className="projects section" id="projects" aria-label="Projects showcase">
      <div className="projects-bg-glow" aria-hidden="true" />
      <div className="container projects-container">

        <div className="projects-top-bar reveal">
          <div className="projects-section-label">
            <span className="projects-num">04.</span>
            <span className="projects-title">PROJECTS</span>
          </div>
          <div className="projects-micro-text" aria-hidden="true">
            <span>Engineering</span>
            <span className="projects-micro-dot">•</span>
            <span>Interfaces</span>
            <span className="projects-micro-dot">•</span>
            <span>Intelligence</span>
          </div>
        </div>

        <div className="projects-heading-wrap reveal reveal-delay-1">
          <h2 className="projects-main-headline">
            <span className="headline-line headline-light">SOME OF MY</span>
            <span className="headline-line headline-accent">
              <span className="headline-purple-gradient">RECENT WORK.</span>
            </span>
          </h2>
          <p className="projects-intro-desc">
            A collection of projects that reflect my interests, skills, and the kind of impact I want to create.
          </p>
        </div>

        <div
          className="projects-orbit-stage reveal reveal-delay-2"
          role="region"
          aria-roledescription="carousel"
          aria-label="Orbiting Projects Showcase"
        >
          {/* Invisible Left Click Zone: Fast Reverse Loop + Previous Project */}
          <div
            className="projects-click-zone zone-left"
            onClick={() => handleSideClick('left')}
            aria-label="Spin reverse to previous project"
            role="button"
            tabIndex={-1}
          />

          {/* Invisible Right Click Zone: Fast Forward Loop + Next Project */}
          <div
            className="projects-click-zone zone-right"
            onClick={() => handleSideClick('right')}
            aria-label="Spin forward to next project"
            role="button"
            tabIndex={-1}
          />

          <div className="projects-orbit-cards-container">
            {cardStyles.map((s, index) => {
              const project = projectsData[index];
              const xform = `translate3d(${s.tx.toFixed(1)}px, ${s.ty.toFixed(1)}px, ${s.tz.toFixed(1)}px) rotateY(${s.rotY.toFixed(2)}deg) scale(${s.scale.toFixed(3)})`;
              const filt  = s.blur > 0.05 ? `blur(${s.blur.toFixed(2)}px)` : 'none';

              return (
                <article
                  key={project.number}
                  className={`project-orbit-card ${s.isActive ? 'is-active' : 'is-surrounding'}`}
                  style={{
                    transform: xform,
                    opacity: s.opacity,
                    filter: filt,
                    zIndex: s.zIndex,
                    visibility: s.isVisible ? 'visible' : 'hidden',
                    pointerEvents: s.isVisible ? 'auto' : 'none',
                  }}
                  onClick={() => s.isVisible && handleCardClick(index)}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`Project ${project.number}: ${project.title}`}
                  aria-hidden={!s.isActive}
                >
                  <div className="project-card-preview">
                    {project.image ? (
                      <div className="project-preview-media">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="project-preview-img"
                          loading="lazy"
                        />
                        <div className="preview-overlay-gradient" aria-hidden="true" />
                      </div>
                    ) : (
                      <div className="project-preview-clean-placeholder">
                        <div className="placeholder-top-bar">
                          <span className="placeholder-tech-badge">{project.categoryTag}</span>
                          <span className="placeholder-num-watermark">{project.number}</span>
                        </div>
                        <div className="placeholder-center-info">
                          <h4 className="placeholder-project-name">{project.title}</h4>
                          {project.concept && (
                            <span className="placeholder-concept-pill">CONCEPT</span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="project-card-content">
                    <div className="project-card-header">
                      <span className="project-card-num">{project.number}</span>
                      <div className="project-card-title-row">
                        <h3 className="project-card-title">{project.title}</h3>
                        {project.concept && (
                          <span className="project-concept-badge">CONCEPT</span>
                        )}
                      </div>
                    </div>
                    <p className="project-card-desc">{project.description}</p>
                    <div className="project-card-tags" aria-label="Technologies used">
                      {project.technologies.map((tech) => (
                        <span className="project-tech-pill" key={tech}>{tech}</span>
                      ))}
                    </div>

                    {/* Integrated Action Links - Unconditionally rendered on every project card */}
                    <div className="project-card-actions-row">
                      <a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-action-link link-primary"
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`Open live demo for ${project.title}`}
                      >
                        <span>LIVE DEMO</span>
                        <span className="action-arrow" aria-hidden="true">↗</span>
                      </a>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-action-link link-secondary"
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`Open GitHub repository for ${project.title}`}
                      >
                        <span>GITHUB REPO</span>
                        <span className="action-arrow" aria-hidden="true">↗</span>
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
