import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { formatNaira } from "@/lib/products";

export function Header() {
  return (
    <header className="border-b border-line bg-ivory/95">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
        <Link href="/" aria-label="DONVEXA home" className="focus-ring shrink-0">
          <Image src="/brand/DONVEXA_Logo_Transparent.png" alt="DONVEXA" width={178} height={48} priority className="h-auto w-36 sm:w-44" />
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium md:flex" aria-label="Main navigation">
          <Link className="transition-colors hover:text-copper-dark" href="/products">Browse</Link>
          <Link className="transition-colors hover:text-copper-dark" href="/#about">About</Link>
          <Link className="transition-colors hover:text-copper-dark" href="/#support">Support</Link>
        </nav>
        <div className="flex items-center gap-3 text-sm font-semibold">
          <Link href="/products" className="hidden rounded-full border border-charcoal px-4 py-2 transition-colors hover:bg-charcoal hover:text-ivory sm:inline-flex">Explore</Link>
          <button type="button" disabled aria-label="Shopping cart unavailable during the storefront preview" title="Cart will be available in a later milestone" className="inline-flex cursor-not-allowed items-center gap-2 rounded-full bg-charcoal/60 px-4 py-2 text-ivory">
            Cart <span aria-hidden="true">0</span>
          </button>
          <details className="relative md:hidden">
            <summary className="focus-ring flex h-9 w-9 cursor-pointer list-none items-center justify-center rounded-full border border-line" aria-label="Open navigation menu"><span aria-hidden="true" className="text-lg">≡</span></summary>
            <div className="absolute right-0 top-12 z-20 w-48 border border-line bg-paper p-3 shadow-xl">
              <Link className="block px-3 py-3 text-sm hover:bg-ivory" href="/products">Browse</Link>
              <Link className="block px-3 py-3 text-sm hover:bg-ivory" href="/#about">About</Link>
              <Link className="block px-3 py-3 text-sm hover:bg-ivory" href="/#support">Support</Link>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group">
      <Link href={`/products/${product.slug}`} className="focus-ring block">
        <ProductCover product={product} />
      </Link>
      <div className="flex items-start justify-between gap-4 pt-4">
        <div>
          <h3 className="editorial-display text-xl leading-tight">{product.title}</h3>
          <p className="mt-1 text-sm text-warm-gray">{product.creator} · {product.format}</p>
        </div>
        <p className="shrink-0 text-sm font-semibold">{formatNaira(product.price)}</p>
      </div>
    </article>
  );
}

export function ProductCover({ product, large = false }: { product: Product; large?: boolean }) {
  return (
    <div className={`cover-art ${product.cover} ${product.accent} aspect-[4/5] ${large ? "p-7 sm:p-10" : "p-5 sm:p-7"}`}>
      <div className="relative z-10 flex h-full flex-col justify-between">
        <div className="flex items-start justify-between text-[0.63rem] font-bold uppercase tracking-[0.18em]">
          <span>DONVEXA</span><span>{product.type}</span>
        </div>
        <div>
          <p className={`editorial-display max-w-[12rem] leading-[0.95] ${large ? "text-4xl sm:text-6xl" : "text-2xl sm:text-3xl"} ${product.text}`}>{product.title}</p>
          <p className={`mt-4 text-xs font-semibold uppercase tracking-[0.13em] ${product.text}`}>{product.creator}</p>
        </div>
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer id="support" className="border-t border-line bg-charcoal text-ivory">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-10 sm:px-8 md:flex-row md:items-end md:justify-between lg:px-12">
        <div>
          <Image src="/brand/DONVEXA_Logo_Light_Transparent.png" alt="DONVEXA" width={178} height={48} className="h-auto w-36" />
          <p className="mt-4 max-w-xs text-sm leading-6 text-ivory/65">Useful things to read, keep, and return to.</p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-ivory/75">
          <Link href="/#about" className="hover:text-ivory">About</Link>
          <span className="basis-full text-xs text-ivory/50">Contact, FAQ, Privacy, Terms, and Refund Policy pages will be added before launch.</span>
        </div>
      </div>
    </footer>
  );
}