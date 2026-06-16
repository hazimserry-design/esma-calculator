"use client";

import { useState } from "react";
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
  { key: "tof" as const, code: "TOF", color: "#22c55e" },
  { key: "mof" as const, code: "MOF", color: "#3b82f6" },
  { key: "bof" as const, code: "BOF", color: "#f97316" },
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

  const handleCopy = async () => {
    const text = buildShareText(split, perWeek, lang);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
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
    setPdfBusy(true);

    try {
      const { jsPDF } = await import("jspdf");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      pdf.setFillColor(5, 8, 10);
      pdf.rect(0, 0, pageWidth, pageHeight, "F");

      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(28);
      pdf.text("Your ESMA Content Split", pageWidth / 2, 80, {
        align: "center",
      });

      pdf.setFontSize(13);
      pdf.setTextColor(170, 170, 170);
      pdf.text("Your recommended content distribution", pageWidth / 2, 110, {
        align: "center",
      });

      const rows: {
        label: string;
        code: string;
        value: number;
        color: [number, number, number];
      }[] = [
        {
          label: "Top of Funnel",
          code: "TOF",
          value: split.tof,
          color: [34, 197, 94],
        },
        {
          label: "Middle of Funnel",
          code: "MOF",
          value: split.mof,
          color: [59, 130, 246],
        },
        {
          label: "Bottom of Funnel",
          code: "BOF",
          value: split.bof,
          color: [249, 115, 22],
        },
      ];

      let y = 175;

      rows.forEach((row) => {
        pdf.setFillColor(15, 25, 22);
        pdf.roundedRect(60, y - 35, pageWidth - 120, 105, 16, 16, "F");

        pdf.setTextColor(row.color[0], row.color[1], row.color[2]);
        pdf.setFontSize(12);
        pdf.text(row.code, 85, y - 5);

        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(18);
        pdf.text(row.label, 85, y + 22);

        pdf.setFontSize(34);
        pdf.text(`${row.value}%`, pageWidth - 85, y + 14, {
          align: "right",
        });

        pdf.setFillColor(35, 45, 42);
        pdf.roundedRect(85, y + 42, pageWidth - 170, 9, 4, 4, "F");

        pdf.setFillColor(row.color[0], row.color[1], row.color[2]);
        pdf.roundedRect(
          85,
          y + 42,
          ((pageWidth - 170) * row.value) / 100,
          9,
          4,
          4,
          "F"
        );

        y += 130;
      });

      const tofVideos = Math.round((split.tof / 100) * perWeek);
      const mofVideos = Math.round((split.mof / 100) * perWeek);
      const bofVideos = Math.max(0, perWeek - tofVideos - mofVideos);

      pdf.setFillColor(15, 25, 22);
      pdf.roundedRect(60, y - 20, pageWidth - 120, 130, 16, 16, "F");

      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(20);
      pdf.text(`Weekly Plan: ${perWeek} videos per week`, pageWidth / 2, y + 15, {
        align: "center",
      });

      pdf.setFontSize(14);
      pdf.setTextColor(190, 190, 190);
      pdf.text(`TOF: ${tofVideos} videos`, pageWidth / 2, y + 50, {
        align: "center",
      });
      pdf.text(`MOF: ${mofVideos} videos`, pageWidth / 2, y + 75, {
        align: "center",
      });
      pdf.text(`BOF: ${bofVideos} videos`, pageWidth / 2, y + 100, {
        align: "center",
      });

      pdf.save("esma-content-split.pdf");
    } catch (error) {
      console.error("PDF export failed", error);
      alert("PDF download failed. Please try again.");
    } finally {
      setPdfBusy(false);
    }
  };

  return (
    <section className="relative z-10 mx-auto w-full max-w-3xl px-5 pb-20 sm:px-8">
      <div className="rounded-[2rem]">
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

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
        <button
          onClick={onStartOver}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3.5 text-sm font-semibold text-white/75 transition hover:border-white/25 hover:text-white"
        >
          {tr(UI.startOver)}
        </button>

        <button
          onClick={handleCopy}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3.5 text-sm font-semibold text-white/75 transition hover:border-emerald-glow/40 hover:text-white"
        >
          {copied ? tr(UI.copied) : tr(UI.copyResults)}
        </button>

        <button
          onClick={handleDownloadPdf}
          disabled={pdfBusy}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-400 px-6 py-3.5 text-sm font-bold text-ink-950 shadow-gold transition hover:scale-[1.03] disabled:opacity-60"
        >
          {pdfBusy ? tr(UI.preparing) : tr(UI.downloadPdf)}
        </button>
      </div>

      <p className="mt-8 text-center text-xs text-white/30">
        {tr(UI.footer)}
      </p>
    </section>
  );
}