import type {
  EsmaSplit,
  FunnelStage,
  IndustryId,
  Lang,
  LocalizedText,
} from "./types";
import { getIndustry, type IndustryVocab } from "./industries";

/* -------------------------------------------------------------------------- */
/*  Content idea templates                                                     */
/* -------------------------------------------------------------------------- */
/* Placeholders: {business} {service} {customer} {result} {problem} {offer}    */

const TOF_TEMPLATES: LocalizedText[] = [
  {
    en: "3 signs you need {service} sooner than you think",
    ar: "3 علامات بتقول إنك محتاج {service} بدري",
  },
  {
    en: "The biggest mistake people make before choosing {business}",
    ar: "أكبر غلطة بيعملها الناس قبل ما يختاروا {business}",
  },
  {
    en: "5 myths about {service} you should stop believing",
    ar: "5 مفاهيم غلط عن {service} لازم تبطل تصدقها",
  },
  {
    en: "Why most people struggle with {problem}",
    ar: "ليه أغلب الناس بتعاني من {problem}",
  },
  {
    en: "What every {customer} should know before starting",
    ar: "حاجة كل {customer} لازم يعرفها قبل ما يبدأ",
  },
  {
    en: "The truth about {service} nobody talks about",
    ar: "الحقيقة عن {service} اللي محدش بيتكلم عنها",
  },
  {
    en: "How to avoid {problem} from day one",
    ar: "إزاي تتجنب {problem} من أول يوم",
  },
  {
    en: "A quick beginner's guide to {service}",
    ar: "دليل سريع للمبتدئين عن {service}",
  },
  {
    en: "The most common questions about {service}, answered simply",
    ar: "أكتر أسئلة عن {service} وإجاباتها ببساطة",
  },
  {
    en: "The real reason people keep putting off {offer}",
    ar: "السبب الحقيقي اللي بيخلي الناس تأجل {offer}",
  },
];

const MOF_TEMPLATES: LocalizedText[] = [
  {
    en: "A simple breakdown of how we deliver {service}",
    ar: "شرح بسيط لطريقتنا في {service}",
  },
  {
    en: "Behind the scenes: a normal work day with us",
    ar: "من ورا الكواليس: يوم شغل عادي عندنا",
  },
  {
    en: "Before and after: a real result for one {customer}",
    ar: "قبل وبعد: نتيجة حقيقية لـ {customer} عندنا",
  },
  {
    en: "How we make sure you actually get {result}",
    ar: "إزاي بنتأكد إنك فعلاً توصل لـ {result}",
  },
  {
    en: "The exact framework we use for {service}",
    ar: "الطريقة اللي بنشتغل بيها بالظبط في {service}",
  },
  {
    en: "{service} done right vs done wrong",
    ar: "{service} صح في مقابل {service} غلط",
  },
  {
    en: "A client story: from {problem} to {result}",
    ar: "قصة عميل: من {problem} لـ {result}",
  },
  {
    en: "Why our customers keep coming back",
    ar: "ليه الناس بتفضل ترجعلنا تاني",
  },
  {
    en: "What makes our approach to {service} different",
    ar: "إيه اللي بيخلي طريقتنا في {service} مختلفة",
  },
  {
    en: "Answering the top concerns people have about {service}",
    ar: "بنرد على أكتر مخاوف الناس بخصوص {service}",
  },
];

