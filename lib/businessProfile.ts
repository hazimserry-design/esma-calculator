import type {
  BusinessProfile,
  EsmaSplit,
  IndustryId,
  Scores,
} from "./types";

/**
 * A fully local "understanding" layer. Reads the free-text business
 * description (plus the chosen industry and the scores) and infers a set of
 * strategic assumptions. No API required. Works in English and Arabic input.
 */

const has = (text: string, words: string[]) =>
  words.some((w) => text.includes(w));

const B2B_WORDS = [
  "b2b", "business", "businesses", "company", "companies", "agency",
  "agencies", "saas", "software", "enterprise", "clients", "wholesale",
  "supplier", "consult", "shركات", "شركات", "شركة", "مصانع", "موردين",
  "تجار", "بيزنس",
];
const B2C_WORDS = [
  "people", "customers", "consumer", "shoppers", "patients", "members",
  "students", "guests", "lose weight", "fitness", "beauty", "flower",
  "ناس", "عملاء", "زباين", "مرضى", "طلاب", "ستات", "رجالة", "أطفال",
];
const LOCAL_WORDS = [
  "local", "gym", "restaurant", "cafe", "clinic", "salon", "shop", "store",
  "city", "area", "delivery", "near", "محلي", "محل", "مطعم", "كافيه",
  "عيادة", "صالون", "منطقة", "مدينة", "توصيل", "فرع",
];
const ONLINE_WORDS = [
  "online", "ecommerce", "e-commerce", "course", "app", "software", "saas",
  "digital", "website", "store online", "أونلاين", "اونلاين", "كورس",
  "تطبيق", "موقع", "متجر",
];
const PRODUCT_WORDS = [
  "sell", "product", "products", "handmade", "furniture", "flower", "clothes",
  "store", "shop", "ecommerce", "e-commerce", "بيع", "منتج", "منتجات",
  "بضاعة", "متجر", "محل", "ورد", "أثاث", "هدوم",
];
const SERVICE_WORDS = [
  "help", "service", "services", "consult", "coaching", "agency", "clinic",
  "repair", "design", "marketing", "training", "خدمة", "خدمات", "مساعدة",
  "استشارة", "كوتشينج", "تصميم", "تسويق", "تدريب", "صيانة",
];
const PREMIUM_WORDS = [
  "luxury", "premium", "high-end", "exclusive", "bespoke", "elite",
  "high ticket", "high-ticket", "فخم", "لاكشري", "راقي", "حصري", "بريميوم",
  "غالي", "هاي تيكت",
];
const MASS_WORDS = [
  "cheap", "affordable", "budget", "mass", "everyday", "رخيص", "اقتصادي",
  "في المتناول", "للجميع",
];

const HIGH_TICKET_INDUSTRIES: IndustryId[] = [
  "consultant", "agency", "realestate", "clinic", "course",
];
const LOCAL_INDUSTRIES: IndustryId[] = [
  "restaurant", "gym", "clinic", "localservice", "realestate",
];
const PRODUCT_INDUSTRIES: IndustryId[] = ["ecommerce", "restaurant"];
const B2B_INDUSTRIES: IndustryId[] = ["agency"];

export function inferBusinessProfile({
  description,
  industry,
  split,
  scores,
}: {
  description?: string;
  industry?: IndustryId;
  split: EsmaSplit;
  scores: Scores;
}): BusinessProfile {
  const text = (description ?? "").toLowerCase().trim();
  const keywords: string[] = [];

  // --- Audience: B2B vs B2C ---
  let audience: BusinessProfile["audience"] = "consumers";
  const b2b = has(text, B2B_WORDS) || (industry && B2B_INDUSTRIES.includes(industry));
  const b2c = has(text, B2C_WORDS);
  if (b2b && b2c) audience = "mixed";
  else if (b2b) audience = "businesses";
  else audience = "consumers";

  // --- Reach: local vs online ---
  let reach: BusinessProfile["reach"] = "mixed";
  const local = has(text, LOCAL_WORDS) || (industry && LOCAL_INDUSTRIES.includes(industry));
  const online = has(text, ONLINE_WORDS) || industry === "ecommerce" || industry === "course";
  if (local && online) reach = "mixed";
  else if (local) reach = "local";
  else if (online) reach = "online";
  else reach = "mixed";

  // --- Offer type: service vs product ---
  let offerType: BusinessProfile["offerType"] = "service";
  const product = has(text, PRODUCT_WORDS) || (industry && PRODUCT_INDUSTRIES.includes(industry));
  const service = has(text, SERVICE_WORDS);
  if (product && service) offerType = "mixed";
  else if (product) offerType = "product";
  else offerType = "service";

  // --- Market positioning ---
  let market: BusinessProfile["market"] = "mid";
  if (has(text, PREMIUM_WORDS) || (industry && HIGH_TICKET_INDUSTRIES.includes(industry)))
    market = "premium";
  else if (has(text, MASS_WORDS)) market = "mass";

  // --- Awareness / Trust / Complexity (driven by scores + split) ---
  const awarenessLevel =
    scores.awarenessScore <= 1 ? "low" : scores.awarenessScore <= 2 ? "medium" : "high";
  const trustRequirement =
    market === "premium" || audience === "businesses"
      ? "high"
      : scores.trustScore <= 1
        ? "high"
        : scores.trustScore <= 2
          ? "medium"
          : "low";
  const purchaseComplexity =
    market === "premium" || audience === "businesses"
      ? "high"
      : offerType === "product" && reach !== "local"
        ? "low"
        : "medium";

  // collect a few matched keywords for flavor
  [...PREMIUM_WORDS, ...LOCAL_WORDS, ...ONLINE_WORDS].forEach((w) => {
    if (text.includes(w) && keywords.length < 6) keywords.push(w);
  });

  return {
    audience,
    reach,
    offerType,
    market,
    awarenessLevel,
    trustRequirement,
    purchaseComplexity,
    keywords,
  };
}
