"use client";

import { useState } from "react";
import { useLang } from "./LanguageProvider";
import { UI } from "@/lib/content";
import { CONFIG } from "@/lib/config";

export function OwnerLogin({ onSuccess }: { onSuccess: () => void }) {
  const { tr } = useLang();
  const [fields, setFields] = useState({ email: "", password: "" });
  const [error, setError] = useState(false);

  const update = (k: keyof typeof fields, v: string) =>
    setFields((f) => ({ ...f, [k]: v }));

  const submit = () => {
    const emailOk =
      fields.email.trim().toLowerCase() === CONFIG.ownerEmail.toLowerCase();
    const passOk = fields.password === CONFIG.ownerPassword;
    if (emailOk && passOk) {
      onSuccess();
    } else {
      setError(true);
    }
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

        <h1 className="mt-6 text-2xl font-extrabold leading-tight tracking-tight text-night sm:text-3xl">
          {tr(UI.ownerLoginTitle)}
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-pretty text-[15px] leading-relaxed text-stone">
          {tr(UI.ownerLoginBody)}
        </p>

        <div className="mt-7 flex flex-col gap-3 text-start">
          <input
            type="email"
            dir="ltr"
            className={inputCls}
            placeholder={tr(UI.emailLabel)}
            value={fields.email}
            onChange={(e) => {
              update("email", e.target.value);
              setError(false);
            }}
            autoComplete="username"
          />
          <input
            type="password"
            dir="ltr"
            className={inputCls}
            placeholder={tr(UI.ownerPasswordLabel)}
            value={fields.password}
            onChange={(e) => {
              update("password", e.target.value);
              setError(false);
            }}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            autoComplete="current-password"
          />
        </div>

        {error && (
          <p className="mt-3 text-sm font-medium text-orange-600">
            {tr(UI.ownerLoginError)}
          </p>
        )}

        <button
          onClick={submit}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold to-goldDark px-8 py-4 text-base font-bold text-white shadow-gold transition-all hover:scale-[1.02]"
        >
          {tr(UI.ownerLoginSubmit)}
        </button>
      </div>
    </section>
  );
}
