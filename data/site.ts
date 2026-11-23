/**
 * Single source of truth for personal details. Edit here, not in components.
 * Social URLs come from environment variables; a link is hidden when its URL is empty.
 */
export const site = {
  name: "Deepak Kumar Pradhan",
  shortName: "Deepak",
  initials: "DP",
  role: "Data Engineer | Full Stack Developer | AI Enthusiast",
  headline: "Engineering Scalable Data Platforms & Intelligent Digital Experiences.",
  description:
    "Portfolio of Deepak Kumar Pradhan: data engineer, full stack developer and AI enthusiast building scalable ETL/ELT platforms, cloud data lakes and modern web applications.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "deepakkumarpradhan441@gmail.com",
  phone: "+91-7325876684",
  location: "Bangalore, India",
  github: process.env.NEXT_PUBLIC_GITHUB_URL ?? "",
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "",
  profileImage: process.env.NEXT_PUBLIC_PROFILE_IMAGE ?? "",
  availability: {
    open: true,
    label: "Open to data engineering roles",
  },
  stats: [
    { value: 40, suffix: "+", label: "ETL/ELT pipelines built" },
    { value: 70, suffix: "%", label: "less manual processing effort" },
    { value: 99.9, suffix: "%", label: "production pipeline availability" },
    { value: 50, suffix: "+", label: "automated data quality checks" },
  ],
} as const;

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
] as const;
