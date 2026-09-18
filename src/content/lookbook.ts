export type LookCategory = "clients" | "ceremony" | "business" | "casual" | "women";

export const lookCategories: { id: LookCategory; label: string }[] = [
  { id: "clients", label: "Our clients" },
  { id: "ceremony", label: "Weddings & black tie" },
  { id: "business", label: "Business" },
  { id: "casual", label: "Smart casual" },
  { id: "women", label: "Women" },
];

export const lookbookIntro =
  "Trends and looks from around the world — from streetwear to style icons — to help you discover what you love and which details express it. Send us any reference picture and we'll construct it to your measurements.";

export const lookbookQuote = { text: "People will stare. Make it worth their while.", author: "Harry Winston" };

export const looks: { src: string; alt: string; category: LookCategory }[] = [
  { src: "/media/4d38a-2025-08-29.webp", alt: "Client in a double-breasted black dinner suit", category: "clients" },
  { src: "/media/adabb-2025-08-11.webp", alt: "Three clients in custom suits outdoors", category: "clients" },
  { src: "/media/aae13-2025-09-03.webp", alt: "Client in a camel overcoat", category: "clients" },
  { src: "/media/e0154-2025-08-26.webp", alt: "Client in a white dinner jacket", category: "clients" },
  { src: "/media/96c81-2025-08-13.webp", alt: "Grey sports jacket detail", category: "clients" },
  { src: "/media/01c34-jesseandson-client.webp", alt: "Client in a rust-orange suit", category: "clients" },
  { src: "/media/5abe0-jesseandson-vs-competitors.webp", alt: "Clients with the Jesse & Son team in store", category: "clients" },
  { src: "/media/73d3e-groom-bridesmaid-tailoring-for-bangkok-weddings.webp", alt: "Groom in a royal blue suit with his bride", category: "ceremony" },
  { src: "/media/ea026-amarvir-103-1200x800-1.webp", alt: "Wedding ceremony in Bangkok", category: "ceremony" },
  { src: "/media/6935d-best-tailor.webp", alt: "Black tuxedo with satin lapels", category: "ceremony" },
  { src: "/media/2f289-custom-suits-for-executives-why-top-ceos-choose-jesse-son.webp", alt: "Navy suit with pocket square", category: "business" },
  { src: "/media/28d7f-suits-for-diplomats-dressing-ambassadors-with-bespoke-precision.webp", alt: "Executive in a navy suit", category: "business" },
  { src: "/media/7505a-best-suits-for-bangkok-weather.webp", alt: "Light grey suit in the office", category: "business" },
  { src: "/media/cd991-image7.webp", alt: "Smiling man in a grey suit", category: "business" },
  { src: "/media/733ef-best-suit-tailor-bangkok-1.webp", alt: "Royal blue two-piece suit", category: "business" },
  { src: "/media/aefd5-image6.webp", alt: "Beige three-piece suit", category: "casual" },
  { src: "/media/a0cc3-image8.webp", alt: "Linen jacket by the sea", category: "casual" },
  { src: "/media/3cbce-image3.webp", alt: "Light shirt and chinos in the city", category: "casual" },
  { src: "/media/27383-best-tailor-jacket-1.webp", alt: "Teal blazer with white trousers", category: "casual" },
  { src: "/media/82271-image11.webp", alt: "Woman in a navy suit on a Bangkok street", category: "women" },
  { src: "/media/76983-custom-tailor.webp", alt: "Rust tailored blazer", category: "women" },
  { src: "/media/5e54d-image5.webp", alt: "Woman in a tailored coat at night", category: "women" },
  { src: "/media/a4ccb-bespoke-suit.webp", alt: "Black women's trouser suit", category: "women" },
  { src: "/media/3404f-bespoke-womenswear-fabrics.webp", alt: "Fitting a women's blazer", category: "women" },
];
