import type { EsmaSplit, IndustryId, Lang, Scores } from "./types";
import type { BottleneckType } from "./recommendations";
import {
  generatePersonalizedStrategy,
  type PersonalizedStrategy,
} from "./aiStrategy";

/**
 * AI provider abstraction.
 *
 * The app ships in "local" mode: a fully offline, deterministic strategy
 * engine that needs no API keys and works perfectly. The architecture below
 * lets you plug in OpenAI or Claude later WITHOUT changing any UI code —
 * just implement the fetch in `runRemote` and flip AI_MODE (or wire it to an
 * env var). If a remote call fails, we always fall back to local so the app
 * never breaks.
 */
export type AiMode = "local" | "openai" | "claude";

/** Default mode. Change to "openai" / "claude" once a backend is wired. */
export const AI_MODE: AiMode =
  (process.env.NEXT_PUBLIC_AI_MODE as AiMode) || "local";

export interface StrategyInput {
  businessDescription?: string;
  industry?: IndustryId;
  split: EsmaSplit;
  scores: Scores;
  language: Lang;
  bottleneck?: BottleneckType;
}

/** Synchronous local generation (used directly by the UI today). */
export function getLocalStrategy(input: StrategyInput): PersonalizedStrategy {
  return generatePersonalizedStrategy(input);
}

/**
 * Async entry point for future remote providers. Always resolves to a valid
 * strategy: remote when configured & successful, local otherwise.
 */
export async function getStrategy(
  input: StrategyInput
): Promise<PersonalizedStrategy> {
  if (AI_MODE === "local") return getLocalStrategy(input);
  try {
    const remote = await runRemote(AI_MODE, input);
    return remote ?? getLocalStrategy(input);
  } catch {
    return getLocalStrategy(input);
  }
}

/**
 * Placeholder for remote providers. Intentionally returns null so the app
 * uses the local engine until a real implementation (and server-side key
 * handling) is added. Example shape is documented for whoever wires this up.
 */
async function runRemote(
  _mode: Exclude<AiMode, "local">,
  _input: StrategyInput
): Promise<PersonalizedStrategy | null> {
  // TODO: call your own /api/strategy route here (keep keys server-side).
  // const res = await fetch("/api/strategy", { method: "POST", body: JSON.stringify(_input) });
  // if (!res.ok) return null;
  // return (await res.json()) as PersonalizedStrategy;
  return null;
}
