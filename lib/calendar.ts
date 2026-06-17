import type { EsmaSplit, FunnelStage, IndustryId, Lang } from "./types";
import {
  FORMAT_LABELS,
  STAGE_FORMATS,
  generateIdeas,
} from "./recommendations";

export interface CalendarDay {
  day: number;
  stage: FunnelStage;
  idea: string;
  /** localized format label */
  format: string;
}

const TOTAL_DAYS = 30;

/**
 * Build a 30-day plan whose stage mix mirrors the ESMA split as closely as
 * possible, with the stages interleaved (not grouped) so the month feels
 * balanced. Uses largest-remainder rounding for the per-stage counts.
 */
export function buildCalendar(
  split: EsmaSplit,
  industryId: IndustryId | undefined,
  lang: Lang
): CalendarDay[] {
  // 1. How many days per stage (sums to exactly 30).
  const raw: Record<FunnelStage, number> = {
    tof: (split.tof / 100) * TOTAL_DAYS,
    mof: (split.mof / 100) * TOTAL_DAYS,
    bof: (split.bof / 100) * TOTAL_DAYS,
  };
  const counts: Record<FunnelStage, number> = {
    tof: Math.floor(raw.tof),
    mof: Math.floor(raw.mof),
    bof: Math.floor(raw.bof),
  };
  let remaining = TOTAL_DAYS - (counts.tof + counts.mof + counts.bof);
  const order = (["tof", "mof", "bof"] as FunnelStage[])
    .map((k) => ({ k, frac: raw[k] - Math.floor(raw[k]) }))
    .sort((a, b) => b.frac - a.frac);
  let oi = 0;
  while (remaining > 0) {
    counts[order[oi % 3].k] += 1;
    remaining -= 1;
    oi += 1;
  }

  // 2. Interleave stages across the month (Bresenham-style spread).
  const sequence = interleave(counts);

  // 3. Attach ideas + formats, cycling through each stage's pool.
  const ideas: Record<FunnelStage, string[]> = {
    tof: generateIdeas("tof", industryId, lang, Math.max(counts.tof, 1)),
    mof: generateIdeas("mof", industryId, lang, Math.max(counts.mof, 1)),
    bof: generateIdeas("bof", industryId, lang, Math.max(counts.bof, 1)),
  };
  const used: Record<FunnelStage, number> = { tof: 0, mof: 0, bof: 0 };

  return sequence.map((stage, idx) => {
    const ideaPool = ideas[stage];
    const formats = STAGE_FORMATS[stage];
    const n = used[stage]++;
    return {
      day: idx + 1,
      stage,
      idea: ideaPool[n % ideaPool.length],
      format: FORMAT_LABELS[formats[n % formats.length]][lang],
    };
  });
}

/** Spread the per-stage counts evenly across the timeline. */
function interleave(counts: Record<FunnelStage, number>): FunnelStage[] {
  const stages: FunnelStage[] = ["tof", "mof", "bof"];
  const total = counts.tof + counts.mof + counts.bof;
  const acc: Record<FunnelStage, number> = { tof: 0, mof: 0, bof: 0 };
  const result: FunnelStage[] = [];

  for (let i = 0; i < total; i++) {
    // Pick the stage that is most "behind" its target ratio so far.
    let pick: FunnelStage = stages[0];
    let bestScore = -Infinity;
    for (const s of stages) {
      if (acc[s] >= counts[s]) continue;
      const target = counts[s] / total;
      // how overdue this stage is
      const score = target * (i + 1) - acc[s];
      if (score > bestScore) {
        bestScore = score;
        pick = s;
      }
    }
    acc[pick] += 1;
    result.push(pick);
  }
  return result;
}
