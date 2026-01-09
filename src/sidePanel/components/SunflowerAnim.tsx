import React from 'react';
export default function Sunflower({ progress }: { progress: number }) {
  // progress = 1 → fully up petals
  // progress = 0 → petals folded down

  const petals = Array.from({ length: 12 });

  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      style={{ display: "block", margin: "0 auto" }}
    >
      {/* CENTER */}
      <circle cx="60" cy="60" r="18" fill="#6b3e1e" />

      {/* PETALS */}
      {petals.map((_, i) => {
        const angle = i * (360 / petals.length);
        const bend = (1 - progress) * 50; // degrees downward

        return (
          <rect
            key={i}
            x="58"
            y="12"
            width="4"
            height="28"
            rx="2"
            fill="#f7d43b"
            style={{
              transformOrigin: "60px 60px",
              transform: `rotate(${angle}deg) rotate(${bend}deg)`,
              transition: "transform 0.3s linear",
            }}
          />
        );
      })}
    </svg>
  );
}
