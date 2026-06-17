"use client";

import { useMemo } from "react";
import { useLang } from "./LanguageProvider";
import { UI } from "@/lib/content";
import { findBottleneck, type BottleneckType } from "@/lib/recommendations";
import type { EsmaSplit, LocalizedText } from "@/lib/types";
import { CtaButtons } from "./CtaButtons";

interface CourseInfo {
  title: LocalizedText;
  why: LocalizedText;
  modules: LocalizedText[];
  outcomes: LocalizedText[];
}

const COURSES: Record<BottleneckType, CourseInfo> = {
  awareness: {
    title: { en: "Awareness & Reach Track", ar: "مسار الانتشار والوصول" },
    why: {
      en: "Your bottleneck is awareness, so your focus is getting in front of new people consistently.",
      ar: "مشكلتك في الانتشار، فتركيزك إنك توصل لناس جديدة بانتظام.",
    },
    modules: [
      { en: "Hook & idea research framework", ar: "إطار البحث عن الأفكار والهوكات" },
      { en: "Short-form video that travels", ar: "فيديوهات قصيرة بتنتشر" },
      { en: "Posting consistency system", ar: "نظام الانتظام في النشر" },
    ],
    outcomes: [
      { en: "More reach and new followers each week", ar: "وصول أكبر ومتابعين جدد كل أسبوع" },
      { en: "A repeatable idea pipeline", ar: "مصدر أفكار متجدد" },
    ],
  },
  trust: {
    title: { en: "Authority & Trust Track", ar: "مسار الخبرة والثقة" },
    why: {
      en: "Your bottleneck is trust, so your focus is proof, authority, and storytelling.",
      ar: "مشكلتك في الثقة، فتركيزك على الإثبات والخبرة والحكي.",
    },
    modules: [
      { en: "Proof & case-study framework", ar: "إطار الإثبات ودراسات الحالة" },
      { en: "Authority storytelling", ar: "الحكي اللي بيبني خبرتك" },
      { en: "Behind-the-scenes & process content", ar: "محتوى الكواليس وطريقة الشغل" },
    ],
    outcomes: [
      { en: "Audience that believes you can deliver", ar: "جمهور مصدّق إنك بتجيب نتيجة" },
      { en: "Warmer leads that are ready to buy", ar: "عملاء أقرب للشراء" },
    ],
  },
  conversion: {
    title: { en: "Offers & Conversion Track", ar: "مسار العروض والمبيعات" },
    why: {
      en: "Your bottleneck is conversion, so your focus is offers, objections, and clear CTAs.",
      ar: "مشكلتك في التحويل، فتركيزك على العروض والاعتراضات والدعوات الواضحة.",
    },
    modules: [
      { en: "Offer & pricing framework", ar: "إطار العرض والتسعير" },
      { en: "Objection-handling content", ar: "محتوى الرد على الاعتراضات" },
      { en: "Conversion scripting & CTAs", ar: "كتابة السكريبت والدعوات للتواصل" },
    ],
    outcomes: [
      { en: "More leads from the same audience", ar: "عملاء أكتر من نفس الجمهور" },
      { en: "A clear path from content to sale", ar: "طريق واضح من المحتوى للبيع" },
    ],
  },
};

export function CourseRecommendation({ split }: { split: EsmaSplit }) {
  const { tr } = useLang();
  const type = useMemo(() => findBottleneck(split).type, [split]);
  const course = COURSES[type];

  return (
    <div className="glass rounded-4xl p-6 sm:p-8">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-goldDark">
        {tr(UI.courseTitle)}
      </p>
      <h3 className="mt-2 text-2xl font-extrabold text-night">
        {tr(course.title)}
      </h3>

      <div className="mt-4 rounded-2xl border border-line bg-cream p-4">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-stone/70">
          {tr(UI.courseWhy)}
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-night/80">
          {tr(course.why)}
        </p>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-stone/70">
            {tr(UI.courseModules)}
          </p>
          <ul className="flex flex-col gap-2">
            {course.modules.map((m, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-night/80">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-gold/15 text-[10px] font-bold text-goldDark">
                  {i + 1}
                </span>
                {tr(m)}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-stone/70">
            {tr(UI.courseOutcomes)}
          </p>
          <ul className="flex flex-col gap-2">
            {course.outcomes.map((o, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-night/80">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                {tr(o)}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6">
        <CtaButtons primaryLabel={UI.ctaGetHelp} />
      </div>
    </div>
  );
}
