"use client";

import { useMemo, useState } from "react";
import { useLang } from "./LanguageProvider";
import { UI } from "@/lib/content";
import { generateIdeas, STAGE_NAME } from "@/lib/recommendations";
import type { FunnelStage, IndustryId } from "@/lib/types";
import { STAGE_ORDER, STAGE_STYLE } from "./stageStyles";
import { CopyButton } from "./CopyButton";

export function ContentIdeas({
  industryId,
}: {
  industryId: IndustryId | undefined;
}) {
  const { lang, tr } = useLang();
  const [active, setActive] = useState<FunnelStage>("tof");

  const ideasByStage = useMemo(
    () => ({
      tof: generateIdeas("tof", industryId, lang, 10),
      mof: generateIdeas("mof", industryId, lang, 10),
      bof: generateIdeas("bof", industryId, lang, 10),
    }),
    [industryId, lang]
  );

  const ideas = ideasByStage[active];

  const copyText = () => {
    const header = tr(STAGE_NAME[active]);
    return `${header}\n` + ideas.map((i, n) => `${n + 1}. ${i}`).join("\n");
  };

  return (
    <div className="glass rounded-4xl p-6 sm:p-8">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-xl font-bold text-night sm:text-2xl">
            {tr(UI.ideasTitle)}
          </h3>
          <p className="mt-1 text-sm text-night/50">{tr(UI.ideasSubtitle)}</p>
        </div>
        <div className="mt-3 sm:mt-0">
          <CopyButton getText={copyText} label={UI.copyIdeas} />
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-6 flex gap-2">
        {STAGE_ORDER.map((s) => {
          const style = STAGE_STYLE[s];
          const isActive = s === active;
          return (
            <button
              key={s}
              onClick={() => setActive(s)}
              className={`flex-1 rounded-2xl border px-3 py-2.5 text-sm font-bold transition-all ${
                isActive
                  ? `${style.chip}`
                  : "border-night/[0.07] bg-night/[0.02] text-night/55 hover:text-night"
              }`}
            >
              {s.toUpperCase()}
            </button>
          );
        })}
      </div>

      {/* Ideas list */}
      <ul key={active} className="animate-fade-in mt-5 flex flex-col gap-2.5">
        {ideas.map((idea, i) => (
          <li
            key={i}
            className="flex items-start gap-3 rounded-2xl border border-night/[0.06] bg-night/[0.02] p-3.5"
          >
            <span
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${STAGE_STYLE[active].chip}`}
            >
              {i + 1}
            </span>
            <span className="text-[15px] leading-snug text-night/80">
              {idea}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
