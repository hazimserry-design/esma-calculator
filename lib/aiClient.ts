import type { ContentBrief, ContentStrategyResult, Lang } from "./types";

/**
 * Client for the Supabase `content-strategy` edge function.
 *
 * Both values below are PUBLIC by design:
 *  - the function URL is a public endpoint
 *  - the anon key is the Supabase public/anon key, meant to be embedded in
 *    browser code (it only authorizes calling the function).
 *
 * The private content-strategist prompt and the OpenAI API key live ONLY in the
 * edge function's server-side environment — never here, never in the bundle.
 *
 * They can be overridden at build time with NEXT_PUBLIC_* env vars if desired.
 */
const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ??
  "https://ddlxgwjenlffuiopdhmt.supabase.co";

const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRkbHhnd2plbmxmZnVpb3BkaG10Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg0OTgxMDksImV4cCI6MjA5NDA3NDEwOX0.mo529qy7LeJxQ2DWf292rgQeUDrdQl0svglUTeO_CLc";

const ENDPOINT = `${SUPABASE_URL}/functions/v1/content-strategy`;

export async function fetchContentStrategy(
  brief: ContentBrief,
  businessType: string,
  lang: Lang,
  signal?: AbortSignal
): Promise<ContentStrategyResult> {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
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
