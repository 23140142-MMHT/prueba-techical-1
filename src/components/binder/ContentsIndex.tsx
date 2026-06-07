import Link from "next/link";

/**
 * Índice "Contents" estilo team4414.com: categorías + filas numeradas, cada una
 * es un anchor link que hace scroll a la sección correspondiente en la página.
 */
export interface ContentsItem {
  /** Número mostrado (ej. "01") */
  number: string;
  /** id del ancla destino (sin "#") */
  id: string;
  title: string;
}
export interface ContentsCategory {
  label: string;
  items: ContentsItem[];
}

export function ContentsIndex({
  categories,
}: {
  categories: ContentsCategory[];
}) {
  return (
    <section id="contents" className="scroll-mt-24">
      {/* Encabezado */}
      <div className="flex items-end justify-between border-b border-border pb-4">
        <h2 className="text-4xl font-bold sm:text-5xl">Contents</h2>
        <span className="text-xs font-semibold uppercase tracking-widest text-accent">
          Index
        </span>
      </div>

      <div className="mt-8 space-y-10">
        {categories.map((cat) => (
          <div key={cat.label}>
            <h3 className="mb-1 text-xs font-bold uppercase tracking-widest text-accent">
              {cat.label}
            </h3>
            <ul>
              {cat.items.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`#${item.id}`}
                    className="group flex items-center gap-6 border-b border-border py-4 transition-colors hover:bg-surface/40"
                  >
                    <span className="w-6 shrink-0 font-mono text-sm text-muted-foreground">
                      {item.number}
                    </span>
                    <span className="font-heading text-lg font-semibold text-foreground transition-colors group-hover:text-accent">
                      {item.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
