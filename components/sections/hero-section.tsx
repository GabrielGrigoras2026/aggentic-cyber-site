"use client";

import { useRef, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

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
        const isLand = g > 60 && g > b + 20;
        if (!isLand) continue;

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
      groupRef.current.rotation.y += 0.00075;
    }
  });

  return (
    <group ref={groupRef} rotation={[0.7, 1.0, Math.PI]}>
      <points geometry={dotPoints}>
        <pointsMaterial color={ACCENT} size={0.018} sizeAttenuation transparent opacity={0.85} />
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

const MARQUEE_TEXT = "AGENTIC AI • SECURE AUTOMATION • AI TOOLS • WORKFLOW AUTOMATION • SOLOPRENEUR • AGENTIC AI • SECURE AUTOMATION • AI TOOLS • WORKFLOW AUTOMATION • SOLOPRENEUR • ";

export default function HeroSection() {
  return (
    <section
      className="relative flex flex-col min-h-screen"
      style={{ background: "var(--bg)" }}
    >
      {/* Navbar */}
      <nav className="flex items-center justify-between px-10 py-5">
        <Image src="/logo.png" alt="aGGentic cyber" width={220} height={55} priority />
        <div className="flex items-center gap-8">
          <a href="#servicii" className="text-sm hover:text-[var(--primary)] transition-colors" style={{ color: "var(--muted)" }}>Servicii</a>
          <a href="#proces" className="text-sm hover:text-[var(--primary)] transition-colors" style={{ color: "var(--muted)" }}>Proces</a>
          <a href="#proiecte" className="text-sm hover:text-[var(--primary)] transition-colors" style={{ color: "var(--muted)" }}>Proiecte</a>
          <a href="#contact" className="text-sm hover:text-[var(--primary)] transition-colors" style={{ color: "var(--muted)" }}>Contact</a>
          <button
            className="px-5 py-2 rounded text-sm font-semibold transition-all hover:brightness-110"
            style={{ background: "var(--primary)", color: "var(--bg)" }}
          >
            Începe acum
          </button>
        </div>
      </nav>

      {/* Hero body */}
      <div className="flex flex-1 items-center">
        {/* Left - Text, împins spre dreapta lângă glob */}
        <div className="flex flex-col gap-6 pl-10 pr-0 w-[42%]">
          <p className="text-sm tracking-widest uppercase" style={{ color: "var(--primary)" }}>
            Agentic AI Full Service
          </p>
          <motion.h1
            className="text-6xl font-black leading-tight"
            style={{ color: "var(--text)" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            Suntem în pas<br />cu AI-ul!
          </motion.h1>
          <motion.p
            className="text-3xl font-bold italic"
            style={{ color: "var(--primary)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          >
            - Fii și TU! -
          </motion.p>
          <motion.p
            className="text-base leading-relaxed"
            style={{ color: "var(--muted)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Construim, automatizăm și scalăm fluxuri de lucru agentice pentru soloprenori și profesioniști care vor să fie cu un pas înaintea tuturor.
          </motion.p>
        </div>

        {/* Right - Globe 3D, împins spre dreapta */}
        <div className="flex-1 h-[560px] relative">
          <div
            className="absolute inset-0 rounded-full blur-3xl"
            style={{ background: "var(--glow)" }}
          />
          <Canvas camera={{ position: [0, 0, 3.5], fov: 50 }}>
            <ambientLight intensity={1} />
            <Globe />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
          </Canvas>
        </div>
      </div>

      {/* Marquee */}
      <div
        className="overflow-hidden py-4 border-t"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="flex whitespace-nowrap animate-marquee">
          <span className="text-sm tracking-widest uppercase pr-8" style={{ color: "var(--muted)" }}>
            {MARQUEE_TEXT}
          </span>
          <span className="text-sm tracking-widest uppercase pr-8" style={{ color: "var(--muted)" }}>
            {MARQUEE_TEXT}
          </span>
        </div>
      </div>
    </section>
  );
}
