"use client";

import { useState } from "react";
import { useLang } from "./LanguageProvider";
import { UI } from "@/lib/content";
import { ASK_ITEMS, type AskKind } from "@/lib/ask";
import type { EsmaSplit, IndustryId, Scores } from "@/lib/types";

const KIND_LABEL: Record<AskKind, keyof typeof UI> = {
  practical: "askKindPractical",
  strategic: "askKindStrategic",
  content: "askKindContent",
};

const KIND_STYLE: Record<AskKind, string> = {
  practical: "bg-green-500/12 text-green-600",
  strategic: "bg-blue-500/12 text-blue-600",
  content: "bg-gold/15 text-goldDark",
};

export function AskHomus({
  split,
  scores,
  perWeek,
  industryId,
  businessDescription,
}: {
  split: EsmaSplit;
  scores: Scores;
  perWeek: number;
  industryId: IndustryId | undefined;
  businessDescription: string;
}) {
  const { lang, tr } = useLang();
  const [activeId, setActiveId] = useState<string | null>(null);

  const active = ASK_ITEMS.find((q) => q.id === activeId);
  const answer = active
    ? active.answer({
        split,
        scores,
        perWeek,
        industryId,
        businessDescription,
        lang,
      })
    : null;

  return (
    <div className="glass rounded-4xl p-6 sm:p-8">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-gold to-goldDark shadow-gold">
          <svg
            className="h-5 w-5 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
          >
            <path d="M12 3a7 7 0 0 1 7 7c0 3-2 4.5-3 6H8c-1-1.5-3-3-3-6a7 7 0 0 1 7-7Z" />
            <path d="M9 21h6M10 18v3M14 18v3" />
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-bold text-night sm:text-2xl">
            {tr(UI.askTitle)}
          </h3>
          <p className="text-sm text-stone">{tr(UI.askSubtitle)}</p>
        </div>
      </div>

      {/* Suggested questions */}
      <div className="mt-6 flex flex-wrap gap-2.5">
        {ASK_ITEMS.map((item) => {
          const isActive = item.id === activeId;
          return (
            <button
              key={item.id}
              onClick={() => setActiveId(item.id)}
              className={`flex items-center gap-2 rounded-2xl border px-4 py-2.5 text-sm font-semibold transition-all ${
                isActive
                  ? "border-gold/60 bg-gold/[0.1] text-night shadow-soft"
                  : "border-line bg-cream text-night/70 hover:border-gold/40 hover:text-night"
              }`}
            >
              <span
                className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold uppercase ${KIND_STYLE[item.kind]}`}
              >
                {tr(UI[KIND_LABEL[item.kind]] as { en: string; ar: string })}
              </span>
              {tr(item.question)}
            </button>
          );
        })}
      </div>

      {/* Answer */}
      <div className="mt-5 rounded-2xl border border-line bg-cream p-5">
        {answer ? (
          <div className="animate-fade-in flex items-start gap-3">
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold/15 text-xs font-bold text-goldDark">
              H
            </span>
            <p className="whitespace-pre-line text-[15px] leading-relaxed text-night/85">
              {answer}
            </p>
          </div>
        ) : (
          <p className="text-center text-sm text-stone">{tr(UI.askPickHint)}</p>
        )}
      </div>
    </div>
  );
}
