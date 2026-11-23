"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/hooks";

/**
 * Interactive walkthrough shown on each project page ("Live Demo").
 * It steps through the architecture and shows a sample output table.
 * All data is sample data and the page says so.
 */
export function ProjectDemo({ project }: { project: Project }) {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const reduce = useReducedMotion();
  const n = project.stages.length;

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setStep((s) => (s + 1) % n), 2200);
    return () => clearInterval(id);
  }, [playing, n]);

  const stage = project.stages[step];

  return (
    <div className="glass rounded-3xl p-6 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-xs uppercase tracking-widest text-cyan">Interactive walkthrough · sample data</p>
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-sm transition hover:border-cyan hover:text-cyan"
          aria-pressed={playing}
        >
          {playing ? <Pause size={14} aria-hidden /> : <Play size={14} aria-hidden />}
          {playing ? "Pause" : "Auto-play"}
        </button>
      </div>

      <ol className="mt-6 flex flex-wrap items-center gap-2" aria-label="Pipeline stages">
        {project.stages.map((s, i) => (
          <li key={s.name} className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setStep(i);
                setPlaying(false);
              }}
              aria-current={i === step ? "step" : undefined}
              className={cn(
                "rounded-xl border px-3.5 py-2 font-mono text-sm transition",
                i === step
                  ? "border-transparent bg-gradient-to-r from-electric to-violet text-white shadow-[0_0_24px_-4px_rgb(var(--violet))]"
                  : i < step
                    ? "border-cyan/40 text-cyan"
                    : "border-line text-muted hover:text-fg",
              )}
            >
              {i + 1}. {s.name}
            </button>
            {i < n - 1 && (
              <span aria-hidden className={cn("h-px w-5 transition-colors", i < step ? "bg-cyan" : "bg-line")} />
            )}
          </li>
        ))}
      </ol>

      <div className="mt-6 min-h-[64px]" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.p
            key={step}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="text-lg"
          >
            <span className="font-display font-semibold text-gradient">{stage.name}.</span>{" "}
            <span className="text-muted">{stage.detail}</span>
          </motion.p>
        </AnimatePresence>
      </div>

      <figure className="mt-6 overflow-hidden rounded-2xl border border-line">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[420px] text-left text-sm">
            <caption className="sr-only">{project.sample.caption}</caption>
            <thead className="bg-fg/5 font-mono text-xs uppercase tracking-wider text-muted">
              <tr>
                {project.sample.columns.map((c) => (
                  <th key={c} scope="col" className="px-4 py-3 font-medium">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {project.sample.rows.map((row, ri) => (
                <tr key={ri} className="border-t border-line/70 transition-colors hover:bg-fg/5">
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-4 py-3 font-mono text-[13px]">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <figcaption className="border-t border-line/70 bg-fg/5 px-4 py-2 text-xs text-muted">
          {project.sample.caption}
        </figcaption>
      </figure>
    </div>
  );
}
