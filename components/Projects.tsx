"use client";

import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { categoryLabels, projects, type ProjectCategory } from "@/data/projects";
import { SectionHeading } from "./SectionHeading";
import { ProjectCard } from "./ProjectCard";
import { cn } from "@/lib/utils";

type Filter = ProjectCategory | "all";
const filters: Filter[] = ["all", "data", "fullstack", "ai"];

export function Projects() {
  const [filter, setFilter] = useState<Filter>("all");
  const visible = filter === "all" ? projects : projects.filter((p) => p.category === filter);
  const count = (f: Filter) => (f === "all" ? projects.length : projects.filter((p) => p.category === f).length);

  return (
    <section id="projects" aria-labelledby="projects-title" className="relative px-4 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading id="projects-title" index="04" eyebrow="Projects" title="Selected builds.">
          {projects.length} portfolio projects across data engineering, full stack and AI. They run on sample data,
          which is why each is labelled as a demo; my production work is under Experience.
        </SectionHeading>

        <div role="group" aria-label="Filter projects by category" className="mb-10 flex flex-wrap gap-2">
          {filters.map((f) => {
            const selected = filter === f;
            return (
              <button
                key={f}
                type="button"
                aria-pressed={selected}
                onClick={() => setFilter(f)}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-medium transition",
                  selected ? "text-white" : "glass text-muted hover:text-fg",
                )}
              >
                {selected && (
                  <motion.span
                    layoutId="project-filter"
                    className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-electric via-violet to-cyan"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {categoryLabels[f]}
                <span className="ml-1.5 font-mono text-xs opacity-70">{count(f)}</span>
              </button>
            );
          })}
        </div>

        <LayoutGroup>
          <p role="status" className="sr-only">
            Showing {visible.length} {visible.length === 1 ? "project" : "projects"}
          </p>
          <motion.ul layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {visible.map((p) => (
                <motion.li key={p.slug} layout className="[perspective:1200px]">
                  <ProjectCard project={p} />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </LayoutGroup>
      </div>
    </section>
  );
}
