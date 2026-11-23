"use client";

import { ArrowRight, Bot, Check, Cloud, Code2, Gauge, GitMerge, LineChart, Palette, type LucideIcon } from "lucide-react";
import { services, type ServiceIcon } from "@/data/services";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const icons: Record<ServiceIcon, LucideIcon> = {
  palette: Palette,
  code: Code2,
  pipeline: GitMerge,
  cloud: Cloud,
  chart: LineChart,
  bot: Bot,
  gauge: Gauge,
};

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="relative px-4 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading id="services-title" index="03" eyebrow="Services" title="What I can build for you.">
          From the interface your users see to the data platform behind it.
        </SectionHeading>

        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = icons[s.icon];
            return (
              <li key={s.id} className={i === 0 ? "lg:col-span-1" : undefined}>
                <Reveal delay={(i % 3) * 0.08} className="h-full">
                  <article
                    data-cursor
                    className="glass group relative h-full overflow-hidden rounded-3xl p-7 transition duration-300 hover:-translate-y-1.5 hover:border-violet/60"
                  >
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-violet/20 blur-3xl transition group-hover:bg-cyan/25"
                    />
                    <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-electric/30 to-violet/30 text-cyan transition group-hover:from-electric group-hover:to-violet group-hover:text-white">
                      <Icon size={24} aria-hidden />
                    </span>
                    <h3 className="relative mt-5 font-display text-xl font-semibold">{s.title}</h3>
                    <p className="relative mt-2 text-sm text-muted">{s.summary}</p>
                    <ul className="relative mt-5 space-y-2 text-sm">
                      {s.deliverables.map((d) => (
                        <li key={d} className="flex items-start gap-2">
                          <Check size={16} className="mt-0.5 shrink-0 text-cyan" aria-hidden />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              </li>
            );
          })}

          <li>
            <Reveal delay={0.16} className="h-full">
              <a
                href="#contact"
                className="group flex h-full min-h-[220px] flex-col justify-between rounded-3xl bg-gradient-to-br from-electric via-violet to-cyan p-7 text-white shadow-[0_0_40px_-8px_rgb(var(--violet)/0.7)] transition hover:brightness-110"
              >
                <span className="font-display text-2xl font-bold leading-snug">Have a project in mind?</span>
                <span className="inline-flex items-center gap-2 font-medium">
                  Get in touch
                  <ArrowRight size={18} className="transition group-hover:translate-x-1" aria-hidden />
                </span>
              </a>
            </Reveal>
          </li>
        </ul>
      </div>
    </section>
  );
}
