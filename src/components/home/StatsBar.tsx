import { Trophy, TrendingUp, CalendarDays, Swords } from "lucide-react";
import { teamConfig } from "@content/config";

/**
 * Barra de métricas del equipo. Server component: lee los datos de config.ts.
 */
export function StatsBar() {
  const { stats, founded, season } = teamConfig;
  const items = [
    { label: "Récord", value: stats.record, Icon: Swords },
    { label: "Ranking", value: stats.ranking, Icon: TrendingUp },
    { label: "Premios", value: String(stats.awards), Icon: Trophy },
    {
      label: "Temporadas",
      value: String(season - founded + 1),
      Icon: CalendarDays,
    },
  ];

  return (
    <section className="border-y border-border bg-surface/40">
      <div className="container-binder grid grid-cols-2 gap-px overflow-hidden lg:grid-cols-4">
        {items.map(({ label, value, Icon }) => (
          <div
            key={label}
            className="flex items-center gap-4 px-6 py-8"
          >
            <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <Icon className="size-6" />
            </div>
            <div>
              <p className="font-heading text-3xl font-bold leading-none">{value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
