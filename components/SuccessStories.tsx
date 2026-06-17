"use client";

import { useLang } from "./LanguageProvider";
import { UI } from "@/lib/content";
import type { LocalizedText } from "@/lib/types";

interface Story {
  business: LocalizedText;
  problem: LocalizedText;
  result: LocalizedText;
  initials: string;
}

/**
 * Placeholder success stories. Replace the contents of this array with real
 * case studies when available — the layout adapts automatically.
 */
const STORIES: Story[] = [
  {
    initials: "DC",
    business: { en: "Dental clinic", ar: "عيادة أسنان" },
    problem: {
      en: "Posting regularly but barely getting new patients.",
      ar: "بتنزل بانتظام بس مرضى جداد قليلين.",
    },
    result: {
      en: "3x more booked consultations in 90 days.",
      ar: "3 أضعاف حجوزات الكشف في 90 يوم.",
    },
  },
  {
    initials: "HF",
    business: { en: "Handmade furniture brand", ar: "براند أثاث هاند ميد" },
    problem: {
      en: "Lots of likes, almost no sales from content.",
      ar: "لايكات كتير وتقريبًا مفيش مبيعات من المحتوى.",
    },
    result: {
      en: "Turned followers into a steady stream of orders.",
      ar: "حوّلت المتابعين لطلبات ثابتة.",
    },
  },
  {
    initials: "FC",
    business: { en: "Fitness coach", ar: "كوتش لياقة" },
    problem: {
      en: "Inconsistent posting, no system to keep going.",
      ar: "نشر غير منتظم ومفيش نظام يكمّل بيه.",
    },
    result: {
      en: "A simple weekly system that fills programs.",
      ar: "نظام أسبوعي بسيط بيملأ البرامج.",
    },
  },
];

export function SuccessStories() {
  const { tr } = useLang();

  return (
    <div className="glass rounded-4xl p-6 sm:p-8">
      <h3 className="text-xl font-bold text-night sm:text-2xl">
        {tr(UI.storiesTitle)}
      </h3>
      <p className="mt-1 text-sm text-stone">{tr(UI.storiesSubtitle)}</p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {STORIES.map((s, i) => (
          <div key={i} className="rounded-3xl border border-line bg-cream p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-gold to-goldDark text-sm font-bold text-white">
                {s.initials}
              </span>
              <p className="text-sm font-bold text-night">{tr(s.business)}</p>
            </div>
            <div className="mt-4">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-stone/60">
                {tr(UI.storyProblem)}
              </p>
              <p className="mt-1 text-sm text-night/70">{tr(s.problem)}</p>
            </div>
            <div className="mt-3">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-green-600">
                {tr(UI.storyResult)}
              </p>
              <p className="mt-1 text-sm font-medium text-night/85">
                {tr(s.result)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
