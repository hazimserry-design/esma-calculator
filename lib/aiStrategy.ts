import type {
  BusinessProfile,
  EsmaSplit,
  IndustryId,
  Lang,
  Scores,
} from "./types";
import { getIndustry, type IndustryVocab } from "./industries";
import { inferBusinessProfile } from "./businessProfile";
import {
  generateIdeas,
  findBottleneck,
  type BottleneckType,
} from "./recommendations";

export interface PersonalizedStrategy {
  profile: BusinessProfile;
  /** one-line read of the business, in the requested language */
  summary: string;
  tof: string[];
  mof: string[];
  bof: string[];
  hooks: string[];
  angles: string[];
  leadMagnets: string[];
  ctas: string[];
  offers: string[];
  growth: string[];
  mistakes: string[];
  nextSteps: string[];
}

interface Ctx {
  v: IndustryVocab;
  lang: Lang;
  profile: BusinessProfile;
  bottleneck: BottleneckType;
}

/* ---- interpolation ---------------------------------------------------- */
function fill(template: string, v: IndustryVocab, lang: Lang): string {
  return template
    .replace(/\{business\}/g, v.business[lang])
    .replace(/\{service\}/g, v.service[lang])
    .replace(/\{customer\}/g, v.customer[lang])
    .replace(/\{result\}/g, v.result[lang])
    .replace(/\{problem\}/g, v.problem[lang])
    .replace(/\{offer\}/g, v.offer[lang]);
}

const pick = <T,>(arr: T[], n: number): T[] => arr.slice(0, n);

/* ---- business summary ------------------------------------------------- */
function buildSummary(c: Ctx): string {
  const { profile: p, v, lang } = c;
  const audience =
    lang === "ar"
      ? p.audience === "businesses"
        ? "شركات"
        : p.audience === "mixed"
          ? "شركات وأفراد"
          : "أفراد"
      : p.audience === "businesses"
        ? "businesses"
        : p.audience === "mixed"
          ? "businesses and individuals"
          : "individuals";
  const reach =
    lang === "ar"
      ? p.reach === "local"
        ? "في منطقتك"
        : p.reach === "online"
          ? "أونلاين"
          : "أونلاين وعلى أرض الواقع"
      : p.reach === "local"
        ? "locally"
        : p.reach === "online"
          ? "online"
          : "both online and on the ground";
  const market =
    lang === "ar"
      ? p.market === "premium"
        ? "بريميوم"
        : p.market === "mass"
          ? "في المتناول"
          : "متوسط"
      : p.market;

  if (lang === "ar") {
    return `إنت بتقدّم ${v.service.ar} لـ${audience} ${reach}، وبتشتغل في سوق ${market}. معنى كده إن المحتوى بتاعك لازم يبني ثقة ويشرح القيمة كويس قبل ما الناس تشتري.`;
  }
  return `You offer ${v.service.en} to ${audience}, ${reach}, in a ${market} market. That means your content needs to build trust and make the value obvious before people buy.`;
}

/* ---- TOF / MOF / BOF (reuse industry engine) -------------------------- */

/* ---- hooks ------------------------------------------------------------ */
const HOOKS = (c: Ctx): string[] => {
  const base = [
    {
      en: "Stop doing this if you want {result}",
      ar: "بطّل تعمل كده لو عايز {result}",
    },
    {
      en: "The #1 reason people fail at {service}",
      ar: "السبب رقم 1 اللي بيخلي الناس تفشل في {service}",
    },
    {
      en: "Nobody tells you this about {service}…",
      ar: "محدش بيقولك الكلام ده عن {service}…",
    },
    {
      en: "If you're a {customer}, watch this before you decide",
      ar: "لو إنت {customer}، اتفرج على ده قبل ما تقرر",
    },
    {
      en: "I wish someone told me this before I started",
      ar: "ياريت حد كان قالي ده قبل ما أبدأ",
    },
    {
      en: "3 mistakes that cost you {result}",
      ar: "3 أخطاء بتضيّع عليك {result}",
    },
  ];
  return pick(
    base.map((b) => fill(b[c.lang], c.v, c.lang)),
    5
  );
};

