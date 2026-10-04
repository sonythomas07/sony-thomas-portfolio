import React, { useState, useEffect, useRef, useCallback } from 'react';
import './Projects.css';
import project1Img from '../assets/project_1.png';
import project2Img from '../assets/project_2.png';
import comingSoonImg from '../assets/coming-soon.png';

/* ─── Project data ───────────────────────────────────────────────────────── */
const projectsData = [
  {
    number: '01',
    title: 'PORTFOLIO',
    concept: false,
    description:
      "Sony Thomas's personal developer portfolio showcasing engineering projects, interactive interfaces, and intelligent systems built with modern web technologies.",
    technologies: ['React', 'JavaScript', 'Vite', 'CSS'],
    image: project1Img,
    categoryTag: 'DEVELOPER PORTFOLIO',
    liveDemo: 'https://sonythomas07.github.io/sony-thomas-portfolio/',
    liveLabel: 'VIEW PORTFOLIO',
    github: 'https://github.com/sonythomas07/sony-thomas-portfolio.git',
    githubLabel: 'VIEW SOURCE',
  },
  {
    number: '02',
    title: 'DASHFLOW — SAAS ADMIN DASHBOARD',
    concept: false,
    description:
      'A desktop-focused SaaS admin dashboard designed with a UI/UX-first approach and built using HTML, CSS, and JavaScript. Features analytics, sales, product and customer management, notifications, and light/dark mode.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    image: project2Img,
    categoryTag: 'SAAS ADMIN DASHBOARD',
    liveDemo: 'https://sonythomas07.github.io/dashflow-saas-dashboard/',
    liveLabel: 'VIEW DASHBOARD',
    github: 'https://github.com/sonythomas07/dashflow-saas-dashboard',
    githubLabel: 'VIEW SOURCE',
  },
  {
    number: '03',
    title: 'HITS PROCTORING',
    concept: false,
    description:
      'An AI-powered interview proctoring system for HR environments, combining real-time candidate monitoring, behavioral analysis, and an administrative monitoring dashboard.',
    technologies: ['React', 'FastAPI', 'MySQL', 'YOLO', 'MediaPipe', 'OpenCV'],
    image: comingSoonImg,
    categoryTag: 'AI PROCTORING SYSTEM',
    liveDemo: null,
    github: null,
  },
  {
    number: '04',
    title: 'VISION HIRE',
    concept: true,
    description:
      'An AI-powered video interview and recruitment assessment platform designed to analyze candidate responses, communication skills, and technical aptitude.',
    technologies: ['React', 'Python', 'FastAPI', 'AI/ML'],
    image: comingSoonImg,
    categoryTag: 'AI RECRUITMENT CONCEPT',
    liveDemo: null,
    github: null,
  },
];

/* ─── Desktop Orbit Constants ───────────────────────────────────────────── */
const N                 = projectsData.length;
const ROTATION_SPEED    = 1 / 10;   // full orbit every 10 s (steady & continuous)
const TRANSITION_DUR    = 550;      // ms: single direct card click transition
const PAUSE_DUR         = 10000;    // ms: exactly 10s pause after reaching center
const MOBILE_AUTO_DUR       = 5000;     // ms: mobile 5s auto-transition interval
const MOBILE_TRANSITION_DUR = 1000;     // ms: mobile card transition duration (smooth, slow, natural)

/* ─── Responsive arc parameters (Desktop) ─────────────────────────────────── */
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

/* ─── Desktop Position & Visibility Calculation ─────────────────────────── */
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

