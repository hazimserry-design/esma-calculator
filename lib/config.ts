/**
 * Central place for all outward-facing HOMUS links and lead handling.
 * Update these in one spot — every CTA across the app reads from here.
 */
export const CONFIG = {
  /** Brand */
  brandName: "HOMUS",

  /** Primary destination — the HOMUS website. */
  websiteUrl: "https://www.homus.biz",

  /** Strategy call / consultation booking (point to a Calendly etc. later). */
  bookConsultationUrl: "https://www.homus.biz",

  /** WhatsApp chat. */
  whatsappNumber: "+201223305639",
  whatsappUrl: "https://wa.me/201223305639",

  /** Free training / lead destination (update when ready). */
  freeTrainingUrl: "https://www.homus.biz",

  /** localStorage key where captured leads are stored. */
  leadsStorageKey: "homus:leads",
} as const;
