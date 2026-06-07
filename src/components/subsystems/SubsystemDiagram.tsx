"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * SubsystemDiagram — renderiza un diagrama Mermaid.
 *
 * Mermaid es pesado, así que se importa dinámicamente solo en el cliente y solo
 * cuando este componente se monta (lo dispara un bloque ```mermaid en el MDX).
 */
export function SubsystemDiagram({
  chart,
  className,
}: {
  chart: string;
  className?: string;
}) {
  const id = React.useId().replace(/[:]/g, "");
  const [svg, setSvg] = React.useState<string>("");
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: "dark",
          securityLevel: "strict",
          fontFamily: "var(--font-body), system-ui, sans-serif",
          themeVariables: {
            primaryColor: "#0D1421",
            primaryBorderColor: "#00CCFF",
            primaryTextColor: "#E2E8F0",
            lineColor: "#64748B",
            fontSize: "15px",
          },
        });
        const { svg: rendered } = await mermaid.render(`mmd-${id}`, chart.trim());
        if (!cancelled) setSvg(rendered);
      } catch {
        if (!cancelled) setError(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [chart, id]);

  if (error) {
    return (
      <pre className="overflow-x-auto rounded-lg border border-border bg-surface p-4 text-sm text-muted-foreground">
        {chart}
      </pre>
    );
  }

  return (
    <div
      className={cn(
        "my-6 flex justify-center overflow-x-auto rounded-lg border border-border bg-surface/60 p-4 [&_svg]:max-w-full",
        className,
      )}
      // El SVG lo genera Mermaid en cliente; contenido controlado por nosotros.
      dangerouslySetInnerHTML={{ __html: svg }}
      aria-label="Diagrama del subsistema"
      role="img"
    />
  );
}
