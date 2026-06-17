"use client";

import { useState } from "react";
import { useLang } from "./LanguageProvider";
import { QUESTIONS, UI } from "@/lib/content";
import { INDUSTRIES } from "@/lib/industries";
import type { Answers, ExecutionConfidence, IndustryId } from "@/lib/types";
import { ChoiceOption } from "./ChoiceOption";
import { SliderInput } from "./SliderInput";

interface QuestionnaireProps {
  answers: Answers;
  setAnswers: (a: Answers) => void;
  industry: IndustryId | undefined;
  setIndustry: (id: IndustryId) => void;
  businessDescription: string;
  setBusinessDescription: (s: string) => void;
  confidence: ExecutionConfidence | undefined;
  setConfidence: (c: ExecutionConfidence) => void;
  onComplete: () => void;
  onExit: () => void;
}

const CONF_VALUES: ExecutionConfidence[] = ["very", "somewhat", "not"];

export function Questionnaire({
  answers,
  setAnswers,
  industry,
  setIndustry,
  businessDescription,
  setBusinessDescription,
  confidence,
  setConfidence,
  onComplete,
  onExit,
}: QuestionnaireProps) {
  const { tr } = useLang();
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);

  const N = QUESTIONS.length;
  const total = N + 3; // industry, business desc, scored..., confidence
  const isIndustryStep = step === 0;
  const isBizStep = step === 1;
  const isConfidenceStep = step === total - 1;
  const isScoredStep = !isIndustryStep && !isBizStep && !isConfidenceStep;
  const q = isScoredStep ? QUESTIONS[step - 2] : null;
  const progress = ((step + 1) / total) * 100;

  const current = q ? answers[q.key] : undefined;
  const isAnswered = isConfidenceStep
    ? confidence !== undefined
    : isScoredStep
      ? current !== undefined && current !== null
      : true; // industry + biz optional

  const select = (value: number) => {
    if (!q) return;
    setAnswers({ ...answers, [q.key]: value });
  };

  const goNext = () => {
    if (q && q.type === "slider" && answers[q.key] === undefined) {
      setAnswers({ ...answers, [q.key]: q.slider!.min });
    }
    if (step === total - 1) {
      onComplete();
      return;
    }
    setDir(1);
    setStep((s) => s + 1);
  };

  const goBack = () => {
    if (step === 0) {
      onExit();
      return;
    }
    setDir(-1);
    setStep((s) => s - 1);
  };

  const sliderValue =
    q && q.type === "slider" ? (answers[q.key] ?? q.slider!.min) : 0;
  const canSkip = isIndustryStep || isBizStep;

  return (
    <section className="relative z-10 mx-auto flex min-h-[70vh] w-full max-w-2xl flex-col px-5 pb-16 pt-2 sm:px-8">
      {/* Progress */}
      <div className="mb-8">
        <div className="mb-3 flex items-center justify-between text-sm">
          <span className="font-semibold text-stone">
            {tr(UI.questionLabel)} <span className="text-night">{step + 1}</span>{" "}
            <span className="text-stone/60">{tr(UI.of)}</span> {total}
          </span>
          <span className="font-bold text-gold tabular-nums">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-line">
          <div
            className="h-full rounded-full bg-gradient-to-r from-gold to-goldDark transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Card */}
      <div
        key={step}
        className={`glass flex-1 rounded-4xl p-6 sm:p-8 ${
          dir === 1 ? "animate-fade-up" : "animate-fade-in"
        }`}
      >
        {isIndustryStep && (
          <>
            <h2 className="text-2xl font-bold leading-snug tracking-tight text-night sm:text-3xl">
              {tr(UI.industryQuestion)}
            </h2>
            <p className="mt-2 text-sm text-stone">{tr(UI.industryOptional)}</p>
            <div className="mt-7 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {INDUSTRIES.map((ind) => {
                const active = industry === ind.id;
                return (
                  <button
                    key={ind.id}
                    onClick={() => setIndustry(ind.id)}
                    className={`rounded-2xl border p-4 text-start text-[15px] font-medium transition-all ${
                      active
                        ? "border-gold/60 bg-gold/[0.08] text-night shadow-soft"
                        : "border-line bg-cream text-night/75 hover:border-gold/40 hover:bg-gold/[0.04]"
                    }`}
                  >
                    {tr(ind.label)}
                  </button>
                );
              })}
            </div>
          </>
        )}

        {isBizStep && (
          <>
            <h2 className="text-2xl font-bold leading-snug tracking-tight text-night sm:text-3xl">
              {tr(UI.bizDescTitle)}
            </h2>
            <p className="mt-2 text-sm text-stone">{tr(UI.bizDescOptional)}</p>
            <textarea
              value={businessDescription}
              onChange={(e) => setBusinessDescription(e.target.value)}
              placeholder={tr(UI.bizDescPlaceholder)}
              rows={3}
              maxLength={160}
              className="mt-6 w-full resize-none rounded-2xl border border-line bg-cream px-4 py-3.5 text-[15px] text-night placeholder:text-stone/50 outline-none transition focus:border-gold/60 focus:bg-card"
            />
            <p className="mt-5 mb-2 text-[11px] font-semibold uppercase tracking-widest text-stone/60">
              {tr(UI.bizDescExamplesLabel)}
            </p>
            <div className="flex flex-wrap gap-2">
              {UI.bizDescExamples.map((ex, i) => (
                <button
                  key={i}
                  onClick={() => setBusinessDescription(tr(ex))}
                  className="rounded-full border border-line bg-card px-3 py-1.5 text-xs font-medium text-stone transition hover:border-gold/50 hover:text-night"
                >
                  {tr(ex)}
                </button>
              ))}
            </div>
          </>
        )}

        {isScoredStep && q && (
          <>
            <h2 className="text-2xl font-bold leading-snug tracking-tight text-night sm:text-3xl">
              {tr(q.prompt)}
            </h2>
            <div className="mt-7">
              {q.type === "choice" ? (
                <div className="flex flex-col gap-3">
                  {q.options!.map((opt, i) => (
                    <ChoiceOption
                      key={i}
                      index={i}
                      label={tr(opt)}
                      selected={current === i}
                      onSelect={() => select(i)}
                    />
                  ))}
                </div>
              ) : (
                <div className="py-6">
                  <SliderInput
                    value={sliderValue}
                    min={q.slider!.min}
                    max={q.slider!.max}
                    minLabel={tr(q.slider!.minLabel)}
                    maxLabel={tr(q.slider!.maxLabel)}
                    onChange={select}
                  />
                </div>
              )}
            </div>
          </>
        )}

        {isConfidenceStep && (
          <>
            <h2 className="text-2xl font-bold leading-snug tracking-tight text-night sm:text-3xl">
              {tr(UI.confidenceQuestion)}
            </h2>
            <div className="mt-7 flex flex-col gap-3">
              {UI.confidenceOptions.map((opt, i) => (
                <ChoiceOption
                  key={i}
                  index={i}
                  label={tr(opt)}
                  selected={confidence === CONF_VALUES[i]}
                  onSelect={() => setConfidence(CONF_VALUES[i])}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Nav buttons */}
      <div className="mt-7 flex items-center justify-between gap-4">
        <button
          onClick={goBack}
          className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-6 py-3.5 text-sm font-semibold text-night/70 shadow-soft2 transition hover:border-gold/40 hover:text-night"
        >
          <svg
            className="h-4 w-4 rtl:rotate-180"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M11 18l-6-6 6-6" />
          </svg>
          {tr(UI.back)}
        </button>

        <div className="flex items-center gap-3">
          {canSkip && (
            <button
              onClick={goNext}
              className="rounded-full px-4 py-3.5 text-sm font-semibold text-stone transition hover:text-night"
            >
              {tr(UI.skip)}
            </button>
          )}
          <button
            onClick={goNext}
            disabled={!isAnswered}
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold to-goldDark px-8 py-3.5 text-sm font-bold text-white shadow-gold transition-all enabled:hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
          >
            {step === total - 1 ? tr(UI.seeResults) : tr(UI.next)}
            <svg
              className="h-4 w-4 transition-transform group-enabled:group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-enabled:group-hover:-translate-x-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
