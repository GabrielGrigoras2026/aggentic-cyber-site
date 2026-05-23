"use client";

import { useMusic, ARTISTS } from "@/lib/music-context";

function fmt(sec: number): string {
  if (!isFinite(sec) || sec < 0) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/**
 * Indicator "Now playing" + bara de progres. Se randeaza direct in navbar.
 * Daca nu canta nimic, intoarce null (nu ocupa loc).
 */
export default function MusicIndicator() {
  const { playing, current, duration, seekRatio } = useMusic();

  if (!playing) return null;

  const progress = duration > 0 ? (current / duration) * 100 : 0;

  const onSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    seekRatio((e.clientX - rect.left) / rect.width);
  };

  return (
    <div className="music-indicator flex flex-col items-center gap-0.5">
      <span
        className="text-xs tracking-widest uppercase text-center"
        style={{ color: "var(--muted)" }}
      >
        <span style={{ color: "var(--primary)" }}>♪</span>{" "}
        <span style={{ color: "var(--text)" }}>{playing.song.title}</span>
        <span style={{ color: "var(--muted)" }}> · {ARTISTS[playing.artistKey].title}</span>
      </span>

      <div className="w-full flex items-center gap-2">
        <span className="text-[10px] tabular-nums" style={{ color: "var(--muted)" }}>
          {fmt(current)}
        </span>
        <div
          onClick={onSeek}
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
  );
}
