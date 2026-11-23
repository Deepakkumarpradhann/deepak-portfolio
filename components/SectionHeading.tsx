import { Reveal } from "./Reveal";

export function SectionHeading({
  index,
  eyebrow,
  title,
  children,
  id,
}: {
  index: string;
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
  id: string;
}) {
  return (
    <Reveal className="mb-12 max-w-3xl">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan">
        {index} — {eyebrow}
      </p>
      <h2 id={id} className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
        {title}
      </h2>
      {children && <p className="mt-4 text-lg text-muted">{children}</p>}
    </Reveal>
  );
}
