"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { ImageOff } from "lucide-react";

import type { Iteration } from "@/types/iteration";

// react-compare-slider es relativamente pesado: lo cargamos dinámicamente y
// solo en cliente (no necesita SSR).
const ReactCompareSlider = dynamic(
  () => import("react-compare-slider").then((m) => m.ReactCompareSlider),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-surface text-sm text-muted-foreground">
        Cargando comparación…
      </div>
    ),
  },
);

/** Imagen del slider con fallback elegante si la foto aún no existe. */
function SliderImage({ src, alt }: { src: string; alt: string }) {
  const [errored, setErrored] = React.useState(false);
  if (errored) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-surface-2 to-surface text-muted-foreground">
        <ImageOff className="size-7 opacity-50" aria-hidden />
        <span className="px-4 text-center text-xs opacity-70">{alt}</span>
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      onError={() => setErrored(true)}
      className="h-full w-full object-cover"
      draggable={false}
    />
  );
}

/** Etiqueta flotante en una esquina del slider. */
function FloatingLabel({
  side,
  children,
}: {
  side: "left" | "right";
  children: React.ReactNode;
}) {
  return (
    <span
      className={`pointer-events-none absolute top-3 ${
        side === "left" ? "left-3" : "right-3"
      } rounded-full border border-border bg-background/80 px-3 py-1 text-xs font-medium backdrop-blur-sm`}
    >
      {children}
    </span>
  );
}

/**
 * Slider de comparación entre la versión actual (before) y la siguiente (after).
 */
export function IterationSlider({ iteration }: { iteration: Iteration }) {
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-border bg-surface shadow-glow">
      <ReactCompareSlider
        className="h-full w-full"
        itemOne={
          <SliderImage src={iteration.beforeImage} alt={`${iteration.label} (antes)`} />
        }
        itemTwo={
          <SliderImage src={iteration.afterImage} alt={`${iteration.label} (después)`} />
        }
      />
      <FloatingLabel side="left">{iteration.label}</FloatingLabel>
      <FloatingLabel side="right">Siguiente versión</FloatingLabel>
    </div>
  );
}
