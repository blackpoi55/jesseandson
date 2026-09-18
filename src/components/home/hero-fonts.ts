import { Cinzel, Cormorant_Garamond, Great_Vibes } from "next/font/google";

// Fonts of the home opener only, so other pages don't download them.

/** Trajan-style capitals for the wordmark and headline. */
const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cinzel",
  display: "swap",
});

/** Garamond italics for the ampersand, tagline and buttons. */
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

/** Hand-lettered script for "Made to Measure". */
const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-great-vibes",
  display: "swap",
});

export const heroFonts = [cinzel.variable, cormorant.variable, greatVibes.variable].join(" ");
