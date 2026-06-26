import { CONFIG } from "./config";
import { functionUrl, SUPABASE_HEADERS } from "./supabase";
import type { ContentBrief, EsmaSplit, IndustryId, Lang } from "./types";

export interface Lead {
  name: string;
  email: string;
  whatsapp: string;
  industryId: IndustryId | undefined;
  split: EsmaSplit;
  createdAt: string;
}

/** Persist a captured lead to localStorage. Never throws. */
export function saveLead(lead: Lead): void {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(CONFIG.leadsStorageKey);
    const list: Lead[] = raw ? JSON.parse(raw) : [];
    list.push(lead);
    localStorage.setItem(CONFIG.leadsStorageKey, JSON.stringify(list));
  } catch {
    /* ignore storage errors */
  }
}

export interface RemoteLead {
  name: string;
  email: string;
  whatsapp: string;
  businessType: string;
  industry: IndustryId | undefined;
  brief: ContentBrief;
  split: EsmaSplit;
  lang: Lang;
}

/**
 * Persist an access request from the locked gate to Supabase (esma_leads).
 * Resolves to true on success, false on failure (so the UI can show an error).
 */
export async function saveAccessRequest(req: {
  name: string;
  email: string;
  whatsapp: string;
  lang: Lang;
}): Promise<boolean> {
  // localStorage backup.
  if (typeof window !== "undefined") {
    try {
      const key = `${CONFIG.leadsStorageKey}:access`;
      const raw = localStorage.getItem(key);
      const list = raw ? JSON.parse(raw) : [];
      list.push({ ...req, createdAt: new Date().toISOString() });
      localStorage.setItem(key, JSON.stringify(list));
    } catch {
      /* ignore */
    }
  }
  try {
    const res = await fetch(functionUrl("capture-lead"), {
      method: "POST",
      headers: SUPABASE_HEADERS,
      body: JSON.stringify({
        name: req.name,
        email: req.email,
        whatsapp: req.whatsapp,
        lang: req.lang,
        source: "access-request",
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Persist a captured lead to Supabase (esma_leads, via the capture-lead edge
 * function). Fire-and-forget — never throws, so it can't block the PDF download.
 */
export async function saveLeadRemote(lead: RemoteLead): Promise<void> {
  try {
    await fetch(functionUrl("capture-lead"), {
      method: "POST",
      headers: SUPABASE_HEADERS,
      body: JSON.stringify({
        name: lead.name,
        email: lead.email,
        whatsapp: lead.whatsapp,
        businessType: lead.businessType,
        industry: lead.industry,
        audience: lead.brief.audience,
        problem: lead.brief.problem,
        price: lead.brief.price,
        location: lead.brief.location,
        split: lead.split,
        lang: lead.lang,
        source: "esma-funnel",
      }),
    });
  } catch {
    /* network errors must not block the user */
  }
}
