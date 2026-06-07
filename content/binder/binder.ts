/**
 * ┌──────────────────────────────────────────────────────────────────────────┐
 * │  CONFIG DE LA PÁGINA /subsystems (binder estilo team4414.com)              │
 * │  Aquí controlas el ORDEN y las CATEGORÍAS del índice "Contents".           │
 * └──────────────────────────────────────────────────────────────────────────┘
 */

/**
 * Orden en que aparecen los subsistemas mecánicos (deben coincidir con los
 * `slug` de los archivos en content/subsystems/*.mdx).
 */
export const mechanicalOrder = [
  "drivetrain",
  "intake",
  "shooter",
  "transfer",
  "turret",
];

/**
 * Entrada de la categoría "Software" en el índice. Resume el software del robot
 * y enlaza a la página /software (que tiene el detalle: auto, visión, scouting).
 */
export const softwareEntry = {
  id: "software",
  title: "Software",
  summary:
    "Autónomo, visión con AprilTags y nuestra app de scouting. El cerebro detrás del turret y el auto-aim.",
  image: "/software/scouting-dashboard.png",
  features: [
    {
      text: "Auto-aim del turret combinando AprilTags + odometría",
      sub: ["El shooter se mantiene apuntado mientras el robot se mueve"],
    },
    { text: "Rutas autónomas modulares seleccionables desde el dashboard" },
    { text: "App de scouting offline-first para selección de alianzas" },
  ],
  href: "/software", // "Ver detalle" lleva a la página de software
};

/**
 * Entradas de la categoría "Prototipos".
 * Cada una compara el robot entre dos eventos (slider antes/después).
 *
 * TODO: reemplaza las imágenes con fotos reales de cada evento.
 * Las imágenes van en public/prototyping/ o reutiliza las de public/robot/.
 */
export interface PrototypeEntry {
  id: string;
  title: string;
  summary: string;
  /** Imagen del estado "antes" (evento 1) */
  beforeImage: string;
  /** Imagen del estado "después" (evento 2) */
  afterImage: string;
  beforeLabel: string;
  afterLabel: string;
  /** Cambios entre un evento y el otro */
  features: { text: string; sub?: string[] }[];
}

export const prototypingEntries: PrototypeEntry[] = [
  {
    id: "mexico-vs-niagara",
    title: "Mexico Championship vs Niagara Premiere",
    summary:
      "Cómo evolucionó el robot entre el Mexico Championship y el Niagara Premiere Event. Arrastra el control para comparar.",
    beforeImage: "/prototyping/mexico-championship.jpg",
    afterImage: "/prototyping/niagara-premiere.jpg",
    beforeLabel: "Mexico Championship",
    afterLabel: "Niagara Premiere",
    features: [
      {
        text: "Rediseño del transfer para eliminar atascos vistos en México",
        sub: ["Cola de 2 → 3 piezas y guías impresas en 3D nuevas"],
      },
      { text: "Turret con encoder absoluto (antes era relativo con homing)" },
      { text: "Auto-aim afinado: +15% de precisión a media distancia" },
      { text: "Aligeramiento del chasis: -0.4 kg para más velocidad" },
    ],
  },
  // Agrega más comparaciones entre eventos aquí.
];

/** Categorías del índice "Contents", en orden. */
export const binderCategories = [
  { id: "mechanical", label: "Mecánico" },
  { id: "software", label: "Software" },
  { id: "prototyping", label: "Prototipos" },
] as const;
