"use client";

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
      style={{ background: "var(--bg)", paddingTop: "8rem", paddingBottom: "6rem" }}
    >
      <div className="w-full px-12" style={{ maxWidth: "1400px" }}>
        {/* Header */}
        <motion.div
          className="text-center"
          style={{ marginBottom: "4rem" }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl font-black" style={{ color: "var(--text)" }}>
            {header.h2a}{" "}
            <span style={{ color: "var(--primary)" }}>{header.h2b}</span>
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-4 gap-6">
          {pasi.map((pas, i) => (
            <motion.div
              key={pas.nr}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <AnimatedBorderCard
                className="rounded-2xl p-8 flex flex-col gap-6 cursor-default"
                style={{ background: "var(--surface)", border: "1px solid var(--border)", minHeight: "280px" }}
              >
                {/* Number */}
                <span
                  className="text-7xl font-black leading-none select-none"
                  style={{ color: "var(--surface-2)" }}
                >
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
