/**
 * Public Supabase config for the browser.
 *
 * Both values are PUBLIC by design: the URL is a public endpoint and the anon
 * key is meant to be embedded in client code (it only authorizes calling edge
 * functions). Private keys (OpenAI, service-role) live only inside the edge
 * functions' server environment. Override at build time with NEXT_PUBLIC_* vars.
 */
export const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ??
  "https://ddlxgwjenlffuiopdhmt.supabase.co";

export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRkbHhnd2plbmxmZnVpb3BkaG10Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg0OTgxMDksImV4cCI6MjA5NDA3NDEwOX0.mo529qy7LeJxQ2DWf292rgQeUDrdQl0svglUTeO_CLc";

export function functionUrl(name: string): string {
  return `${SUPABASE_URL}/functions/v1/${name}`;
}

export const SUPABASE_HEADERS: Record<string, string> = {
  "Content-Type": "application/json",
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
};
