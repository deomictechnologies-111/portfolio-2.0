# Deomic Portfolio 20.

**Premium digital experience for Deomic Technologies.**

A world-class, single-file website built around the Deomic brand identity — dark premium UI, electric-violet accent system, Three.js particle field, animated sections, and cinematic interactions.

---

## 🚀 Live Preview

Open `index.html` directly in any modern browser — no build step, no dependencies to install.

---

## ✨ Features

- **3D Particle Field** — Three.js wireframe geometry + floating icosahedron, mouse parallax
- **Custom Cursor** — Smooth lagging cursor with hover state changes
- **Animated Loader** — Brand-first loading screen with progress bar
- **Cinematic Hero** — Staggered masked text reveal on load
- **Scroll Reveals** — IntersectionObserver-driven section animations
- **Count-Up Stats** — Animated number counters triggered on scroll
- **Service Cards** — Magnetic spotlight glow on hover (mouse-tracked radial gradient)
- **Tech Orbit** — CSS-animated rotating technology rings
- **Testimonial Carousel** — Glassmorphism cards, horizontal scroll
- **Dark / Light Mode** — One-click theme toggle
- **Contact Form** — Futuristic input UI with validation feedback
- **Responsive** — Mobile-optimised layout throughout
- **Grain Overlay** — Subtle film grain texture for premium depth

---

## 🎨 Design System

| Token | Value |
|---|---|
| Background | `#05060a` |
| Accent Violet | `#6a0dff` / `#8b3dff` |
| Ink | `#f4f5fa` |
| Display Font | Sora (700/800) |
| Mono Font | Space Mono |

---

## 📁 Structure

```
deomic-portfolio-20/
├── index.html          # Complete self-contained website
├── README.md           # This file
└── .gitignore
```

---

## 🛠 Production Stack (Next.js upgrade path)

When ready to scale to a full Next.js 15 project:

```
app/                    # Next.js App Router
components/
  sections/             # Hero, About, Services, Work, Tech, Contact
  three/                # R3F Scene, ParticleField, FloatingGeo
  ui/                   # shadcn/ui components
  shared/               # Cursor, Loader, Marquee, Nav
lib/                    # data, utils
```

**Tech:** Next.js 15 · TypeScript · Tailwind CSS · Framer Motion · React Three Fiber · Three.js · GSAP · Lenis · Shadcn UI

---

## 📦 Deploy

**Static (current):** Drop `index.html` on any host — Vercel, Netlify, GitHub Pages, Cloudflare Pages.

**GitHub Pages quick deploy:**
```bash
git init
git add .
git commit -m "feat: initial Deomic Portfolio 20 release"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/deomic-portfolio-20.git
git push -u origin main
# Then enable Pages → Deploy from main branch root
```

---

## 🏆 Design Inspiration

Built to the standard of:
- [Awwwards](https://awwwards.com)
- [CSS Design Awards](https://cssdesignawards.com)
- [Behance](https://behance.net)

Brand fused from: Apple · Stripe · Linear · Vercel · Framer · OpenAI

---

© 2026 Deomic Technologies — All rights reserved.
