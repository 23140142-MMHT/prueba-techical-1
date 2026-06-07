import * as React from "react";
import Link from "next/link";
import { SubsystemDiagram } from "@/components/subsystems/SubsystemDiagram";

/**
 * Componentes custom para renderizar MDX con el estilo del binder.
 *
 * - Tipografía (h1-h3, p, listas) estilizada acorde al tema oscuro.
 * - Tablas estilizadas (requiere remark-gfm, ya configurado en lib/mdx.ts).
 * - Callouts: los blockquotes (>) se renderizan como cajas de aviso.
 * - Bloques ```mermaid se renderizan como diagramas (ver <Pre>).
 */

// Extrae el texto plano de un árbol de nodos (para leer el código de un <pre>).
function extractText(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (React.isValidElement(node)) {
    return extractText(
      (node.props as { children?: React.ReactNode }).children,
    );
  }
  return "";
}

// <pre>: detecta bloques mermaid y los renderiza como diagrama; el resto, como código.
function Pre({ children }: { children?: React.ReactNode }) {
  if (React.isValidElement(children)) {
    const child = children as React.ReactElement<{
      className?: string;
      children?: React.ReactNode;
    }>;
    const className = child.props.className ?? "";
    if (className.includes("language-mermaid")) {
      return <SubsystemDiagram chart={extractText(child.props.children)} />;
    }
  }
  return (
    <pre className="my-5 overflow-x-auto rounded-lg border border-border bg-surface p-4 font-mono text-sm leading-relaxed">
      {children}
    </pre>
  );
}

export const mdxComponents = {
  h1: (props: React.ComponentProps<"h1">) => (
    <h1 className="mb-4 mt-8 text-3xl font-bold first:mt-0" {...props} />
  ),
  h2: (props: React.ComponentProps<"h2">) => (
    <h2
      className="mb-3 mt-10 border-l-2 border-accent pl-3 text-2xl font-bold"
      {...props}
    />
  ),
  h3: (props: React.ComponentProps<"h3">) => (
    <h3 className="mb-2 mt-6 text-xl font-semibold" {...props} />
  ),
  p: (props: React.ComponentProps<"p">) => (
    <p className="my-4 leading-relaxed text-foreground/90" {...props} />
  ),
  a: ({ href = "#", ...props }: React.ComponentProps<"a">) => {
    const isInternal = href.startsWith("/");
    if (isInternal) {
      return (
        <Link
          href={href}
          className="font-medium text-accent underline-offset-4 hover:underline"
          {...props}
        />
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-accent underline-offset-4 hover:underline"
        {...props}
      />
    );
  },
  ul: (props: React.ComponentProps<"ul">) => (
    <ul className="my-4 list-disc space-y-1.5 pl-6 text-foreground/90" {...props} />
  ),
  ol: (props: React.ComponentProps<"ol">) => (
    <ol className="my-4 list-decimal space-y-1.5 pl-6 text-foreground/90" {...props} />
  ),
  li: (props: React.ComponentProps<"li">) => <li className="pl-1" {...props} />,
  blockquote: (props: React.ComponentProps<"blockquote">) => (
    <blockquote
      className="my-5 rounded-r-lg border-l-4 border-accent bg-accent/5 px-5 py-3 text-foreground/90 [&>p]:my-1"
      {...props}
    />
  ),
  hr: () => <hr className="my-8 border-border" />,
  strong: (props: React.ComponentProps<"strong">) => (
    <strong className="font-semibold text-foreground" {...props} />
  ),
  table: (props: React.ComponentProps<"table">) => (
    <div className="my-6 overflow-x-auto rounded-lg border border-border">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  thead: (props: React.ComponentProps<"thead">) => (
    <thead className="bg-surface-2" {...props} />
  ),
  th: (props: React.ComponentProps<"th">) => (
    <th
      className="border-b border-border px-4 py-2.5 text-left font-semibold"
      {...props}
    />
  ),
  td: (props: React.ComponentProps<"td">) => (
    <td className="border-b border-border px-4 py-2.5 text-foreground/90" {...props} />
  ),
  // Código inline (los bloques pasan por <Pre>).
  code: (props: React.ComponentProps<"code">) => {
    const isBlock = (props.className ?? "").includes("language-");
    if (isBlock) return <code {...props} />;
    return (
      <code
        className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-sm text-accent"
        {...props}
      />
    );
  },
  pre: Pre,
};
