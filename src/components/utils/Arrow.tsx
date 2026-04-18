import React from "react";

type ArrowDirection = "right" | "left" | "down" | "up";

type ArrowProps = {
  direction?: ArrowDirection;
  active?: boolean;
  className?: string;
};

const Arrow: React.FC<ArrowProps> = ({
  direction = "right",
  active = true,
  className,
}) => {
  const color = active ? "#2B5FBA" : "#9CA3AF";

  const rotationMap: Record<ArrowDirection, string> = {
    right: "rotate(30deg)",
    down: "rotate(150deg)",
    left: "rotate(150deg)",
    up: "rotate(-90deg)",
  };

  return (
    <svg
      width="100"
      height="40"
      viewBox="0 0 100 40"
      className={className}
      style={{ transform: rotationMap[direction] }}
      fill="none"
    >
      {/* линия */}
      <path
        d="M5 20 H85"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* стрелка */}
      <path
        d="M75 10 L90 20 L75 30"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Arrow;
