"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useLang } from "@/lib/lang-context";
import MusicPlayer from "@/components/music-player";
import MusicIndicator from "@/components/music-indicator";

const NAV = {
  ro: { links: ["Servicii", "Proces", "Proiecte", "Contact"], hrefs: ["#servicii", "#proces", "#proiecte", "#contact"], cta: "Începe acum" },
  en: { links: ["Services", "Process", "Projects", "Contact"], hrefs: ["#servicii", "#proces", "#proiecte", "#contact"], cta: "Get Started" },
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

function Hamburger({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Meniu"
      className="w-9 h-9 rounded-full flex flex-col items-center justify-center gap-1 transition-all"
      style={{ border: "1px solid var(--border)", background: "transparent" }}
    >
      <span
        className="block transition-all"
        style={{
          width: "16px",
          height: "2px",
          background: "var(--muted)",
          transform: open ? "translateY(3px) rotate(45deg)" : "none",
        }}
      />
      <span
        className="block transition-all"
        style={{
          width: "16px",
          height: "2px",
          background: "var(--muted)",
          transform: open ? "translateY(-3px) rotate(-45deg)" : "none",
        }}
      />
    </button>
  );
}

export default function Navbar() {
  const { lang } = useLang();
  const nav = NAV[lang];
  const [menuOpen, setMenuOpen] = useState(false);

  // Inchide meniul mobil cu Escape
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex flex-col"
      style={{ paddingLeft: "4%", paddingRight: "4%", paddingTop: "0.5rem", paddingBottom: "0.5rem", background: "var(--bg)", borderBottom: "1px solid var(--border)", maxWidth: "100vw", boxSizing: "border-box", transform: "translateZ(0)", willChange: "transform" }}
    >
    <div className="flex items-start justify-between">
      {/* Logo - mai mic pe mobil */}
      <div className="navbar-logo-wrap">
        <Image
          src="/logo.png"
          alt="aGGentic cyber"
          width={220}
          height={55}
          priority
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>

      {/* Desktop: linkuri + cta + toggle + music */}
      <div className="hidden lg:flex items-center gap-8" style={{ marginTop: "0.75rem" }}>
        {nav.links.map((item, i) => (
          <a key={item} href={nav.hrefs[i]} className="text-sm hover:text-[var(--primary)] transition-colors" style={{ color: "var(--muted)" }}>
            {item}
          </a>
        ))}
        <button
          className="px-5 py-2 rounded text-sm font-semibold transition-all hover:brightness-110"
          style={{ background: "var(--primary)", color: "var(--bg)" }}
        >
          {nav.cta}
        </button>
        <LangToggle />
        <MusicPlayer />
      </div>

      {/* Mobil: doar music + hamburger */}
      <div className="flex lg:hidden items-center gap-3" style={{ marginTop: "0.25rem" }}>
        <MusicPlayer />
        <Hamburger open={menuOpen} onClick={() => setMenuOpen((v) => !v)} />
      </div>
    </div>

    {/* Indicator muzica - parte din navbar (mobile inline, desktop absolute) */}
    <MusicIndicator />

      {/* Mobile drawer */}
      {menuOpen && (
        <div
          className="lg:hidden absolute left-0 right-0 flex flex-col gap-5"
          style={{
            top: "100%",
            background: "var(--bg)",
            borderBottom: "1px solid var(--border)",
            padding: "1.5rem 4%",
            zIndex: 49,
          }}
        >
          {nav.links.map((item, i) => (
            <a
              key={item}
              href={nav.hrefs[i]}
              onClick={() => setMenuOpen(false)}
              className="text-base font-semibold"
              style={{ color: "var(--text)" }}
            >
              {item}
            </a>
          ))}
          <button
            onClick={() => setMenuOpen(false)}
            className="px-5 py-3 rounded text-sm font-semibold mt-2"
            style={{ background: "var(--primary)", color: "var(--bg)" }}
          >
            {nav.cta}
          </button>
          <div className="flex justify-start pt-2">
            <LangToggle />
          </div>
        </div>
      )}
    </header>
  );
}
