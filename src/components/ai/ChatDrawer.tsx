"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Send, X } from "lucide-react";

import { teamConfig } from "@content/config";
import { cn } from "@/lib/utils";
import { ChatMessage, type ChatMessageData } from "./ChatMessage";

// Preguntas sugeridas iniciales.
const SUGGESTIONS = [
  "¿Qué tipo de drivetrain usan?",
  "¿Cómo funciona el intake?",
  "¿Cuál es su estrategia autónoma?",
];

export function ChatDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [messages, setMessages] = React.useState<ChatMessageData[]>([]);
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  // Auto-scroll al último mensaje.
  React.useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMessage: ChatMessageData = { role: "user", content: trimmed };
    const history = [...messages, userMessage];
    // Añadimos el turno del usuario + un placeholder de asistente vacío.
    setMessages([...history, { role: "assistant", content: "" }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });

      if (!res.body) throw new Error("Sin respuesta del servidor");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";

      // Streaming: vamos rellenando el último mensaje (asistente).
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const next = [...prev];
          next[next.length - 1] = { role: "assistant", content: acc };
          return next;
        });
      }
    } catch {
      setMessages((prev) => {
        const next = [...prev];
        next[next.length - 1] = {
          role: "assistant",
          content:
            "Ups, hubo un problema al conectar con el asistente. Intenta de nuevo.",
        };
        return next;
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-background/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            className="fixed bottom-0 right-0 top-0 z-[70] flex w-full max-w-md flex-col border-l border-border bg-surface shadow-2xl"
            role="dialog"
            aria-label="Asistente técnico del equipo"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border p-4">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-full bg-accent/15 text-accent">
                  <Bot className="size-5" />
                </div>
                <div className="leading-tight">
                  <p className="font-heading text-sm font-bold">
                    Asistente {teamConfig.robotName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Team {teamConfig.number} {teamConfig.name}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar chat"
                className="flex size-9 items-center justify-center rounded-md hover:bg-surface-2"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Mensajes */}
            <div
              ref={scrollRef}
              className="flex-1 space-y-4 overflow-y-auto p-4"
            >
              {messages.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                  <div className="flex size-14 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                    <Bot className="size-7" />
                  </div>
                  <p className="max-w-xs text-sm text-muted-foreground">
                    Pregúntame sobre los subsistemas, el software o la estrategia de{" "}
                    {teamConfig.robotName}.
                  </p>
                  <div className="flex flex-col gap-2">
                    {SUGGESTIONS.map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => send(q)}
                        className="rounded-full border border-border px-4 py-2 text-sm text-foreground/80 transition-colors hover:border-accent/60 hover:text-accent"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map((m, i) => <ChatMessage key={i} {...m} />)
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="border-t border-border p-3"
            >
              <div className="flex items-end gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Escribe tu pregunta..."
                  className="h-11 flex-1 rounded-lg border border-border bg-background px-4 text-sm outline-none focus:border-accent/60"
                  aria-label="Mensaje"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  aria-label="Enviar"
                  className={cn(
                    "flex size-11 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-opacity",
                    (loading || !input.trim()) && "opacity-50",
                  )}
                >
                  <Send className="size-5" />
                </button>
              </div>
            </form>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
