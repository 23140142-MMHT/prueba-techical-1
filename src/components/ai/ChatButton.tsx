"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Bot } from "lucide-react";

import { ChatDrawer } from "./ChatDrawer";

/**
 * FAB flotante que abre el chatbot AI. Vive en el layout, así que está
 * disponible en todas las páginas del binder.
 */
export function ChatButton() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Abrir asistente técnico"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="fixed bottom-5 right-5 z-50 flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-white shadow-glow"
      >
        <Bot className="size-6" />
        {/* Punto pulsante de "en línea" */}
        <span className="absolute right-1 top-1 size-3 rounded-full border-2 border-background bg-green-400" />
      </motion.button>

      <ChatDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}
