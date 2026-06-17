import { CONFIG } from "./config";
import type { EsmaSplit, IndustryId } from "./types";

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
