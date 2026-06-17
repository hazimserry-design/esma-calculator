"use client";

import { useEffect, useState } from "react";
import type { EsmaSplit } from "@/lib/types";

const COLORS = {
  tof: "#22c55e", // green
  mof: "#3b82f6", // blue
  bof: "#f97316", // orange
};

export function SplitDonut({ split }: { split: EsmaSplit }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const r = 70;
  const circumference = 2 * Math.PI * r;

  const segments = [
    { key: "tof", value: split.tof, color: COLORS.tof },
    { key: "mof", value: split.mof, color: COLORS.mof },
    { key: "bof", value: split.bof, color: COLORS.bof },
  ];

  let offsetAcc = 0;

  return (
    <div className="relative mx-auto h-52 w-52">
      <svg viewBox="0 0 180 180" className="h-full w-full -rotate-90">
        <circle
          cx="90"
          cy="90"
          r={r}
          fill="none"
          stroke="rgba(47,47,47,0.08)"
          strokeWidth="18"
        />
        {segments.map((seg) => {
          const len = (seg.value / 100) * circumference;
          const dash = mounted ? `${len} ${circumference - len}` : `0 ${circumference}`;
          const dashOffset = -offsetAcc;
          offsetAcc += (seg.value / 100) * circumference;
          return (
            <circle
              key={seg.key}
              cx="90"
              cy="90"
              r={r}
              fill="none"
              stroke={seg.color}
              strokeWidth="18"
              strokeLinecap="round"
              strokeDasharray={dash}
              strokeDashoffset={dashOffset}
              style={{
                transition: "stroke-dasharray 1s cubic-bezier(0.22,1,0.36,1)",
              }}
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-extrabold text-night">HOMUS</span>
        <span className="text-[11px] font-medium uppercase tracking-widest text-night/40">
          Split
        </span>
      </div>
    </div>
  );
}
