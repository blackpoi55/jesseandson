export type FabricGroup = "suiting" | "shirting" | "outerwear";

export type Fabric = {
  id: string;
  group: FabricGroup;
  name: string;
  composition: string;
  description: string;
  note?: string;
  image: string;
};

export const fabricGroups: { id: FabricGroup; label: string }[] = [
  { id: "suiting", label: "Suiting" },
  { id: "shirting", label: "Shirting" },
  { id: "outerwear", label: "Coats & linings" },
];

export const fabricsIntro: string = "Our fabric collection is handpicked from dozens of mills around the world for brilliance, durability and comfort. A large selection of elegant patterns and luxurious cloths gives you the most choice and value at every price point — whatever the purpose or occasion.";

export const fabricsSelection: string = "We offer only the finest handpicked fabrics that create the best silhouettes and structure for their purpose. Luxurious hand feel and excellent long-term performance are just a few of the qualities we look for when personally selecting every cloth.";

export const fabrics: Fabric[] = [
  {
    id: "superfine-blend",
    group: "suiting",
    name: "SuperFine Blend",
    composition: "30% – 60% wool",
    description: "Our economical suiting range of wool and microfiber blends — soft to the hand, comfortable, durable and famously easy to care for. Light to medium weights make it an excellent choice for suits, professional attire and uniforms.",
    image: "/media/56f46-1-superfine-blend1900-1.webp",
  },
  {
    id: "superfine-woolrich",
    group: "suiting",
    name: "SuperFine WoolRich Blend",
    composition: "70% – 95% wool",
    description: "Extremely good value: a luxurious hand feel and excellent drape, with the durability and reduced wrinkling of microfiber. Medium weights in colors and patterns suited to every occasion, all year round.",
    note: "Every cloth carries the label of its mill. Have it sewn into your jacket, with a selvedge sewn into the trouser pocket hem as proof of composition.",
    image: "/media/2d295-2-super-fine-wool-rich452-2.webp",
  },
  {
    id: "pure-wool",
    group: "suiting",
    name: "Pure Wool",
    composition: "100% merino worsted, 100s – 120s",
    description: "Finely woven merino with a beautiful sheen. Breathable in hot months and warm in winter, the tight weave holds the drape of a suit and returns to shape after folding or stretching. Medium weights for all-year wear.",
    note: "Mill label included; a selvedge is always sewn into the inner hem of every trouser side pocket.",
    image: "/media/cb77c-pure-wool.webp",
  },
  {
    id: "italian-english",
    group: "suiting",
    name: "Italian & English Mills",
    composition: "110s – 150s, mohair, wool-silk, linen",
    description: "Our world-class section, used by the tailoring houses of Hugo Boss, Prada, Armani, Zegna and Canali. We source from famous mills including Zegna, Vitale Barberis Canonico, Loro Piana, Drago and Reda — in light, medium and heavy weights.",
    image: "/media/5bb41-6-italian-443-3.webp",
  },
  {
    id: "linen",
    group: "suiting",
    name: "Linen",
    composition: "100% linen",
    description: "Light and medium weights, perfect for summer jackets and pants. A high natural luster, soft to the touch, durable and relatively easy to care for — in a complete range from light hues to dark tones.",
    image: "/media/b23b2-4-linen-505-4.webp",
  },
  {
    id: "cotton",
    group: "suiting",
    name: "Cotton",
    composition: "Casual suits & chinos",
    description: "Better breathability and water absorption than wool, and better suited to wearing as separates. Light to medium weights ideal for chinos all year round, from khaki and olive to blues and blacks — colorfast, prewashed and soft-finished.",
    image: "/media/09e2d-3-cotton-1900-8.webp",
  },
  {
    id: "superfine-cotton-blend",
    group: "shirting",
    name: "SuperFine Cotton Blend",
    composition: "Cotton-polyester",
    description: "Stronger and more durable than 100% cotton with minimal shrinkage. High color fastness and wrinkle resistance make it ideal for daily work-wear and uniforms, in light and medium weights.",
    image: "/media/8fd89-1-superfine-cotton-blend.webp",
  },
  {
    id: "superior-cotton",
    group: "shirting",
    name: "Superior Cotton",
    composition: "100% cotton, 40/1 & compact 60/1",
    description: "A smooth, light hand feel in oxford, dobby and twill weaves. Some cloths carry a liquid-ammonia or silky finish for extra softness and wrinkle resistance — great breathability and value for daily dress shirts.",
    image: "/media/a0136-2.webp",
  },
  {
    id: "premium-cotton",
    group: "shirting",
    name: "Premium Cotton",
    composition: "100% cotton, 70/1, 80/2 & 100/2-ply",
    description: "Compact yarns for a smoother, crisper hand feel and excellent breathability. Treated with liquid ammonia or silky finish for a long-lasting luster, softness and wrinkle resistance.",
    image: "/media/a091d-cotton-shirt.webp",
  },
  {
    id: "luxury-cotton",
    group: "shirting",
    name: "Luxury Cotton",
    composition: "Egyptian cotton, 120/2-ply",
    description: "Our finest shirting: extra-long staple Egyptian cotton with a silky feel and a luster like no other. Herringbone, twills and poplins in plains and patterns, for extra distinction in your dress shirts.",
    note: "Mill label available to be sewn into your shirts.",
    image: "/media/37324-4-luxury-cotton.webp",
  },
  {
    id: "soktas",
    group: "shirting",
    name: "SÖKTAŞ",
    composition: "Egyptian & organic cotton, silk & linen blends",
    description: "The silent shirting brand behind many luxury houses. Includes stretch blends with elastane, plus 'Non Iron', 'Easy Care' and 'Flat Finish' fabrics for wrinkle-free, stay-fresh shirts without ammonia.",
    image: "/media/9ddb2-soktas-swatch-1.webp",
  },
  {
    id: "linen-shirting",
    group: "shirting",
    name: "Linen Shirting",
    composition: "100% linen",
    description: "Lightweight, cool and far more absorbent than cotton — a great casual option. Linen softens with every wash while its durable structure lasts for years.",
    image: "/media/ed487-5-linen-shirt3a.webp",
  },
  {
    id: "angora-wool",
    group: "outerwear",
    name: "Angora Wool",
    composition: "Angora & wool blend",
    description: "A very soft, silky overcoat fabric that insulates better than pure wool while keeping an airy lightness. A full range of colors, responsibly sourced.",
    image: "/media/22085-angora-wool.webp",
  },
  {
    id: "bemberg",
    group: "outerwear",
    name: "Bemberg Linings",
    composition: "Cupro from cotton linter",
    description: "A natural-fiber lining that breathes cool air, absorbs moisture quickly and stops fabric clinging — for an elegant silhouette at all times. The standard lining on every suit we make, as used by Hugo Boss, Zegna and Giorgio Armani.",
    image: "/media/7a96b-bemberg-lining1000.webp",
  },
];
