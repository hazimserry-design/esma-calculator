"use client";

import { useLang } from "./LanguageProvider";
import { UI } from "@/lib/content";
import { CtaButtons } from "./CtaButtons";

/** Shown on the results page only when the user said they're "not confident". */
export function ConfidenceMessage() {
  const { tr } = useLang();

  return (
    <div className="dark-panel relative overflow-hidden rounded-4xl p-7 sm:p-9">
      <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-gold/15 blur-3xl" />
      <div className="relative">
        <h3 className="max-w-xl text-xl font-extrabold leading-snug text-white sm:text-2xl">
          {tr(UI.confidenceNotTitle)}
        </h3>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/75">
          {tr(UI.confidenceNotBody)}
        </p>
        <div className="mt-6">
          <CtaButtons primaryLabel={UI.ctaGetHelp} variant="onDark" />
        </div>
      </div>
    </div>
  );
}
