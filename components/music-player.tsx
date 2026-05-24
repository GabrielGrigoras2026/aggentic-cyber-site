"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/lang-context";
import { useMusic, ARTISTS, type Song } from "@/lib/music-context";

/**
 * Butonul de muzica din navbar + popup-ul cu alegere artist/melodie.
 * Starea audio + indicatorul vin din MusicProvider (lib/music-context).
 */

const T = {
  ro: {
    label: "Muzica",
    pick: "Alege artistul",
    back: "← Înapoi",
    stop: "Oprește muzica",
  },
  en: {
    label: "Music",
    pick: "Choose an artist",
    back: "← Back",
    stop: "Stop music",
  },
};

export default function MusicPlayer() {
  const { lang } = useLang();
  const t = T[lang];
  const { playing, pickSong, stop } = useMusic();
  const [open, setOpen] = useState(false);
  const [expandedArtist, setExpandedArtist] = useState<string | null>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Inchide popup la click in afara / Escape
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (popoverRef.current?.contains(target)) return;
      if (buttonRef.current?.contains(target)) return;
      setOpen(false);
      setExpandedArtist(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setExpandedArtist(null);
      }
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const handlePick = (artistKey: string, song: Song) => {
    pickSong(artistKey, song);
    setOpen(false);
    setExpandedArtist(null);
  };

  const handleStop = () => {
    stop();
    setOpen(false);
    setExpandedArtist(null);
  };

  const toggleButton = () => {
    setOpen((v) => !v);
    setExpandedArtist(null);
  };

  const isPlaying = playing !== null;

  return (
    <>
      <button
        ref={buttonRef}
        onClick={toggleButton}
        aria-label={t.label}
        title={t.label}
        className="relative w-9 h-9 rounded-full flex items-center justify-center transition-all"
        style={{
          border: `1px solid ${isPlaying ? "var(--primary)" : "var(--border)"}`,
          color: isPlaying ? "var(--primary)" : "var(--muted)",
          background: "transparent",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M9 17.5V6l11-2v10.5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="7" cy="17.5" r="2.5" />
          <circle cx="18" cy="14.5" r="2.5" />
        </svg>
        {isPlaying && (
          <span
            className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full"
            style={{
              background: "var(--primary)",
              boxShadow: "0 0 8px var(--primary)",
              animation: "pulse 1.6s ease-in-out infinite",
            }}
          />
        )}
      </button>

      {open && (
        <div
          ref={popoverRef}
          className="music-popover absolute top-full mt-3 rounded-xl p-4 shadow-2xl"
          style={{
            background: "rgba(10, 12, 18, 0.95)",
            border: "1px solid var(--border)",
            backdropFilter: "blur(12px)",
            zIndex: 60,
          }}
        >
          <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "var(--muted)" }}>
            {expandedArtist ? ARTISTS[expandedArtist].title : t.pick}
          </p>

          {!expandedArtist && (
            <div className="flex flex-col gap-1.5">
              {Object.entries(ARTISTS).map(([key, artist]) => {
                const active = playing?.artistKey === key;
                return (
                  <button
                    key={key}
                    onClick={() => setExpandedArtist(key)}
                    className="text-left px-3 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center justify-between"
                    style={{
                      background: active ? "rgba(0, 230, 195, 0.12)" : "transparent",
                      color: active ? "var(--primary)" : "var(--text)",
                      border: `1px solid ${active ? "var(--primary)" : "transparent"}`,
                    }}
                  >
                    <span>{active ? "▶ " : ""}{artist.title}</span>
                    <span style={{ color: "var(--muted)" }}>›</span>
                  </button>
                );
              })}
            </div>
          )}

          {expandedArtist && (
            <>
              <button
                onClick={() => setExpandedArtist(null)}
                className="text-xs uppercase tracking-widest mb-3"
                style={{ color: "var(--muted)" }}
              >
                {t.back}
              </button>
              <div className="flex flex-col gap-1">
                {ARTISTS[expandedArtist].songs.map((song) => {
                  const active = playing?.song.file === song.file;
                  return (
                    <button
                      key={song.file}
                      onClick={() => handlePick(expandedArtist, song)}
                      className="text-left px-3 py-2 rounded-lg text-sm transition-all"
                      style={{
                        background: active ? "rgba(0, 230, 195, 0.12)" : "transparent",
                        color: active ? "var(--primary)" : "var(--text)",
                        border: `1px solid ${active ? "var(--primary)" : "transparent"}`,
                      }}
                    >
                      {active ? "▶ " : ""}{song.title}
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {isPlaying && (
            <button
              onClick={handleStop}
              className="mt-3 w-full text-xs uppercase tracking-widest py-2 rounded-lg transition-all"
              style={{
                color: "var(--muted)",
                border: "1px solid var(--border)",
                background: "transparent",
              }}
            >
              ◼ {t.stop}
            </button>
          )}
        </div>
      )}

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.3); opacity: 0.6; }
        }
      `}</style>
    </>
  );
}
