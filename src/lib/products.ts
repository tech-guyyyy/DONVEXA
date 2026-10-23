export type Product = {
  slug: string;
  title: string;
  creator: string;
  type: string;
  format: string;
  price: number;
  description: string;
  cover: string;
  accent: string;
  text: string;
  featured?: boolean;
};

// Development-only catalogue content. Replace with Supabase data in a later milestone.
export const mockProducts: Product[] = [
  {
    slug: "the-art-of-starting-small",
    title: "The Art of Starting Small",
    creator: "Mara Adeyemi",
    type: "Guide",
    format: "PDF · 48 pages",
    price: 6800,
    description: "A quiet, practical guide to turning a good idea into a useful first release.",
    cover: "bg-[#d8c6ae]",
    accent: "text-[#574332]",
    text: "text-[#f6f1e8]",
    featured: true,
  },
  {
    slug: "notes-on-a-useful-life",
    title: "Notes on a Useful Life",
    creator: "Dayo Okafor",
    type: "E-book",
    format: "EPUB + PDF",
    price: 5200,
    description: "Essays on attention, craft, and making room for the work that matters.",
    cover: "bg-[#45544f]",
    accent: "text-[#d5d8ca]",
    text: "text-[#f6f1e8]",
  },
  {
    slug: "field-notes-for-the-curious",
    title: "Field Notes for the Curious",
    creator: "Nneka Bello",
    type: "Workbook",
    format: "PDF · 72 pages",
    price: 7400,
    description: "Prompts and frameworks for observing more closely and thinking with intention.",
    cover: "bg-[#9e5e43]",
    accent: "text-[#f5d9bd]",
    text: "text-[#2f211b]",
  },
  {
    slug: "a-room-for-making",
    title: "A Room for Making",
    creator: "Tomi Eze",
    type: "Collection",
    format: "PDF · 36 pages",
    price: 4600,
    description: "A compact collection for building a more generous creative practice.",
    cover: "bg-[#c7c0b4]",
    accent: "text-[#3c3833]",
    text: "text-[#f6f1e8]",
  },
];

export function formatNaira(amount: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}