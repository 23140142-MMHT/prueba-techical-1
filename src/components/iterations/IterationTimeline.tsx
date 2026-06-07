"use client";

import type { Iteration } from "@/types/iteration";
import { cn } from "@/lib/utils";

/**
 * Timeline horizontal para saltar entre iteraciones. El punto activo se
 * resalta con el color de acento.
 */
export function IterationTimeline({
  iterations,
  activeIndex,
  onSelect,
}: {
  iterations: Iteration[];
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="relative overflow-x-auto pb-2">
      <ol className="relative flex min-w-max items-start gap-0">
        {/* Línea base */}
        <span
          className="absolute left-0 right-0 top-[11px] h-px bg-border"
          aria-hidden
        />
        {iterations.map((it, i) => {
          const isActive = i === activeIndex;
          return (
            <li key={it.id} className="relative flex-1 px-6 first:pl-0 last:pr-0">
              <button
                type="button"
                onClick={() => onSelect(i)}
                className="group flex min-w-[8rem] flex-col items-start gap-2 text-left"
                aria-current={isActive ? "step" : undefined}
              >
                <span
                  className={cn(
                    "relative z-10 size-6 rounded-full border-2 transition-all",
                    isActive
                      ? "border-accent bg-accent shadow-glow-sm"
                      : "border-border bg-surface group-hover:border-accent/60",
                  )}
                />
                <span className="flex flex-col leading-tight">
                  <span
                    className={cn(
                      "text-sm font-semibold transition-colors",
                      isActive ? "text-accent" : "text-foreground",
                    )}
                  >
                    {it.label}
                  </span>
                  <span className="text-xs text-muted-foreground">{it.date}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
