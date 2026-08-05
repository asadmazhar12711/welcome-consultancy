import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/JsonLd";
import { ILLUSTRATIONS } from "@/lib/illustrations";
import { getDB, type BlogRow } from "@/lib/db";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  buildMetadata,
  type RobotsDirective,
} from "@/lib/seo";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

const BLOG_ART = ["dgft", "rodtep", "epcg", "compliance", "iec", "aeo"] as const;

function formatDate(value: string | null): string {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

async function getPost(slug: string): Promise<BlogRow | null> {
  try {
    const db = await getDB();
    return (
      (await db
        .prepare(
          "SELECT * FROM blog_posts WHERE slug = ? AND status = 'Published' LIMIT 1",
        )
        .bind(slug)
        .first<BlogRow>()) ?? null
    );
  } catch {
    return null;
  }
}

function artForSlug(slug: string) {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) hash = (hash + slug.charCodeAt(i)) % BLOG_ART.length;
  return ILLUSTRATIONS.services[BLOG_ART[hash]];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Article not found", robots: { index: false, follow: false } };

  const robots = (post.meta_robots || "index, follow") as RobotsDirective;

  return buildMetadata({
    title: post.seo_title || post.title,
    description: post.meta_description || post.excerpt.slice(0, 160),
    path: `/blogs/${post.slug}`,
    canonical: post.canonical_url || undefined,
    robots,
    ogTitle: post.og_title || undefined,
    ogDescription: post.og_description || undefined,
    ogImage: post.og_image || undefined,
    twitterTitle: post.twitter_title || undefined,
    twitterDescription: post.twitter_description || undefined,
    twitterImage: post.twitter_image || undefined,
    type: "article",
    keywords: [post.category, "DGFT", "EXIM", post.title],
  });
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const art = artForSlug(post.slug);
  const body = (post.body || post.excerpt).trim();
  const paragraphs = body.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);

  return (
    <>
      <JsonLd
        data={[
          articleJsonLd({
            title: post.title,
            description: post.meta_description || post.excerpt,
            path: `/blogs/${post.slug}`,
            publishedAt: post.published_at,
            modifiedAt: post.updated_at,
            image: post.og_image || art.src,
            category: post.category,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blogs" },
            { name: post.title, path: `/blogs/${post.slug}` },
          ]),
        ]}
      />

      <article className="min-h-screen bg-page">
        <section className="relative isolate min-h-[50vh] overflow-hidden">
          <Image
            src={art.src}
            alt={post.image_alt || art.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="hero-visual__scrim" aria-hidden />
          <div className="container-site relative z-10 flex min-h-[50vh] flex-col justify-end pb-14 pt-28 md:pb-20">
            <Link
              href="/blogs"
              className="mb-4 inline-flex min-h-11 w-fit items-center text-sm font-bold text-[#D4AF37] transition-colors hover:text-white"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> All articles
            </Link>
            <p className="eyebrow !text-[#D4AF37]">{post.category}</p>
            <h1 className="display-title mt-2 max-w-4xl text-4xl !text-white md:text-5xl lg:text-6xl">
              {post.title}
            </h1>
            {post.published_at ? (
              <p className="mt-4 text-sm font-medium text-slate-300">
                <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>
              </p>
            ) : null}
          </div>
        </section>

        <section className="section-pad !pt-12">
          <div className="container-site max-w-3xl">
            <p className="text-lg font-medium leading-relaxed text-theme-secondary">
              {post.excerpt}
            </p>
            <div className="mt-10 space-y-6 border-t border-subtle pt-10">
              {paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 48)}
                  className="text-base font-medium leading-relaxed text-theme-muted"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-14 flex flex-wrap items-center gap-4 border-t border-subtle pt-10">
              <Button asChild>
                <Link href="/contact-us">
                  Discuss with desk <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/blogs">More regulatory updates</Link>
              </Button>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
