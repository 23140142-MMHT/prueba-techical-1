import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { SubsystemFrontmatter } from "@/types/subsystem";
import { LucideIcon } from "@/components/shared/LucideIcon";
import { SectionHeader } from "@/components/shared/SectionHeader";

/**
 * Grid de cards-preview de los subsistemas principales (home).
 * Recibe el frontmatter de cada subsistema desde la página servidor.
 */
export function SubsystemsPreview({
  subsystems,
}: {
  subsystems: Pick<SubsystemFrontmatter, "slug" | "title" | "summary" | "icon">[];
}) {
  return (
    <section className="container-binder py-20">
      <SectionHeader
        badge="Ingeniería"
        title="Subsistemas principales"
        subtitle="Cada subsistema de RIPCURRENT fue diseñado, prototipado e iterado por nuestros estudiantes. Explora las decisiones técnicas detrás de cada uno."
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {subsystems.map((s) => (
          <Link
            key={s.slug}
            href={`/subsystems/${s.slug}`}
            className="group relative flex flex-col gap-4 overflow-hidden rounded-lg border border-border bg-surface/80 p-6 transition-all hover:-translate-y-1 hover:border-accent/50 hover:shadow-glow-sm"
          >
            <div className="flex size-12 items-center justify-center rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
              <LucideIcon name={s.icon} className="size-6" />
            </div>
            <div className="flex-1">
              <h3 className="flex items-center gap-1 font-heading text-lg font-semibold">
                {s.title}
                <ArrowUpRight className="size-4 opacity-0 transition-opacity group-hover:opacity-100" />
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.summary}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
