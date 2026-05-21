"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Background animat cyber/digital: glob de puncte, hexagoane,
 * cod binar pe verticale, linii care pulseaza.
 * Foloseste canvas 2D, suspendat cand nu e in viewport.
 */
export default function CyberBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  // Pauza randarii cand nu e vizibil
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
    let t = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    // Coloane de cod binar (stanga ecranului); chars per coloana se calculeaza per frame
    const cols = 18;
    const binaryStreams = Array.from({ length: cols }, (_, i) => ({
      x: i * 28 + 8,
      speed: 0.4 + Math.random() * 0.8,
      offset: Math.random() * 1000,
    }));

    // Hexagoane (dreapta)
    const hexes: { cx: number; cy: number; r: number; phase: number }[] = [];
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 5; col++) {
        const r = 38;
        hexes.push({
          cx: col * (r * 1.75) + (row % 2 ? r * 0.85 : 0),
          cy: row * (r * 1.5),
          r,
          phase: Math.random() * Math.PI * 2,
        });
      }
    }

    const drawHex = (cx: number, cy: number, r: number, alpha: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i - Math.PI / 6;
        const x = cx + r * Math.cos(a);
        const y = cy + r * Math.sin(a);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(80, 200, 240, ${alpha})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    // Glob de puncte (centru-stanga)
    const globePoints: { x: number; y: number; z: number }[] = [];
    const N = 700;
    for (let i = 0; i < N; i++) {
      // Distributie sferica uniforma
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      globePoints.push({
        x: Math.sin(phi) * Math.cos(theta),
        y: Math.sin(phi) * Math.sin(theta),
        z: Math.cos(phi),
      });
    }

    const tick = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      // Fade trail subtil
      ctx.fillStyle = "rgba(5, 10, 22, 0.18)";
      ctx.fillRect(0, 0, w, h);

      // 1) Coloane binare (stanga 35% latime), umpla toata inaltimea
      const colsArea = w * 0.4;
      const scale = colsArea / (cols * 28);
      const lineH = 18;
      // Numar de caractere suficient sa acopere inaltimea + un buffer ca sa nu se vada wrap-ul
      const charsPerCol = Math.ceil(h / lineH) + 4;
      const totalH = charsPerCol * lineH;
      ctx.save();
      ctx.scale(scale, 1);
      ctx.font = "12px ui-monospace, monospace";
      binaryStreams.forEach((s) => {
        const yShift = (t * s.speed + s.offset) % totalH;
        for (let idx = 0; idx < charsPerCol; idx++) {
          const y = (idx * lineH - yShift + totalH) % totalH - lineH;
          // Caracter aleator dar stabil per (coloana, idx) ca sa nu palpaie
          const c = ((s.x * 31 + idx * 17) % 2) === 0 ? "1" : "0";
          // Fade descendent pe coloana ca efectul "matrix"
          const fade = 1 - idx / charsPerCol;
          ctx.fillStyle = `rgba(0, 230, 195, ${fade * 0.35})`;
          ctx.fillText(c, s.x, y);
        }
      });
      ctx.restore();

      // 2) Glob de puncte (centru-stanga)
      const gx = w * 0.32;
      const gy = h * 0.45;
      const gr = Math.min(w, h) * 0.32;
      const rotY = t * 0.005;
      const rotX = 0.3;
      ctx.save();
      globePoints.forEach((p) => {
        // Rotatie Y
        const x1 = p.x * Math.cos(rotY) - p.z * Math.sin(rotY);
        const z1 = p.x * Math.sin(rotY) + p.z * Math.cos(rotY);
        // Rotatie X
        const y2 = p.y * Math.cos(rotX) - z1 * Math.sin(rotX);
        const z2 = p.y * Math.sin(rotX) + z1 * Math.cos(rotX);
        // Proiectie
        const px = gx + x1 * gr;
        const py = gy + y2 * gr;
        const depth = (z2 + 1) / 2; // 0..1
        const alpha = 0.15 + depth * 0.55;
        const size = 0.5 + depth * 1.5;
        ctx.fillStyle = `rgba(100, 220, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();

      // 3) Hexagoane (dreapta jos)
      ctx.save();
      ctx.translate(w * 0.62, h * 0.55);
      hexes.forEach((hex) => {
        const a = 0.25 + Math.sin(t * 0.03 + hex.phase) * 0.18;
        drawHex(hex.cx, hex.cy, hex.r, a);
      });
      ctx.restore();

      // 4) Glow rosu-mov fadat stanga-sus pana dreapta-jos
      const grad = ctx.createRadialGradient(w * 0.85, h * 0.25, 0, w * 0.85, h * 0.25, w * 0.7);
      grad.addColorStop(0, "rgba(180, 50, 90, 0.18)");
      grad.addColorStop(1, "rgba(180, 50, 90, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      t += 1;
      raf = requestAnimationFrame(tick);
    };

    if (visible) {
      tick();
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [visible]);

  return (
    <div ref={wrapRef} className="absolute inset-0 overflow-hidden" style={{ background: "#050a16" }}>
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
    </div>
  );
}
