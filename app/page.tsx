"use client";

import { useState } from "react";
import SplashScreen from "@/components/splash-screen";
import HeroSection from "@/components/sections/hero-section";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {showSplash && <SplashScreen onDone={() => setShowSplash(false)} />}
      {!showSplash && <HeroSection />}
    </>
  );
}
