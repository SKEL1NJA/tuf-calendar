# 🗓️ TUF Calendar

An interactive wall calendar component built with **Next.js** and **Tailwind CSS** as part of the takeUforward Frontend Engineering Challenge.

## ✨ Features

- **Wall Calendar Aesthetic** — Hero image for each month with spiral binding detail and gradient overlay
- **Date Range Selector** — Click to set start & end dates with visual highlight for in-between days and hover preview
- **Integrated Notes** — Per-month notes saved to `localStorage`, persists across sessions
- **Indian Holiday Markers** — Orange dots on public holidays with tooltip on hover
- **Dark / Light Theme** — Toggle with one click, preference saved to `localStorage`
- **Smooth Transitions** — Hero image fades in with a subtle zoom effect on month change
- **Fully Responsive** — Stacks vertically on mobile, side-by-side on desktop

## 🛠️ Tech Stack

- [Next.js 15](https://nextjs.org/) (App Router)
- [Tailwind CSS v4](https://tailwindcss.com/)
- `localStorage` for client-side data persistence
- No backend, no database — purely frontend

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/SKEL1NJA/tuf-calendar.git
cd tuf-calendar
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📖 Design Decisions

- **Next.js App Router** was chosen for modern React patterns and easy Vercel deployment
- **Local images** in `public/images/months/` for reliable hero images without external dependencies
- **localStorage** used for notes and theme persistence — no backend needed per task requirements
- **Range selection UX** mirrors Google Calendar — click start, click end, hover previews the range
- **Component architecture** kept intentionally simple — single `Calendar.jsx` component for clarity and reviewability

## 📱 Responsive Design

- **Desktop**: Side-by-side layout with notes panel on the left and calendar grid on the right
- **Mobile**: Stacked layout — hero image → notes → calendar grid

## 🎯 Bonus Features

- 🌙 Dark / Light mode toggle
- 🎉 Indian public holiday markers with tooltips
- 🖼️ Per-month hero images with fade + zoom transition
- ✅ Save note confirmation feedback