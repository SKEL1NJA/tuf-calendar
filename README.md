# 🗓️ TUF Calendar

An interactive wall calendar component built with **Next.js** and **Tailwind CSS** as part of the takeUforward Frontend Engineering Challenge.

## 🌐 Live Demo

[https://tuf-calendar.vercel.app](https://tuf-calendar.vercel.app)

## ✨ Features

- **Wall Calendar Aesthetic** — Hero image for each month with spiral binding detail and gradient overlay  
- **Contextual Monthly Themes** — Each month visually represents a stage in a coder’s journey (learning → consistency → grind → placements → achievement)  
- **Date Range Selector** — Click to set start & end dates with visual highlight for in-between days and hover preview  
- **Integrated Notes** — Per-month notes saved to `localStorage`, persists across sessions  
- **Meaningful Event Markers** — Includes Indian public holidays + developer-centric milestones (Programmers Day 💻, Internship Season 🚀, Placement Season 💼, Grind Phases 🔥)  
- **Dark / Light Theme** — Toggle with one click, preference saved to `localStorage`  
- **Smooth Transitions** — Hero image fades in with a subtle zoom effect on month change  
- **Branded Background Design** — Subtle gradient with developer-style grid overlay for a TUF-inspired aesthetic  
- **Fully Responsive** — Stacks vertically on mobile, side-by-side on desktop  

## 🗓️ Monthly Theme (Coder’s Journey)

Each month’s hero image represents a stage in a developer’s journey — aligning with the mindset promoted by takeUforward:

- **January** — Fresh start, setting up environment & goals 💻  
- **February** — Beginning the learning journey 🌄  
- **March** — Building consistency in practice 📈  
- **April** — Growth and improvement phase 🌱  
- **May** — Preparation intensifies 🔥  
- **June** — Calm, focused learning ☀️  
- **July** — Internship opportunities & real-world exposure 🚀  
- **August** — Discipline and routine building 🎯  
- **September** — Placement season begins 💼  
- **October** — Late-night grind phase 🌃  
- **November** — Peak preparation & consistency 🚧  
- **December** — Reflection and achievement 🏆  

This transforms the calendar from a simple date tool into a **visual representation of a coder’s yearly journey**.

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