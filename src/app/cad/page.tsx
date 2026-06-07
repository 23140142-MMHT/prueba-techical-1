import type { Metadata } from "next";

import { teamConfig } from "@content/config";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { PageTransition } from "@/components/layout/PageTransition";
import { CadExplorer } from "@/components/cad/CadExplorer";

export const metadata: Metadata = {
  title: "CAD 3D",
  description: `Explora el modelo 3D de ${teamConfig.robotName} subsistema por subsistema.`,
};

export default function CadPage() {
  return (
    <PageTransition>
      <div className="container-binder py-12">
        <SectionHeader
          align="left"
          badge="Diseño 3D"
          title="Explorador de CAD"
          subtitle={`Rota el modelo de ${teamConfig.robotName} y usa las pestañas para aislar cada subsistema, igual que en el CAD real.`}
        />

        <div className="mt-10">
          <CadExplorer />
        </div>

        <p className="mt-4 text-sm text-muted-foreground">
          Tip: el modelo se carga desde{" "}
          <code className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-xs">
            public/cad/robot.glb
          </code>
          . Edita las pestañas en{" "}
          <code className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-xs">
            content/cad/cad-config.ts
          </code>
          .
        </p>
      </div>
    </PageTransition>
  );
}
