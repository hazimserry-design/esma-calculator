"use client";

import { useState } from "react";
import { useLang } from "./LanguageProvider";
import { FUNNELS, UI } from "@/lib/content";
import type { ContentBrief, EsmaSplit, IndustryId, Scores } from "@/lib/types";
import { buildShareText } from "@/lib/share";
import { generatePdf } from "@/lib/pdf";
import { saveLead } from "@/lib/leads";
import { SplitDonut } from "./SplitDonut";
import { FunnelCard } from "./FunnelCard";
import { WeeklyPlanner } from "./WeeklyPlanner";
import { HealthScore } from "./HealthScore";
import { BottleneckAnalysis } from "./BottleneckAnalysis";
import { ContentOpportunity } from "./ContentOpportunity";
import { WhySplit } from "./WhySplit";
import { ContentIdeas } from "./ContentIdeas";
import { ContentCalendar } from "./ContentCalendar";
import { StrategyPack } from "./StrategyPack";
import { ContentStrategyAI } from "./ContentStrategyAI";
import { BenchmarkComparison } from "./BenchmarkComparison";
import { RoiEstimator } from "./RoiEstimator";
import { AskHomus } from "./AskHomus";
import { CourseRecommendation } from "./CourseRecommendation";
import { ExecutionGap } from "./ExecutionGap";
import { FreeVsFull } from "./FreeVsFull";
import { CTASection } from "./CTASection";
import { LeadCaptureModal, type LeadFields } from "./LeadCaptureModal";

interface ResultsProps {
  split: EsmaSplit;
  scores: Scores;
  industryId: IndustryId | undefined;
  businessDescription: string;
  brief: ContentBrief;
  perWeek: number;
  onPerWeekChange: (n: number) => void;
  onStartOver: () => void;
}

const LEGEND = [
  { key: "tof" as const, code: "TOF", color: "#22c55e" },
  { key: "mof" as const, code: "MOF", color: "#3b82f6" },
  { key: "bof" as const, code: "BOF", color: "#f97316" },
];

export function Results({
  split,
  scores,
  industryId,
  businessDescription,
  brief,
  perWeek,
  onPerWeekChange,
  onStartOver,
}: ResultsProps) {
  const { lang, tr } = useLang();
  const [copied, setCopied] = useState(false);
  const [pdfBusy, setPdfBusy] = useState(false);
  const [leadOpen, setLeadOpen] = useState(false);

  const handleCopy = async () => {
    const text = buildShareText(split, perWeek, lang);
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = async (lead: LeadFields | null) => {
    setPdfBusy(true);
    try {
      if (lead && (lead.name || lead.email || lead.whatsapp)) {
        saveLead({
          ...lead,
          industryId,
          split,
          createdAt: new Date().toISOString(),
        });
      }
      await generatePdf({
        split,
        perWeek,
        industryId,
        scores,
        businessDescription,
        lang,
      });
      setLeadOpen(false);
    } catch (error) {
      console.error("PDF export failed", error);
      alert("PDF download failed. Please try again.");
    } finally {
      setPdfBusy(false);
    }
  };

  return (
    <section className="relative z-10 mx-auto w-full max-w-3xl px-5 pb-20 sm:px-8">
      {/* Header + donut */}
      <div className="animate-fade-up text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-night sm:text-5xl">
          {tr(UI.resultsTitle)}
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-pretty text-sm leading-relaxed text-stone sm:text-base">
          {tr(UI.resultsSubtitle)}
        </p>
      </div>

      <div className="animate-scale-in mt-10" style={{ animationDelay: "100ms" }}>
        <SplitDonut split={split} />
      </div>

      <div className="animate-fade-up mt-6 flex flex-wrap items-center justify-center gap-5">
        {LEGEND.map((l) => (
          <div key={l.key} className="flex items-center gap-2">
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: l.color }}
            />
            <span className="text-sm font-semibold text-night/80">{l.code}</span>
            <span className="text-sm font-bold text-night tabular-nums">
              {split[l.key]}%
            </span>
          </div>
        ))}
      </div>

      {/* Funnel breakdown */}
      <div className="mt-10 flex flex-col gap-4">
        {FUNNELS.map((f, i) => (
          <FunnelCard
            key={f.code}
            funnel={f}
            percentage={split[f.code.toLowerCase() as "tof" | "mof" | "bof"]}
            delay={150 + i * 100}
          />
        ))}
      </div>

      {/* Strategy sections */}
      <div className="mt-5 flex flex-col gap-5">
        <ContentStrategyAI brief={brief} industryId={industryId} />
        <HealthScore scores={scores} split={split} />
        <BottleneckAnalysis split={split} />
        <ContentOpportunity
          split={split}
          scores={scores}
          industryId={industryId}
          businessDescription={businessDescription}
        />
        <WhySplit split={split} />
        <WeeklyPlanner
          split={split}
          perWeek={perWeek}
          onPerWeekChange={onPerWeekChange}
        />
        <ContentIdeas industryId={industryId} />
        <ContentCalendar split={split} industryId={industryId} />
        <StrategyPack
          split={split}
          scores={scores}
          industryId={industryId}
          businessDescription={businessDescription}
        />
        <BenchmarkComparison split={split} />
        <RoiEstimator />
        <AskHomus
          split={split}
          scores={scores}
          perWeek={perWeek}
          industryId={industryId}
          businessDescription={businessDescription}
        />

        {/* Conversion zone */}
        <CourseRecommendation split={split} />
        <ExecutionGap />
        <FreeVsFull />
        <CTASection />
      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
        <button
          onClick={onStartOver}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-card px-6 py-3.5 text-sm font-semibold text-night/75 shadow-soft2 transition hover:border-gold/40 hover:text-night"
        >
          {tr(UI.startOver)}
        </button>

        <button
          onClick={handleCopy}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-card px-6 py-3.5 text-sm font-semibold text-night/75 shadow-soft2 transition hover:border-gold/40 hover:text-night"
        >
          {copied ? tr(UI.copied) : tr(UI.copyResults)}
        </button>

        <button
          onClick={() => setLeadOpen(true)}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold to-goldDark px-6 py-3.5 text-sm font-bold text-white shadow-gold transition hover:scale-[1.03]"
        >
          {tr(UI.downloadReport)}
        </button>
      </div>

      <p className="mt-8 text-center text-xs text-stone">{tr(UI.footer)}</p>

      <LeadCaptureModal
        open={leadOpen}
        busy={pdfBusy}
        onDownload={handleDownload}
        onClose={() => setLeadOpen(false)}
      />
    </section>
  );
}
