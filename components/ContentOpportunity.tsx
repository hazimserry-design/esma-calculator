"use client";

import { useMemo } from "react";
import { useLang } from "./LanguageProvider";
import { UI } from "@/lib/content";
import { findBottleneck, type BottleneckType } from "@/lib/recommendations";
import { getLocalStrategy } from "@/lib/aiProvider";
import type { EsmaSplit, IndustryId, LocalizedText, Scores } from "@/lib/types";

const OPP: Record<
  BottleneckType,
  { limiting: LocalizedText; why: LocalizedText; ignored: LocalizedText; fixed: LocalizedText }
> = {
  awareness: {
    limiting: {
      en: "Not enough new people are discovering you.",
      ar: "مفيش ناس جديدة كفاية بتكتشفك.",
    },
    why: {
      en: "Even a great offer stays quiet when the same small audience sees it. Growth starts with reach.",
      ar: "حتى لو عرضك ممتاز، هيفضل ساكت لو نفس الجمهور الصغير بس اللي بيشوفه. النمو بيبدأ بالوصول.",
    },
    ignored: {
      en: "Your audience stops growing, leads dry up, and sales plateau.",
      ar: "جمهورك بيقف عند حد، العملاء بيقلّوا، والمبيعات بتثبت.",
    },
    fixed: {
      en: "More of the right people find you every week, feeding the rest of your funnel.",
      ar: "ناس صح أكتر بتلاقيك كل أسبوع، وده بيغذّي باقي القمع.",
    },
  },
  trust: {
    limiting: {
      en: "People know you, but they don't trust you enough yet.",
      ar: "الناس عارفاك، بس لسه مش واثقة فيك كفاية.",
    },
    why: {
      en: "Without proof and authority, interested people hesitate and never buy.",
      ar: "من غير إثبات وخبرة، الناس المهتمة بتتردد ومابتشتريش.",
    },
    ignored: {
      en: "You stay a 'maybe later' instead of a confident 'yes'.",
      ar: "بتفضل 'يمكن بعدين' بدل ما تبقى 'أيوه' بثقة.",
    },
    fixed: {
      en: "Warm people feel safe choosing you, and conversions rise.",
      ar: "الناس المهتمة بتطمن إنها تختارك، والمبيعات بتزيد.",
    },
  },
  conversion: {
    limiting: {
      en: "Your audience is warm, but you're not asking clearly enough.",
      ar: "جمهورك مهتم، بس مش بتطلب منه بوضوح كفاية.",
    },
    why: {
      en: "Attention without clear offers and CTAs rarely turns into revenue.",
      ar: "الاهتمام من غير عروض ودعوات واضحة نادرًا ما يتحوّل لفلوس.",
    },
    ignored: {
      en: "You build an audience that likes you but never buys.",
      ar: "بتبني جمهور بيحبك بس مابيشتريش.",
    },
    fixed: {
      en: "Existing demand converts into leads and sales you can count on.",
      ar: "الطلب الموجود بيتحوّل لعملاء ومبيعات تقدر تعتمد عليها.",
    },
  },
};

function MiniList({ label, items }: { label: LocalizedText; items: string[] }) {
  const { tr } = useLang();
  return (
    <div>
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-stone/70">
        {tr(label)}
      </p>
      <ul className="flex flex-col gap-1.5">
        {items.map((it, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-night/75">
            <span className="text-gold">→</span>
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ContentOpportunity({
  split,
  scores,
  industryId,
  businessDescription,
}: {
  split: EsmaSplit;
  scores: Scores;
  industryId: IndustryId | undefined;
  businessDescription: string;
}) {
  const { lang, tr } = useLang();
  const type = useMemo(() => findBottleneck(split).type, [split]);
  const copy = OPP[type];
  const strategy = useMemo(
    () =>
      getLocalStrategy({ businessDescription, industry: industryId, split, scores, language: lang }),
    [businessDescription, industryId, split, scores, lang]
  );

  const blocks: { label: LocalizedText; text: LocalizedText; tone: "warn" | "good" }[] = [
    { label: UI.oppLimiting, text: copy.limiting, tone: "warn" },
    { label: UI.oppWhy, text: copy.why, tone: "warn" },
    { label: UI.oppIgnored, text: copy.ignored, tone: "warn" },
    { label: UI.oppFixed, text: copy.fixed, tone: "good" },
  ];

  return (
    <div className="glass rounded-4xl p-6 sm:p-8">
      <h3 className="text-xl font-bold text-night sm:text-2xl">
        {tr(UI.opportunityTitle)}
      </h3>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {blocks.map((b, i) => (
          <div
            key={i}
            className={`rounded-2xl border p-4 ${
              b.tone === "good"
                ? "border-green-500/25 bg-green-500/[0.06]"
                : "border-line bg-cream"
            }`}
          >
            <p
              className={`text-[11px] font-semibold uppercase tracking-widest ${
                b.tone === "good" ? "text-green-600" : "text-stone/70"
              }`}
            >
              {tr(b.label)}
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-night/80">
              {tr(b.text)}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
        <MiniList label={UI.growthLabel} items={strategy.growth} />
        <MiniList label={UI.mistakesLabel} items={strategy.mistakes} />
        <MiniList label={UI.nextStepsLabel} items={strategy.nextSteps} />
      </div>
    </div>
  );
}
