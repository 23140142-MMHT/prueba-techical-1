"use client";

import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ChatMessageData {
  role: "user" | "assistant";
  content: string;
}

/** Mensaje individual del chat (usuario o asistente). */
export function ChatMessage({ role, content }: ChatMessageData) {
  const isUser = role === "user";
  return (
    <div className={cn("flex gap-3", isUser && "flex-row-reverse")}>
      <div
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-full",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-accent/15 text-accent",
        )}
        aria-hidden
      >
        {isUser ? <User className="size-4" /> : <Bot className="size-4" />}
      </div>
      <div
        className={cn(
          "max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
          isUser
            ? "rounded-tr-sm bg-primary text-primary-foreground"
            : "rounded-tl-sm bg-surface-2 text-foreground/90",
        )}
      >
        {content || (
          // Indicador de "escribiendo" mientras llega el primer token.
          <span className="inline-flex gap-1" aria-label="Escribiendo">
            <span className="size-1.5 animate-pulse-glow rounded-full bg-accent" />
            <span className="size-1.5 animate-pulse-glow rounded-full bg-accent [animation-delay:0.2s]" />
            <span className="size-1.5 animate-pulse-glow rounded-full bg-accent [animation-delay:0.4s]" />
          </span>
        )}
      </div>
    </div>
  );
}
