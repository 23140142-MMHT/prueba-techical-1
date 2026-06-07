import type { Metadata } from "next";

import { teamConfig } from "@content/config";
import { iterations } from "@content/iterations/iterations";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { IterationsView } from "@/components/iterations/IterationsView";
import { PageTransition } from "@/components/layout/PageTransition";

export const metadata: Metadata = {
  title: "Iteraciones",
  description: `Cómo evolucionó ${teamConfig.robotName} a lo largo de la temporada: comparación visual entre versiones.`,
};

export default function IterationsPage() {
  return (
    <PageTransition>
      <div className="container-binder py-12">
        <SectionHeader
          align="left"
          badge="Diseño iterativo"
          title="Iteraciones del robot"
          subtitle={`Arrastra el control para comparar versiones de ${teamConfig.robotName} y descubre las decisiones de ingeniería detrás de cada cambio.`}
        />

        <div className="mt-12">
          <IterationsView iterations={iterations} />
        </div>
      </div>
    </PageTransition>
  );
}
