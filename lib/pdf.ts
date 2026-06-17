import type { EsmaSplit, IndustryId, Lang, Scores } from "./types";
import { getIndustry } from "./industries";
import { distributeVideos } from "./engine";
import { computeHealthScore } from "./healthScore";
import { findBottleneck, closestBenchmark } from "./recommendations";
import { buildCalendar } from "./calendar";
import { generatePersonalizedStrategy } from "./aiStrategy";
import { CONFIG } from "./config";

export interface PdfData {
  split: EsmaSplit;
  perWeek: number;
  industryId: IndustryId | undefined;
  scores: Scores;
  businessDescription?: string;
  lang?: Lang;
}

const RGB = {
  paper: [255, 255, 255] as [number, number, number],
  cream: [250, 247, 240] as [number, number, number],
  night: [47, 47, 47] as [number, number, number],
  stone: [111, 106, 96] as [number, number, number],
  line: [232, 224, 210] as [number, number, number],
  gold: [227, 170, 47] as [number, number, number],
  goldDark: [201, 143, 30] as [number, number, number],
  green: [34, 197, 94] as [number, number, number],
  blue: [59, 130, 246] as [number, number, number],
  orange: [249, 115, 22] as [number, number, number],
};

const STAGE_RGB = { tof: RGB.green, mof: RGB.blue, bof: RGB.orange };
const STAGE_FULL = {
  tof: "Top of Funnel",
  mof: "Middle of Funnel",
  bof: "Bottom of Funnel",
};
const BN_STAGE = { awareness: "tof", trust: "mof", conversion: "bof" } as const;

const isLatin = (s: string) => /^[\x00-\x7F\s]*$/.test(s);

/**
 * HOMUS Content Strategy Report — a multi-page, text-based PDF built directly
 * with jsPDF (no screenshot capture, never blank, small file size).
 * Content is in English for reliable typography.
 */
