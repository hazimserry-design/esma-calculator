"use client";

import { useEffect, useState } from "react";
import { useLang } from "./LanguageProvider";
import { UI } from "@/lib/content";

export interface LeadFields {
  name: string;
  email: string;
  whatsapp: string;
}

export function LeadCaptureModal({
  open,
  busy,
  onDownload,
  onClose,
}: {
  open: boolean;
  busy: boolean;
  /** lead = captured details, or null when the user skips */
  onDownload: (lead: LeadFields | null) => void;
  onClose: () => void;
}) {
  const { tr } = useLang();
  const [fields, setFields] = useState<LeadFields>({
    name: "",
    email: "",
    whatsapp: "",
  });

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !busy) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, busy, onClose]);

  if (!open) return null;

  const update = (k: keyof LeadFields, v: string) =>
    setFields((f) => ({ ...f, [k]: v }));

  const inputCls =
    "w-full rounded-2xl border border-night/10 bg-night/[0.03] px-4 py-3 text-sm text-night placeholder:text-night/30 outline-none transition focus:border-gold/50 focus:bg-night/[0.05]";

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-night/40 p-4 backdrop-blur-sm sm:items-center"
      onClick={() => !busy && onClose()}
    >
      <div
        className="glass animate-scale-in w-full max-w-md rounded-4xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-bold text-night sm:text-2xl">
          {tr(UI.leadTitle)}
        </h3>
        <p className="mt-2 text-sm text-night/55">{tr(UI.leadSubtitle)}</p>

        <div className="mt-6 flex flex-col gap-3">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-night/50">
              {tr(UI.nameLabel)}
            </label>
            <input
              className={inputCls}
              value={fields.name}
              onChange={(e) => update("name", e.target.value)}
              autoComplete="name"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-night/50">
              {tr(UI.emailLabel)}
            </label>
            <input
              type="email"
              className={inputCls}
              value={fields.email}
              onChange={(e) => update("email", e.target.value)}
              autoComplete="email"
              dir="ltr"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-night/50">
              {tr(UI.whatsappLabel)}
            </label>
            <input
              type="tel"
              className={inputCls}
              value={fields.whatsapp}
              onChange={(e) => update("whatsapp", e.target.value)}
              autoComplete="tel"
              dir="ltr"
            />
          </div>
        </div>

        <p className="mt-3 text-xs leading-relaxed text-night/35">
          {tr(UI.reportNote)}
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={() => onDownload(fields)}
            disabled={busy}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-400 px-6 py-3.5 text-sm font-bold text-night shadow-soft transition hover:scale-[1.02] disabled:opacity-60"
          >
            {busy ? tr(UI.preparing) : tr(UI.downloadReport)}
          </button>
          <button
            onClick={() => onDownload(null)}
            disabled={busy}
            className="rounded-full px-6 py-2.5 text-sm font-semibold text-night/55 transition hover:text-night disabled:opacity-60"
          >
            {tr(UI.skipAndDownload)}
          </button>
        </div>
      </div>
    </div>
  );
}
