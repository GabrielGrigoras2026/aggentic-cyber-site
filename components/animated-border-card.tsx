"use client";

import { motion, useMotionValue, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  radius?: number;
}

export default function AnimatedBorderCard({ children, className = "", style = {}, radius = 16 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const drawn = useMotionValue(0);
  const dashArray = useMotionValue("0 9999");
  const dashOffset = useMotionValue(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setSize({ w: el.offsetWidth, h: el.offsetHeight });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { w, h } = size;
  const r = radius;
  const perimeter = w && h ? 2 * (w + h) - 8 * r + 2 * Math.PI * r : 0;

  // Actualizăm dashOffset când perimetrul e cunoscut
  useEffect(() => {
    if (perimeter > 0) {
      dashOffset.set(perimeter * 0.75);
    }
  }, [perimeter, dashOffset]);

  // Sincronizăm drawn → dashArray folosind perimetrul curent
  useEffect(() => {
    return drawn.on("change", (v) => {
      dashArray.set(`${v * perimeter} ${perimeter}`);
    });
  }, [drawn, dashArray, perimeter]);

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={style}
      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
      onHoverStart={() => animate(drawn, 1, { duration: 0.6, ease: "easeInOut" })}
      onHoverEnd={async () => {
        // Așteptăm să termine circuitul înainte să dispară
        await animate(drawn, 1, { duration: 0.6, ease: "easeInOut" });
        animate(drawn, 0, { duration: 0.3, ease: "easeIn" });
      }}
    >
      {w > 0 && (
        <svg
          width={w}
          height={h}
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 1,
            overflow: "visible",
          }}
        >
          <motion.rect
            x="1"
            y="1"
            width={w - 2}
            height={h - 2}
            rx={r}
            ry={r}
            fill="none"
            stroke="#00E6C3"
            strokeWidth="1.5"
            strokeLinecap="round"
            style={{ strokeDasharray: dashArray, strokeDashoffset: dashOffset }}
          />
        </svg>
      )}

      <div style={{ position: "relative", zIndex: 2, height: "100%", display: "flex", flexDirection: "column" }}>
        {children}
      </div>
    </motion.div>
  );
}
