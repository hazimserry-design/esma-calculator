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
  brand: { en: "HOMUS", ar: "HOMUS" },
  brandSub: {
    en: "AI Content Strategy Engine",
    ar: "محرّك استراتيجية المحتوى",
  },
  langLabel: { en: "العربية", ar: "English" },
  // Landing
  badge: {
    en: "Free AI Content Strategy Engine",
    ar: "محرّك استراتيجية محتوى مجاني بالذكاء الاصطناعي",
  },
  headline: {
    en: "Know Exactly What Content To Post Next",
    ar: "اعرف بالظبط تنزل إيه بعد كده",
  },
  subheadline: {
    en: "Answer a few quick questions and get a personalized content strategy: your funnel split, a 30-day calendar, ready-to-post ideas, and your biggest growth opportunity.",
    ar: "جاوب على كام سؤال سريع واطلع باستراتيجية محتوى مخصصة ليك: توزيع القمع، تقويم 30 يوم، أفكار جاهزة للنشر، وأكبر فرصة نمو عندك.",
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
    en: "Your Content Strategy",
    ar: "استراتيجية المحتوى بتاعك",
  },
  resultsSubtitle: {
    en: "Based on your answers, here is your personalized plan — what to post, why, and how to grow.",
    ar: "بناءً على إجاباتك، دي خطتك المخصصة — تنزل إيه، وليه، وتكبر إزاي.",
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
    en: "HOMUS — the content system that helps you execute. homus.biz",
    ar: "HOMUS — النظام اللي بيساعدك تنفّذ المحتوى صح. homus.biz",
  },

  // Industry step
  industryQuestion: {
    en: "What type of business do you run?",
    ar: "بتشتغل في نوع بيزنس إيه؟",
  },
  industryOptional: {
    en: "Optional — this helps us personalize your ideas.",
    ar: "اختياري — بيساعدنا نخصّص الأفكار ليك.",
  },
  skip: { en: "Skip", ar: "تخطّي" },

  // Content ideas
  ideasTitle: { en: "Content Ideas You Can Post", ar: "أفكار محتوى تقدر تنزلها" },
  ideasSubtitle: {
    en: "Ready-to-use ideas for each stage, tailored to your business.",
    ar: "أفكار جاهزة لكل مرحلة، متظبطة على نوع البيزنس بتاعك.",
  },
  copyIdeas: { en: "Copy Ideas", ar: "انسخ الأفكار" },

  // Calendar
  calendarTitle: { en: "Your 30-Day Content Calendar", ar: "تقويم المحتوى لـ 30 يوم" },
  calendarSubtitle: {
    en: "A full month of posts that follow your split.",
    ar: "شهر كامل من البوستات على نفس توزيعك.",
  },
  copyCalendar: { en: "Copy Calendar", ar: "انسخ التقويم" },
  dayLabel: { en: "Day", ar: "يوم" },
  colDay: { en: "Day", ar: "اليوم" },
  colStage: { en: "Stage", ar: "المرحلة" },
  colFormat: { en: "Format", ar: "الشكل" },
  colIdea: { en: "Post idea", ar: "فكرة البوست" },

  // Why this split
  whyTitle: { en: "Why This Split Makes Sense", ar: "ليه التوزيع ده مظبوط ليك" },
  overFocusLabel: {
    en: "What if you over-focus on one stage?",
    ar: "هيحصل إيه لو ركّزت على مرحلة واحدة بس؟",
  },

  // Health score
  healthTitle: { en: "Content Health Score", ar: "تقييم صحة المحتوى" },
  healthSubtitle: {
    en: "A quick read on how healthy your content engine is.",
    ar: "نظرة سريعة على صحة ماكينة المحتوى بتاعتك.",
  },
  whyScore: { en: "Why this score", ar: "ليه الدرجة دي" },
  nextActions: { en: "Next actions", ar: "خطوات تعملها بعد كده" },

  // Bottleneck
  bottleneckTitle: { en: "Your Biggest Content Bottleneck", ar: "أكبر مشكلة في المحتوى عندك" },
  fixFirstLabel: { en: "What to fix first", ar: "تصلّح إيه الأول" },
  recommendedPosts: { en: "5 recommended post types", ar: "5 أنواع بوستات منصوح بيها" },

  // Benchmark
  benchmarkTitle: { en: "How Your Split Compares", ar: "توزيعك مقارنة بمين" },
  benchmarkSubtitle: {
    en: "Guidance, not a rulebook — see which stage you're closest to.",
    ar: "ده إرشاد مش قانون — شوف أقرب مرحلة ليك.",
  },
  yourSplitLabel: { en: "You", ar: "إنت" },
  closestLabel: { en: "Closest match", ar: "أقرب تطابق" },

  // CTA
  ctaTitle: {
    en: "Want us to turn this into a full content system for your business?",
    ar: "عايزنا نحوّل ده لنظام محتوى كامل للبيزنس بتاعك؟",
  },
  ctaSubtext: {
    en: "We can help you build a content strategy that attracts the right audience, builds trust, and converts attention into revenue.",
    ar: "نقدر نساعدك تبني استراتيجية محتوى بتجيب الجمهور الصح، وتبني ثقة، وتحوّل الاهتمام لفلوس.",
  },
  bookConsultation: { en: "Book a Consultation", ar: "احجز استشارة" },
  messageWhatsapp: { en: "Message on WhatsApp", ar: "كلّمنا على واتساب" },

  // Ask HOMUS
  askTitle: { en: "Ask HOMUS", ar: "اسأل HOMUS" },
  askSubtitle: {
    en: "Pick a question to get a quick answer based on your results.",
    ar: "اختار سؤال وهتلاقي إجابة سريعة على حسب نتيجتك.",
  },
  askPickHint: {
    en: "Tap a question above to see your answer.",
    ar: "دوس على سؤال فوق عشان تشوف الإجابة.",
  },

  // Lead capture
  leadTitle: { en: "Where should we send your report?", ar: "نبعتلك التقرير فين؟" },
  leadSubtitle: {
    en: "Add your details and we'll keep your report handy. You can skip too.",
    ar: "سيب بياناتك ونحتفظلك بالتقرير. وتقدر تتخطّى برضه.",
  },
  nameLabel: { en: "Name", ar: "الاسم" },
  emailLabel: { en: "Email", ar: "الإيميل" },
  whatsappLabel: { en: "Phone number", ar: "رقم الموبايل" },
  downloadReport: { en: "Download Report", ar: "حمّل التقرير" },
  skipAndDownload: { en: "Skip and Download", ar: "تخطّى وحمّل" },
  reportNote: {
    en: "The report (PDF) is in English. The whole site stays in your language.",
    ar: "التقرير (PDF) باللغة الإنجليزية. الموقع كله بيفضل بلغتك.",
  },

  // Business description step
  bizDescTitle: { en: "Describe your business in one sentence.", ar: "اوصف البيزنس بتاعك في جملة واحدة." },
  bizDescOptional: {
    en: "Optional but recommended — this makes your whole strategy more personal.",
    ar: "اختياري بس بننصح بيه — بيخلّي الاستراتيجية كلها أقرب ليك.",
  },
  bizDescPlaceholder: {
    en: "e.g. I help dentists get more patients.",
    ar: "مثال: بساعد دكاترة الأسنان يجيبوا مرضى أكتر.",
  },
  bizDescExamplesLabel: { en: "Examples", ar: "أمثلة" },
  bizDescExamples: [
    { en: "I help dentists get more patients.", ar: "بساعد دكاترة الأسنان يجيبوا مرضى أكتر." },
    { en: "I sell handmade furniture.", ar: "ببيع أثاث هاند ميد." },
    { en: "I run a luxury flower delivery service.", ar: "عندي خدمة توصيل ورد لاكشري." },
    { en: "I own a gym.", ar: "عندي جيم." },
    { en: "I sell software to restaurants.", ar: "ببيع سوفت وير للمطاعم." },
    { en: "I help people lose weight.", ar: "بساعد الناس تخس." },
  ],

  // Content brief step (feeds the AI content strategy)
  briefTitle: {
    en: "Tell us about your business.",
    ar: "قولّنا عن البيزنس بتاعك.",
  },
  briefSubtitle: {
    en: "We'll turn this into a custom content plan for Instagram & TikTok.",
    ar: "هنحوّل ده لخطة محتوى مخصّصة لإنستجرام وتيك توك.",
  },
  briefSellLabel: { en: "What you sell", ar: "بتبيع إيه" },
  briefSellPlaceholder: {
    en: "e.g. handmade scented candles",
    ar: "مثال: شمع معطّر هاند ميد",
  },
  briefAudienceLabel: { en: "Who you sell to", ar: "بتبيع لمين" },
  briefAudiencePlaceholder: {
    en: "e.g. women who love cozy homes",
    ar: "مثال: ستات بتحب جو البيت الدافي",
  },
  briefProblemLabel: { en: "The problem you solve", ar: "المشكلة اللي بتحلّها" },
  briefProblemPlaceholder: {
    en: "e.g. their home feels boring",
    ar: "مثال: بيتهم حاسينه ممل",
  },
  briefPriceLabel: {
    en: "Your price vs the market",
    ar: "سعرك مقارنة بالسوق",
  },
  briefPriceOptions: [
    { en: "Low", ar: "رخيص" },
    { en: "Mid", ar: "متوسط" },
    { en: "High", ar: "غالي" },
  ],
  briefLocationLabel: {
    en: "Location (optional)",
    ar: "المكان (اختياري)",
  },
  briefLocationPlaceholder: { en: "e.g. Cairo", ar: "مثال: القاهرة" },

  // AI content strategy section (on results)
  aiStrategyTitle: {
    en: "Your AI Content Strategy",
    ar: "استراتيجية المحتوى بالذكاء الاصطناعي",
  },
  aiStrategySubtitle: {
    en: "Specific subtopics, real search phrases, and video ideas — built for your business.",
    ar: "مواضيع فرعية محددة، كلمات بحث حقيقية، وأفكار فيديوهات — معمولة للبيزنس بتاعك.",
  },
  aiStrategyLoading: {
    en: "Generating your content strategy…",
    ar: "بنجهّز استراتيجية المحتوى بتاعتك…",
  },
  aiStrategyError: {
    en: "Couldn't generate the strategy right now. Tap to retry.",
    ar: "مش قادرين نجهّز الاستراتيجية دلوقتي. اضغط للمحاولة تاني.",
  },
  aiStrategyRetry: { en: "Retry", ar: "حاول تاني" },
  aiSearchPhrasesLabel: { en: "Search these", ar: "ابحث عن دول" },
  aiVideoIdeasLabel: { en: "Video ideas", ar: "أفكار فيديوهات" },
  aiStrategyCopy: { en: "Copy strategy", ar: "انسخ الاستراتيجية" },

  // Execution confidence question
  confidenceQuestion: {
    en: "How confident are you that you can execute this plan consistently?",
    ar: "قد إيه واثق إنك تقدر تنفّذ الخطة دي بانتظام؟",
  },
  confidenceOptions: [
    { en: "Very confident", ar: "واثق جدًا" },
    { en: "Somewhat confident", ar: "واثق لحد ما" },
    { en: "Not confident", ar: "مش واثق" },
  ],
  confidenceNotTitle: {
    en: "Most businesses don't fail because they lack information.",
    ar: "أغلب البيزنس مابيفشلش لأنه مش عارف.",
  },
  confidenceNotBody: {
    en: "They fail because they lack systems. That is exactly why HOMUS exists.",
    ar: "بيفشل لأنه مفيش عنده نظام. وده بالظبط سبب وجود HOMUS.",
  },

  // Business summary (AI read)
  aiReadTitle: { en: "What we understand about your business", ar: "اللي فهمناه عن البيزنس بتاعك" },

  // Strategy pack
  strategyTitle: { en: "Your Personalized Content Strategy", ar: "استراتيجية المحتوى المخصصة ليك" },
  strategySubtitle: {
    en: "Generated from your answers — hooks, angles, offers and more.",
    ar: "اتعملت من إجاباتك — هوكات، زوايا، عروض، وأكتر.",
  },
  hooksLabel: { en: "Content hooks", ar: "هوكات للمحتوى" },
  anglesLabel: { en: "Content angles", ar: "زوايا للمحتوى" },
  leadMagnetsLabel: { en: "Lead magnet ideas", ar: "أفكار ليد ماجنت" },
  ctaIdeasLabel: { en: "Call-to-action ideas", ar: "أفكار دعوات للتواصل" },
  offersLabel: { en: "Offer suggestions", ar: "اقتراحات عروض" },
  copyStrategy: { en: "Copy Strategy", ar: "انسخ الاستراتيجية" },

  // Content opportunity
  opportunityTitle: { en: "Your Biggest Content Opportunity", ar: "أكبر فرصة في المحتوى عندك" },
  oppLimiting: { en: "What's limiting your growth", ar: "اللي بيوقف نموك دلوقتي" },
  oppWhy: { en: "Why it matters", ar: "ليه ده مهم" },
  oppIgnored: { en: "If you ignore it", ar: "لو سِبته من غير حل" },
  oppFixed: { en: "If you fix it", ar: "لو ظبطته" },
  growthLabel: { en: "Growth opportunities", ar: "فرص للنمو" },
  mistakesLabel: { en: "Biggest mistakes to avoid", ar: "أكبر أخطاء تتجنّبها" },
  nextStepsLabel: { en: "Your next steps", ar: "خطواتك الجاية" },

  // Execution gap
  gapTitle: {
    en: "The calculator shows you WHAT to post. The HOMUS system shows you HOW to execute.",
    ar: "الحاسبة بتوريك تنزل إيه. ونظام HOMUS بيوريك تنفّذ إزاي.",
  },
  gapGivesLabel: { en: "This free tool gives you", ar: "الأداة المجانية دي بتديك" },
  gapNeedsLabel: { en: "But real execution needs", ar: "بس التنفيذ الحقيقي محتاج" },
  gapGives: [
    { en: "Diagnosis of your current stage", ar: "تشخيص لمرحلتك الحالية" },
    { en: "Your funnel split", ar: "توزيع القمع بتاعك" },
    { en: "Content ideas", ar: "أفكار محتوى" },
    { en: "A 30-day calendar", ar: "تقويم 30 يوم" },
  ],
  gapNeeds: [
    { en: "Research", ar: "بحث" },
    { en: "Content planning", ar: "تخطيط محتوى" },
    { en: "Hook writing", ar: "كتابة هوكات" },
    { en: "Scripting", ar: "كتابة سكريبت" },
    { en: "Filming", ar: "تصوير" },
    { en: "Editing", ar: "مونتاج" },
    { en: "Consistency systems", ar: "أنظمة للانتظام" },
    { en: "Optimization", ar: "تحسين مستمر" },
  ],

  // Course recommendation
  courseTitle: { en: "Recommended For You", ar: "منصوح بيه ليك" },
  courseWhy: { en: "Why this is your focus", ar: "ليه ده تركيزك" },
  courseModules: { en: "Modules that help", ar: "موديولات هتساعدك" },
  courseOutcomes: { en: "What you can expect", ar: "النتيجة اللي تتوقعها" },

  // Free vs full
  compareTitle: { en: "Free Report vs The HOMUS System", ar: "التقرير المجاني مقابل نظام HOMUS" },
  compareFreeTitle: { en: "Free Strategy Report", ar: "التقرير المجاني" },
  compareFullTitle: { en: "The HOMUS System", ar: "نظام HOMUS" },
  compareFree: [
    { en: "Funnel split", ar: "توزيع القمع" },
    { en: "30-day calendar", ar: "تقويم 30 يوم" },
    { en: "Content ideas", ar: "أفكار محتوى" },
    { en: "Diagnosis", ar: "تشخيص" },
  ],
  compareFull: [
    { en: "Research framework", ar: "إطار للبحث" },
    { en: "Content framework", ar: "إطار للمحتوى" },
    { en: "Hook framework", ar: "إطار للهوكات" },
    { en: "Scripting framework", ar: "إطار للسكريبت" },
    { en: "Filming framework", ar: "إطار للتصوير" },
    { en: "Editing framework", ar: "إطار للمونتاج" },
    { en: "Weekly implementation process", ar: "نظام تنفيذ أسبوعي" },
    { en: "Community", ar: "كوميونيتي" },
    { en: "Mentorship", ar: "متابعة ومنتورشيب" },
  ],

  // Success stories
  storiesTitle: { en: "Real Results From HOMUS", ar: "نتايج حقيقية من HOMUS" },
  storiesSubtitle: {
    en: "A few of the businesses that built a real content system.",
    ar: "كام بيزنس بنوا نظام محتوى حقيقي.",
  },
  storyProblem: { en: "Problem", ar: "المشكلة" },
  storyResult: { en: "Result", ar: "النتيجة" },

  // ROI estimator
  roiTitle: { en: "What Better Content Could Be Worth", ar: "المحتوى الأحسن ممكن يساوي كام" },
  roiSubtitle: {
    en: "A conservative estimate based on your own numbers.",
    ar: "تقدير متحفّظ على أساس أرقامك إنت.",
  },
  roiCustomerValue: { en: "Average customer value", ar: "متوسط قيمة العميل" },
  roiMonthlyCustomers: { en: "Customers per month", ar: "عدد العملاء في الشهر" },
  roiCurrentLabel: { en: "Current monthly revenue", ar: "الإيراد الشهري الحالي" },
  roiUpsideLabel: { en: "Potential extra / month", ar: "الزيادة المحتملة / شهر" },
  roiYearLabel: { en: "Extra per year", ar: "الزيادة في السنة" },
  roiNote: {
    en: "Estimate only — assumes a modest lift from more consistent, better-targeted content.",
    ar: "تقدير تقريبي بس — بيفترض تحسّن بسيط من محتوى أكتر انتظامًا وأدق استهدافًا.",
  },
  currency: { en: "EGP", ar: "ج.م" },

  // CTAs
  ctaBookCall: { en: "Book a Strategy Call", ar: "احجز مكالمة استراتيجية" },
  ctaVisitHomus: { en: "Visit HOMUS", ar: "زور HOMUS" },
  ctaGetHelp: { en: "Get Help Building This System", ar: "خد مساعدة في بناء النظام ده" },
  ctaWatchTraining: { en: "Watch Free Training", ar: "اتفرّج على تدريب مجاني" },

  // Ask kinds
  askKindPractical: { en: "Practical", ar: "عملي" },
  askKindStrategic: { en: "Strategic", ar: "استراتيجي" },
  askKindContent: { en: "Content", ar: "محتوى" },
} as const;

export function t(text: LocalizedText, lang: "en" | "ar"): string {
  return text[lang];
}
