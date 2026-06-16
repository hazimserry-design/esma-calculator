import type { LocalizedText, Question } from "./types";

export const QUESTIONS: Question[] = [
  {
    key: "businessAge",
    scoreVar: "businessAgeScore",
    type: "choice",
    prompt: {
      en: "How long has your business been operating?",
      ar: "من إمتى البيزنس ده شغال؟",
    },
    options: [
      { en: "Pre-launch", ar: "لسه ما اتطلقش" },
      { en: "Under 6 months", ar: "أقل من 6 شهور" },
      { en: "6–24 months", ar: "من 6 شهور لسنتين" },
      { en: "2–5 years", ar: "من سنتين لـ 5 سنين" },
      { en: "5+ years", ar: "أكتر من 5 سنين" },
    ],
  },
  {
    key: "onlineAge",
    scoreVar: "onlineAgeScore",
    type: "choice",
    prompt: {
      en: "How long have you been creating content consistently?",
      ar: "بقالك قد إيه بتنزل محتوى بشكل منتظم؟",
    },
    options: [
      { en: "Not started", ar: "لسه ما بدأتش" },
      { en: "Under 6 months", ar: "أقل من 6 شهور" },
      { en: "6–24 months", ar: "من 6 شهور لسنتين" },
      { en: "2–5 years", ar: "من سنتين لـ 5 سنين" },
      { en: "5+ years", ar: "أكتر من 5 سنين" },
    ],
  },
  {
    key: "awareness",
    scoreVar: "awarenessScore",
    type: "choice",
    prompt: {
      en: "How aware is your target market of your existence?",
      ar: "قد إيه الناس اللي ممكن تشتري منك عارفة إنك موجود؟",
    },
    options: [
      { en: "Almost nobody knows us", ar: "تقريبًا محدش يعرفنا" },
      { en: "A small percentage know us", ar: "ناس قليلة تعرفنا" },
      { en: "We are somewhat known", ar: "عدد معقول يعرفنا" },
      { en: "We are well known", ar: "ناس كتير تعرفنا" },
      { en: "We are a recognized authority", ar: "أغلب السوق عارفنا" },
    ],
  },
  {
    key: "trust",
    scoreVar: "trustScore",
    type: "choice",
    prompt: {
      en: "How much trust have you built with your audience?",
      ar: "قد إيه الناس واثقة فيك أو في البيزنس بتاعك؟",
    },
    options: [
      { en: "Very little trust", ar: "الثقة ضعيفة جدًا" },
      { en: "Some trust", ar: "فيه شوية ثقة" },
      { en: "Moderate trust", ar: "ثقة متوسطة" },
      { en: "Strong trust", ar: "ثقة قوية" },
      { en: "Extremely strong trust", ar: "ثقة قوية جدًا" },
    ],
  },
  {
    key: "proof",
    scoreVar: "proofScore",
    type: "choice",
    prompt: {
      en: "How much proof can you show that your offer works?",
      ar: "عندك قد إيه إثبات إن المنتج أو الخدمة بتاعتك بتجيب نتائج؟",
    },
    options: [
      { en: "No proof yet", ar: "لسه مفيش إثبات" },
      { en: "A few results", ar: "شوية نتائج بسيطة" },
      { en: "Several strong results", ar: "كام نتيجة قوية" },
      { en: "Many strong results", ar: "نتائج قوية كتير" },
      { en: "Overwhelming proof", ar: "عندنا إثباتات كتير جدًا" },
    ],
  },
  {
    key: "loyalty",
    scoreVar: "loyaltyScore",
    type: "choice",
    prompt: {
      en: "How loyal are your existing customers?",
      ar: "قد إيه العملاء الحاليين ممكن يشتروا منك تاني أو يرشحوك لحد؟",
    },
    options: [
      { en: "No customers yet", ar: "مستبعد جدًا" },
      { en: "Low loyalty", ar: "مش غالبًا" },
      { en: "Moderate loyalty", ar: "وارد" },
      { en: "Strong loyalty", ar: "غالبًا" },
      { en: "Extremely loyal community", ar: "بنسبة كبيرة جدًا" },
    ],
  },
  {
    key: "offerValidation",
    scoreVar: "offerValidationScore",
    type: "choice",
    prompt: {
      en: "How validated is your offer?",
      ar: "قد إيه متأكد إن العرض أو الخدمة اللي بتقدمها مطلوبة فعلًا في السوق؟",
    },
    options: [
      { en: "Not launched", ar: "لسه مش متأكد" },
      { en: "Testing", ar: "متأكد بدرجة بسيطة" },
      { en: "Getting occasional sales", ar: "متأكد إلى حد ما" },
      { en: "Consistent sales", ar: "متأكد جدًا" },
      { en: "Highly validated", ar: "متأكد بشكل كامل" },
    ],
  },
  {
    key: "revenueUrgency",
    scoreVar: "revenueUrgencyScore",
    type: "slider",
    prompt: {
      en: "How urgently do you need revenue in the next 90 days?",
      ar: "قد إيه مهم بالنسبة لك تزود المبيعات خلال الـ90 يوم الجايين؟",
    },
    slider: {
      min: 1,
      max: 10,
      minLabel: { en: "Not urgent", ar: "مش أولوية دلوقتي" },
      maxLabel: { en: "Extremely urgent", ar: "أولوية قصوى" },
    },
  },
];

