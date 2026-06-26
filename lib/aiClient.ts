import type { ContentBrief, ContentStrategyResult, Lang } from "./types";
import { functionUrl, SUPABASE_HEADERS } from "./supabase";

/**
 * Client for the Supabase `content-strategy` edge function.
 *
 * The private content-strategist prompt and the OpenAI API key live ONLY in the
 * edge function's server-side environment — never here, never in the bundle.
 */
export async function fetchContentStrategy(
  brief: ContentBrief,
  businessType: string,
  lang: Lang,
  signal?: AbortSignal
): Promise<ContentStrategyResult> {
  const res = await fetch(functionUrl("content-strategy"), {
    method: "POST",
    headers: SUPABASE_HEADERS,
    // The edge function reads `sell` as "what I sell" — fed by the
    // business-type dropdown.
    body: JSON.stringify({ sell: businessType, ...brief, lang }),
    signal,
  });

  if (!res.ok) {
    let detail = "";
    try {
      detail = JSON.stringify(await res.json());
    } catch {
      /* ignore */
    }
    throw new Error(`Strategy request failed (${res.status}). ${detail}`);
  }

  const data = (await res.json()) as ContentStrategyResult;
  if (!data || !Array.isArray(data.subtopics)) {
    throw new Error("Malformed strategy response");
  }
  return data;
}

/** True when the brief has enough detail to generate a useful strategy. */
export function briefIsReady(brief: ContentBrief): boolean {
  return brief.audience.trim().length > 0 && brief.problem.trim().length > 0;
}
