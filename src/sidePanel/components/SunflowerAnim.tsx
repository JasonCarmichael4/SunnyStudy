import React, { useMemo } from "react";

interface SunflowerProps {
  progress: number;
  time: string;
  isBreak?: boolean | null;
}

const Sunflower: React.FC<SunflowerProps> = ({ progress, time, isBreak }) => {
  const centerX = 100;
  const centerY = 100;

  const numPetals = 25;

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  
  const petal = useMemo(() => {
    return <path
        transform={`
          translate(${centerX}, ${centerY}) 
          rotate(${-90 + progress * 360})
        `}
        
        fill={"#f9ca24"}
        
        stroke="#2e1d1a"
        strokeWidth="1"

        d="M 0,0 C 0,0 95,-20 100,0
        C 100,0 95,20 0,0" />;
  }, [isBreak]);

  const petals = useMemo(() => {
    return Array.from({ length: numPetals }, (_, i) => {
      const angle = (360 / numPetals) * i;

      return React.cloneElement(petal, {
        key: i,
        transform: `
          translate(${centerX}, ${centerY})
          rotate(${angle})
        `,
      });
    });
  }, [numPetals, petal, centerX, centerY]);

  // calculate the position of moving point
  const angle = -90 + progress * 360;
  const radians = (angle * Math.PI) / 180;

  const pointX = centerX + radius * Math.cos(radians);
  const pointY = centerY + radius * Math.sin(radians);

  return (
    <svg 
      width="100%" 
      height="100%" 
      viewBox="0 0 200 200" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: 'visible' }}
    >
      {/* Petals */}
      {petals}

      {/* Center */}
      <circle 
        cx={centerX} 
        cy={centerY} 
        r={radius}
        fill="#ae6f2f"
        stroke={isBreak ? "#07912e" : "#952703"}
        strokeWidth={4}
        strokeDasharray={circumference}
        strokeDashoffset={circumference * (1 - progress)}
        strokeLinecap="round"
        transform={`rotate(-90 ${centerX} ${centerY})`}
      />

      {/* Moving point */}
      <circle
        cx={pointX}
        cy={pointY}
        r={5}
        fill={isBreak ? "#07912e" : "#952703"}
        stroke="#2e1d1a"
        strokeWidth={0.5}
      />

      {/* Time text */}
      <text
        x={centerX}
        y={centerY}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="20"
        fontWeight="bold"
        fill="#2e1d1a"
      >
        {time}
      </text>
    </svg>
  );
};

export default React.memo(Sunflower);