import type { Metadata } from "next";

import { readMdxDoc } from "@/lib/mdx";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { PageTransition } from "@/components/layout/PageTransition";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AutoPathVisualizer } from "@/components/software/AutoPathVisualizer";
import { ScoutingPreview } from "@/components/software/ScoutingPreview";

export const metadata: Metadata = {
  title: "Software",
  description:
    "Autónomo, visión por computadora con AprilTags y nuestra app de scouting propia.",
};

interface SoftwareFrontmatter {
  title: string;
  icon: string;
  summary: string;
  [key: string]: unknown;
}

export default async function SoftwarePage() {
  // Cargamos los tres documentos de software en paralelo.
  const [auto, vision, scouting] = await Promise.all([
    readMdxDoc<SoftwareFrontmatter>("software/autonomous.mdx"),
    readMdxDoc<SoftwareFrontmatter>("software/vision.mdx"),
    readMdxDoc<SoftwareFrontmatter>("software/scouting.mdx"),
  ]);

  return (
    <PageTransition>
      <div className="container-binder py-12">
        <SectionHeader
          align="left"
          badge="Código"
          title="Software"
          subtitle="Del autónomo a la visión por computadora y el scouting: así programamos para ganar."
        />

        <Tabs defaultValue="auto" className="mt-10">
          <TabsList>
            <TabsTrigger value="auto">Autónomo</TabsTrigger>
            <TabsTrigger value="vision">Visión</TabsTrigger>
            <TabsTrigger value="scouting">Scouting</TabsTrigger>
          </TabsList>

          <TabsContent value="auto">
            <div className="max-w-3xl">{auto.content}</div>
            <div className="mt-8">
              <AutoPathVisualizer />
            </div>
          </TabsContent>

          <TabsContent value="vision">
            <div className="max-w-3xl">{vision.content}</div>
          </TabsContent>

          <TabsContent value="scouting">
            <div className="max-w-3xl">{scouting.content}</div>
            <div className="mt-8">
              <ScoutingPreview />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
}
