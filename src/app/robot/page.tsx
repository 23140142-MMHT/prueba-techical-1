import type { Metadata } from "next";

import { teamConfig } from "@content/config";
import { readMdxDoc } from "@/lib/mdx";
import type { Spec } from "@/types/subsystem";
import { SpecTable } from "@/components/subsystems/SpecTable";
import { ImageGallery } from "@/components/subsystems/ImageGallery";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { PageTransition } from "@/components/layout/PageTransition";

export const metadata: Metadata = {
  title: "Robot",
  description: `Overview técnico de ${teamConfig.robotName}: specs, estrategia y galería.`,
};

// Frontmatter esperado en content/robot/overview.mdx
interface RobotFrontmatter {
  title: string;
  robotName: string;
  summary: string;
  specs: Spec[];
  [key: string]: unknown;
}

// Galería del robot (versión final). Sube fotos a /public/robot/v3/.
const ROBOT_IMAGES = [
  { src: "/robot/v3/robot-front.jpg", alt: `${teamConfig.robotName} — vista frontal` },
  { src: "/robot/v3/robot-side.jpg", alt: `${teamConfig.robotName} — vista lateral` },
  { src: "/robot/v3/robot-action.jpg", alt: `${teamConfig.robotName} — en competencia` },
  { src: "/robot/v3/robot-cad.jpg", alt: `${teamConfig.robotName} — render CAD` },
];

export default async function RobotPage() {
  const { content, frontmatter } = await readMdxDoc<RobotFrontmatter>(
    "robot/overview.mdx",
  );

  return (
    <PageTransition>
      <div className="container-binder py-12">
        <SectionHeader
          align="left"
          badge={`Temporada ${teamConfig.season}`}
          title={frontmatter.robotName ?? teamConfig.robotName}
          subtitle={frontmatter.summary}
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.3fr] lg:items-start">
          <aside className="space-y-4 lg:sticky lg:top-24">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Ficha técnica
            </h2>
            <SpecTable specs={frontmatter.specs ?? []} />
          </aside>

          <div className="space-y-8">
            <ImageGallery images={ROBOT_IMAGES} />
            <div className="max-w-3xl">{content}</div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
