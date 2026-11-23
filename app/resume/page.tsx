import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { site } from "@/data/site";
import { timeline } from "@/data/experience";
import { skillCategories } from "@/data/skills";
import { PrintButton } from "@/components/PrintButton";
import { TransitionLink } from "@/components/TransitionLink";

export const metadata: Metadata = {
  title: "Resume",
  description: `Resume of ${site.name}, Data Engineer.`,
};

/**
 * Print-friendly resume generated from the same data files as the site.
 * "Save as PDF" in the browser's print dialog gives a downloadable PDF.
 * To offer your own PDF instead, put it in /public/resume.pdf and link to it from Hero.tsx.
 */
export default function ResumePage() {
  const work = timeline.filter((t) => t.type === "work");
  const edu = timeline.filter((t) => t.type === "education");

  return (
    <main id="main" className="px-4 py-10">
      <div className="no-print mx-auto mb-8 flex max-w-3xl items-center justify-between">
        <TransitionLink href="/" className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm hover:text-cyan">
          <ArrowLeft size={16} aria-hidden /> Back to portfolio
        </TransitionLink>
        <PrintButton />
      </div>

      <article className="mx-auto max-w-3xl rounded-2xl bg-white p-10 text-slate-900 shadow-2xl print:rounded-none print:p-0 print:shadow-none">
        <header className="border-b border-slate-300 pb-5">
          <h1 className="font-display text-4xl font-bold">{site.name}</h1>
          <p className="mt-1 text-slate-600">Data Engineer · {site.location}</p>
          <p className="mt-2 text-sm text-slate-700">
            {site.email} · {site.phone}
          </p>
        </header>

        <section className="mt-6" aria-labelledby="r-skills">
          <h2 id="r-skills" className="text-sm font-bold uppercase tracking-widest text-slate-500">
            Skills
          </h2>
          <dl className="mt-3 space-y-1.5 text-sm">
            {skillCategories.map((c) => (
              <div key={c.id} className="flex gap-2">
                <dt className="w-40 shrink-0 font-semibold">{c.label}</dt>
                <dd className="text-slate-700">{c.skills.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-6" aria-labelledby="r-exp">
          <h2 id="r-exp" className="text-sm font-bold uppercase tracking-widest text-slate-500">
            Experience
          </h2>
          {work.map((t) => (
            <div key={t.id} className="mt-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-semibold">
                  {t.title}, {t.org}
                </h3>
                <p className="text-sm text-slate-600">{t.period}</p>
              </div>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                {t.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="mt-6" aria-labelledby="r-edu">
          <h2 id="r-edu" className="text-sm font-bold uppercase tracking-widest text-slate-500">
            Education
          </h2>
          {edu.map((t) => (
            <div key={t.id} className="mt-3 flex flex-wrap items-baseline justify-between gap-2">
              <div>
                <h3 className="font-semibold">{t.title}</h3>
                <p className="text-sm text-slate-700">{t.org}</p>
              </div>
              <p className="text-sm text-slate-600">{t.period}</p>
            </div>
          ))}
        </section>
      </article>
    </main>
  );
}
