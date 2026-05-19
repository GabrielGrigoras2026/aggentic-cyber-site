"use client";

import { motion } from "framer-motion";
import { useLang } from "@/lib/lang-context";
import AnimatedBorderCard from "@/components/animated-border-card";

const SERVICII = {
  ro: [
    { icon: "⚡", tag: "Automation", titlu: "Automatizare AI", desc: "Elimină munca repetitivă cu pipeline-uri inteligente. Scalează operațiunile fără să scalezi echipa." },
    { icon: "🎨", tag: "Design", titlu: "Web Design", desc: "Interfețe pixel-perfect construite cu intenție. Fiecare detaliu are un scop, fiecare element contează." },
    { icon: "</>", tag: "Dev", titlu: "Dezvoltare Web", desc: "Aplicații performante construite cu tehnologii moderne. Cod curat, încărcare rapidă, fiabilitate excepțională." },
    { icon: "⬡", tag: "SaaS", titlu: "Dezvoltare SaaS", desc: "De la MVP la platformă enterprise. Construim produse software care generează venituri recurente." },
    { icon: "◎", tag: "Paid Ads", titlu: "Meta Ads", desc: "Campanii bazate pe date care convertesc. Optimizăm fiecare parametru pentru ROI maxim pe Facebook și Instagram." },
    { icon: "↗", tag: "Paid Ads", titlu: "TikTok Ads", desc: "Strategii virale cu targetare chirurgicală pe cea mai rapid crescătoare platformă din lume." },
    { icon: "▲", tag: "Growth", titlu: "Optimizare Funnel", desc: "Identificăm punctele de fricțiune și construim căi de conversie care transformă vizitatorii în clienți." },
    { icon: "💼", tag: "Sales", titlu: "Sisteme de Vânzări", desc: "Infrastructură scalabilă: CRM, secvențe de email și follow-up-uri automate care închid contracte 24/7." },
    { icon: "◈", tag: "Brand", titlu: "Branding", desc: "Identități de brand strategice care comandă atenția și construiesc recunoaștere durabilă pe piețe competitive." },
    { icon: "✦", tag: "Brand", titlu: "Design Logo", desc: "Mărci distinctive care îți surprind esența. Design-uri atemporale care funcționează pe orice mediu și scară." },
    { icon: "⇄", tag: "Social", titlu: "Automatizări Social Media", desc: "Programare inteligentă, auto-engagement și pipeline-uri de conținut AI care îți cresc audiența pe pilot automat." },
    { icon: "▶", tag: "Creative", titlu: "Editare Video", desc: "Producție video short-form și long-form. De la footage brut la conținut șlefuit, gata de publicat." },
  ],
  en: [
    { icon: "⚡", tag: "Automation", titlu: "AI Automation", desc: "Eliminate repetitive work with intelligent pipelines. Scale operations without scaling headcount." },
    { icon: "🎨", tag: "Design", titlu: "Web Design", desc: "Pixel-perfect interfaces crafted with intention. Every detail serves a purpose, every element counts." },
    { icon: "</>", tag: "Dev", titlu: "Web Development", desc: "High-performance applications built with modern stacks. Clean code, fast load times, exceptional reliability." },
    { icon: "⬡", tag: "SaaS", titlu: "SaaS Development", desc: "From MVP to enterprise-grade platform. We architect software products that generate recurring revenue." },
    { icon: "◎", tag: "Paid Ads", titlu: "Meta Ads", desc: "Data-driven campaigns that convert. We optimize every parameter for maximum ROI across Facebook & Instagram." },
    { icon: "↗", tag: "Paid Ads", titlu: "TikTok Ads", desc: "Viral-ready strategies paired with surgical ad targeting on the world's fastest-growing platform." },
    { icon: "▲", tag: "Growth", titlu: "Funnel Optimization", desc: "Identify friction points and engineer conversion paths that turn browsers into buyers." },
    { icon: "💼", tag: "Sales", titlu: "Sales Systems", desc: "Scalable infrastructure: CRM setup, email sequences, and automated follow-ups that close deals 24/7." },
    { icon: "◈", tag: "Brand", titlu: "Branding", desc: "Strategic brand identities that command attention and build lasting recognition in competitive markets." },
    { icon: "✦", tag: "Brand", titlu: "Logo Design", desc: "Distinctive marks that capture your essence. Timeless designs that work across every medium and scale." },
    { icon: "⇄", tag: "Social", titlu: "Social Media Automation", desc: "Intelligent scheduling, auto-engagement, and AI-generated content pipelines that grow your audience on autopilot." },
    { icon: "▶", tag: "Creative", titlu: "Video Editing", desc: "Short-form and long-form video production. From raw footage to polished, platform-ready content." },
  ],
};

const HEADER = {
  ro: { tag: "Ce facem", titlu: "Serviciile noastre", cta: "Află mai mult" },
  en: { tag: "What we do", titlu: "Our Services", cta: "Learn more" },
};

export default function ServiciiSection() {
  const { lang } = useLang();
  const servicii = SERVICII[lang];
  const header = HEADER[lang];

  return (
    <section id="servicii" className="py-24 flex flex-col items-center" style={{ background: "var(--bg)" }}>
      <div className="w-full px-12" style={{ maxWidth: "1400px" }}>
        {/* Header */}
        <motion.div
          className="text-center"
          style={{ marginBottom: "4rem" }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl font-black" style={{ color: "var(--text)" }}>
            {header.titlu}
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-4 gap-8">
          {servicii.map((s, i) => (
            <motion.div
              key={s.titlu}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
            >
            <AnimatedBorderCard
              className="flex flex-col items-center text-center gap-4 rounded-2xl p-9 cursor-pointer group"
              style={{ background: "var(--surface)", border: "1px solid var(--border)", height: "100%" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-lg font-bold"
                  style={{ background: "rgba(0,230,195,0.15)", color: "var(--primary)" }}
                >
                  {s.icon}
                </div>
                <span
                  className="text-xs px-3 py-1 rounded-full"
                  style={{ background: "var(--surface-2)", color: "var(--muted)" }}
                >
                  {s.tag}
                </span>
              </div>

              <h3 className="text-xl font-bold" style={{ color: "var(--text)" }}>
                {s.titlu}
              </h3>

              <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--muted)" }}>
                {s.desc}
              </p>

              <a
                href="#contact"
                className="text-xs font-bold tracking-widest uppercase flex items-center gap-1 group-hover:gap-2 transition-all"
                style={{ color: "var(--primary)" }}
              >
                {header.cta} <span>›</span>
              </a>
            </AnimatedBorderCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
