import type { Sponsor } from "@/types/team";

/**
 * PATROCINADORES.
 *
 * Logos en public/sponsors/ — SVG (preferido) o PNG con fondo transparente,
 * mínimo 400px de ancho, nombre en minúsculas sin espacios (ej. google.svg).
 *
 * TODO: reemplazar con tus patrocinadores reales.
 */
export const sponsors: Sponsor[] = [
  {
    name: "NASA",
    logo: "/sponsors/nasa.svg",
    url: "https://nasa.gov",
    tier: "platinum",
  },
  {
    name: "Boeing",
    logo: "/sponsors/boeing.svg",
    url: "https://boeing.com",
    tier: "gold",
  },
  {
    name: "Gene Haas Foundation",
    logo: "/sponsors/haas.svg",
    url: "https://ghaasfoundation.org",
    tier: "gold",
  },
  {
    name: "Local Machine Shop",
    logo: "/sponsors/local-machine-shop.png",
    tier: "silver",
  },
  {
    name: "Ventura Robotics Club",
    logo: "/sponsors/ventura-robotics.png",
    tier: "community",
  },
  // Agrega tus patrocinadores aquí.
];
