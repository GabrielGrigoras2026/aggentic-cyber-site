"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Background cu particule fine (puncte cyan) in miscare browniana.
 * Canvas 2D, suspendat cand nu e in viewport. Densitate moderata.
 */
export default function DustBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.01 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    type P = { x: number; y: number; vx: number; vy: number; dx: number; dy: number; r: number; a: number };
    let particles: P[] = [];
    let w = 0;
    let h = 0;

    const init = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const N = 400;
      particles = Array.from({ length: N }, () => {
        // Drift constant: fiecare particula migreaza intr-o directie proprie
        const angle = Math.random() * Math.PI * 2;
        const driftSpeed = 0.15 + Math.random() * 0.2;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: 0,
          vy: 0,
          dx: Math.cos(angle) * driftSpeed,
          dy: Math.sin(angle) * driftSpeed,
          r: 0.4 + Math.random() * 1.2,
          a: 0.2 + Math.random() * 0.55,
        };
      });
    };
    init();
    window.addEventListener("resize", init);

    const tick = () => {
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        // Brownian: jitter pe vx/vy (perturbatie locala) + drift constant (dx/dy)
        p.vx += (Math.random() - 0.5) * 0.04;
        p.vy += (Math.random() - 0.5) * 0.04;
        p.vx *= 0.9;
        p.vy *= 0.9;
        p.x += p.dx + p.vx;
        p.y += p.dy + p.vy;

        // Wrap pe margini
        if (p.x < -2) p.x = w + 2;
        else if (p.x > w + 2) p.x = -2;
        if (p.y < -2) p.y = h + 2;
        else if (p.y > h + 2) p.y = -2;

        ctx.fillStyle = `rgba(100, 220, 255, ${p.a})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };

    if (visible) {
      tick();
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", init);
    };
  }, [visible]);

  return (
    <div
      ref={wrapRef}
      className="absolute inset-0 pointer-events-none"
      style={{ overflow: "hidden" }}
    >
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
    </div>
  );
}
