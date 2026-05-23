"use client";

import Image from "next/image";
import { useLang } from "@/lib/lang-context";
import MiniGlobe from "@/components/mini-globe";

const T = {
  ro: {
    desc: "Agenție digitală full-service care ajută branduri ambițioase să domine piețele prin design, dezvoltare și marketing performant.",
    col1Title: "Servicii",
    col1: [
      { label: "Automatizare AI", href: "#servicii" },
      { label: "Web Design", href: "#servicii" },
      { label: "Dezvoltare Web", href: "#servicii" },
      { label: "Dezvoltare SaaS", href: "#servicii" },
    ],
    col2Title: "Marketing",
    col2: [
      { label: "Meta Ads", href: "#servicii" },
      { label: "TikTok Ads", href: "#servicii" },
      { label: "Optimizare Funnel", href: "#servicii" },
      { label: "Branding & Design", href: "#servicii" },
    ],
    rights: "Toate drepturile rezervate.",
    legal: [
      { label: "Confidențialitate", href: "#" },
      { label: "Termeni", href: "#" },
      { label: "Cookie-uri", href: "#" },
    ],
  },
  en: {
    desc: "Full-service digital agency helping ambitious brands dominate their markets through design, development and high-performance marketing.",
    col1Title: "Services",
    col1: [
      { label: "AI Automation", href: "#servicii" },
      { label: "Web Design", href: "#servicii" },
      { label: "Web Development", href: "#servicii" },
      { label: "SaaS Development", href: "#servicii" },
    ],
    col2Title: "Marketing",
    col2: [
      { label: "Meta Ads", href: "#servicii" },
      { label: "TikTok Ads", href: "#servicii" },
      { label: "Funnel Optimization", href: "#servicii" },
      { label: "Branding & Design", href: "#servicii" },
    ],
    rights: "All rights reserved.",
    legal: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Cookies", href: "#" },
    ],
  },
};

const SOCIALS = [
  { label: "X", href: "#" },
  { label: "IG", href: "#" },
  { label: "LI", href: "#" },
  { label: "TK", href: "#" },
];

export default function Footer() {
  const { lang } = useLang();
  const t = T[lang];
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden" style={{ background: "var(--bg)" }}>
      {/* Linie subtila sus */}
      <div style={{ borderTop: "1px solid var(--border)" }} />

      <div className="relative w-full footer-inner pt-12 pb-0" style={{ maxWidth: "1500px", margin: "0 auto", zIndex: 2 }}>
        {/* Grid principal: logo+desc (st compact), servicii+marketing (dr, aliniate jos) */}
        <div className="footer-grid-main gap-10 lg:gap-12 lg:items-end">
          {/* Stanga: logo (desktop) + descriere + social */}
          <div className="footer-left flex flex-col gap-5">
            <div className="relative footer-logo hidden lg:block">
              <Image src="/logo.png" alt="aGGentic cyber" fill style={{ objectFit: "contain", objectPosition: "left center" }} />
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "var(--muted)", maxWidth: "100%" }}>
              {t.desc}
            </p>
            <div className="flex gap-3 mt-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="footer-social w-11 h-11 rounded-full flex items-center justify-center text-xs font-bold tracking-wide"
                  style={{ background: "var(--surface)", color: "var(--muted)", border: "1px solid var(--border)" }}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Mini-glob centrat pe axa verticala a siglei - doar desktop (pe mobil apare pe grilaj) */}
          <div className="footer-globe-center hidden lg:block">
            <MiniGlobe size={170} />
          </div>

          {/* Dreapta: tronson Servicii + Marketing */}
          <div className="footer-right grid grid-cols-2 lg:flex lg:justify-end gap-6 lg:gap-24">
            {/* Servicii */}
            <div className="flex flex-col gap-5">
              <h3 className="text-base font-bold" style={{ color: "var(--text)" }}>
                {t.col1Title}
              </h3>
              <ul className="flex flex-col gap-3">
                {t.col1.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="footer-link text-sm" style={{ color: "var(--muted)" }}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Marketing */}
            <div className="flex flex-col gap-5">
              <h3 className="text-base font-bold" style={{ color: "var(--text)" }}>
                {t.col2Title}
              </h3>
              <ul className="flex flex-col gap-3">
                {t.col2.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="footer-link text-sm" style={{ color: "var(--muted)" }}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Linie separator */}
        <div className="mt-8 pt-5" style={{ borderTop: "1px solid var(--border)" }}>
          <div className="footer-bottom flex flex-col lg:flex-row lg:items-center gap-4 text-sm" style={{ color: "var(--muted)" }}>
            <span className="footer-copy flex-1">
              © {year} aGGentic cyber. {t.rights}
            </span>
            <div className="footer-legal flex flex-wrap gap-6 lg:gap-8">
              {t.legal.map((l) => (
                <a key={l.label} href={l.href} className="footer-link">
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grid 3D in perspectiva (caroiaj cyber) + sigla peste (desktop) / glob (mobil) */}
      <div className="footer-grid-3d">
        <div className="footer-grid-plane">
          <div className="footer-grid-pattern" />
        </div>
        <div className="footer-grid-sigla">
          {/* Sigla - doar desktop */}
          <div
            className="footer-sigla-box hidden lg:block relative overflow-hidden"
            style={{
              borderRadius: "24px",
              background: "var(--bg)",
              boxShadow: "0 20px 60px rgba(0, 230, 195, 0.18)",
            }}
          >
            <Image src="/sigla.png" alt="aGGentic cyber" fill style={{ objectFit: "cover" }} />
          </div>
          {/* Glob - doar mobil/tablet (cu fundal radial fade in spate sa ascunda grilajul fara muchie) */}
          <div
            className="lg:hidden relative flex items-center justify-center"
            style={{ width: 220, height: 220 }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(circle, var(--bg) 35%, var(--bg) 50%, transparent 75%)",
              }}
            />
            <div className="relative" style={{ zIndex: 2 }}>
              <MiniGlobe size={160} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
