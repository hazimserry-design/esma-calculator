// Supabase Edge Function: capture-lead
//
// Inserts a funnel lead into public.esma_leads using the service-role key
// (which bypasses RLS). The table has RLS enabled with no public policies, so
// the browser/anon key can never read or write it directly — only this
// function. (Kept separate from the project's existing `leads` CRM table.)
//
// SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are injected automatically by the
// Supabase Edge runtime; no secrets to set.

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const str = (v: unknown, max = 300): string | null => {
  if (typeof v !== "string") return null;
  const t = v.trim();
  return t ? t.slice(0, max) : null;
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...CORS, "Content-Type": "application/json" },
    });
  }

  try {
    const url = Deno.env.get("SUPABASE_URL");
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!url || !serviceKey) {
      return new Response(
        JSON.stringify({ error: "Server misconfigured" }),
        { status: 500, headers: { ...CORS, "Content-Type": "application/json" } }
      );
    }

    const b = await req.json().catch(() => ({}));

    // Require at least one contact field so we don't store empty rows.
    const name = str(b.name);
    const email = str(b.email);
    const whatsapp = str(b.whatsapp);
    if (!name && !email && !whatsapp) {
      return new Response(
        JSON.stringify({ error: "No contact details provided" }),
        { status: 400, headers: { ...CORS, "Content-Type": "application/json" } }
      );
    }

    const row = {
      name,
      email,
      whatsapp,
      business_type: str(b.businessType),
      industry: str(b.industry),
      audience: str(b.audience),
      problem: str(b.problem),
      price: str(b.price, 20),
      location: str(b.location),
      split: b.split ?? null,
      lang: str(b.lang, 5),
      source: str(b.source) ?? "esma-funnel",
    };

    const res = await fetch(`${url}/rest/v1/esma_leads`, {
      method: "POST",
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(row),
    });

    if (!res.ok) {
      const detail = await res.text();
      return new Response(
        JSON.stringify({ error: "Insert failed", detail }),
        { status: 502, headers: { ...CORS, "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...CORS, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { ...CORS, "Content-Type": "application/json" },
    });
  }
});
