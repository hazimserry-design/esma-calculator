import type {
  EsmaSplit,
  IndustryId,
  Lang,
  LocalizedText,
  Scores,
} from "./types";
import { distributeVideos } from "./engine";
import { findBottleneck, generateIdeas } from "./recommendations";
import { generatePersonalizedStrategy } from "./aiStrategy";

export type AskKind = "practical" | "strategic" | "content";

export interface AskItem {
  id: string;
  kind: AskKind;
  question: LocalizedText;
  answer: (ctx: AskContext) => string;
}

export interface AskContext {
  split: EsmaSplit;
  scores: Scores;
  perWeek: number;
  industryId: IndustryId | undefined;
  businessDescription?: string;
  lang: Lang;
}

function strategy(ctx: AskContext) {
  return generatePersonalizedStrategy({
    businessDescription: ctx.businessDescription,
    industry: ctx.industryId,
    split: ctx.split,
    scores: ctx.scores,
    language: ctx.lang,
  });
}

export const ASK_ITEMS: AskItem[] = [
  {
    id: "thisWeek",
    kind: "content",
    question: {
      en: "What should I post this week?",
      ar: "أنزل إيه الأسبوع ده؟",
    },
    answer: ({ split, perWeek, industryId, lang }) => {
      const d = distributeVideos(split, perWeek);
      const tof = generateIdeas("tof", industryId, lang, 1)[0];
      const mof = generateIdeas("mof", industryId, lang, 1)[0];
      const bof = generateIdeas("bof", industryId, lang, 1)[0];
      if (lang === "ar") {
        return `على أساس توزيعك، الأسبوع ده انزل تقريبًا ${d.tof} TOF و${d.mof} MOF و${d.bof} BOF. تقدر تبدأ بدول: «${tof}»، «${mof}»، «${bof}».`;
      }
      return `Based on your split, this week post about ${d.tof} TOF, ${d.mof} MOF, and ${d.bof} BOF videos. You can start with these: "${tof}", "${mof}", "${bof}".`;
    },
  },
  {
    id: "notConverting",
    kind: "strategic",
    question: {
      en: "Why is my content not converting?",
      ar: "ليه المحتوى مش بيجيب مبيعات؟",
    },
    answer: ({ split, lang }) => {
      const b = findBottleneck(split);
      return lang === "ar"
        ? b.explanation.ar + " " + b.fixFirst.ar
        : b.explanation.en + " " + b.fixFirst.en;
    },
  },
  {
    id: "buildTrust",
    kind: "strategic",
    question: {
      en: "How do I build more trust?",
      ar: "أبني ثقة أكتر إزاي؟",
    },
    answer: ({ industryId, lang }) => {
      const ideas = generateIdeas("mof", industryId, lang, 3);
      if (lang === "ar") {
        return `الثقة بتتبني بالإثبات. ركّز على محتوى MOF: دراسات حالة، كواليس، وشرح طريقة شغلك. جرّب: «${ideas[0]}»، «${ideas[1]}»، «${ideas[2]}».`;
      }
      return `Trust is built with proof. Lean into MOF content: case studies, behind-the-scenes, and process breakdowns. Try: "${ideas[0]}", "${ideas[1]}", "${ideas[2]}".`;
    },
  },
  {
    id: "next10",
    kind: "content",
    question: {
      en: "What should my next 10 posts be?",
      ar: "أنزل إيه في أول 10 بوستات؟",
    },
    answer: ({ split, industryId, lang }) => {
      const d = distributeVideos(split, 10);
      const picks = [
        ...generateIdeas("tof", industryId, lang, d.tof),
        ...generateIdeas("mof", industryId, lang, d.mof),
        ...generateIdeas("bof", industryId, lang, d.bof),
      ].slice(0, 10);
      const list = picks.map((p, i) => `${i + 1}. ${p}`).join("\n");
      const intro =
        lang === "ar"
          ? `أول 10 بوستات على توزيعك (${d.tof} TOF / ${d.mof} MOF / ${d.bof} BOF):`
          : `Your next 10 posts, matching your split (${d.tof} TOF / ${d.mof} MOF / ${d.bof} BOF):`;
      return `${intro}\n${list}`;
    },
  },
  {
    id: "hooks",
    kind: "content",
    question: {
      en: "Give me strong hooks for my business",
      ar: "اديني هوكات قوية للبيزنس بتاعي",
    },
    answer: (ctx) => {
      const s = strategy(ctx);
      const list = s.hooks.map((h, i) => `${i + 1}. ${h}`).join("\n");
      const intro =
        ctx.lang === "ar"
          ? "جرّب الهوكات دي في أول 3 ثواني من الفيديو:"
          : "Try these hooks in the first 3 seconds of your videos:";
      return `${intro}\n${list}`;
    },
  },
  {
    id: "growth",
    kind: "strategic",
    question: {
      en: "What's my biggest growth opportunity?",
      ar: "إيه أكبر فرصة نمو عندي؟",
    },
    answer: (ctx) => {
      const s = strategy(ctx);
      const list = s.growth.map((g, i) => `${i + 1}. ${g}`).join("\n");
      const intro =
        ctx.lang === "ar"
          ? `${s.summary}\n\nأكبر فرص النمو دلوقتي:`
          : `${s.summary}\n\nYour biggest growth opportunities right now:`;
      return `${intro}\n${list}`;
    },
  },
];
