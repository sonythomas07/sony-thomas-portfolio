import React, { useState } from 'react';
import skillImg from '../assets/skill.png';
import './Skills.css';

// Technology Icons (Real, recognizable vector SVGs)
const icons = {
  // Frontend
  react: (
    <svg viewBox="-11.5 -10.232 23 20.463" className="tech-icon-svg" aria-hidden="true">
      <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
      <g stroke="#61DAFB" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  ),
  javascript: (
    <svg viewBox="0 0 24 24" className="tech-icon-svg" aria-hidden="true">
      <rect width="24" height="24" rx="4" fill="#F7DF1E" />
      <path fill="#000000" d="M6.5 18.2l1.6-.9c.4.7.7 1.2 1.5 1.2.8 0 1.2-.3 1.2-1.1v-6.6h1.9v6.6c0 1.9-1.1 2.8-2.9 2.8-1.6 0-2.6-.8-3.3-2M15.4 18.4l1.6-1c.5.8 1.1 1.4 2.2 1.4 1 0 1.6-.5 1.6-1.2 0-.8-.6-1.1-1.7-1.6l-.6-.3c-1.7-.7-2.8-1.6-2.8-3.6 0-1.8 1.4-3.2 3.5-3.2 1.5 0 2.6.5 3.4 2l-1.5 1c-.4-.7-.9-1.1-1.8-1.1-.8 0-1.4.5-1.4 1.1 0 .7.5 1 1.5 1.4l.6.3c2 .9 3 1.8 3 3.8 0 2.2-1.7 3.4-3.8 3.4-2.1 0-3.3-1.1-4-2.4" />
    </svg>
  ),
  html5: (
    <svg viewBox="0 0 24 24" className="tech-icon-svg" aria-hidden="true">
      <path fill="#E34F26" d="M1.5 0h21l-1.9 21.3L12 24l-8.6-2.7z" />
      <path fill="#EF652A" d="M12 22.1l7-1.9 1.6-18.2H12z" />
      <path fill="#FFFFFF" d="M12 9.5H8.2l-.3-3.2H12V3.1H4.8l.8 9.5H12zm0 6.6l-3.9-1.1-.3-2.9H4.7l.5 5.5L12 20.3z" />
      <path fill="#EBEBEB" d="M12 9.5h3.9l-.4 4.3-3.5 1v3.2l6.8-1.9.9-9.7H12zm0-6.4v3.2h7l.3-3.2z" />
    </svg>
  ),
  css3: (
    <svg viewBox="0 0 24 24" className="tech-icon-svg" aria-hidden="true">
      <path fill="#1572B6" d="M1.5 0h21l-1.9 21.3L12 24l-8.6-2.7z" />
      <path fill="#33A9DC" d="M12 22.1l7-1.9 1.6-18.2H12z" />
      <path fill="#FFFFFF" d="M12 9.5H8.2l-.3-3.2H12V3.1H4.8l.8 9.5H12zm0 6.6l-3.9-1.1-.3-2.9H4.7l.5 5.5L12 20.3z" />
      <path fill="#EBEBEB" d="M12 9.5h3.9l-.4 4.3-3.5 1v3.2l6.8-1.9.9-9.7H12zm0-6.4v3.2h7l.3-3.2z" />
    </svg>
  ),
  vite: (
    <svg viewBox="0 0 24 24" className="tech-icon-svg" aria-hidden="true">
      <defs>
        <linearGradient id="viteSlabGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#41D1FF" />
          <stop offset="100%" stopColor="#BD34FE" />
        </linearGradient>
      </defs>
      <path fill="url(#viteSlabGrad)" d="M23.6.8L12.7 20.4c-.3.5-.9.5-1.2 0L.4.8C.1.3.5-.3 1-.2l11 1.7L23-.2c.5-.1.9.5.6 1z" />
      <path fill="#FFD62E" d="M14.6 2l-6.7 1.1c-.4.1-.7.4-.6.8l.8 5.7c.1.4.5.7.9.6l2.3-.4-3.3 6.9c-.2.4.2.8.6.6l9.6-6c.4-.3.4-.9 0-1.1l-3.4-1.7 1.4-5.2c.1-.4-.2-.8-.6-.7z" />
    </svg>
  ),
  recharts: (
    <svg viewBox="0 0 24 24" className="tech-icon-svg" fill="none" aria-hidden="true">
      <rect x="3" y="13" width="4" height="8" rx="1.5" fill="#22C55E" />
      <rect x="10" y="8" width="4" height="13" rx="1.5" fill="#3B82F6" />
      <rect x="17" y="3" width="4" height="18" rx="1.5" fill="#A855F7" />
      <path d="M4 12l7-5 7-4 3 2.5" stroke="#C084FC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),

  // Backend
  python: (
    <svg viewBox="0 0 24 24" className="tech-icon-svg" aria-hidden="true">
      <path fill="#3776AB" d="M11.9 0c-3.1 0-5 .3-5 1.5v2.8h5.1v.8H4.4C1.9 5.1 0 7.2 0 10.3c0 2.7 1.5 4.8 4 5.2v-2.5c0-1.6 1.4-3 3-3h5.1c1.5 0 2.6-1.2 2.6-2.7V2.2C14.7.7 13.5 0 11.9 0zm-1.4 1.5c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9z" />
      <path fill="#FFD43B" d="M12.1 24c3.1 0 5-.3 5-1.5v-2.8H12v-.8h7.6c2.5 0 4.4-2.1 4.4-5.2 0-2.7-1.5-4.8-4-5.2v2.5c0 1.6-1.4 3-3 3H12c-1.5 0-2.6 1.2-2.6 2.7v5.1c0 1.5 1.2 2.2 2.7 2.2zm1.4-1.5c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9z" />
    </svg>
  ),
  fastapi: (
    <svg viewBox="0 0 24 24" className="tech-icon-svg" aria-hidden="true">
      <path fill="#05998B" d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm-.7 18.7l-4.5-8.2h3.7V5.3l4.5 8.2h-3.7v5.2z" />
    </svg>
  ),
  sqlalchemy: (
    <svg viewBox="0 0 24 24" className="tech-icon-svg" aria-hidden="true">
      <path fill="#D71E00" d="M12 1.5L2 7.2v11.6L12 24.5l10-5.7V7.2L12 1.5zm0 3.2l7.2 4.1-7.2 4.1-7.2-4.1L12 4.7zm-8 5.4l7 4v7.7l-7-4V10.1zm9 11.7V14.1l7-4v7.7l-7 4z" />
      <circle cx="12" cy="12.8" r="2" fill="#FFA500" />
    </svg>
  ),
  mysql: (
    <svg viewBox="0 0 24 24" className="tech-icon-svg" aria-hidden="true">
      <path fill="#00758F" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.8 15.2c-1.4 0-2.6-1.1-2.6-2.6s1.2-2.6 2.6-2.6 2.6 1.2 2.6 2.6-1.2 2.6-2.6 2.6zm-7.6-2.2c-.9 0-1.6-.7-1.6-1.6s.7-1.6 1.6-1.6 1.6.7 1.6 1.6-.7 1.6-1.6 1.6z" />
      <path fill="#F29111" d="M14.5 9.5c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.7-1.5-1.5-1.5z" />
    </svg>
  ),
  uvicorn: (
    <svg viewBox="0 0 24 24" className="tech-icon-svg" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10.5" stroke="#FF4088" strokeWidth="1.8" />
      <path d="M7 9v5c0 2.76 2.24 5 5 5s5-2.24 5-5V9" stroke="#FF4088" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 4.5L9.5 9.5h5L12 4.5z" fill="#FF4088" />
    </svg>
  ),

  // AI / ML
  pytorch: (
    <svg viewBox="0 0 24 24" className="tech-icon-svg" aria-hidden="true">
      <path fill="#EE4C2C" d="M12.7 0a9.9 9.9 0 0 0-7.3 3.1 9.8 9.8 0 0 0-2.7 7.7 9.8 9.8 0 0 0 3.7 6.9l1.5-1.5a7.7 7.7 0 0 1-2.9-5.4 7.7 7.7 0 0 1 2.1-6.1A7.8 7.8 0 0 1 12.7 2.2c4.4 0 7.8 3.5 7.8 7.8a7.8 7.8 0 0 1-7.8 7.8l-.3-2.3-3.6 3.6 3.6 3.6v-2.7a9.9 9.9 0 0 0 10.3-9.9C22.7 4.5 18.2 0 12.7 0zm1.7 4.6l-1.4 1.4a.8.8 0 0 1-1.1 0l-1.4-1.4a.8.8 0 0 1 0-1.1l1.4-1.4a.8.8 0 0 1 1.1 0l1.4 1.4a.8.8 0 0 1 0 1.1z" />
    </svg>
  ),
  yolov8: (
    <svg viewBox="0 0 24 24" className="tech-icon-svg" fill="none" aria-hidden="true">
      <rect width="22" height="22" x="1" y="1" rx="5" fill="rgba(0, 255, 255, 0.12)" stroke="#00FFFF" strokeWidth="1.6" />
      <path d="M5 8.5l4 3.5-4 3.5M10.5 15.5h7" stroke="#00FFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="16.5" cy="8.5" r="2.2" fill="#00FFFF" />
    </svg>
  ),
  opencv: (
    <svg viewBox="0 0 24 24" className="tech-icon-svg" aria-hidden="true">
      <circle cx="12" cy="7" r="4" fill="#ED2224" />
      <circle cx="6.8" cy="16" r="4" fill="#58B947" />
      <circle cx="17.2" cy="16" r="4" fill="#1B75BC" />
      <circle cx="12" cy="7" r="1.8" fill="#0D0B18" />
      <circle cx="6.8" cy="16" r="1.8" fill="#0D0B18" />
      <circle cx="17.2" cy="16" r="1.8" fill="#0D0B18" />
    </svg>
  ),
  mediapipe: (
    <svg viewBox="0 0 24 24" className="tech-icon-svg" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="#00C4B4" strokeWidth="1.6" />
      <path d="M7 12h10M12 7v10M8.5 8.5l7 7M8.5 15.5l7-7" stroke="#00C4B4" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="12" cy="12" r="2.8" fill="#00C4B4" />
    </svg>
  ),
  scikitlearn: (
    <svg viewBox="0 0 24 24" className="tech-icon-svg" aria-hidden="true">
      <path fill="#F89939" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm1 14.5c-2.5 0-4.5-2-4.5-4.5S10.5 7.5 13 7.5s4.5 2 4.5 4.5-2 4.5-4.5 4.5z" />
      <circle cx="13" cy="12" r="2.6" fill="#3499CD" />
    </svg>
  ),

  // Tools & Others
  git: (
    <svg viewBox="0 0 24 24" className="tech-icon-svg" aria-hidden="true">
      <path fill="#F05032" d="M23.5 11.5L12.5.5c-.7-.7-1.8-.7-2.5 0L7.8 2.7l3.2 3.2c.8-.3 1.7-.1 2.3.5.6.6.8 1.5.5 2.3l3.1 3.1c.8-.3 1.7-.1 2.3.5.9.9.9 2.3 0 3.2s-2.3.9-3.2 0c-.6-.6-.8-1.5-.5-2.3l-2.9-2.9v6.5c.3.2.6.4.7.7.9.9.9 2.3 0 3.2s-2.3.9-3.2 0c-.9-.9-.9-2.3 0-3.2.3-.3.6-.5 1-.6V8.6c-.4-.1-.7-.3-1-.6-.6-.6-.8-1.5-.5-2.3L6.4 4.3.5 10.2c-.7.7-.7 1.8 0 2.5l11 11c.7.7 1.8.7 2.5 0l9.5-9.5c.7-.7.7-1.9 0-2.7z" />
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" className="tech-icon-svg" fill="#E2E8F0" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  ),
  figma: (
    <svg viewBox="0 0 24 24" className="tech-icon-svg" aria-hidden="true">
      <path fill="#F24E1E" d="M8 12a4 4 0 1 1 8 0v-4H8v4z" />
      <path fill="#A259FF" d="M4 12a4 4 0 0 1 4-4h4v8H8a4 4 0 0 1-4-4z" />
      <path fill="#F24E1E" d="M4 4a4 4 0 0 1 4-4h4v8H8a4 4 0 0 1-4-4z" />
      <path fill="#FF7262" d="M12 0h4a4 4 0 1 1 0 8h-4V0z" />
      <path fill="#1ABCFE" d="M4 20a4 4 0 0 1 4-4h4v4a4 4 0 0 1-8 0z" />
      <circle cx="16" cy="12" r="4" fill="#0ACF83" />
    </svg>
  ),
  postman: (
    <svg viewBox="0 0 24 24" className="tech-icon-svg" aria-hidden="true">
      <path fill="#FF6C37" d="M13.5 0C6 0 0 6 0 13.5S6 24 13.5 24 24 18 24 13.5 18 0 13.5 0zm5.7 8.3l-2.2 1.3c-.4-.5-.9-.9-1.5-1.2l.6-2.5c1.2.6 2.3 1.4 3.1 2.4zM12 4.5c.8 0 1.6.2 2.3.5L13.7 7.5c-.5-.1-1.1-.2-1.7-.2-3.3 0-6 2.7-6 6s2.7 6 6 6c2.8 0 5.1-1.9 5.8-4.5H12v-3h9.8c.1.5.2 1 .2 1.5 0 5.5-4.5 10-10 10S2 19 2 13.5 6.5 3.5 12 3.5v1z" />
    </svg>
  ),
  vscode: (
    <svg viewBox="0 0 24 24" className="tech-icon-svg" aria-hidden="true">
      <path fill="#007ACC" d="M17.6 0L5.3 11.5 1.7 8.7.4 9.6v4.8l1.3.9 3.6-2.8L17.6 24l5.9-2.9V2.9L17.6 0zm0 4.8l-7.7 7.2 7.7 7.2V4.8z" />
    </svg>
  ),
  canva: (
    <svg viewBox="0 0 24 24" className="tech-icon-svg" aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="#00C4CC" />
      <path d="M15.5 15.2c-1.3 1.3-3.2 1.6-4.6.7-.5-.3-.9-.8-1.1-1.4-.4-1.3.1-2.9 1.2-3.8 1.4-1.1 3.5-1.1 4.5.3l-1.2.9c-.6-.8-1.9-.9-2.7-.2-.7.6-1 1.7-.7 2.5.2.4.5.8.9.9.9.4 2 .2 2.7-.5l1 1.1z" fill="#FFFFFF" />
    </svg>
  ),

  // Other Technologies
  nodejs: (
    <svg viewBox="0 0 24 24" className="tech-icon-svg" aria-hidden="true">
      <path fill="#539E43" d="M12 2l10 5.8v11.6L12 25.2 2 19.4V7.8L12 2zm0 2.3L4 8.9v9.3l8 4.6 8-4.6V8.9l-8-4.6z" />
    </svg>
  ),
  mysqlworkbench: (
    <svg viewBox="0 0 24 24" className="tech-icon-svg" aria-hidden="true">
      <path fill="#00758F" d="M21 4H3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM3 7h18v3H3V7zm0 6h8v5H3v-5zm10 5v-5h8v5h-8z" />
      <path fill="#F29111" d="M6 8.5h2v1H6zm4 0h2v1h-2z" />
    </svg>
  ),
  linux: (
    <svg viewBox="0 0 24 24" className="tech-icon-svg" aria-hidden="true">
      <path fill="#FCC624" d="M12 2c-3.3 0-6 2.7-6 6 0 1.8.7 3.5 2 4.7-.6 1.8-2 3.3-2 5.3 0 2.2 3.6 4 8 4s8-1.8 8-4c0-2-1.4-3.5-2-5.3 1.3-1.2 2-2.9 2-4.7 0-3.3-2.7-6-6-6z" />
      <ellipse cx="9.5" cy="7.5" rx="1" ry="1.5" fill="#000000" />
      <ellipse cx="14.5" cy="7.5" rx="1" ry="1.5" fill="#000000" />
      <path d="M10.5 9.5c0 1 1.5 1.5 1.5 1.5s1.5-.5 1.5-1.5c0-.5-.7-.8-1.5-.8s-1.5.3-1.5.8z" fill="#FF8000" />
    </svg>
  ),
  windows: (
    <svg viewBox="0 0 24 24" className="tech-icon-svg" aria-hidden="true">
      <path fill="#0078D6" d="M0 3.4l9.8-1.3v9.3H0V3.4zm0 8.7h9.8v9.3L0 20.1v-8zm10.7-10.2L24 0v11.4H10.7V1.9zm0 10.2H24V24l-13.3-1.9v-10.2z" />
    </svg>
  ),
  jupyter: (
    <svg viewBox="0 0 24 24" className="tech-icon-svg" aria-hidden="true">
      <path fill="#F37626" d="M12 3.5c-4.1 0-7.6 2-9.4 5.2 1.3-.7 2.8-1.1 4.4-1.1 4.4 0 8 3.6 8 8 0 1.6-.5 3.1-1.3 4.4 3.7-1.4 6.3-5 6.3-9.1 0-4.1-3.6-7.4-8-7.4z" />
      <circle cx="5" cy="18" r="2" fill="#767677" />
      <circle cx="19" cy="6" r="1.5" fill="#767677" />
    </svg>
  ),
  docker: (
    <svg viewBox="0 0 24 24" className="tech-icon-svg" aria-hidden="true">
      <path fill="#2496ED" d="M13 3.5h2.5V6H13zm-3 0h2.5V6H10zm6 0h2.5V6H16zm-9 3h2.5V9H7zm3 0h2.5V9H10zm3 0h2.5V9H13zm3 0h2.5V9H16zm-9 3h2.5v2.5H7zm3 0h2.5v2.5H10zm3 0h2.5v2.5H13zm3 0h2.5v2.5H16z" />
      <path fill="#2496ED" d="M23.9 11.5c-.3-.2-1.4-.7-2.9-.2-.3-.8-1-1.3-1.7-1.6-.2 1.5-.9 2.5-2.2 3.1H1c-.6 0-1 .4-1 1 0 3.3 1.8 6.4 4.8 7.9C7.6 23 11 23.5 14.5 22.8c4.3-.9 7.6-4.2 8.7-8.5.6 0 1.3-.3 1.6-.8.4-.5.3-1.2-.9-2z" />
    </svg>
  ),
  postgresql: (
    <svg viewBox="0 0 24 24" className="tech-icon-svg" aria-hidden="true">
      <path fill="#4169E1" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm5 14c-1.1 0-2-.9-2-2 0-.5.2-1 .5-1.4-.7-.4-1.6-.6-2.5-.6-2.8 0-5 2.2-5 5H6c0-3.9 3.1-7 7-7 1.3 0 2.5.4 3.5 1 .3-.6.9-1 1.5-1 1.1 0 2 .9 2 2s-.9 2-2 2z" />
    </svg>
  ),
  npm: (
    <svg viewBox="0 0 24 24" className="tech-icon-svg" aria-hidden="true">
      <path fill="#CB3837" d="M0 0v24h24V0H0zm20.8 20.8h-4.2V7.2h-4.2v13.6H3.2V3.2h17.6v17.6z" />
    </svg>
  ),
};

// Categories Data Structure
const categories = [
  {
    id: 'frontend',
    name: 'FRONTEND',
    technologies: [
      { name: 'React', icon: icons.react },
      { name: 'JavaScript', icon: icons.javascript },
      { name: 'HTML5', icon: icons.html5 },
      { name: 'CSS3', icon: icons.css3 },
      { name: 'Vite', icon: icons.vite },
      { name: 'Recharts', icon: icons.recharts },
    ],
  },
  {
    id: 'backend',
    name: 'BACKEND',
    technologies: [
      { name: 'Python', icon: icons.python },
      { name: 'FastAPI', icon: icons.fastapi },
      { name: 'SQLAlchemy', icon: icons.sqlalchemy },
      { name: 'MySQL', icon: icons.mysql },
      { name: 'Uvicorn', icon: icons.uvicorn },
    ],
  },
  {
    id: 'ai-ml',
    name: 'AI / ML',
    technologies: [
      { name: 'PyTorch', icon: icons.pytorch },
      { name: 'YOLOv8', icon: icons.yolov8 },
      { name: 'OpenCV', icon: icons.opencv },
      { name: 'MediaPipe', icon: icons.mediapipe },
      { name: 'Scikit-learn', icon: icons.scikitlearn },
    ],
  },
  {
    id: 'tools',
    name: 'TOOLS',
    technologies: [
      { name: 'Git', icon: icons.git },
      { name: 'GitHub', icon: icons.github },
      { name: 'Figma', icon: icons.figma },
      { name: 'Postman', icon: icons.postman },
      { name: 'VS Code', icon: icons.vscode },
      { name: 'Canva', icon: icons.canva },
    ],
  },
];

// Bottom Strip Other Technologies
const otherTechnologies = [
  { name: 'Node.js', icon: icons.nodejs },
  { name: 'MySQL Workbench', icon: icons.mysqlworkbench },
  { name: 'Linux', icon: icons.linux },
  { name: 'Windows', icon: icons.windows },
  { name: 'Jupyter', icon: icons.jupyter },
  { name: 'Docker', icon: icons.docker },
  { name: 'PostgreSQL', icon: icons.postgresql },
  { name: 'npm', icon: icons.npm },
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('frontend');

  const currentCategory = categories.find((c) => c.id === activeCategory) || categories[0];

  return (
    <section className="skills section" id="skills">
      {/* Background Subtle Atmosphere Glow */}
      <div className="skills-bg-glow" aria-hidden="true" />

      <div className="container skills-container">
        {/* Top Header Row with Micro Technical Text on Right */}
        <div className="skills-top-bar reveal">
          <div className="skills-section-label">
            <span className="skills-num">03.</span>
            <span className="skills-title">SKILLS</span>
          </div>

          <div className="skills-micro-text" aria-hidden="true">
            <span>Exploring</span>
            <span className="micro-dot">•</span>
            <span>Building</span>
            <span className="micro-dot">•</span>
            <span>Learning</span>
          </div>
        </div>

        {/* Section Heading & Description */}
        <div className="skills-heading-wrap reveal reveal-delay-1">
          <h2 className="skills-main-headline">
            <span className="headline-line headline-light">TECHNOLOGIES</span>
            <span className="headline-line headline-accent">
              <span className="headline-purple-gradient">I WORK WITH.</span>
            </span>
          </h2>

          <p className="skills-intro-desc">
            The tools and technologies that help me build modern web applications, explore AI/ML, and design intuitive experiences.
          </p>
        </div>

        {/* Main Composition: Left Decorative Artwork + Right Technology Showcase Panel */}
        <div className="skills-main-composition reveal reveal-delay-2">
          {/* Left Column: Transparent Decorative Artwork (skill.png) */}
          <div className="skills-artwork-wrap" aria-hidden="true">
            <img
              src={skillImg}
              alt=""
              className="skills-artwork-img"
              loading="lazy"
            />
          </div>

          {/* Right Column: Large Technology Showcase Panel */}
          <div
            className="skills-showcase-panel"
            id="skills-showcase-panel"
            role="tabpanel"
            aria-label={`${currentCategory.name} technologies`}
          >
            {/* Subtle Futuristic Background Nodes & Edge Details */}
            <div className="panel-decor-system" aria-hidden="true">
              <span className="panel-corner-node p-top-left" />
              <span className="panel-corner-node p-top-right" />
              <span className="panel-corner-node p-bottom-left" />
              <span className="panel-corner-node p-bottom-right" />
              <span className="panel-header-line" />
            </div>

            {/* Top Category Tabs */}
            <div className="showcase-tabs-nav" role="tablist">
              {categories.map((cat) => {
                const isActive = cat.id === activeCategory;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`showcase-tab-btn ${isActive ? 'active' : ''}`}
                    onClick={() => setActiveCategory(cat.id)}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>

            {/* 3x2 Technology Tiles Grid */}
            <div className="showcase-tech-grid" key={currentCategory.id}>
              {currentCategory.technologies.map((tech) => (
                <div className="tech-tile-card" key={tech.name}>
                  <div className="tech-tile-icon-wrap" aria-hidden="true">
                    {tech.icon}
                  </div>
                  <span className="tech-tile-name">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Panel: Other Tools & Technologies Strip */}
        <div className="skills-bottom-strip reveal reveal-delay-3" aria-label="Other tools and technologies">
          <div className="bottom-strip-header">
            <span className="bottom-strip-tag">OTHER TOOLS & TECHNOLOGIES</span>
          </div>

          <div className="bottom-strip-grid">
            {otherTechnologies.map((tech, index) => (
              <React.Fragment key={tech.name}>
                <div className="bottom-tech-item">
                  <div className="bottom-tech-icon" aria-hidden="true">
                    {tech.icon}
                  </div>
                  <span className="bottom-tech-name">{tech.name}</span>
                </div>
                {index < otherTechnologies.length - 1 && (
                  <span className="bottom-strip-sep" aria-hidden="true" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
