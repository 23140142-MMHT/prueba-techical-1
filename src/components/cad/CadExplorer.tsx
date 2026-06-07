"use client";

import * as React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Bounds, ContactShadows, Html } from "@react-three/drei";
import { Box, Rotate3d } from "lucide-react";

import { cadSubsystems } from "@content/cad/cad-config";
import { cn } from "@/lib/utils";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";
import { CadModel } from "./CadModel";

/**
 * ───────────────────────────────────────────────────────────────────────────
 *  AJUSTES DE LA ESCENA (cámbialos a tu gusto)
 * ───────────────────────────────────────────────────────────────────────────
 */
// Color de fondo del visor (crema claro, como el binder de 4414).
const STAGE_BG = "#f4f3ee";
// Posición inicial de la cámara [x, y, z]. Aleja/acerca cambiando estos números.
const CAMERA_POSITION: [number, number, number] = [2.5, 1.8, 3];
// Campo de visión (fov). Más grande = más "gran angular".
const CAMERA_FOV = 35;

/** Mensaje cuando el modelo .glb aún no existe o falló al cargar. */
function MissingModel() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-8 text-center text-slate-500">
      <Box className="size-10 opacity-40" />
      <p className="max-w-sm text-sm">
        Sube tu modelo 3D a{" "}
        <code className="rounded bg-black/10 px-1.5 py-0.5 font-mono">
          public/cad/robot.glb
        </code>{" "}
        para verlo aquí. Configura las pestañas en{" "}
        <code className="rounded bg-black/10 px-1.5 py-0.5 font-mono">
          content/cad/cad-config.ts
        </code>
        .
      </p>
    </div>
  );
}

export function CadExplorer() {
  // Pestaña activa (empieza en la primera del config).
  const [activeId, setActiveId] = React.useState(cadSubsystems[0].id);

  // Solo renderizamos el Canvas WebGL en el cliente (evita errores de SSR).
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-glow">
      {/* Escenario 3D */}
      <div
        className="relative aspect-[16/10] w-full"
        style={{ backgroundColor: STAGE_BG }}
      >
        {/* Pista visual de que se puede rotar */}
        <div className="pointer-events-none absolute left-3 top-3 z-10 flex items-center gap-1.5 rounded-full bg-black/5 px-3 py-1 text-xs font-medium text-slate-500">
          <Rotate3d className="size-3.5" /> Arrastra para rotar · scroll para zoom
        </div>

        {mounted ? (
          <ErrorBoundary fallback={<MissingModel />}>
            <Canvas
              camera={{ position: CAMERA_POSITION, fov: CAMERA_FOV }}
              dpr={[1, 2]} // nitidez en pantallas retina, sin pasarse de pesado
              shadows
            >
              {/* Suspense muestra "Cargando…" mientras se descarga el .glb */}
              <React.Suspense
                fallback={
                  <Html center className="text-sm text-slate-500">
                    Cargando modelo…
                  </Html>
                }
              >
                {/* Iluminación sencilla (sin HDR externo, funciona offline).
                    Para reflejos más realistas puedes añadir <Environment preset="city" /> de drei. */}
                <ambientLight intensity={0.7} />
                <hemisphereLight intensity={0.5} groundColor="#cccccc" />
                <directionalLight
                  position={[5, 8, 5]}
                  intensity={1.3}
                  castShadow
                  shadow-mapSize={[1024, 1024]}
                />

                {/* <Bounds> encuadra automáticamente el modelo en la cámara. */}
                <Bounds fit clip observe margin={1.15}>
                  <CadModel activeId={activeId} />
                </Bounds>

                {/* Sombra de contacto suave bajo el robot. */}
                <ContactShadows
                  position={[0, -0.6, 0]}
                  opacity={0.35}
                  blur={2.4}
                  scale={10}
                  far={2}
                />
              </React.Suspense>

              {/* Controles de órbita: arrastrar = rotar, scroll = zoom, click derecho = pan. */}
              <OrbitControls makeDefault enableDamping enablePan />
            </Canvas>
          </ErrorBoundary>
        ) : (
          // Placeholder mientras hidrata (mismo tamaño, sin salto de layout).
          <div className="absolute inset-0 flex items-center justify-center text-sm text-slate-400">
            Inicializando visor 3D…
          </div>
        )}
      </div>

      {/* Barra de pestañas (subsistemas) */}
      <div className="flex justify-center border-t border-border bg-surface/80 p-3">
        <div className="flex max-w-full gap-1 overflow-x-auto">
          {cadSubsystems.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActiveId(s.id)}
              className={cn(
                "whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-colors sm:text-sm",
                activeId === s.id
                  ? "bg-accent/15 text-accent"
                  : "text-muted-foreground hover:text-foreground",
              )}
              aria-pressed={activeId === s.id}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
