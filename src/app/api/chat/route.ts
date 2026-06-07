import { anthropic, CHAT_MODEL, MAX_TOKENS, buildSystemPrompt } from "@/lib/ai";
import { getAllSubsystemMeta } from "@/lib/mdx";
import { teamConfig } from "@content/config";

// Necesita el runtime de Node (lee archivos MDX para construir el contexto).
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface IncomingMessage {
  role: "user" | "assistant";
  content: string;
}

/** Construye el contexto técnico que se inyecta al system prompt del asistente. */
async function buildTechnicalContext(): Promise<string> {
  const subsystems = await getAllSubsystemMeta();

  const subsystemBlocks = subsystems
    .map((s) => {
      const specs = s.specs
        .map((spec) => `  - ${spec.label}: ${spec.value}`)
        .join("\n");
      return `### ${s.title}\n${s.summary}\nSpecs:\n${specs}`;
    })
    .join("\n\n");

  const stats = teamConfig.stats;
  return `Equipo: FRC ${teamConfig.number} ${teamConfig.name} (${teamConfig.location}, fundado ${teamConfig.founded}).
Robot: ${teamConfig.robotName} — temporada ${teamConfig.season} (${teamConfig.gameName}).
Récord: ${stats.record} · Ranking: ${stats.ranking} · Premios: ${stats.awards}.

SUBSISTEMAS:
${subsystemBlocks}`;
}

/** Devuelve un stream de texto plano con un único mensaje (para errores amigables). */
function textStream(message: string): Response {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(message));
      controller.close();
    },
  });
  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

export async function POST(req: Request) {
  // Si no hay API key, respondemos con un mensaje claro (sin romper la UI).
  if (!process.env.ANTHROPIC_API_KEY) {
    return textStream(
      "El asistente AI aún no está configurado. Agrega ANTHROPIC_API_KEY en .env.local para activarlo.",
    );
  }

  let messages: IncomingMessage[] = [];
  try {
    const body = (await req.json()) as { messages?: IncomingMessage[] };
    messages = (body.messages ?? [])
      .filter((m) => m.role === "user" || m.role === "assistant")
      .map((m) => ({ role: m.role, content: String(m.content) }));
  } catch {
    return textStream("No pude leer tu mensaje. Intenta de nuevo.");
  }

  if (messages.length === 0) {
    return textStream("Escríbeme una pregunta sobre el robot. 🤖");
  }

  const system = buildSystemPrompt(await buildTechnicalContext());

  const anthropicStream = await anthropic.messages.create({
    model: CHAT_MODEL,
    max_tokens: MAX_TOKENS,
    system,
    messages,
    stream: true,
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const event of anthropicStream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
      } catch {
        controller.enqueue(
          encoder.encode("\n\n(Se interrumpió la respuesta del asistente.)"),
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
    },
  });
}
