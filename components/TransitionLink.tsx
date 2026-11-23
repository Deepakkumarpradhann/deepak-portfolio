"use client";

import Link from "next/link";
import { usePageTransition } from "./PageTransition";

interface Props extends Omit<React.ComponentProps<typeof Link>, "href" | "onClick"> {
  href: string;
}

/** Next.js Link that plays the page transition. Modified clicks (new tab etc.) behave normally. */
export function TransitionLink({ href, children, ...rest }: Props) {
  const { navigate } = usePageTransition();
  return (
    <Link
      href={href}
      {...rest}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();
        navigate(href);
      }}
    >
      {children}
    </Link>
  );
}
