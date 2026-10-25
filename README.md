# Ozuna.ca 1:1 Full-Stack Production Replica & Headless CMS

An exact clean-room full-stack replica of [https://ozuna.ca/](https://ozuna.ca/) engineered with React 19, Tailwind CSS, Framer Motion, Express, and Prisma ORM (SQLite / Cloudflare D1 portable), featuring an interactive internal CMS Admin Portal.

---

## ⚡ Quick Start (Local Development)

### 1. Prerequisites
- Node.js v18+ (tested on Node v24)
- npm v9+

### 2. Start Backend API & Database
```bash
cd backend
npm install
npx prisma db push
node prisma/seed.js
npm run dev
# Backend API active on http://localhost:5000
```

### 3. Start Frontend & CMS Dashboard
In a separate terminal:
```bash
cd frontend
npm install
npm run dev
# Frontend live on http://localhost:3000
```

---

## 🔐 Credentials & Access Endpoints

| Portal / View | Local URL | Credentials / Notes |
| :--- | :--- | :--- |
| **Public Frontend** | `http://localhost:3000/` | Multi-page routes: `/`, `/about-me`, `/work`, `/contact` |
| **Admin Login** | `http://localhost:3000/admin/login` | **Username**: `admin@ozuna.ca`<br>**Password**: `OzunaMaster2026!` |
| **CMS Admin Dashboard** | `http://localhost:3000/admin` | Protected by JWT token with real-time CRUD |
| **Backend API Health** | `http://localhost:5000/api/health` | Status & uptime monitor |

---

## 🎨 60-30-10 Computed Design System

- **60% Dominant (Canvas / Surface)**: `#020202` (Obsidian Deep Dark)
- **30% Secondary (Structure & Typography)**: `#111111` (Card Surfaces) / `#ffffff` & `#cbd5e1` (Text)
- **10% Accent (Call-to-Action & Glow)**: `#ff1d25` (Cozuna Brand Red, Hover `#e0121a`)
- **Typography Hierarchy**:
  - Headings: `Archivo Black`, `Montserrat`
  - Body / UI: `Inter`, `system-ui`, sans-serif

---

## 📁 Project Directory Structure

```text
/ozuna-replica-app
├── /backend
│   ├── /prisma
│   │   ├── schema.prisma       # SQLite / D1 portable database schema
│   │   └── seed.js             # Seeds admin credentials & 15 portfolio items
│   ├── /src
│   │   ├── /routes             # auth.js, content.js, media.js
│   │   ├── /middleware         # authMiddleware.js (JWT validation)
│   │   └── server.js           # Express API server (Port 5000)
│   └── package.json
├── /frontend
│   ├── /public
│   │   ├── /videos             # hero-background.mp4 (720p H.264 loop)
│   │   ├── /images             # All 74 original portfolio and vector assets
│   │   └── /downloads          # CV.pdf
│   ├── /src
│   │   ├── /components         # Hero.jsx, PortfolioGrid.jsx, Navigation.jsx, Footer.jsx
│   │   ├── /admin              # AdminDashboard.jsx, Login.jsx, ContentEditor.jsx
│   │   ├── App.jsx             # React Router 7 multi-page client
│   │   ├── main.jsx            # Application entrypoint
│   │   └── index.css           # 60-30-10 tokens & Tailwind directives
│   └── package.json
├── wrangler.toml               # Cloudflare Pages / D1 / R2 configuration
└── README.md
```

---

## ☁️ Cloudflare Pages Edge Deployment

```bash
# 1. Build the production frontend distribution
cd frontend
npm run build

# 2. Deploy to Cloudflare Pages
npx wrangler pages deploy dist --project-name=ozuna-replica
```
