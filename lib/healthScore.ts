import type { EsmaSplit, Lang, LocalizedText, Scores } from "./types";

export type HealthLabel = "needsWork" | "improving" | "strong" | "excellent";

export interface HealthScore {
  score: number;
  label: HealthLabel;
  labelText: LocalizedText;
  reasons: LocalizedText[];
  actions: LocalizedText[];
}

interface Dimension {
  key: string;
  /** 0..1 strength */
  value: number;
  strength: LocalizedText;
  weakness: LocalizedText;
  action: LocalizedText;
}

function labelFor(score: number): { label: HealthLabel; text: LocalizedText } {
  if (score <= 39)
    return {
      label: "needsWork",
      text: { en: "Needs Work", ar: "محتاج شغل" },
    };
  if (score <= 69)
    return {
      label: "improving",
      text: { en: "Improving", ar: "بيتحسن" },
    };
  if (score <= 84)
    return { label: "strong", text: { en: "Strong", ar: "قوي" } };
  return { label: "excellent", text: { en: "Excellent", ar: "ممتاز" } };
}

/**
 * Estimate a Content Health Score out of 100 from the questionnaire scores
 * and the resulting split. Simple, logical weighting:
 *   consistency, offer clarity, proof, trust, balance — 20 points each.
 */
export function computeHealthScore(
  scores: Scores,
  split: EsmaSplit,
  lang: Lang
): HealthScore {
  const spread =
    Math.max(split.tof, split.mof, split.bof) -
    Math.min(split.tof, split.mof, split.bof);

  const dims: Dimension[] = [
    {
      key: "consistency",
      value: scores.onlineAgeScore / 4,
      strength: {
        en: "You've been posting consistently, which builds momentum.",
        ar: "بتنزل محتوى بانتظام، وده بيبني زخم قوي.",
      },
      weakness: {
        en: "Posting isn't consistent enough yet.",
        ar: "النزول لسه مش منتظم كفاية.",
      },
      action: {
        en: "Commit to a fixed weekly posting schedule and stick to it.",
        ar: "التزم بمواعيد ثابتة للنشر كل أسبوع وامشي عليها.",
      },
    },
    {
      key: "offer",
      value: scores.offerValidationScore / 4,
      strength: {
        en: "Your offer is validated and proven in the market.",
        ar: "العرض بتاعك مجرّب وأثبت إنه مطلوب في السوق.",
      },
      weakness: {
        en: "Your offer still needs more validation.",
        ar: "العرض بتاعك لسه محتاج إثبات إنه مطلوب.",
      },
      action: {
        en: "Make your offer clearer and test it with a small audience.",
        ar: "خلّي العرض بتاعك أوضح وجرّبه على عدد صغير من الناس.",
      },
    },
    {
      key: "proof",
      value: scores.proofScore / 4,
      strength: {
        en: "You have strong proof that your offer works.",
        ar: "عندك إثبات قوي إن اللي بتقدمه بيجيب نتيجة.",
      },
      weakness: {
        en: "You don't show enough proof or results yet.",
        ar: "لسه مش بتورّي إثبات أو نتايج كفاية.",
      },
      action: {
        en: "Collect and post results, case studies, and testimonials.",
        ar: "اجمع وانزل نتايج ودراسات حالة وآراء عملاء.",
      },
    },
    {
      key: "trust",
      value: scores.trustScore / 4,
      strength: {
        en: "Your audience trusts you, which makes selling easier.",
        ar: "جمهورك واثق فيك، وده بيسهّل البيع.",
      },
      weakness: {
        en: "Trust with your audience is still low.",
        ar: "الثقة مع جمهورك لسه ضعيفة.",
      },
      action: {
        en: "Share more behind-the-scenes and authority content.",
        ar: "شارك كواليس أكتر ومحتوى بيثبت خبرتك.",
      },
    },
    {
      key: "balance",
      value: Math.max(0, 1 - spread / 100),
      strength: {
        en: "Your funnel mix is well balanced across all three stages.",
        ar: "توزيع القمع عندك متوازن بين التلات مراحل.",
      },
      weakness: {
        en: "Your content leans too heavily on one stage.",
        ar: "محتواك مايل أوي لمرحلة واحدة بس.",
      },
      action: {
        en: "Rebalance your content to cover awareness, trust, and conversion.",
        ar: "وازن محتواك عشان يغطي الانتشار والثقة والمبيعات.",
      },
    },
  ];

  const score = Math.round(
    dims.reduce((sum, d) => sum + d.value * 20, 0)
  );
  const clamped = Math.max(0, Math.min(100, score));
  const { label, text } = labelFor(clamped);

  // Reasons: the single strongest dimension + the two weakest.
  const byValueDesc = [...dims].sort((a, b) => b.value - a.value);
  const byValueAsc = [...dims].sort((a, b) => a.value - b.value);

  const reasons: LocalizedText[] = [
    byValueDesc[0].value >= 0.5
      ? byValueDesc[0].strength
      : byValueAsc[0].weakness,
    byValueAsc[0].weakness,
    byValueAsc[1].weakness,
  ];

  const actions: LocalizedText[] = [
    byValueAsc[0].action,
    byValueAsc[1].action,
    byValueAsc[2].action,
  ];

  return { score: clamped, label, labelText: text, reasons, actions };
}
