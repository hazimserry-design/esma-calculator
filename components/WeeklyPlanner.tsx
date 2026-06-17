"use client";

import { useLang } from "./LanguageProvider";
import { UI, WEEKLY_OPTIONS } from "@/lib/content";
import { distributeVideos } from "@/lib/engine";
import type { EsmaSplit } from "@/lib/types";

const FUNNEL_META = [
  { key: "tof" as const, code: "TOF", color: "#34d399" },
  { key: "mof" as const, code: "MOF", color: "#e8c074" },
  { key: "bof" as const, code: "BOF", color: "#10b981" },
];

interface WeeklyPlannerProps {
  split: EsmaSplit;
  perWeek: number;
  onPerWeekChange: (n: number) => void;
}

export function WeeklyPlanner({
  split,
  perWeek,
  onPerWeekChange,
}: WeeklyPlannerProps) {
  const { tr, lang } = useLang();
  const dist = distributeVideos(split, perWeek);

  return (
    <div className="glass rounded-4xl p-6 sm:p-8">
      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-bold text-night sm:text-2xl">
          {tr(UI.plannerTitle)}
        </h3>
        <p className="text-sm text-night/50">{tr(UI.plannerSubtitle)}</p>
      </div>

      {/* Selector */}
      <div className="mt-6 flex flex-wrap gap-2.5">
        {WEEKLY_OPTIONS.map((n) => {
          const active = n === perWeek;
          return (
            <button
              key={n}
              onClick={() => onPerWeekChange(n)}
              className={`rounded-2xl border px-4 py-2.5 text-sm font-bold transition-all ${
                active
                  ? "border-gold/60 bg-gold/[0.1] text-night shadow-soft"
                  : "border-night/[0.07] bg-night/[0.02] text-night/55 hover:border-night/20 hover:text-night"
              }`}
            >
              {n}
              <span className="ms-1 text-[11px] font-medium opacity-60">
                {tr(UI.videosPerWeek)}
              </span>
            </button>
          );
        })}
      </div>

      {/* Distribution */}
      <div className="mt-7 grid grid-cols-3 gap-3">
        {FUNNEL_META.map((f) => (
          <div
            key={f.key}
            className="rounded-3xl border border-night/[0.06] bg-night/[0.02] p-4 text-center"
          >
            <div
              className="mx-auto mb-2 h-1.5 w-8 rounded-full"
              style={{ backgroundColor: f.color }}
            />
            <p className="text-3xl font-extrabold text-night tabular-nums sm:text-4xl">
              {dist[f.key]}
            </p>
            <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-night/40">
              {f.code}
            </p>
            <p className="text-xs text-night/45">
              {dist[f.key] === 1 ? tr(UI.video) : tr(UI.videosUnit)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
