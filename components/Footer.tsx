import { Github, Linkedin, Mail } from "lucide-react";
import { navLinks, site } from "@/data/site";

export function Footer() {
  return (
    <footer className="relative border-t border-line/60 px-4 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="text-center md:text-left">
          <p className="font-display text-lg font-semibold">{site.name}</p>
          <p className="text-sm text-muted">Data Engineer · Full Stack Developer · {site.location}</p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap justify-center gap-5 text-sm text-muted">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={`/${l.href}`} className="transition hover:text-cyan">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="flex items-center gap-3">
          {site.github && (
            <li>
              <a href={site.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub (opens in a new tab)" className="text-muted transition hover:text-cyan">
                <Github size={20} aria-hidden />
              </a>
            </li>
          )}
          {site.linkedin && (
            <li>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (opens in a new tab)" className="text-muted transition hover:text-cyan">
                <Linkedin size={20} aria-hidden />
              </a>
            </li>
          )}
          <li>
            <a href={`mailto:${site.email}`} aria-label="Email" className="text-muted transition hover:text-cyan">
              <Mail size={20} aria-hidden />
            </a>
          </li>
        </ul>
      </div>
      <p className="mt-8 text-center text-xs text-muted">
        © {new Date().getFullYear()} {site.name}. Built with Next.js, Three.js and Framer Motion.
      </p>
    </footer>
  );
}
