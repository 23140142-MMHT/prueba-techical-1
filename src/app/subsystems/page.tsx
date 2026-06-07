import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { getAllSubsystemMeta } from "@/lib/mdx";
import { LucideIcon } from "@/components/shared/LucideIcon";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { SpecTable } from "@/components/subsystems/SpecTable";
import { PageTransition } from "@/components/layout/PageTransition";

export const metadata: Metadata = {
  title: "Subsistemas",
  description:
    "Drivetrain, shooter, intake y climber: decisiones de diseño y specs de cada subsistema.",
};

export default async function SubsystemsIndexPage() {
  const subsystems = await getAllSubsystemMeta();

  return (
    <PageTransition>
      <div className="container-binder py-12">
        <SectionHeader
          align="left"
          badge="Ingeniería"
          title="Subsistemas"
          subtitle="Cada subsistema fue diseñado, prototipado e iterado por nuestros estudiantes. Haz click para ver las decisiones técnicas detrás de cada uno."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {subsystems.map((s) => (
            <Link
              key={s.slug}
              href={`/subsystems/${s.slug}`}
              className="group flex flex-col gap-5 rounded-xl border border-border bg-surface/80 p-6 transition-all hover:-translate-y-1 hover:border-accent/50 hover:shadow-glow-sm"
            >
              <div className="flex items-start justify-between">
                <div className="flex size-12 items-center justify-center rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  <LucideIcon name={s.icon} className="size-6" />
                </div>
                <ArrowUpRight className="size-5 text-muted-foreground transition-colors group-hover:text-accent" />
              </div>
              <div>
                <h2 className="font-heading text-xl font-bold">{s.title}</h2>
                <p className="mt-1.5 text-sm text-muted-foreground">{s.summary}</p>
              </div>
              {/* Primeras specs como vista previa */}
              <SpecTable specs={s.specs.slice(0, 3)} />
            </Link>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
