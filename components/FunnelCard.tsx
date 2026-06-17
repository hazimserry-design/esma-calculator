"use client";

import { useEffect, useState } from "react";
import { useLang } from "./LanguageProvider";
import { UI, type FunnelCopy } from "@/lib/content";

const ACCENT: Record<string, { bar: string; chip: string; text: string }> = {
  TOF: {
    bar: "from-green-500 to-green-400",
    chip: "bg-green-500/15 text-green-400",
    text: "text-green-400",
  },
  MOF: {
    bar: "from-blue-500 to-blue-400",
    chip: "bg-blue-500/15 text-blue-400",
    text: "text-blue-400",
  },
  BOF: {
    bar: "from-orange-500 to-orange-400",
    chip: "bg-orange-500/15 text-orange-400",
    text: "text-orange-400",
  },
};

interface FunnelCardProps {
  funnel: FunnelCopy;
  percentage: number;
  delay: number;
}

export function FunnelCard({ funnel, percentage, delay }: FunnelCardProps) {
  const { tr } = useLang();
  const accent = ACCENT[funnel.code];
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const id = setTimeout(() => setWidth(percentage), 150 + delay);
    return () => clearTimeout(id);
  }, [percentage, delay]);

  return (
    <div
      className="glass animate-fade-up rounded-4xl p-6 sm:p-7"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <span
            className={`inline-flex rounded-lg px-2.5 py-1 text-xs font-bold ${accent.chip}`}
          >
            {funnel.code}
          </span>
          <h3 className="mt-2.5 text-lg font-bold text-night">
            {tr(funnel.fullName)}
          </h3>
        </div>
        <div className="text-end">
          <span className="text-5xl font-extrabold leading-none tracking-tight text-night tabular-nums">
            {percentage}
          </span>
          <span className={`text-2xl font-bold ${accent.text}`}>%</span>
        </div>
      </div>

      <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-night/[0.06]">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${accent.bar} transition-all duration-[1100ms] ease-out`}
          style={{ width: `${width}%` }}
        />
      </div>

      <p className="mt-5 text-[15px] leading-relaxed text-night/65">
        {tr(funnel.description)}
      </p>

      <div className="mt-5">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-night/35">
          {tr(UI.examplesLabel)}
        </p>
        <div className="flex flex-wrap gap-2">
          {funnel.examples.map((ex, i) => (
            <span
              key={i}
              className="rounded-full border border-night/[0.07] bg-night/[0.03] px-3 py-1.5 text-xs font-medium text-night/70"
            >
              {tr(ex)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}