/* ---- angles ----------------------------------------------------------- */
const ANGLES = (c: Ctx): string[] => {
  const base = [
    { en: "Educate: teach what most {customer}s get wrong", ar: "تعليم: اشرح اللي أغلب {customer}ين بيغلطوا فيه" },
    { en: "Proof: show real results and case studies", ar: "إثبات: ورّي نتايج حقيقية ودراسات حالة" },
    { en: "Story: share your journey and the why behind your work", ar: "حكاية: احكي رحلتك والسبب ورا شغلك" },
    { en: "Contrast: the right way vs the wrong way to do {service}", ar: "مقارنة: الطريقة الصح في {service} مقابل الغلط" },
    { en: "Authority: break down your exact process step by step", ar: "خبرة: فصّص طريقة شغلك خطوة بخطوة" },
    { en: "Objections: answer the doubts that stop people buying", ar: "اعتراضات: رُد على الشكوك اللي بتمنع الناس تشتري" },
  ];
  return pick(base.map((b) => fill(b[c.lang], c.v, c.lang)), 5);
};

/* ---- lead magnets ----------------------------------------------------- */
const LEAD_MAGNETS = (c: Ctx): string[] => {
  const premium = c.profile.market === "premium";
  const base = [
    { en: "A free checklist: what to know before choosing {business}", ar: "تشيك ليست مجانية: اللي لازم تعرفه قبل ما تختار {business}" },
    { en: "A short guide: how to get {result} faster", ar: "دليل قصير: إزاي توصل لـ{result} أسرع" },
    { en: "A free mini consultation or audit", ar: "استشارة أو مراجعة مجانية قصيرة" },
    { en: "A simple template your {customer} can use today", ar: "تمبليت بسيط يقدر {customer} يستخدمه النهاردة" },
    { en: "A '5 mistakes' PDF about {service}", ar: "ملف PDF عن '5 أخطاء' في {service}" },
    { en: premium ? "An exclusive strategy session" : "A discount on a first order", ar: premium ? "جلسة استراتيجية حصرية" : "خصم على أول طلب" },
  ];
  return pick(base.map((b) => fill(b[c.lang], c.v, c.lang)), 5);
};

/* ---- CTAs ------------------------------------------------------------- */
const CTAS = (c: Ctx): string[] => {
  const local = c.profile.reach === "local";
  const base = [
    { en: "DM us the word 'START' to get {offer}", ar: "ابعتلنا كلمة 'ابدأ' عشان تاخد {offer}" },
    { en: local ? "Book your visit today" : "Book a free call today", ar: local ? "احجز زيارتك النهاردة" : "احجز مكالمة مجانية النهاردة" },
    { en: "Comment 'INFO' and we'll send the details", ar: "اكتب 'تفاصيل' في الكومنت ونبعتلك كل حاجة" },
    { en: "Save this post and message us when you're ready", ar: "احفظ البوست وكلّمنا أول ما تكون جاهز" },
    { en: "Click the link in bio to start with {offer}", ar: "ادخل اللينك في البايو وابدأ بـ{offer}" },
  ];
  return pick(base.map((b) => fill(b[c.lang], c.v, c.lang)), 5);
};

/* ---- offers ----------------------------------------------------------- */
const OFFERS = (c: Ctx): string[] => {
  const premium = c.profile.market === "premium";
  const base = [
    { en: premium ? "A premium done-for-you package with a clear outcome" : "A starter offer that's easy to say yes to", ar: premium ? "باكدج بريميوم بنعمله ليك بالكامل بنتيجة واضحة" : "عرض بداية سهل إن الناس توافق عليه" },
    { en: "A risk-reversal guarantee to remove hesitation", ar: "ضمان يشيل التردد عن العميل" },
    { en: "A limited-time bundle that increases order value", ar: "باندل لفترة محدودة بيزوّد قيمة الطلب" },
  ];
  return pick(base.map((b) => fill(b[c.lang], c.v, c.lang)), 3);
};

