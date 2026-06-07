// lucide-react v1 quitó los iconos de marca; usamos un icono de enlace genérico.
import { Link2 } from "lucide-react";

import type { TeamMember } from "@/types/team";
import { getInitials } from "@/lib/utils";
import { SafeImage } from "@/components/shared/SafeImage";
import { Badge } from "@/components/ui/badge";

/**
 * Card de un miembro del equipo. Si no hay foto, genera un avatar con iniciales.
 */
export function MemberCard({ member }: { member: TeamMember }) {
  return (
    <div className="card-surface group flex flex-col items-center gap-3 p-5 text-center transition-colors hover:border-accent/40">
      <div className="relative size-24 overflow-hidden rounded-full border border-border">
        {member.photo ? (
          <SafeImage
            src={member.photo}
            alt={member.name}
            fill
            sizes="96px"
            className="object-cover"
          />
        ) : (
          <div className="flex size-full items-center justify-center bg-gradient-to-br from-primary to-accent font-heading text-2xl font-bold text-white">
            {getInitials(member.name)}
          </div>
        )}
      </div>

      <div>
        <h3 className="font-heading font-semibold">{member.name}</h3>
        <p className="text-sm text-muted-foreground">{member.role}</p>
      </div>

      <Badge variant="outline">{member.subteam}</Badge>

      {member.linkedin && (
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`LinkedIn de ${member.name}`}
          className="text-muted-foreground transition-colors hover:text-accent"
        >
          <Link2 className="size-4" />
        </a>
      )}
    </div>
  );
}
