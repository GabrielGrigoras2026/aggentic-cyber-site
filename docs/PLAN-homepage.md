# Plan: Homepage - Site Personal Gabriel Grigoras

## Context
Proiectul este gol (doar CLAUDE.md și docs/PRD-homepage.md). Trebuie inițializat un proiect Next.js 14 cu App Router, TypeScript, Tailwind CSS, Framer Motion și React Three Fiber, apoi construită homepage-ul complet conform PRD.

Design: inspirat din Kora Digital (dark theme, tipografie boldă, layout aerat) cu paleta de culori de la personalityaiarchitect.com.

Copy-ul final este out of scope - se folosesc placeholder-uri.

---

## Pași de execuție

### Pas 1 - Inițializare proiect
- `npx create-next-app@latest` cu flags: TypeScript, Tailwind CSS, App Router, fără src/
- Instalare dependențe: `framer-motion`, `@react-three/fiber`, `@react-three/drei`, `three`
- Verificare: `npm run dev` pornește fără erori

### Pas 2 - Structură foldere și configurare
- Creare foldere: `app/`, `components/`, `components/ui/`, `components/sections/`
- Configurare `tailwind.config.ts`: dark theme, culori custom extrase din personalityaiarchitect.com
- Configurare `globals.css`: font, background negru, reset

### Pas 3 - Hero Section
Fișier: `components/sections/hero-section.tsx`
- Navbar cu logo + linkuri
- Titlu mare bold (2 rânduri, similar Kora)
- Subtitlu text mic
- 2 butoane CTA (placeholder)
- Glob 3D rotativ (React Three Fiber) - dreapta
- Manșetă animată spre stânga (Framer Motion / CSS keyframes) - jos
- Statistici mici (3 valori placeholder)

### Pas 4 - Secțiunea 1: Servicii
Fișier: `components/sections/services-section.tsx`
- Grid cu 3-4 carduri servicii (placeholder text)
- Iconițe simple sau numere
- Design aerat, fără aglomerație

### Pas 5 - Secțiunea 2: Descriere și beneficii
Fișier: `components/sections/about-section.tsx`
- Text descriere (2-3 paragrafe placeholder)
- Listă beneficii (4-5 puncte)
- Layout două coloane sau full-width

### Pas 6 - Secțiunea 3: Process
Fișier: `components/sections/process-section.tsx`
- Titlu: "A process built for results"
- Pași numerotați (4-5 pași placeholder)
- Layout liniar sau zig-zag

### Pas 7 - Secțiunea 4: Projects
Fișier: `components/sections/projects-section.tsx`
- Titlu: "Projects that moved the needle"
- 2-3 carduri proiecte placeholder
- Imagine/culoare de fundal per card

### Pas 8 - Secțiunea 5: CTA + Footer
Fișier: `components/sections/cta-section.tsx` și `components/sections/footer.tsx`
- CTA: "Let's build something great" + buton contact
- Footer: copyright, linkuri sociale (placeholder)

### Pas 9 - Asamblare în page.tsx
Fișier: `app/page.tsx`
- Import și ordonare toate secțiunile
- Verificare scroll continuu, fără sărituri

### Pas 10 - Review vizual
- Pornire `npm run dev`
- Verificare toate secțiunile sunt prezente
- Verificare glob se învârte, manșeta scrollează
- Verificare responsive de bază (mobile nu e prioritar, dar să nu fie rupt)

---

## Fișiere critice
- `app/page.tsx` - pagina principală
- `app/globals.css` - stiluri globale
- `tailwind.config.ts` - configurare culori
- `components/sections/hero-section.tsx` - cel mai complex
- `package.json` - dependențe

---

## Verificare finală (Acceptance Criteria din PRD)
- [ ] Glob 3D rotativ vizibil în hero
- [ ] Manșetă animată spre stânga
- [ ] 6 secțiuni prezente pe pagină
- [ ] Dark theme cu accent colors
- [ ] Pagina aeriată, fără aglomerație
- [ ] `npm run build` fără erori TypeScript
