"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-electric via-violet to-cyan px-5 py-2.5 text-sm font-medium text-white transition hover:brightness-110"
    >
      <Printer size={16} aria-hidden /> Save as PDF / Print
    </button>
  );
}
