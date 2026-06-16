"use client";

import { useLang } from "./LanguageProvider";
import { UI } from "@/lib/content";

const FUNNEL_ACCENT: Record<string, string> = {
  TOF: "from-emerald-glow/20 to-emerald-glow/5 text-emerald-soft",
  MOF: "from-gold/20 to-gold/5 text-gold-soft",
  BOF: "from-emerald-glow/20 to-gold/10 text-white",
};

export function Landing({ onStart }: { onStart: () => void }) {
  const { tr } = useLang();

  return (
    <section className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center px-5 pb-20 pt-6 text-center sm:px-8 sm:pt-12">
      <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-emerald-glow/25 bg-emerald-glow/[0.06] px-4 py-1.5 text-xs font-semibold text-emerald-soft">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-soft" />
        {tr(UI.badge)}
      </div>

      <h1
        className="animate-fade-up mt-7 text-balance text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-6xl"
        style={{ animationDelay: "60ms" }}
      >
        {tr(UI.headline)}
      </h1>

      <p
        className="animate-fade-up mt-6 max-w-xl text-pretty text-base leading-relaxed text-white/55 sm:text-lg"
        style={{ animationDelay: "120ms" }}
      >
        {tr(UI.subheadline)}
      </p>

      <button
        onClick={onStart}
        style={{ animationDelay: "180ms" }}
        className="animate-fade-up group mt-9 inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-emerald-glow to-emerald-500 px-8 py-4 text-base font-bold text-ink-950 shadow-glow transition-all hover:scale-[1.03] hover:shadow-[0_25px_70px_-20px_rgba(16,185,129,0.7)] active:scale-100"
      >
        {tr(UI.startCta)}
        <svg
          className="h-5 w-5 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </button>

      <div
        className="animate-fade-up mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-white/40"
        style={{ animationDelay: "220ms" }}
      >
        {UI.landingPoints.map((p, i) => (
          <span key={i} className="inline-flex items-center gap-1.5">
            <svg
              className="h-3.5 w-3.5 text-emerald-soft"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
            {tr(p)}
          </span>
        ))}
      </div>

      {/* Funnel preview cards */}
      <div
        className="animate-fade-up mt-14 grid w-full grid-cols-1 gap-4 sm:grid-cols-3"
        style={{ animationDelay: "280ms" }}
      >
        {UI.funnelIntro.map((f) => (
          <div
            key={f.code}
            className="glass rounded-3xl p-5 text-start transition-transform hover:-translate-y-1"
          >
            <div
              className={`mb-3 inline-flex rounded-xl bg-gradient-to-br px-3 py-1 text-xs font-bold ${FUNNEL_ACCENT[f.code]}`}
            >
              {f.code}
            </div>
            <p className="text-lg font-bold text-white">{tr(f.title)}</p>
            <p className="mt-1 text-sm text-white/45">{tr(f.desc)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
