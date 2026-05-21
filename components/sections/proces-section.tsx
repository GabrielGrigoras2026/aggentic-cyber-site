"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLang } from "@/lib/lang-context";
import AnimatedBorderCard from "@/components/animated-border-card";

const PASI = {
  ro: [
    {
      nr: "01",
      titlu: "Descoperire",
      desc: "Analizăm în profunzime afacerea ta, obiectivele și poziția pe piață. Cartografiem întreg peisajul înainte de a atinge un singur pixel.",
    },
    {
      nr: "02",
      titlu: "Strategie",
      desc: "Un plan personalizat construit pe date și analize. Fiecare decizie are un motiv, fiecare acțiune un rezultat măsurabil.",
    },
    {
      nr: "03",
      titlu: "Execuție",
      desc: "Livrare rapidă și iterativă cu transparență totală. Demo-uri săptămânale, actualizări în timp real, zero surprize.",
    },
    {
      nr: "04",
      titlu: "Scalare",
      desc: "Lansarea este doar începutul. Optimizăm, iterăm și transformăm rezultatele inițiale în creștere compusă.",
    },
  ],
  en: [
    {
      nr: "01",
      titlu: "Discovery",
      desc: "We deeply analyze your business, goals, and market position. We map the entire landscape before touching a single pixel.",
    },
    {
      nr: "02",
      titlu: "Strategy",
      desc: "A personalized plan built on data and analysis. Every decision has a reason, every action a measurable outcome.",
    },
    {
      nr: "03",
      titlu: "Execution",
      desc: "Fast, iterative delivery with full transparency. Weekly demos, real-time updates, zero surprises.",
    },
    {
      nr: "04",
      titlu: "Scale",
      desc: "Launch is just the beginning. We optimize, iterate, and compound initial results into sustained growth.",
    },
  ],
};

const HEADER = {
  ro: {
    h2a: "Procesul nostru",
    h2b: "pentru rezultate",
  },
  en: {
    h2a: "Our process",
    h2b: "built for results",
  },
};

export default function ProcesSection() {
  const { lang } = useLang();
  const pasi = PASI[lang];
  const header = HEADER[lang];

  return (
    <section
      id="proces"
      className="flex flex-col items-center"
      style={{ background: "#000", paddingTop: "8rem", paddingBottom: "6rem" }}
    >
      <div className="w-full px-12 relative" style={{ maxWidth: "1400px" }}>
        {/* Decor: face images */}
        <Image
          src="/face_left.jpg"
          alt=""
          width={400}
          height={422}
          aria-hidden
          className="absolute left-12 pointer-events-none select-none"
          style={{ width: "280px", height: "auto", opacity: 0.5, top: "-6rem" }}
        />
        <Image
          src="/face_right.jpg"
          alt=""
          width={400}
          height={422}
          aria-hidden
          className="absolute right-12 pointer-events-none select-none"
          style={{ width: "280px", height: "auto", opacity: 0.5, top: "-6rem" }}
        />

        {/* Header */}
        <motion.div
          className="text-center relative"
          style={{ marginBottom: "8rem" }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl font-black" style={{ color: "var(--text)" }}>
            {header.h2a}
            <br />
            <span style={{ color: "var(--primary)" }}>{header.h2b}</span>
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-4 gap-8 items-stretch">
          {pasi.map((pas, i) => (
            <motion.div
              key={pas.nr}
              className="flex"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <AnimatedBorderCard
                className="rounded-2xl p-9 flex flex-col gap-4 cursor-default w-full"
                style={{ background: "var(--surface)", border: "1px solid var(--border)", height: "300px" }}
              >
                {/* Number */}
                <span className="proces-nr text-7xl font-black leading-none select-none">
                  {pas.nr}
                </span>

                {/* Divider */}
                <div style={{ width: "2rem", height: "2px", background: "var(--border)" }} />

                {/* Title */}
                <h3 className="text-2xl font-black" style={{ color: "var(--text)" }}>
                  {pas.titlu}
                </h3>

                {/* Description */}
                <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                  {pas.desc}
                </p>
              </AnimatedBorderCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
