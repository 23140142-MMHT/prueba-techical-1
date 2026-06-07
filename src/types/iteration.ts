/** Una iteración/versión del robot mostrada en el slider de comparación. */
export interface Iteration {
  /** Identificador único, ej. "v1" */
  id: string;
  /** Etiqueta corta visible, ej. "Prototipo inicial" */
  label: string;
  /** Fecha legible, ej. "Enero 2026" */
  date: string;
  /** Descripción de esta versión */
  description: string;
  /** Imagen de ESTA versión (lado izquierdo del slider) */
  beforeImage: string;
  /** Imagen de la SIGUIENTE versión (lado derecho del slider) */
  afterImage: string;
  /** Lista de cambios realizados respecto a la versión anterior */
  changes: string[];
}
