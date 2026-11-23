"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Cloud, Database, LayoutTemplate, Server, Sparkles, Wrench, type LucideIcon } from "lucide-react";
import { skillCategories, type SkillIcon } from "@/data/skills";
import { SectionHeading } from "./SectionHeading";
import { SkillOrbit } from "./SkillOrbit";
import { cn } from "@/lib/utils";

const icons: Record<SkillIcon, LucideIcon> = {
  database: Database,
  cloud: Cloud,
  layout: LayoutTemplate,
  server: Server,
  wrench: Wrench,
  sparkles: Sparkles,
};

function monogram(name: string) {
  const parts = name.replace(/[^A-Za-z0-9. ]/g, "").split(" ").filter(Boolean);
  if (parts.length > 1) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.slice(0, 2);
}

export function Skills() {
  const [activeId, setActiveId] = useState(skillCategories[0].id);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const active = skillCategories.find((c) => c.id === activeId) ?? skillCategories[0];
  const ActiveIcon = icons[active.icon];

  // Arrow-key navigation for the tab list (WAI-ARIA tabs pattern)
  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    const last = skillCategories.length - 1;
    let next = index;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = index === last ? 0 : index + 1;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = index === 0 ? last : index - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    else return;
    e.preventDefault();
    setActiveId(skillCategories[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="skills" aria-labelledby="skills-title" className="relative px-4 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading id="skills-title" index="02" eyebrow="Skills" title="The stack I work with.">
          Pick a category to explore it. The orbit on the right is interactive.
        </SectionHeading>

        <div role="tablist" aria-label="Skill categories" className="mb-10 flex flex-wrap gap-2">
          {skillCategories.map((cat, i) => {
            const Icon = icons[cat.icon];
            const selected = cat.id === activeId;
            return (
              <button
                key={cat.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                role="tab"
                id={`tab-${cat.id}`}
                aria-selected={selected}
                aria-controls={`panel-${cat.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveId(cat.id)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={cn(
                  "relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition",
                  selected ? "text-white" : "glass text-muted hover:text-fg",
                )}
              >
                {selected && (
                  <motion.span
                    layoutId="skill-tab"
                    className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-electric via-violet to-cyan"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon size={16} aria-hidden />
                {cat.label}
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          id={`panel-${active.id}`}
          aria-labelledby={`tab-${active.id}`}
          className="grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]"
        >
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-violet/15 text-violet">
                <ActiveIcon size={22} aria-hidden />
              </span>
              <p className="text-muted">{active.blurb}</p>
            </div>

            <AnimatePresence mode="wait">
              <motion.ul
                key={active.id}
                className="grid grid-cols-2 gap-3 sm:grid-cols-3"
                initial="hidden"
                animate="show"
                exit="hidden"
                variants={{ show: { transition: { staggerChildren: 0.04 } }, hidden: {} }}
              >
                {active.skills.map((s) => (
                  <motion.li
                    key={s}
                    variants={{
                      hidden: { opacity: 0, y: 16, scale: 0.95 },
                      show: { opacity: 1, y: 0, scale: 1 },
                    }}
                    whileHover={{ y: -6, rotateX: 6, rotateY: -6 }}
                    style={{ transformPerspective: 600 }}
                    data-cursor
                    className="glass group flex items-center gap-3 rounded-2xl p-4 transition-colors hover:border-cyan/60"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-electric/30 to-violet/30 font-mono text-xs font-bold text-cyan transition group-hover:from-electric group-hover:to-violet group-hover:text-white">
                      {monogram(s)}
                    </span>
                    <span className="text-sm font-medium leading-tight">{s}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </AnimatePresence>
          </div>

          <div className="hidden pb-6 sm:block">
            <SkillOrbit key={active.id} category={active} />
          </div>
        </div>
      </div>
    </section>
  );
}
