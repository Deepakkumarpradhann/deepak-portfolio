"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import type { Project } from "@/data/projects";
import { ProjectThumb } from "./ProjectThumb";
import { TransitionLink } from "./TransitionLink";
import { useIsDesktop } from "@/lib/hooks";
import { hsl } from "@/lib/utils";

/** 3D tilt card (desktop only). The whole card opens the detail page via the title link. */
export function ProjectCard({ project }: { project: Project }) {
  const ref = useRef<HTMLElement>(null);
  const desktop = useIsDesktop();
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 200, damping: 20 });
  const sy = useSpring(my, { stiffness: 200, damping: 20 });
  const rotateY = useTransform(sx, [0, 1], [-9, 9]);
  const rotateX = useTransform(sy, [0, 1], [9, -9]);
  const glowX = useTransform(sx, (v) => `${v * 100}%`);
  const glowY = useTransform(sy, (v) => `${v * 100}%`);
  const accent = hsl(project.hues[0], 90, 60, 0.35);
  const glowBg = useTransform(
    [glowX, glowY],
    ([x, y]) => `radial-gradient(260px circle at ${x} ${y}, ${accent}, transparent 70%)`,
  );

  const onMove = (e: React.PointerEvent) => {
    if (!desktop || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const reset = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  const href = `/projects/${project.slug}`;

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.35 }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={desktop ? { rotateX, rotateY, transformPerspective: 900, transformStyle: "preserve-3d" } : undefined}
      className="glass group relative flex h-full flex-col overflow-hidden rounded-3xl"
    >
      {desktop && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: glowBg }}
        />
      )}

      <ProjectThumb project={project} className="h-44 transition duration-500 group-hover:scale-[1.03]" />

      <div className="relative z-20 flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-center gap-2">
          <span className="rounded-full border border-amber-400/40 bg-amber-400/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-amber-400">
            Demo project
          </span>
        </div>

        <h3 className="font-display text-xl font-semibold leading-snug">
          <TransitionLink
            href={href}
            className="after:absolute after:inset-0 after:z-30 after:content-[''] hover:text-cyan"
          >
            {project.title}
            <span className="sr-only">, view project details</span>
          </TransitionLink>
        </h3>
        <p className="mt-2 text-sm text-muted">{project.summary}</p>

        <ul aria-label="Technology stack" className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.map((t) => (
            <li key={t} className="rounded-md bg-electric/10 px-2 py-1 font-mono text-[11px] text-electric">
              {t}
            </li>
          ))}
        </ul>

        {/* Buttons sit above the card-wide link (z-40 > z-30) */}
        <div className="relative z-40 mt-6 flex flex-wrap items-center gap-2 pt-1">
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-line px-3.5 py-1.5 text-sm transition hover:border-cyan hover:text-cyan"
            >
              <Github size={15} aria-hidden /> GitHub
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          )}
          <TransitionLink
            href={`${href}#demo`}
            className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-electric to-violet px-3.5 py-1.5 text-sm font-medium text-white transition hover:brightness-110"
          >
            <ExternalLink size={15} aria-hidden /> Live Demo
          </TransitionLink>
          <span aria-hidden className="ml-auto text-muted transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-cyan">
            <ArrowUpRight size={20} />
          </span>
        </div>
      </div>
    </motion.article>
  );
}
