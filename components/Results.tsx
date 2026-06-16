"use client";

import { useRef, useState } from "react";
import { useLang } from "./LanguageProvider";
import { FUNNELS, UI } from "@/lib/content";
import type { EsmaSplit } from "@/lib/types";
import { buildShareText } from "@/lib/share";
import { SplitDonut } from "./SplitDonut";
import { FunnelCard } from "./FunnelCard";
import { WeeklyPlanner } from "./WeeklyPlanner";

interface ResultsProps {
  split: EsmaSplit;
  perWeek: number;
  onPerWeekChange: (n: number) => void;
  onStartOver: () => void;
}

const LEGEND = [
  { key: "tof" as const, code: "TOF", color: "#34d399" },
  { key: "mof" as const, code: "MOF", color: "#e8c074" },
  { key: "bof" as const, code: "BOF", color: "#10b981" },
];

export function Results({
  split,
  perWeek,
  onPerWeekChange,
  onStartOver,
}: ResultsProps) {
  const { lang, tr } = useLang();
  const [copied, setCopied] = useState(false);
  const [pdfBusy, setPdfBusy] = useState(false);
  const captureRef = useRef<HTMLDivElement>(null);

  const handleCopy = async () => {
    const text = buildShareText(split, perWeek, lang);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadPdf = async () => {
    if (!captureRef.current) return;
    setPdfBusy(true);
    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);

      const canvas = await html2canvas(captureRef.current, {
        backgroundColor: "#05080a",
        scale: 2,
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position -= pageHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("esma-content-split.pdf");
    } catch (e) {
      console.error("PDF export failed", e);
    } finally {
      setPdfBusy(false);
    }
  };

  return (
    <section className="relative z-10 mx-auto w-full max-w-3xl px-5 pb-20 sm:px-8">
      <div ref={captureRef} className="rounded-[2rem]">
        {/* Header + donut */}
        <div className="animate-fade-up text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            {tr(UI.resultsTitle)}
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-pretty text-sm leading-relaxed text-white/55 sm:text-base">
            {tr(UI.resultsSubtitle)}
          </p>
        </div>

        <div
          className="animate-scale-in mt-10"
          style={{ animationDelay: "100ms" }}
        >
          <SplitDonut split={split} />
        </div>

        {/* Legend */}
        <div className="animate-fade-up mt-6 flex flex-wrap items-center justify-center gap-5">
          {LEGEND.map((l) => (
            <div key={l.key} className="flex items-center gap-2">
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: l.color }}
              />
              <span className="text-sm font-semibold text-white/80">
                {l.code}
              </span>
              <span className="text-sm font-bold text-white tabular-nums">
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

        {/* Weekly planner */}
        <div
          className="animate-fade-up mt-5"
          style={{ animationDelay: "450ms" }}
        >
          <WeeklyPlanner
            split={split}
            perWeek={perWeek}
            onPerWeekChange={onPerWeekChange}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
        <button
          onClick={onStartOver}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3.5 text-sm font-semibold text-white/75 transition hover:border-white/25 hover:text-white"
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
            <path d="M3 3v5h5" />
          </svg>
          {tr(UI.startOver)}
        </button>

        <button
          onClick={handleCopy}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3.5 text-sm font-semibold text-white/75 transition hover:border-emerald-glow/40 hover:text-white"
        >
          {copied ? (
            <svg
              className="h-4 w-4 text-emerald-soft"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
          ) : (
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          )}
          {copied ? tr(UI.copied) : tr(UI.copyResults)}
        </button>

        <button
          onClick={handleDownloadPdf}
          disabled={pdfBusy}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-soft to-gold-deep px-6 py-3.5 text-sm font-bold text-ink-950 shadow-gold transition hover:scale-[1.03] disabled:opacity-60"
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <path d="M7 10l5 5 5-5M12 15V3" />
          </svg>
          {pdfBusy ? tr(UI.preparing) : tr(UI.downloadPdf)}
        </button>
      </div>

      <p className="mt-8 text-center text-xs text-white/30">
        {tr(UI.footer)}
      </p>
    </section>
  );
}
