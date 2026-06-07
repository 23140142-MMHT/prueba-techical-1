"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play, Boxes } from "lucide-react";

import { teamConfig } from "@content/config";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

/**
 * Hero de la landing: video reveal + nombre del robot + stats + CTAs.
 * El video usa una "facade" (miniatura) y solo carga el iframe al hacer click,
 * para no penalizar el LCP de la página.
 */
export function HeroSection() {
  const [playing, setPlaying] = React.useState(false);
  const { stats } = teamConfig;

  const heroStats = [
    { label: "Récord", value: stats.record },
    { label: "Ranking", value: stats.ranking },
    { label: "Premios", value: String(stats.awards) },
  ];

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-grid" aria-hidden />
      <div className="container-binder grid gap-12 py-16 lg:grid-cols-2 lg:items-center lg:py-24">
        {/* Columna de texto */}
        <div className="flex flex-col items-start gap-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="accent" className="uppercase tracking-wider">
              Temporada {teamConfig.season} · {teamConfig.gameName}
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-5xl font-bold leading-[0.95] sm:text-6xl lg:text-7xl"
          >
            <span className="block text-muted-foreground/70 text-2xl font-medium sm:text-3xl">
              Conoce a
            </span>
            <span className="text-gradient">{teamConfig.robotName}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="max-w-md text-lg text-muted-foreground"
          >
            {teamConfig.tagline} El robot del equipo {teamConfig.number}{" "}
            {teamConfig.name} para {teamConfig.gameName}.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-wrap gap-3"
          >
            <Link
              href="/robot"
              className={buttonVariants({ variant: "accent", size: "lg" })}
            >
              Ver el robot <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/subsystems"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              <Boxes className="size-4" /> Explorar subsistemas
            </Link>
          </motion.div>

          {/* Stats clave */}
          <motion.dl
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-2 grid w-full max-w-md grid-cols-3 gap-4"
          >
            {heroStats.map((s) => (
              <div key={s.label} className="card-surface px-4 py-3 text-center">
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                  {s.label}
                </dt>
                <dd className="mt-1 font-heading text-2xl font-bold text-accent">
                  {s.value}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Columna de video */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-surface shadow-glow"
        >
          {playing ? (
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${teamConfig.youtubeRevealId}?autoplay=1&rel=0`}
              title={`Reveal de ${teamConfig.robotName}`}
              allow="accelerator; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              className="group absolute inset-0 flex items-center justify-center"
              aria-label={`Reproducir reveal de ${teamConfig.robotName}`}
            >
              {/* Miniatura de YouTube (facade, sin next/image para evitar config remota) */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://i.ytimg.com/vi/${teamConfig.youtubeRevealId}/hqdefault.jpg`}
                alt={`Reveal de ${teamConfig.robotName}`}
                className="absolute inset-0 h-full w-full object-cover opacity-70 transition-opacity group-hover:opacity-90"
                loading="eager"
              />
              <span className="relative flex size-16 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-glow transition-transform group-hover:scale-110">
                <Play className="size-7 translate-x-0.5 fill-current" />
              </span>
            </button>
          )}
        </motion.div>
      </div>
    </section>
  );
}
