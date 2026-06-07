import type { Iteration } from "@/types/iteration";

/**
 * ITERACIONES DEL ROBOT — feature estrella del binder (slider de comparación).
 *
 * Cada entrada compara ESTA versión (beforeImage) con la SIGUIENTE (afterImage).
 * Las imágenes van en public/robot/v1/, v2/, v3/...
 *
 * TODO: reemplazar con las fotos e iteraciones reales de tu robot.
 */
export const iterations: Iteration[] = [
  {
    id: "v1",
    label: "Prototipo inicial",
    date: "Enero 2026",
    description:
      "Primera versión funcional. Drivetrain básico con intake de prueba para validar la estrategia de juego.",
    beforeImage: "/robot/v1/robot-front.jpg",
    afterImage: "/robot/v2/robot-front.jpg",
    changes: [
      "Cambio de intake de rodillos a belts para mejor retención",
      "Rediseño del shooter para mayor consistencia de tiro",
      "Reducción de peso del chasis en 3 lbs",
    ],
  },
  {
    id: "v2",
    label: "Post-Week 1",
    date: "Febrero 2026",
    description:
      "Ajustes mayores tras la primera competencia. Shooter rediseñado por completo y climber más rápido.",
    beforeImage: "/robot/v2/robot-front.jpg",
    afterImage: "/robot/v3/robot-front.jpg",
    changes: [
      "Nuevo shooter con ruedas de compresión ajustable",
      "Mejora de climber: +40% velocidad de subida",
      "Cableado reorganizado para acceso rápido en pits",
    ],
  },
  // Agrega más iteraciones aquí siguiendo el mismo formato.
];
