/** Price tiers from the original price list: 1 = $ … 4 = $$$$. */
export type Tier = 1 | 2 | 3 | 4;

export const pricingIntro = [
  "At Jesse & Son we provide premium bespoke tailoring for men and women — and we believe clear, honest pricing matters as much as craftsmanship. Prices are set by fabric category and garment type, so you can match your style, performance needs and budget.",
  "Suits start from THB 11,500 depending on fabric and construction. Send us your requirements for an exact quote.",
];

export const shirtStandards = [
  "Colorfast, yarn-dyed and preshrunk fabrics",
  "Mother-of-pearl buttons as standard",
];

export const shirtTiers: { name: string; body: string; tier: Tier }[] = [
  { name: "Superfine Cotton Blend", body: "A cotton-rich blend with reliable performance, easy care and everyday comfort.", tier: 1 },
  { name: "Superior Cotton", body: "Pure, soft cotton with a crisp finish and natural comfort for everyday wear.", tier: 2 },
  { name: "Premium Cotton", body: "Fine compact yarns — a crisp feel, superior breathability and lasting comfort.", tier: 2 },
  { name: "Luxury Cotton", body: "The finest Egyptian cotton: exceptional softness, lightweight comfort, natural luster.", tier: 3 },
  { name: "SÖKTAŞ", body: "World-class fabrics renowned for craftsmanship, comfort and elegant performance.", tier: 3 },
  { name: "Linen", body: "Naturally cool and breathable, softening over time while staying durable.", tier: 3 },
];

export const suitStandards = [
  {
    title: "Premium suit construction",
    body: "Every suit is built with a standard half-canvassed lapel for a beautiful, natural lapel roll.",
  },
  {
    title: "Premium customisation package",
    body: "Upgrade with mother-of-pearl, corozo nut or buffalo horn buttons, premium Japanese Bemberg lining and handmade Milanese buttonholes.",
  },
];

export type SuitFabric = {
  name: string;
  body?: string;
  tier: Tier;
  variants?: { name: string; tier: Tier }[];
};

export const suitCollections: { title: string; intro: string; items: SuitFabric[] }[] = [
  {
    title: "All-year blends & casuals",
    intro: "Durable, breathable options for everyday professional wear and smart-casual styling.",
    items: [
      {
        name: "Basic Blend (10% – 20% wool)",
        body: "Our economical entry-level suiting — holds its shape with good structure, easy to care for and highly durable, in various weaves and weights.",
        tier: 1,
      },
      {
        name: "Bamboo Blend",
        body: "Bamboo's softness, durability and eco-friendliness paired with microfiber's wrinkle resistance — a high-performance, breathable suit with a textured weave.",
        tier: 1,
      },
      {
        name: "Linen Blend",
        body: "Linen's breathability and natural texture with microfiber's easy care — a refined, high-performance suit with a subtle textured weave.",
        tier: 1,
      },
      {
        name: "Superfine Blend (45% – 60% wool)",
        body: "Our standard suiting selection: soft, comfortable, durable and functional, in light to medium weights for suits and professional clothing.",
        tier: 1,
      },
      {
        name: "Cotton (casual / chinos)",
        body: "Breathable casual suiting and chinos for all year round — khaki and olive to blues and blacks, colorfast, prewashed and soft-finished.",
        tier: 1,
      },
    ],
  },
  {
    title: "Premium & pure wool",
    intro: "For luxurious drape, enhanced breathability and distinctive textures in every season.",
    items: [
      {
        name: "Superfine Blend Wool Rich (70% – 85% wool)",
        body: "Extremely good value — a luxurious hand feel and excellent drape with reduced wrinkling, in medium weights for all occasions.",
        tier: 2,
      },
      {
        name: "100% Linen Suiting",
        body: "Light and medium weights with a high natural luster — the classic summer jacket and pants, in light hues to dark tones.",
        tier: 2,
      },
      {
        name: "Pure Wool (100% merino, 100s – 130s)",
        body: "Extremely fine weaves with a beautiful sheen — breathable in the heat, warm in winter, and quick to recover its shape.",
        tier: 2,
      },
      {
        name: "Wool Silk Linen / Wool Silk Bamboo / Hopsack",
        body: "Beautiful textures for smart-casual jackets, trousers or relaxed suits — wool's wrinkle resistance, linen's lightness and silk's sheen.",
        tier: 2,
        variants: [
          { name: "Option A — lower silk content", tier: 2 },
          { name: "Option B — higher silk content", tier: 2 },
        ],
      },
    ],
  },
  {
    title: "Winter wool",
    intro: "Insulating, water-resistant cloths for autumn and winter wardrobes abroad.",
    items: [
      {
        name: "Tweed & Flannel",
        body: "Warm, water-resistant and soft from the weaving itself — jackets that don't feel heavy but drape beautifully. Medium to heavy weights.",
        tier: 2,
      },
      {
        name: "Overcoat",
        body: "Pure merino and angora wool with a silky finish — denser and fluffier, with heat retention better than most wools.",
        tier: 2,
      },
    ],
  },
];

export const millsIntro =
  "Our world-class suiting section — the cloth used by the tailoring houses of Hugo Boss, Prada, Armani, Zegna and Canali. Wools from 110s to 150s in light, medium and heavy weights, plus mohair, wool-silk and linens.";

export const millsIncluded =
  "Every fabric in this range already includes your choice of mother-of-pearl, corozo nut or buffalo horn buttons, Japanese Bemberg lining and handmade Milanese buttonholes.";

export const millFabrics: { name: string; tier: Tier }[] = [
  { name: "Reda 110's / VBC 110's / VBC Hopsack", tier: 3 },
  { name: "VBC 120's & 130's / VBC 120's Tropical / VBC Superfine Kid Mohair", tier: 3 },
  { name: "Reda 130's / Guabello 130's / Drago 130's / VBC Flannel", tier: 3 },
  { name: "VBC 140's / Huddersfield High Twist / VBC Faille", tier: 3 },
  { name: "VBC 150's Barathea / VBC High Twist", tier: 3 },
  { name: "Drago 140's / VBC 150's / VBC Wool & Cashmere / VBC Sateen", tier: 3 },
  { name: "Spence Bryson Irish Linen / E Thomas Wool Silk Linen", tier: 3 },
  { name: "VBC Wool Silk Linen", tier: 4 },
  { name: "VBC 4 Ply", tier: 4 },
  { name: "VBC Wool Silk Solaro", tier: 4 },
  { name: "Zegna Traveller", tier: 4 },
  { name: "Zegna Trofeo", tier: 4 },
];

export const mills = ["Ermenegildo Zegna", "Vitale Barberis Canonico", "Loro Piana", "Drago", "Reda", "Guabello", "Huddersfield", "Spence Bryson", "SÖKTAŞ", "Bemberg"];

export const pricingFaq = [
  {
    q: "How much does a bespoke suit cost in Bangkok?",
    a: "Pricing depends on fabric and customisation. Entry-level fabrics start in the Superfine Blend category, while premium English and Italian cloths sit in higher tiers. We provide a detailed quote once we understand your requirements.",
  },
  {
    q: "Why does fabric affect the price?",
    a: "Higher-grade fabrics use finer yarns and superior weaving, resulting in better drape, breathability and durability. Premium cloths from mills like Zegna offer longevity and comfort that justify their price.",
  },
  {
    q: "What makes Jesse & Son different?",
    a: "Premium English and Italian fabrics, expert craftsmanship, personal service, transparent fixed pricing, and multiple fittings — with a commitment to getting every detail right.",
  },
];
