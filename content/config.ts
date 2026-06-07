/**
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │  CONFIGURACIÓN CENTRAL DEL BINDER — EDITA ESTO PRIMERO                │
 * │  Cambiar estos valores actualiza TODO el sitio (nombre, colores,     │
 * │  enlaces, stats del hero...). No hace falta tocar más código.        │
 * └─────────────────────────────────────────────────────────────────────┘
 *
 * TODO: reemplazar TODOS los valores de ejemplo del team 4414 con los de tu equipo.
 */
export const teamConfig = {
  number: 4414, // ← número de tu equipo FRC
  name: "HighTide", // ← nombre del equipo
  robotName: "RIPCURRENT", // ← nombre del robot esta temporada
  season: 2026,
  gameName: "REBUILT", // ← nombre del juego FRC de la temporada
  tagline: "Built to ride the surge.", // ← tagline corto del robot/temporada
  location: "Ventura, CA", // ← ciudad del equipo
  founded: 2018,

  // Colores del equipo (hex). Alimentan el tema vía variables CSS.
  primaryColor: "#0066CC", // ← color principal
  accentColor: "#00CCFF", // ← color de acento

  // Video del robot reveal en YouTube (solo el ID, no la URL completa).
  youtubeRevealId: "9VpVZiApRFw",

  // Key de The Blue Alliance para stats en vivo (opcional, formato "frcXXXX").
  theBlueAllianceKey: "frc4414",

  // Stats destacadas que se muestran en el hero y la barra de stats.
  // TODO: actualizar tras cada competencia.
  stats: {
    record: "32-8-0", // récord W-L-T de la temporada
    ranking: "#3", // ranking en su distrito/evento
    awards: 7, // número de premios ganados
    eventsPlayed: 4,
  },

  socialLinks: {
    instagram: "https://instagram.com/team4414",
    youtube: "https://youtube.com/@team4414",
    github: "https://github.com/team4414",
    website: "https://team4414.com",
  },
} as const;

export type TeamConfig = typeof teamConfig;
