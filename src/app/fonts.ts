import { Cinzel, Cormorant_Garamond, Great_Vibes, Jost } from "next/font/google";

/** Trajan-style capitals for the wordmark and hero display. */
export const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cinzel",
  display: "swap",
});

/** Editorial serif for headlines and italic accents. */
export const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

/** Clean geometric sans for body copy and UI. */
export const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
});

/** Hand-lettered script for signature accents ("Made to Measure"). */
export const script = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-great-vibes",
  display: "swap",
});

export const fontVariables = [cinzel.variable, cormorant.variable, jost.variable, script.variable].join(" ");
