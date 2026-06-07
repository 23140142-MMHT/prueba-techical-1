import type { Award } from "@/types/team";

/**
 * PREMIOS Y LOGROS.
 *
 * result: "won" = ganado · "finalist" = finalista/nominación.
 * Se ordenan automáticamente por año (más reciente primero) en la página.
 *
 * TODO: reemplazar con los premios reales de tu equipo.
 */
export const awards: Award[] = [
  {
    name: "Engineering Inspiration Award",
    event: "Ventura Regional",
    year: 2026,
    result: "won",
  },
  {
    name: "Excellence in Engineering Award",
    event: "Aerospace Valley Regional",
    year: 2026,
    result: "won",
  },
  {
    name: "Regional Finalist",
    event: "Aerospace Valley Regional",
    year: 2026,
    result: "finalist",
  },
  {
    name: "Industrial Design Award",
    event: "Ventura Regional",
    year: 2025,
    result: "won",
  },
  {
    name: "Innovation in Control Award",
    event: "Los Angeles Regional",
    year: 2025,
    result: "won",
  },
  {
    name: "Rookie All-Star Award",
    event: "Inland Empire Regional",
    year: 2018,
    result: "won",
  },
  // Agrega tus premios aquí.
];
