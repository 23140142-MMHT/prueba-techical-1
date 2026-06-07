/**
 * ┌──────────────────────────────────────────────────────────────────────────┐
 * │  EXPLORADOR DE CAD 3D — CONFIGURACIÓN (edita SOLO este archivo)            │
 * ├──────────────────────────────────────────────────────────────────────────┤
 * │  Aquí defines:                                                             │
 * │   1) Dónde está tu modelo 3D (.glb)                                        │
 * │   2) Las pestañas (subsistemas) y qué piezas resalta cada una             │
 * └──────────────────────────────────────────────────────────────────────────┘
 *
 *  CÓMO EXPORTAR TU CAD A .glb
 *  ───────────────────────────
 *  • Onshape:   click derecho en el Assembly → "Export" → formato glTF (.glb).
 *  • Fusion 360: usa el add-in/exportador a glTF, o exporta a .obj/.fbx y
 *                conviértelo a .glb en https://glb.ee o con Blender.
 *  • SolidWorks: exporta a .gltf/.glb (o vía Blender).
 *  • Blender:    File → Export → glTF 2.0 (.glb), marca "Include > Selected/All".
 *
 *  ⚠️ MUY IMPORTANTE: para que las pestañas resalten piezas, cada componente
 *  debe tener un NOMBRE en el CAD (ej. "swerve_module_FL", "shooter_flywheel").
 *  Esos nombres viajan dentro del .glb. Las palabras clave de abajo (`keywords`)
 *  se comparan contra esos nombres (sin distinguir mayúsculas).
 *
 *  Guarda tu archivo en:  public/cad/robot.glb
 *  (o cambia `cadModelPath` si usas otro nombre/ruta).
 */

// Ruta al modelo 3D dentro de /public. Empieza con "/".
export const cadModelPath = "/cad/robot.glb";

/**
 * ¿No sabes cómo se llaman tus piezas dentro del .glb?
 * Pon esto en `true`, abre la página /cad y mira la consola del navegador (F12):
 * se imprime la lista de TODOS los nombres de mallas de tu modelo. Con esa lista
 * armas las `keywords` de abajo y luego vuelve a poner `false`.
 */
export const DEBUG_LOG_MESH_NAMES = false;

export interface CadSubsystem {
  /** id único (interno) */
  id: string;
  /** Texto visible en la pestaña */
  label: string;
  /**
   * Palabras clave que identifican las piezas de este subsistema.
   * Una pieza se resalta si su NOMBRE contiene CUALQUIERA de estas palabras.
   * Deja el array VACÍO ([]) para mostrar TODO el robot (pestaña "Full assembly").
   */
  keywords: string[];
}

/**
 * Las pestañas, en orden. La PRIMERA es la que se muestra al abrir.
 * Edita labels y keywords para que coincidan con tu robot y tus nombres de CAD.
 */
export const cadSubsystems: CadSubsystem[] = [
  {
    id: "full",
    label: "Full Robot Assembly",
    keywords: [], // vacío = muestra todo en color, sin desvanecer nada
  },
  {
    id: "drivetrain",
    label: "Drivetrain",
    keywords: ["drive", "swerve", "module", "wheel", "gearbox", "chassis"],
  },
  {
    id: "bumpers",
    label: "Bumpers",
    keywords: ["bumper"],
  },
  {
    id: "dyerotor",
    label: "Dye Rotor",
    keywords: ["rotor", "dye", "indexer", "turntable", "carousel"],
  },
  {
    id: "intake",
    label: "Intake",
    keywords: ["intake", "roller", "belt", "feeder"],
  },
  {
    id: "shooter",
    label: "Shooter",
    keywords: ["shooter", "flywheel", "hood", "launcher"],
  },
  {
    id: "turret",
    label: "Turret",
    keywords: ["turret", "azimuth", "ring", "yaw"],
  },
];
