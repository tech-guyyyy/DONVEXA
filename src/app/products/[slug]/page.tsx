import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Footer, Header, ProductCover } from "@/components/storefront";
import { formatNaira, mockProducts } from "@/lib/products";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export const instant = false;

export function generateStaticParams() {
  return mockProducts.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = mockProducts.find((item) => item.slug === slug);
  return { title: product?.title ?? "Product" };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = mockProducts.find((item) => item.slug === slug);

  if (!product) notFound();

  return (
    <><Header /><main className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 sm:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-12">
      <div className="max-w-xl"><ProductCover product={product} large /><p className="mt-4 text-xs text-warm-gray">Development preview cover using available mock metadata.</p></div>
      <div className="flex flex-col justify-center"><Link href="/products" className="focus-ring eyebrow w-fit hover:text-charcoal">← Back to collection</Link><p className="eyebrow mt-10">Available information</p><h1 className="editorial-display mt-3 max-w-2xl text-5xl leading-none sm:text-7xl">{product.title}</h1><p className="mt-5 text-base text-warm-gray">By {product.creator}</p><dl className="mt-8 grid max-w-xl grid-cols-2 gap-x-6 gap-y-5 border-y border-line py-6 text-sm"><div><dt className="text-warm-gray">Type</dt><dd className="mt-1 font-semibold">{product.type}</dd></div><div><dt className="text-warm-gray">Format</dt><dd className="mt-1 font-semibold">{product.format}</dd></div><div><dt className="text-warm-gray">Price</dt><dd className="mt-1 font-semibold">{formatNaira(product.price)}</dd></div></dl><p className="mt-8 max-w-xl text-lg leading-8 text-charcoal/75">{product.description}</p><section className="mt-8 border-t border-line pt-6" aria-labelledby="missing-information"><h2 id="missing-information" className="text-sm font-semibold">Not included in development data</h2><p className="mt-2 max-w-xl text-sm leading-6 text-warm-gray">File size, licensing information, final cover artwork, purchase actions, and delivery details will be supplied or designed in later phases.</p></section><div className="mt-8 border-t border-line pt-6"><p className="text-sm font-semibold">Purchase actions are not available in this phase.</p><p className="mt-2 text-xs leading-5 text-warm-gray">No cart, checkout, payment, authentication, or download functionality is connected.</p></div></div>
    </main><Footer /></>
  );
}