import { useEffect } from 'react';

/**
 * Custom hook to initialize IntersectionObserver for subtle scroll-in and scroll-out animations.
 * - Enters from bottom: opacity 0 -> 1, translateY(24px -> 0)
 * - Exits through top: opacity 1 -> 0, translateY(0 -> -24px)
 * - Re-enters when scrolling back up: returns naturally to visible state
 */
export default function useScrollReveal() {
  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      document.querySelectorAll('.reveal, .hero-reveal').forEach((el) => {
        el.classList.add('is-in-view');
        el.classList.remove('is-scrolled-out');
      });
      return;
    }

    const elements = document.querySelectorAll('.reveal, .hero-reveal');
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target;
          const isHero = target.classList.contains('hero-reveal');

          if (entry.isIntersecting) {
            // In viewport: smoothly transition to active visible state
            target.classList.add('is-in-view');
            target.classList.remove('is-scrolled-out');
          } else {
            // Outside viewport:
            if (entry.boundingClientRect.top < 0) {
              // Element has scrolled past the top of the viewport
              target.classList.add('is-scrolled-out');
              target.classList.remove('is-in-view');
            } else {
              // Element is below the bottom of the viewport
              target.classList.remove('is-scrolled-out');
              if (!isHero) {
                target.classList.remove('is-in-view');
              }
            }
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: '-20px 0px -20px 0px',
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);
}
