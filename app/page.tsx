"use client";

import { useState } from "react";
import SplashScreen from "@/components/splash-screen";
import Navbar from "@/components/navbar";
import HeroSection from "@/components/sections/hero-section";
import ServiciiSection from "@/components/sections/servicii-section";
import ProcesSection from "@/components/sections/proces-section";
import ProiecteContactSection from "@/components/sections/proiecte-contact-section";
import Footer from "@/components/footer";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {showSplash && <SplashScreen onDone={() => setShowSplash(false)} />}
      {!showSplash && (
        <>
          <Navbar />
          <HeroSection />
          <ServiciiSection />
          <ProcesSection />
          <ProiecteContactSection />
          <Footer />
        </>
      )}
    </>
  );
}
