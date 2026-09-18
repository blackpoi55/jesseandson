import { Bodoni_Moda, Jost, Newsreader } from "next/font/google";

/** High-contrast Didone for mastheads, headlines and numerals — the magazine voice. */
export const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-bodoni",
  display: "swap",
});

/** Text serif for leads, pull quotes and long-form reading. */
export const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-newsreader",
  display: "swap",
});

/** Geometric sans for labels, captions and UI. */
export const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
});

export const fontVariables = [bodoni.variable, newsreader.variable, jost.variable].join(" ");
