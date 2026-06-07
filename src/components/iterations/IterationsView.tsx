"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import type { Iteration } from "@/types/iteration";
import { IterationSlider } from "./IterationSlider";
import { IterationTimeline } from "./IterationTimeline";
import { IterationCard } from "./IterationCard";

/**
 * Orquesta la experiencia de iteraciones: timeline + slider + card, con estado
 * de iteración activa y transiciones animadas entre versiones.
 */
export function IterationsView({ iterations }: { iterations: Iteration[] }) {
  const [active, setActive] = React.useState(0);

  if (iterations.length === 0) {
    return (
      <p className="text-muted-foreground">
        Aún no hay iteraciones. Agrégalas en content/iterations/iterations.ts.
      </p>
    );
  }

  const current = iterations[active];
  const go = (dir: -1 | 1) =>
    setActive((i) => (i + dir + iterations.length) % iterations.length);

  return (
    <div className="flex flex-col gap-8">
      <IterationTimeline
        iterations={iterations}
        activeIndex={active}
        onSelect={setActive}
      />

      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-start">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <IterationSlider iteration={current} />
            <p className="mt-3 text-center text-sm text-muted-foreground">
              Arrastra el control para comparar esta versión con la siguiente.
            </p>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={`card-${current.id}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
          >
            <IterationCard iteration={current} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navegación prev/next */}
      <div className="flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Iteración anterior"
          className="flex size-11 items-center justify-center rounded-full border border-border transition-colors hover:border-accent/60 hover:text-accent"
        >
          <ChevronLeft className="size-5" />
        </button>
        <span className="text-sm text-muted-foreground">
          {active + 1} / {iterations.length}
        </span>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Iteración siguiente"
          className="flex size-11 items-center justify-center rounded-full border border-border transition-colors hover:border-accent/60 hover:text-accent"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
    </div>
  );
}
