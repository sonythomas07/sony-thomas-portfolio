import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const lastScrollY = useRef(0);
  const menuBtnRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY || document.documentElement.scrollTop;

      // Section tracking for active links
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = currentScrollY + 150;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          setActiveSection(sectionId);
        }
      });

      // Scroll direction detection
      if (currentScrollY <= 5) {
        setNavVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        setNavVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        setNavVisible(true);
      }

      lastScrollY.current = Math.max(0, currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    const handleClickOutside = (e) => {
      if (
        menuBtnRef.current &&
        !menuBtnRef.current.contains(e.target) &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target)
      ) {
        setMobileMenuOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const toggleMobileMenu = (e) => {
    e.stopPropagation();
    setMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className={`header ${!navVisible ? 'header--hidden' : ''}`}>
      <nav className="navbar container" aria-label="Main navigation">
        {/* Left: Brand Name */}
        <a href="#home" className="nav-brand" aria-label="Sony Thomas Home">
          <span className="brand-first">Sony</span>{' '}
          <span className="brand-last">Thomas</span>
        </a>

        {/* Center: Navigation Links */}
        <ul className="nav-links">
          <li>
            <a href="#home" className={activeSection === 'home' ? 'active' : ''}>
              Home
            </a>
          </li>
          <li>
            <a href="#about" className={activeSection === 'about' ? 'active' : ''}>
              About
            </a>
          </li>
          <li>
            <a href="#skills" className={activeSection === 'skills' ? 'active' : ''}>
              Skills
            </a>
          </li>
          <li>
            <a href="#projects" className={activeSection === 'projects' ? 'active' : ''}>
              Projects
            </a>
          </li>
          <li>
            <a href="#contact" className={activeSection === 'contact' ? 'active' : ''}>
              Contact
            </a>
          </li>
        </ul>

        {/* Right: Let's Talk CTA */}
        <a href="#contact" className="nav-cta-btn">
          <span>Let's Talk</span>
          <span className="nav-cta-arrow" aria-hidden="true">→</span>
        </a>

        {/* Mobile Menu Toggle Button */}
        <button
          className={`menu-btn ${mobileMenuOpen ? 'active' : ''}`}
          id="menuBtn"
          ref={menuBtnRef}
          onClick={toggleMobileMenu}
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobileMenu"
          type="button"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Mobile Menu Dropdown */}
        <div
          className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}
          id="mobileMenu"
          ref={mobileMenuRef}
          aria-hidden={!mobileMenuOpen}
        >
          <a href="#home" onClick={closeMobileMenu} className={activeSection === 'home' ? 'active' : ''}>
            Home
          </a>
          <a href="#about" onClick={closeMobileMenu} className={activeSection === 'about' ? 'active' : ''}>
            About
          </a>
          <a href="#skills" onClick={closeMobileMenu} className={activeSection === 'skills' ? 'active' : ''}>
            Skills
          </a>
          <a href="#projects" onClick={closeMobileMenu} className={activeSection === 'projects' ? 'active' : ''}>
            Projects
          </a>
          <a href="#contact" onClick={closeMobileMenu} className={activeSection === 'contact' ? 'active' : ''}>
            Contact
          </a>
          <a
            href="#contact"
            className="mobile-cta"
            onClick={closeMobileMenu}
          >
            Let's Talk →
          </a>
        </div>
      </nav>
    </header>
  );
}