"use client";

interface ChoiceOptionProps {
  label: string;
  index: number;
  selected: boolean;
  onSelect: () => void;
}

const LETTERS = ["A", "B", "C", "D", "E"];

export function ChoiceOption({
  label,
  index,
  selected,
  onSelect,
}: ChoiceOptionProps) {
  return (
    <button
      onClick={onSelect}
      className={`group flex w-full items-center gap-4 rounded-2xl border p-4 text-start transition-all duration-200 ${
        selected
          ? "border-emerald-glow/60 bg-emerald-glow/[0.08] shadow-glow"
          : "border-white/[0.07] bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
      }`}
    >
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-bold transition-colors ${
          selected
            ? "bg-gradient-to-br from-emerald-glow to-emerald-500 text-ink-950"
            : "bg-white/[0.05] text-white/50 group-hover:text-white/80"
        }`}
      >
        {LETTERS[index]}
      </span>
      <span
        className={`flex-1 text-[15px] font-medium leading-snug ${
          selected ? "text-white" : "text-white/75"
        }`}
      >
        {label}
      </span>
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
          selected
            ? "border-emerald-glow bg-emerald-glow"
            : "border-white/15"
        }`}
      >
        {selected && (
          <svg
            className="h-3 w-3 text-ink-950"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        )}
      </span>
    </button>
  );
}
