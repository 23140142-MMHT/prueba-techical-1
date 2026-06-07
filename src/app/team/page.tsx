import type { Metadata } from "next";
import { Trophy, Medal } from "lucide-react";

import { teamConfig } from "@content/config";
import { members } from "@content/team/members";
import { sponsors } from "@content/team/sponsors";
import { awards } from "@content/awards/awards";
import { readMdxDoc } from "@/lib/mdx";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { PageTransition } from "@/components/layout/PageTransition";
import { MemberCard } from "@/components/team/MemberCard";
import { SafeImage } from "@/components/shared/SafeImage";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Equipo",
  description: `Conoce al equipo ${teamConfig.number} ${teamConfig.name}: historia, miembros, patrocinadores y premios.`,
};

interface AboutFrontmatter {
  title: string;
  summary: string;
  [key: string]: unknown;
}

export default async function TeamPage() {
  const { content } = await readMdxDoc<AboutFrontmatter>("team/about.mdx");
  // Premios ordenados del más reciente al más antiguo.
  const sortedAwards = [...awards].sort((a, b) => b.year - a.year);

  return (
    <PageTransition>
      <div className="container-binder space-y-20 py-12">
        {/* Sobre el equipo */}
        <section>
          <SectionHeader
            align="left"
            badge="Nosotros"
            title={`Team ${teamConfig.number} ${teamConfig.name}`}
            subtitle={`${teamConfig.location} · Fundado en ${teamConfig.founded}`}
          />
          <div className="mt-8 max-w-3xl">{content}</div>
        </section>

        {/* Miembros */}
        <section>
          <SectionHeader align="left" title="Miembros" />
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {members.map((m) => (
              <MemberCard key={m.name} member={m} />
            ))}
          </div>
        </section>

        {/* Premios */}
        <section>
          <SectionHeader align="left" title="Premios y logros" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sortedAwards.map((award, i) => (
              <div
                key={`${award.name}-${i}`}
                className="card-surface flex items-start gap-4 p-5"
              >
                <div
                  className={`flex size-11 shrink-0 items-center justify-center rounded-lg ${
                    award.result === "won"
                      ? "bg-accent/15 text-accent"
                      : "bg-surface-2 text-muted-foreground"
                  }`}
                >
                  {award.result === "won" ? (
                    <Trophy className="size-5" />
                  ) : (
                    <Medal className="size-5" />
                  )}
                </div>
                <div className="space-y-1">
                  <h3 className="font-heading font-semibold leading-tight">
                    {award.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {award.event} · {award.year}
                  </p>
                  <Badge variant={award.result === "won" ? "accent" : "outline"}>
                    {award.result === "won" ? "Ganado" : "Finalista"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Patrocinadores */}
        <section>
          <SectionHeader
            align="left"
            title="Patrocinadores"
            subtitle="Nada de esto sería posible sin el apoyo de nuestros patrocinadores."
          />
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {sponsors.map((s) => {
              const card = (
                <div className="flex h-28 items-center justify-center rounded-lg border border-border bg-surface/60 p-6 transition-colors hover:border-accent/40">
                  <div className="relative h-full w-full">
                    <SafeImage
                      src={s.logo}
                      alt={s.name}
                      fill
                      sizes="200px"
                      className="object-contain"
                    />
                  </div>
                </div>
              );
              return s.url ? (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                >
                  {card}
                </a>
              ) : (
                <div key={s.name}>{card}</div>
              );
            })}
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
