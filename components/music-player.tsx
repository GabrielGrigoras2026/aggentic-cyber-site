"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/lang-context";

/**
 * Player de muzica in navbar (MP3-uri locale).
 * - Click pe buton -> popup cu artisti -> melodii
 * - Foloseste <audio> HTML5 (control complet, fara dependinte externe)
 * - Indicator "Now playing" + bara de progres click-abila sub navbar
 *
 * Editare lista:
 *  - Pune fisierele MP3 in /public/music/
 *  - Schimba/sterge/adauga linii in array-ul "songs" pentru fiecare artist.
 *  - "file" = calea relativa la /public (ex: "/music/foo.mp3")
 *  - "title" = ce vrei sa apara in popup (orice text).
 */

type Song = { title: string; file: string };
type Artist = { title: string; songs: Song[] };

const ARTISTS: Record<string, Artist> = {
  enigma: {
    title: "Enigma",
    songs: [
      { title: "Return to Innocence", file: "/music/enigma-return-to-innocence.mp3" },
      { title: "Mea Culpa", file: "/music/enigma-mea-culpa.mp3" },
      { title: "Principles of Lust", file: "/music/enigma-principles-of-lust.mp3" },
      { title: "Back to the Rivers of Belief", file: "/music/enigma-back-to-the-rivers-of-belief.mp3" },
    ],
  },
};

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

function fmt(sec: number): string {
  if (!isFinite(sec) || sec < 0) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function MusicPlayer() {
  const { lang } = useLang();
  const t = T[lang];
  const [open, setOpen] = useState(false);
  const [expandedArtist, setExpandedArtist] = useState<string | null>(null);
  const [playing, setPlaying] = useState<{ artistKey: string; song: Song } | null>(null);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  const popoverRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

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

  // Cand se schimba melodia, porneste audio
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !playing) return;
    audio.src = playing.song.file;
    audio.load();
    audio.volume = 0.8;
    audio.play().catch((err) => {
      // Daca autoplay e blocat, userul mai face un click sa porneasca
      console.warn("audio play blocked:", err);
    });
  }, [playing]);

  const pickSong = (artistKey: string, song: Song) => {
    setPlaying({ artistKey, song });
    setOpen(false);
    setExpandedArtist(null);
  };

  const stop = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    setPlaying(null);
    setOpen(false);
    setExpandedArtist(null);
  };

  const toggleButton = () => {
    setOpen((v) => !v);
    setExpandedArtist(null);
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audio.currentTime = ratio * duration;
    setCurrent(ratio * duration);
  };

  const isPlaying = playing !== null;
  const progress = duration > 0 ? (current / duration) * 100 : 0;

  return (
    <>
      {/* Buton in navbar */}
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

      {/* Indicator + bara progres, in manseta navbar (sub butoane) */}
      {isPlaying && (
        <div
          className="absolute flex flex-col items-center gap-0.5"
          style={{ top: "4.25rem", right: "4%", zIndex: 40, width: "320px" }}
        >
          <span
            className="text-xs tracking-widest uppercase whitespace-nowrap"
            style={{ color: "var(--muted)" }}
          >
            <span style={{ color: "var(--primary)" }}>♪</span>{" "}
            <span style={{ color: "var(--text)" }}>{playing!.song.title}</span>
            <span style={{ color: "var(--muted)" }}> · {ARTISTS[playing!.artistKey].title}</span>
          </span>

          <div className="w-full flex items-center gap-2">
            <span className="text-[10px] tabular-nums" style={{ color: "var(--muted)" }}>
              {fmt(current)}
            </span>
            <div
              onClick={seek}
              className="flex-1 h-1.5 rounded-full cursor-pointer relative overflow-hidden"
              style={{ background: "var(--border)" }}
              role="slider"
              aria-label="progres melodie"
              aria-valuemin={0}
              aria-valuemax={duration || 0}
              aria-valuenow={current}
            >
              <div
                className="absolute top-0 left-0 h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background: "var(--primary)",
                  boxShadow: "0 0 6px var(--primary)",
                }}
              />
            </div>
            <span className="text-[10px] tabular-nums" style={{ color: "var(--muted)" }}>
              {fmt(duration)}
            </span>
          </div>
        </div>
      )}

      {/* Popup */}
      {open && (
        <div
          ref={popoverRef}
          className="absolute right-[4%] top-full mt-3 rounded-xl p-4 shadow-2xl"
          style={{
            background: "rgba(10, 12, 18, 0.95)",
            border: "1px solid var(--border)",
            backdropFilter: "blur(12px)",
            minWidth: "260px",
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
                      onClick={() => pickSong(expandedArtist, song)}
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
              onClick={stop}
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

      {/* Audio element HTML5 ascuns */}
      <audio
        ref={audioRef}
        onTimeUpdate={(e) => setCurrent((e.target as HTMLAudioElement).currentTime)}
        onLoadedMetadata={(e) => setDuration((e.target as HTMLAudioElement).duration)}
        onEnded={() => {
          const audio = audioRef.current;
          if (audio) {
            audio.currentTime = 0;
            audio.play().catch(() => {});
          }
        }}
        preload="metadata"
      />

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.3); opacity: 0.6; }
        }
      `}</style>
    </>
  );
}
