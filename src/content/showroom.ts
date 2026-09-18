import type { PhotoSpinSet, SpinDetail } from "@/components/photo-spin";
import type { LookId } from "@/components/mannequin/model";
import studioNavy from "./spins/studio-navy.json";

/**
 * Looks in the 360° showroom. A "photo" look is real turntable photography
 * (see scripts/spin360). A "3d" look is the live 3D dress form, with the
 * image sequence in /public/media/360/<id>/ as its poster, thumbnail and fallback.
 */
type LookBase = {
  name: string;
  tagline: string;
  specs: { label: string; value: string }[];
  links: { label: string; href: string }[];
  thumb: string;
  note: string;
};

export type ShowroomLook =
  /** hotspots: tap points on the photographs; positions and close-ups come from the spin data */
  | (LookBase & { kind: "photo"; id: string; spin: PhotoSpinSet; hotspots: SpinDetail[] })
  | (LookBase & { kind: "3d"; id: LookId; details: string[] });

const note3d = "Live 3D preview. Every look can be cut in any cloth from our library.";

export const showroomLooks: ShowroomLook[] = [
  {
    kind: "photo",
    id: "studio-navy",
    spin: { ...studioNavy, direction: studioNavy.direction === 1 ? 1 : -1 },
    thumb: `${studioNavy.dir}/hq/000.webp`,
    note: "Photographed in our studio, one full turn. Every look can be cut in any cloth from our library.",
    name: "The Navy Check",
    tagline: "A real suit from our studio. Turn it all the way round.",
    specs: [
      { label: "Cloth", value: "Navy tonal check" },
      { label: "Lapel", value: "Peak" },
      { label: "Front", value: "Single-breasted, two buttons" },
      { label: "Pockets", value: "Flap pockets with a ticket pocket" },
      { label: "Back", value: "Side vents" },
    ],
    // SAMPLE COPY: written to fill the layout. Confirm cloth, weights and finishes with the shop.
    hotspots: [
      {
        id: "cloth",
        label: "The cloth",
        title: "Navy tonal check",
        body: "A quiet check woven in two shades of navy. From across the room it reads as plain navy; up close you see the pattern.",
        facts: [
          { label: "Composition", value: "100% wool" },
          { label: "Weight", value: "260 g/m²" },
          { label: "Weave", value: "Twill with a tonal check" },
          { label: "Season", value: "Year-round" },
        ],
      },
      {
        id: "lapel",
        label: "Peak lapel",
        title: "Peak lapel",
        body: "The points rise towards the shoulder and draw the eye up. The lapel is padded by hand so it rolls softly instead of lying flat.",
        facts: [
          { label: "Width", value: "9 cm" },
          { label: "Gorge", value: "Mid-height" },
        ],
      },
      {
        id: "buttons",
        label: "Two-button front",
        title: "Two-button front",
        body: "Fasten the top button only. The cut is balanced around that button, so the jacket closes cleanly at the waist.",
        facts: [
          { label: "Buttons", value: "Horn, sewn by hand" },
          { label: "Stance", value: "Natural waist" },
        ],
      },
      {
        id: "ticket-pocket",
        label: "Ticket pocket",
        title: "Ticket pocket",
        body: "A small flap pocket above the right hip pocket. It comes from English country suits and once held a train ticket.",
        facts: [
          { label: "Pockets", value: "Flap, with ticket pocket" },
          { label: "Breast", value: "Welt pocket" },
        ],
      },
      {
        id: "shoulder",
        label: "Shoulder & sleeve",
        title: "Clean shoulder",
        body: "A light shoulder with a smooth sleeve head, set to follow your own shoulder line so the sleeve hangs without ripples.",
        facts: [
          { label: "Padding", value: "Light" },
          { label: "Sleeve head", value: "Smooth" },
        ],
      },
      {
        id: "cuffs",
        label: "Four-button cuffs",
        title: "Four-button cuffs",
        body: "Four buttons on each sleeve, set close together. We can make them working buttonholes on request.",
        facts: [
          { label: "Buttons", value: "4, kissing" },
          { label: "Buttonholes", value: "Working on request" },
        ],
      },
    ],
    links: [
      { label: "Men's suits", href: "/products/men#suits" },
      { label: "Suiting fabrics", href: "/products/fabrics" },
    ],
  },
  {
    kind: "3d",
    id: "navy",
    thumb: "/media/360/navy/01.webp",
    note: note3d,
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
    kind: "3d",
    id: "charcoal",
    thumb: "/media/360/charcoal/01.webp",
    note: note3d,
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
    kind: "3d",
    id: "tuxedo",
    thumb: "/media/360/tuxedo/01.webp",
    note: note3d,
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

