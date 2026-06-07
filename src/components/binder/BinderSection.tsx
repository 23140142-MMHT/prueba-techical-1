import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { Spec, SubsystemFeature } from "@/types/subsystem";

/**
 * Lista de "FEATURES" estilo 4414: viñeta principal con punto de acento y
 * sub-viñetas opcionales (guion) debajo.
 */
function FeatureList({ features }: { features: SubsystemFeature[] }) {
  if (features.length === 0) return null;
  return (
    <ul className="space-y-4">
      {features.map((f, i) => (
        <li key={i}>
          <div className="flex items-start gap-3">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
            <span className="text-foreground/90">{f.text}</span>
          </div>
          {f.sub && f.sub.length > 0 && (
            <ul className="ml-6 mt-2 space-y-1.5 border-l border-border pl-4">
              {f.sub.map((s, j) => (
                <li
                  key={j}
                  className="relative text-sm text-muted-foreground before:absolute before:-left-4 before:text-muted-foreground before:content-['–']"
                >
                  {s}
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}

/**
 * Sección de un componente del binder: layout de dos columnas.
 *   Izquierda  = `media` (imagen o modelo/comparación)
 *   Derecha    = eyebrow + título + resumen + FEATURES + specs + link de detalle
 */
export function BinderSection({
  id,
  eyebrow,
  title,
  summary,
  media,
  features = [],
  specs = [],
  detail,
}: {
  id: string;
  eyebrow: string;
  title: string;
  summary: string;
  media: React.ReactNode;
  features?: SubsystemFeature[];
  specs?: Spec[];
  detail?: { href: string; label: string };
}) {
  return (
    <section
      id={id}
      className="scroll-mt-24 grid items-center gap-10 lg:grid-cols-2"
    >
      {/* Columna izquierda: media (con el bumper visible para escala) */}
      <div className="order-1">{media}</div>

      {/* Columna derecha: información */}
      <div className="order-2 flex flex-col gap-5">
        <span className="text-xs font-semibold uppercase tracking-widest text-accent">
          {eyebrow}
        </span>
        <h2 className="text-4xl font-bold sm:text-5xl">{title}.</h2>
        <p className="text-lg text-muted-foreground">{summary}</p>

        {features.length > 0 && (
          <div className="mt-2">
            <h3 className="mb-4 border-b border-border pb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Features
            </h3>
            <FeatureList features={features} />
          </div>
        )}

        {specs.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {specs.map((s) => (
              <span
                key={s.label}
                className="rounded-md border border-border bg-surface/60 px-3 py-1.5 text-xs"
              >
                <span className="text-muted-foreground">{s.label}: </span>
                <span className="font-mono font-medium">{s.value}</span>
              </span>
            ))}
          </div>
        )}

        {detail && (
          <Link
            href={detail.href}
            className="mt-2 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-accent underline-offset-4 hover:underline"
          >
            {detail.label} <ArrowRight className="size-4" />
          </Link>
        )}
      </div>
    </section>
  );
}
