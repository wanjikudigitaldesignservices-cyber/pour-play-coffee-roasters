# POUR / PLAY — Multinational Specialty Coffee Roasters & Franchise Platform

> An ultra-premium, fullstack multinational coffee franchise and micro-roastery web platform built with **Next.js 16 (App Router)**, **Tailwind CSS**, and **Supabase (PostgreSQL & RLS)**. Faithfully replicating the aesthetic, typography, and interactive brew flow of the **POUR / PLAY** video showcase.

---

## ☕ Key Architectural Features

### 1. The Interactive 4-Step Brew Journey (Faithful Video Recreation)
- **1. GRIND**: 64mm titanium DLC flat burrs, unimodal particle distribution calibration, stepless micrometric dial (Espresso, AeroPress, V60, Chemex, Cold Brew), and interactive **Exploded 3D Burr View**.
- **2. POUR**: Counterbalanced gooseneck kettle with real-time PID temperature control (93.5°C), 4.5g/s laminar stream velocity, rising steam animations, and 45-second CO2 bloom counter.
- **3. SIP**: Artisanal ceramic mug with swirling crema, SCA 92.5 cupping radar (Jasmine, Bergamot, White Peach, Wild Honey), and aroma architecture tags.
- **4. FIND YOUR CUP**: Custom palate matcher featuring 4 tactile floating selection cards (`ORIGIN`, `ROAST`, `FLAVOR NOTE`, `BREW STYLE`) that dynamically recommend the perfect single-origin lot from our global roastery with instant one-click add to bag.

---

### 2. Multinational Coffee Franchise Hub
- **Global Footprint**: 148+ Cafés across 18 Countries, 12 Regional Roasteries, 100% Direct Fair Trade.
- **3 Turnkey Franchise Formats**:
  1. *Flagship Roastery & Sensory Lab* (3,500 – 5,000 sq ft)
  2. *Urban Espresso & Pour-Over Bar* (1,200 – 2,000 sq ft)
  3. *Transit Kiosk & Airport Pod* (400 – 800 sq ft)
- **Interactive Franchise ROI & Capital Estimator**: Calibrate daily cup volume and average ticket to view real-time monthly gross revenue, annual net profit margin, and estimated payback timeline.
- **Territory Rights Application**: Direct submission form logging franchisee credentials, capital tiers, and real estate proposals into the Supabase database.

---

### 3. Roastery Catalog & Precision Apparatus
- Micro-lot single origins (Ethiopian Yirgacheffe G1 Misty Valley, Colombian Huila Pink Bourbon, Panamanian Boquete Gesha, Kenyan Nyeri PB).
- Custom precision gear (Electric flat-burr grinder, AeroFlow smart kettle, spiral glass V60, double-walled ceramic tasting cups).
- Slide-out shopping bag and real-time checkout creating orders in Supabase with nitrogen-flushed worldwide dispatch.

---

### 4. Worldwide Flagship Directory
- Interactive store locator with regional filtering:
  - 🇯🇵 **Tokyo**: Shibuya Jingumae Roastery & Lab
  - 🇺🇸 **New York**: Soho Spring St Foundry & Tasting Room
  - 🇬🇧 **London**: Shoreditch Redchurch Brickworks
  - 🇮🇹 **Milan**: Navigli Ticinese Atelier
  - 🇰🇷 **Seoul**: Gangnam Dosan Roasters
  - 🇰🇪 **Nairobi**: Westlands General Mathenge Reserve
  - 🇦🇪 **Dubai**: DIFC Gate Village Prestige Lounge
  - 🇦🇺 **Sydney**: Surry Hills Crown St Roastery

---

### 5. Roaster's Journal & Science Editorial (Blogs)
- High-level essays on water chemistry (Mg2+ / Ca2+ extraction dynamics), burr alignment physics, direct trade origin diaries, and zero-emission fluid-bed roasting.
- Interactive claps counter and community barista discussions.

---

### 6. Full-Featured CMS Admin Dashboard (`/admin`)
- **Products CMS**: Create, edit, and delete coffee lots and gear with live Supabase persistence.
- **Blogs CMS**: WYSIWYG article editor with categories, tags, and publish controls.
- **Franchise Leads Pipeline**: Review applicants, filter by capital tier, update pipeline status (*New → Reviewing → Approved → Contacted*).
- **Stores CMS**: Add and manage international café locations.
- **Orders Queue**: Live feed of customer orders and dispatch status.

---

## 🛠 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, CSS Animations (Steam, Floating Droplets, Particle Shimmer)
- **Typography**: Fraunces (Retro Organic Display) & Plus Jakarta Sans
- **Database & Backend**: Supabase (PostgreSQL with Row-Level Security)
- **Icons & Polish**: Lucide React, Canvas Confetti

---

## 🚀 Environment Setup

Create `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://rdaudofnzkilnsyhtahk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Run locally:
```bash
npm install
npm run dev
```

Build for production:
```bash
npm run build
```
