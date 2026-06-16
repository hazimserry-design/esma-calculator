"use client";

import { useEffect, useMemo, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Landing } from "@/components/Landing";
import { Questionnaire } from "@/components/Questionnaire";
import { Results } from "@/components/Results";
import { buildScores, calculateSplit } from "@/lib/engine";
import type { Answers } from "@/lib/types";

type Stage = "landing" | "quiz" | "results";

const STORAGE_KEY = "esma:state:v1";

interface PersistedState {
  stage: Stage;
  answers: Answers;
  perWeek: number;
}

export default function Page() {
  const [stage, setStage] = useState<Stage>("landing");
  const [answers, setAnswers] = useState<Answers>({});
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
        // Only resume into results if we have a full set; otherwise show landing.
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
    const state: PersistedState = { stage, answers, perWeek };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [stage, answers, perWeek, hydrated]);

  const split = useMemo(
    () => calculateSplit(buildScores(answers)),
    [answers]
  );

  const startOver = () => {
    setAnswers({});
    setPerWeek(10);
    setStage("landing");
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <div className="app-bg">
      <Navbar />
      <main className="relative">
        {stage === "landing" && (
          <Landing onStart={() => setStage("quiz")} />
        )}

        {stage === "quiz" && (
          <Questionnaire
            answers={answers}
            setAnswers={setAnswers}
            onComplete={() => setStage("results")}
            onExit={() => setStage("landing")}
          />
        )}

        {stage === "results" && (
          <Results
            split={split}
            perWeek={perWeek}
            onPerWeekChange={setPerWeek}
            onStartOver={startOver}
          />
        )}
      </main>
    </div>
  );
}
