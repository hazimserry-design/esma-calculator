"use client";

import { useLang } from "./LanguageProvider";
import { UI } from "@/lib/content";
import { CONFIG } from "@/lib/config";
import type { LocalizedText } from "@/lib/types";

type Variant = "onLight" | "onDark";

function CalendarIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm5.8 14.01c-.24.68-1.4 1.3-1.94 1.34-.5.05-1.13.21-3.66-.77-3.08-1.21-5.05-4.34-5.2-4.54-.15-.2-1.24-1.65-1.24-3.15s.79-2.24 1.07-2.54c.28-.3.61-.38.81-.38.2 0 .41 0 .58.01.19.01.43-.07.68.52.24.59.83 2.04.9 2.19.07.15.12.32.02.52-.1.2-.15.32-.3.5-.15.18-.31.39-.45.53-.15.15-.3.31-.13.6.17.3.76 1.25 1.63 2.02 1.12.99 2.06 1.3 2.36 1.45.3.15.47.12.64-.07.17-.2.74-.86.94-1.16.2-.3.39-.25.66-.15.27.1 1.7.8 1.99.95.29.15.49.22.56.34.07.13.07.73-.17 1.41Z" />
    </svg>
  );
}

/**
 * Primary (gold) + WhatsApp CTAs used across the report. All links come from
 * lib/config.ts so they update in one place.
 */
export function CtaButtons({
  primaryLabel,
  variant = "onLight",
}: {
  primaryLabel?: LocalizedText;
  variant?: Variant;
}) {
  const { tr } = useLang();
  const secondaryCls =
    variant === "onDark"
      ? "border-white/20 bg-white/5 text-white hover:border-gold/50"
      : "border-line bg-card text-night hover:border-gold/50";

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <a
        href={CONFIG.bookConsultationUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold to-goldDark px-7 py-3.5 text-sm font-bold text-white shadow-gold transition hover:scale-[1.03]"
      >
        <CalendarIcon />
        {tr(primaryLabel ?? UI.ctaBookCall)}
      </a>
      <a
        href={CONFIG.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center justify-center gap-2 rounded-full border px-7 py-3.5 text-sm font-bold transition ${secondaryCls}`}
      >
        <span className="text-gold">
          <WhatsAppIcon />
        </span>
        {tr(UI.messageWhatsapp)}
      </a>
    </div>
  );
}
