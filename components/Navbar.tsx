"use client";

import { useLang } from "./LanguageProvider";
import { UI } from "@/lib/content";

export function Navbar() {
  const { lang, toggle, tr } = useLang();

  return (
    <header className="relative z-20 mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-5 sm:px-8 sm:py-6">
      <div className="flex items-center gap-3">
        <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-glow/90 to-emerald-600 shadow-glow">
          <span className="text-sm font-extrabold tracking-tight text-ink-950">
            E
          </span>
          <span className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full bg-gradient-to-br from-gold-soft to-gold-deep ring-2 ring-ink-950" />
        </div>
        <div className="leading-tight">
          <p className="text-base font-bold tracking-tight text-white">
            {tr(UI.brand)}
          </p>
          <p className="text-[11px] font-medium text-white/45">
            {tr(UI.brandSub)}
          </p>
        </div>
      </div>

      <button
        onClick={toggle}
        aria-label="Toggle language"
        className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white/80 transition hover:border-emerald-glow/40 hover:text-white"
      >
        <svg
          className="h-4 w-4 text-emerald-soft"
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
