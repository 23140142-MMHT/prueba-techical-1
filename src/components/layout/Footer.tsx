import Link from "next/link";
// lucide-react v1 quitó los iconos de marca; usamos genéricos equivalentes.
import { Camera, Video, Code2, Globe } from "lucide-react";

import { teamConfig } from "@content/config";
import { sponsors } from "@content/team/sponsors";
import { TeamBadge } from "@/components/shared/TeamBadge";
import { Separator } from "@/components/ui/separator";

const SOCIALS = [
  { href: teamConfig.socialLinks.instagram, label: "Instagram", Icon: Camera },
  { href: teamConfig.socialLinks.youtube, label: "YouTube", Icon: Video },
  { href: teamConfig.socialLinks.github, label: "GitHub", Icon: Code2 },
  { href: teamConfig.socialLinks.website, label: "Sitio web", Icon: Globe },
];

const FOOTER_LINKS = [
  { href: "/robot", label: "Robot" },
  { href: "/subsystems", label: "Subsistemas" },
  { href: "/iterations", label: "Iteraciones" },
  { href: "/software", label: "Software" },
  { href: "/team", label: "Equipo" },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-surface/40">
      <div className="container-binder py-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Identidad */}
          <div className="max-w-sm space-y-4">
            <TeamBadge asLink={false} />
            <p className="text-sm text-muted-foreground">
              Technical Binder de {teamConfig.robotName} — temporada{" "}
              {teamConfig.season} ({teamConfig.gameName}). {teamConfig.location}.
            </p>
            <div className="flex gap-2">
              {SOCIALS.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-10 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-accent/60 hover:text-accent"
                >
                  <Icon className="size-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navegación */}
          <nav className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Navegación
            </h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground/80 transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Sponsors (mini) */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Patrocinadores
            </h3>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
              {sponsors.slice(0, 6).map((s) => (
                <li key={s.name} className="text-sm text-foreground/70">
                  {s.name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-2 text-xs text-muted-foreground sm:flex-row">
          <p>
            © {teamConfig.season} Team {teamConfig.number} {teamConfig.name}. Hecho
            con FIRST ♥.
          </p>
          <p>
            Fundado en {teamConfig.founded} · {teamConfig.location}
          </p>
        </div>
      </div>
    </footer>
  );
}
