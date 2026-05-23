"use client";

import { createContext, useContext, useState, ReactNode, useRef, useEffect } from "react";

export type Song = { title: string; file: string };
export type Artist = { title: string; songs: Song[] };

export const ARTISTS: Record<string, Artist> = {
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

type Playing = { artistKey: string; song: Song };

interface MusicContextValue {
  playing: Playing | null;
  current: number;
  duration: number;
  pickSong: (artistKey: string, song: Song) => void;
  stop: () => void;
  seekRatio: (ratio: number) => void;
}

const MusicContext = createContext<MusicContextValue | null>(null);

export function MusicProvider({ children }: { children: ReactNode }) {
  const [playing, setPlaying] = useState<Playing | null>(null);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Creeaza elementul audio o singura data
  useEffect(() => {
    const audio = new Audio();
    audio.preload = "metadata";
    audioRef.current = audio;

    const onTime = () => setCurrent(audio.currentTime);
    const onMeta = () => setDuration(audio.duration);
    const onEnded = () => {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    };

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("ended", onEnded);
      audio.pause();
    };
  }, []);

  // Cand se schimba "playing", incarca si porneste
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !playing) return;
    audio.src = playing.song.file;
    audio.load();
    audio.volume = 0.8;
    audio.play().catch((err) => console.warn("audio play blocked:", err));
  }, [playing]);

  const pickSong = (artistKey: string, song: Song) => {
    setPlaying({ artistKey, song });
  };

  const stop = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    setPlaying(null);
    setCurrent(0);
    setDuration(0);
  };

  const seekRatio = (ratio: number) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const clamped = Math.max(0, Math.min(1, ratio));
    audio.currentTime = clamped * duration;
    setCurrent(clamped * duration);
  };

  return (
    <MusicContext.Provider value={{ playing, current, duration, pickSong, stop, seekRatio }}>
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useMusic must be used within MusicProvider");
  return ctx;
}
