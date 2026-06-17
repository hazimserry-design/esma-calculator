# ESMA Content Split Calculator

A premium, bilingual (English / Egyptian Arabic) web app that diagnoses a
business's stage and recommends the ideal **ESMA** content distribution across:

- **TOF** — Top of Funnel (awareness)
- **MOF** — Middle of Funnel (trust & authority)
- **BOF** — Bottom of Funnel (conversion)

Built for use inside a high-ticket content-creation course.

## Features

- 8-question diagnostic + optional **industry selection** (multiple choice + slider, no text inputs)
- Deterministic ESMA scoring engine that always sums to **exactly 100%** (5% floor)
- Animated results: donut chart, per-funnel breakdown cards with content ideas
- **Content Health Score** (0–100) with reasons + next actions
- **Biggest bottleneck** analysis (awareness / trust / conversion) with fixes
- **"Why this split makes sense"** personalized explanation
- Weekly content planner (3 / 5 / 7 / 10 / 14 / 20 videos per week)
- **Content Ideas generator** — 10 TOF / 10 MOF / 10 BOF, tailored to the industry
- **30-day content calendar** (cards on mobile, table on desktop) with formats
- **Benchmark comparison** vs. new / growing / established / offer-heavy profiles
- **Ask ESMA** assistant — prewritten answers based on your result (no API)
- Strong **CTA section** (Book a Consultation / WhatsApp) — links in `lib/config.ts`
- **Lead capture** before PDF download (stored locally, fully skippable)
- One-tap **language toggle** — full LTR ⇄ RTL switch, no page refresh
- Start Over · Copy Results · Copy Ideas · Copy Calendar · Download Report (PDF)
- `localStorage` persistence · no login · no backend
- Mobile-first responsive, dark theme with emerald accent + green/blue/orange funnels

## Tech Stack

- [Next.js 14](https://nextjs.org/) (App Router)
- React 18 + TypeScript
- Tailwind CSS
- `jspdf` for a multi-page, text-based PDF report (no screenshot capture — never blank)

> The PDF report is generated in **English** for reliable typography. The whole
> site (questions, results, ideas, calendar, explanations) stays fully bilingual.

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
  LanguageProvider     Language context (en/ar), dir + persistence
  Navbar               Brand + language toggle
  Landing              Hero / start screen
  Questionnaire        One-question-at-a-time flow (+ industry step) + progress
  ChoiceOption         Multiple-choice option
  SliderInput          1–10 slider
  Results              Results page — orchestrates all sections + PDF/lead
  SplitDonut           Animated donut chart
  FunnelCard           Per-funnel breakdown
  WeeklyPlanner        Weekly video distribution
  HealthScore          Content Health Score dial + reasons/actions
  BottleneckAnalysis   Biggest bottleneck + recommended posts
  WhySplit             "Why this split makes sense" explanation
  ContentIdeas         10/10/10 ideas with TOF/MOF/BOF tabs + copy
  ContentCalendar      30-day calendar (cards/table) + copy
  BenchmarkComparison  Compare split vs. business-stage benchmarks
  AskEsma              Static assistant with prewritten answers
  CTASection           Book a Consultation / WhatsApp
  LeadCaptureModal     Name/email/WhatsApp before PDF (skippable)
  CopyButton           Reusable copy-to-clipboard button
  stageStyles.ts       Shared TOF/MOF/BOF colour tokens
lib/
  types.ts          Shared types (incl. IndustryId, FunnelStage)
  content.ts        All bilingual copy + questions + UI strings
  engine.ts         Scoring + normalization + video distribution
  industries.ts     Industry list + per-industry bilingual vocabulary
  recommendations.ts Content ideas, formats, bottleneck, benchmarks, "why split"
  calendar.ts       30-day calendar builder
  healthScore.ts    Content Health Score
  ask.ts            Ask ESMA question/answer logic
  pdf.ts            Multi-page text-based PDF report (English)
  leads.ts          Local lead storage
  config.ts         CTA links + lead storage key (edit these)
  share.ts          Plain-text summary for Copy button
```

## The Scoring Engine

Starts from `TOF 40 / MOF 35 / BOF 25`, then applies awareness, trust, proof,
offer-validation, revenue-urgency, business/online-age and loyalty adjustments.
Results are normalized to whole numbers summing to exactly 100% with a 5%
minimum per category. See [`lib/engine.ts`](lib/engine.ts).