const BOF_TEMPLATES: LocalizedText[] = [
  {
    en: "What exactly is included in {offer}",
    ar: "إيه اللي بتاخده بالظبط في {offer}",
  },
  {
    en: "Common questions people ask before {offer}",
    ar: "أسئلة شائعة بيسألها الناس قبل {offer}",
  },
  {
    en: "A real testimonial from a happy {customer}",
    ar: "رأي حقيقي من {customer} مبسوط",
  },
  {
    en: "Is {service} worth it? Here's the honest answer",
    ar: "هل {service} يستاهل؟ الإجابة بصراحة",
  },
  {
    en: "How {offer} works, step by step",
    ar: "{offer} بيتم إزاي، خطوة بخطوة",
  },
  {
    en: "The results you can expect from {service}",
    ar: "النتايج اللي ممكن تتوقعها من {service}",
  },
  {
    en: "Why now is the right time for {offer}",
    ar: "ليه دلوقتي أنسب وقت لـ {offer}",
  },
  {
    en: "Still unsure? Here's how we remove the risk for you",
    ar: "لسه متردد؟ شوف إزاي بنشيل عنك المخاطرة",
  },
  {
    en: "Our pricing and the value you get, explained clearly",
    ar: "الأسعار والقيمة اللي بتاخدها بكل وضوح",
  },
  {
    en: "Ready to start? Here's exactly what to do next",
    ar: "جاهز تبدأ؟ ده اللي تعمله بالظبط",
  },
];

const TEMPLATES: Record<FunnelStage, LocalizedText[]> = {
  tof: TOF_TEMPLATES,
  mof: MOF_TEMPLATES,
  bof: BOF_TEMPLATES,
};

function fill(template: string, v: IndustryVocab, lang: Lang): string {
  return template
    .replace(/\{business\}/g, v.business[lang])
    .replace(/\{service\}/g, v.service[lang])
    .replace(/\{customer\}/g, v.customer[lang])
    .replace(/\{result\}/g, v.result[lang])
    .replace(/\{problem\}/g, v.problem[lang])
    .replace(/\{offer\}/g, v.offer[lang]);
}

/** Generate `count` content ideas for a funnel stage, personalized by industry. */
export function generateIdeas(
  stage: FunnelStage,
  industryId: IndustryId | undefined,
  lang: Lang,
  count = 10
): string[] {
  const v = getIndustry(industryId);
  const templates = TEMPLATES[stage];
  const out: string[] = [];
  for (let i = 0; i < count; i++) {
    out.push(fill(templates[i % templates.length][lang], v, lang));
  }
  return out;
}

/* -------------------------------------------------------------------------- */
/*  Suggested formats                                                          */
/* -------------------------------------------------------------------------- */

export const FORMAT_LABELS: Record<string, LocalizedText> = {
  talkingHead: { en: "Talking head video", ar: "فيديو توك" },
  carousel: { en: "Carousel", ar: "كاروسيل" },
  story: { en: "Story", ar: "ستوري" },
  reel: { en: "Reel / TikTok", ar: "ريل / تيك توك" },
  caseStudy: { en: "Case study", ar: "دراسة حالة" },
  testimonial: { en: "Testimonial", ar: "رأي عميل" },
  offer: { en: "Offer post", ar: "بوست عرض" },
  bts: { en: "Behind-the-scenes", ar: "كواليس" },
};

export const STAGE_FORMATS: Record<FunnelStage, string[]> = {
  tof: ["reel", "talkingHead", "carousel", "story"],
  mof: ["caseStudy", "bts", "carousel", "talkingHead"],
  bof: ["testimonial", "offer", "talkingHead", "carousel"],
};

/* -------------------------------------------------------------------------- */
/*  Funnel labels                                                             */
/* -------------------------------------------------------------------------- */

export const STAGE_NAME: Record<FunnelStage, LocalizedText> = {
  tof: { en: "TOF · Awareness", ar: "TOF · انتشار" },
  mof: { en: "MOF · Trust", ar: "MOF · ثقة" },
  bof: { en: "BOF · Conversion", ar: "BOF · مبيعات" },
};

export function dominantStage(split: EsmaSplit): FunnelStage {
  if (split.tof >= split.mof && split.tof >= split.bof) return "tof";
  if (split.mof >= split.tof && split.mof >= split.bof) return "mof";
  return "bof";
}

/* -------------------------------------------------------------------------- */
/*  "Why this split makes sense"                                              */
/* -------------------------------------------------------------------------- */

export interface FunnelReason {
  stage: FunnelStage;
  text: LocalizedText;
}

