"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { certifications, timeline } from "@/data/experience";
import { SectionHeading } from "./SectionHeading";
import { useReducedMotion } from "@/lib/hooks";

export function Experience() {
  const wrapRef = useRef<HTMLOListElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // GSAP ScrollTrigger: the glowing line draws down as the timeline scrolls past
  useEffect(() => {
    const wrap = wrapRef.current;
    const line = lineRef.current;
    if (!wrap || !line) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(line, { scaleY: 1 });
      return;
    }
    gsap.registerPlugin(ScrollTrigger);
    const tween = gsap.fromTo(
      line,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        transformOrigin: "top",
        scrollTrigger: { trigger: wrap, start: "top 70%", end: "bottom 70%", scrub: 0.6 },
      },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section id="experience" aria-labelledby="exp-title" className="relative px-4 py-28">
      <div className="mx-auto max-w-4xl">
        <SectionHeading id="exp-title" index="05" eyebrow="Experience" title="Where I&apos;ve built things.">
          Production data engineering roles and education.
        </SectionHeading>

        <div className="relative">
          <div aria-hidden className="absolute bottom-0 left-5 top-0 w-px bg-line md:left-1/2" />
          <div
            aria-hidden
            ref={lineRef}
            className="absolute bottom-0 left-5 top-0 w-px origin-top bg-gradient-to-b from-electric via-violet to-cyan shadow-[0_0_12px_rgb(var(--cyan))] md:left-1/2"
          />

          <ol ref={wrapRef} className="space-y-12">
            {timeline.map((t, i) => {
              const left = i % 2 === 0;
              const Icon = t.type === "work" ? Briefcase : GraduationCap;
              return (
                <li key={t.id} className="relative pl-14 md:grid md:grid-cols-2 md:gap-14 md:pl-0">
                  <span
                    aria-hidden
                    className="absolute left-5 top-6 grid h-10 w-10 -translate-x-1/2 place-items-center rounded-full border border-cyan/60 bg-bg text-cyan md:left-1/2"
                  >
                    <Icon size={18} />
                    {t.current && <span className="absolute inset-0 animate-pulse-ring rounded-full border border-cyan" />}
                  </span>

                  <motion.article
                    initial={reduce ? false : { opacity: 0, x: left ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className={`glass rounded-2xl p-6 ${left ? "md:col-start-1" : "md:col-start-2"}`}
                  >
                    <p className="font-mono text-xs uppercase tracking-widest text-cyan">
                      {t.period}
                      {t.current && (
                        <span className="ml-2 rounded-full bg-emerald-400/15 px-2 py-0.5 text-[10px] text-emerald-400">
                          Current
                        </span>
                      )}
                    </p>
                    <h3 className="mt-2 font-display text-xl font-semibold">{t.title}</h3>
                    <p className="text-muted">
                      {t.url ? (
                        <a href={t.url} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
                          {t.org}
                        </a>
                      ) : (
                        t.org
                      )}
                      {t.location ? ` · ${t.location}` : ""}
                    </p>

                    {t.points.length > 0 && (
                      <ul className="mt-4 space-y-2 text-sm text-muted">
                        {t.points.map((p) => (
                          <li key={p} className="flex gap-2">
                            <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet" />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {t.tags && (
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {t.tags.map((tag) => (
                          <li key={tag} className="rounded-md bg-electric/10 px-2 py-1 font-mono text-xs text-electric">
                            {tag}
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.article>
                </li>
              );
            })}
          </ol>
        </div>

        {certifications.length > 0 && (
          <div className="mt-16">
            <h3 className="font-display text-2xl font-semibold">Certifications</h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {certifications.map((c) => (
                <li key={c.name} className="glass rounded-xl p-4">
                  <p className="font-medium">{c.name}</p>
                  <p className="text-sm text-muted">
                    {c.issuer} · {c.year}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
