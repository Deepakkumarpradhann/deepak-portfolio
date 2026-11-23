export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function hsl(h: number, s = 90, l = 60, a = 1): string {
  return `hsl(${h} ${s}% ${l}% / ${a})`;
}
