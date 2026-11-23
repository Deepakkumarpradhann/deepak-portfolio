import { Bot, Cloud, Database, GitMerge, Layers, Network, Rocket } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const pillars = [
  {
    icon: Database,
    title: "Data Engineering",
    text: "End-to-end pipelines from databases, APIs and files into warehouses like Snowflake and Redshift.",
  },
  {
    icon: Layers,
    title: "Full Stack Development",
    text: "Typed, accessible React and Next.js frontends backed by Node.js and FastAPI services.",
  },
  {
    icon: Cloud,
    title: "Cloud Computing",
    text: "Production pipelines on AWS (S3, Glue, Lambda, Redshift) and Azure (ADF, ADLS, Synapse).",
  },
  {
    icon: GitMerge,
    title: "ETL / ELT Pipelines",
    text: "Incremental loads, SCD Type 2, star schemas and automated data quality checks.",
  },
  {
    icon: Network,
    title: "Distributed Processing",
    text: "PySpark and Databricks workloads tuned with partitioning, broadcast joins and coalesce.",
  },
  {
    icon: Bot,
    title: "AI & Automation",
    text: "LLM-powered workflows and Python automation that remove repetitive manual work.",
  },
  {
    icon: Rocket,
    title: "Scalable Applications",
    text: "Designs that stay reliable as data volume and traffic grow.",
  },
];

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative px-4 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading id="about-title" index="01" eyebrow="About" title="Pipelines that run, interfaces that feel fast.">
          I&apos;m Deepak, a data engineer in Bangalore with about three years of production experience, currently at
          Aetherrise Solutions supporting pipelines on AWS and Databricks.
        </SectionHeading>

        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <div className="glass rounded-3xl p-8">
              <p className="text-muted">
                I care about the parts that keep a data platform trustworthy: incremental loads, data quality
                checks, root cause analysis when something fails, and queries that don&apos;t waste compute.
              </p>
              <p className="mt-4 text-muted">
                I also build frontends and AI-assisted tools, so a pipeline&apos;s output reaches people through an
                interface that is clear, fast and accessible.
              </p>
              <p className="mt-6 font-mono text-xs uppercase tracking-widest text-cyan">
                B.Tech · Information Technology · VSSUT, Burla
              </p>
            </div>
          </Reveal>

          <ul className="grid gap-4 sm:grid-cols-2">
            {pillars.map((p, i) => (
              <li key={p.title}>
                <Reveal delay={i * 0.05} className="h-full">
                  <div
                    data-cursor
                    className="glass group h-full rounded-2xl p-5 transition duration-300 hover:-translate-y-1 hover:border-violet/60"
                  >
                    <p.icon className="text-cyan transition group-hover:scale-110 group-hover:text-violet" size={22} aria-hidden />
                    <h3 className="mt-3 font-display text-lg font-semibold">{p.title}</h3>
                    <p className="mt-1 text-sm text-muted">{p.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
