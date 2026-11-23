/**
 * Services offered. Edit titles, text and deliverables to match what you actually want to sell.
 * `icon` must be one of the keys in components/Services.tsx.
 */
export type ServiceIcon =
  | "palette"
  | "code"
  | "pipeline"
  | "cloud"
  | "chart"
  | "bot"
  | "gauge";

export interface Service {
  id: string;
  icon: ServiceIcon;
  title: string;
  summary: string;
  deliverables: string[];
}

export const services: Service[] = [
  {
    id: "web-design",
    icon: "palette",
    title: "Web Design & UI/UX",
    summary:
      "Modern, responsive interfaces designed around your users, from wireframes to a polished visual system.",
    deliverables: ["Wireframes and prototypes", "Responsive layouts", "Design system and components"],
  },
  {
    id: "full-stack",
    icon: "code",
    title: "Full Stack Web Development",
    summary:
      "Fast, accessible websites and web apps built with React and Next.js, backed by Node.js or FastAPI.",
    deliverables: ["Next.js / React frontends", "REST APIs and databases", "Authentication and forms"],
  },
  {
    id: "data-pipelines",
    icon: "pipeline",
    title: "Data Pipeline Development",
    summary:
      "Reliable ETL/ELT pipelines that pull data from databases, APIs and files and keep it clean and current.",
    deliverables: ["Python, SQL and PySpark jobs", "Airflow scheduling and retries", "Automated data quality checks"],
  },
  {
    id: "cloud-data",
    icon: "cloud",
    title: "Cloud Data Platforms",
    summary:
      "Data lakes and warehouses on AWS or Azure, structured so analytics stay fast and costs stay predictable.",
    deliverables: ["S3, Glue, Redshift or ADLS, Synapse setups", "Medallion / lakehouse design", "Monitoring and alerts"],
  },
  {
    id: "dashboards",
    icon: "chart",
    title: "Dashboards & Analytics",
    summary:
      "Clear dashboards and reports on top of well-modelled data, so teams can answer questions without asking engineering.",
    deliverables: ["Star-schema data models", "Interactive dashboards", "KPI definitions and documentation"],
  },
  {
    id: "ai-automation",
    icon: "bot",
    title: "AI & Workflow Automation",
    summary:
      "LLM-powered assistants and Python automation that remove repetitive manual work from your processes.",
    deliverables: ["Workflow automation scripts", "LLM integrations with validation", "Handover and documentation"],
  },
  {
    id: "optimisation",
    icon: "gauge",
    title: "Performance, SEO & Maintenance",
    summary:
      "Speed, accessibility and search-friendliness improvements for existing sites, plus ongoing updates and fixes.",
    deliverables: ["Performance and accessibility audit", "SEO and metadata fixes", "Ongoing support"],
  },
];
