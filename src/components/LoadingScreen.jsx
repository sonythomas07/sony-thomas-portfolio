import React, { useState, useEffect, useRef } from 'react';
import './LoadingScreen.css';

const CIRCLE_RADIUS = 156;
const CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS; // ~980.18px
const PROGRESS_DURATION = 2600; // 2.6s deliberate progress
const START_DELAY = 150; // starts at 150ms
const HOLD_DURATION = 200; // hold 100% full circle for 200ms
const FADE_DURATION = 1600; // 1.6s slow, cinematic loader fade-out
const DEBLUR_DURATION = 1800; // 1.8s soft Left-to-Right focus sweep (synchronized with fade)

// Keyboard scroll keys to block while loading & transition are active
const SCROLL_KEYS = new Set([
  'Space', 'PageUp', 'PageDown', 'End', 'Home',
  'ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown'
]);

export default function LoadingScreen() {
  const [mounted, setMounted] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [progress, setProgress] = useState(0); // 0.0 to 1.0
  const rafRef = useRef(null);
  const holdTimerRef = useRef(null);
  const fadeTimerRef = useRef(null);
  const deblurTimerRef = useRef(null);
  const isLockedRef = useRef(true);

  useEffect(() => {
    // 1. Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Strict Scroll Prevention Event Handlers
    const preventScrollEvent = (e) => {
      if (isLockedRef.current) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    const handleKeyDown = (e) => {
      if (!isLockedRef.current) return;
      if (
        SCROLL_KEYS.has(e.code) ||
        SCROLL_KEYS.has(e.key) ||
        e.keyCode === 32 ||
        (e.keyCode >= 33 && e.keyCode <= 40)
      ) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    // Attach strict scroll prevention listeners
    window.addEventListener('wheel', preventScrollEvent, { passive: false, capture: true });
    window.addEventListener('touchmove', preventScrollEvent, { passive: false, capture: true });
    window.addEventListener('keydown', handleKeyDown, { capture: true });
    document.addEventListener('wheel', preventScrollEvent, { passive: false, capture: true });
    document.addEventListener('touchmove', preventScrollEvent, { passive: false, capture: true });
    document.addEventListener('keydown', handleKeyDown, { capture: true });

    // Lock CSS overflow and ensure top position
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.body.classList.add('is-loading');
    window.scrollTo(0, 0);

    // Pause Lenis if already initialized
    if (window.__lenis) {
      window.__lenis.stop();
      window.__lenis.scrollTo(0, { immediate: true });
    }

    const unlockScroll = () => {
      isLockedRef.current = false;
      window.removeEventListener('wheel', preventScrollEvent, { capture: true });
      window.removeEventListener('touchmove', preventScrollEvent, { capture: true });
      window.removeEventListener('keydown', handleKeyDown, { capture: true });
      document.removeEventListener('wheel', preventScrollEvent, { capture: true });
      document.removeEventListener('touchmove', preventScrollEvent, { capture: true });
      document.removeEventListener('keydown', handleKeyDown, { capture: true });

      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.classList.remove('is-loading', 'is-hero-deblurring');

      window.scrollTo(0, 0);
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { immediate: true });
        window.__lenis.start();
      }
    };

    if (prefersReducedMotion) {
      unlockScroll();
      setMounted(false);
      return;
    }

    // 2. Synchronized Progress & Arc Animation (0.0 -> 1.0)
    const startTime = performance.now() + START_DELAY;

    const updateProgress = (now) => {
      // Keep Lenis stopped and window at 0,0 during animation
      if (window.__lenis && window.__lenis.isStopped === false) {
        window.__lenis.stop();
      }
      if (window.scrollY !== 0 || window.scrollX !== 0) {
        window.scrollTo(0, 0);
      }

      if (now < startTime) {
        rafRef.current = requestAnimationFrame(updateProgress);
        return;
      }

      const elapsed = now - startTime;
      const rawRatio = Math.min(elapsed / PROGRESS_DURATION, 1);

      // Smooth, natural ease-out progression (deliberate & calm)
      const easedRatio = 1 - Math.pow(1 - rawRatio, 2.2);

      if (rawRatio < 1) {
        setProgress(easedRatio);
        rafRef.current = requestAnimationFrame(updateProgress);
      } else {
        // EXACT 100% COMPLETION: Full 360° circle & 100% text
        setProgress(1);

        // 3. Short 200ms hold at 100% full circle
        holdTimerRef.current = setTimeout(() => {
          // START BOTH AT THE EXACT SAME MOMENT:
          setIsFadingOut(true); // Loader begins 1.6s fade-out
          document.body.classList.remove('is-loading');
          document.body.classList.add('is-hero-deblurring'); // Hero immediately begins 1.8s focus sweep

          // 4. Loader completes its 1.6s fade-out and unmounts
          fadeTimerRef.current = setTimeout(() => {
            setMounted(false);
          }, FADE_DURATION);

          // 5. Scroll unlocks when the 1.8s focus sweep completes
          deblurTimerRef.current = setTimeout(() => {
            unlockScroll(); // Restore normal scrolling and Lenis
          }, DEBLUR_DURATION);
        }, HOLD_DURATION);
      }
    };

    rafRef.current = requestAnimationFrame(updateProgress);

    // 6. Clean up all timers and animation frames on unmount
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
      if (deblurTimerRef.current) clearTimeout(deblurTimerRef.current);
      unlockScroll();
    };
  }, []);

  if (!mounted) {
    return null;
  }

  // Display percentage integer (0 to 100)
  const displayPercent = Math.min(Math.floor(progress * 100), 100);

  // SVG stroke-dashoffset: 0 = complete 360° circle, CIRCUMFERENCE = 0°
  const strokeOffset = CIRCUMFERENCE * (1 - progress);

  return (
    <div
      className={`loading-screen ${isFadingOut ? 'loading-screen--fade-out' : ''}`}
      aria-hidden={isFadingOut ? 'true' : 'false'}
      role="status"
      aria-label="Loading portfolio"
    >
      <div className="loading-container">
        {/* Synchronized Circular Technical Arc */}
        <div className="loading-arc-wrapper" aria-hidden="true">
          <svg className="loading-arc-svg" viewBox="0 0 340 340" fill="none">
            {/* Ambient Background Track Arc */}
            <circle
              cx="170"
              cy="170"
              r={CIRCLE_RADIUS}
              stroke="rgba(255, 255, 255, 0.05)"
              strokeWidth="1"
            />
            {/* Animated Technical Purple Arc (100% synchronized with percentage) */}
            <circle
              className="loading-arc-circle"
              cx="170"
              cy="170"
              r={CIRCLE_RADIUS}
              stroke="url(#purpleArcGradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={strokeOffset}
            />
            {/* Subtle secondary accent ring */}
            <circle
              className="loading-arc-secondary"
              cx="170"
              cy="170"
              r={CIRCLE_RADIUS}
              stroke="rgba(124, 77, 255, 0.25)"
              strokeWidth="1"
              strokeDasharray="24 48"
            />
            <defs>
              <linearGradient id="purpleArcGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#5b8cff" stopOpacity="0.85" />
                <stop offset="60%" stopColor="#7c4dff" stopOpacity="1" />
                <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.8" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Center Content: SONY THOMAS & Synchronized Percentage */}
        <div className="loading-content">
          <h1 className="loading-brand-title">
            SONY THOMAS
          </h1>

          <div className="loading-percentage" aria-hidden="true">
            <span className="loading-percent-number">{displayPercent}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