/* ---- growth opportunities -------------------------------------------- */
const GROWTH = (c: Ctx): string[] => {
  const items: { en: string; ar: string }[] = [];
  if (c.profile.reach === "local")
    items.push({ en: "Partner with nearby businesses for cross-promotion", ar: "اعمل شراكات مع بيزنس قريب منك للترويج المشترك" });
  if (c.profile.audience === "businesses")
    items.push({ en: "Turn happy clients into referral partners", ar: "حوّل العملاء المبسوطين لمصدر ترشيحات" });
  items.push({ en: "Repurpose one strong video into 5 smaller posts", ar: "حوّل فيديو قوي واحد لـ5 بوستات أصغر" });
  items.push({ en: "Build an email/WhatsApp list from your lead magnet", ar: "ابني ليستة إيميل/واتساب من الليد ماجنت" });
  items.push({ en: "Double down on the content format that already works", ar: "ركّز أكتر على نوع المحتوى اللي شغّال أصلاً" });
  return pick(items.map((b) => fill(b[c.lang], c.v, c.lang)), 3);
};

/* ---- biggest mistakes ------------------------------------------------- */
const MISTAKES = (c: Ctx): string[] => {
  const byBottleneck: Record<BottleneckType, { en: string; ar: string }> = {
    awareness: { en: "Posting only to people who already follow you", ar: "إنك بتنزل محتوى للي متابعينك بس" },
    trust: { en: "Selling before you've shown enough proof", ar: "إنك بتبيع قبل ما تورّي إثبات كفاية" },
    conversion: { en: "Never making a clear offer or call to action", ar: "إنك مش بتعمل عرض أو دعوة واضحة للتواصل" },
  };
  const base = [
    byBottleneck[c.bottleneck],
    { en: "Being inconsistent — posting in bursts then disappearing", ar: "عدم الانتظام — بتنزل فترة وبعدين تختفي" },
    { en: "Talking about features instead of the {result} people want", ar: "بتتكلم عن المميزات بدل {result} اللي الناس عايزاها" },
  ];
  return pick(base.map((b) => fill(b[c.lang], c.v, c.lang)), 3);
};

/* ---- next steps ------------------------------------------------------- */
const NEXT_STEPS = (c: Ctx): string[] => {
  const base = [
    { en: "Fix your main bottleneck first (see your report)", ar: "صلّح المشكلة الأساسية الأول (موجودة في التقرير)" },
    { en: "Batch a week of content using the ideas above", ar: "صوّر أسبوع محتوى مرة واحدة من الأفكار اللي فوق" },
    { en: "Pick one lead magnet and one clear CTA, then stay consistent", ar: "اختار ليد ماجنت واحد ودعوة واضحة، والتزم بالانتظام" },
  ];
  return pick(base.map((b) => fill(b[c.lang], c.v, c.lang)), 3);
};

/**
 * The single local strategy engine. Pure, synchronous, no API.
 */
export function generatePersonalizedStrategy({
  businessDescription,
  industry,
  split,
  scores,
  language,
  bottleneck,
}: {
  businessDescription?: string;
  industry?: IndustryId;
  split: EsmaSplit;
  scores: Scores;
  language: Lang;
  /** optional override; otherwise derived from the split */
  bottleneck?: BottleneckType;
}): PersonalizedStrategy {
  const v = getIndustry(industry);
  const profile = inferBusinessProfile({
    description: businessDescription,
    industry,
    split,
    scores,
  });
  const bn = bottleneck ?? findBottleneck(split).type;
  const c: Ctx = { v, lang: language, profile, bottleneck: bn };

  return {
    profile,
    summary: buildSummary(c),
    tof: generateIdeas("tof", industry, language, 10),
    mof: generateIdeas("mof", industry, language, 10),
    bof: generateIdeas("bof", industry, language, 10),
    hooks: HOOKS(c),
    angles: ANGLES(c),
    leadMagnets: LEAD_MAGNETS(c),
    ctas: CTAS(c),
    offers: OFFERS(c),
    growth: GROWTH(c),
    mistakes: MISTAKES(c),
    nextSteps: NEXT_STEPS(c),
  };
}
