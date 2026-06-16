# ESMA Content Split Calculator

A premium, bilingual (English / Egyptian Arabic) web app that diagnoses a
business's stage and recommends the ideal **ESMA** content distribution across:

- **TOF** — Top of Funnel (awareness)
- **MOF** — Middle of Funnel (trust & authority)
- **BOF** — Bottom of Funnel (conversion)

Built for use inside a high-ticket content-creation course.

## Features

- 8-question diagnostic (multiple choice + slider, no text inputs)
- Deterministic ESMA scoring engine that always sums to **exactly 100%** (5% floor)
- Animated results: donut chart, per-funnel breakdown cards with content ideas
- Weekly content planner (3 / 5 / 7 / 10 / 14 / 20 videos per week)
- One-tap **language toggle** — full LTR ⇄ RTL switch, no page refresh
- Start Over · Copy Results · Download PDF
- `localStorage` persistence · no login · no backend
- Mobile-first responsive, dark theme with emerald + gold accents

## Tech Stack

- [Next.js 14](https://nextjs.org/) (App Router)
- React 18 + TypeScript
- Tailwind CSS
- `html2canvas` + `jspdf` for PDF export (handles Arabic via rasterization)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Deploy to Vercel

Push to a Git repo and import it on [vercel.com](https://vercel.com), or:

```bash
npm i -g vercel
vercel
```

No environment variables or backend services are required.

## Project Structure

```
app/
  layout.tsx        Root layout, fonts, language provider
  page.tsx          Stage machine (landing → quiz → results) + persistence
  globals.css       Theme, glass cards, slider, RTL rules
components/
  LanguageProvider  Language context (en/ar), dir + persistence
  Navbar            Brand + language toggle
  Landing           Hero / start screen
  Questionnaire     One-question-at-a-time flow + progress
  ChoiceOption      Multiple-choice option
  SliderInput       1–10 slider
  Results           Results page, copy + PDF actions
  SplitDonut        Animated donut chart
  FunnelCard        Per-funnel breakdown
  WeeklyPlanner     Weekly video distribution
lib/
  types.ts          Shared types
  content.ts        All bilingual copy + questions
  engine.ts         Scoring + normalization + video distribution
  share.ts          Plain-text summary for Copy button
```

## The Scoring Engine

Starts from `TOF 40 / MOF 35 / BOF 25`, then applies awareness, trust, proof,
offer-validation, revenue-urgency, business/online-age and loyalty adjustments.
Results are normalized to whole numbers summing to exactly 100% with a 5%
minimum per category. See [`lib/engine.ts`](lib/engine.ts).