export function whySplit(split: EsmaSplit, lang: Lang) {
  const dominant = dominantStage(split);

  const intro: LocalizedText = {
    en:
      dominant === "tof"
        ? "Right now your main job is to get discovered, so most of your content focuses on awareness."
        : dominant === "mof"
          ? "Right now your main job is to build trust, so most of your content focuses on proof and authority."
          : "Right now your main job is to convert, so most of your content focuses on offers and results.",
    ar:
      dominant === "tof"
        ? "دلوقتي أهم حاجة إن الناس تكتشفك، عشان كده أغلب المحتوى بتاعك بيركز على الانتشار."
        : dominant === "mof"
          ? "دلوقتي أهم حاجة تبني ثقة، عشان كده أغلب المحتوى بتاعك بيركز على الإثبات والخبرة."
          : "دلوقتي أهم حاجة تحوّل لمبيعات، عشان كده أغلب المحتوى بتاعك بيركز على العروض والنتايج.",
  };

  const reasons: FunnelReason[] = [
    {
      stage: "tof",
      text: {
        en: "You need TOF so new people keep discovering you. Without fresh attention, your audience stops growing.",
        ar: "محتاج TOF عشان ناس جديدة تفضل تكتشفك. من غير انتشار، جمهورك بيقف عند حد.",
      },
    },
    {
      stage: "mof",
      text: {
        en: "You need MOF so people who found you start trusting you. Trust is what turns followers into buyers.",
        ar: "محتاج MOF عشان اللي لاقوك يبدأوا يثقوا فيك. الثقة هي اللي بتحوّل المتابع لعميل.",
      },
    },
    {
      stage: "bof",
      text: {
        en: "You need BOF so warm people actually take action. Clear offers and proof turn interest into sales.",
        ar: "محتاج BOF عشان الناس المهتمة فعلاً تتحرك. العروض الواضحة والإثبات بيحوّلوا الاهتمام لمبيعات.",
      },
    },
  ];

  const overFocus: LocalizedText = {
    en: "If you put everything into one stage, the funnel breaks: all awareness with no trust gets no sales, and all selling with no new audience burns out fast. The split keeps all three working together.",
    ar: "لو حطيت كل تركيزك في مرحلة واحدة، القمع بيتكسر: انتشار من غير ثقة مفيش مبيعات، وبيع من غير جمهور جديد بيخلص بسرعة. التوزيع بيخلّي التلاتة شغالين مع بعض.",
  };

  return { dominant, intro, reasons, overFocus };
}

/* -------------------------------------------------------------------------- */
/*  Biggest bottleneck                                                        */
/* -------------------------------------------------------------------------- */

export type BottleneckType = "awareness" | "trust" | "conversion";

export interface BottleneckResult {
  type: BottleneckType;
  title: LocalizedText;
  explanation: LocalizedText;
  fixFirst: LocalizedText;
  postTypes: LocalizedText[];
}

