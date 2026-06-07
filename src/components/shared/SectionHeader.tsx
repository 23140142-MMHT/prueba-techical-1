import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

/**
 * Encabezado de sección reutilizable: badge opcional + título + subtítulo.
 * Centrado por defecto; pasa align="left" para alinear a la izquierda.
 */
export function SectionHeader({
  badge,
  title,
  subtitle,
  align = "center",
  className,
}: {
  badge?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {badge && (
        <Badge variant="accent" className="uppercase tracking-wider">
          {badge}
        </Badge>
      )}
      <h2 className="text-3xl font-bold sm:text-4xl">{title}</h2>
      {subtitle && (
        <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
