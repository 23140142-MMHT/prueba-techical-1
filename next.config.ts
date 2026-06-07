import type { NextConfig } from "next";

/**
 * Configuración de Next.js.
 *
 * El contenido MDX se renderiza en runtime con `next-mdx-remote` (ver src/lib/mdx.ts),
 * por eso NO se necesita el plugin @next/mdx aquí ni `pageExtensions` con .mdx.
 * Las imágenes del robot/subsistemas viven en /public, así que no hacen falta
 * `remotePatterns` salvo que agregues imágenes externas (ej. CDN de sponsors).
 */
const nextConfig: NextConfig = {
  images: {
    // Formatos modernos para mejor performance en Vercel.
    formats: ["image/avif", "image/webp"],
    // Si algún día sirves imágenes desde un dominio externo, agrégalo aquí:
    // remotePatterns: [{ protocol: "https", hostname: "cdn.tuequipo.com" }],
  },
};

export default nextConfig;
