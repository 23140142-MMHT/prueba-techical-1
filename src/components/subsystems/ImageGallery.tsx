"use client";

import * as React from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import type { SubsystemImage } from "@/types/subsystem";
import { SafeImage } from "@/components/shared/SafeImage";

/**
 * Galería de imágenes del subsistema con lightbox.
 * Las miniaturas usan SafeImage (fallback si la foto aún no existe).
 */
export function ImageGallery({ images }: { images: SubsystemImage[] }) {
  const [index, setIndex] = React.useState(-1);

  if (images.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setIndex(i)}
            className="group relative aspect-video overflow-hidden rounded-lg border border-border bg-surface"
            aria-label={`Ampliar: ${img.alt}`}
          >
            <SafeImage
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={Math.max(index, 0)}
        slides={images.map((img) => ({ src: img.src, alt: img.alt }))}
      />
    </>
  );
}
