"use client";

import * as React from "react";
import Image, { type ImageProps } from "next/image";
import { ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * SafeImage — envoltorio de next/image que degrada con elegancia.
 *
 * Mientras el equipo no haya subido las fotos reales (o si una ruta falla),
 * muestra un placeholder con degradado de marca en vez de un ícono roto.
 * Usa next/image (optimización, lazy load) en cuanto la imagen existe.
 */
export function SafeImage({
  className,
  alt,
  ...props
}: ImageProps & { alt: string }) {
  const [errored, setErrored] = React.useState(false);

  if (errored) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-gradient-to-br from-surface-2 to-surface text-muted-foreground",
          props.fill ? "absolute inset-0 h-full w-full" : "",
          className,
        )}
        style={
          props.fill
            ? undefined
            : { width: Number(props.width), height: Number(props.height) }
        }
        role="img"
        aria-label={alt}
      >
        <div className="flex flex-col items-center gap-2 p-4 text-center">
          <ImageOff className="size-6 opacity-50" aria-hidden />
          <span className="text-xs opacity-70">{alt}</span>
        </div>
      </div>
    );
  }

  return (
    <Image
      className={className}
      alt={alt}
      onError={() => setErrored(true)}
      {...props}
    />
  );
}
