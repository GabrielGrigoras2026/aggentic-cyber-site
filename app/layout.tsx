import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Bagel_Fat_One, Sigmar, Archivo_Black } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/lib/lang-context";
import { MusicProvider } from "@/lib/music-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bagelFat = Bagel_Fat_One({
  variable: "--font-bagel",
  subsets: ["latin"],
  weight: "400",
});

const sigmar = Sigmar({
  variable: "--font-sigmar",
  subsets: ["latin"],
  weight: "400",
});

const archivoBlack = Archivo_Black({
  variable: "--font-archivo-black",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "aGGentic cyber",
  description: "Agentic AI Full Service",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "aGGentic",
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${bagelFat.variable} ${sigmar.variable} ${archivoBlack.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col"><LangProvider><MusicProvider>{children}</MusicProvider></LangProvider></body>
    </html>
  );
}
