"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/lang-context";

/**
 * Player de muzica in navbar.
 * - Click pe buton -> popup cu artisti -> melodii
 * - Foloseste YouTube IFrame API (cu control programatic playVideo/seekTo)
 * - Indicator "Now playing" + bara de progres click-abila sub navbar, in dreapta
 *
 * Editare lista:
 *  - Schimba/sterge/adauga linii in array-ul "songs" pentru fiecare artist.
 *  - videoId = codul dupa "v=" din URL YouTube. Ex: watch?v=8m41kSatdjE -> "8m41kSatdjE"
 */

type Song = { title: string; videoId: string };
type Artist = { title: string; songs: Song[] };

const ARTISTS: Record<string, Artist> = {
  vangelis: {
    title: "Vangelis",
    songs: [
      { title: "Chariots of Fire", videoId: "8m41kSatdjE" },
      { title: "Conquest of Paradise", videoId: "RsS3HMHGdjY" },
      { title: "1492 - Main Theme", videoId: "fOdL95FH8e8" },
      { title: "Hymn", videoId: "wWaUCi08yxA" },
      { title: "Pulstar", videoId: "5LB6IxWdSsk" },
      { title: "Alpha", videoId: "OBxRQbeUDsM" },
    ],
  },
  jarre: {
    title: "Jean Michel Jarre",
    songs: [
      { title: "Oxygène Part IV", videoId: "C0DPdy98e4c" },
      { title: "Equinoxe Part 5", videoId: "z5XgY9ynyJk" },
      { title: "Magnetic Fields Part 2", videoId: "5gMjJ_pXFNw" },
      { title: "Rendez-Vous II", videoId: "kqv_HC9I0CY" },
      { title: "Chronologie Part 4", videoId: "yYBaaB6tuOI" },
      { title: "Oxygène Part 2", videoId: "rXKZkrIxFAw" },
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

declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

// Loader global pentru YouTube IFrame API (o singura data).
let ytApiPromise: Promise<void> | null = null;
function loadYouTubeAPI(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.YT && window.YT.Player) return Promise.resolve();
  if (ytApiPromise) return ytApiPromise;
  ytApiPromise = new Promise((resolve) => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
    window.onYouTubeIframeAPIReady = () => resolve();
  });
  return ytApiPromise;
}

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
  const playerHostRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const tickRef = useRef<number | null>(null);

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

  // Cand "playing" se schimba: incarca API + creeaza/actualizeaza player-ul.
  useEffect(() => {
    if (!playing) {
      // Distruge player-ul existent
      if (playerRef.current?.destroy) {
        try {
          playerRef.current.destroy();
        } catch {}
        playerRef.current = null;
      }
      setCurrent(0);
      setDuration(0);
      if (tickRef.current) {
        cancelAnimationFrame(tickRef.current);
        tickRef.current = null;
      }
      return;
    }

    let cancelled = false;
    loadYouTubeAPI().then(() => {
      if (cancelled) return;
      const YT = window.YT;
      if (!YT || !playerHostRef.current) return;

      // Daca avem deja un player, doar schimbam video-ul
      if (playerRef.current && playerRef.current.loadVideoById) {
        playerRef.current.loadVideoById(playing.song.videoId);
        try {
          playerRef.current.unMute();
          playerRef.current.playVideo();
        } catch {}
        return;
      }

      playerRef.current = new YT.Player(playerHostRef.current, {
        videoId: playing.song.videoId,
        width: "1",
        height: "1",
        playerVars: {
          autoplay: 1,
          controls: 0,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
        },
        events: {
          onReady: (e: any) => {
            try {
              e.target.unMute();
              e.target.setVolume(80);
              e.target.playVideo();
              setDuration(e.target.getDuration() || 0);
            } catch {}
          },
          onStateChange: (e: any) => {
            // 1 = playing, 0 = ended
            if (e.data === 1) {
              setDuration(e.target.getDuration() || 0);
            }
            if (e.data === 0) {
              // Loop manual
              try {
                e.target.seekTo(0, true);
                e.target.playVideo();
              } catch {}
            }
          },
        },
      });
    });

    return () => {
      cancelled = true;
    };
  }, [playing]);

  // Polling pentru pozitia curenta (cu requestAnimationFrame, ~4x/sec)
  useEffect(() => {
    if (!playing) return;
    let last = 0;
    const loop = (ts: number) => {
      if (ts - last > 250) {
        last = ts;
        const p = playerRef.current;
        if (p && p.getCurrentTime) {
          try {
            const c = p.getCurrentTime() || 0;
            const d = p.getDuration() || 0;
            setCurrent(c);
            if (d && d !== duration) setDuration(d);
          } catch {}
        }
      }
      tickRef.current = requestAnimationFrame(loop);
    };
    tickRef.current = requestAnimationFrame(loop);
    return () => {
      if (tickRef.current) cancelAnimationFrame(tickRef.current);
      tickRef.current = null;
    };
  }, [playing, duration]);

  const pickSong = (artistKey: string, song: Song) => {
    setPlaying({ artistKey, song });
    setOpen(false);
    setExpandedArtist(null);
  };

  const stop = () => {
    setPlaying(null);
    setOpen(false);
    setExpandedArtist(null);
  };

  const toggleButton = () => {
    setOpen((v) => !v);
    setExpandedArtist(null);
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!playerRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    try {
      playerRef.current.seekTo(ratio * duration, true);
      setCurrent(ratio * duration);
    } catch {}
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

      {/* Indicator + bara progres sub navbar, in dreapta */}
      {isPlaying && (
        <div
          className="fixed flex flex-col items-center gap-1.5"
          style={{ top: "76px", right: "4%", zIndex: 40, width: "320px" }}
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
                className="absolute top-0 left-0 h-full rounded-full transition-all"
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
                  const active = playing?.song.videoId === song.videoId;
                  return (
                    <button
                      key={song.videoId}
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

      {/* Host pentru YouTube IFrame API (player invizibil, dar in viewport). */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          right: 0,
          width: "1px",
          height: "1px",
          opacity: 0.01,
          pointerEvents: "none",
          zIndex: -1,
          overflow: "hidden",
        }}
      >
        <div ref={playerHostRef} />
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.3); opacity: 0.6; }
        }
      `}</style>
    </>
  );
}
