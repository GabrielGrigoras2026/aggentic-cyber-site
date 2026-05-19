"use client";

import { useState } from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  radius?: number;
}

export default function AnimatedBorderCard({ children, className = "", style = {}, radius = 16 }: Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="acard relative"
      data-hovered={hovered ? "1" : "0"}
      style={{ width: "100%" }}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <div
        className={`relative ${className}`}
        style={{
          ...style,
          transform: hovered ? "scale(1.05)" : "scale(1)",
          transition: "transform 0.25s ease",
        }}
      >
        {/* Stratul de border animat (conic-gradient mascat) */}
        <span
          aria-hidden
          className="acard-border"
          style={{ borderRadius: radius }}
        />
        <div style={{ position: "relative", zIndex: 2, height: "100%", display: "flex", flexDirection: "column" }}>
          {children}
        </div>
      </div>
    </div>
  );
}