export async function generatePdf(data: PdfData): Promise<void> {
  const { jsPDF } = await import("jspdf");
  const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });

  const W = pdf.internal.pageSize.getWidth();
  const H = pdf.internal.pageSize.getHeight();
  const M = 48;
  const CW = W - M * 2;
  let y = 0;

  const paintBg = () => {
    pdf.setFillColor(...RGB.paper);
    pdf.rect(0, 0, W, H, "F");
  };
  const newPage = () => {
    pdf.addPage();
    paintBg();
    y = M;
  };
  const ensure = (space: number) => {
    if (y + space > H - 56) newPage();
  };

  const text = (
    str: string,
    size: number,
    color: [number, number, number],
    opts: { bold?: boolean; x?: number; align?: "left" | "center"; width?: number } = {}
  ) => {
    pdf.setFont("helvetica", opts.bold ? "bold" : "normal");
    pdf.setFontSize(size);
    pdf.setTextColor(...color);
    const lines = pdf.splitTextToSize(str, opts.width ?? CW);
    const lineH = size * 1.4;
    for (const line of lines) {
      ensure(lineH);
      const x = opts.align === "center" ? W / 2 : (opts.x ?? M);
      pdf.text(line, x, y, { align: opts.align ?? "left" });
      y += lineH;
    }
  };
  const gap = (h: number) => {
    y += h;
  };
  const sectionTitle = (label: string) => {
    ensure(40);
    gap(10);
    pdf.setFillColor(...RGB.gold);
    pdf.rect(M, y - 9, 4, 16, "F");
    text(label, 15, RGB.night, { bold: true, x: M + 14 });
    gap(4);
  };
  const bullets = (items: string[], color = RGB.stone, size = 10.5) => {
    items.forEach((it) => text(`•  ${it}`, size, color));
  };

  // ---- derived data (English) ----
  const lang: Lang = "en";
  const v = getIndustry(data.industryId);
  const health = computeHealthScore(data.scores, data.split, lang);
  const bottleneck = findBottleneck(data.split);
  const dist = distributeVideos(data.split, data.perWeek);
  const benchmark = closestBenchmark(data.split);
  const calendar = buildCalendar(data.split, data.industryId, lang);
  const strategy = generatePersonalizedStrategy({
    businessDescription: data.businessDescription,
    industry: data.industryId,
    split: data.split,
    scores: data.scores,
    language: lang,
  });

  // ---- cover ----
  paintBg();
  y = M + 6;
  // brand chip
  pdf.setFillColor(...RGB.gold);
  pdf.roundedRect(M, y - 4, 70, 22, 6, 6, "F");
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(12);
  pdf.setTextColor(255, 255, 255);
  pdf.text("HOMUS", M + 12, y + 11);
  y += 38;
  text("HOMUS Content Strategy Report", 26, RGB.night, { bold: true });
  gap(2);
  text(
    "Your personalized plan for awareness, trust, and conversion.",
    11,
    RGB.stone
  );
  gap(6);
  text(`Business type: ${v.label.en}`, 11, RGB.goldDark, { bold: true });
  if (data.businessDescription && isLatin(data.businessDescription)) {
    text(`"${data.businessDescription.trim()}"`, 11, RGB.stone);
  }
  gap(8);

  // ---- understanding ----
  sectionTitle("What We Understand About Your Business");
  text(strategy.summary, 11, RGB.night);

  // ---- health ----
  sectionTitle("Content Health Score");
  ensure(70);
  pdf.setFillColor(...RGB.cream);
  pdf.roundedRect(M, y - 4, CW, 64, 12, 12, "F");
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(40);
  pdf.setTextColor(...RGB.goldDark);
  pdf.text(`${health.score}`, M + 20, y + 40);
  pdf.setFontSize(14);
  pdf.setTextColor(...RGB.stone);
  pdf.text("/100", M + 20 + pdf.getTextWidth(`${health.score}`) + 6, y + 40);
  pdf.setFontSize(16);
  pdf.setTextColor(...RGB.night);
  pdf.text(health.labelText.en, M + CW - 20, y + 30, { align: "right" });
  y += 72;
  text("Why this score:", 11, RGB.night, { bold: true });
  bullets(health.reasons.map((r) => r.en));
  gap(2);
  text("Next actions:", 11, RGB.night, { bold: true });
  bullets(health.actions.map((a) => a.en));

  // ---- bottleneck ----
  sectionTitle("Your Biggest Bottleneck");
  text(bottleneck.title.en, 13, STAGE_RGB[BN_STAGE[bottleneck.type]], {
    bold: true,
  });
  text(bottleneck.explanation.en, 10.5, RGB.stone);
  gap(2);
  text(`Fix first: ${bottleneck.fixFirst.en}`, 10.5, RGB.night);

  // ---- split ----
  sectionTitle("Your Content Split");
  (["tof", "mof", "bof"] as const).forEach((k) => {
    ensure(54);
    const color = STAGE_RGB[k];
    pdf.setFillColor(...RGB.cream);
    pdf.roundedRect(M, y - 4, CW, 46, 10, 10, "F");
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(11);
    pdf.setTextColor(...color);
    pdf.text(`${k.toUpperCase()} - ${STAGE_FULL[k]}`, M + 14, y + 14);
    pdf.setFontSize(20);
    pdf.setTextColor(...RGB.night);
    pdf.text(`${data.split[k]}%`, M + CW - 14, y + 18, { align: "right" });
    pdf.setFillColor(...RGB.line);
    pdf.roundedRect(M + 14, y + 26, CW - 28, 7, 3, 3, "F");
    pdf.setFillColor(...color);
    pdf.roundedRect(M + 14, y + 26, ((CW - 28) * data.split[k]) / 100, 7, 3, 3, "F");
    y += 54;
  });
  gap(2);
  text(
    `Closest benchmark: ${benchmark.label.en} (${benchmark.split.tof}/${benchmark.split.mof}/${benchmark.split.bof}).`,
    10.5,
    RGB.stone
  );

  // ---- weekly ----
  sectionTitle(`Weekly Plan - ${data.perWeek} videos / week`);
  text(`TOF: ${dist.tof}    MOF: ${dist.mof}    BOF: ${dist.bof}`, 12, RGB.night, {
    bold: true,
  });

  // ---- opportunities (strategy) ----
  sectionTitle("Content Opportunities");
  text("Content hooks:", 11, RGB.night, { bold: true });
  bullets(strategy.hooks);
  gap(2);
  text("Content angles:", 11, RGB.night, { bold: true });
  bullets(strategy.angles);
  gap(2);
  text("Lead magnet ideas:", 11, RGB.night, { bold: true });
  bullets(strategy.leadMagnets);
  gap(2);
  text("Offer suggestions:", 11, RGB.night, { bold: true });
  bullets(strategy.offers);
  gap(2);
  text("Growth opportunities:", 11, RGB.night, { bold: true });
  bullets(strategy.growth);

  // ---- calendar ----
  sectionTitle("Your 30-Day Content Calendar");
  calendar.forEach((d) => {
    ensure(26);
    const color = STAGE_RGB[d.stage];
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(9.5);
    pdf.setTextColor(...color);
    pdf.text(`Day ${d.day} · ${d.stage.toUpperCase()} · ${d.format}`, M, y);
    y += 13;
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);
    pdf.setTextColor(...RGB.stone);
    const lines = pdf.splitTextToSize(d.idea, CW);
    for (const line of lines) {
      ensure(13);
      pdf.text(line, M, y);
      y += 13;
    }
    gap(3);
  });

  // ---- idea banks ----
  const ideaSection = (title: string, list: string[]) => {
    sectionTitle(title);
    list.forEach((idea, i) => text(`${i + 1}. ${idea}`, 10.5, RGB.stone));
  };
  ideaSection("10 TOF Ideas (Awareness)", strategy.tof);
  ideaSection("10 MOF Ideas (Trust)", strategy.mof);
  ideaSection("10 BOF Ideas (Conversion)", strategy.bof);

  // ---- course recommendation ----
  sectionTitle("Recommended For You");
  const courseName =
    bottleneck.type === "awareness"
      ? "Awareness & Reach Track"
      : bottleneck.type === "trust"
        ? "Authority & Trust Track"
        : "Offers & Conversion Track";
  text(courseName, 13, RGB.goldDark, { bold: true });
  text(
    "The calculator shows you WHAT to post. The HOMUS system shows you HOW to execute it consistently — research, hooks, scripting, filming, editing, and a weekly process.",
    10.5,
    RGB.stone
  );

  // ---- next steps ----
  sectionTitle("Your Next Steps");
  bullets(strategy.nextSteps, RGB.night, 11);

  // ---- contact / CTA ----
  sectionTitle("Build This With HOMUS");
  text(
    "Want help turning this into a full content system that runs every week?",
    11,
    RGB.night
  );
  gap(2);
  text(`Website:  ${CONFIG.websiteUrl}`, 11, RGB.goldDark, { bold: true });
  text(`WhatsApp:  ${CONFIG.whatsappNumber}`, 11, RGB.goldDark, { bold: true });

  // ---- footer on every page ----
  const pageCount = pdf.getNumberOfPages();
  for (let p = 1; p <= pageCount; p++) {
    pdf.setPage(p);
    pdf.setDrawColor(...RGB.line);
    pdf.line(M, H - 40, W - M, H - 40);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8);
    pdf.setTextColor(...RGB.stone);
    pdf.text("HOMUS — AI Content Strategy Engine · homus.biz", M, H - 26);
    pdf.text(`${p} / ${pageCount}`, W - M, H - 26, { align: "right" });
  }

  pdf.save("homus-content-strategy-report.pdf");
}
