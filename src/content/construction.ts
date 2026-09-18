export const constructionQuote = "“Quality is not an act, it's a habit.” — Aristotle";

export const constructionIntro =
  "We serve you with the finest craftsmanship and reach you on a personal level, building trust and comfort along the way. Custom tailoring is a quiet luxury — insight into what complements your body and personality. At Jesse & Son you won't only customise from an array of options; your clothes are made with refined techniques and construction methods, which matter just as much.";

export type ConstructionPart = {
  id: "jacket" | "shirt" | "pants";
  label: string;
  title: string;
  image: string;
  details: { title: string; body: string; image: string }[];
  options: string[];
};

export const construction: ConstructionPart[] = [
  {
    id: "jacket",
    label: "Suit jacket",
    title: "Built from the inside out.",
    image: "/media/69240-jacket.webp",
    details: [
      {
        title: "Horsehair canvas",
        body: "High-quality horsehair canvas extended to the lapels and suiting components gives superior drape, structure and fit — and makes the suit feel light.",
        image: "/media/e51f1-1-horsehair-canvas.webp",
      },
      {
        title: "Reinforced arm stitching",
        body: "A sturdier jacket, without sacrificing fit or mobility.",
        image: "/media/836ad-jacket-arm.webp",
      },
      {
        title: "Soft collar",
        body: "Hand-felled collar felts keep the collar crisp and sturdy for years to come.",
        image: "/media/f3eba-3-soft-collar.webp",
      },
      {
        title: "Shoulder pad & sleeve head",
        body: "Lightweight cotton shoulder pads and canvassed sleeve heads, perfectly curved for comfort and flexibility — so sleeves fall cleanly from the shoulder.",
        image: "/media/79208-4-sleevehead-shoulderpad-01.webp",
      },
      {
        title: "Buttons",
        body: "Defined buttonholes and horn buttons as standard — the mark of a quality jacket.",
        image: "/media/bcf2f-5-buttons.webp",
      },
    ],
    options: [
      "Number and style of sleeve buttons",
      "Monograms",
      "Functional sleeve buttonholes",
      "Lapel pick stitching",
      "Custom Bemberg lining colors",
    ],
  },
  {
    id: "shirt",
    label: "Shirt",
    title: "A second skin, finished by hand.",
    image: "/media/2c08c-shirt-1-resized-testing.webp",
    details: [
      {
        title: "Mother-of-pearl buttons",
        body: "Cross-stitched and reinforced for strength. Mother-of-pearl buttons come standard on every shirt.",
        image: "/media/499a8-bcc93-1-buttons.webp",
      },
      {
        title: "Interlining",
        body: "Quality cotton interlinings in collars and cuffs keep their shape through countless washes.",
        image: "/media/a572d-2-collar.webp",
      },
      {
        title: "Flat-felled seams",
        body: "Durable and pucker-resistant.",
        image: "/media/4f7f5-dsc02376-3.webp",
      },
      {
        title: "Pattern matching",
        body: "Fabric patterns are matched on every joining edge.",
        image: "/media/b9c9d-4-shirt-pattern.webp",
      },
      {
        title: "Custom fit",
        body: "Fitted to you, drawing on your best features.",
        image: "/media/5df07-5-custom-fit.webp",
      },
    ],
    options: [
      "Collar and cuff styles",
      "Split back yoke",
      "Collar and cuff trims",
      "Buttonhole colors",
      "Pocket shapes",
    ],
  },
  {
    id: "pants",
    label: "Pants",
    title: "Comfort you can see.",
    image: "/media/3110e-e9337-ea874-ac9db-pants2.webp",
    details: [
      {
        title: "Waistband",
        body: "Rubberised strips keep your shirt tucked in, while waistband interlinings hold the shape and structure of the waist.",
        image: "/media/e2ad8-1-waistband.webp",
      },
      {
        title: "Lining",
        body: "Lined at the front to the knee and up through the waistband, so the fabric drapes properly and wears comfortably. All wool and suit pants are lined as standard.",
        image: "/media/10bcb-13b1e-2-lining.webp",
      },
      {
        title: "Double stitching",
        body: "Double-stitched crotch and hip seams for strength in daily wear.",
        image: "/media/2f539-3-pants-details-and-construction.webp",
      },
      {
        title: "Flawless fit",
        body: "Cut to your measurements and refined at every fitting.",
        image: "/media/13acb-4-fit.webp",
      },
    ],
    options: [
      "Turn-up cuffs",
      "Back pocket styles",
      "Heel-protective cuffs",
      "Front closure",
      "Leg break",
    ],
  },
];
