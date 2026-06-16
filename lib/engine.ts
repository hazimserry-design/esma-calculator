import type { Answers, EsmaSplit, Scores } from "./types";

/**
 * Build the named score variables from raw answer values.
 * Choice answers are already 0-based indices (Option 1 = 0 ... Option 5 = 4).
 * Revenue urgency is a 1-10 slider.
 */
export function buildScores(answers: Answers): Scores {
  return {
    businessAgeScore: answers.businessAge ?? 0,
    onlineAgeScore: answers.onlineAge ?? 0,
    awarenessScore: answers.awareness ?? 0,
    trustScore: answers.trust ?? 0,
    proofScore: answers.proof ?? 0,
    loyaltyScore: answers.loyalty ?? 0,
    offerValidationScore: answers.offerValidation ?? 0,
    revenueUrgencyScore: answers.revenueUrgency ?? 1,
  };
}

const MIN_PCT = 5;

/**
 * ESMA calculation engine. Returns whole-number percentages that always
 * sum to exactly 100, with no category below 5%.
 */
export function calculateSplit(scores: Scores): EsmaSplit {
  let tof = 40;
  let mof = 35;
  let bof = 25;

  // Awareness Impact
  if (scores.awarenessScore === 0) tof += 25;
  else if (scores.awarenessScore === 1) tof += 15;
  else if (scores.awarenessScore === 2) tof += 8;

  // Trust Impact
  if (scores.trustScore === 0) mof += 20;
  else if (scores.trustScore === 1) mof += 12;
  else if (scores.trustScore === 2) mof += 6;

  // Proof Impact
  if (scores.proofScore === 0) {
    bof -= 15;
    mof += 15;
  } else if (scores.proofScore === 1) {
    bof -= 10;
    mof += 10;
  } else if (scores.proofScore === 2) {
    bof -= 5;
    mof += 5;
  }

  // Offer Validation Impact
  if (scores.offerValidationScore === 3) bof += 8;
  else if (scores.offerValidationScore === 4) bof += 15;

  // Revenue Urgency Impact
  if (scores.revenueUrgencyScore >= 8) bof += 10;
  else if (scores.revenueUrgencyScore >= 5) bof += 5;

  // Business & Online Age Impact
  const bothEarly =
    (scores.businessAgeScore === 0 || scores.businessAgeScore === 1) &&
    (scores.onlineAgeScore === 0 || scores.onlineAgeScore === 1);
  const bothMature =
    (scores.businessAgeScore === 3 || scores.businessAgeScore === 4) &&
    (scores.onlineAgeScore === 3 || scores.onlineAgeScore === 4);
  if (bothEarly) tof += 15;
  if (bothMature) bof += 10;

  // Loyalty Impact (folded into conversion strength)
  if (scores.loyaltyScore === 3) bof += 5;
  else if (scores.loyaltyScore === 4) bof += 10;

  return normalize(tof, mof, bof);
}

/**
 * Normalize three raw weights into whole percentages summing to exactly 100,
 * enforcing a 5% floor on every category.
 */
function normalize(rawTof: number, rawMof: number, rawBof: number): EsmaSplit {
  // Guard against negatives before proportional scaling.
  let tof = Math.max(rawTof, 0);
  let mof = Math.max(rawMof, 0);
  let bof = Math.max(rawBof, 0);

  const total = tof + mof + bof || 1;
  tof = (tof / total) * 100;
  mof = (mof / total) * 100;
  bof = (bof / total) * 100;

  // Round to whole numbers.
  let r = {
    tof: Math.round(tof),
    mof: Math.round(mof),
    bof: Math.round(bof),
  };

  // Enforce the minimum floor by borrowing from the largest categories.
  r = enforceFloor(r);

  // Reconcile rounding so the total is exactly 100.
  r = reconcileToHundred(r);

  return r;
}

function enforceFloor(s: EsmaSplit): EsmaSplit {
  const keys: (keyof EsmaSplit)[] = ["tof", "mof", "bof"];
  const out: EsmaSplit = { ...s };

  for (const k of keys) {
    if (out[k] < MIN_PCT) {
      const deficit = MIN_PCT - out[k];
      out[k] = MIN_PCT;
      // Take the deficit from the largest other category.
      const donor = keys
        .filter((other) => other !== k)
        .sort((a, b) => out[b] - out[a])[0];
      out[donor] -= deficit;
    }
  }
  return out;
}

function reconcileToHundred(s: EsmaSplit): EsmaSplit {
  const out: EsmaSplit = { ...s };
  let sum = out.tof + out.mof + out.bof;
  const keys: (keyof EsmaSplit)[] = ["tof", "mof", "bof"];

  // If 99 or 101 (or further off), adjust the largest category.
  while (sum !== 100) {
    const diff = 100 - sum; // +1 means we must add, -1 means subtract
    const step = diff > 0 ? 1 : -1;
    // Pick the largest category that stays >= floor after the change.
    const target = keys
      .slice()
      .sort((a, b) => out[b] - out[a])
      .find((k) => out[k] + step >= MIN_PCT);
    if (!target) break;
    out[target] += step;
    sum += step;
  }
  return out;
}

/**
 * Distribute a weekly video count across the split so the parts always sum
 * to the chosen total. Uses largest-remainder rounding.
 */
export function distributeVideos(
  split: EsmaSplit,
  totalVideos: number
): EsmaSplit {
  const raw = {
    tof: (split.tof / 100) * totalVideos,
    mof: (split.mof / 100) * totalVideos,
    bof: (split.bof / 100) * totalVideos,
  };

  const floored: EsmaSplit = {
    tof: Math.floor(raw.tof),
    mof: Math.floor(raw.mof),
    bof: Math.floor(raw.bof),
  };

  let remaining =
    totalVideos - (floored.tof + floored.mof + floored.bof);

  const remainders = (["tof", "mof", "bof"] as (keyof EsmaSplit)[])
    .map((k) => ({ k, frac: raw[k] - Math.floor(raw[k]) }))
    .sort((a, b) => b.frac - a.frac);

  let i = 0;
  while (remaining > 0) {
    floored[remainders[i % 3].k] += 1;
    remaining -= 1;
    i += 1;
  }

  return floored;
}
