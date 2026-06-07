import {
  Cog,
  Target,
  Download,
  MoveUp,
  Route,
  ScanEye,
  ClipboardList,
  Gauge,
  Wrench,
  Crosshair,
  ArrowLeftRight,
  type LucideIcon as LucideIconType,
} from "lucide-react";

/**
 * Mapa de nombres (los que el equipo escribe en el frontmatter `icon:`) a
 * componentes de Lucide. Si agregas un subsistema con otro icono, añádelo aquí.
 */
const ICON_MAP: Record<string, LucideIconType> = {
  cog: Cog,
  target: Target,
  download: Download,
  "move-up": MoveUp,
  route: Route,
  "scan-eye": ScanEye,
  "clipboard-list": ClipboardList,
  gauge: Gauge,
  wrench: Wrench,
  crosshair: Crosshair,
  "arrow-left-right": ArrowLeftRight,
};

/** Renderiza un icono de Lucide a partir de su nombre (string del frontmatter). */
export function LucideIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = ICON_MAP[name] ?? Cog;
  return <Icon className={className} aria-hidden />;
}
