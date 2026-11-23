export type SkillIcon =
  | "database"
  | "cloud"
  | "layout"
  | "server"
  | "wrench"
  | "sparkles";

export interface SkillCategory {
  id: string;
  label: string;
  icon: SkillIcon;
  blurb: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "data",
    label: "Data Engineering",
    icon: "database",
    blurb: "Batch and streaming pipelines, lakehouse modelling and orchestration.",
    skills: [
      "Python",
      "SQL",
      "PySpark",
      "Apache Spark",
      "Databricks",
      "Delta Lake",
      "Apache Airflow",
      "dbt",
      "Kafka",
      "Snowflake",
    ],
  },
  {
    id: "aws",
    label: "AWS",
    icon: "cloud",
    blurb: "Serverless and managed services for lakes and warehouses.",
    skills: ["S3", "Glue", "Lambda", "Redshift", "IAM", "CloudWatch"],
  },
  {
    id: "azure",
    label: "Azure",
    icon: "cloud",
    blurb: "Ingestion, storage and analytics on the Microsoft cloud.",
    skills: ["Azure Data Factory", "ADLS", "Blob Storage", "Synapse Analytics"],
  },
  {
    id: "fullstack",
    label: "Full Stack",
    icon: "layout",
    blurb: "Typed, accessible interfaces backed by clean APIs.",
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "React.js",
      "Next.js",
      "Node.js",
      "FastAPI",
      "REST APIs",
    ],
  },
  {
    id: "databases",
    label: "Databases",
    icon: "server",
    blurb: "Relational, document and warehouse engines.",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Snowflake"],
  },
  {
    id: "devops",
    label: "DevOps & Tools",
    icon: "wrench",
    blurb: "Version control, containers and delivery automation.",
    skills: ["Git", "GitHub", "Docker", "CI/CD", "Linux", "WSL"],
  },
  {
    id: "ai",
    label: "AI & Automation",
    icon: "sparkles",
    blurb: "LLM-powered workflows and automation around data.",
    skills: [
      "Generative AI",
      "LLMs",
      "Python Automation",
      "AI Workflows",
      "Data Analytics",
    ],
  },
];
