"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function SplashScreen({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const handler = () => {
      setVisible(false);
      setTimeout(onDone, 600);
    };
    window.addEventListener("keydown", handler);
    window.addEventListener("pointerdown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
      window.removeEventListener("pointerdown", handler);
    };
  }, [ready, onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8"
          style={{ background: "var(--bg)" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <motion.div
            className="relative"
            style={{ height: "80vh", width: "auto", aspectRatio: "1/1" }}
            initial={{ opacity: 0, scale: 0.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src="/sigla.png"
              alt="aGGentic cyber"
              fill
              style={{ objectFit: "contain" }}
              priority
            />
          </motion.div>

          <motion.p
            className="text-sm tracking-widest uppercase"
            style={{ color: "var(--muted)" }}
            animate={{ opacity: ready ? [0, 1, 0.4, 1] : 0 }}
            transition={ready ? { duration: 1.8, repeat: Infinity, ease: "easeInOut" } : { duration: 0 }}
          >
            Apasă orice tastă pentru a continua
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
