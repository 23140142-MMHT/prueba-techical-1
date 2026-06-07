"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { ImageOff } from "lucide-react";

// Carga diferida del slider de comparación (pesado, solo cliente).
const ReactCompareSlider = dynamic(
  () => import("react-compare-slider").then((m) => m.ReactCompareSlider),
  { ssr: false },
);

/** Imagen del slider con fallback elegante si la foto aún no existe. */
function SliderImage({ src, alt }: { src: string; alt: string }) {
  const [errored, setErrored] = React.useState(false);
  if (errored) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-[#f4f3ee] text-slate-400">
        <ImageOff className="size-7 opacity-50" aria-hidden />
        <span className="px-4 text-center text-xs">{alt}</span>
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      onError={() => setErrored(true)}
      className="h-full w-full object-contain"
      draggable={false}
    />
  );
}

function Tag({ side, children }: { side: "left" | "right"; children: React.ReactNode }) {
  return (
    <span
      className={`pointer-events-none absolute top-3 ${
        side === "left" ? "left-3" : "right-3"
      } rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white`}
    >
      {children}
    </span>
  );
}

/**
 * Comparación antes/después entre dos eventos (Mexico vs Niagara).
 */
export function CompareView({
  beforeImage,
  afterImage,
  beforeLabel,
  afterLabel,
}: {
  beforeImage: string;
  afterImage: string;
  beforeLabel: string;
  afterLabel: string;
}) {
  return (
    <div
      className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border"
      style={{ backgroundColor: "#f4f3ee" }}
    >
      <ReactCompareSlider
        className="h-full w-full"
        itemOne={<SliderImage src={beforeImage} alt={beforeLabel} />}
        itemTwo={<SliderImage src={afterImage} alt={afterLabel} />}
      />
      <Tag side="left">{beforeLabel}</Tag>
      <Tag side="right">{afterLabel}</Tag>
    </div>
  );
}
