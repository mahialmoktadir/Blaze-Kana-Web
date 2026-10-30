import React from 'react';

interface BlazeFlameEmblemProps {
  className?: string;
  size?: number | string;
  /** Background cutout color - defaults to #0b0b0c */
  bgFill?: string;
}

/**
 * Blaze Flame & Hiragana "あ" Core Emblem
 */
export const BlazeFlameEmblem: React.FC<BlazeFlameEmblemProps> = ({
  className = 'w-10 h-10',
  size,
  bgFill = '#0b0b0c',
}) => {
  return (
    <svg
      viewBox="15 0 135 230"
      className={className}
      style={size ? { width: size, height: size } : undefined}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Blaze Kana Emblem"
    >
      {/* Outer Flame / あ Silhouette Background Base */}
      <path
        fill="#ff5700"
        d="M100,10 C130,50 145,85 140,130 C136,165 112,190 85,200 C58,190 35,165 30,130 C25,85 50,45 100,10 Z"
      />
      {/* Inner Dynamic Flame Cutout / Negative Space */}
      <path
        fill={bgFill}
        d="M95,35 C115,65 125,95 120,130 C116,155 100,175 80,185 C65,175 50,155 45,130 C42,95 65,65 95,35 Z"
      />
      {/* Stylized Hiragana "あ" Top Horizontal Stroke */}
      <path
        fill="#ffffff"
        d="M60,65 Q100,55 125,75 Q115,65 95,65 Z"
      />
      <path
        fill="#ffffff"
        d="M72,82 C85,80 102,88 100,105 C98,122 75,115 70,100 C68,92 70,85 72,82 Z"
      />
      <path
        fill={bgFill}
        d="M82,92 C88,90 92,96 90,102 C88,107 80,105 78,100 C77,96 79,93 82,92 Z"
      />
      {/* Center Vertical Crossing Stroke & Swirling Flame Tail */}
      <path
        fill="#ffffff"
        d="M88,55 C90,100 82,145 68,180 C60,198 42,215 22,225 C45,210 62,190 70,165 C78,135 80,95 78,55 Z"
      />
      {/* Right Hook / Loop of "あ" morphing into an upward spark/flame */}
      <path
        fill="#ff8533"
        d="M105,130 C125,132 142,148 135,175 C128,198 102,210 85,215 C108,205 125,188 122,165 C120,148 112,138 105,130 Z"
      />
      {/* Accent Spark Top */}
      <polygon fill="#ffffff" points="100,0 106,18 100,24 94,18" />
    </svg>
  );
};

interface BlazeKanaWordmarkProps {
  className?: string;
  bgFill?: string;
  textColor?: string;
}

/**
 * Full Horizontal Blaze Kana Wordmark Logo (SVG Vector exact replica)
 */
export const BlazeKanaWordmark: React.FC<BlazeKanaWordmarkProps> = ({
  className = 'w-auto h-16',
  bgFill = '#0b0b0c',
  textColor = '#ffffff',
}) => {
  return (
    <svg
      viewBox="0 0 740 230"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Blaze Kana - Japanese Learning Platform"
    >
      <defs>
        <style>{`
          .bk-text-primary { font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-weight: 800; fill: ${textColor}; letter-spacing: 0.12em; }
          .bk-text-accent { font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-weight: 800; fill: #ff5700; letter-spacing: 0.18em; }
          .bk-caption { font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-weight: 700; fill: #9ca3af; letter-spacing: 0.35em; font-size: 14px; }
        `}</style>
      </defs>

      {/* Icon Symbol (Left) */}
      <g transform="translate(0, 0)">
        <path
          fill="#ff5700"
          d="M100,10 C130,50 145,85 140,130 C136,165 112,190 85,200 C58,190 35,165 30,130 C25,85 50,45 100,10 Z"
        />
        <path
          fill={bgFill}
          d="M95,35 C115,65 125,95 120,130 C116,155 100,175 80,185 C65,175 50,155 45,130 C42,95 65,65 95,35 Z"
        />
        <path fill="#ffffff" d="M60,65 Q100,55 125,75 Q115,65 95,65 Z" />
        <path
          fill="#ffffff"
          d="M72,82 C85,80 102,88 100,105 C98,122 75,115 70,100 C68,92 70,85 72,82 Z"
        />
        <path
          fill={bgFill}
          d="M82,92 C88,90 92,96 90,102 C88,107 80,105 78,100 C77,96 79,93 82,92 Z"
        />
        <path
          fill="#ffffff"
          d="M88,55 C90,100 82,145 68,180 C60,198 42,215 22,225 C45,210 62,190 70,165 C78,135 80,95 78,55 Z"
        />
        <path
          fill="#ff8533"
          d="M105,130 C125,132 142,148 135,175 C128,198 102,210 85,215 C108,205 125,188 122,165 C120,148 112,138 105,130 Z"
        />
        <polygon fill="#ffffff" points="100,0 106,18 100,24 94,18" />
      </g>

      {/* Typography (Right) */}
      <g transform="translate(195, 120)">
        <text x="0" y="0" fontSize="52" className="bk-text-primary">
          BLAZE<tspan className="bk-text-accent"> KANA</tspan>
        </text>
        <text x="3" y="32" className="bk-caption">
          JAPANESE LEARNING PLATFORM
        </text>
      </g>
    </svg>
  );
};
