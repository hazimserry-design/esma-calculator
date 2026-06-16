"use client";

import { useState } from "react";
import { useLang } from "./LanguageProvider";
import { QUESTIONS, UI } from "@/lib/content";
import type { Answers } from "@/lib/types";
import { ChoiceOption } from "./ChoiceOption";
import { SliderInput } from "./SliderInput";

interface QuestionnaireProps {
  answers: Answers;
  setAnswers: (a: Answers) => void;
  onComplete: () => void;
  onExit: () => void;
}

export function Questionnaire({
  answers,
  setAnswers,
  onComplete,
  onExit,
}: QuestionnaireProps) {
  const { lang, tr } = useLang();
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);

  const total = QUESTIONS.length;
  const q = QUESTIONS[step];
  const progress = ((step + 1) / total) * 100;

  const current = answers[q.key];
  const isAnswered =
    current !== undefined && current !== null;

  const select = (value: number) => {
    setAnswers({ ...answers, [q.key]: value });
  };

  const goNext = () => {
    // Default the slider to a value if untouched.
    if (q.type === "slider" && answers[q.key] === undefined) {
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
    q.type === "slider"
      ? (answers[q.key] ?? q.slider!.min)
      : 0;

  return (
    <section className="relative z-10 mx-auto flex min-h-[70vh] w-full max-w-2xl flex-col px-5 pb-16 pt-2 sm:px-8">
      {/* Progress */}
      <div className="mb-8">
        <div className="mb-3 flex items-center justify-between text-sm">
          <span className="font-semibold text-white/60">
            {tr(UI.questionLabel)}{" "}
            <span className="text-white">{step + 1}</span>{" "}
            <span className="text-white/30">{tr(UI.of)}</span> {total}
          </span>
          <span className="font-bold text-emerald-soft tabular-nums">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-glow to-emerald-soft transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question card */}
      <div
        key={step}
        className={`glass flex-1 rounded-4xl p-6 sm:p-8 ${
          dir === 1 ? "animate-fade-up" : "animate-fade-in"
        }`}
      >
        <h2 className="text-2xl font-bold leading-snug tracking-tight text-white sm:text-3xl">
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
      </div>

      {/* Nav buttons */}
      <div className="mt-7 flex items-center justify-between gap-4">
        <button
          onClick={goBack}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3.5 text-sm font-semibold text-white/70 transition hover:border-white/25 hover:text-white"
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

        <button
          onClick={goNext}
          disabled={q.type === "choice" && !isAnswered}
          className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-glow to-emerald-500 px-8 py-3.5 text-sm font-bold text-ink-950 shadow-glow transition-all enabled:hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-30 disabled:shadow-none"
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
    </section>
  );
}
