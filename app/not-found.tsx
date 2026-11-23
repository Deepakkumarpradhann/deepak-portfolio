import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="grid min-h-screen place-items-center px-4 text-center">
      <div>
        <p className="font-mono text-sm uppercase tracking-[0.3em] text-cyan">404</p>
        <h1 className="mt-3 font-display text-5xl font-bold">
          <span className="text-gradient">Page not found</span>
        </h1>
        <p className="mt-4 text-muted">That page doesn&apos;t exist or has moved.</p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-full bg-gradient-to-r from-electric via-violet to-cyan px-6 py-3 font-medium text-white"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
