"use client";

import { useMemo } from "react";
import { useLang } from "./LanguageProvider";
import { UI } from "@/lib/content";
import { findBottleneck } from "@/lib/recommendations";
import type { EsmaSplit, FunnelStage } from "@/lib/types";
import { STAGE_STYLE } from "./stageStyles";

const TYPE_STAGE: Record<string, FunnelStage> = {
  awareness: "tof",
  trust: "mof",
  conversion: "bof",
};

export function BottleneckAnalysis({ split }: { split: EsmaSplit }) {
  const { tr } = useLang();
  const b = useMemo(() => findBottleneck(split), [split]);
  const style = STAGE_STYLE[TYPE_STAGE[b.type]];

  return (
    <div className="glass rounded-4xl p-6 sm:p-8">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-night/35">
        {tr(UI.bottleneckTitle)}
      </p>

      <div className="mt-3 flex items-center gap-3">
        <span className={`h-3 w-3 rounded-full ${style.dot}`} />
        <h3 className={`text-2xl font-extrabold ${style.text}`}>
          {tr(b.title)}
        </h3>
      </div>

      <p className="mt-3 text-[15px] leading-relaxed text-night/70">
        {tr(b.explanation)}
      </p>

      <div className="mt-5 rounded-2xl border border-night/[0.06] bg-night/[0.02] p-4">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-night/35">
          {tr(UI.fixFirstLabel)}
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-night/80">
          {tr(b.fixFirst)}
        </p>
      </div>

      <div className="mt-5">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-night/35">
          {tr(UI.recommendedPosts)}
        </p>
        <div className="flex flex-wrap gap-2">
          {b.postTypes.map((p, i) => (
            <span
              key={i}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium ${style.chip}`}
            >
              {tr(p)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
