"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useLang } from "@/lib/lang-context";
import CyberBg from "@/components/cyber-bg";

const T = {
  ro: {
    h2a: "Proiecte care au făcut",
    h2b: "diferența.",
    desc: "Construim experiențe digitale care convertesc, scalează și rezistă. Iată o privire asupra a ceea ce am livrat.",
    contactTag: "Ia legătura",
    contactH2a: "Începe proiectul",
    contactH2b: "tău astăzi.",
    name: "Numele tău",
    email: "Adresă email",
    service: "Ce serviciu îți trebuie?",
    budget: "Buget estimativ (opțional)",
    message: "Spune-ne despre proiectul tău…",
    send: "Trimite mesajul",
    reply: "Răspundem în 24 de ore",
    noCommit: "Fără obligații",
  },
  en: {
    h2a: "Projects that moved",
    h2b: "the needle.",
    desc: "We build digital experiences that convert, scale, and endure. Here's a glimpse of what we've shipped.",
    contactTag: "Get in touch",
    contactH2a: "Start your",
    contactH2b: "project today.",
    name: "Your name",
    email: "Email address",
    service: "What service do you need?",
    budget: "Budget range (optional)",
    message: "Tell us about your project…",
    send: "Send message",
    reply: "We reply within 24 hours",
    noCommit: "No commitment required",
  },
};

const TO_EMAIL = "gabrielgrigoras2000@yahoo.com";

export default function ProiecteContactSection() {
  const { lang } = useLang();
  const t = T[lang];
  const [form, setForm] = useState({ name: "", email: "", service: "", budget: "", message: "" });

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`[Proiect nou] ${form.name || "Necunoscut"} — ${form.service || "—"}`);
    const body = encodeURIComponent(
      `Nume: ${form.name}\n` +
      `Email: ${form.email}\n` +
      `Serviciu: ${form.service}\n` +
      `Buget: ${form.budget || "—"}\n\n` +
      `Mesaj:\n${form.message}`
    );
    window.location.href = `mailto:${TO_EMAIL}?subject=${subject}&body=${body}`;
  };

  const inputStyle: React.CSSProperties = {
    background: "rgba(10, 15, 25, 0.55)",
    border: "1px solid rgba(255, 255, 255, 0.18)",
    borderRadius: "12px",
    padding: "1rem 1.25rem",
    color: "var(--text)",
    fontSize: "1rem",
    outline: "none",
    width: "100%",
    transition: "border-color 0.2s ease",
    backdropFilter: "blur(8px)",
  };

  return (
    <section id="proiecte" className="proiecte-section relative">
      {/* Background cyber - umple toata sectiunea */}
      <CyberBg />

      {/* Overlay dark pentru contrast */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, rgba(5,10,22,0.45) 0%, rgba(5,10,22,0.7) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Continut peste fundal */}
      <div className="relative w-full px-5 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16" style={{ maxWidth: "1500px", margin: "0 auto", zIndex: 2 }}>
        {/* LEFT: Proiecte */}
        <motion.div
          className="flex flex-col lg:justify-end proiecte-left"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2
            className="leading-none proiecte-title"
            style={{
              fontFamily: "var(--font-archivo-black)",
              color: "#E8C547",
              textShadow: "0 0 30px rgba(232,197,71,0.35), 0 0 60px rgba(232,197,71,0.18)",
            }}
          >
            {t.h2a}{" "}
            <span style={{ color: "#E8C547" }}>{t.h2b}</span>
          </h2>
          <p className="mt-6 lg:mt-8 text-base lg:text-xl leading-relaxed proiecte-flash">
            {t.desc}
          </p>
        </motion.div>

        {/* RIGHT: Contact */}
        <motion.div
          id="contact"
          className="flex flex-col"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <p className="text-sm tracking-widest uppercase mb-3" style={{ color: "var(--primary)" }}>
            {t.contactTag}
          </p>
          <h2 className="text-3xl md:text-5xl font-black leading-tight" style={{ color: "var(--text)" }}>
            {t.contactH2a}{" "}
            <span style={{ color: "var(--text)" }}>{t.contactH2b}</span>
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8 lg:mt-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" required placeholder={t.name} value={form.name} onChange={update("name")} style={inputStyle} className="contact-input" />
              <input type="email" required placeholder={t.email} value={form.email} onChange={update("email")} style={inputStyle} className="contact-input" />
            </div>
            <input type="text" required placeholder={t.service} value={form.service} onChange={update("service")} style={inputStyle} className="contact-input" />
            <input type="text" placeholder={t.budget} value={form.budget} onChange={update("budget")} style={inputStyle} className="contact-input" />
            <textarea
              required
              placeholder={t.message}
              value={form.message}
              onChange={update("message")}
              rows={5}
              style={{ ...inputStyle, resize: "vertical", minHeight: "130px", fontFamily: "inherit" }}
              className="contact-input"
            />

            <motion.button
              type="submit"
              className="rounded-xl py-4 font-bold tracking-widest uppercase text-base mt-2"
              style={{ background: "rgba(10, 15, 25, 0.7)", backdropFilter: "blur(8px)", border: "1.5px solid var(--primary)", color: "var(--primary)" }}
              whileHover={{ background: "var(--primary)", color: "var(--bg)", scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              {t.send} →
            </motion.button>

            <div className="flex justify-center gap-6 text-sm mt-1" style={{ color: "rgba(255,255,255,0.7)" }}>
              <span>✓ {t.reply}</span>
              <span>✓ {t.noCommit}</span>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
