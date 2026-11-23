/**
 * Project data. Every entry here is a portfolio / demo project built on sample data.
 * Production work done for employers is described in data/experience.ts instead,
 * which is why every card carries a "Demo project" badge.
 *
 * To link a real repository, set `repo` on the entry (full https URL).
 * The GitHub button is hidden when `repo` is not set, so no button points nowhere.
 */
export type ProjectCategory = "data" | "fullstack" | "ai";

export const categoryLabels: Record<ProjectCategory | "all", string> = {
  all: "All",
  data: "Data Engineering",
  fullstack: "Full Stack",
  ai: "AI & Automation",
};

export interface Stage {
  name: string;
  detail: string;
}

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  summary: string;
  description: string;
  stack: string[];
  /** Two hue values (0-360) used to generate the thumbnail and glow. */
  hues: [number, number];
  glyph: "layers" | "stream" | "lake" | "medal" | "chart" | "flow" | "cart" | "dashboard" | "briefcase" | "wallet" | "brain" | "bot" | "doc";
  repo?: string;
  stages: Stage[];
  highlights: string[];
  sample: { caption: string; columns: string[]; rows: string[][] };
}

export const projects: Project[] = [
  // ───────────── Data Engineering ─────────────
  {
    slug: "ecommerce-data-platform",
    title: "E-commerce Data Engineering Platform",
    category: "data",
    summary:
      "Batch platform that turns raw e-commerce files and APIs into analytics-ready Gold tables.",
    description:
      "A batch data platform for large-scale e-commerce data arriving as CSV, JSON, REST API payloads and relational extracts. It follows a medallion layout in Databricks, with Airflow handling scheduling, retries and failure handling.",
    stack: ["AWS", "PySpark", "Databricks", "Airflow", "SQL"],
    hues: [215, 265],
    glyph: "layers",
    stages: [
      { name: "Ingest", detail: "CSV, JSON, REST API and database extracts land in S3 with run metadata." },
      { name: "Bronze", detail: "Raw data stored as-is in Delta tables, partitioned by ingestion date." },
      { name: "Silver", detail: "Cleansing, deduplication, type casting and schema enforcement." },
      { name: "Gold", detail: "Aggregated, analytics-ready tables for orders, customers and revenue." },
      { name: "Orchestrate", detail: "Airflow DAGs with dependencies, retries, logging and alerts." },
    ],
    highlights: [
      "Watermark-based incremental pipelines on partitioned datasets, so the full dataset is never reprocessed.",
      "Medallion architecture: Bronze for raw ingestion, Silver for cleansing, Gold for analytics-ready data.",
      "Airflow orchestration with scheduling, retries, task dependencies, logging and failure handling.",
    ],
    sample: {
      caption: "Gold layer: daily revenue by category (sample data)",
      columns: ["order_date", "category", "orders", "revenue_inr"],
      rows: [
        ["2026-03-01", "Electronics", "1,284", "₹48,12,300"],
        ["2026-03-01", "Fashion", "2,016", "₹21,45,890"],
        ["2026-03-01", "Home", "742", "₹9,87,420"],
        ["2026-03-02", "Electronics", "1,331", "₹50,01,775"],
      ],
    },
  },
  {
    slug: "realtime-streaming-pipeline",
    title: "Real-Time Streaming Data Pipeline",
    category: "data",
    summary: "Event stream from Kafka to a queryable lakehouse table with sub-minute freshness.",
    description:
      "A streaming pipeline that consumes clickstream events from Kafka, validates and enriches them with Spark Structured Streaming, and writes them to Delta Lake for near-real-time dashboards.",
    stack: ["Kafka", "Spark Structured Streaming", "Delta Lake", "Python", "Docker"],
    hues: [190, 250],
    glyph: "stream",
    stages: [
      { name: "Produce", detail: "A Python producer emits synthetic clickstream events to Kafka topics." },
      { name: "Consume", detail: "Spark Structured Streaming reads topics with checkpointing for exactly-once writes." },
      { name: "Validate", detail: "Schema checks route malformed events to a dead-letter topic." },
      { name: "Enrich", detail: "Stream-static join adds product and user attributes." },
      { name: "Serve", detail: "Delta tables with micro-batch triggers feed dashboards." },
    ],
    highlights: [
      "Checkpointed streaming writes so a restart resumes where it stopped.",
      "Dead-letter topic keeps bad records out of the main table without losing them.",
      "Docker Compose setup brings up Kafka and Spark locally in one command.",
    ],
    sample: {
      caption: "Streaming output: events per minute (sample data)",
      columns: ["window_start", "event_type", "events", "late_events"],
      rows: [
        ["10:00:00", "page_view", "5,420", "12"],
        ["10:00:00", "add_to_cart", "611", "2"],
        ["10:01:00", "page_view", "5,687", "9"],
        ["10:01:00", "purchase", "143", "0"],
      ],
    },
  },
  {
    slug: "aws-etl-data-lake",
    title: "AWS ETL Data Lake",
    category: "data",
    summary: "Serverless S3 data lake with Glue jobs, Lambda triggers and Redshift serving.",
    description:
      "A serverless ETL data lake on AWS. Files landing in S3 trigger Lambda, Glue jobs convert them to partitioned Parquet, and curated tables are loaded into Redshift for BI queries.",
    stack: ["S3", "Glue", "Lambda", "Redshift", "IAM", "CloudWatch"],
    hues: [28, 330],
    glyph: "lake",
    stages: [
      { name: "Land", detail: "Source files arrive in a raw S3 bucket with lifecycle rules." },
      { name: "Trigger", detail: "S3 events invoke Lambda, which starts the right Glue job." },
      { name: "Transform", detail: "Glue PySpark jobs clean data and write partitioned Parquet." },
      { name: "Load", detail: "Curated data is loaded into Redshift with COPY." },
      { name: "Monitor", detail: "CloudWatch metrics and alarms track job failures and runtime." },
    ],
    highlights: [
      "Least-privilege IAM roles per job instead of one shared role.",
      "Partitioned Parquet cuts scan cost for downstream queries.",
      "CloudWatch alarms on job failure and unusual runtime.",
    ],
    sample: {
      caption: "Glue job run log (sample data)",
      columns: ["job", "rows_in", "rows_out", "duration"],
      rows: [
        ["orders_clean", "1,204,553", "1,198,201", "3m 12s"],
        ["customers_clean", "310,442", "310,442", "1m 05s"],
        ["products_clean", "48,210", "48,176", "0m 41s"],
      ],
    },
  },
  {
    slug: "databricks-medallion",
    title: "Databricks Medallion Architecture",
    category: "data",
    summary: "Reference Bronze/Silver/Gold lakehouse with Delta Lake quality gates.",
    description:
      "A reference lakehouse in Databricks demonstrating the medallion pattern end to end: Auto Loader ingestion, Delta Lake MERGE upserts, expectations-style data quality gates and a Gold semantic layer.",
    stack: ["Databricks", "Delta Lake", "PySpark", "SQL"],
    hues: [255, 195],
    glyph: "medal",
    stages: [
      { name: "Bronze", detail: "Auto Loader ingests raw files incrementally into Delta." },
      { name: "Quality gate", detail: "Rules on nulls, ranges and uniqueness quarantine bad rows." },
      { name: "Silver", detail: "MERGE upserts keep one current row per business key." },
      { name: "Gold", detail: "Star-schema facts and dimensions for reporting." },
    ],
    highlights: [
      "MERGE-based upserts with idempotent re-runs.",
      "Quarantine table for rows that fail quality rules.",
      "Time travel used to audit and roll back a bad load.",
    ],
    sample: {
      caption: "Quality gate summary (sample data)",
      columns: ["table", "checked", "passed", "quarantined"],
      rows: [
        ["silver_orders", "52,100", "51,934", "166"],
        ["silver_customers", "8,420", "8,420", "0"],
        ["silver_payments", "49,877", "49,801", "76"],
      ],
    },
  },
  {
    slug: "financial-analytics-pipeline",
    title: "Financial Data Analytics Pipeline",
    category: "data",
    summary: "Banking transaction pipeline with fraud-oriented quality checks and SCD Type 2 history.",
    description:
      "An end-to-end pipeline for customer, account and transaction data from banking-style sources, with incremental loading, PySpark tuning and dimensional models built for fraud and risk reporting.",
    stack: ["AWS", "PySpark", "dbt", "Airflow", "SQL"],
    hues: [160, 220],
    glyph: "chart",
    stages: [
      { name: "Extract", detail: "Customer, account and transaction data pulled incrementally." },
      { name: "Validate", detail: "Checks for duplicate transactions, nulls, invalid amounts and schema drift." },
      { name: "Transform", detail: "PySpark with partitioning, broadcast joins and coalesce for efficiency." },
      { name: "Model", detail: "Fact and dimension tables with SCD Type 2 for history." },
      { name: "Schedule", detail: "Airflow runs the DAG and surfaces failures." },
    ],
    highlights: [
      "Improved processing efficiency by 40% across the end-to-end pipeline.",
      "Incremental and partition-based loading cut unnecessary full-data processing by 45%.",
      "PySpark tuning (partitioning, broadcast joins, coalesce) reduced processing time by 35%.",
      "Quality checks reduced data-quality issues by 40%; SCD Type 2 improved reporting accuracy by 30%.",
    ],
    sample: {
      caption: "Quality check results (sample data)",
      columns: ["check", "records", "flagged", "action"],
      rows: [
        ["duplicate_txn_id", "2,410,000", "1,284", "dropped"],
        ["null_account_id", "2,410,000", "37", "quarantined"],
        ["amount <= 0", "2,410,000", "212", "quarantined"],
        ["schema_drift", "—", "0", "none"],
      ],
    },
  },
  {
    slug: "elt-pipeline-dbt",
    title: "End-to-End ELT Pipeline with dbt",
    category: "data",
    summary: "Snowflake ELT with dbt staging, marts, tests and docs, orchestrated by Airflow.",
    description:
      "An ELT pipeline that loads raw data into Snowflake and models it with dbt: staging models, incremental marts, schema and data tests, and generated documentation, all scheduled from Airflow.",
    stack: ["Snowflake", "dbt", "Airflow", "SQL", "Git", "CI/CD"],
    hues: [275, 200],
    glyph: "flow",
    stages: [
      { name: "Load", detail: "Raw tables loaded into Snowflake by an Airflow task." },
      { name: "Stage", detail: "dbt staging models rename, cast and standardise columns." },
      { name: "Mart", detail: "Incremental fact models and dimensions for analytics." },
      { name: "Test", detail: "dbt tests for unique, not-null and accepted values." },
      { name: "Document", detail: "dbt docs publish lineage and column descriptions." },
    ],
    highlights: [
      "Incremental models process only new and changed rows.",
      "Tests run in CI on every pull request before merge.",
      "Lineage graph makes it clear which dashboards a change affects.",
    ],
    sample: {
      caption: "dbt test results (sample data)",
      columns: ["model", "tests", "passed", "warn/fail"],
      rows: [
        ["stg_orders", "6", "6", "0"],
        ["fct_orders", "9", "9", "0"],
        ["dim_customers", "7", "7", "0"],
      ],
    },
  },

  // ───────────── Full Stack ─────────────
  {
    slug: "modern-ecommerce-app",
    title: "Modern E-commerce Application",
    category: "fullstack",
    summary: "Storefront with search, filters, cart and checkout flow.",
    description:
      "A responsive e-commerce storefront with product search, category filters, persistent cart and a multi-step checkout, backed by a REST API and PostgreSQL.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL"],
    hues: [320, 220],
    glyph: "cart",
    stages: [
      { name: "Browse", detail: "Server-rendered product listing with filters and search." },
      { name: "Cart", detail: "Client cart state persisted between visits." },
      { name: "Checkout", detail: "Multi-step form with validation and order summary." },
      { name: "API", detail: "REST endpoints for products and orders on Node.js." },
      { name: "Data", detail: "PostgreSQL schema for products, orders and customers." },
    ],
    highlights: [
      "Server components for fast first paint on listing pages.",
      "Accessible forms with inline validation.",
      "Typed API contracts shared between client and server.",
    ],
    sample: {
      caption: "Order summary (sample data)",
      columns: ["item", "qty", "price"],
      rows: [
        ["Wireless Headphones", "1", "₹2,499"],
        ["USB-C Cable", "2", "₹398"],
        ["Delivery", "1", "₹0"],
      ],
    },
  },
  {
    slug: "saas-dashboard",
    title: "SaaS Dashboard",
    category: "fullstack",
    summary: "Analytics dashboard with KPI tiles, charts, tables and role-based views.",
    description:
      "A multi-tenant style SaaS dashboard with KPI tiles, trend charts, sortable data tables and role-based navigation, built as a reusable component set.",
    stack: ["React.js", "TypeScript", "Tailwind CSS", "FastAPI", "PostgreSQL"],
    hues: [205, 285],
    glyph: "dashboard",
    stages: [
      { name: "Auth", detail: "Role-based access for admin and viewer personas." },
      { name: "KPIs", detail: "Tiles for MRR, active users and churn from the API." },
      { name: "Charts", detail: "Trend and breakdown charts with accessible tooltips." },
      { name: "Tables", detail: "Sorting, filtering and pagination on server data." },
      { name: "API", detail: "FastAPI endpoints with pydantic validation." },
    ],
    highlights: [
      "Reusable chart and table components shared across views.",
      "Server-side pagination keeps large tables responsive.",
      "Keyboard-navigable tables and charts.",
    ],
    sample: {
      caption: "KPI snapshot (sample data)",
      columns: ["metric", "value", "change"],
      rows: [
        ["MRR", "₹12.4L", "+6.2%"],
        ["Active users", "8,420", "+3.1%"],
        ["Churn", "1.8%", "−0.3%"],
      ],
    },
  },
  {
    slug: "job-portal",
    title: "Job Portal Platform",
    category: "fullstack",
    summary: "Job listings, applications and recruiter workflow with search and filters.",
    description:
      "A job portal where candidates search and apply while recruiters post roles and move applicants through a pipeline, with full-text search and saved filters.",
    stack: ["Next.js", "TypeScript", "Node.js", "MongoDB", "REST APIs"],
    hues: [235, 170],
    glyph: "briefcase",
    stages: [
      { name: "Search", detail: "Full-text search with location, role and experience filters." },
      { name: "Apply", detail: "Application form with resume upload and validation." },
      { name: "Recruit", detail: "Recruiters post jobs and manage applicant stages." },
      { name: "Notify", detail: "Status changes trigger email notifications." },
    ],
    highlights: [
      "Text indexes in MongoDB for fast job search.",
      "Kanban-style applicant pipeline for recruiters.",
      "Input validation on both client and server.",
    ],
    sample: {
      caption: "Applicant pipeline (sample data)",
      columns: ["stage", "candidates"],
      rows: [
        ["Applied", "48"],
        ["Screening", "21"],
        ["Interview", "9"],
        ["Offer", "2"],
      ],
    },
  },
  {
    slug: "personal-finance-manager",
    title: "Personal Finance Management Application",
    category: "fullstack",
    summary: "Track income, expenses and budgets with category insights.",
    description:
      "A personal finance app to record income and expenses, set monthly budgets per category and see spending trends, with CSV import for bank statements.",
    stack: ["React.js", "TypeScript", "FastAPI", "PostgreSQL", "Docker"],
    hues: [150, 240],
    glyph: "wallet",
    stages: [
      { name: "Record", detail: "Add transactions manually or import a CSV statement." },
      { name: "Categorise", detail: "Rule-based categories with manual overrides." },
      { name: "Budget", detail: "Monthly budgets with progress and overspend warnings." },
      { name: "Insights", detail: "Charts of spending by category and month." },
    ],
    highlights: [
      "CSV import with column mapping and duplicate detection.",
      "Budget progress bars that warn before overspending.",
      "Dockerised API and database for one-command setup.",
    ],
    sample: {
      caption: "Monthly budget (sample data)",
      columns: ["category", "budget", "spent"],
      rows: [
        ["Groceries", "₹8,000", "₹6,420"],
        ["Transport", "₹3,000", "₹2,150"],
        ["Dining", "₹4,000", "₹4,380"],
      ],
    },
  },
  {
    slug: "ai-web-app",
    title: "AI-Powered Web Application",
    category: "fullstack",
    summary: "Web app that adds LLM-generated summaries and answers to user content.",
    description:
      "A full stack application where users upload notes or documents and get LLM-generated summaries and question answering, with streaming responses and conversation history.",
    stack: ["Next.js", "TypeScript", "FastAPI", "LLMs", "PostgreSQL"],
    hues: [290, 190],
    glyph: "brain",
    stages: [
      { name: "Upload", detail: "Documents are parsed and split into chunks." },
      { name: "Embed", detail: "Chunks are embedded and stored for retrieval." },
      { name: "Ask", detail: "Questions retrieve relevant chunks as context for the LLM." },
      { name: "Stream", detail: "Answers stream token by token to the UI." },
    ],
    highlights: [
      "Retrieval keeps answers grounded in the uploaded document.",
      "Streaming responses for a responsive feel.",
      "Prompt and response logging for debugging quality.",
    ],
    sample: {
      caption: "Question answering log (sample data)",
      columns: ["question", "chunks used", "latency"],
      rows: [
        ["Summarise section 2", "4", "2.1s"],
        ["What is the refund period?", "2", "1.4s"],
        ["List the action items", "5", "2.6s"],
      ],
    },
  },

  // ───────────── AI & Automation ─────────────
  {
    slug: "ai-workflow-automation",
    title: "AI Workflow Automation Platform",
    category: "ai",
    summary: "Chain triggers, data steps and LLM actions into scheduled automations.",
    description:
      "A workflow engine where automations are defined as steps: triggers, data fetch, transformation and LLM actions, with run history, retries and alerts.",
    stack: ["Python", "FastAPI", "LLMs", "Airflow", "Docker"],
    hues: [265, 175],
    glyph: "bot",
    stages: [
      { name: "Trigger", detail: "Schedule, webhook or file arrival starts a run." },
      { name: "Fetch", detail: "Steps pull data from APIs and databases." },
      { name: "Reason", detail: "An LLM step classifies, extracts or summarises." },
      { name: "Act", detail: "Results are written to a table, email or chat message." },
      { name: "Observe", detail: "Run history with retries and failure alerts." },
    ],
    highlights: [
      "Each step is retried independently with backoff.",
      "LLM outputs are validated against a schema before use.",
      "Run history makes failures easy to replay.",
    ],
    sample: {
      caption: "Recent runs (sample data)",
      columns: ["workflow", "status", "duration"],
      rows: [
        ["Daily report summary", "success", "18s"],
        ["Invoice extraction", "success", "42s"],
        ["Ticket triage", "retry (1)", "1m 05s"],
      ],
    },
  },
  {
    slug: "intelligent-data-assistant",
    title: "Intelligent Data Processing Assistant",
    category: "ai",
    summary: "Assistant that profiles messy files, suggests cleaning steps and generates the code.",
    description:
      "An assistant for messy tabular data. It profiles a file, flags problems, proposes cleaning steps in plain language and generates the pandas or PySpark code, which the user reviews before running.",
    stack: ["Python", "Pandas", "PySpark", "LLMs", "FastAPI"],
    hues: [180, 300],
    glyph: "doc",
    stages: [
      { name: "Profile", detail: "Column types, nulls, duplicates and outliers are summarised." },
      { name: "Suggest", detail: "An LLM proposes cleaning steps from the profile." },
      { name: "Generate", detail: "Steps become reviewable pandas or PySpark code." },
      { name: "Review", detail: "The user approves before anything runs." },
      { name: "Export", detail: "Cleaned data and the script are downloaded together." },
    ],
    highlights: [
      "Human review step before generated code runs.",
      "Profiling happens locally; only summaries go to the model.",
      "The generated script is exported so the cleaning is repeatable.",
    ],
    sample: {
      caption: "Profile summary (sample data)",
      columns: ["column", "type", "nulls", "issue"],
      rows: [
        ["order_date", "string", "0", "mixed date formats"],
        ["amount", "string", "14", "currency symbols"],
        ["customer_id", "int", "0", "12 duplicates"],
      ],
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
