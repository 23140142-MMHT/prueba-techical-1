import { Smartphone, WifiOff, BarChart3, Share2 } from "lucide-react";
import { SafeImage } from "@/components/shared/SafeImage";

/**
 * Preview de la app de scouting: mockup + funcionalidades destacadas.
 * Sube screenshots a /public/software/scouting-*.png para reemplazar el mockup.
 */
const FEATURES = [
  {
    Icon: Smartphone,
    title: "UI para tablet",
    text: "Captura rápida por match optimizada para uso en gradas.",
  },
  {
    Icon: WifiOff,
    title: "Offline-first",
    text: "Funciona sin conexión y sincroniza al recuperar señal.",
  },
  {
    Icon: BarChart3,
    title: "Dashboards",
    text: "Rendimiento por equipo y predicción de alianzas.",
  },
  {
    Icon: Share2,
    title: "Exportación",
    text: "A The Blue Alliance y a hojas de cálculo.",
  },
];

export function ScoutingPreview() {
  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
      {/* Mockup */}
      <div className="relative mx-auto aspect-[4/3] w-full max-w-lg overflow-hidden rounded-xl border border-border bg-surface shadow-glow">
        <SafeImage
          src="/software/scouting-dashboard.png"
          alt="Dashboard de la app de scouting"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      {/* Funcionalidades */}
      <ul className="grid gap-4 sm:grid-cols-2">
        {FEATURES.map(({ Icon, title, text }) => (
          <li key={title} className="card-surface flex flex-col gap-2 p-5">
            <div className="flex size-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <Icon className="size-5" />
            </div>
            <h3 className="font-heading font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground">{text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
