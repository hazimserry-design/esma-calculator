"use client";

import { useMemo } from "react";
import { useLang } from "./LanguageProvider";
import { UI } from "@/lib/content";
import { getLocalStrategy } from "@/lib/aiProvider";
import type { EsmaSplit, IndustryId, LocalizedText, Scores } from "@/lib/types";
import { CopyButton } from "./CopyButton";

function ListBlock({
  label,
  items,
}: {
  label: LocalizedText;
  items: string[];
}) {
  const { tr } = useLang();
  return (
    <div>
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-stone/70">
        {tr(label)}
      </p>
      <ul className="flex flex-col gap-2">
        {items.map((it, i) => (
          <li
            key={i}
            className="flex items-start gap-2.5 rounded-xl border border-line bg-cream px-3.5 py-2.5 text-[14px] leading-snug text-night/80"
          >
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function StrategyPack({
  split,
  scores,
  industryId,
  businessDescription,
}: {
  split: EsmaSplit;
  scores: Scores;
  industryId: IndustryId | undefined;
  businessDescription: string;
}) {
  const { lang, tr } = useLang();

  const strategy = useMemo(
    () =>
      getLocalStrategy({
        businessDescription,
        industry: industryId,
        split,
        scores,
        language: lang,
      }),
    [businessDescription, industryId, split, scores, lang]
  );

  const copyText = () =>
    [
      tr(UI.strategyTitle),
      "",
      strategy.summary,
      "",
      `${tr(UI.hooksLabel)}:`,
      ...strategy.hooks.map((h) => `• ${h}`),
      "",
      `${tr(UI.anglesLabel)}:`,
      ...strategy.angles.map((h) => `• ${h}`),
      "",
      `${tr(UI.leadMagnetsLabel)}:`,
      ...strategy.leadMagnets.map((h) => `• ${h}`),
      "",
      `${tr(UI.ctaIdeasLabel)}:`,
      ...strategy.ctas.map((h) => `• ${h}`),
      "",
      `${tr(UI.offersLabel)}:`,
      ...strategy.offers.map((h) => `• ${h}`),
    ].join("\n");

  return (
    <div className="glass rounded-4xl p-6 sm:p-8">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-xl font-bold text-night sm:text-2xl">
            {tr(UI.strategyTitle)}
          </h3>
          <p className="mt-1 text-sm text-stone">{tr(UI.strategySubtitle)}</p>
        </div>
        <div className="mt-3 sm:mt-0">
          <CopyButton getText={copyText} label={UI.copyStrategy} />
        </div>
      </div>

      {/* AI read */}
      <div className="mt-6 rounded-2xl border border-gold/25 bg-gold/[0.05] p-4">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-goldDark">
          {tr(UI.aiReadTitle)}
        </p>
        <p className="mt-1.5 text-[15px] leading-relaxed text-night/80">
          {strategy.summary}
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <ListBlock label={UI.hooksLabel} items={strategy.hooks} />
        <ListBlock label={UI.anglesLabel} items={strategy.angles} />
        <ListBlock label={UI.leadMagnetsLabel} items={strategy.leadMagnets} />
        <ListBlock label={UI.ctaIdeasLabel} items={strategy.ctas} />
      </div>

      <div className="mt-6">
        <ListBlock label={UI.offersLabel} items={strategy.offers} />
      </div>
    </div>
  );
}
