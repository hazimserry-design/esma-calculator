"use client";

import { useMemo } from "react";
import { useLang } from "./LanguageProvider";
import { UI } from "@/lib/content";
import { whySplit } from "@/lib/recommendations";
import type { EsmaSplit } from "@/lib/types";
import { STAGE_STYLE } from "./stageStyles";

export function WhySplit({ split }: { split: EsmaSplit }) {
  const { lang, tr } = useLang();
  const data = useMemo(() => whySplit(split, lang), [split, lang]);

  return (
    <div className="glass rounded-4xl p-6 sm:p-8">
      <h3 className="text-xl font-bold text-night sm:text-2xl">
        {tr(UI.whyTitle)}
      </h3>
      <p className="mt-2 text-[15px] leading-relaxed text-night/70">
        {tr(data.intro)}
      </p>

      <div className="mt-5 flex flex-col gap-3">
        {data.reasons.map((r) => {
          const style = STAGE_STYLE[r.stage];
          return (
            <div
              key={r.stage}
              className="flex items-start gap-3 rounded-2xl border border-night/[0.06] bg-night/[0.02] p-4"
            >
              <span
                className={`mt-0.5 flex h-7 shrink-0 items-center rounded-lg border px-2 text-xs font-bold ${style.chip}`}
              >
                {r.stage.toUpperCase()}
              </span>
              <p className="text-sm leading-relaxed text-night/75">
                {tr(r.text)}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-5 rounded-2xl border border-orange-500/20 bg-orange-500/[0.05] p-4">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-orange-400">
          {tr(UI.overFocusLabel)}
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-night/75">
          {tr(data.overFocus)}
        </p>
      </div>
    </div>
  );
}
