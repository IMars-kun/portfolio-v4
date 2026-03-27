# Portfolio v4 — Futuristic IT Edition

Next.js 16 + GSAP + Lenis = butter-smooth scroll dengan efek cinematic.

## 🚀 Quick Start

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## 🏗️ Tech Stack

| Package         | Versi    | Fungsi                                    |
|-----------------|----------|-------------------------------------------|
| next            | 16.1.6   | Framework utama                           |
| react           | ^19.2    | UI library                                |
| gsap            | ^3.12.7  | Animation engine (ScrollTrigger, timeline)|
| @gsap/react     | ^2.1.2   | React hooks untuk GSAP                    |
| lenis           | ^1.3.4   | Smooth scroll engine                      |
| framer-motion   | ^12.0    | Micro-interactions                        |
| next-themes     | ^0.4.4   | Dark/Light mode                           |
| lucide-react    | ^0.475   | Icons                                     |

## 🎬 Arsitektur Animasi

### Kenapa tidak patah saat scroll cepat?

**Lenis** (smooth scroll engine):
- Mengintersep native scroll dan menerapkan lerp easing
- Page bergerak dengan kurva yang natural, bukan stepped
- Driver: `requestAnimationFrame` via GSAP ticker

**GSAP ScrollTrigger dengan `scrub: true`**:
- Animasi terikat **langsung** ke posisi scroll (bukan event)
- `scrub: 1` = animasi ikut scroll dengan sedikit lag (efek momentum)
- Tidak ada "threshold" yang bisa dilewatkan — murni matematika

**Parallax layers** di Hero:
- Background grid: bergerak paling lambat
- Glow orb: medium speed
- Main content: bergerak paling cepat
- Hasil: otak mempersepsikan depth → halaman terasa "frozen"

**`toggleActions: 'play none none reverse'`**:
- `play` = saat masuk viewport, animasi maju
- `reverse` = saat keluar viewport, animasi mundur
- Ini yang membuat animasi "kembali" saat scroll ke atas

**Work section — Horizontal Scroll**:
- Section di-PIN (fixed) selama horizontal scroll berlangsung
- Kartu bergerak horizontal, driven oleh scroll vertikal
- Ini persis efek Stella Sora / Apple / Linear

## 📁 Struktur

```
src/
├── app/
│   ├── globals.css       ← Design tokens, futuristic theme
│   ├── layout.tsx        ← Root + ThemeProvider + SEO
│   └── page.tsx          ← Assembles sections
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx    ← GSAP entrance, glass on scroll
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx      ← Char split + parallax scrub
│   │   ├── About.tsx     ← clipPath photo reveal
│   │   ├── Work.tsx      ← HORIZONTAL SCROLL (the Stella effect)
│   │   ├── Skills.tsx    ← AnimatedBars + counter
│   │   ├── Experience.tsx← Timeline draws on scroll
│   │   └── Contact.tsx
│   └── ui/
│       ├── SmoothScroll.tsx ← Lenis + GSAP integration
│       ├── Cursor.tsx       ← GSAP magnetic cursor
│       ├── Progress.tsx     ← Scroll progress bar
│       └── ThemeToggle.tsx
├── hooks/
│   └── useGsapReveal.ts  ← Reusable GSAP scroll reveal
└── lib/
    └── data.ts           ← ⭐ EDIT KONTEN DI SINI
```

## ✏️ Personalisasi

### 1. Konten → `src/lib/data.ts`
Edit semua text, project, skill, experience.

### 2. Foto → `public/images/photo.jpg`
Rasio ideal: 3:4. Di `About.tsx`, uncomment blok `<Image>`.

### 3. Warna aksen → `src/app/globals.css`
```css
:root, .dark {
  --a:  #6AFFD4;  /* ← cyan-mint, ganti sesuka hati */
  --a2: #A78BFA;  /* ← violet secondary */
}
```

### 4. Form kontak → `src/components/sections/Contact.tsx`
Uncomment Formspree atau API Route, ganti ID.

### 5. SEO → `src/app/layout.tsx`
Update metadata: name, description, url, og image.

## 🌐 Deploy ke Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Vercel otomatis deteksi Next.js 16 dan optimize build.
