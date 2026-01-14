import React, { useMemo } from "react";

interface SunflowerProps {
  progress: number;
  isBreak?: boolean | null;
}

const Sunflower: React.FC<SunflowerProps> = ({ progress, isBreak }) => {
  const centerX = 100;
  const centerY = 100;

  const numPetals = 20;
  const petalLength = 50;
  const petalWidth = 20;

  
  const petal = useMemo(() => {
    return <path
        transform={`
          translate(${centerX}, ${centerY}) 
          rotate(${-90 + progress * 360})
        `}
        
        fill={isBreak ? "#6ab04c" : "#f9ca24"}
        
        stroke="#2e1d1a"
        strokeWidth="1"

        d="M 0,0 C 0,0 95,-20 100,0
        C 100,0 95,20 0,0" />;
  }, [progress, isBreak]);

  const petals = useMemo(() => {
    return Array.from({ length: numPetals }, (_, i) => {
      const angle = (360 / numPetals) * i;

      return React.cloneElement(petal, {
        key: i,
        transform: `
          translate(${centerX}, ${centerY})
          rotate(${angle + progress * 360})
        `
      });
    });
  }, [numPetals, petal, centerX, centerY, progress]);
  
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

      {/* Center Disk (Seeds) */}
      <circle 
        cx={centerX} 
        cy={centerY} 
        r={20} 
        fill={"#ae6f2f"}
        stroke="#2e1d1a"
        strokeWidth="2"
      />
    </svg>
  );
};

export default Sunflower;