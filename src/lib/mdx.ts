import "server-only";
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

import { mdxComponents } from "@/components/shared/MDXComponents";
import type {
  SubsystemFrontmatter,
  SubsystemImage,
  SubsystemFeature,
  Spec,
} from "@/types/subsystem";

// Carpeta raíz del contenido editable del equipo.
const CONTENT_DIR = path.join(process.cwd(), "content");

// Opciones de MDX compartidas (GFM habilita tablas, tachado, etc.).
const mdxOptions = {
  parseFrontmatter: true,
  mdxOptions: {
    remarkPlugins: [remarkGfm],
  },
};

/**
 * Lee y COMPILA un archivo MDX genérico (robot/overview, software/*, team/about).
 * Devuelve el contenido renderizable + su frontmatter tipado.
 */
export async function readMdxDoc<TFrontmatter extends Record<string, unknown>>(
  relativePath: string,
) {
  const filePath = path.join(CONTENT_DIR, relativePath);
  const source = await fs.readFile(filePath, "utf-8");
  const { content, frontmatter } = await compileMDX<TFrontmatter>({
    source,
    components: mdxComponents,
    options: mdxOptions,
  });
  return { content, frontmatter };
}

/** Lista los slugs de todos los subsistemas (nombres de archivo sin extensión). */
export async function listSubsystemSlugs(): Promise<string[]> {
  const dir = path.join(CONTENT_DIR, "subsystems");
  const files = await fs.readdir(dir);
  return files
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

/**
 * Solo el frontmatter de un subsistema (sin compilar el cuerpo).
 * Útil para el índice de subsistemas y los previews del home.
 */
export async function getSubsystemMeta(
  slug: string,
): Promise<SubsystemFrontmatter & { rawContent: string }> {
  const filePath = path.join(CONTENT_DIR, "subsystems", `${slug}.mdx`);
  const source = await fs.readFile(filePath, "utf-8");
  const { data, content } = matter(source);
  const fm = data as Partial<SubsystemFrontmatter>;
  return {
    title: fm.title ?? slug,
    slug: fm.slug ?? slug,
    icon: fm.icon ?? "cog",
    category: fm.category ?? "mechanical",
    summary: fm.summary ?? "",
    specs: (fm.specs as Spec[]) ?? [],
    images: (fm.images as SubsystemImage[]) ?? [],
    features: (fm.features as SubsystemFeature[]) ?? [],
    rawContent: content,
  };
}

/** Frontmatter de TODOS los subsistemas (para índices y previews). */
export async function getAllSubsystemMeta() {
  const slugs = await listSubsystemSlugs();
  return Promise.all(slugs.map((slug) => getSubsystemMeta(slug)));
}

/**
 * Página completa de un subsistema: frontmatter tipado + cuerpo MDX compilado.
 * Devuelve null si el subsistema no existe (para disparar notFound()).
 */
export async function getSubsystemPage(slug: string) {
  try {
    const filePath = path.join(CONTENT_DIR, "subsystems", `${slug}.mdx`);
    const source = await fs.readFile(filePath, "utf-8");
    const { content, frontmatter } = await compileMDX<SubsystemFrontmatter>({
      source,
      components: mdxComponents,
      options: mdxOptions,
    });
    return { content, frontmatter };
  } catch {
    return null;
  }
}
