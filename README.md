# Portfolio v4 — Futuristic IT Edition

Next.js 16 + GSAP + Lenis = butter-smooth scroll dengan efek cinematic.


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
    └── data.ts           ← 
```

