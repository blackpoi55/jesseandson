export const shoesQuote: string = "“Quality is not an act, it's a habit.” — Aristotle";

export const shoesIntro: string = "Six styles, more than twenty designs, five premium leathers and a shoemaker with over 30 years of experience. Every pair is built on a last adjusted to your feet — and recorded for next time.";

export type Step = { title: string; subtitle?: string; body: string[]; image: string };

export const shoeSteps: Step[] = [
  {
    title: "Design",
    subtitle: "Designing and selecting leather",
    body: [
      "We guide you through our shoe designs and complete customisation options — leather, laces, stitch color, soles and more. We currently offer six types of shoe and more than 20 designs, and we're always open to new ideas.",
      "We select the finest leather available locally and personally ensure each hide meets our premium standard — five types, from Italian wash to nubuck, each in an assortment of colors.",
    ],
    image: "/media/ef87b-1111.webp",
  },
  {
    title: "Measurement",
    body: [
      "Your foot is outlined and measured with great precision in every aspect: length, width, instep, ball and heel. Time is no concern — we listen to every detail, because you know your feet better than anybody else.",
    ],
    image: "/media/61c22-62a09-1-foot-outline.webp",
  },
  {
    title: "Molding",
    subtitle: "Molding and pulling",
    body: [
      "We adjust our lasts to your size and record them for future orders. The upper leather is cut, stitched and fitted with cowhide lining, then pulled over the last.",
    ],
    image: "/media/c7ef8-57f18-3-making-01.webp",
  },
  {
    title: "Construction",
    subtitle: "Sole construction",
    body: [
      "Memory-foam insoles curved to your feet, a choice of flex, rubber or leather soles, and a sole maker with over 30 years of experience.",
      "Our preferred method is Goodyear welting — the most durable and labor-intensive. Its two-level stitching makes resoling easy and adds water resistance and support, for a shoe that could last 20–30 years.",
    ],
    image: "/media/b0f2f-78021-4-making-01.webp",
  },
  {
    title: "Quality check",
    body: [
      "Quality checks happen at every step. After a final inspection the shoes are polished to a shine and sent for your final fitting — and if no adjustments are needed, they're ready to wear.",
    ],
    image: "/media/aae0a-63018-5-checking-01.webp",
  },
];

export const shoeDetails: { title: string; body: string; image: string }[] = [
  {
    title: "Goodyear welt stitch",
    body: "The best construction for comfort and durability — relatively waterproof, easy to repair and resole, with a leather filling that molds to your foot.",
    image: "/media/cef2c-5010-copy.webp",
  },
  {
    title: "Memory-foam insole",
    body: "Conforms to your foot and responds to pressure and temperature — a drastic difference after a long day.",
    image: "/media/1be29-5422-copy.webp",
  },
  {
    title: "Leather upper",
    body: "Full/top grain — the finest option. Nubuck — velvety yet hard-wearing. Patent & woven — glossy, film-coated for added durability.",
    image: "/media/cb481-6bb58-shop-0010-resize.webp",
  },
  {
    title: "Outsole",
    body: "Rubber — the classic thin look. Flex foam — light, bends with your foot, absorbs shock. Leather — breathable, formal, with a distinctive sound in every step.",
    image: "/media/cc602-5033-copy.webp",
  },
  {
    title: "Cowhide lining",
    body: "A thin layer of the softest handpicked cowhide sewn inside the upper for a smooth interior finish.",
    image: "/media/7c7f7-new-4997.webp",
  },
];

export type ShoeType = "oxford" | "derby" | "monk" | "loafer" | "boot";

export const shoeTypes: { id: ShoeType; label: string }[] = [
  { id: "oxford", label: "Oxford" },
  { id: "derby", label: "Derby" },
  { id: "monk", label: "Monk strap" },
  { id: "loafer", label: "Loafer & slip-on" },
  { id: "boot", label: "Boots" },
];

export const shoeModels: { name: string; type: ShoeType; description: string; image: string }[] = [
  { name: "Thomas", type: "oxford", image: "/media/b93d3-os1.webp", description: "Plain Oxford with three-piece stitching and a puff toe unique to the style." },
  { name: "William", type: "oxford", image: "/media/7c416-gwyn-now-actually-william.webp", description: "Plain Oxford with three-piece stitching and a chiseled toe." },
  { name: "Luther", type: "oxford", image: "/media/47a2a-locke-now-actually-luther.webp", description: "Cap-toe Oxford — the classic business shoe, stitched across the toe." },
  { name: "Gwyn", type: "oxford", image: "/media/e66a9-gwyn.webp", description: "Plain Oxford with a unique three-piece stitch and square toe." },
  { name: "Jacob", type: "oxford", image: "/media/af848-os5-1.webp", description: "Wingtip Oxford with distinct broguing and a standard toe." },
  { name: "Anthony", type: "derby", image: "/media/7dd0f-anthony.webp", description: "Cap-toe Derby — a classic business shoe with toe stitching." },
  { name: "Czar", type: "derby", image: "/media/dad32-william-now-actually-czar.webp", description: "Plain Derby with three-piece stitching, a chiseled toe and eloquent design." },
  { name: "Locke", type: "derby", image: "/media/e9d1a-luther-now-actually-locke.webp", description: "Cap-toe Derby with a square toe and open lacing for comfort." },
  { name: "Ray", type: "derby", image: "/media/6fc60-ds4resized.webp", description: "Wingtip Derby with distinct broguing and a rounded toe." },
  { name: "Jack", type: "monk", image: "/media/81966-ms1.webp", description: "Double monk strap with three-piece stitching and a puffed toe." },
  { name: "Bruce", type: "monk", image: "/media/451ce-ms2resized.webp", description: "Double monk strap with three-piece stitching and a chiseled toe." },
  { name: "Arthur", type: "monk", image: "/media/09944-ms3.webp", description: "Double monk strap with a square toe for a better fit." },
  { name: "Blake", type: "loafer", image: "/media/9f6e8-ss1.webp", description: "Slip-on with a chiseled toe and elastic sides for an easy fit." },
  { name: "Adam", type: "loafer", image: "/media/d46b1-ls1.webp", description: "Penny loafer with a saddle strap across the vamp and a rounded toe." },
  { name: "Joshua", type: "loafer", image: "/media/5507c-ls2.webp", description: "Penny loafer with a saddle strap and an apron toe." },
  { name: "Henry", type: "loafer", image: "/media/9af14-ls3.webp", description: "Penny loafer with a saddle strap and a split toe." },
  { name: "James", type: "boot", image: "/media/4c6c1-dbs1resized.webp", description: "Dress boot in the spirit of the cap-toe Derby, with a longer shaft." },
  { name: "Magnus", type: "boot", image: "/media/a2dc1-dbs2resized.webp", description: "Dress boot in the spirit of the wingtip Derby, with a chiseled toe." },
  { name: "Paul", type: "boot", image: "/media/ce8bb-cbs1.webp", description: "Chelsea boot — ankle length, low heel, rounded toe and elastic sides." },
  { name: "George", type: "boot", image: "/media/1f8de-george.webp", description: "Chelsea boot — ankle length and low heel, with a zip fastening." },
];
