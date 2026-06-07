import Link from "next/link";
import { teamConfig } from "@content/config";
import { cn } from "@/lib/utils";

/**
 * Badge de identidad del equipo: número + nombre, con degradado de marca.
 * Se usa como "logo" en la NavBar y el Footer.
 */
export function TeamBadge({
  className,
  asLink = true,
}: {
  className?: string;
  asLink?: boolean;
}) {
  const content = (
    <span className={cn("group inline-flex items-center gap-2.5", className)}>
      <span className="flex size-9 items-center justify-center rounded-md bg-gradient-to-br from-primary to-accent text-sm font-bold text-white shadow-glow-sm">
        {teamConfig.number.toString().slice(0, 2)}
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-heading text-sm font-bold tracking-tight">
          Team {teamConfig.number}
        </span>
        <span className="text-xs text-muted-foreground">{teamConfig.name}</span>
      </span>
    </span>
  );

  if (!asLink) return content;
  return (
    <Link href="/" aria-label={`Team ${teamConfig.number} ${teamConfig.name} — inicio`}>
      {content}
    </Link>
  );
}
