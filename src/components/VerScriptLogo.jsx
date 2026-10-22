import React from 'react';

export default function VerScriptLogo({ width = 24, height = 24, className = '', showBadge = false }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 512 512"
      fill="none"
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}
      aria-label="VerScript Mobile Logo"
    >
      <defs>
        <linearGradient id="vrsMobLeftGrad" x1="0%" y1="0%" x2="70%" y2="100%">
          <stop offset="0%" stopColor="#00FFCC" />
          <stop offset="50%" stopColor="#00d2ff" />
          <stop offset="100%" stopColor="#0077fe" />
        </linearGradient>

        <linearGradient id="vrsMobRightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f0abfc" />
          <stop offset="30%" stopColor="#bd00ff" />
          <stop offset="100%" stopColor="#7928CA" />
        </linearGradient>

        <linearGradient id="vrsMobOverlapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9333ea" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.95" />
        </linearGradient>
      </defs>

      {showBadge && (
        <g id="mobile-badge">
          <rect x="20" y="20" width="472" height="472" rx="110" fill="#0d111c" stroke="url(#vrsMobLeftGrad)" strokeWidth="6" opacity="0.9"/>
          <rect x="220" y="44" width="72" height="8" rx="4" fill="rgba(255,255,255,0.25)"/>
          <circle cx="256" cy="460" r="10" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="3"/>
        </g>
      )}

      <g id="verscript-mark">
        <rect
          x="-48"
          y="-180"
          width="96"
          height="360"
          rx="48"
          transform="translate(194, 255) rotate(-24.5)"
          fill="url(#vrsMobLeftGrad)"
        />

        <rect
          x="-48"
          y="-180"
          width="96"
          height="360"
          rx="48"
          transform="translate(318, 255) rotate(24.5)"
          fill="url(#vrsMobRightGrad)"
          opacity="0.94"
          style={{ mixBlendMode: 'screen' }}
        />

        <path
          d="M 256 312 L 298 392 L 256 438 L 214 392 Z"
          fill="url(#vrsMobOverlapGrad)"
          opacity="0.85"
        />
      </g>
    </svg>
  );
}
