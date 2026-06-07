import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * cn — combina clases de Tailwind resolviendo conflictos (patrón de shadcn/ui).
 * Ej: cn("p-2", condicion && "p-4") => "p-4"
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Convierte un color hex (#RRGGBB) a canales "r g b" para las variables CSS.
 * Esto permite que los colores del equipo (content/config.ts) alimenten el tema.
 */
export function hexToRgbChannels(hex: string): string {
  const clean = hex.replace("#", "").trim();
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  // Fallback seguro si el hex es inválido.
  if ([r, g, b].some(Number.isNaN)) return "0 102 204";
  return `${r} ${g} ${b}`;
}

/** Iniciales de un nombre, para avatares generados cuando no hay foto. */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
