export type Garment = {
  id: string;
  name: string;
  description: string;
  image: string;
  /** Links to the construction details page when the garment has a detail section. */
  construction?: "jacket" | "shirt" | "pants";
};

export const menIntro: string = "At Jesse & Son we are distinct in our quality and fit, and stay true to providing the best clothing at appropriate prices. It is not only about the experience in our store — it's clothing crafted to serve you for many years to come.";

export const womenIntro: string = "We are distinct in our quality and fit and stay true to providing the best clothing at appropriate prices — pieces crafted to serve you for years, with every detail shaped around you.";

export const menGarments: Garment[] = [
  {
    id: "suits",
    name: "Suits",
    description: "Whether it is a regular-cut, solid-color business suit, a slim fitted suit with European flair, or something in between, the suit is a staple in every man's wardrobe. Versatile for a wedding, an important meeting or daily work-wear, every man should have a hand-crafted, fully customised suit fitted specifically for himself.",
    image: "/media/733ef-best-suit-tailor-bangkok-1.webp",
    construction: "jacket",
  },
  {
    id: "blazers",
    name: "Blazers",
    description: "Blazers are a vital part of a man's closet — professional, yet dressed down and comfortable at the same time. Patterned or plain, they give the same masculine silhouette as a suit while pairing easily with jeans, chinos or dress pants.",
    image: "/media/27383-best-tailor-jacket-1.webp",
    construction: "jacket",
  },
  {
    id: "shirts",
    name: "Shirts",
    description: "Custom dress shirts are all about fabric quality, comfort and fit — they sit directly on your body like a second skin. No wardrobe is complete without a few. Getting the fit and fabric right matters, because you wear them daily and should feel confident at all times.",
    image: "/media/79f2d-shirt-tailor-bangkok.webp",
    construction: "shirt",
  },
  {
    id: "pants",
    name: "Pants",
    description: "Perfectly tailored pants show you are attentive to detail. They visually lengthen your legs, making you appear leaner and taller — and adapt to any occasion, from a matching suit jacket for a formal look to a patterned shirt for something more relaxed.",
    image: "/media/0ff5a-bangkok-tailor-1.webp",
    construction: "pants",
  },
  {
    id: "waistcoat",
    name: "Waistcoats",
    description: "A waistcoat adds formality when made into a three-piece ensemble, and variation and style when worn on its own with casual shirts and pants. Skip the jacket entirely and add a vest to your dress shirt for semi-formal occasions.",
    image: "/media/d5f69-best-tailor-bangkok.webp",
  },
  {
    id: "overcoats",
    name: "Overcoats",
    description: "Worn over the shirt and jacket, overcoats come in a variety of fabric weights and three lengths — short, knee length and full length. They keep you warm through winter and protect you from harsh weather while adding a sense of distinction.",
    image: "/media/f0b9d-tailor-bangkok.webp",
  },
  {
    id: "tuxedo",
    name: "Tuxedos",
    description: "A formal suit with black facings on the lapels, buttons and along the trouser out-seam. Typically black or midnight blue, worn with a formal shirt, a waistcoat or cummerbund and a bow tie — for weddings, galas and black-tie events.",
    image: "/media/6935d-best-tailor.webp",
  },
];

export const womenGarments: Garment[] = [
  {
    id: "suits",
    name: "Suits",
    description: "Whether you work in a conservative law firm, a trendy media business, or need a suit that is right for an interview, a tailored suit is vital to your closet — fitting perfectly, complementing your physique, and making you look credible and professional.",
    image: "/media/a4ccb-bespoke-suit.webp",
    construction: "jacket",
  },
  {
    id: "blazers",
    name: "Blazers",
    description: "The ladies' blazer is a staple, high-impact piece with great fashion potential — glamorous, formal or effortlessly casual. Pair it with skirts, dress pants or jeans, from the office to evening drinks.",
    image: "/media/76983-custom-tailor.webp",
    construction: "jacket",
  },
  {
    id: "shirts",
    name: "Shirts",
    description: "A masterfully tailored shirt is the highlight of a professional woman's outfit. Express your personal taste through custom collars, cuffs and fabrics — and make a powerful first impression.",
    image: "/media/1ac0d-custom-shirt.webp",
    construction: "shirt",
  },
  {
    id: "dresses",
    name: "Dresses",
    description: "Professional and sophisticated, work dresses move seamlessly from the workplace to dinners and social events. From subtle hues to bolder colors, various necklines and silhouettes — mix and match with accessories for a classic or contemporary style.",
    image: "/media/1777f-bespoke-clothes.webp",
  },
  {
    id: "pants",
    name: "Pants",
    description: "Polished dress pants or relaxed casual fabrics — modern or classic fit, high waist or regular, straight or tapered. Find the perfect match for every occasion; your attention to detail will not go unnoticed.",
    image: "/media/2cb8a-custom-trousers.webp",
    construction: "pants",
  },
  {
    id: "skirts",
    name: "Skirts",
    description: "A tailored skirt — straight, A-line or pencil — flatters the figure like nothing else. Chic at the office and versatile enough for the evening. Pair with a shirt and jacket for a full professional look, or soft knitwear for something casual.",
    image: "/media/9c32c-custom-suit.webp",
  },
  {
    id: "overcoat",
    name: "Overcoats",
    description: "Crafted with meticulous attention to detail from the best angora wool, a custom overcoat protects you from the cold while adding style to function — customisable in length and style for the winter months.",
    image: "/media/18aad-custom-overcoat.webp",
  },
];

export const menAccessories: Garment[] = [
  {
    id: "neckties",
    name: "Neckties",
    description: "A large collection in silk, satin, cotton and linen — vibrant hues to pastel tones, plains and the latest patterns — to look sharp at every occasion.",
    image: "/media/8a6cf-custom-tailor-bangkok.webp",
  },
  {
    id: "bowties",
    name: "Bow ties",
    description: "Silk and satin bow ties in plains and unique patterns — from the classic shape to butterfly, arrow point and diamond tip.",
    image: "/media/7880b-custom-suit-bangkok.webp",
  },
  {
    id: "pocket-squares",
    name: "Pocket squares",
    description: "Express your individuality with patterns, colors and folds. Customisable for weddings and special occasions, with monogramming in silk, linen or cotton.",
    image: "/media/e9062-suit-bangkok.webp",
  },
  {
    id: "cufflinks",
    name: "Cufflinks",
    description: "Silk knot cufflinks in solids and multi-color weaves — the easiest way to add a pop of color to your shirts.",
    image: "/media/3ee5f-cufflinks.webp",
  },
  {
    id: "lapel-pins",
    name: "Lapel pins",
    description: "The most underused accessory — a gesture of elegance that turns a great suit into a memorable one. Flower designs in solid colors and combinations.",
    image: "/media/b5357-mens-suit-bangkok.webp",
  },
];
