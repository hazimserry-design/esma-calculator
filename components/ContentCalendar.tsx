"use client";

import { useMemo } from "react";
import { useLang } from "./LanguageProvider";
import { UI } from "@/lib/content";
import { buildCalendar } from "@/lib/calendar";
import type { EsmaSplit, IndustryId } from "@/lib/types";
import { STAGE_STYLE } from "./stageStyles";
import { CopyButton } from "./CopyButton";

export function ContentCalendar({
  split,
  industryId,
}: {
  split: EsmaSplit;
  industryId: IndustryId | undefined;
}) {
  const { lang, tr } = useLang();

  const calendar = useMemo(
    () => buildCalendar(split, industryId, lang),
    [split, industryId, lang]
  );

  const copyText = () =>
    calendar
      .map(
        (d) =>
          `${tr(UI.dayLabel)} ${d.day} · ${d.stage.toUpperCase()} · ${d.format}: ${d.idea}`
      )
      .join("\n");

  return (
    <div className="glass rounded-4xl p-6 sm:p-8">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-xl font-bold text-night sm:text-2xl">
            {tr(UI.calendarTitle)}
          </h3>
          <p className="mt-1 text-sm text-night/50">
            {tr(UI.calendarSubtitle)}
          </p>
        </div>
        <div className="mt-3 sm:mt-0">
          <CopyButton getText={copyText} label={UI.copyCalendar} />
        </div>
      </div>

      {/* Mobile: cards */}
      <div className="mt-6 flex flex-col gap-2.5 sm:hidden">
        {calendar.map((d) => {
          const style = STAGE_STYLE[d.stage];
          return (
            <div
              key={d.day}
              className="rounded-2xl border border-night/[0.06] bg-night/[0.02] p-3.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-night/50">
                  {tr(UI.dayLabel)} {d.day}
                </span>
                <span
                  className={`rounded-md border px-2 py-0.5 text-[10px] font-bold ${style.chip}`}
                >
                  {d.stage.toUpperCase()}
                </span>
              </div>
              <p className="mt-2 text-sm leading-snug text-night/85">
                {d.idea}
              </p>
              <p className={`mt-1.5 text-xs font-medium ${style.text}`}>
                {d.format}
              </p>
            </div>
          );
        })}
      </div>

      {/* Desktop: table */}
      <div className="mt-6 hidden overflow-hidden rounded-2xl border border-night/[0.06] sm:block">
        <table className="w-full text-start text-sm">
          <thead>
            <tr className="bg-night/[0.03] text-xs uppercase tracking-wider text-night/40">
              <th className="px-4 py-3 text-start font-semibold">
                {tr(UI.colDay)}
              </th>
              <th className="px-4 py-3 text-start font-semibold">
                {tr(UI.colStage)}
              </th>
              <th className="px-4 py-3 text-start font-semibold">
                {tr(UI.colFormat)}
              </th>
              <th className="px-4 py-3 text-start font-semibold">
                {tr(UI.colIdea)}
              </th>
            </tr>
          </thead>
          <tbody>
            {calendar.map((d) => {
              const style = STAGE_STYLE[d.stage];
              return (
                <tr
                  key={d.day}
                  className="border-t border-night/[0.05] align-top"
                >
                  <td className="whitespace-nowrap px-4 py-3 font-bold text-night/60">
                    {d.day}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-bold ${style.text}`}
                    >
                      <span className={`h-2 w-2 rounded-full ${style.dot}`} />
                      {d.stage.toUpperCase()}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-night/55">
                    {d.format}
                  </td>
                  <td className="px-4 py-3 text-night/85">{d.idea}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
