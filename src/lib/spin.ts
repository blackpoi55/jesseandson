/** Frame URLs for a look stored in /public/media/360/<look>/01.webp … */
export function spinFrames(look: string, count = 72) {
  return Array.from({ length: count }, (_, i) => `/media/360/${look}/${String(i + 1).padStart(2, "0")}.webp`);
}
