"use client";

import { useState } from "react";
import { useLang } from "./LanguageProvider";
import { QUESTIONS, UI } from "@/lib/content";
import { INDUSTRIES } from "@/lib/industries";
import { briefIsReady } from "@/lib/aiClient";
import type {
  Answers,
  ContentBrief,
  ExecutionConfidence,
  IndustryId,
  PriceLevel,
} from "@/lib/types";
import { ChoiceOption } from "./ChoiceOption";
import { SliderInput } from "./SliderInput";

interface QuestionnaireProps {
  answers: Answers;
  setAnswers: (a: Answers) => void;
  industry: IndustryId | undefined;
  setIndustry: (id: IndustryId) => void;
  brief: ContentBrief;
  setBrief: (b: ContentBrief) => void;
  confidence: ExecutionConfidence | undefined;
  setConfidence: (c: ExecutionConfidence) => void;
  onComplete: () => void;
  onExit: () => void;
}

const CONF_VALUES: ExecutionConfidence[] = ["very", "somewhat", "not"];
const PRICE_VALUES: PriceLevel[] = ["low", "mid", "high"];

function BriefField({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-[13px] font-semibold text-night/80">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={120}
        className="w-full rounded-2xl border border-line bg-cream px-4 py-3.5 text-[15px] text-night placeholder:text-stone/50 outline-none transition focus:border-gold/60 focus:bg-card"
      />
    </div>
  );
}

export function Questionnaire({
  answers,
  setAnswers,
  industry,
  setIndustry,
  brief,
  setBrief,
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
    : isIndustryStep
      ? industry !== undefined // business type now required
      : isBizStep
        ? briefIsReady(brief) // require audience + problem
        : isScoredStep
          ? current !== undefined && current !== null
          : true;

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
  const canSkip = false;

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
            <p className="mt-2 text-sm text-stone">{tr(UI.industryPick)}</p>
            <div className="relative mt-7">
              <select
                value={industry ?? ""}
                onChange={(e) => setIndustry(e.target.value as IndustryId)}
                className={`w-full appearance-none rounded-2xl border bg-cream px-4 py-3.5 pe-11 text-[15px] outline-none transition focus:border-gold/60 focus:bg-card ${
                  industry ? "border-gold/50 text-night" : "border-line text-stone/60"
                }`}
              >
                <option value="" disabled>
                  {tr(UI.industryPlaceholder)}
                </option>
                {INDUSTRIES.map((ind) => (
                  <option key={ind.id} value={ind.id} className="text-night">
                    {tr(ind.label)}
                  </option>
                ))}
              </select>
              <svg
                className="pointer-events-none absolute end-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </div>
          </>
        )}

        {isBizStep && (
          <>
            <h2 className="text-2xl font-bold leading-snug tracking-tight text-night sm:text-3xl">
              {tr(UI.briefTitle)}
            </h2>
            <p className="mt-2 text-sm text-stone">{tr(UI.briefSubtitle)}</p>

            <div className="mt-6 flex flex-col gap-4">
              <BriefField
                label={tr(UI.briefAudienceLabel)}
                placeholder={tr(UI.briefAudiencePlaceholder)}
                value={brief.audience}
                onChange={(v) => setBrief({ ...brief, audience: v })}
              />
              <BriefField
                label={tr(UI.briefProblemLabel)}
                placeholder={tr(UI.briefProblemPlaceholder)}
                value={brief.problem}
                onChange={(v) => setBrief({ ...brief, problem: v })}
              />

              <div>
                <p className="mb-2 text-[13px] font-semibold text-night/80">
                  {tr(UI.briefPriceLabel)}
                </p>
                <div className="grid grid-cols-3 gap-2.5">
                  {UI.briefPriceOptions.map((opt, i) => {
                    const active = brief.price === PRICE_VALUES[i];
                    return (
                      <button
                        key={i}
                        onClick={() =>
                          setBrief({ ...brief, price: PRICE_VALUES[i] })
                        }
                        className={`rounded-2xl border px-4 py-3 text-[14px] font-semibold transition-all ${
                          active
                            ? "border-gold/60 bg-gold/[0.08] text-night shadow-soft"
                            : "border-line bg-cream text-night/70 hover:border-gold/40 hover:bg-gold/[0.04]"
                        }`}
                      >
                        {tr(opt)}
                      </button>
                    );
                  })}
                </div>
              </div>

              <BriefField
                label={tr(UI.briefLocationLabel)}
                placeholder={tr(UI.briefLocationPlaceholder)}
                value={brief.location}
                onChange={(v) => setBrief({ ...brief, location: v })}
              />
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
