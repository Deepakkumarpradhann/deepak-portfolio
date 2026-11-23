"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, Download, FolderGit2, Github, Linkedin, Mail } from "lucide-react";
import gsap from "gsap";
import { site } from "@/data/site";
import { MagneticButton } from "./MagneticButton";
import { TransitionLink } from "./TransitionLink";
import { useIsDesktop, useMediaQuery, useReducedMotion } from "@/lib/hooks";

// 3D scene is lazy-loaded on the client only; it never blocks first paint.
const Background3D = dynamic(() => import("./Background3D"), { ssr: false });

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const decimals = Number.isInteger(value) ? 0 : 1;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = value.toFixed(decimals);
      return;
    }
    const obj = { n: 0 };
    const tween = gsap.to(obj, {
      n: value,
      duration: 2,
      delay: 1.2,
      ease: "power3.out",
      onUpdate: () => {
        el.textContent = obj.n.toFixed(decimals);
      },
    });
    return () => {
      tween.kill();
    };
  }, [value, decimals]);

  return (
    <span>
      <span ref={ref}>0</span>
      {suffix}
    </span>
  );
}

function Avatar() {
  return (
    <div className="relative mx-auto h-56 w-56 sm:h-64 sm:w-64">
      <div className="absolute inset-0 animate-spin-slow rounded-full bg-[conic-gradient(from_0deg,rgb(var(--electric)),rgb(var(--violet)),rgb(var(--cyan)),rgb(var(--electric)))] opacity-90 blur-[2px]" />
      <div className="absolute inset-[5px] rounded-full bg-bg" />
      <div className="absolute inset-[11px] animate-float overflow-hidden rounded-full glass">
        {site.profileImage ? (
          <Image
            src={site.profileImage}
            alt={`Portrait of ${site.name}`}
            fill
            priority
            sizes="256px"
            className="object-cover"
          />
        ) : (
          <div className="grid h-full w-full place-items-center bg-gradient-to-br from-electric/25 via-violet/25 to-cyan/25">
            <span className="font-display text-7xl font-bold text-gradient" aria-hidden>
              {site.initials}
            </span>
            <span className="sr-only">{`Avatar for ${site.name}`}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const reduce = useReducedMotion();
  const desktop = useIsDesktop();
  const isNarrow = useMediaQuery("(max-width: 767px)");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // GSAP: split the name into characters and animate them in
  useEffect(() => {
    const el = titleRef.current;
    if (!el || reduce) return;
    const chars = el.querySelectorAll<HTMLElement>("[data-char]");
    const tween = gsap.fromTo(
      chars,
      { yPercent: 110, opacity: 0, rotateX: -80 },
      {
        yPercent: 0,
        opacity: 1,
        rotateX: 0,
        duration: 0.9,
        ease: "power4.out",
        stagger: 0.03,
        delay: 0.35,
      },
    );
    return () => {
      tween.kill();
    };
  }, [reduce]);

  const words = site.name.split(" ");

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative flex min-h-screen items-center overflow-hidden pb-16 pt-32"
    >
      {/* Layered background: gradient glow, grid and (when allowed) the WebGL scene */}
      <div aria-hidden className="absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet/25 blur-[140px]" />
        <div className="absolute right-0 top-1/2 h-[420px] w-[420px] rounded-full bg-electric/20 blur-[130px]" />
        <div className="grid-bg absolute inset-0" />
        {mounted && !reduce && (
          <div className="absolute inset-0 opacity-90">
            <Background3D lite={!desktop || isNarrow} />
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 px-4 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span
                className={`absolute inline-flex h-full w-full animate-pulse-ring rounded-full ${
                  site.availability.open ? "bg-emerald-400" : "bg-amber-400"
                }`}
              />
              <span
                className={`relative inline-flex h-2.5 w-2.5 rounded-full ${
                  site.availability.open ? "bg-emerald-400" : "bg-amber-400"
                }`}
              />
            </span>
            {site.availability.label}
          </motion.div>

          <h1
            id="hero-title"
            ref={titleRef}
            className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
            style={{ perspective: 800 }}
          >
            <span className="sr-only">{site.name}</span>
            <span aria-hidden>
              {words.map((w, wi) => (
                <span key={wi} className="mr-4 inline-block overflow-hidden align-bottom">
                  {w.split("").map((c, ci) => (
                    <span
                      key={ci}
                      data-char
                      className={`inline-block ${wi === words.length - 1 ? "text-gradient text-glow" : ""}`}
                      style={reduce ? undefined : { opacity: 0 }}
                    >
                      {c}
                    </span>
                  ))}
                </span>
              ))}
            </span>
          </h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-5 font-mono text-sm tracking-wide text-cyan sm:text-base"
          >
            {site.role}
          </motion.p>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95 }}
            className="mt-4 max-w-xl text-lg text-muted sm:text-xl"
          >
            {site.headline}
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <MagneticButton>
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-electric via-violet to-cyan px-6 py-3 font-medium text-white shadow-[0_0_30px_-4px_rgb(var(--violet)/0.7)] transition hover:shadow-[0_0_44px_-2px_rgb(var(--violet)/0.9)]"
              >
                <FolderGit2 size={18} aria-hidden /> View Projects
              </a>
            </MagneticButton>
            <MagneticButton>
              <TransitionLink
                href="/resume"
                className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium transition hover:border-cyan/60"
              >
                <Download size={18} aria-hidden /> Download Resume
              </TransitionLink>
            </MagneticButton>
          </motion.div>

          <motion.ul
            aria-label="Social links"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="mt-8 flex items-center gap-3"
          >
            {site.github && (
              <li>
                <a
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile (opens in a new tab)"
                  className="glass grid h-11 w-11 place-items-center rounded-full transition hover:scale-110 hover:text-cyan"
                >
                  <Github size={20} aria-hidden />
                </a>
              </li>
            )}
            {site.linkedin && (
              <li>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile (opens in a new tab)"
                  className="glass grid h-11 w-11 place-items-center rounded-full transition hover:scale-110 hover:text-cyan"
                >
                  <Linkedin size={20} aria-hidden />
                </a>
              </li>
            )}
            <li>
              <a
                href={`mailto:${site.email}`}
                aria-label="Send an email"
                className="glass grid h-11 w-11 place-items-center rounded-full transition hover:scale-110 hover:text-cyan"
              >
                <Mail size={20} aria-hidden />
              </a>
            </li>
          </motion.ul>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-8"
        >
          <Avatar />
          <dl className="grid w-full max-w-sm grid-cols-2 gap-3">
            {site.stats.map((s) => (
              <div key={s.label} className="glass flex flex-col rounded-2xl p-4 text-center">
                <dt className="order-2 mt-1 text-xs leading-snug text-muted">{s.label}</dt>
                <dd className="order-1 font-display text-3xl font-bold text-gradient">
                  <Counter value={s.value} suffix={s.suffix} />
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to About section"
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 animate-float text-muted hover:text-cyan sm:block"
      >
        <ArrowDown aria-hidden />
      </a>
    </section>
  );
}
