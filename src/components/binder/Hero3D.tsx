"use client";

import * as React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Bounds, ContactShadows, Html } from "@react-three/drei";
import { Box, MousePointerClick } from "lucide-react";

import { ErrorBoundary } from "@/components/shared/ErrorBoundary";
import { CadModel } from "@/components/cad/CadModel";

/**
 * Hero 3D de la página /subsystems.
 *
 * Muestra el modelo del robot AUTO-ROTANDO. Al hacer click en cualquier parte,
 * hace scroll suave hasta `scrollToId` (la sección de subsistemas). La rotación
 * libre con el mouse vive en la página /cad (aquí el canvas no captura el mouse,
 * por eso el click se usa para el scroll).
 */
const STAGE_BG = "#f4f3ee"; // fondo crema, como el binder de 4414

function Placeholder() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-slate-500">
      <Box className="size-10 opacity-40" />
      <p className="max-w-xs px-6 text-center text-sm">
        Sube tu modelo a{" "}
        <code className="rounded bg-black/10 px-1.5 py-0.5 font-mono text-xs">
          public/cad/robot.glb
        </code>{" "}
        para verlo girar aquí.
      </p>
    </div>
  );
}

export function Hero3D({ scrollToId }: { scrollToId: string }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const scrollToSubsystems = () => {
    document.getElementById(scrollToId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToSubsystems}
      aria-label="Explorar subsistemas"
      className="group relative block aspect-[16/10] w-full overflow-hidden rounded-xl border border-border shadow-glow"
      style={{ backgroundColor: STAGE_BG }}
    >
      {mounted && (
        <ErrorBoundary fallback={<Placeholder />}>
          {/* El canvas NO captura el mouse (pointer-events-none) para que el
              click llegue al botón y dispare el scroll. */}
          <Canvas
            className="pointer-events-none"
            camera={{ position: [2.6, 1.8, 3], fov: 35 }}
            dpr={[1, 2]}
            shadows
          >
            <React.Suspense
              fallback={
                <Html center className="text-sm text-slate-500">
                  Cargando modelo…
                </Html>
              }
            >
              <ambientLight intensity={0.7} />
              <hemisphereLight intensity={0.5} groundColor="#cccccc" />
              <directionalLight position={[5, 8, 5]} intensity={1.3} castShadow />
              <Bounds fit clip observe margin={1.15}>
                {/* activeId="full" = todo el robot en color, sin desvanecer nada */}
                <CadModel activeId="full" />
              </Bounds>
              <ContactShadows
                position={[0, -0.6, 0]}
                opacity={0.35}
                blur={2.4}
                scale={10}
                far={2}
              />
              {/* Auto-rotación; el usuario no rota aquí (eso está en /cad) */}
              <OrbitControls
                autoRotate
                autoRotateSpeed={1.1}
                enableZoom={false}
                enablePan={false}
                enableRotate={false}
              />
            </React.Suspense>
          </Canvas>
        </ErrorBoundary>
      )}

      {/* Pista de interacción */}
      <span className="pointer-events-none absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/70 px-4 py-2 text-sm font-medium text-white transition-transform group-hover:scale-105">
        <MousePointerClick className="size-4" /> Click para explorar los subsistemas
      </span>
    </button>
  );
}
