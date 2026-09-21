import React, { useState, useEffect } from 'react';
import './Loader.css';

export default function Loader() {
  const [fadeOut, setFadeOut] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2000);

    const removeTimer = setTimeout(() => {
      setVisible(false);
    }, 2800);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div id="loader" className={`loader-wrapper ${fadeOut ? 'fade-out' : ''}`}>
      <div className="loader-content">
        <h1 className="loader-logo">ST</h1>
        <p className="loader-text">Loading Portfolio...</p>
        <div className="loader-bar">
          <span className="loader-progress"></span>
        </div>
      </div>
    </div>
  );
}