/* ─── Shared Card Content Renderer ───────────────────────────────────────── */
function ProjectCardInner({ project, isActive }) {
  return (
    <>
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

        {/* Integrated Action Links */}
        <div
          className="project-card-actions-row"
          onClick={(e) => e.stopPropagation()}
        >
          {project.liveDemo ? (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="project-action-link link-primary"
              onClick={(e) => e.stopPropagation()}
              tabIndex={isActive ? 0 : -1}
              aria-label={`Open ${project.liveLabel || 'live demo'} for ${project.title}`}
            >
              <span>{project.liveLabel || 'LIVE DEMO'}</span>
              <span className="action-arrow" aria-hidden="true">↗</span>
            </a>
          ) : (
            <span
              className="project-action-link link-disabled"
              aria-disabled="true"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
            >
              <span>COMING SOON</span>
            </span>
          )}
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="project-action-link link-secondary"
              onClick={(e) => e.stopPropagation()}
              tabIndex={isActive ? 0 : -1}
              aria-label={`Open ${project.githubLabel || 'source repository'} for ${project.title}`}
            >
              <span>{project.githubLabel || 'VIEW SOURCE'}</span>
              <span className="action-arrow" aria-hidden="true">↗</span>
            </a>
          ) : null}
        </div>
      </div>
    </>
  );
}

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function Projects() {
  /* Screen size detection */
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  );

  /* ── Desktop animation refs & state ── */
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

  const [cardStyles, setCardStyles] = useState(() =>
    computeCardStyles(0, paramsRef.current)
  );

  /* ── Mobile carousel state & refs ── */
  const [mobileIndex, setMobileIndex] = useState(0);
  const [animState, setAnimState] = useState({
    isAnimating: false,
    prevIndex: null,
    direction: 'next',
  });
  const mobileTimerRef  = useRef(null);
  const isTouchingRef   = useRef(false);
  const touchStartRef   = useRef({ x: 0, y: 0, time: 0 });
  const animTimeoutRef  = useRef(null);

  /* ── Mobile navigation handlers ── */
  const goToNextMobile = useCallback(() => {
    setMobileIndex((prev) => {
      const next = (prev + 1) % N;
      setAnimState({
        isAnimating: true,
        prevIndex: prev,
        direction: 'next',
      });
      return next;
    });
  }, []);

  const goToPrevMobile = useCallback(() => {
    setMobileIndex((prev) => {
      const prevIdx = (prev - 1 + N) % N;
      setAnimState({
        isAnimating: true,
        prevIndex: prev,
        direction: 'prev',
      });
      return prevIdx;
    });
  }, []);

  /* ── Mobile Animation Timeout Reset ── */
  useEffect(() => {
    if (animState.isAnimating) {
      if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current);
      animTimeoutRef.current = setTimeout(() => {
        setAnimState((curr) => ({ ...curr, isAnimating: false, prevIndex: null }));
      }, MOBILE_TRANSITION_DUR);
    }
    return () => {
      if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current);
    };
  }, [animState.isAnimating]);

  /* ── Mobile 5-second Auto-Rotation Timer ── */
  const resetMobileTimer = useCallback(() => {
    if (mobileTimerRef.current) {
      clearTimeout(mobileTimerRef.current);
      mobileTimerRef.current = null;
    }
    if (!isMobile || isTouchingRef.current || reducedRef.current) return;

    mobileTimerRef.current = setTimeout(() => {
      goToNextMobile();
    }, MOBILE_AUTO_DUR);
  }, [isMobile, goToNextMobile]);

  useEffect(() => {
    if (isMobile) {
      resetMobileTimer();
    }
    return () => {
      if (mobileTimerRef.current) {
        clearTimeout(mobileTimerRef.current);
        mobileTimerRef.current = null;
      }
    };
  }, [isMobile, mobileIndex, resetMobileTimer]);

  /* ── Mobile Touch Swipe Handlers ── */
  const handleTouchStart = (e) => {
    isTouchingRef.current = true;
    if (mobileTimerRef.current) {
      clearTimeout(mobileTimerRef.current);
      mobileTimerRef.current = null;
    }
    const touch = e.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
    };
  };

  const handleTouchEnd = (e) => {
    isTouchingRef.current = false;
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);
    const duration = Date.now() - touchStartRef.current.time;

    // Minimum 40px horizontal swipe, must dominate vertical movement, within 800ms (or strong distance > 70px)
    const isHorizontalSwipe =
      absDeltaX >= 40 && absDeltaX > absDeltaY * 1.2 && (duration < 800 || absDeltaX > 70);

    if (isHorizontalSwipe) {
      if (deltaX < 0) {
        goToNextMobile();
      } else {
        goToPrevMobile();
      }
    } else {
      resetMobileTimer();
    }
  };

  /* ── Desktop Core animation loop ── */
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
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      paramsRef.current = getArcParams(window.innerWidth);
      if (!mobile) {
        setCardStyles(computeCardStyles(posRef.current, paramsRef.current));
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  /* ── Mount / Unmount animation lifecycle (Desktop) ── */
  useEffect(() => {
    if (reducedRef.current || isMobile) return;
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current)   cancelAnimationFrame(rafRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [tick, isMobile]);

  /* ── Desktop Direct Card Click: smoothly bring specified card to center ── */
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

  /* ── Desktop Directional Side Click: Single Card Next/Previous ── */
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

    // LEFT CLICK  = 1 NEXT Project (+1)
    // RIGHT CLICK = 1 PREVIOUS Project (-1)
    const targetPos = side === 'left' ? baseCenter + 1 : baseCenter - 1;

    transRef.current = {
      startPos:  posRef.current,
      targetPos: targetPos,
      startTime: performance.now(),
      dur:       TRANSITION_DUR,
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

        {/* DESKTOP VIEW: Circular / Orbiting Carousel (100% Unchanged) */}
        <div
          className="projects-orbit-stage reveal reveal-delay-2"
          role="region"
          aria-roledescription="carousel"
          aria-label="Orbiting Projects Showcase"
        >
          {/* Left Click Zone: Next Project */}
          <div
            className="projects-click-zone zone-left"
            onClick={() => handleSideClick('left')}
            aria-label="Next project"
            role="button"
            tabIndex={-1}
          />

          {/* Right Click Zone: Previous Project */}
          <div
            className="projects-click-zone zone-right"
            onClick={() => handleSideClick('right')}
            aria-label="Previous project"
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
                  <ProjectCardInner project={project} isActive={s.isActive} />
                </article>
              );
            })}
          </div>
        </div>

        {/* MOBILE VIEW: Single Active Card with Touch Swipe & 5s Auto-Rotation */}
        <div
          className="mobile-projects-carousel reveal reveal-delay-2"
          role="region"
          aria-roledescription="carousel"
          aria-label="Mobile Projects Carousel"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="mobile-cards-stage">
            {/* If animating, render the exiting card */}
            {animState.isAnimating && animState.prevIndex !== null && (
              <div
                className={`mobile-card-wrapper is-exiting ${
                  animState.direction === 'next'
                    ? 'mobile-slide-out-left'
                    : 'mobile-slide-out-right'
                }`}
                aria-hidden="true"
              >
                <article
                  className="project-orbit-card is-active"
                  tabIndex={-1}
                >
                  <ProjectCardInner
                    project={projectsData[animState.prevIndex]}
                    isActive={false}
                  />
                </article>
              </div>
            )}

            {/* Active / Entering Card */}
            <div
              className={`mobile-card-wrapper is-entering ${
                animState.isAnimating
                  ? animState.direction === 'next'
                    ? 'mobile-slide-in-right'
                    : 'mobile-slide-in-left'
                  : ''
              }`}
            >
              <article
                key={projectsData[mobileIndex].number}
                className="project-orbit-card is-active"
                role="group"
                aria-roledescription="slide"
                aria-label={`Project ${projectsData[mobileIndex].number}: ${projectsData[mobileIndex].title}`}
              >
                <ProjectCardInner
                  project={projectsData[mobileIndex]}
                  isActive={true}
                />
              </article>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
