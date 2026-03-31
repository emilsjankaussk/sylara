export const PRODUCTS = [
  {
    id: "1",
    slug: "icelandic-volcano-face-body-scrub",
    name: "Icelandic Volcano Face & Body Scrub",
    price: 38.00,
    description: "A deep-cleansing ritual powered by volcanic minerals and bioactive prebiotics. This multi-tasking scrub removes impurities while supporting your skin's natural barrier.",
    images: ["/assets/images/gen2.webp", "/assets/images/RcUnk7vYXMOjbeABmG-hm1-YwDvaYfAW.webp"],
    tags: ["Prebiotics", "Volcanic Ash", "Exfoliating"]
  },
  {
    id: "2",
    slug: "hand-body-wash-ginger-smoky-cardamom",
    name: "Hand & Body Wash (Ginger & Cardamom)",
    price: 24.00,
    description: "Refresh your senses with the warming notes of ginger and smoky cardamom. A gentle, non-stripping formula designed for daily use.",
    images: ["/assets/images/RcUnk7vYXMOjbeABmG-hm1-YwDvaYfAW.webp", "/assets/images/gen2.webp"],
    tags: ["Botanical", "Sulfate-Free", "Aromatic"]
  },
  {
    id: "3",
    slug: "hydrating-serum",
    name: "Bio-Active Hydrating Serum",
    price: 45.00,
    description: "Deeply hydrate and plump your skin with multi-molecular hyaluronic acid and fermented botanical extracts. The ultimate foundation for any ritual.",
    images: ["/assets/images/gen2.webp"],
    tags: ["Hyaluronic Acid", "Prebiotics", "Glow"]
  },
  {
    id: "4",
    slug: "antioxidant-ginkgo-gel-booster",
    name: "Antioxidant Ginkgo Gel Booster",
    price: 42.00,
    description: "Protect your skin from environmental stressors with this concentrated gel booster. Infused with Ginkgo Biloba and Vitamin C.",
    images: ["/assets/images/RcUnk7vYXMOjbeABmG-hm1-YwDvaYfAW.webp"],
    tags: ["Vitamin C", "Antioxidant", "Protection"]
  },
  {
    id: "5",
    slug: "retinol-alternative-serum",
    name: "Natural Retinol Alternative Serum",
    price: 52.00,
    description: "A gentle yet powerful serum that targets fine lines and uneven texture using botanical bakuchiol. All the results of retinol, without the irritation.",
    images: ["/assets/images/gen2.webp"],
    tags: ["Bakuchiol", "Anti-Aging", "Gentle"]
  }
];

export const CATEGORIES = [
  {
    slug: "all",
    name: "All Products",
    description: "Explore our complete range of bioactive skincare formulas, designed to support your skin's natural rhythm.",
    productIds: ["1", "2", "3", "4", "5"]
  },
  {
    slug: "face-care",
    name: "Face Care",
    description: "Targeted solutions for a radiant, healthy complexion.",
    productIds: ["1", "3", "4", "5"]
  },
  {
    slug: "body-care",
    name: "Body Care",
    description: "Nourish your body with botanical-rich rituals.",
    productIds: ["1", "2"]
  },
  {
    slug: "bundles",
    name: "Bundles & Gifts",
    description: "Curated routines and sets to kickstart your SYLARA journey.",
    productIds: ["3", "5"]
  }
];

export const BLOG_POSTS = [
  {
    id: "p1",
    slug: "barrier-repair",
    title: "Why Ceramides are the Secret to a Healthy Skin Barrier",
    content: "<p>Discover how incorporating ceramides into your PM routine can transform dry, irritated skin into a resilient, glowing complexion.</p><p>Ceramides are lipids that make up about 50% of the skin's composition. They are crucial for maintaining the skin's moisture barrier and protecting against environmental pollutants.</p>",
    images: ["/assets/images/gen2.webp"],
    createdAt: "2026-03-15"
  },
  {
    id: "p2",
    slug: "am-routine",
    title: "The Perfect 3-Step AM Routine for Glowing Skin",
    content: "<p>Keep it simple but effective. Here's exactly what you need every morning to protect and hydrate your skin all day long.</p><ul><li>Step 1: Gentle Cleanse</li><li>Step 2: Hydrating Serum</li><li>Step 3: SPF Protection</li></ul>",
    images: ["/assets/images/RcUnk7vYXMOjbeABmG-hm1-YwDvaYfAW.webp"],
    createdAt: "2026-03-20"
  }
];
