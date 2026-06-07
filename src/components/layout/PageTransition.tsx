"use client";

import { motion } from "framer-motion";

/**
 * Envoltorio de transición de entrada para el contenido de cada página.
 * Un fade + leve desplazamiento al montar. Respeta prefers-reduced-motion
 * porque Framer lo desactiva automáticamente vía el media query global.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