export interface FunnelCopy {
  code: "TOF" | "MOF" | "BOF";
  name: LocalizedText;
  fullName: LocalizedText;
  description: LocalizedText;
  examples: { en: string; ar: string }[];
}

export const FUNNELS: FunnelCopy[] = [
  {
    code: "TOF",
    name: { en: "TOF", ar: "TOF" },
    fullName: { en: "Top of Funnel", ar: "أعلى القمع" },
    description: {
      en: "Focus on reaching people who do not know you yet.",
      ar: "ركز على الوصول لناس جديدة لسه ما تعرفكش.",
    },
    examples: [
      { en: "Educational content", ar: "محتوى تعليمي" },
      { en: "Strong hooks", ar: "هوكات قوية" },
      { en: "Common mistakes", ar: "أخطاء شائعة" },
      { en: "Industry myths", ar: "مفاهيم غلط في السوق" },
      { en: "Relatable content", ar: "محتوى الناس تقدر تتفاعل معاه" },
    ],
  },
  {
    code: "MOF",
    name: { en: "MOF", ar: "MOF" },
    fullName: { en: "Middle of Funnel", ar: "منتصف القمع" },
    description: {
      en: "Build trust and authority with people who already know you.",
      ar: "ابني ثقة وخبرة عند الناس اللي بدأت تعرفك.",
    },
    examples: [
      { en: "Case studies", ar: "دراسات حالة" },
      { en: "Behind the scenes", ar: "كواليس" },
      { en: "Personal stories", ar: "قصص شخصية" },
      { en: "Process breakdowns", ar: "شرح طريقة شغلك" },
      { en: "Authority content", ar: "محتوى يثبت خبرتك" },
    ],
  },
  {
    code: "BOF",
    name: { en: "BOF", ar: "BOF" },
    fullName: { en: "Bottom of Funnel", ar: "أسفل القمع" },
    description: {
      en: "Turn attention into leads and customers.",
      ar: "حول الاهتمام لمبيعات وعملاء.",
    },
    examples: [
      { en: "Testimonials", ar: "آراء العملاء" },
      { en: "Offer breakdowns", ar: "شرح العرض أو الخدمة" },
      { en: "Objection handling", ar: "الرد على الاعتراضات" },
      { en: "Client results", ar: "نتائج العملاء" },
      { en: "Direct CTA content", ar: "دعوة واضحة للتواصل أو الشراء" },
    ],
  },
];

export const WEEKLY_OPTIONS = [3, 5, 7, 10, 14, 20];

