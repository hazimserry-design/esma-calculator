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

  /**
   * When true, the whole tool is locked behind a "request access" gate.
   * Flip to false to reopen the funnel.
   */
  accessLocked: true,

  /**
   * Hidden owner-access preview.
   *
   * Normal visitors see the AccessGate above. The owner opens the tool via a
   * secret URL — visiting `/?access=homus` reveals a private login. Entering the
   * owner email + password below unlocks the full funnel (and is remembered on
   * this device via `ownerStorageKey`).
   *
   * NOTE: this is a client-side preview gate, not real security — the value
   * ships in the browser bundle, so don't use it to protect anything sensitive.
   */
  ownerAccessParam: "access",
  ownerAccessKey: "homus",
  ownerEmail: "homus@homus.com",
  ownerPassword: "homus1234",
  ownerStorageKey: "homus:owner:v1",
} as const;
