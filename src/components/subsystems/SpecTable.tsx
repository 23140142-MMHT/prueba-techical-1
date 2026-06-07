import type { Spec } from "@/types/subsystem";

/**
 * Tabla de especificaciones técnicas estilizada. Server component.
 */
export function SpecTable({ specs }: { specs: Spec[] }) {
  if (specs.length === 0) return null;

  return (
    <dl className="overflow-hidden rounded-lg border border-border">
      {specs.map((spec, i) => (
        <div
          key={spec.label}
          className={`flex items-center justify-between gap-4 px-4 py-3 ${
            i % 2 === 0 ? "bg-surface/60" : "bg-surface/30"
          }`}
        >
          <dt className="text-sm text-muted-foreground">{spec.label}</dt>
          <dd className="text-right font-mono text-sm font-medium text-foreground">
            {spec.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
