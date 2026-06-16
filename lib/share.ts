import type { EsmaSplit, Lang } from "./types";
import { distributeVideos } from "./engine";
import { FUNNELS, UI } from "./content";

/** Build a plain-text summary of the results for the Copy button. */
export function buildShareText(
  split: EsmaSplit,
  perWeek: number,
  lang: Lang
): string {
  const dist = distributeVideos(split, perWeek);
  const title = UI.copyTitle[lang];
  const tofName = FUNNELS[0].fullName[lang];
  const mofName = FUNNELS[1].fullName[lang];
  const bofName = FUNNELS[2].fullName[lang];
  const weeklyHeading = UI.weeklyPlanHeading[lang];
  const unit = UI.videosUnit[lang];

  return [
    `★ ${title} ★`,
    "",
    `TOF — ${tofName}: ${split.tof}%`,
    `MOF — ${mofName}: ${split.mof}%`,
    `BOF — ${bofName}: ${split.bof}%`,
    "",
    `${weeklyHeading} (${perWeek}/${UI.videosPerWeek[lang]}):`,
    `• TOF: ${dist.tof} ${unit}`,
    `• MOF: ${dist.mof} ${unit}`,
    `• BOF: ${dist.bof} ${unit}`,
    "",
    UI.footer[lang],
  ].join("\n");
}
