"use client";

import { useEffect, useId, useRef, useState } from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  radius?: number;
}

// Eveniment global pentru a deactiva celelalte carduri cand unul devine activ.
const ACARD_EVENT = "acard:activate";

export default function AnimatedBorderCard({ children, className = "", style = {}, radius = 16 }: Props) {
  const [hovered, setHovered] = useState(false);
  const idRef = useRef(useId());

  // Asculta cand alt card devine activ -> dezactiveaza-l pe asta.
  useEffect(() => {
    const onActivate = (e: Event) => {
      const detail = (e as CustomEvent<{ id: string }>).detail;
      if (detail.id !== idRef.current) setHovered(false);
    };
    window.addEventListener(ACARD_EVENT, onActivate);
    return () => window.removeEventListener(ACARD_EVENT, onActivate);
  }, []);

  const activate = () => {
    setHovered(true);
    window.dispatchEvent(
      new CustomEvent(ACARD_EVENT, { detail: { id: idRef.current } })
    );
  };

  // Pe mouse: enter/leave normal.
  // Pe touch: tap declanseaza si ramane pornit pana la tap pe alt card.
  const handlePointerEnter = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") activate();
  };
  const handlePointerLeave = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") setHovered(false);
  };
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") {
      if (hovered) {
        setHovered(false);
      } else {
        activate();
      }
    }
  };

  return (
    <div
      className="acard relative"
      data-hovered={hovered ? "1" : "0"}
      style={{ width: "100%" }}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
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