export function findBottleneck(split: EsmaSplit): BottleneckResult {
  const dominant = dominantStage(split);
  const type: BottleneckType =
    dominant === "tof"
      ? "awareness"
      : dominant === "mof"
        ? "trust"
        : "conversion";

  const data: Record<BottleneckType, BottleneckResult> = {
    awareness: {
      type: "awareness",
      title: { en: "Awareness Bottleneck", ar: "مشكلة في الانتشار" },
      explanation: {
        en: "Not enough people know you exist yet. You can have a great offer, but without new eyes on your content, sales stay slow.",
        ar: "لسه مفيش ناس كفاية عارفة إنك موجود. ممكن يكون عندك عرض ممتاز، بس من غير ناس جديدة تشوف محتواك، المبيعات هتفضل بطيئة.",
      },
      fixFirst: {
        en: "Focus first on reach: post more awareness content with strong hooks that attract brand-new people.",
        ar: "ركّز الأول على الوصول: انزل محتوى انتشار أكتر بهوكات قوية بتجذب ناس جديدة خالص.",
      },
      postTypes: [
        { en: "Strong-hook short videos", ar: "فيديوهات قصيرة بهوك قوي" },
        { en: "Common mistakes in your field", ar: "أخطاء شائعة في مجالك" },
        { en: "Myth-busting posts", ar: "بوستات بتكسر مفاهيم غلط" },
        { en: "Relatable problem content", ar: "محتوى عن مشاكل الناس بتحس بيها" },
        { en: "Quick educational tips", ar: "نصايح تعليمية سريعة" },
      ],
    },
    trust: {
      type: "trust",
      title: { en: "Trust Bottleneck", ar: "مشكلة في الثقة" },
      explanation: {
        en: "People know you, but they're not confident enough to buy yet. They need more proof that you can deliver.",
        ar: "الناس عارفاك، بس لسه مش واثقة كفاية عشان تشتري. محتاجين إثبات أكتر إنك بتجيب نتيجة.",
      },
      fixFirst: {
        en: "Focus first on proof: show results, case studies, and the way you work so people feel safe choosing you.",
        ar: "ركّز الأول على الإثبات: ورّي نتايج ودراسات حالة وطريقة شغلك عشان الناس تطمن إنها تختارك.",
      },
      postTypes: [
        { en: "Case studies", ar: "دراسات حالة" },
        { en: "Before / after results", ar: "نتايج قبل وبعد" },
        { en: "Behind-the-scenes", ar: "كواليس الشغل" },
        { en: "Process breakdowns", ar: "شرح طريقة شغلك" },
        { en: "Client stories", ar: "قصص عملاء" },
      ],
    },
    conversion: {
      type: "conversion",
      title: { en: "Conversion Bottleneck", ar: "مشكلة في التحويل لمبيعات" },
      explanation: {
        en: "Your audience is warm and trusts you, but they're not taking action. Your offer and calls to action need to be clearer.",
        ar: "جمهورك مهتم وواثق فيك، بس مش بياخد خطوة. العرض بتاعك والدعوة للتواصل محتاجين يبقوا أوضح.",
      },
      fixFirst: {
        en: "Focus first on offers: explain exactly what you sell, handle objections, and ask people to take action.",
        ar: "ركّز الأول على العروض: اشرح بالظبط بتبيع إيه، رُد على الاعتراضات، واطلب من الناس تاخد خطوة.",
      },
      postTypes: [
        { en: "Offer breakdowns", ar: "شرح العرض بالتفصيل" },
        { en: "Testimonials", ar: "آراء عملاء" },
        { en: "Objection handling", ar: "الرد على الاعتراضات" },
        { en: "Pricing / value posts", ar: "بوستات عن السعر والقيمة" },
        { en: "Direct call-to-action posts", ar: "بوستات بدعوة واضحة للتواصل" },
      ],
    },
  };

  return data[type];
}

/* -------------------------------------------------------------------------- */
/*  Benchmarks                                                                */
/* -------------------------------------------------------------------------- */

export interface Benchmark {
  id: string;
  label: LocalizedText;
  split: EsmaSplit;
}

export const BENCHMARKS: Benchmark[] = [
  {
    id: "new",
    label: { en: "New business", ar: "بيزنس جديد" },
    split: { tof: 60, mof: 30, bof: 10 },
  },
  {
    id: "growing",
    label: { en: "Growing business", ar: "بيزنس بيكبر" },
    split: { tof: 45, mof: 35, bof: 20 },
  },
  {
    id: "established",
    label: { en: "Established business", ar: "بيزنس راسخ" },
    split: { tof: 30, mof: 40, bof: 30 },
  },
  {
    id: "offerHeavy",
    label: { en: "Offer-heavy business", ar: "بيزنس بيركز على البيع" },
    split: { tof: 25, mof: 35, bof: 40 },
  },
];

export function closestBenchmark(split: EsmaSplit): Benchmark {
  let best = BENCHMARKS[0];
  let bestDist = Infinity;
  for (const b of BENCHMARKS) {
    const dist =
      Math.abs(b.split.tof - split.tof) +
      Math.abs(b.split.mof - split.mof) +
      Math.abs(b.split.bof - split.bof);
    if (dist < bestDist) {
      bestDist = dist;
      best = b;
    }
  }
  return best;
}
