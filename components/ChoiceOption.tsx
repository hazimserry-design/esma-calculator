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
          ? "border-gold/60 bg-gold/[0.08] shadow-soft"
          : "border-night/[0.07] bg-night/[0.02] hover:border-night/20 hover:bg-night/[0.04]"
      }`}
    >
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-bold transition-colors ${
          selected
            ? "bg-gradient-to-br from-gold to-gold text-night"
            : "bg-night/[0.05] text-night/50 group-hover:text-night/80"
        }`}
      >
        {LETTERS[index]}
      </span>
      <span
        className={`flex-1 text-[15px] font-medium leading-snug ${
          selected ? "text-night" : "text-night/75"
        }`}
      >
        {label}
      </span>
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
          selected
            ? "border-gold bg-gold"
            : "border-night/15"
        }`}
      >
        {selected && (
          <svg
            className="h-3 w-3 text-night"
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
