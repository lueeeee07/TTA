import React, { useEffect, useState, useRef } from 'react';

export default function PageLoader({ onComplete }) {
  const [hiding, setHiding] = useState(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    // Start hide animation at 1.1s, fully unmount at 1.7s
    const hideTimer = setTimeout(() => setHiding(true), 1100);
    const doneTimer = setTimeout(() => {
      if (onCompleteRef.current) {
        onCompleteRef.current();
      }
    }, 1700);
    return () => {
      clearTimeout(hideTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  return (
    <div
      className="loader-wrap"
      style={{
        opacity: hiding ? 0 : 1,
        visibility: hiding ? 'hidden' : 'visible',
        transition: 'opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.55s ease',
      }}
      aria-hidden="true"
    >
      {/* TTA Logo */}
      <img
        src={`${import.meta.env.BASE_URL}images/tta_logo.png`}
        alt="TTA"
        style={{
          height: 52,
          width: 'auto',
          objectFit: 'contain',
          opacity: hiding ? 0 : 1,
          transform: hiding ? 'scale(0.94)' : 'scale(1)',
          transition: 'opacity 0.4s ease, transform 0.4s ease',
        }}
      />

      {/* Tennis ball arc SVG */}
      <svg
        width="56"
        height="56"
        viewBox="0 0 56 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ marginTop: -8 }}
      >
        {/* Tennis ball circle */}
        <circle cx="28" cy="28" r="24" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
        {/* Animated arc — lime green */}
        <circle
          cx="28"
          cy="28"
          r="24"
          stroke="#c7ed56"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="loader-arc"
          fill="none"
          strokeDasharray="150 200"
          style={{ transformOrigin: '28px 28px', transform: 'rotate(-90deg)' }}
        />
        {/* Tennis ball seam */}
        <path
          d="M 10 28 Q 19 18 28 28 Q 37 38 46 28"
          stroke="rgba(199, 237, 86, 0.3)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        {/* Center dot */}
        <circle cx="28" cy="28" r="2.5" fill="#c7ed56" opacity="0.8" />
      </svg>

      {/* Progress bar */}
      <div className="loader-progress">
        <div className="loader-progress-bar" />
      </div>

      {/* Tagline */}
      <p
        style={{
          color: 'rgba(255,255,255,0.3)',
          fontSize: '0.6rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          marginTop: -4,
          fontFamily: "'Outfit', sans-serif",
        }}
      >
        Tanzania Tennis Association
      </p>
    </div>
  );
}
