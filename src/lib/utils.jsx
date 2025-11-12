import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Combines class names safely
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