export const UI = {
  brand: { en: "ESMA", ar: "ESMA" },
  brandSub: {
    en: "Content Split Calculator",
    ar: "حاسبة توزيع المحتوى",
  },
  langLabel: { en: "العربية", ar: "English" },
  // Landing
  badge: {
    en: "Premium Content Strategy Tool",
    ar: "أداة احترافية لاستراتيجية المحتوى",
  },
  headline: {
    en: "Discover Your Ideal ESMA Content Split",
    ar: "اعرف التوزيع المثالي للمحتوى بتاعك",
  },
  subheadline: {
    en: "Answer 8 quick questions and instantly discover how much of your content should focus on awareness, trust, and conversion.",
    ar: "جاوب على 8 أسئلة سريعة واعرف فورًا المحتوى بتاعك المفروض يتوزع إزاي بين الانتشار والثقة والمبيعات.",
  },
  startCta: { en: "Start Assessment", ar: "ابدأ التقييم" },
  landingPoints: [
    {
      en: "8 questions · about 2 minutes",
      ar: "8 أسئلة · حوالي دقيقتين",
    },
    { en: "Instant tailored results", ar: "نتائج فورية ومخصصة" },
    { en: "Weekly content plan included", ar: "خطة محتوى أسبوعية معاها" },
  ],
  funnelIntro: [
    {
      code: "TOF",
      title: { en: "Awareness", ar: "الانتشار" },
      desc: {
        en: "Attract new people",
        ar: "تجذب ناس جديدة",
      },
    },
    {
      code: "MOF",
      title: { en: "Trust", ar: "الثقة" },
      desc: {
        en: "Build authority",
        ar: "تبني خبرتك",
      },
    },
    {
      code: "BOF",
      title: { en: "Conversion", ar: "المبيعات" },
      desc: {
        en: "Generate sales",
        ar: "تجيب مبيعات",
      },
    },
  ],
  // Questionnaire
  questionLabel: { en: "Question", ar: "سؤال" },
  of: { en: "of", ar: "من" },
  back: { en: "Back", ar: "رجوع" },
  next: { en: "Next", ar: "التالي" },
  seeResults: { en: "See Results", ar: "شوف النتيجة" },
  // Results
  resultsTitle: {
    en: "Your ESMA Content Split",
    ar: "التوزيع المثالي للمحتوى بتاعك",
  },
  resultsSubtitle: {
    en: "Based on your current stage, here is where your content energy should go.",
    ar: "بناءً على مرحلتك الحالية، ده المكان اللي لازم تركز فيه طاقة المحتوى بتاعك.",
  },
  examplesLabel: { en: "Content ideas", ar: "أفكار محتوى" },
  plannerTitle: {
    en: "Recommended Weekly Split",
    ar: "التوزيع الأسبوعي المقترح",
  },
  plannerSubtitle: {
    en: "Pick how many videos you publish per week and we'll do the math.",
    ar: "اختار بتنزل كام فيديو في الأسبوع وإحنا نحسبهالك.",
  },
  videosPerWeek: { en: "videos / week", ar: "فيديو / أسبوع" },
  videosUnit: { en: "videos", ar: "فيديو" },
  video: { en: "video", ar: "فيديو" },
  startOver: { en: "Start Over", ar: "ابدأ من جديد" },
  copyResults: { en: "Copy Results", ar: "انسخ النتيجة" },
  copied: { en: "Copied!", ar: "تم النسخ!" },
  downloadPdf: { en: "Download PDF", ar: "تحميل PDF" },
  preparing: { en: "Preparing…", ar: "جاري التجهيز…" },
  weeklyPlanHeading: { en: "Your weekly plan", ar: "خطتك الأسبوعية" },
  copyTitle: {
    en: "ESMA Content Split",
    ar: "توزيع محتوى ESMA",
  },
  footer: {
    en: "Part of the premium content creation course.",
    ar: "جزء من كورس صناعة المحتوى الاحترافي.",
  },
} as const;

export function t(text: LocalizedText, lang: "en" | "ar"): string {
  return text[lang];
}
