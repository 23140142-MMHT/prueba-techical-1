import Link from "next/link";
import { GitCompareArrows, ArrowRight } from "lucide-react";

import { teamConfig } from "@content/config";
import { getAllSubsystemMeta } from "@/lib/mdx";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsBar } from "@/components/home/StatsBar";
import { SubsystemsPreview } from "@/components/home/SubsystemsPreview";
import { PageTransition } from "@/components/layout/PageTransition";
import { buttonVariants } from "@/components/ui/button";

export default async function Home() {
  const subsystems = await getAllSubsystemMeta();

  return (
    <PageTransition>
      <HeroSection />
      <StatsBar />
      <SubsystemsPreview
        subsystems={subsystems.map((s) => ({
          slug: s.slug,
          title: s.title,
          summary: s.summary,
          icon: s.icon,
        }))}
      />

      {/* CTA hacia el slider de iteraciones (feature estrella) */}
      <section className="container-binder pb-20">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-surface to-surface-2 p-8 sm:p-12">
          <div className="absolute inset-0 -z-10 bg-grid opacity-40" aria-hidden />
          <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl space-y-3">
              <div className="chip">
                <GitCompareArrows className="size-3.5" /> Diseño iterativo
              </div>
              <h2 className="text-3xl font-bold sm:text-4xl">
                Mira cómo evolucionó {teamConfig.robotName}
              </h2>
              <p className="text-muted-foreground">
                Compara las versiones del robot lado a lado y descubre las
                decisiones de ingeniería detrás de cada cambio.
              </p>
            </div>
            <Link
              href="/iterations"
              className={buttonVariants({ variant: "accent", size: "lg" })}
            >
              Ver iteraciones <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
