/**
 * FAQ answers are stored as small HTML strings so in-text links to journal
 * articles from the original site keep working.
 */
export type Faq = { q: string; a: string; category: FaqCategory };
export type FaqCategory = "visit" | "ordering" | "fabrics" | "care";

export const faqCategories: { id: FaqCategory; label: string }[] = [
  { id: "visit", label: "Planning your visit" },
  { id: "ordering", label: "Orders & payment" },
  { id: "fabrics", label: "Fabrics & details" },
  { id: "care", label: "Garment care" },
];

export const faqs: Faq[] = [
  {
    category: "visit",
    q: "What should I prepare before visiting a tailor in Bangkok?",
    a: `<p>Prepare reference images of the styles you like, know your timeline, and consider how you'll use the garment — business, weddings or casual wear. Booking your first consultation early in your trip leaves enough time for fittings and adjustments.</p><p>For practical tips, read our guide to <a href="/blog/top-bespoke-tailors-in-bangkok-for-travelers-a-2026-guide">bespoke tailoring in Bangkok for travellers</a>.</p>`,
  },
  {
    category: "visit",
    q: "How do I choose the right tailor in Bangkok?",
    a: `<p>It depends on your budget, timeline, style and the level of craftsmanship you expect. Review recent customer feedback, understand the tailor's process, and make sure they can meet your timeline — especially on a short visit.</p><p>Explore our guides on <a href="/blog/the-top-15-best-tailors-in-bangkok-2026-guide">how to choose the best tailor in Bangkok</a> and the <a href="/blog/bespoke-tailoring-works-bangkok">bespoke process from start to finish</a>.</p>`,
  },
  {
    category: "visit",
    q: "Is Bangkok a good place to get a bespoke suit?",
    a: `<p>Yes — Bangkok is one of the world's best destinations for bespoke tailoring, balancing craftsmanship, speed and value. Compared with Western cities you can often get a high-quality custom suit at a fraction of the cost, with faster turnaround and multiple fittings included.</p><p>Read our guide to <a href="/blog/best-bespoke-tailors-in-bangkok-for-mens-suits">the best bespoke tailors in Bangkok for men's suits</a>.</p>`,
  },
  {
    category: "visit",
    q: "Can I get a suit tailored in Bangkok in 2 or 3 days?",
    a: `<p>Yes. We offer express tailoring for business travellers and wedding clients needing suits in 48–72 hours — advance booking recommended. It works best when the design is straightforward and fittings are scheduled efficiently.</p><p>Learn more in <a href="/blog/how-tourists-can-get-a-perfect-suit-in-3-days-in-bangkok">how to get a perfect suit in 3 days</a>.</p>`,
  },
  {
    category: "visit",
    q: "How long does it take to make a shirt or a suit?",
    a: `<p>All first-time clients need fittings to ensure a flawless fit. If your time in Bangkok is limited, shirts and pants take a minimum of 2 days and jackets a minimum of 3 days, with at least 1–2 fittings before pick-up. We accommodate rush orders, and can also post items to you after your fittings.</p><p>Send us your schedule in Bangkok and we'll set appointments so you get the complete custom-tailoring experience. Most suits for travellers are completed within 2–4 days.</p>`,
  },
  {
    category: "visit",
    q: "I can't make it to the store — can I still order?",
    a: `<p>If you're in Bangkok but can't visit, email <a href="mailto:info@jesseandson.com">info@jesseandson.com</a> with the items you're interested in — we may be able to send a representative to serve your group at your location.</p><p>Outside Bangkok? Our online ordering lets you browse fabrics, designs and customise every detail — including measurements — just as you would in store.</p>`,
  },
  {
    category: "ordering",
    q: "What is the price of a custom suit?",
    a: `<p>Suits start from THB 11,500 depending on fabric and construction — from wool blends, bamboo blends, linen and linen blends to Italian cloths. See our <a href="/pricing">price guide</a> for the full breakdown.</p>`,
  },
  {
    category: "ordering",
    q: "What payment options do you accept?",
    a: `<p>A 50% deposit is required to commission your clothes. In store we accept cash in major currencies and VISA and Mastercard debit and credit cards. For online orders we accept PayPal, Western Union and mail-order payments.</p>`,
  },
  {
    category: "ordering",
    q: "Is there a minimum order?",
    a: `<p>First-time clients have a minimum of 3 shirts in store; there is no minimum for other products. All prices are fixed, so every client gets the same best price.</p>`,
  },
  {
    category: "ordering",
    q: "Will my measurements be kept for future orders?",
    a: `<p>Yes. Once you've been measured, we keep your measurements on file. When you reorder — in store or online — we'll ask whether to use the same measurements or make refinements, so every piece fits perfectly.</p>`,
  },
  {
    category: "ordering",
    q: "Can you replicate a suit I already own?",
    a: `<p>Absolutely. Bring in your favourite suit or photos, and we can recreate or update the style using our bespoke patterning process.</p>`,
  },
  {
    category: "ordering",
    q: "Do you ship internationally?",
    a: `<p>Yes — we ship worldwide with Thai EMS. Charges depend on destination and package weight, and every parcel includes a tracking number. Duties and customs taxes after posting are the recipient's responsibility.</p>`,
  },
  {
    category: "fabrics",
    q: "What are mother-of-pearl and horn buttons?",
    a: `<p>Mother-of-pearl buttons come from the inner layers of pearl oysters — the hallmark of a quality shirt-maker. They have far more depth than plastic resin and don't degrade with washing. We provide them as standard on every shirt, in Smoke Gray, Royal Blue, Golden Brown or Radiant White.</p><p>Our horn buttons are sustainably made from buffalo horn; each is unique thanks to its natural markings. They are standard on all our suiting — jackets, pants, waistcoats and overcoats — in colors such as Polished Black, Dark Mocha, Tiger and Burnt Orange.</p>`,
  },
  {
    category: "fabrics",
    q: "What is liquid-ammonia finishing?",
    a: `<p>A high-end finishing process that gives shirts a long-lasting bright luster and soft hand feel. It improves wash-and-wear durability, adds wrinkle resistance and minimises shrinkage in cotton.</p>`,
  },
  {
    category: "care",
    q: "How should I care for my shirts?",
    a: `<p><strong>Dry cleaning:</strong> avoid frequent dry cleaning — chemicals and starch can yellow fabric and high-heat pressing damages collars and cuffs. If you do, ask for no starch and hand-pressing.</p><p><strong>Washing:</strong> unbutton everything and remove collar stays. Pre-treat stains, use a quality non-chlorine detergent, and wash by hand or on a delicate cycle below 30°C. Skip the dryer and hang dry.</p><p><strong>Ironing & hanging:</strong> iron while slightly damp, starting on low heat. No starch. Use wide wooden hangers to keep the drape and shape.</p>`,
  },
  {
    category: "care",
    q: "How should I care for my pants?",
    a: `<p><strong>Dry cleaning:</strong> keep it infrequent and ask for hand-pressing with a press cloth and no starch. 100% wool pants should be dry-cleaned at most once every five wears; between wears, air them out, steam out wrinkles, and brush with a soft brush.</p><p><strong>Washing:</strong> non-wool pants can be washed in cool water by hand or on a light, delicate cycle with mild detergent and no bleach. Avoid the dryer.</p><p><strong>Ironing & hanging:</strong> lay wool and linen flat to dry. Iron with a damp press cloth to prevent shine, then hang vertically from clip hangers so their weight restores the shape.</p>`,
  },
  {
    category: "care",
    q: "How should I care for my jackets?",
    a: `<p><strong>Dry cleaning:</strong> only occasionally, when there's visible dirt or odour — heat and chemicals shorten the life of the canvas. Ask for steam or gentle hand pressing. A garment steamer is the best way to refresh and de-wrinkle; spot-treat stains and brush downwards with a soft brush after each wear.</p><p><strong>Ironing & hanging:</strong> iron on mid heat with a damp towel between iron and cloth. Hang on wide wooden hangers with space around the jacket, and rotate your suits so the wool can rest.</p>`,
  },
];
