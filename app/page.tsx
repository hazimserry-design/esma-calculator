"use client";

import { useEffect, useMemo, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Landing } from "@/components/Landing";
import { Questionnaire } from "@/components/Questionnaire";
import { Results } from "@/components/Results";
import { buildScores, calculateSplit } from "@/lib/engine";
import type { Answers, ExecutionConfidence, IndustryId } from "@/lib/types";

type Stage = "landing" | "quiz" | "results";

const STORAGE_KEY = "homus:state:v1";

interface PersistedState {
  stage: Stage;
  answers: Answers;
  perWeek: number;
  industry?: IndustryId;
  businessDescription?: string;
  confidence?: ExecutionConfidence;
}

export default function Page() {
  const [stage, setStage] = useState<Stage>("landing");
  const [answers, setAnswers] = useState<Answers>({});
  const [industry, setIndustry] = useState<IndustryId | undefined>(undefined);
  const [businessDescription, setBusinessDescription] = useState("");
  const [confidence, setConfidence] = useState<ExecutionConfidence | undefined>(
    undefined
  );
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
        if (parsed.businessDescription)
          setBusinessDescription(parsed.businessDescription);
        if (parsed.confidence) setConfidence(parsed.confidence);
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
      businessDescription,
      confidence,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [
    stage,
    answers,
    perWeek,
    industry,
    businessDescription,
    confidence,
    hydrated,
  ]);

  const scores = useMemo(() => buildScores(answers), [answers]);
  const split = useMemo(() => calculateSplit(scores), [scores]);

  const startOver = () => {
    setAnswers({});
    setIndustry(undefined);
    setBusinessDescription("");
    setConfidence(undefined);
    setPerWeek(10);
    setStage("landing");
    localStorage.removeItem(STORAGE_KEY);
  };

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
            businessDescription={businessDescription}
            setBusinessDescription={setBusinessDescription}
            confidence={confidence}
            setConfidence={setConfidence}
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
            confidence={confidence}
            perWeek={perWeek}
            onPerWeekChange={setPerWeek}
            onStartOver={startOver}
          />
        )}
      </main>
    </div>
  );
}
