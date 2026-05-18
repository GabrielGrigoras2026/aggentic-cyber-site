# PRD: Homepage - Site Personal

## 1. Context
Site personal pentru Gabriel Grigoras, adresat soloprenorilor, freelancerilor și profesioniștilor care trec de la LLM-uri generaliste la instrumente agentice. Vizual inspirat din Kora Digital (structură, tipografie boldă, dark theme) cu paleta de culori de la personalityaiarchitect.com.

## 2. Scope-ul slice-ului
- Hero section cu glob 3D rotativ și manșetă animată spre stânga
- Secțiunea 1: Servicii
- Secțiunea 2: Descriere și beneficii produse
- Secțiunea 3: A process built for results
- Secțiunea 4: Projects that moved the needle
- Secțiunea 5: Let's build something great
- Footer

## 3. Out of scope
- Textele finale (copy-ul definitiv)
- Push spre vânzare sau rezervare call
- Alte pagini în afara homepage-ului

## 4. User stories
- Ca solopreneur curios, vreau să simt curiozitate și focus când intru pe site, ca să fiu atras să explorez secțiunile.
- Ca profesionist obosit de produse aglomerate, vreau o experiență lejeră și aerată, ca să rămân pe pagină fără să mă simt copleșit.

## 5. Constrângeri tehnice
- Next.js 14+ cu App Router
- TypeScript
- Tailwind CSS
- Framer Motion pentru animații UI
- React Three Fiber + Three.js pentru globul 3D

## 6. Acceptance criteria
- [ ] Hero section afișează glob 3D rotativ + manșetă scrolling
- [ ] Toate cele 6 secțiuni sunt prezente pe pagină
- [ ] Design dark theme cu accent colors din paleta personalityaiarchitect.com
- [ ] Pagina e aeriată, fără aglomerație vizuală
- [ ] Animațiile rulează smooth, fără sacadări

## Note
- Copy-ul final se rezolvă într-o sesiune separată
- Paleta exactă de culori (hex) se extrage din personalityaiarchitect.com la faza de plan
