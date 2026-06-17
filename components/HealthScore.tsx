"use client";

import { useEffect, useMemo, useState } from "react";
import { useLang } from "./LanguageProvider";
import { UI } from "@/lib/content";
import { computeHealthScore, type HealthLabel } from "@/lib/healthScore";
import type { EsmaSplit, Scores } from "@/lib/types";

const LABEL_COLOR: Record<HealthLabel, string> = {
  needsWork: "text-orange-400",
  improving: "text-yellow-400",
  strong: "text-blue-400",
  excellent: "text-green-400",
};

const RING_COLOR: Record<HealthLabel, string> = {
  needsWork: "#f97316",
  improving: "#eab308",
  strong: "#3b82f6",
  excellent: "#22c55e",
};

export function HealthScore({
  scores,
  split,
}: {
  scores: Scores;
  split: EsmaSplit;
}) {
  const { lang, tr } = useLang();
  const health = useMemo(
    () => computeHealthScore(scores, split, lang),
    [scores, split, lang]
  );

  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const id = setTimeout(() => setProgress(health.score), 200);
    return () => clearTimeout(id);
  }, [health.score]);

  const r = 52;
  const circ = 2 * Math.PI * r;
  const dash = (progress / 100) * circ;
  const ring = RING_COLOR[health.label];

  return (
    <div className="glass rounded-4xl p-6 sm:p-8">
      <h3 className="text-xl font-bold text-night sm:text-2xl">
        {tr(UI.healthTitle)}
      </h3>
      <p className="mt-1 text-sm text-night/50">{tr(UI.healthSubtitle)}</p>

      <div className="mt-6 flex flex-col items-center gap-6 sm:flex-row sm:items-center">
        {/* Dial */}
        <div className="relative h-36 w-36 shrink-0">
          <svg viewBox="0 0 130 130" className="h-full w-full -rotate-90">
            <circle
              cx="65"
              cy="65"
              r={r}
              fill="none"
              stroke="rgba(47,47,47,0.08)"
              strokeWidth="12"
            />
            <circle
              cx="65"
              cy="65"
              r={r}
              fill="none"
              stroke={ring}
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={`${dash} ${circ - dash}`}
              style={{ transition: "stroke-dasharray 1s cubic-bezier(0.22,1,0.36,1)" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-extrabold text-night tabular-nums">
              {health.score}
            </span>
            <span className="text-[11px] font-medium text-night/40">/100</span>
          </div>
        </div>

        <div className="flex-1">
          <span
            className={`inline-flex rounded-full border border-night/10 bg-night/[0.04] px-3 py-1 text-sm font-bold ${LABEL_COLOR[health.label]}`}
          >
            {tr(health.labelText)}
          </span>

          <div className="mt-4">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-night/35">
              {tr(UI.whyScore)}
            </p>
            <ul className="mt-2 flex flex-col gap-1.5">
              {health.reasons.map((rsn, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-night/70"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-night/30" />
                  {tr(rsn)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-gold/15 bg-gold/[0.04] p-4">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-gold">
          {tr(UI.nextActions)}
        </p>
        <ul className="mt-2 flex flex-col gap-1.5">
          {health.actions.map((a, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-night/75">
              <span className="text-gold">→</span>
              {tr(a)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
