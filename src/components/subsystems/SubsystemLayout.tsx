import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import type { SubsystemFrontmatter } from "@/types/subsystem";
import { LucideIcon } from "@/components/shared/LucideIcon";
import { SpecTable } from "./SpecTable";
import { ImageGallery } from "./ImageGallery";

/**
 * Layout base de una página de subsistema: cabecera + specs + galería + cuerpo MDX.
 */
export function SubsystemLayout({
  frontmatter,
  children,
}: {
  frontmatter: SubsystemFrontmatter;
  children: React.ReactNode;
}) {
  return (
    <article className="container-binder py-12">
      <Link
        href="/subsystems"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent"
      >
        <ArrowLeft className="size-4" /> Todos los subsistemas
      </Link>

      {/* Cabecera */}
      <header className="mt-6 flex items-start gap-4">
        <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
          <LucideIcon name={frontmatter.icon} className="size-7" />
        </div>
        <div>
          <h1 className="text-4xl font-bold">{frontmatter.title}</h1>
          <p className="mt-2 max-w-2xl text-lg text-muted-foreground">
            {frontmatter.summary}
          </p>
        </div>
      </header>

      {/* Specs + galería */}
      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-start">
        <aside className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Especificaciones
          </h2>
          <SpecTable specs={frontmatter.specs} />
        </aside>
        <div className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Galería
          </h2>
          <ImageGallery images={frontmatter.images} />
        </div>
      </div>

      {/* Cuerpo MDX */}
      <div className="mt-12 max-w-3xl">{children}</div>
    </article>
  );
}
