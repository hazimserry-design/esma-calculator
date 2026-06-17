"use client";

import { useLang } from "./LanguageProvider";
import { UI } from "@/lib/content";

const FUNNEL_ACCENT: Record<string, string> = {
  TOF: "bg-green-500/10 text-green-600",
  MOF: "bg-blue-500/10 text-blue-600",
  BOF: "bg-orange-500/10 text-orange-600",
};

export function Landing({ onStart }: { onStart: () => void }) {
  const { tr } = useLang();

  return (
    <section className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center px-5 pb-20 pt-6 text-center sm:px-8 sm:pt-12">
      <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/[0.08] px-4 py-1.5 text-xs font-semibold text-goldDark">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
        {tr(UI.badge)}
      </div>

      <h1
        className="animate-fade-up mt-7 text-balance text-4xl font-extrabold leading-[1.1] tracking-tight text-night sm:text-6xl"
        style={{ animationDelay: "60ms" }}
      >
        {tr(UI.headline)}
      </h1>

      <p
        className="animate-fade-up mt-6 max-w-xl text-pretty text-base leading-relaxed text-stone sm:text-lg"
        style={{ animationDelay: "120ms" }}
      >
        {tr(UI.subheadline)}
      </p>

      <button
        onClick={onStart}
        style={{ animationDelay: "180ms" }}
        className="animate-fade-up group mt-9 inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-gold to-goldDark px-8 py-4 text-base font-bold text-white shadow-gold transition-all hover:scale-[1.03] active:scale-100"
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
        className="animate-fade-up mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-stone"
        style={{ animationDelay: "220ms" }}
      >
        {UI.landingPoints.map((p, i) => (
          <span key={i} className="inline-flex items-center gap-1.5">
            <svg
              className="h-3.5 w-3.5 text-gold"
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
              className={`mb-3 inline-flex rounded-xl px-3 py-1 text-xs font-bold ${FUNNEL_ACCENT[f.code]}`}
            >
              {f.code}
            </div>
            <p className="text-lg font-bold text-night">{tr(f.title)}</p>
            <p className="mt-1 text-sm text-stone">{tr(f.desc)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
