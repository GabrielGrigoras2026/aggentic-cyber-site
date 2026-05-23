"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { useLang } from "@/lib/lang-context";
import DustBg from "@/components/dust-bg";

const noopEventManager = () => ({ enabled: false, priority: 0, connected: false, connect: () => {}, disconnect: () => {}, handlers: {} }) as any;

const ACCENT = new THREE.Color("#00E6C3");
const RADIUS = 1.4;

function Globe() {
  const groupRef = useRef<THREE.Group>(null);
  const texture = useLoader(THREE.TextureLoader, "/earth.jpg");

  const dotPoints = useMemo(() => {
    if (!texture.image) return new THREE.BufferGeometry();

    const canvas = document.createElement("canvas");
    const W = 512, H = 256;
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(texture.image as HTMLImageElement, 0, 0, W, H);
    const data = ctx.getImageData(0, 0, W, H).data;

    const positions: number[] = [];
    const STEP = 1;
    for (let y = 0; y < H; y += STEP) {
      for (let x = 0; x < W; x += STEP) {
        const i = (y * W + x) * 4;
        const r = data[i], g = data[i + 1], b = data[i + 2];
        // ocean: blue clearly dominant over both r and g
        const isOcean = b > r + 20 && b > g + 20 && b > 60;
        // arctic/antarctic ice over ocean: very light grey/white near poles
        const lat = (1 - y / H) * 180 - 90;
        const isArcticOcean = lat > 75 && r > 150 && g > 150 && b > 150 && Math.abs(r - b) < 20;
        if (isOcean || isArcticOcean) continue;

        const phi = (1 - y / H) * Math.PI;
        const theta = (x / W) * Math.PI * 2 - Math.PI / 2;
        positions.push(
          RADIUS * Math.sin(phi) * Math.cos(theta),
          RADIUS * Math.cos(phi),
          RADIUS * Math.sin(phi) * Math.sin(theta),
        );
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, [texture]);

  const gridLines = useMemo(() => {
    const lines: THREE.BufferGeometry[] = [];
    for (let lat = -80; lat <= 80; lat += 20) {
      const phi = THREE.MathUtils.degToRad(90 - lat);
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i <= 128; i++) {
        const theta = (i / 128) * Math.PI * 2;
        pts.push(new THREE.Vector3(
          RADIUS * Math.sin(phi) * Math.cos(theta),
          RADIUS * Math.cos(phi),
          RADIUS * Math.sin(phi) * Math.sin(theta),
        ));
      }
      lines.push(new THREE.BufferGeometry().setFromPoints(pts));
    }
    for (let lon = 0; lon < 360; lon += 20) {
      const theta = THREE.MathUtils.degToRad(lon);
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i <= 128; i++) {
        const phi = (i / 128) * Math.PI;
        pts.push(new THREE.Vector3(
          RADIUS * Math.sin(phi) * Math.cos(theta),
          RADIUS * Math.cos(phi),
          RADIUS * Math.sin(phi) * Math.sin(theta),
        ));
      }
      lines.push(new THREE.BufferGeometry().setFromPoints(pts));
    }
    return lines;
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001125;
    }
  });

  return (
    <group ref={groupRef} rotation={[0.7, 1.0, Math.PI]}>
      <points geometry={dotPoints}>
        <pointsMaterial color={ACCENT} size={0.022} sizeAttenuation transparent opacity={0.9} />
      </points>
      {gridLines.map((geo, i) => (
        <line key={i}>
          <primitive object={geo} attach="geometry" />
          <lineBasicMaterial color={ACCENT} transparent opacity={0.15} />
        </line>
      ))}
      <mesh>
        <sphereGeometry args={[RADIUS + 0.01, 64, 64]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={0.04} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}

const T = {
  ro: {
    nav: ["Servicii", "Proces", "Proiecte", "Contact"],
    navHrefs: ["#servicii", "#proces", "#proiecte", "#contact"],
    cta: "Începe acum",
    tag: "Agentic AI Full Service",
    h1: ["Suntem în pas", "cu AI-ul!"],
    sub: "- Fii și TU! -",
    desc: "AI, automatizări și soluții digitale pentru oameni și afaceri care vor să lucreze mai inteligent.",
    marquee: "AGENTIC AI • AUTOMATIZARE SECURIZATĂ • UNELTE AI • AUTOMATIZARE FLUX DE LUCRU • SOLOPRENEUR • ",
  },
  en: {
    nav: ["Services", "Process", "Projects", "Contact"],
    navHrefs: ["#servicii", "#proces", "#proiecte", "#contact"],
    cta: "Get Started",
    tag: "Agentic AI Full Service",
    h1: ["We keep pace", "with AI!"],
    sub: "- You should too! -",
    desc: "AI, automation, and digital solutions for people and businesses that want to work smarter.",
    marquee: "AGENTIC AI • SECURE AUTOMATION • AI TOOLS • WORKFLOW AUTOMATION • SOLOPRENEUR • ",
  },
};

function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <div className="flex items-center rounded-full overflow-hidden" style={{ border: "1px solid var(--border)" }}>
      {(["en", "ro"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className="px-4 py-1.5 text-xs font-bold uppercase tracking-widest transition-all"
          style={{
            background: lang === l ? "var(--primary)" : "transparent",
            color: lang === l ? "var(--bg)" : "var(--muted)",
          }}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

export default function HeroSection() {
  const { lang } = useLang();
  const t = T[lang];
  const globeWrapRef = useRef<HTMLDivElement>(null);
  const [globeVisible, setGlobeVisible] = useState(true);

  useEffect(() => {
    const el = globeWrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setGlobeVisible(entry.isIntersecting),
      { threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      className="relative flex flex-col min-h-screen"
      style={{ background: "#000", paddingTop: "80px" }}
    >
      {/* Particule cyan in miscare browniana */}
      <DustBg />

      {/* Hero body */}
      <div className="flex flex-1 items-center relative" style={{ zIndex: 2 }}>
        {/* Left */}
        <div className="flex flex-col gap-6 shrink-0" style={{ width: "42%", paddingLeft: "12%" }}>
          <p className="text-sm tracking-widest uppercase" style={{ color: "var(--primary)" }}>
            {t.tag}
          </p>
          <motion.h1
            className="text-6xl font-black leading-tight"
            style={{ color: "var(--text)" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            key={lang}
          >
            {t.h1[0]}<br />{t.h1[1]}
          </motion.h1>
          <motion.p
            className="text-3xl font-bold italic"
            style={{ color: "var(--primary)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            key={lang + "-sub"}
          >
            {t.sub}
          </motion.p>
          <motion.p
            className="leading-relaxed"
            style={{ color: "var(--muted)", fontSize: "1.5rem" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            key={lang + "-desc"}
          >
            {t.desc}
          </motion.p>
        </div>

        {/* Right - Globe */}
        <div ref={globeWrapRef} className="h-[580px] relative" style={{ width: "58%", zIndex: 3 }}>
          {/* Mask circular sub glob, ascunde particulele exact in zona lui */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(circle at 50% 50%, #000 50%, rgba(0,0,0,0.7) 65%, transparent 85%)",
            }}
          />
          <div
            className="absolute inset-0 blur-3xl"
            style={{ background: "var(--glow)" }}
          />
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.5, ease: "easeOut" }}
          >
            <Canvas
              camera={{ position: [0, 0, 3.5], fov: 50 }}
              style={{ pointerEvents: "none" }}
              events={noopEventManager}
              frameloop="always"
            >
              <ambientLight intensity={1} />
              <Globe />
            </Canvas>
          </motion.div>
        </div>
      </div>

      {/* Marquee */}
      <div
        className="overflow-hidden py-4 border-t relative"
        style={{ borderColor: "var(--border)", marginBottom: "8vh", zIndex: 2 }}
      >
        <div className="flex whitespace-nowrap animate-marquee">
          {[0, 1].map((k) => (
            <span key={k} className="text-sm tracking-widest uppercase pr-8" style={{ color: "var(--muted)" }}>
              {t.marquee}{t.marquee}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
