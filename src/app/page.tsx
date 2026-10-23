import Link from "next/link";
import { Footer, Header, ProductCard, ProductCover } from "@/components/storefront";
import { mockProducts } from "@/lib/products";

export default function Home() {
  const featuredProduct = mockProducts[0];
  const productTypes = [...new Set(mockProducts.map((product) => product.type))];

  return (
    <><Header /><main>
      <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-16 pt-12 sm:px-8 sm:pb-20 sm:pt-16 lg:grid-cols-[1fr_0.72fr] lg:items-center lg:gap-20 lg:px-12 lg:pb-24">
        <div>
          <p className="eyebrow">DONVEXA Digital Solutions</p>
          <h1 className="editorial-display mt-4 max-w-3xl text-5xl leading-[0.98] sm:text-6xl lg:text-7xl">Digital resources for making, learning, and paying attention.</h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-warm-gray sm:text-lg">Browse books, guides, and practical resources in formats made for reading and returning to.</p>
          <div className="mt-8 flex flex-wrap items-center gap-4"><Link href="/products" className="focus-ring rounded-full bg-charcoal px-6 py-3 text-sm font-semibold text-ivory transition-colors hover:bg-copper-dark">Browse the collection</Link><a href="#featured" className="focus-ring text-sm font-semibold underline decoration-copper underline-offset-8 hover:text-copper-dark">Explore featured</a></div>
          <p className="mt-6 text-xs text-warm-gray">Development storefront · catalogue content is mock data</p>
        </div>
        <div className="border border-line bg-paper p-4 sm:p-6">
          <p className="eyebrow mb-4">Featured resource</p>
          <ProductCover product={featuredProduct} large />
          <p className="mt-4 text-sm leading-6 text-warm-gray">A development preview of the product-led collection.</p>
        </div>
      </section>
      <section id="featured" className="border-y border-line bg-paper"><div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-12 lg:py-20"><div className="flex items-end justify-between gap-6"><div><p className="eyebrow">The collection</p><h2 className="editorial-display mt-3 text-4xl sm:text-5xl">Find something useful.</h2></div><Link href="/products" className="hidden focus-ring text-sm font-semibold underline decoration-copper underline-offset-8 sm:block">View all products</Link></div><div className="mt-9 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">{mockProducts.map((product) => <ProductCard key={product.slug} product={product} />)}</div><Link href="/products" className="mt-9 inline-block focus-ring text-sm font-semibold underline decoration-copper underline-offset-8 sm:hidden">View all products</Link></div></section>
      <section id="types" className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-12 lg:py-20"><div className="grid gap-8 md:grid-cols-[0.7fr_1.3fr] md:gap-16"><div><p className="eyebrow">Browse by type</p><h2 className="editorial-display mt-3 text-4xl sm:text-5xl">Start with what you need.</h2></div><div className="grid gap-3 sm:grid-cols-2">{productTypes.map((type) => <div key={type} className="flex items-center justify-between border-t border-line py-4"><span className="text-base font-semibold">{type}</span><span className="text-sm text-warm-gray">{mockProducts.filter((product) => product.type === type).length} development item{mockProducts.filter((product) => product.type === type).length === 1 ? "" : "s"}</span></div>)}</div></div></section>
      <section id="about" className="border-t border-line bg-paper"><div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-8 md:grid-cols-[0.7fr_1.3fr] md:gap-16 lg:px-12 lg:py-20"><p className="eyebrow">About the collection</p><p className="editorial-display max-w-3xl text-3xl leading-tight sm:text-5xl">Thoughtful digital resources for people making, learning, and paying closer attention.</p></div></section>
    </main><Footer /></>
  );
}
