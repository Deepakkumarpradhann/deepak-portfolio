"use client";

import { useState } from "react";
import type { SkillCategory } from "@/data/skills";
import { useReducedMotion } from "@/lib/hooks";

/**
 * Interactive skill constellation: skills sit on an orbit around the category node.
 * Hover or focus a node to read it; the ring rotates slowly unless motion is reduced.
 */
export function SkillOrbit({ category }: { category: SkillCategory }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const n = category.skills.length;
  const size = 360;
  const c = size / 2;
  const radius = 130;

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[360px]">
      <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full" role="img" aria-label={`${category.label} skills orbit`}>
        <defs>
          <radialGradient id="core-grad">
            <stop offset="0%" stopColor="rgb(168 85 247)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="rgb(59 130 246)" stopOpacity="0.15" />
          </radialGradient>
        </defs>
        <circle cx={c} cy={c} r={radius} fill="none" stroke="rgb(var(--line))" strokeDasharray="3 7" />
        <circle cx={c} cy={c} r={radius * 0.55} fill="none" stroke="rgb(var(--line) / 0.5)" />
        <circle cx={c} cy={c} r={46} fill="url(#core-grad)" />
        <text
          x={c}
          y={c}
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-white font-display text-[11px] font-semibold"
        >
          {category.label.split(" ")[0]}
        </text>

        <g
          className="animate-spin-slow"
          style={{
            transformOrigin: `${c}px ${c}px`,
            animationDuration: "90s",
            animationPlayState: reduce || hovered ? "paused" : "running",
          }}
        >
          {category.skills.map((s, i) => {
            const a = (i / n) * Math.PI * 2 - Math.PI / 2;
            const x = c + radius * Math.cos(a);
            const y = c + radius * Math.sin(a);
            const active = hovered === s;
            return (
              <g key={s}>
                <line
                  x1={c}
                  y1={c}
                  x2={x}
                  y2={y}
                  stroke={active ? "rgb(34 211 238)" : "rgb(var(--line) / 0.4)"}
                  strokeWidth={active ? 1.5 : 1}
                />
                <circle
                  cx={x}
                  cy={y}
                  r={active ? 13 : 8}
                  tabIndex={0}
                  role="img"
                  aria-label={s}
                  onMouseEnter={() => setHovered(s)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(s)}
                  onBlur={() => setHovered(null)}
                  fill={active ? "rgb(34 211 238)" : "rgb(var(--violet))"}
                  style={{ transition: "all .25s", cursor: "pointer" }}
                />
              </g>
            );
          })}
        </g>
      </svg>

      <p
        aria-live="polite"
        className="pointer-events-none absolute inset-x-0 -bottom-2 text-center font-mono text-sm text-cyan"
      >
        {hovered ?? "Hover a node"}
      </p>
    </div>
  );
}
