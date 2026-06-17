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

/** How confident the user feels about executing the plan consistently. */
export type ExecutionConfidence = "very" | "somewhat" | "not";

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
