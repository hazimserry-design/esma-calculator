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
