import type { Metadata } from "next";

import { teamConfig } from "@content/config";
import {
  mechanicalOrder,
  softwareEntry,
  prototypingEntries,
} from "@content/binder/binder";
import { getAllSubsystemMeta } from "@/lib/mdx";
import { PageTransition } from "@/components/layout/PageTransition";
import { Badge } from "@/components/ui/badge";
import { Hero3D } from "@/components/binder/Hero3D";
import { ContentsIndex } from "@/components/binder/ContentsIndex";
import { BinderSection } from "@/components/binder/BinderSection";
import { BinderImage } from "@/components/binder/BinderImage";
import { CompareView } from "@/components/binder/CompareView";

export const metadata: Metadata = {
  title: "Subsistemas",
  description: `Recorrido completo de ${teamConfig.robotName}: drivetrain, intake, shooter, transfer, turret, software y prototipos.`,
};

export default async function SubsystemsPage() {
  // 1) Cargamos el frontmatter de los subsistemas y los ordenamos según el config.
  const allMeta = await getAllSubsystemMeta();
  const bySlug = new Map(allMeta.map((m) => [m.slug, m]));
  const mechanical = mechanicalOrder
    .map((slug) => bySlug.get(slug))
    .filter((m): m is NonNullable<typeof m> => Boolean(m));

  // 2) Numeración continua (01, 02, …) a través de TODAS las categorías.
  let counter = 0;
  const nextNumber = () => String(++counter).padStart(2, "0");

  const mechItems = mechanical.map((meta) => ({
    number: nextNumber(),
    id: meta.slug,
    title: meta.title,
    meta,
  }));
  const softwareNumber = nextNumber();
  const protoItems = prototypingEntries.map((p) => ({
    number: nextNumber(),
    entry: p,
  }));

  // 3) Categorías para el índice "Contents".
  const indexCategories = [
    {
      label: "Mecánico",
      items: mechItems.map(({ number, id, title }) => ({ number, id, title })),
    },
    {
      label: "Software",
      items: [
        { number: softwareNumber, id: softwareEntry.id, title: softwareEntry.title },
      ],
    },
    {
      label: "Prototipos",
      items: protoItems.map(({ number, entry }) => ({
        number,
        id: entry.id,
        title: entry.title,
      })),
    },
  ];

  return (
    <PageTransition>
      <div className="container-binder space-y-20 py-12">
        {/* Encabezado */}
        <header className="flex flex-col gap-3">
          <Badge variant="accent" className="w-fit uppercase tracking-wider">
            {teamConfig.season} · {teamConfig.gameName}
          </Badge>
          <h1 className="text-4xl font-bold sm:text-5xl">
            {teamConfig.robotName}
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            {teamConfig.tagline} Explora cada subsistema, nuestro software y el
            prototipado entre eventos.
          </p>
        </header>

        {/* 1. HERO 3D — click hace scroll al índice */}
        <Hero3D scrollToId="contents" />

        {/* 2. ÍNDICE DE COMPONENTES */}
        <ContentsIndex categories={indexCategories} />

        {/* 3. SECCIONES */}
        <div className="space-y-24">
          {/* Mecánico */}
          {mechItems.map(({ number, id, title, meta }) => (
            <BinderSection
              key={id}
              id={id}
              eyebrow={`Mecánico · ${number}`}
              title={title}
              summary={meta.summary}
              media={
                <BinderImage
                  src={meta.images[0]?.src ?? "/subsystems/placeholder.jpg"}
                  alt={meta.images[0]?.alt ?? `${title} con bumper`}
                />
              }
              features={meta.features}
              specs={meta.specs}
              detail={{
                href: `/subsystems/${id}`,
                label: "Ver detalle completo",
              }}
            />
          ))}

          {/* Software */}
          <BinderSection
            id={softwareEntry.id}
            eyebrow={`Software · ${softwareNumber}`}
            title={softwareEntry.title}
            summary={softwareEntry.summary}
            media={
              <BinderImage src={softwareEntry.image} alt="Software del robot" />
            }
            features={softwareEntry.features}
            detail={{ href: softwareEntry.href, label: "Ver software completo" }}
          />

          {/* Prototipos */}
          {protoItems.map(({ number, entry }) => (
            <BinderSection
              key={entry.id}
              id={entry.id}
              eyebrow={`Prototipos · ${number}`}
              title={entry.title}
              summary={entry.summary}
              media={
                <CompareView
                  beforeImage={entry.beforeImage}
                  afterImage={entry.afterImage}
                  beforeLabel={entry.beforeLabel}
                  afterLabel={entry.afterLabel}
                />
              }
              features={entry.features}
              detail={{ href: "/iterations", label: "Ver todas las iteraciones" }}
            />
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
