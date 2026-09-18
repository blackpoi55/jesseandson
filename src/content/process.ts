export const processQuote = "“I am easily satisfied with the very best.” — Winston Churchill";

export const processIntro = [
  "We welcome walk-ins but encourage appointments made beforehand, so we can allocate the right time and prepare to serve you well.",
  "Having a clear vision of the occasion makes it easier for us to steer you to the right style, design, fit and fabric. Feel free to bring pictures or a garment you love for reference or replication.",
];

export type ProcessStep = {
  id: string;
  title: string;
  subtitle?: string;
  body: string[];
  image: string;
  note?: string;
};

export const processSteps: ProcessStep[] = [
  {
    id: "first-visit",
    title: "First visit",
    subtitle: "Designing and placing an order",
    body: [
      "You'll be paired with one of our representatives to discuss your tastes, preferences and requirements — so the garment is built around your fit and physique.",
      "Fabric is chosen for each item you're interested in, then exact measurements are taken.",
      "Choose from an array of designs — our custom-tailoring menu, magazines and look books — and customise every detail with our guidance. Fittings are arranged around your availability.",
    ],
    note: "Every visit starts with a welcome drink from our signature bar.",
    image: "/media/1ba5d-1633604360055.webp",
  },
  {
    id: "drawing",
    title: "Drawing",
    body: [
      "After the consultation, the tailor records your measurements along with notes on build, stance and posture.",
      "An individual pattern is drafted for every garment, according to the style agreed with you — then archived by our master tailor for future orders.",
    ],
    image: "/media/239fd-2-drawing-01.webp",
  },
  {
    id: "cutting",
    title: "Cutting",
    body: [
      "Once the pattern is drawn to more than 20 of your measurements, a master tailor cuts it by hand.",
      "Your suit is made under their personal supervision, to exacting standards.",
    ],
    image: "/media/6eeec-e7b9b-3-cutting-01resized.webp",
  },
  {
    id: "stitching",
    title: "Stitching",
    body: [
      "Using expertise and instinct, two-dimensional panels are stitched to your measurements and design requirements.",
      "The suit is assembled into a form-fitting garment, with the fabric pattern matched at every seam.",
    ],
    image: "/media/1f7cf-4-stitching-01.webp",
  },
  {
    id: "fitting",
    title: "Fitting",
    body: [
      "Try on your garments so we can make sure everything fits the way you want and every detail is accounted for — torso, arms, length and waist suppression for jackets and shirts; comfort in the seat and your chosen cuff width for pants.",
      "We advise at every step and welcome your feedback throughout. Further fittings can be arranged until you're fully satisfied. When several pieces are ordered, the first sample becomes the specification for the rest.",
    ],
    image: "/media/00d6b-1633604378074.webp",
  },
  {
    id: "delivery",
    title: "Pick-up or delivery",
    body: [
      "Your garments are perfected and ready. After our quality-control process, we can deliver them to your hotel or residence free of charge.",
      "Our team checks that every item is in order, then packs everything beautifully — for delivery, or to carry home.",
    ],
    image: "/media/2bc0f-3cbcb-6-delivery-01resized.webp",
  },
];

export const visitTips = [
  "Have a good vision of the style you're after — but be open to suggestions.",
  "Set aside enough time for fittings.",
  "Have a basic idea of the kind of fabrics you'd like.",
  "Always communicate the fit you want during each fitting.",
  "Look at the clothes you own and note the details you like — and don't.",
];
