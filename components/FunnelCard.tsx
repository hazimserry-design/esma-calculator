"use client";

import { useEffect, useState } from "react";
import { useLang } from "./LanguageProvider";
import { UI, type FunnelCopy } from "@/lib/content";

const ACCENT: Record<
  string,
  { bar: string; chip: string; text: string }
> = {
  TOF: {
    bar: "from-emerald-soft to-emerald-glow",
    chip: "bg-emerald-glow/15 text-emerald-soft",
    text: "text-emerald-soft",
  },
  MOF: {
    bar: "from-gold-soft to-gold-deep",
    chip: "bg-gold/15 text-gold-soft",
    text: "text-gold-soft",
  },
  BOF: {
    bar: "from-emerald-glow to-emerald-600",
    chip: "bg-emerald-glow/15 text-emerald-soft",
    text: "text-emerald-soft",
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
          <h3 className="mt-2.5 text-lg font-bold text-white">
            {tr(funnel.fullName)}
          </h3>
        </div>
        <div className="text-end">
          <span className="text-5xl font-extrabold leading-none tracking-tight text-white tabular-nums">
            {percentage}
          </span>
          <span className={`text-2xl font-bold ${accent.text}`}>%</span>
        </div>
      </div>

      {/* Bar */}
      <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/[0.06]">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${accent.bar} transition-all duration-[1100ms] ease-out`}
          style={{ width: `${width}%` }}
        />
      </div>

      <p className="mt-5 text-[15px] leading-relaxed text-white/65">
        {tr(funnel.description)}
      </p>

      <div className="mt-5">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-white/35">
          {tr(UI.examplesLabel)}
        </p>
        <div className="flex flex-wrap gap-2">
          {funnel.examples.map((ex, i) => (
            <span
              key={i}
              className="rounded-full border border-white/[0.07] bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-white/70"
            >
              {tr(ex)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
