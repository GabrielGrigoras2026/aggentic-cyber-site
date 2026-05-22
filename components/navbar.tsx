"use client";

import Image from "next/image";
import { useLang } from "@/lib/lang-context";
import MusicPlayer from "@/components/music-player";

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

export default function Navbar() {
  const { lang } = useLang();
  const nav = NAV[lang];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between py-5"
      style={{ paddingLeft: "4%", paddingRight: "4%", background: "var(--bg)", borderBottom: "1px solid var(--border)" }}
    >
      <Image src="/logo.png" alt="aGGentic cyber" width={220} height={55} priority />
      <div className="flex items-center gap-8">
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
    </header>
  );
}
