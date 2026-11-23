"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";

type Phase = "idle" | "cover" | "reveal";

interface TransitionCtx {
  navigate: (href: string) => void;
}

const Ctx = createContext<TransitionCtx>({ navigate: () => {} });
export const usePageTransition = () => useContext(Ctx);

const SLATS = 6;
const COVER_MS = 650;

/**
 * Anime-style transition: diagonal slats sweep across the screen, the route changes
 * while the screen is covered, then the slats sweep away.
 * Use `usePageTransition().navigate(href)` (or <TransitionLink>) to trigger it.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("idle");
  const pending = useRef<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const safety = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navigate = useCallback(
    (href: string) => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const samePage = new URL(href, window.location.href).pathname === window.location.pathname;
      // Same-page jumps (anchors) and reduced motion skip the sweep: no route change would end it.
      if (reduce || samePage || pending.current) {
        router.push(href);
        return;
      }
      pending.current = href;
      setPhase("cover");
      timer.current = setTimeout(() => router.push(href), COVER_MS);
      // Safety net: never leave the screen covered if navigation stalls
      safety.current = setTimeout(() => {
        pending.current = null;
        setPhase("idle");
      }, 4000);
    },
    [router],
  );

  // Route finished changing while covered → reveal the new page.
  useEffect(() => {
    if (pending.current) {
      const hasHash = pending.current.includes("#");
      pending.current = null;
      if (safety.current) clearTimeout(safety.current);
      if (!hasHash) window.scrollTo(0, 0);
      setPhase("reveal");
      const t = setTimeout(() => setPhase("idle"), COVER_MS + 100);
      return () => clearTimeout(t);
    }
  }, [pathname]);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
      if (safety.current) clearTimeout(safety.current);
    },
    [],
  );

  const value = useMemo(() => ({ navigate }), [navigate]);

  return (
    <Ctx.Provider value={value}>
      {children}
      {phase !== "idle" && (
        <div aria-hidden className="pointer-events-none fixed inset-0 z-[280] overflow-hidden">
          {Array.from({ length: SLATS }).map((_, i) => (
            <motion.div
              key={`${phase}-${i}`}
              className="absolute top-[-10%] h-[120%] bg-gradient-to-b from-electric via-violet to-cyan"
              style={{
                left: `${(i * 100) / SLATS - 4}%`,
                width: `${100 / SLATS + 8}%`,
                // skewX and originX are motion values so they compose with the scaleX animation
                skewX: -14,
                originX: phase === "cover" ? 0 : 1,
              }}
              initial={{ scaleX: phase === "cover" ? 0 : 1 }}
              animate={{ scaleX: phase === "cover" ? 1 : 0 }}
              transition={{ duration: 0.45, delay: i * 0.04, ease: [0.76, 0, 0.24, 1] }}
            />
          ))}
        </div>
      )}
    </Ctx.Provider>
  );
}
