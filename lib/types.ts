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
