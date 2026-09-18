import clsx, { type ClassValue } from "clsx";
import manifest from "./media-manifest.json";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

const dims = manifest as unknown as Record<string, [number, number]>;

/** Intrinsic width/height of an image in /public/media (falls back to 4:3). */
export function mediaSize(src: string): { width: number; height: number } {
  const [width, height] = dims[src] ?? [1600, 1200];
  return { width, height };
}
