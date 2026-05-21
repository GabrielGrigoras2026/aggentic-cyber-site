"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

const ACCENT = new THREE.Color("#00E6C3");
const RADIUS = 1.4;

const noopEventManager = () => ({ connected: false, connect: () => {}, disconnect: () => {}, handlers: {} });

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
    for (let y = 0; y < H; y += 1) {
      for (let x = 0; x < W; x += 1) {
        const i = (y * W + x) * 4;
        const r = data[i], g = data[i + 1], b = data[i + 2];
        const isOcean = b > r + 20 && b > g + 20 && b > 60;
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

interface Props {
  size?: number; // px
}

export default function MiniGlobe({ size = 170 }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.01 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapRef} style={{ width: size, height: size, position: "relative" }}>
      <Canvas
        camera={{ position: [0, 0, 3.5], fov: 50 }}
        style={{ pointerEvents: "none" }}
        events={noopEventManager}
        frameloop={visible ? "always" : "never"}
      >
        <ambientLight intensity={1} />
        <Globe />
      </Canvas>
    </div>
  );
}
