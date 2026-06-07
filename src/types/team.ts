/** Subequipos posibles dentro del equipo FRC. */
export type Subteam =
  | "Mechanical"
  | "Electrical"
  | "Software"
  | "Business"
  | "Strategy";

/** Miembro del equipo. */
export interface TeamMember {
  name: string;
  /** Rol principal, ej. "Lead Mechanical" */
  role: string;
  subteam: Subteam;
  /** Ruta a la foto (opcional). Si falta, se genera avatar con iniciales. */
  photo?: string;
  linkedin?: string;
}

/** Patrocinador del equipo. */
export interface Sponsor {
  name: string;
  /** Ruta al logo en /public/sponsors/ */
  logo: string;
  url?: string;
  /** Nivel de patrocinio (afecta el tamaño en que se muestra). */
  tier?: "platinum" | "gold" | "silver" | "community";
}

/** Premio o logro del equipo. */
export interface Award {
  name: string;
  event: string;
  year: number;
  /** "won" = ganado, "finalist" = finalista/nominación */
  result: "won" | "finalist";
}
