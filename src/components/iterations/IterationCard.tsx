import { Check } from "lucide-react";
import type { Iteration } from "@/types/iteration";
import { Badge } from "@/components/ui/badge";

/**
 * Card con la descripción y la lista de cambios de una iteración.
 */
export function IterationCard({ iteration }: { iteration: Iteration }) {
  return (
    <div className="card-surface flex flex-col gap-5 p-6">
      <div className="flex items-center gap-3">
        <Badge variant="accent">{iteration.date}</Badge>
        <h3 className="font-heading text-xl font-bold">{iteration.label}</h3>
      </div>

      <p className="text-muted-foreground">{iteration.description}</p>

      <div>
        <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Cambios clave
        </h4>
        <ul className="space-y-2.5">
          {iteration.changes.map((change, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm">
              <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                <Check className="size-3" />
              </span>
              <span className="text-foreground/90">{change}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
