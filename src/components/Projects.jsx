import React, { useState, useEffect, useRef, useCallback } from 'react';
import './Projects.css';
import project1Img from '../assets/project_1.png';
import workImg from '../assets/work.png';

const projectsData = [
  {
    id: 1,
    title: 'DashFlow: SaaS Admin Dashboard',
    description:
      'A desktop-focused SaaS admin dashboard built with HTML, CSS, and JavaScript, featuring analytics, sales, product and customer management, notifications, and dark/light mode.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    image: project1Img,
    alt: 'DashFlow Dashboard',
    liveLink: 'https://sonythomas07.github.io/dashflow-saas-dashboard/',
    githubLink: 'https://github.com/sonythomas07/dashflow-saas-dashboard',
  },
  {
    id: 2,
    title: 'Project in Progress',
    description:
      "I'm currently planning and developing new web applications and full-stack software. This project will be added soon.",
    tags: ['React', 'JavaScript', 'CSS'],
    image: workImg,
    alt: 'Project in Progress',
    liveLink: '#projects',
    githubLink: '#projects',
  },
  {
    id: 3,
    title: 'Project in Progress',
    description:
      "I'm currently planning and developing new web applications and full-stack software. This project will be added soon.",
    tags: ['Full-Stack', 'Web App', 'API'],
    image: workImg,
    alt: 'Project in Progress',
    liveLink: '#projects',
    githubLink: '#projects',
  },
  {
    id: 4,
    title: 'Project in Progress',
    description:
      "I'm currently planning and developing new web applications and full-stack software. This project will be added soon.",
    tags: ['React', 'Node.js', 'Database'],
    image: workImg,
    alt: 'Project in Progress',
    liveLink: '#projects',
    githubLink: '#projects',
  },
];

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const trackRef = useRef(null);
  const viewportRef = useRef(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const currentTranslateRef = useRef(0);
  const autoplayTimerRef = useRef(null);

  // Update cards per view on resize
  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth < 768) {
        setCardsPerView(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };

    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

  const totalCards = projectsData.length;
  const maxIndex = Math.max(0, totalCards - cardsPerView);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Autoplay
  const startAutoplay = useCallback(() => {
    stopAutoplay();
    autoplayTimerRef.current = setInterval(() => {
      nextSlide();
    }, 3500);
  }, [nextSlide]);

  const stopAutoplay = useCallback(() => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [startAutoplay, stopAutoplay]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Visibility change handling
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        stopAutoplay();
      } else {
        startAutoplay();
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [startAutoplay, stopAutoplay]);

  // Drag / Swipe handling
  const handleDragStart = (e) => {
    isDraggingRef.current = true;
    stopAutoplay();
    startXRef.current = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    setIsTransitioning(false);
  };

  const handleDragMove = (e) => {
    if (!isDraggingRef.current) return;
    const currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    const diff = currentX - startXRef.current;
    if (trackRef.current) {
      const card = trackRef.current.querySelector('.project-card');
      const gap = 24;
      const cardWidth = card ? card.offsetWidth + gap : 300;
      const baseTranslate = -(currentIndex * cardWidth);
      currentTranslateRef.current = baseTranslate + diff;
      trackRef.current.style.transform = `translateX(${currentTranslateRef.current}px)`;
    }
  };

  const handleDragEnd = (e) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsTransitioning(true);

    const endX = e.type.includes('mouse') ? e.pageX : (e.changedTouches ? e.changedTouches[0].clientX : startXRef.current);
    const moved = endX - startXRef.current;

    if (moved < -60) {
      nextSlide();
    } else if (moved > 60) {
      prevSlide();
    } else {
      if (trackRef.current) {
        const card = trackRef.current.querySelector('.project-card');
        const gap = 24;
        const cardWidth = card ? card.offsetWidth + gap : 300;
        trackRef.current.style.transform = `translateX(${-(currentIndex * cardWidth)}px)`;
      }
    }
    startAutoplay();
  };

  // Compute transform based on index
  const getTransform = () => {
    if (!trackRef.current) return `translateX(0px)`;
    const card = trackRef.current.querySelector('.project-card');
    const gap = window.innerWidth < 768 ? 16 : 24;
    const cardWidth = card ? card.offsetWidth + gap : 0;
    return `translateX(${-(currentIndex * cardWidth)}px)`;
  };

  return (
    <section className="projects section" id="projects">
      <div className="container">
        <div className="section-heading">
          <span className="section-number">03.</span>
          <h2>Featured Work</h2>
        </div>

        <div
          className="projects-slider"
          onMouseEnter={stopAutoplay}
          onMouseLeave={startAutoplay}
        >
          <button
            className="slider-btn prev-btn"
            onClick={prevSlide}
            aria-label="Previous Project"
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>

          <div
            className="projects-viewport"
            ref={viewportRef}
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
          >
            <div
              className="projects-track"
              ref={trackRef}
              style={{
                transform: getTransform(),
                transition: isTransitioning
                  ? 'transform 0.45s ease'
                  : 'none',
              }}
            >
              {projectsData.map((project) => (
                <article className="project-card" key={project.id}>
                  <div className="project-image">
                    <img
                      src={project.image}
                      alt={project.alt}
                      draggable="false"
                    />
                  </div>

                  <div className="project-content">
                    <h3>{project.title}</h3>

                    <p>{project.description}</p>

                    <div className="project-tags">
                      {project.tags.map((tag, tIdx) => (
                        <span key={tIdx}>{tag}</span>
                      ))}
                    </div>

                    <div className="project-links">
                      <a
                        href={project.liveLink}
                        target={project.liveLink.startsWith('http') ? '_blank' : '_self'}
                        rel={project.liveLink.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        <i className="fa-solid fa-arrow-up-right-from-square"></i>
                        Live Demo
                      </a>

                      <a
                        href={project.githubLink.startsWith('http') ? project.githubLink : `#${project.githubLink}`}
                        target={project.githubLink.startsWith('http') ? '_blank' : '_self'}
                        rel={project.githubLink.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        <i className="fa-brands fa-github"></i>
                        GitHub
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <button
            className="slider-btn next-btn"
            onClick={nextSlide}
            aria-label="Next Project"
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>

        {/* Dots */}
        <div className="slider-dots">
          {Array.from({ length: totalCards }).map((_, dotIdx) => (
            <button
              key={dotIdx}
              className={`dot ${dotIdx === (currentIndex % totalCards) ? 'active' : ''}`}
              onClick={() => setCurrentIndex(Math.min(dotIdx, maxIndex))}
              aria-label={`Go to slide ${dotIdx + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
}
