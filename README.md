# Deepak Kumar Pradhan · 3D Futuristic Portfolio

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS · Framer Motion · GSAP · Three.js / React Three Fiber / Drei · Lucide

## Quick start

```bash
npm install
cp .env.example .env.local   # optional, see below
npm run dev                  # http://localhost:3000
```

Other scripts: `npm run build`, `npm start`, `npm run typecheck`, `npm run lint`.
Requires Node 18.18 or newer.

## Make it yours (5 minutes)

| What | Where |
| --- | --- |
| Name, email, phone, stats, availability | `data/site.ts` |
| GitHub / LinkedIn / profile photo | `.env.local` (`NEXT_PUBLIC_GITHUB_URL`, `NEXT_PUBLIC_LINKEDIN_URL`, `NEXT_PUBLIC_PROFILE_IMAGE`) |
| Skills and categories | `data/skills.ts` |
| Services (7 offerings) | `data/services.ts` |
| Jobs, education, certifications | `data/experience.ts` |
| The 13 projects (and repo links) | `data/projects.ts` |

**Links never point nowhere.** The GitHub and LinkedIn buttons only render when their URL is set. A project's GitHub button only renders when that project has a `repo` URL. The "Live Demo" button opens that project's page at its interactive walkthrough.

**Demo vs production.** Every project card carries a "Demo project" badge because the projects run on sample data. Your employer work lives in the Experience timeline, so the two are never mixed up. Only remove a badge if the project is a real deployed product.

**Photo.** Drop `profile.jpg` in `public/` and set `NEXT_PUBLIC_PROFILE_IMAGE=/profile.jpg`. Until then the hero shows an animated "DP" avatar.

**Resume.** "Download Resume" opens `/resume`, a print-ready page built from your data files; use **Save as PDF / Print** to export a PDF. To use your own PDF instead, put it at `public/resume.pdf` and point the button in `components/Hero.tsx` at `/resume.pdf` with a normal `<a download>`.

**Contact form.** Validated on the client and the server (`app/api/contact/route.ts`). Set `RESEND_API_KEY` (plus `CONTACT_TO_EMAIL` / `CONTACT_FROM_EMAIL`) to have messages emailed to you. Without a key the form opens the visitor's email app with the message pre-filled.

## Project structure

```
app/
  layout.tsx            fonts, metadata, theme script, loader, cursor, page transition
  page.tsx              home: Hero → About → Skills → Services → Projects → Experience → Contact
  projects/[slug]/      statically generated detail page + interactive walkthrough
  resume/               print-ready resume
  api/contact/route.ts  contact form endpoint
  sitemap.ts, robots.ts, icon.svg, not-found.tsx
components/
  Navbar, Hero, About, Skills, SkillOrbit, Services, Experience,
  Projects, ProjectCard, ProjectThumb, ProjectDemo, Contact, Footer
  Background3D (lazy WebGL), CustomCursor, PageTransition, TransitionLink,
  MagneticButton, Reveal, Loader, BackToTop, ThemeProvider, ThemeToggle
data/                   site, skills, services, projects, experience
lib/                    hooks, validation, utils
```

## Performance, accessibility, SEO

- The WebGL scene (`Background3D`) is loaded with `next/dynamic` (`ssr: false`) after first paint. Phones and tablets get a lighter scene (fewer particles, no pointer tracking); users with *reduce motion* get no WebGL, no loader, no transition sweep and no custom cursor.
- Project thumbnails are generated gradients and icons, so there are no image files to download.
- Custom cursor and magnetic buttons only activate on fine-pointer desktops.
- Keyboard-navigable tabs (arrow keys) and filters, skip link, visible focus rings, labelled form fields with `aria-invalid` errors, live regions for status messages.
- Per-page metadata, Open Graph, `sitemap.xml`, `robots.txt` and Person JSON-LD. Set `NEXT_PUBLIC_SITE_URL` to your real domain.

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. In Vercel choose **Add New → Project**, import the repo. The Next.js preset is detected automatically; leave build settings at their defaults.
3. Under **Settings → Environment Variables** add the values from `.env.example` (at minimum `NEXT_PUBLIC_SITE_URL` with your final domain; add the social URLs and `RESEND_API_KEY` if you want them).
4. Click **Deploy**. Later pushes to `main` redeploy automatically.

CLI alternative: `npm i -g vercel && vercel --prod`.

After the first deploy, update `NEXT_PUBLIC_SITE_URL` to the live URL and redeploy so the sitemap and social previews use it.
