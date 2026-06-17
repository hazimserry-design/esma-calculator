"use client";

import { useState } from "react";
import { useLang } from "./LanguageProvider";
import { UI } from "@/lib/content";

/** Conservative assumed lift from more consistent, better-targeted content. */
const LIFT = 0.15;

export function RoiEstimator() {
  const { tr } = useLang();
  const [value, setValue] = useState(1000);
  const [count, setCount] = useState(20);

  const current = Math.max(0, value) * Math.max(0, count);
  const upside = Math.round(current * LIFT);
  const yearly = upside * 12;

  const fmt = (n: number) => n.toLocaleString("en-US");
  const cur = tr(UI.currency);

  const inputCls =
    "w-full rounded-2xl border border-line bg-cream px-4 py-3 text-[15px] font-semibold text-night outline-none transition focus:border-gold/60 focus:bg-card";

  return (
    <div className="glass rounded-4xl p-6 sm:p-8">
      <h3 className="text-xl font-bold text-night sm:text-2xl">
        {tr(UI.roiTitle)}
      </h3>
      <p className="mt-1 text-sm text-stone">{tr(UI.roiSubtitle)}</p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-stone">
            {tr(UI.roiCustomerValue)} ({cur})
          </label>
          <input
            type="number"
            min={0}
            value={value}
            onChange={(e) => setValue(Number(e.target.value) || 0)}
            className={inputCls}
            dir="ltr"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-stone">
            {tr(UI.roiMonthlyCustomers)}
          </label>
          <input
            type="number"
            min={0}
            value={count}
            onChange={(e) => setCount(Number(e.target.value) || 0)}
            className={inputCls}
            dir="ltr"
          />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-line bg-cream p-4 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-stone/70">
            {tr(UI.roiCurrentLabel)}
          </p>
          <p className="mt-1 text-2xl font-extrabold text-night tabular-nums">
            {fmt(current)}
          </p>
          <p className="text-xs text-stone">{cur}</p>
        </div>
        <div className="rounded-2xl border border-gold/40 bg-gold/[0.08] p-4 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-goldDark">
            {tr(UI.roiUpsideLabel)}
          </p>
          <p className="mt-1 text-2xl font-extrabold text-goldDark tabular-nums">
            +{fmt(upside)}
          </p>
          <p className="text-xs text-stone">{cur}</p>
        </div>
        <div className="rounded-2xl border border-green-500/30 bg-green-500/[0.07] p-4 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-green-600">
            {tr(UI.roiYearLabel)}
          </p>
          <p className="mt-1 text-2xl font-extrabold text-green-600 tabular-nums">
            +{fmt(yearly)}
          </p>
          <p className="text-xs text-stone">{cur}</p>
        </div>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-stone/80">{tr(UI.roiNote)}</p>
    </div>
  );
}
