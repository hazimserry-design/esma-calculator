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
  setPdfBusy(true);

  try {
    const { jsPDF } = await import("jspdf");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });

    const pageWidth = pdf.internal.pageSize.getWidth();

    pdf.setFillColor(5, 8, 10);
    pdf.rect(0, 0, pageWidth, 842, "F");

    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(28);
    pdf.text("Your ESMA Content Split", pageWidth / 2, 80, {
      align: "center",
    });

    pdf.setFontSize(13);
    pdf.setTextColor(170, 170, 170);
    pdf.text("Your recommended content distribution:", pageWidth / 2, 110, {
      align: "center",
    });

    const rows = [
      { label: "Top of Funnel", code: "TOF", value: split.tof, color: [34, 197, 94] },
      { label: "Middle of Funnel", code: "MOF", value: split.mof, color: [59, 130, 246] },
      { label: "Bottom of Funnel", code: "BOF", value: split.bof, color: [249, 115, 22] },
    ];

    let y = 170;

    rows.forEach((row) => {
      pdf.setFillColor(15, 25, 22);
      pdf.roundedRect(70, y - 25, pageWidth - 140, 95, 16, 16, "F");

      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(17);
      pdf.text(`${row.code} - ${row.label}`, 95, y);

      pdf.setFontSize(28);
      pdf.text(`${row.value}%`, pageWidth - 115, y, {
        align: "right",
      });

      pdf.setFillColor(35, 45, 42);
      pdf.roundedRect(95, y + 25, pageWidth - 190, 8, 4, 4, "F");

      pdf.setFillColor(row.color[0], row.color[1], row.color[2]);
      pdf.roundedRect(
        95,
        y + 25,
        ((pageWidth - 190) * row.value) / 100,
        8,
        4,
        4,
        "F"
      );

      y += 120;
    });

    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(20);
    pdf.text(`Weekly Plan: ${perWeek} videos per week`, pageWidth / 2, y + 20, {
      align: "center",
    });

    pdf.setFontSize(13);
    pdf.setTextColor(180, 180, 180);
    pdf.text(
      `TOF: ${Math.round((split.tof / 100) * perWeek)} videos`,
      pageWidth / 2,
      y + 55,
      { align: "center" }
    );
    pdf.text(
      `MOF: ${Math.round((split.mof / 100) * perWeek)} videos`,
      pageWidth / 2,
      y + 78,
      { align: "center" }
    );
    pdf.text(
      `BOF: ${Math.round((split.bof / 100) * perWeek)} videos`,
      pageWidth / 2,
      y + 101,
      { align: "center" }
    );

    pdf.save("esma-content-split.pdf");
  } catch (error) {
    console.error("PDF export failed", error);
    alert("PDF download failed. Please try again.");
  } finally {
    setPdfBusy(false);
  }
};