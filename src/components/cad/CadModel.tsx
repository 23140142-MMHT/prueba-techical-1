"use client";

import * as React from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";

import {
  cadModelPath,
  cadSubsystems,
  DEBUG_LOG_MESH_NAMES,
} from "@content/cad/cad-config";

/**
 * ───────────────────────────────────────────────────────────────────────────
 *  AJUSTES VISUALES (cámbialos a tu gusto)
 * ───────────────────────────────────────────────────────────────────────────
 */
// Opacidad de las piezas NO seleccionadas (efecto "fantasma"). 0 = invisible, 1 = opaco.
const GHOST_OPACITY = 0.08;
// Color al que se tiñen las piezas fantasma (gris claro, como en los renders de 4414).
const GHOST_COLOR = new THREE.Color("#c9c9c4");

/**
 * Aplica el estado visual (resaltado / fantasma) a una malla.
 * `belongs = true`  → pieza del subsistema activo: color original, opaca.
 * `belongs = false` → resto del robot: gris claro y semitransparente.
 */
function applyHighlight(mesh: THREE.Mesh, belongs: boolean) {
  const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];

  materials.forEach((mat) => {
    const m = mat as THREE.MeshStandardMaterial;
    // Guardamos el color original UNA sola vez para poder restaurarlo.
    if (!m.userData.originalColor && m.color) {
      m.userData.originalColor = m.color.clone();
    }

    if (belongs) {
      if (m.userData.originalColor) m.color.copy(m.userData.originalColor);
      m.opacity = 1;
      m.transparent = false;
      m.depthWrite = true;
    } else {
      m.color.copy(GHOST_COLOR);
      m.opacity = GHOST_OPACITY;
      m.transparent = true;
      m.depthWrite = false; // evita artefactos al ver a través de varias piezas
    }
    m.needsUpdate = true;
  });
}

export function CadModel({ activeId }: { activeId: string }) {
  // useGLTF carga y cachea el .glb. El segundo argumento `true` habilita el
  // decoder de Draco (por si exportaste el modelo comprimido; no estorba si no).
  const { scene } = useGLTF(cadModelPath, true);

  /**
   * Clonamos la escena (y cada material) UNA vez. Necesitamos materiales propios
   * por malla para poder bajar la opacidad de unas sin afectar a otras que
   * compartan el mismo material original.
   */
  const model = React.useMemo(() => {
    const root = scene.clone(true);
    root.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (!mesh.isMesh) return;
      mesh.material = Array.isArray(mesh.material)
        ? mesh.material.map((m) => m.clone())
        : mesh.material.clone();

      // Debug opcional: imprime los nombres de las piezas para armar tus keywords.
      if (DEBUG_LOG_MESH_NAMES) console.log("CAD mesh:", mesh.name);
    });
    return root;
  }, [scene]);

  /**
   * Cada vez que cambias de pestaña, recorremos el modelo y decidimos qué piezas
   * pertenecen al subsistema activo comparando su NOMBRE con las `keywords`.
   */
  React.useEffect(() => {
    const sub = cadSubsystems.find((s) => s.id === activeId);
    const keywords = sub?.keywords ?? [];
    const showAll = keywords.length === 0; // "Full assembly"

    let matches = 0;
    model.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (!mesh.isMesh) return;
      const name = mesh.name.toLowerCase();
      const belongs =
        showAll || keywords.some((k) => name.includes(k.toLowerCase()));
      if (belongs && !showAll) matches++;
      applyHighlight(mesh, belongs);
    });

    // Red de seguridad: si NINGUNA pieza coincide (keyword mal escrita o piezas
    // sin nombre), mostramos todo y avisamos en consola en vez de dejar la
    // pantalla vacía.
    if (!showAll && matches === 0) {
      console.warn(
        `[CAD] Ninguna pieza coincide con "${activeId}". Revisa las keywords en ` +
          `content/cad/cad-config.ts o activa DEBUG_LOG_MESH_NAMES para ver los nombres reales.`,
      );
      model.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (mesh.isMesh) applyHighlight(mesh, true);
      });
    }
  }, [activeId, model]);

  // <primitive> inserta un objeto de three.js ya existente en la escena de R3F.
  return <primitive object={model} />;
}

// Pre-carga del modelo para que aparezca más rápido (no rompe si el archivo aún no existe).
useGLTF.preload(cadModelPath, true);
