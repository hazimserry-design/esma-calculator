// Supabase Edge Function: content-strategy
//
// Receives a short business brief from the funnel and returns a structured
// content-strategy plan (subtopics -> search phrases -> video ideas) generated
// by OpenAI. The strategist prompt and the OpenAI key live ONLY here, on the
// server. They are never shipped to the browser, so they stay private.
//
// Secrets (set via `supabase secrets set`):
//   OPENAI_API_KEY   (required)
//   OPENAI_MODEL     (optional, defaults to gpt-4o-mini)

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// The private content-strategist prompt. Kept server-side on purpose.
const SYSTEM_PROMPT = `You are a content strategist and research assistant.

Your job is to break a business down into highly specific subtopics that the
owner can use to search for content ideas on Instagram and TikTok.

Rules:
1. Produce 6 to 8 clear subtopics based on the problems people face, the
   situations they are in, the desires they have, and beginner vs advanced levels.
2. For each subtopic give:
   - a simple name in easy words, no jargon
   - exactly 5 search phrases written the way real people type into TikTok or Instagram
   - exactly 3 example video ideas someone might find under this subtopic
3. Keep everything very simple, very practical, and written like how people
   actually search and talk.
4. Do NOT give generic answers. Make every subtopic specific to THIS business
   and audience.
5. Also write one short "summary" line (max 25 words) reading the business back
   to the owner.

Respond with ONLY valid JSON in exactly this shape, no markdown, no commentary:
{
  "summary": "string",
  "subtopics": [
    {
      "name": "string",
      "searchPhrases": ["string", "string", "string", "string", "string"],
      "videoIdeas": ["string", "string", "string"]
    }
  ]
}`;

function buildUserPrompt(b: {
  sell?: string;
  audience?: string;
  problem?: string;
  price?: string;
  location?: string;
  lang?: string;
}): string {
  const langLine =
    b.lang === "ar"
      ? "Write ALL output (names, phrases, ideas, summary) in casual Egyptian Arabic (عامية مصرية)."
      : "Write ALL output in simple, casual English.";
  return [
    "Here is my business:",
    `- What I sell: ${b.sell || "(not specified)"}`,
    `- Who I sell to: ${b.audience || "(not specified)"}`,
    `- What problem I solve: ${b.problem || "(not specified)"}`,
    `- Price level compared to the industry: ${b.price || "mid"}`,
    `- Location: ${b.location || "(not relevant)"}`,
    "",
    langLine,
    "Now generate my subtopics as JSON.",
  ].join("\n");
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: CORS });
  }
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...CORS, "Content-Type": "application/json" },
    });
  }

  try {
    const apiKey = Deno.env.get("OPENAI_API_KEY");
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "Server is missing OPENAI_API_KEY" }),
        { status: 500, headers: { ...CORS, "Content-Type": "application/json" } }
      );
    }
    const model = Deno.env.get("OPENAI_MODEL") ?? "gpt-4o-mini";

    const body = await req.json().catch(() => ({}));
    const userPrompt = buildUserPrompt(body ?? {});

    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        temperature: 0.85,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!openaiRes.ok) {
      const detail = await openaiRes.text();
      return new Response(
        JSON.stringify({ error: "OpenAI request failed", detail }),
        {
          status: 502,
          headers: { ...CORS, "Content-Type": "application/json" },
        }
      );
    }

    const data = await openaiRes.json();
    const content: string | undefined = data?.choices?.[0]?.message?.content;
    if (!content) {
      return new Response(
        JSON.stringify({ error: "Empty response from OpenAI" }),
        { status: 502, headers: { ...CORS, "Content-Type": "application/json" } }
      );
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(content);
    } catch {
      return new Response(
        JSON.stringify({ error: "Model did not return valid JSON" }),
        { status: 502, headers: { ...CORS, "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify(parsed), {
      headers: { ...CORS, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { ...CORS, "Content-Type": "application/json" },
    });
  }
});
