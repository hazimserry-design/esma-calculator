"use client";

import { useMemo } from "react";
import { useLang } from "./LanguageProvider";
import { UI } from "@/lib/content";
import { BENCHMARKS, closestBenchmark } from "@/lib/recommendations";
import type { EsmaSplit } from "@/lib/types";

function MiniBar({ split }: { split: EsmaSplit }) {
  return (
    <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-night/[0.06]">
      <div className="bg-green-500" style={{ width: `${split.tof}%` }} />
      <div className="bg-blue-500" style={{ width: `${split.mof}%` }} />
      <div className="bg-orange-500" style={{ width: `${split.bof}%` }} />
    </div>
  );
}

export function BenchmarkComparison({ split }: { split: EsmaSplit }) {
  const { tr } = useLang();
  const closest = useMemo(() => closestBenchmark(split), [split]);

  const rows = [
    {
      id: "you",
      label: UI.yourSplitLabel,
      split,
      isYou: true,
      match: false,
    },
    ...BENCHMARKS.map((b) => ({
      id: b.id,
      label: b.label,
      split: b.split,
      isYou: false,
      match: b.id === closest.id,
    })),
  ];

  return (
    <div className="glass rounded-4xl p-6 sm:p-8">
      <h3 className="text-xl font-bold text-night sm:text-2xl">
        {tr(UI.benchmarkTitle)}
      </h3>
      <p className="mt-1 text-sm text-night/50">{tr(UI.benchmarkSubtitle)}</p>

      <div className="mt-6 flex flex-col gap-4">
        {rows.map((row) => (
          <div
            key={row.id}
            className={`rounded-2xl border p-4 transition ${
              row.isYou
                ? "border-gold/40 bg-gold/[0.06]"
                : row.match
                  ? "border-night/15 bg-night/[0.03]"
                  : "border-night/[0.05] bg-night/[0.01]"
            }`}
          >
            <div className="mb-2.5 flex items-center justify-between gap-3">
              <span className="flex items-center gap-2 text-sm font-bold text-night">
                {tr(row.label)}
                {row.isYou && (
                  <span className="rounded-md bg-gold/15 px-2 py-0.5 text-[10px] font-bold text-gold">
                    {tr(UI.yourSplitLabel)}
                  </span>
                )}
                {row.match && !row.isYou && (
                  <span className="rounded-md bg-night/10 px-2 py-0.5 text-[10px] font-bold text-night/70">
                    {tr(UI.closestLabel)}
                  </span>
                )}
              </span>
              <span className="text-xs font-semibold tabular-nums text-night/45">
                {row.split.tof}/{row.split.mof}/{row.split.bof}
              </span>
            </div>
            <MiniBar split={row.split} />
          </div>
        ))}
      </div>
    </div>
  );
}
