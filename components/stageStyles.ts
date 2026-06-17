import type { FunnelStage } from "@/lib/types";

/** Shared colour styling for TOF (green) / MOF (blue) / BOF (orange). */
export const STAGE_STYLE: Record<
  FunnelStage,
  { dot: string; chip: string; text: string; bar: string; hex: string }
> = {
  tof: {
    dot: "bg-green-400",
    chip: "bg-green-500/15 text-green-400 border-green-500/20",
    text: "text-green-400",
    bar: "from-green-500 to-green-400",
    hex: "#22c55e",
  },
  mof: {
    dot: "bg-blue-400",
    chip: "bg-blue-500/15 text-blue-400 border-blue-500/20",
    text: "text-blue-400",
    bar: "from-blue-500 to-blue-400",
    hex: "#3b82f6",
  },
  bof: {
    dot: "bg-orange-400",
    chip: "bg-orange-500/15 text-orange-400 border-orange-500/20",
    text: "text-orange-400",
    bar: "from-orange-500 to-orange-400",
    hex: "#f97316",
  },
};

export const STAGE_ORDER: FunnelStage[] = ["tof", "mof", "bof"];
