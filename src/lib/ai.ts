import "server-only";
import Anthropic from "@anthropic-ai/sdk";

import { teamConfig } from "@content/config";

/**
 * Cliente y configuración del chatbot AI del binder.
 *
 * Requiere ANTHROPIC_API_KEY en .env.local. Si falta, las rutas que usen esto
 * deben responder con un error claro (ver src/app/api/chat/route.ts).
 */
export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY ?? "",
});

// Modelo del chatbot. claude-sonnet-4-6 es el Sonnet más reciente y capaz.
// (El prompt original sugería un id antiguo; usamos el actual.)
export const CHAT_MODEL = "claude-sonnet-4-6";

export const MAX_TOKENS = 1024;

/**
 * Construye el system prompt del asistente, inyectando la identidad del equipo
 * y un contexto técnico (resúmenes de subsistemas) para que responda con datos
 * reales del robot.
 */
export function buildSystemPrompt(technicalContext: string): string {
  return `Eres el asistente técnico oficial del equipo FRC ${teamConfig.number} ${teamConfig.name}.
Conoces todos los detalles técnicos de su robot ${teamConfig.robotName} de la temporada ${teamConfig.season} (${teamConfig.gameName}).
Puedes responder preguntas sobre subsistemas, decisiones de diseño, software y estrategia de juego.

Reglas:
- Sé conciso, técnico y entusiasta.
- Responde SIEMPRE en el idioma del usuario.
- Básate en el contexto técnico provisto abajo. Si no sabes algo específico,
  di: "Para más detalles, contacta al equipo directamente."
- No inventes especificaciones que no estén en el contexto.

== CONTEXTO TÉCNICO DEL ROBOT ${teamConfig.robotName} ==
${technicalContext}
== FIN DEL CONTEXTO ==`;
}
