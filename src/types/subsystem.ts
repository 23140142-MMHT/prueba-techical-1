/** Una especificación técnica (fila de la tabla de specs). */
export interface Spec {
  label: string;
  value: string;
}

/** Una imagen de galería de subsistema. */
export interface SubsystemImage {
  src: string;
  alt: string;
}

/** Frontmatter esperado en cada archivo content/subsystems/*.mdx */
export interface SubsystemFrontmatter {
  title: string;
  slug: string;
  /** Nombre de icono de Lucide (ej. "cog", "target") */
  icon: string;
  summary: string;
  specs: Spec[];
  images: SubsystemImage[];
}

/** Subsistema completo: frontmatter + contenido MDX compilado + texto crudo. */
export interface Subsystem extends SubsystemFrontmatter {
  /** Cuerpo MDX en crudo (markdown), por si se necesita para el chatbot. */
  rawContent: string;
}
