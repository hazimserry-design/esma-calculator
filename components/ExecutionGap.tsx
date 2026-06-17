"use client";

import { useLang } from "./LanguageProvider";
import { UI } from "@/lib/content";
import { CtaButtons } from "./CtaButtons";

export function ExecutionGap() {
  const { tr } = useLang();

  return (
    <div className="dark-panel relative overflow-hidden rounded-4xl p-7 sm:p-10">
      <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-gold/15 blur-3xl" />
      <div className="relative">
        <h3 className="max-w-2xl text-2xl font-extrabold leading-snug text-white sm:text-[28px]">
          {tr(UI.gapTitle)}
        </h3>

        <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* What the tool gives */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-gold">
              {tr(UI.gapGivesLabel)}
            </p>
            <ul className="mt-3 flex flex-col gap-2">
              {UI.gapGives.map((g, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-white/80">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  {tr(g)}
                </li>
              ))}
            </ul>
          </div>

          {/* What execution needs */}
          <div className="rounded-3xl border border-gold/30 bg-gold/[0.08] p-5">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-gold">
              {tr(UI.gapNeedsLabel)}
            </p>
            <ul className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2">
              {UI.gapNeeds.map((g, i) => (
                <li key={i} className="flex items-start gap-1.5 text-sm text-white/85">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  {tr(g)}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-7">
          <CtaButtons primaryLabel={UI.ctaGetHelp} variant="onDark" />
        </div>
      </div>
    </div>
  );
}
