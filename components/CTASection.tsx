"use client";

import { useLang } from "./LanguageProvider";
import { UI } from "@/lib/content";
import { CtaButtons } from "./CtaButtons";

export function CTASection() {
  const { tr } = useLang();

  return (
    <div className="dark-panel relative overflow-hidden rounded-4xl p-7 sm:p-10">
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gold/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-gold/10 blur-3xl" />

      <div className="relative">
        <h3 className="text-2xl font-extrabold leading-snug text-white sm:text-3xl">
          {tr(UI.ctaTitle)}
        </h3>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/70">
          {tr(UI.ctaSubtext)}
        </p>

        <div className="mt-6">
          <CtaButtons variant="onDark" />
        </div>
      </div>
    </div>
  );
}
