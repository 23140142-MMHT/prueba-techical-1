# 🤖 FRC Technical Binder

Technical Binder web para equipos de FIRST Robotics Competition. Construido con
Next.js 16, TypeScript, Tailwind CSS v3 y un chatbot AI (Anthropic). Dark-mode
first, responsive (móvil / iPad / desktop) y editable sin tocar código.

> Los datos de ejemplo son del **team 4414 (HighTide)**. Reemplázalos con los de
> tu equipo siguiendo esta guía.

## 🚀 Arrancar

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de producción (debe pasar limpio)
```

## ✏️ Qué editar TÚ (sin tocar componentes)

| Archivo | Qué contiene |
|---|---|
| `content/config.ts` | **EMPIEZA AQUÍ.** Número, nombre, robot, colores, video reveal, redes, stats. |
| `content/robot/overview.mdx` | Descripción general del robot, ficha técnica y estrategia. |
| `content/subsystems/*.mdx` | Drivetrain, shooter, intake, climber: specs, diseño, diagramas. |
| `content/software/*.mdx` | Autónomo, visión y scouting. |
| `content/iterations/iterations.ts` | Versiones del robot para el slider de comparación. |
| `content/team/members.ts` | Miembros del equipo. |
| `content/team/sponsors.ts` | Patrocinadores. |
| `content/awards/awards.ts` | Premios y logros. |

Los colores del equipo (`primaryColor`, `accentColor` en `config.ts`) alimentan
todo el tema automáticamente.

## 🖼️ Imágenes que conseguir (carpeta → contenido)

| Carpeta | Qué meter |
|---|---|
| `public/robot/v1/`, `v2/`, `v3/` | Fotos del robot por versión (mismo encuadre para el slider). |
| `public/subsystems/{drivetrain,shooter,intake,climber}/` | Fotos/diagramas de cada subsistema. |
| `public/team/logo.svg` | Logo del equipo (SVG preferido). |
| `public/team/banner.jpg` | Banner del equipo (1920×600, usado en OG). |
| `public/team/members/` | Fotos de miembros, cuadradas 400×400 (opcional; sin foto se genera avatar). |
| `public/sponsors/` | Logos (SVG o PNG transparente, ≥400px, nombre en minúsculas). |
| `public/software/scouting-dashboard.png` | Screenshot de tu app de scouting. |

> Mientras no subas las fotos, el binder muestra placeholders elegantes en su lugar.

## 🔑 Variables de entorno (`.env.local`)

```bash
ANTHROPIC_API_KEY=sk-ant-...   # activa el chatbot (console.anthropic.com)
NEXT_PUBLIC_TEAM_NUMBER=4414
NEXT_PUBLIC_SEASON=2026
TBA_API_KEY=                   # opcional (The Blue Alliance)
```

El chatbot funciona sin la key, pero responderá que no está configurado hasta que
la agregues.

## ☁️ Deploy (Vercel)

Importa el repo en Vercel, agrega `ANTHROPIC_API_KEY` en *Environment Variables*
y listo. El proyecto está optimizado para Vercel (next/image, SSG, runtime Node
para el chat).
