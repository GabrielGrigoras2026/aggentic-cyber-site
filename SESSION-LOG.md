# SESSION LOG

---

## 2026-05-21

### Ce s-a făcut
- **Secțiunea Proiecte + Contact** (unificată, split 50/50): titlu "Proiecte care au făcut diferența" + imagine workspace Unsplash (`/public/proiecte.jpg`, 2.5MB) în stânga, formular Contact în dreapta
- **Formular Contact**: 5 câmpuri (nume, email, serviciu, buget, mesaj), submit prin `mailto:gabrielgrigoras2000@yahoo.com` cu subject + body precompletat
- **Stiluri input**: border verde la focus prin clasa `.contact-input` în globals.css
- **Animații**: slide-in din stânga (imagine) și dreapta (formular), `whileInView` cu delay
- Ancore: `#proiecte` pe secțiune, `#contact` pe div-ul formular pentru link-urile din navbar

### Pași anteriori în aceeași sesiune
- Înlocuit text descriere Hero (RO+EN) cu varianta nouă, font mărit de 1.5×
- Cifrele 01-04 din Proces: verde palid (în umbră) → verde aprins la hover
- Border animat carduri rescris cu CSS `conic-gradient` + `@property` (zero SVG, fără acumulare GPU)
- Fix performanță glob: `IntersectionObserver` + `frameloop="never"` când nu e vizibil → eliminate snap-urile ciclice de animație border
- Dimensiuni egale carduri Servicii + Proces (height: 300px), cifre poziționate cu `.proces-nr`
- Animație fade-in glob la încărcare (fără scale ca să nu-l deformeze)
- Fundal dark permanent pe `html`+`body` (gata flash-ul alb splash→hero)
- Re-adăugat keyframe `marquee` care fusese șters accidental

### Commits sesiune
- `37ea27e` feat: add proces section and animated border card hover effect
- `3053352` fix: animated card border with conic-gradient and pause globe rendering offscreen
- `01b4a1a` feat: update hero copy and add green glow to proces card numbers
- `61ef64b` feat: add combined proiecte + contact section with workspace image **(nepushat)**

### Următor pas
- Push pe GitHub commit-ul `61ef64b` când e gata
- Footer (ultimul pas din PLAN-homepage.md)
- Deploy Vercel

---

## 2026-05-18

### Ce s-a făcut
- Splash screen: siglă crește de la 10% la 80vh, animație spring, text pulsant "Apasă orice tastă", funcțional și cu touchpad/click
- Navbar extras ca component separat (`components/navbar.tsx`), `fixed` top-0 — rămâne sus la orice scroll
- Buton EN/RO în navbar, context global `LangProvider` în layout — Hero și Servicii traduse complet
- Secțiunea Servicii: 12 carduri în grid 4x3, animații whileInView, hover cu scale 1.05 + border teal
- Glob 3D: detecție ocean inversată (exclude albastru dominant), gheață arctică exclusă la lat>75, densitate 100%, viteză 0.001125
- Push pe GitHub: https://github.com/GabrielGrigoras2026/aggentic-cyber-site

### Commit
`58096c5` — feat: add navbar, lang toggle, servicii section and globe improvements

### Următor pas
- Secțiunea Proces (Pas 5 din PLAN-homepage.md)
