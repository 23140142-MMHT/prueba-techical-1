import type { TeamMember } from "@/types/team";

/**
 * MIEMBROS DEL EQUIPO.
 *
 * Fotos (opcional) en public/team/members/nombre-apellido.jpg (400x400px, cuadradas).
 * Si un miembro no tiene foto, se genera un avatar con sus iniciales.
 *
 * TODO: reemplazar con los miembros reales de tu equipo.
 */
export const members: TeamMember[] = [
  {
    name: "Jane Smith",
    role: "Lead Mechanical",
    subteam: "Mechanical",
    photo: "/team/members/jane-smith.jpg",
    linkedin: "https://linkedin.com/in/janesmith",
  },
  {
    name: "Marcus Lee",
    role: "Lead Software",
    subteam: "Software",
  },
  {
    name: "Priya Patel",
    role: "Electrical Lead",
    subteam: "Electrical",
  },
  {
    name: "Diego Ramírez",
    role: "Drive Coach",
    subteam: "Strategy",
  },
  {
    name: "Emma Johnson",
    role: "Business & Outreach",
    subteam: "Business",
  },
  {
    name: "Liam O'Connor",
    role: "CAD & Design",
    subteam: "Mechanical",
  },
  // Agrega todos los miembros aquí.
];
