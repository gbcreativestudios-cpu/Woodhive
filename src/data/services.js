import { IMG } from "../lib/images";

export const SERVICES = [
  {
    slug: "renovation-and-maintenance",
    formName: "renovation-inquiry",
    formUpload: true,
    eyebrow: "Service 01",
    title: "Renovation and Maintenance",
    navLabel: "Renovation & Maintenance",
    description:
      "Flexible renovation, repair, basement finishing and maintenance work for spaces that need structural improvement, fixing, or spatial elevation.",
    points: [
      "Basement finishing and structural repair",
      "Built-in shelving, cabinetry, and trim work",
      "Ongoing maintenance contracts for commercial spaces",
    ],
    img: IMG.renovation,
    galleryCategory: "Renovation & Maintenance",
    ctaLabel: "Need renovation or maintenance work?",
  },
  {
    slug: "wooden-products",
    formName: "products-inquiry",
    formUpload: false,
    eyebrow: "Service 02",
    title: "Wooden Products",
    navLabel: "Wooden Products",
    description:
      "Custom-built mobile carts, check-out stands, stage setups, acoustic panels, and other wood-driven creations engineered for your specific environment.",
    points: [
      "Retail fixtures and mobile carts",
      "Acoustic panels and stage builds",
      "One-off furniture and product design",
    ],
    img: IMG.products,
    galleryCategory: "Wooden Products",
    ctaLabel: "Need a custom wooden product?",
  },
  {
    slug: "rentals",
    formName: "rentals-inquiry",
    formUpload: false,
    eyebrow: "Service 03",
    title: "Rentals",
    navLabel: "Rentals",
    description:
      "Museum-grade event structures, ceremonial arches, backdrops, and modular pieces available to rent for weddings and celebrations.",
    points: [
      "Ceremonial arches and backdrops",
      "Modular staging and lounge structures",
      "Delivery, setup, and teardown included",
    ],
    img: IMG.rentals,
    galleryCategory: "Rentals",
    ctaLabel: "Need something for an event?",
  },
];

export const SERVICES_BY_SLUG = Object.fromEntries(SERVICES.map((s) => [s.slug, s]));
