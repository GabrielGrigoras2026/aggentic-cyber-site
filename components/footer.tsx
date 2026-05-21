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

      <div className="relative w-full px-12 pt-12 pb-0" style={{ maxWidth: "1500px", margin: "0 auto", zIndex: 2 }}>
        {/* Grid principal: logo+desc (st compact), servicii+marketing (dr, aliniate jos) */}
        <div className="grid grid-cols-12 gap-12 items-end">
          {/* Stanga: logo + descriere + social - compact, impins spre dreapta */}
          <div className="col-span-4 flex flex-col gap-5" style={{ paddingLeft: "5rem" }}>
            <div className="relative" style={{ width: 320, height: 120 }}>
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

          {/* Mini-glob centrat pe axa verticala a siglei (50% din pagina) */}
          <div className="footer-globe-center">
            <MiniGlobe size={170} />
          </div>

          {/* Dreapta: tronson Servicii + Marketing */}
          <div className="col-span-8 flex justify-end gap-24" style={{ paddingRight: "4rem" }}>
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
          <div className="flex items-center text-sm" style={{ color: "var(--muted)" }}>
            {/* Stanga: copyright aliniat sub logo (paddingLeft: 5rem ca block-ul logo) */}
            <span style={{ paddingLeft: "5rem" }} className="flex-1">
              © {year} aGGentic cyber. {t.rights}
            </span>
            {/* Dreapta: legal aliniat sub coloanele Servicii+Marketing (paddingRight: 4rem ca tronson) */}
            <div className="flex gap-8" style={{ paddingRight: "4rem" }}>
              {t.legal.map((l) => (
                <a key={l.label} href={l.href} className="footer-link">
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grid 3D in perspectiva (caroiaj cyber) + sigla peste */}
      <div className="footer-grid-3d">
        <div className="footer-grid-sigla">
          <div
            className="relative overflow-hidden"
            style={{
              width: 300,
              height: 300,
              borderRadius: "24px",
              background: "var(--bg)",
              boxShadow: "0 20px 60px rgba(0, 230, 195, 0.18)",
            }}
          >
            <Image src="/sigla.png" alt="aGGentic cyber" fill style={{ objectFit: "cover" }} />
          </div>
        </div>
      </div>
    </footer>
  );
}
