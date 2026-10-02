import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

/**
 * Custom hook to initialize Lenis smooth scrolling.
 * - Provides natural, continuous, slightly inertial wheel and trackpad scrolling
 * - Preserves native touch scrolling on mobile devices
 * - Respects prefers-reduced-motion
 * - Handles anchor navigation with exact 0px offset
 * - Single RAF loop with clean lifecycle management
 */
export default function useLenisScroll() {
  useEffect(() => {
    // 1. Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // 2. Configure Lenis with responsive, natural settings
    const lenis = new Lenis({
      duration: 1.0, // Responsive, natural duration
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential ease-out
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      syncTouch: false, // 100% native touch scrolling on mobile
      touchMultiplier: 1.0,
      infinite: false,
    });

    window.__lenis = lenis;

    // 3. Single requestAnimationFrame loop
    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // 4. Smooth anchor navigation with exact 0 offset
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        lenis.scrollTo(target, {
          offset: 0,
          duration: 1.1,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      }
    };

    document.addEventListener('click', handleAnchorClick);

    // 5. Cleanup on unmount
    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('click', handleAnchorClick);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);
}
