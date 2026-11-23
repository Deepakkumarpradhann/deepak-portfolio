import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Github } from "lucide-react";
import { categoryLabels, getProject, projects } from "@/data/projects";
import { ProjectThumb } from "@/components/ProjectThumb";
import { ProjectDemo } from "@/components/ProjectDemo";
import { TransitionLink } from "@/components/TransitionLink";
import { Footer } from "@/components/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Reveal } from "@/components/Reveal";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.summary,
    openGraph: { title: project.title, description: project.summary, type: "article" },
  };
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <TransitionLink
            href="/#projects"
            className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition hover:text-cyan"
          >
            <ArrowLeft size={16} aria-hidden /> All projects
          </TransitionLink>
          <ThemeToggle />
        </div>
      </header>

      <main id="main" className="px-4 pb-24 pt-28">
        <article className="mx-auto max-w-5xl">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan">
              {categoryLabels[project.category]}
            </p>
            <h1 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-6xl">
              <span className="text-gradient">{project.title}</span>
            </h1>
            <p className="mt-5 max-w-3xl text-lg text-muted">{project.description}</p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-amber-400">
                Demo project · sample data
              </span>
              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-1.5 text-sm transition hover:border-cyan hover:text-cyan"
                >
                  <Github size={16} aria-hidden /> View source
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
            </div>
          </Reveal>

          <Reveal className="mt-10">
            <ProjectThumb project={project} className="h-64 rounded-3xl md:h-80" />
          </Reveal>

          <div className="mt-14 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
            <Reveal>
              <h2 className="font-display text-2xl font-semibold">Highlights</h2>
              <ul className="mt-5 space-y-4">
                {project.highlights.map((h) => (
                  <li key={h} className="flex gap-3">
                    <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet" />
                    <span className="text-muted">{h}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="font-display text-2xl font-semibold">Tech stack</h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {project.stack.map((t) => (
                  <li key={t} className="glass rounded-lg px-3 py-1.5 font-mono text-sm text-electric">
                    {t}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-muted">
                This is a portfolio project that runs on sample data. My production pipeline work at Aetherrise
                Solutions and Workplace Analytics is described on the home page under Experience.
              </p>
            </Reveal>
          </div>

          <section id="demo" aria-labelledby="demo-title" className="mt-16 scroll-mt-24">
            <h2 id="demo-title" className="mb-5 font-display text-2xl font-semibold">
              Live demo
            </h2>
            <ProjectDemo project={project} />
          </section>

          <nav aria-label="Next project" className="mt-16 border-t border-line/60 pt-8">
            <TransitionLink
              href={`/projects/${next.slug}`}
              className="group flex items-center justify-between gap-4 rounded-2xl p-4 transition hover:bg-fg/5"
            >
              <span>
                <span className="block font-mono text-xs uppercase tracking-widest text-muted">Next project</span>
                <span className="mt-1 block font-display text-xl font-semibold">{next.title}</span>
              </span>
              <ArrowRight className="transition group-hover:translate-x-1 group-hover:text-cyan" aria-hidden />
            </TransitionLink>
          </nav>
        </article>
      </main>
      <Footer />
    </>
  );
}
