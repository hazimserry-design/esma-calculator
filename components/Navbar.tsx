"use client";

import { useLang } from "./LanguageProvider";
import { UI } from "@/lib/content";

export function Navbar() {
  const { toggle, tr } = useLang();

  return (
    <header className="relative z-20 mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-5 sm:px-8 sm:py-6">
      <div className="flex items-center gap-3">
        <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-gold to-goldDark shadow-gold">
          <span className="text-lg font-extrabold tracking-tight text-white">
            H
          </span>
        </div>
        <div className="leading-tight">
          <p className="text-base font-extrabold tracking-tight text-night">
            {tr(UI.brand)}
          </p>
          <p className="text-[11px] font-medium text-stone">{tr(UI.brandSub)}</p>
        </div>
      </div>

      <button
        onClick={toggle}
        aria-label="Toggle language"
        className="group inline-flex items-center gap-2 rounded-full border border-line bg-card px-4 py-2 text-sm font-semibold text-night/80 shadow-soft2 transition hover:border-gold/50 hover:text-night"
      >
        <svg
          className="h-4 w-4 text-gold"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18" />
        </svg>
        {tr(UI.langLabel)}
      </button>
    </header>
  );
}
