import { Bot, Brain, Briefcase, Cloud, FileText, GitMerge, LayoutDashboard, Layers, LineChart, Medal, ShoppingCart, Waves, Wallet, type LucideIcon } from "lucide-react";
import type { Project } from "@/data/projects";
import { hsl } from "@/lib/utils";

const glyphs: Record<Project["glyph"], LucideIcon> = {
  layers: Layers,
  stream: Waves,
  lake: Cloud,
  medal: Medal,
  chart: LineChart,
  flow: GitMerge,
  cart: ShoppingCart,
  dashboard: LayoutDashboard,
  briefcase: Briefcase,
  wallet: Wallet,
  brain: Brain,
  bot: Bot,
  doc: FileText,
};

/**
 * Generated thumbnail: no image files to load, so it is instant and always crisp.
 * Each project gets its own gradient from `hues` and a symbolic icon.
 */
export function ProjectThumb({ project, className = "" }: { project: Project; className?: string }) {
  const [h1, h2] = project.hues;
  const Icon = glyphs[project.glyph];
  return (
    <div
      aria-hidden
      className={`relative overflow-hidden ${className}`}
      style={{
        background: `radial-gradient(circle at 20% 15%, ${hsl(h1, 90, 55, 0.55)}, transparent 55%), radial-gradient(circle at 85% 85%, ${hsl(h2, 90, 55, 0.55)}, transparent 55%), linear-gradient(135deg, ${hsl(h1, 60, 12)}, ${hsl(h2, 60, 8)})`,
      }}
    >
      <svg className="absolute inset-0 h-full w-full opacity-30" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={`dots-${project.slug}`} width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.2" fill="white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#dots-${project.slug})`} />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div
          className="grid h-20 w-20 place-items-center rounded-2xl border border-white/20 bg-white/10 text-white shadow-2xl backdrop-blur-md"
          style={{ boxShadow: `0 0 50px ${hsl(h1, 90, 60, 0.5)}` }}
        >
          <Icon size={38} strokeWidth={1.5} />
        </div>
      </div>
    </div>
  );
}
