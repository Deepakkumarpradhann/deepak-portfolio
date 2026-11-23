/**
 * Timeline data. Edit freely.
 *
 * Optional fields you can add to any entry (they render automatically when present):
 *   - `url`: company / university website
 *   - `tags`: extra technology chips
 * Add certifications to `certifications` below; the block is hidden while the array is empty.
 */
export interface TimelineEntry {
  id: string;
  type: "work" | "education";
  title: string;
  org: string;
  location?: string;
  period: string;
  current?: boolean;
  url?: string;
  points: string[];
  tags?: string[];
}

export const timeline: TimelineEntry[] = [
  {
    id: "aetherrise",
    type: "work",
    title: "Data Engineer",
    org: "Aetherrise Solutions",
    location: "Bangalore",
    period: "Jun 2025 – Present",
    current: true,
    points: [
      "Built 40+ scalable ETL/ELT pipelines in Python, SQL, PySpark, Databricks and Apache Airflow for automated ingestion, transformation and processing.",
      "Maintain AWS pipelines on S3, Glue, Lambda and Redshift, cutting manual data-processing effort by 70%.",
      "Integrate data from SQL databases, MongoDB, REST APIs, CSV, Excel and JSON sources for downstream analytics.",
      "Run Airflow DAGs for scheduled ingestion and pipeline execution.",
      "Handle production support and root cause analysis, keeping pipelines at 99.9% availability.",
    ],
    tags: ["Databricks", "PySpark", "Airflow", "AWS Glue", "Redshift"],
  },
  {
    id: "workplace-analytics",
    type: "work",
    title: "Data Engineer",
    org: "Workplace Analytics Pvt. Ltd.",
    location: "Bangalore",
    period: "Nov 2023 – Jun 2025",
    points: [
      "Built 20+ ETL/ELT pipelines with Python, SQL, PySpark and Apache Airflow.",
      "Designed star-schema models and optimized SQL, improving processing performance by 40%.",
      "Implemented incremental loading so only new and modified records are processed.",
      "Added 50+ automated data quality and validation checks with Python and dbt.",
      "Implemented Slowly Changing Dimensions to keep history for accurate reporting.",
      "Tuned ETL workflows and SQL transformations for 2× faster processing.",
    ],
    tags: ["dbt", "Star schema", "SCD", "Data quality"],
  },
  {
    id: "vssut",
    type: "education",
    title: "B.Tech, Information Technology",
    org: "Veer Surendra Sai University of Technology (VSSUT), Burla",
    period: "2021 – 2024",
    points: [],
  },
];

export const certifications: { name: string; issuer: string; year: string }[] = [];
