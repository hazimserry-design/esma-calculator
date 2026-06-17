"use client";

import { useState } from "react";
import { useLang } from "./LanguageProvider";
import { UI } from "@/lib/content";

export function CopyButton({
  getText,
  label,
}: {
  getText: () => string;
  label: { en: string; ar: string };
}) {
  const { tr } = useLang();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    const text = getText();
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={copy}
      className="inline-flex items-center gap-2 rounded-full border border-night/10 bg-night/[0.03] px-4 py-2 text-xs font-semibold text-night/70 transition hover:border-gold/40 hover:text-night"
    >
      {copied ? (
        <svg
          className="h-3.5 w-3.5 text-gold"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.6"
        >
          <path d="M20 6L9 17l-5-5" />
        </svg>
      ) : (
        <svg
          className="h-3.5 w-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
        >
          <rect x="9" y="9" width="13" height="13" rx="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      )}
      {copied ? tr(UI.copied) : tr(label)}
    </button>
  );
}
