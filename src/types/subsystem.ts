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

/** Una "feature" del subsistema: viñeta principal con sub-viñetas opcionales. */
export interface SubsystemFeature {
  /** Texto de la viñeta principal */
  text: string;
  /** Sub-viñetas opcionales (detalles anidados) */
  sub?: string[];
}

/** Frontmatter esperado en cada archivo content/subsystems/*.mdx */
export interface SubsystemFrontmatter {
  title: string;
  slug: string;
  /** Nombre de icono de Lucide (ej. "cog", "target") */
  icon: string;
  /** Categoría del binder: por ahora todos los subsistemas son "mechanical" */
  category?: "mechanical" | "software" | "prototyping";
  summary: string;
  specs: Spec[];
  images: SubsystemImage[];
  /** Lista de features (columna derecha de la página /subsystems estilo 4414) */
  features?: SubsystemFeature[];
}

/** Subsistema completo: frontmatter + contenido MDX compilado + texto crudo. */
export interface Subsystem extends SubsystemFrontmatter {
  /** Cuerpo MDX en crudo (markdown), por si se necesita para el chatbot. */
  rawContent: string;
}
