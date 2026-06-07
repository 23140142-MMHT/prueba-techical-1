"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Visualizador de rutas autónomas sobre un campo FRC estilizado (SVG).
 * Cada ruta se dibuja con una animación de trazo (framer-motion pathLength).
 *
 * TODO: ajusta las rutas (`d`) y los puntos a tu campo/estrategia reales.
 */
interface AutoRoute {
  id: string;
  name: string;
  /** Path SVG en el viewBox 0 0 540 270 */
  d: string;
  scoring: { action: string; points: number }[];
}

const ROUTES: AutoRoute[] = [
  {
    id: "left",
    name: "Left side",
    d: "M70 60 C 160 40, 240 70, 300 70 S 430 110, 470 90",
    scoring: [
      { action: "Pieza precargada", points: 5 },
      { action: "Pieza de suelo #1", points: 5 },
      { action: "Salir de zona", points: 2 },
    ],
  },
  {
    id: "center",
    name: "Center",
    d: "M70 135 L 260 135 C 320 135, 360 110, 430 135",
    scoring: [
      { action: "Pieza precargada", points: 5 },
      { action: "Pieza central", points: 5 },
      { action: "Pieza central #2", points: 5 },
      { action: "Salir de zona", points: 2 },
    ],
  },
  {
    id: "right",
    name: "Right side",
    d: "M70 210 C 160 230, 240 200, 300 200 S 430 160, 470 180",
    scoring: [
      { action: "Pieza precargada", points: 5 },
      { action: "Pieza de suelo #1", points: 5 },
      { action: "Salir de zona", points: 2 },
    ],
  },
  {
    id: "adaptive",
    name: "Adaptive",
    d: "M70 135 C 180 90, 240 180, 320 135 S 440 90, 480 135",
    scoring: [
      { action: "Pieza precargada", points: 5 },
      { action: "Lectura de alianza", points: 0 },
      { action: "2 piezas adaptativas", points: 10 },
      { action: "Salir de zona", points: 2 },
    ],
  },
];

export function AutoPathVisualizer() {
  const [active, setActive] = React.useState(ROUTES[0].id);
  const route = ROUTES.find((r) => r.id === active) ?? ROUTES[0];
  const total = route.scoring.reduce((sum, s) => sum + s.points, 0);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr] lg:items-start">
      {/* Campo + path */}
      <div className="space-y-4">
        <div className="overflow-hidden rounded-xl border border-border bg-surface p-3">
          <svg
            viewBox="0 0 540 270"
            className="w-full"
            role="img"
            aria-label={`Ruta autónoma: ${route.name}`}
          >
            {/* Suelo del campo */}
            <rect
              x="10"
              y="10"
              width="520"
              height="250"
              rx="8"
              className="fill-background"
              stroke="rgb(var(--border))"
              strokeWidth="2"
            />
            {/* Línea central */}
            <line
              x1="270"
              y1="10"
              x2="270"
              y2="260"
              stroke="rgb(var(--border))"
              strokeWidth="2"
              strokeDasharray="6 6"
            />
            {/* Zonas de alianza */}
            <rect x="10" y="10" width="80" height="250" className="fill-primary/10" />
            <rect x="450" y="10" width="80" height="250" className="fill-accent/10" />

            {/* Path animado (se remonta al cambiar de ruta por el key) */}
            <motion.path
              key={route.id}
              d={route.d}
              fill="none"
              stroke="rgb(var(--accent))"
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.4, ease: "easeInOut" }}
            />
            {/* Punto de inicio */}
            <circle cx="70" cy={route.id === "center" || route.id === "adaptive" ? 135 : route.id === "left" ? 60 : 210} r="7" className="fill-primary" />
          </svg>
        </div>

        {/* Selector de rutas */}
        <div className="flex flex-wrap gap-2">
          {ROUTES.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => setActive(r.id)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                r.id === active
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {r.name}
            </button>
          ))}
        </div>
      </div>

      {/* Tabla de puntos */}
      <div className="card-surface p-5">
        <h3 className="font-heading text-lg font-semibold">{route.name}</h3>
        <p className="mb-4 text-sm text-muted-foreground">Puntos esperados</p>
        <ul className="divide-y divide-border">
          {route.scoring.map((s, i) => (
            <li key={i} className="flex items-center justify-between py-2.5 text-sm">
              <span className="text-foreground/90">{s.action}</span>
              <span className="font-mono font-medium text-accent">+{s.points}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          <span className="font-semibold">Total estimado</span>
          <span className="font-heading text-2xl font-bold text-accent">{total}</span>
        </div>
      </div>
    </div>
  );
}
