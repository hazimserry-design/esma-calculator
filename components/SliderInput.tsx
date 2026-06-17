"use client";

interface SliderInputProps {
  value: number;
  min: number;
  max: number;
  minLabel: string;
  maxLabel: string;
  onChange: (value: number) => void;
}

export function SliderInput({
  value,
  min,
  max,
  minLabel,
  maxLabel,
  onChange,
}: SliderInputProps) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className="w-full">
      <div className="mb-8 flex flex-col items-center">
        <div className="relative">
          <span className="text-7xl font-extrabold tracking-tight text-night tabular-nums">
            {value}
          </span>
          <span className="ms-1 text-2xl font-semibold text-night/30">
            /{max}
          </span>
        </div>
      </div>

      <input
        type="range"
        className="esma-slider"
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ ["--pct" as string]: `${pct}%` }}
      />

      <div className="mt-4 flex items-center justify-between text-xs font-medium">
        <span className="flex items-center gap-1.5 text-night/45">
          <span className="rounded-md bg-night/[0.05] px-1.5 py-0.5 font-bold text-night/60">
            {min}
          </span>
          {minLabel}
        </span>
        <span className="flex items-center gap-1.5 text-gold">
          {maxLabel}
          <span className="rounded-md bg-gold/15 px-1.5 py-0.5 font-bold text-gold">
            {max}
          </span>
        </span>
      </div>
    </div>
  );
}
