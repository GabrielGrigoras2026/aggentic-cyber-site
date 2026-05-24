# SESSION LOG

---

## 2026-05-24

### Ce s-a făcut

- **Reactivat animația grilei footer** pe toate dimensiunile (mobil + tabletă + desktop). Pe device real (Samsung mobil) nu pâlpâie — flicker-ul vizibil aseară era artefact de DevTools simulator.
- **Fix popup muzică pe mobil mic**: extins full-width (4% gutters), nu mai iese din ecran spre stânga. De la 640px revine la `right: 4%` cu min-width 260px.
- **Fix fețe Proces pe mobil mic**: reduse de la 180px la 130px sub 640px (nu mai cuprindeau ambele pe ecran de 412px). Tabletă rămâne 180px, desktop 280px.
- **PWA manifest** adăugat (`public/manifest.json`) + meta `theme-color`, `apple-web-app-capable`, `viewport-fit: cover`. Scop: stabilizare navbar pe mobil când bara Chrome apare/dispare la scroll.
- **Fix sizes iconițe manifest** (sigla reală e 1254×1254, era declarată 512×512). Adăugate fallback-uri 192/512. Scos `purpose: maskable` (sigla cu transparență ar fi tăiată).
- **Conectare Git→Vercel** încercată via CLI (`vercel git connect`). CLI a raportat "already connected", dar dashboard-ul tot afișează "No Production Deployment" — webhook GitHub→Vercel probabil nu e configurat complet. Empty commit pentru trigger nu a generat deploy automat.

### Probleme rămase / Next

- **Dashboard Vercel** afișează "No Production Deployment" pentru `aggentic-cyber-site` deși deployment-urile există și funcționează. Soluție probabilă: Disconnect + Connect Git din Settings dashboard.
- **Iconița PWA**: după instalarea pe homescreen Android, iconița nu apare. Manifest valid acum, dar comportamentul Chrome incert. De testat cu reinstalare după ultimul commit.
- **Navbar mișcare pe scroll mobil**: schimbările dvh + theme-color reduc reflow-ul, dar bara Chrome tot apare/dispare. Soluție completă doar prin PWA standalone.

### Commits sesiune (toate împinse pe origin/main)

- `a45011f` feat: enable footer grid animation on all viewport sizes
- `f80bd71` fix: shrink music popover and proces faces on small phones
- `859265f` feat: PWA manifest and dvh viewport for stable mobile navbar
- `5a6bb6e` fix: correct PWA manifest icon sizes
- `ec80c3b` chore: trigger Vercel auto-deploy via Git integration

### Vercel

- Production deployment activ (ultim: `8v21nw5fj`, Ready, acum 5 min)
- URL stabil: <https://aggentic-cyber-site.vercel.app>

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
