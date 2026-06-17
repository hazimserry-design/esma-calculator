"use client";

import { useLang } from "./LanguageProvider";
import { UI } from "@/lib/content";
import { CtaButtons } from "./CtaButtons";

export function FreeVsFull() {
  const { tr } = useLang();

  return (
    <div className="glass rounded-4xl p-6 sm:p-8">
      <h3 className="text-xl font-bold text-night sm:text-2xl">
        {tr(UI.compareTitle)}
      </h3>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Free */}
        <div className="rounded-3xl border border-line bg-cream p-5">
          <p className="text-sm font-bold text-night">{tr(UI.compareFreeTitle)}</p>
          <ul className="mt-4 flex flex-col gap-2.5">
            {UI.compareFree.map((f, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-night/75">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-stone" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                {tr(f)}
              </li>
            ))}
          </ul>
        </div>

        {/* Full — highlighted */}
        <div className="relative rounded-3xl border border-gold/40 bg-gold/[0.07] p-5 shadow-soft">
          <span className="absolute -top-3 start-5 rounded-full bg-gradient-to-r from-gold to-goldDark px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-gold">
            HOMUS
          </span>
          <p className="text-sm font-bold text-night">{tr(UI.compareFullTitle)}</p>
          <ul className="mt-4 grid grid-cols-1 gap-2.5">
            {UI.compareFull.map((f, i) => (
              <li key={i} className="flex items-start gap-2 text-sm font-medium text-night/85">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-goldDark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                {tr(f)}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6">
        <CtaButtons />
      </div>
    </div>
  );
}
