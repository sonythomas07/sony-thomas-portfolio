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
        // At top of page: always visible
        setNavVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        // Scrolling DOWN: hide navbar
        setNavVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        // Scrolling UP: show navbar
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

    document.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClickOutside);
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
      <nav className="navbar container">
        <a href="#home" className="logo">
          Sony<span>.</span>
        </a>

        <ul className="nav-links">
          <li>
            <a
              href="#home"
              className={activeSection === 'home' ? 'active' : ''}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#about"
              className={activeSection === 'about' ? 'active' : ''}
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#skills"
              className={activeSection === 'skills' ? 'active' : ''}
            >
              Skills
            </a>
          </li>
          <li>
            <a
              href="#projects"
              className={activeSection === 'projects' ? 'active' : ''}
            >
              Projects
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className={activeSection === 'contact' ? 'active' : ''}
            >
              Contact
            </a>
          </li>
        </ul>

        <a
          href="/Sony_Thomas_Resume.pdf"
          className="resume-btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          Resume
        </a>

        <div
          className={`menu-btn ${mobileMenuOpen ? 'active' : ''}`}
          id="menuBtn"
          ref={menuBtnRef}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          role="button"
          tabIndex={0}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div
          className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}
          id="mobileMenu"
          ref={mobileMenuRef}
        >
          <a href="#home" onClick={closeMobileMenu}>
            Home
          </a>
          <a href="#about" onClick={closeMobileMenu}>
            About
          </a>
          <a href="#skills" onClick={closeMobileMenu}>
            Skills
          </a>
          <a href="#projects" onClick={closeMobileMenu}>
            Projects
          </a>
          <a href="#contact" onClick={closeMobileMenu}>
            Contact
          </a>
          <a
            href="/Sony_Thomas_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-resume"
            onClick={closeMobileMenu}
          >
            Resume
          </a>
        </div>
      </nav>
    </header>
  );
}

