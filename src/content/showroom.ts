/**
 * Looks in the 360° showroom. Each is shown as a live 3D model; the image
 * sequence in /public/media/360/<id>/ is the poster, thumbnail and fallback.
 */
export type ShowroomLook = {
  id: "navy" | "charcoal" | "tuxedo";
  frames: number;
  name: string;
  tagline: string;
  specs: { label: string; value: string }[];
  details: string[];
  links: { label: string; href: string }[];
};

export const showroomLooks: ShowroomLook[] = [
  {
    id: "navy",
    frames: 72,
    name: "The Navy Two-Piece",
    tagline: "The suit every wardrobe is built around.",
    specs: [
      { label: "Cloth", value: "Navy wool twill" },
      { label: "Lapel", value: "Notch, natural roll" },
      { label: "Front", value: "Single-breasted, two buttons" },
      { label: "Lining", value: "Burgundy Bemberg" },
      { label: "Wear it to", value: "The office, every day after" },
    ],
    details: ["Horn buttons", "Flap pockets & breast welt", "Centre vent", "Mother-of-pearl buttons on the shirt"],
    links: [
      { label: "Men's suits", href: "/products/men#suits" },
      { label: "Suiting fabrics", href: "/products/fabrics" },
    ],
  },
  {
    id: "charcoal",
    frames: 72,
    name: "The Chalk-Stripe Peak",
    tagline: "A stronger line for the boardroom.",
    specs: [
      { label: "Cloth", value: "Charcoal chalk-stripe wool" },
      { label: "Lapel", value: "Peak" },
      { label: "Front", value: "Single-breasted, two buttons" },
      { label: "Lining", value: "Navy Bemberg" },
      { label: "Wear it to", value: "Meetings, dinners, occasions" },
    ],
    details: ["Stripes matched at the seams", "Horn buttons", "Flap pockets & breast welt", "Centre vent"],
    links: [
      { label: "Details & construction", href: "/craftsmanship#jacket" },
      { label: "Italian & English mills", href: "/pricing" },
    ],
  },
  {
    id: "tuxedo",
    frames: 72,
    name: "The Midnight Tuxedo",
    tagline: "Black tie, cut to measure.",
    specs: [
      { label: "Cloth", value: "Black barathea" },
      { label: "Lapel", value: "Satin shawl collar" },
      { label: "Front", value: "Single button" },
      { label: "Pockets", value: "Satin-jetted" },
      { label: "Wear it to", value: "Weddings, galas, black tie" },
    ],
    details: ["Formal shirt with studs", "Bow tie", "Pocket square in white"],
    links: [
      { label: "Men's tuxedos", href: "/products/men#tuxedo" },
      { label: "Wedding tailoring", href: "/blog/groom-bridesmaid-tailoring-for-bangkok-weddings" },
    ],
  },
];

export const showroomNote =
  "Live 3D preview. Every look can be cut in any cloth from our library.";
