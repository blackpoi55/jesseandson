export type NavChild = { label: string; href: string; description?: string; image?: string };
export type NavItem = { label: string; href: string; children?: NavChild[] };

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Products",
    href: "/products",
    children: [
      { label: "Men", href: "/products/men", description: "Suits, blazers, shirts, overcoats & tuxedos", image: "/media/733ef-best-suit-tailor-bangkok-1.webp" },
      { label: "Women", href: "/products/women", description: "Suits, blazers, dresses, skirts & coats", image: "/media/76983-custom-tailor.webp" },
      { label: "Fabrics", href: "/products/fabrics", description: "Handpicked cloth from the world's mills", image: "/media/1bbe4-ee9f1-1633604348404.webp" },
      { label: "Shoes", href: "/products/shoes", description: "Goodyear-welted, made for your feet", image: "/media/eeeb0-custom-leather-shoes.webp" },
      { label: "360° Showroom", href: "/showroom", description: "Drag to turn the suit all the way round", image: "/media/360/navy/06.webp" },
    ],
  },
  {
    label: "How it works",
    href: "/process",
    children: [
      { label: "Our tailoring process", href: "/process", description: "From first visit to final fitting", image: "/media/830f3-nzy3m2rjzwitmzqwns00ownhlwzlodytmtq5nduzotm5nguy-1-1.webp" },
      { label: "Details & construction", href: "/craftsmanship", description: "Horsehair canvas, horn buttons & more", image: "/media/e51f1-1-horsehair-canvas.webp" },
    ],
  },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Pricing", href: "/pricing" },
  { label: "Look book", href: "/lookbook" },
  { label: "FAQ", href: "/faq" },
  { label: "Journal", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const footerNav = {
  explore: [
    { label: "About us", href: "/about" },
    { label: "Look book", href: "/lookbook" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "Journal", href: "/blog" },
    { label: "FAQ", href: "/faq" },
  ],
  services: [
    { label: "Men's tailoring", href: "/products/men" },
    { label: "Women's tailoring", href: "/products/women" },
    { label: "Fabrics", href: "/products/fabrics" },
    { label: "Custom shoes", href: "/products/shoes" },
    { label: "360° Showroom", href: "/showroom" },
    { label: "Tailoring process", href: "/process" },
    { label: "Details & construction", href: "/craftsmanship" },
    { label: "Price guide", href: "/pricing" },
  ],
};
