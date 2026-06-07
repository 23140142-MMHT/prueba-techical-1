import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  listSubsystemSlugs,
  getSubsystemMeta,
  getSubsystemPage,
} from "@/lib/mdx";
import { SubsystemLayout } from "@/components/subsystems/SubsystemLayout";
import { PageTransition } from "@/components/layout/PageTransition";

// En Next 16 los params de rutas dinámicas son una Promise.
type Params = { params: Promise<{ slug: string }> };

// Pre-genera una página estática por cada subsistema en build.
export async function generateStaticParams() {
  const slugs = await listSubsystemSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  try {
    const meta = await getSubsystemMeta(slug);
    return { title: meta.title, description: meta.summary };
  } catch {
    return { title: "Subsistema" };
  }
}

export default async function SubsystemPage({ params }: Params) {
  const { slug } = await params;
  const data = await getSubsystemPage(slug);
  if (!data) notFound();

  return (
    <PageTransition>
      <SubsystemLayout frontmatter={data.frontmatter}>
        {data.content}
      </SubsystemLayout>
    </PageTransition>
  );
}
