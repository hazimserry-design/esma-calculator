"use client";

import { useState } from "react";
import { useLang } from "./LanguageProvider";
import { UI } from "@/lib/content";
import { saveAccessRequest } from "@/lib/leads";

type Status = "idle" | "sending" | "done" | "error";

export function AccessGate() {
  const { lang, tr } = useLang();
  const [fields, setFields] = useState({ name: "", email: "", whatsapp: "" });
  const [status, setStatus] = useState<Status>("idle");

  const update = (k: keyof typeof fields, v: string) =>
    setFields((f) => ({ ...f, [k]: v }));

  const submit = async () => {
    const name = fields.name.trim();
    const email = fields.email.trim();
    const whatsapp = fields.whatsapp.trim();
    // Need a name and at least one way to reach them.
    if (!name || (!email && !whatsapp)) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    const ok = await saveAccessRequest({ name, email, whatsapp, lang });
    setStatus(ok ? "done" : "error");
  };

  const inputCls =
    "w-full rounded-2xl border border-line bg-cream px-4 py-3.5 text-[15px] text-night placeholder:text-stone/40 outline-none transition focus:border-gold/60 focus:bg-card";

  return (
    <section className="relative z-10 mx-auto flex min-h-[78vh] w-full max-w-lg flex-col items-center justify-center px-5 pb-20 pt-6 text-center sm:px-8">
      <div className="glass animate-fade-up w-full rounded-4xl p-7 sm:p-9">
        {/* Lock badge */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gold/[0.1] text-goldDark">
          <svg
            className="h-7 w-7"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>

        {status === "done" ? (
          <>
            <div className="mx-auto mt-6 flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 text-goldDark">
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-night sm:text-3xl">
              {tr(UI.gateSuccessTitle)}
            </h1>
            <p className="mx-auto mt-3 max-w-sm text-pretty text-[15px] leading-relaxed text-stone">
              {tr(UI.gateSuccessBody)}
            </p>
          </>
        ) : (
          <>
            <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/[0.08] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-widest text-goldDark">
              {tr(UI.gateBadge)}
            </span>
            <h1 className="mt-4 text-2xl font-extrabold leading-tight tracking-tight text-night sm:text-3xl">
              {tr(UI.gateTitle)}
            </h1>
            <p className="mx-auto mt-3 max-w-sm text-pretty text-[15px] leading-relaxed text-stone">
              {tr(UI.gateBody)}
            </p>

            <div className="mt-7 flex flex-col gap-3 text-start">
              <input
                className={inputCls}
                placeholder={tr(UI.nameLabel)}
                value={fields.name}
                onChange={(e) => update("name", e.target.value)}
                autoComplete="name"
              />
              <input
                type="email"
                dir="ltr"
                className={inputCls}
                placeholder={tr(UI.emailLabel)}
                value={fields.email}
                onChange={(e) => update("email", e.target.value)}
                autoComplete="email"
              />
              <input
                type="tel"
                dir="ltr"
                className={inputCls}
                placeholder={tr(UI.whatsappLabel)}
                value={fields.whatsapp}
                onChange={(e) => update("whatsapp", e.target.value)}
                autoComplete="tel"
              />
            </div>

            {status === "error" && (
              <p className="mt-3 text-sm font-medium text-orange-600">
                {tr(UI.gateContactError)}
              </p>
            )}

            <button
              onClick={submit}
              disabled={status === "sending"}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold to-goldDark px-8 py-4 text-base font-bold text-white shadow-gold transition-all enabled:hover:scale-[1.02] disabled:opacity-60"
            >
              {status === "sending" ? tr(UI.preparing) : tr(UI.gateSubmit)}
            </button>

            <p className="mt-4 text-xs leading-relaxed text-stone/60">
              {tr(UI.gateNote)}
            </p>
          </>
        )}
      </div>
    </section>
  );
}
