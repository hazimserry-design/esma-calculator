"use client";

import { useCallback, useEffect, useState } from "react";
import { useLang } from "./LanguageProvider";
import { UI } from "@/lib/content";
import { INDUSTRIES } from "@/lib/industries";
import { fetchContentStrategy, briefIsReady } from "@/lib/aiClient";
import type { ContentBrief, ContentStrategyResult, IndustryId } from "@/lib/types";
import { CopyButton } from "./CopyButton";

export function ContentStrategyAI({
  brief,
  industryId,
}: {
  brief: ContentBrief;
  industryId: IndustryId | undefined;
}) {
  const { lang, tr } = useLang();
  const [data, setData] = useState<ContentStrategyResult | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading"
  );

  const industry = INDUSTRIES.find((i) => i.id === industryId);
  const businessType = industry ? tr(industry.label) : "";
  const ready = briefIsReady(brief) && businessType.length > 0;

  const load = useCallback(
    (signal?: AbortSignal) => {
      if (!ready) return;
      setStatus("loading");
      fetchContentStrategy(brief, businessType, lang, signal)
        .then((res) => {
          if (signal?.aborted) return;
          setData(res);
          setStatus("ready");
        })
        .catch((err) => {
          if (signal?.aborted) return;
          console.error("Content strategy failed", err);
          setStatus("error");
        });
    },
    [brief, businessType, lang, ready]
  );

  useEffect(() => {
    if (!ready) return;
    const ctrl = new AbortController();
    load(ctrl.signal);
    return () => ctrl.abort();
  }, [load, ready]);

  // If the brief wasn't filled, render nothing (keeps results clean).
  if (!ready) return null;

  const copyText = () => {
    if (!data) return "";
    return [
      tr(UI.aiStrategyTitle),
      "",
      data.summary,
      "",
      ...data.subtopics.flatMap((s) => [
        `■ ${s.name}`,
        `${tr(UI.aiSearchPhrasesLabel)}:`,
        ...s.searchPhrases.map((p) => `  • ${p}`),
        `${tr(UI.aiVideoIdeasLabel)}:`,
        ...s.videoIdeas.map((v) => `  • ${v}`),
        "",
      ]),
    ].join("\n");
  };

  return (
    <div className="glass rounded-4xl p-6 sm:p-8">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-gold/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-goldDark">
              AI
            </span>
            <h3 className="text-xl font-bold text-night sm:text-2xl">
              {tr(UI.aiStrategyTitle)}
            </h3>
          </div>
          <p className="mt-1 text-sm text-stone">{tr(UI.aiStrategySubtitle)}</p>
        </div>
        {status === "ready" && data && (
          <div className="mt-3 sm:mt-0">
            <CopyButton getText={copyText} label={UI.aiStrategyCopy} />
          </div>
        )}
      </div>

      {/* Loading */}
      {status === "loading" && (
        <div className="mt-8 flex flex-col items-center justify-center gap-4 py-10">
          <span className="h-8 w-8 animate-spin rounded-full border-[3px] border-gold/25 border-t-gold" />
          <p className="text-sm font-medium text-stone">
            {tr(UI.aiStrategyLoading)}
          </p>
        </div>
      )}

      {/* Error */}
      {status === "error" && (
        <button
          onClick={() => load()}
          className="mt-6 w-full rounded-2xl border border-gold/30 bg-gold/[0.05] px-4 py-5 text-center text-sm font-semibold text-night/80 transition hover:bg-gold/[0.1]"
        >
          {tr(UI.aiStrategyError)}
          <span className="mt-1 block text-xs font-bold uppercase tracking-widest text-goldDark">
            {tr(UI.aiStrategyRetry)}
          </span>
        </button>
      )}

      {/* Ready */}
      {status === "ready" && data && (
        <>
          <div className="mt-6 rounded-2xl border border-gold/25 bg-gold/[0.05] p-4">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-goldDark">
              {tr(UI.aiReadTitle)}
            </p>
            <p className="mt-1.5 text-[15px] leading-relaxed text-night/80">
              {data.summary}
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-4">
            {data.subtopics.map((s, i) => (
              <div
                key={i}
                className="rounded-2xl border border-line bg-cream p-5"
              >
                <div className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-gold to-goldDark text-xs font-bold text-white tabular-nums">
                    {i + 1}
                  </span>
                  <h4 className="text-[16px] font-bold leading-snug text-night">
                    {s.name}
                  </h4>
                </div>

                <p className="mt-4 text-[11px] font-semibold uppercase tracking-widest text-stone/70">
                  {tr(UI.aiSearchPhrasesLabel)}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {s.searchPhrases.map((p, j) => (
                    <span
                      key={j}
                      className="rounded-full border border-gold/30 bg-gold/[0.07] px-3 py-1.5 text-[13px] font-medium text-night/80"
                    >
                      {p}
                    </span>
                  ))}
                </div>

                <p className="mt-4 text-[11px] font-semibold uppercase tracking-widest text-stone/70">
                  {tr(UI.aiVideoIdeasLabel)}
                </p>
                <ul className="mt-2 flex flex-col gap-2">
                  {s.videoIdeas.map((v, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2.5 text-[14px] leading-snug text-night/80"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                      {v}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
