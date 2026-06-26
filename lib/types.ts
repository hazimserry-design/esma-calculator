export type Lang = "en" | "ar";

export type QuestionType = "choice" | "slider";

export type QuestionKey =
  | "businessAge"
  | "onlineAge"
  | "awareness"
  | "trust"
  | "proof"
  | "loyalty"
  | "offerValidation"
  | "revenueUrgency";

export interface LocalizedText {
  en: string;
  ar: string;
}

export interface Question {
  key: QuestionKey;
  /** maps to the *Score variable name used by the engine */
  scoreVar: string;
  type: QuestionType;
  prompt: LocalizedText;
  /** present for choice questions */
  options?: LocalizedText[];
  /** present for slider questions */
  slider?: {
    min: number;
    max: number;
    minLabel: LocalizedText;
    maxLabel: LocalizedText;
  };
}

/** Answer values: choice index (0-4) or slider value (1-10). */
export type Answers = Partial<Record<QuestionKey, number>>;

/** Supported business / industry types (optional, not scored). */
export type IndustryId =
  | "consultant"
  | "agency"
  | "ecommerce"
  | "restaurant"
  | "gym"
  | "realestate"
  | "clinic"
  | "course"
  | "localservice"
  | "other";

export type FunnelStage = "tof" | "mof" | "bof";

export interface Scores {
  businessAgeScore: number;
  onlineAgeScore: number;
  awarenessScore: number;
  trustScore: number;
  proofScore: number;
  loyaltyScore: number;
  offerValidationScore: number;
  revenueUrgencyScore: number;
}

export interface EsmaSplit {
  tof: number;
  mof: number;
  bof: number;
}

/** Price positioning relative to the industry. */
export type PriceLevel = "low" | "mid" | "high";

/**
 * Structured business brief collected in the funnel. Sent to the
 * `content-strategy` edge function to generate an AI content plan, and also
 * used (joined into one line) to feed the local strategy engine.
 */
export interface ContentBrief {
  /** Who I sell to */
  audience: string;
  /** What problem I solve */
  problem: string;
  /** Price level vs industry */
  price: PriceLevel | "";
  /** Location (optional) */
  location: string;
}

export const EMPTY_BRIEF: ContentBrief = {
  audience: "",
  problem: "",
  price: "",
  location: "",
};

/** One subtopic returned by the AI content strategist. */
export interface StrategySubtopic {
  name: string;
  searchPhrases: string[];
  videoIdeas: string[];
}

/** Full payload returned by the `content-strategy` edge function. */
export interface ContentStrategyResult {
  summary: string;
  subtopics: StrategySubtopic[];
}

/** Inferred read of the user's business from their one-line description. */
export interface BusinessProfile {
  /** B2B vs B2C */
  audience: "businesses" | "consumers" | "mixed";
  /** local storefront / area vs online reach */
  reach: "local" | "online" | "mixed";
  /** selling a service vs a physical product */
  offerType: "service" | "product" | "mixed";
  /** premium / mid / mass-market positioning */
  market: "premium" | "mid" | "mass";
  awarenessLevel: "low" | "medium" | "high";
  trustRequirement: "low" | "medium" | "high";
  purchaseComplexity: "low" | "medium" | "high";
  /** matched keywords from the description (for debugging / flavor) */
  keywords: string[];
}
