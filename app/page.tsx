"use client";

import { useEffect, useMemo, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Landing } from "@/components/Landing";
import { Questionnaire } from "@/components/Questionnaire";
import { Results } from "@/components/Results";
import { AccessGate } from "@/components/AccessGate";
import { CONFIG } from "@/lib/config";
import { buildScores, calculateSplit } from "@/lib/engine";
import {
  EMPTY_BRIEF,
  type Answers,
  type ContentBrief,
  type IndustryId,
} from "@/lib/types";

type Stage = "landing" | "quiz" | "results";

const STORAGE_KEY = "homus:state:v1";

interface PersistedState {
  stage: Stage;
  answers: Answers;
  perWeek: number;
  industry?: IndustryId;
  brief?: ContentBrief;
}

/** Join the structured brief into one line for the local engine + PDF. */
function briefToDescription(b: ContentBrief): string {
  const parts: string[] = [];
  if (b.audience.trim()) parts.push(`for ${b.audience.trim()}`);
  if (b.problem.trim()) parts.push(b.problem.trim());
  if (b.location.trim()) parts.push(b.location.trim());
  return parts.join(". ");
}

export default function Page() {
  const [stage, setStage] = useState<Stage>("landing");
  const [answers, setAnswers] = useState<Answers>({});
  const [industry, setIndustry] = useState<IndustryId | undefined>(undefined);
  const [brief, setBrief] = useState<ContentBrief>(EMPTY_BRIEF);
  const [perWeek, setPerWeek] = useState(10);
  const [hydrated, setHydrated] = useState(false);

  // Restore persisted progress.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as PersistedState;
        if (parsed.answers) setAnswers(parsed.answers);
        if (parsed.perWeek) setPerWeek(parsed.perWeek);
        if (parsed.industry) setIndustry(parsed.industry);
        if (parsed.brief) setBrief({ ...EMPTY_BRIEF, ...parsed.brief });
        if (parsed.stage === "results") setStage("results");
      }
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true);
  }, []);

  // Persist on change.
  useEffect(() => {
    if (!hydrated) return;
    const state: PersistedState = {
      stage,
      answers,
      perWeek,
      industry,
      brief,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [stage, answers, perWeek, industry, brief, hydrated]);

  const scores = useMemo(() => buildScores(answers), [answers]);
  const split = useMemo(() => calculateSplit(scores), [scores]);
  const businessDescription = useMemo(() => briefToDescription(brief), [brief]);

  const startOver = () => {
    setAnswers({});
    setIndustry(undefined);
    setBrief(EMPTY_BRIEF);
    setPerWeek(10);
    setStage("landing");
    localStorage.removeItem(STORAGE_KEY);
  };

  if (CONFIG.accessLocked) {
    return (
      <div className="app-bg">
        <Navbar />
        <main className="relative">
          <AccessGate />
        </main>
      </div>
    );
  }

  return (
    <div className="app-bg">
      <Navbar />
      <main className="relative">
        {stage === "landing" && <Landing onStart={() => setStage("quiz")} />}

        {stage === "quiz" && (
          <Questionnaire
            answers={answers}
            setAnswers={setAnswers}
            industry={industry}
            setIndustry={setIndustry}
            brief={brief}
            setBrief={setBrief}
            onComplete={() => setStage("results")}
            onExit={() => setStage("landing")}
          />
        )}

        {stage === "results" && (
          <Results
            split={split}
            scores={scores}
            industryId={industry}
            businessDescription={businessDescription}
            brief={brief}
            perWeek={perWeek}
            onPerWeekChange={setPerWeek}
            onStartOver={startOver}
          />
        )}
      </main>
    </div>
  );
}
